---
title: '从零到一：为 EPUB 阅读器打造完整有声书功能'
date: 2026-06-14 22:30:00
categories: 技术
tags: [前端, Electron, EPUB, TTS, 有声书, 架构设计, 开源]
---

# 从零到一：为 EPUB 阅读器打造完整有声书功能

> 前段时间接了个挺有意思的需求——给现有的 EPUB 阅读器加上完整的有声书功能。用户点一下"朗读"按钮，当前章节逐句提取、送入 TTS 引擎合成音频，同时高亮显示当前句子，超出视口自动翻页，跨章节还能连续播放。这篇文章把方案设计过程中的思考和决策记录下来，希望能给有类似需求的朋友一些参考。

---

## 一、为什么这件事比看起来难？

先说一下背景：我们有一个基于 epubjs 0.3.93 的 EPUB 阅读器（`EpubPreview.tsx`，约 942 行），还有一个多引擎 TTS 系统——本地引擎（Kokoro、Supertonic、Piper）和云端引擎（阿里云、OpenAI 等）并存。需求听起来不复杂：朗读当前章节，逐句高亮，自动翻页。

但仔细一想，全是坑：

**文本同步问题。** EPUB 是用 `epubjs` 渲染的 iframe 内嵌页面，你要在它渲染好的 DOM 上找到每个句子，包裹 `<span>` 标记，然后在高亮和翻页时精确操作。`epubjs` 0.3.x 的 DOM 操作本身就有点玄学，加上分页渲染的时机不可控，稍不小心标记就会丢失或错位。

**时序问题。** 读到了第 5 句，但 TTS 才合成到第 3 句。或者句子太长，合成时间超过了播放时间。你得预缓冲，还得管理队列。

**跨章节连续性。** `epubjs` 的 `rendition.next()` 在翻到最后一页时会自动加载下一章并触发 `relocated` 事件。但这时候旧页面的句子标记全没了，新页面的 DOM 还没渲染好。怎么接上？

**进度持久化。** 用户听了 45 分钟，关掉应用，明天打开要继续。CFI（epubjs 的内容定位符）要存下来，当前句子的索引要存下来，甚至上次用的语音和语速也要恢复。

这些问题没有一个是可以拍脑袋解决的，所以我们花了些时间做方案设计。下面是最终方案的核心思路。

---

## 二、整体架构：非侵入式叠加

首先要做一个重要的设计决定：**有声书模式应该是阅读器的一个可选叠加层，而不是侵入式改造。**

```text
┌─────────────────────────────────────────────────────────────────┐
│ 应用场景 │
├─────────────────────────────────────────────────────────────────┤
│ │
│ 用户看 EPUB → 点"朗读" → 进入有声书模式 → 阅读器下方出现播放条 │
│ → 自动逐句朗读 + 高亮 + 翻页 → 点"停止" → 退出模式，回到阅读 │
│ │
│ 关键：两种模式互不干扰，有声书结束时恢复原样 │
└─────────────────────────────────────────────────────────────────┘
```

这意味着：

- **音频独立。** 有声书使用自己创建的 `HTMLAudioElement`，不污染全局播放器队列。有声书激活时暂停全局播放器，退出后恢复，互不干扰。
- **UI 独立。** 内嵌播放条 `AudiobookPlayer` 渲染在阅读器底部，与全局 `MiniPlayer` 互斥。激活时隐藏 MiniPlayer，退出时重新显示。
- **状态独立。** 使用独立的 Zustand Store `useAudiobookStore`，不与现有状态管理纠缠。

数据流大概是这样的：

```
用户点击"朗读"
  │
  ├─ 1. EPUB 当前页 DOM → extractSentences() → 句子列表
  │
  ├─ 2. 为每个句子在 DOM 中包裹 <span data-tts-idx="N">
  │
  ├─ 3. 逐句调用 api.tts.speak() 合成音频 → 得到 blob URL
  │
  ├─ 4. 用 Audio 元素逐个播放，同时 highlightSentence()
  │
  ├─ 5. 句子超出视口 → rendition.next() → relocated 事件
  │
  └─ 6. 新页面重新提取句子 → 追加到列表 → 继续播放
```

---

## 三、核心模块拆解

### 3.1 文本提取与分句：写一个靠谱的中英文分句器

第一个要解决的问题是：**把 DOM 变成有序的句子列表。**

EPUB 页面里不是所有文本都应该被朗读的。页码、脚注、页眉这些需要跳过。我们定义了一个 `SKIP_SELECTORS` 列表，在提取前先过滤掉这些元素：

```typescript
const SKIP_SELECTORS = [
  '[epub|type="pagebreak"]',
  '.page-break',
  '.footnote',
  'sup.reference',
]
```

然后遍历 `<p>`、`<h1-6>`、`<li>` 等块级元素，提取纯文本。再对每段文本做分句。

分句的难点在于中英文混合。中文句号 `。`、英文句点 `.`、感叹号、问号、分号都是分句点，但英文句点又要避开缩写（如 `Mr.`、`U.S.A.`）和数字中的小数点。经过三轮迭代，我们的正则长这样：

```typescript
const SENTENCE_END = /([。！？；]|(?<!\d)\.(?!\d)|[!?;])(?=\s|$|[“”「」『』"」])/g
```

核心技巧是用 `(?<!\d)\.(?!\d)` 排除数字中的小数点（如 3.14），用 `(?=\s|$|引号)` 确保句点后确实有句尾特征。

最终每个句子带上元信息：

```typescript
interface SentenceItem {
  globalIndex: number    // 全局唯一序号
  paragraphIndex: number // 段落序号
  sentenceInParagraph: number // 段内句序号
  text: string           // 纯文本句子
}
```

`globalIndex` 是做跨页追踪的关键——即使翻页了，句子的全局序号也不断递增。

### 3.2 DOM 标记与高亮：精确操作 epubjs 的 DOM

有了句子列表，需要在 EPUB 的 DOM 中找到每个句子对应的位置，用 `<span>` 包裹起来。这样后续高亮和滚动定位才有锚点。

实现用 `TreeWalker` 遍历文本节点，在原始文本中搜索每个句子，找到位置后用 `Range.surroundContents(wrapper)` 包裹：

```typescript
function wrapTextInElement(container: Element, searchText: string, wrapper: HTMLSpanElement): boolean {
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT)
  const textNodes: Text[] = []
  let node: Text | null
  while ((node = walker.nextNode() as Text | null)) {
    textNodes.push(node)
  }

  // 找句子在文本中的位置
  const fullText = textNodes.map(n => n.textContent || '').join('')
  const idx = fullText.indexOf(searchText)
  if (idx < 0) return false

  // 跨越文本节点计算 offset，然后用 Range 包裹
  // ...（完整代码较长，略）
  range.surroundContents(wrapper)
}
```

为什么要用 TreeWalker 而不是 `innerHTML.replace`？因为 `innerHTML` 会破坏 epubjs 内部的 DOM 结构和事件绑定，导致翻页异常。TreeWalker 操作文本节点，不碰元素结构，安全得多。

高亮管理很简单——读到的句子加 `.tts-sentence-active` 类（黄色背景），读过的加 `.tts-sentence-played` 类（淡灰色），用 CSS 控制样式，无 JavaScript 动画干扰。

### 3.3 核心调度 Hook：协调 TTS 合成、播放和翻页

这是整个有声书的"大脑"。我们用 `useAudiobook` hook 管理三条并发线：

**合成队列：** 每次启动时预缓冲当前句开始的 5 句。播放过程中，当前播放到第 N 句时，检查后续第 N+5 句是否已合成，没有则触发新的合成任务。这样用户从来不会等到"正在合成..."的空白。

**播放循环：** 遍历 `audioQueue`，逐个播放。每个 `AudioChunk` 包含 blob URL 和时长。播放结束后触发 `playAudioUrl()` 返回的 Promise resolve，然后进入下一句。

**DOM 同步：** 每播完一句，调用 `highlightSentence()` 标记高亮。然后检查高亮句是否超出视口——用 `getBoundingClientRect()` 比较 `rect.bottom` 和 `viewerRect.bottom`。如果超了，调用 `rendition.next()` 翻页，等待 `relocated` 事件触发后在新页面重新标记。

下面是简化的播放循环逻辑：

```typescript
for (let i = currentSentenceIdx; i < sentences.length; i++) {
  // 检查预缓冲
  if (remainingReady < 3) prebufferRange(...)

  // 等待合成完成
  let chunk = waitForChunk(i)

  // 播放
  await playAudioUrl(audio, chunk.audioUrl, speed)

  // 高亮 + 翻页
  highlightSentence(doc, i)
  if (超出视口) await rendition.next()

  // 保存进度
  persistProgress(i)
}
```

### 3.4 状态管理：独立的 Store

我们用 Zustand 维护有声书状态。为什么不直接塞进现有 Store？因为现有播放器管理的是音乐/播客流，语义完全不同——音乐的"暂停"和有声书的"暂停"不应该混在一起。

Store 的核心字段：

```typescript
interface AudiobookState {
  isActive: boolean          // 有声书模式激活中
  isPlaying: boolean         // 正在播放

  sentences: Sentence[]      // 当前页面句子列表
  currentSentenceIdx: number // 当前播放句索引

  audioQueue: AudioChunk[]   // 已合成的音频缓存

  voiceEngineId: string      // TTS 引擎
  voiceId: string            // 语音
  speed: number              // 语速 0.5-4.0

  sleepTimerMinutes: number | null // 定时关闭

  currentProgress: AudiobookProgress | null // 断点信息
}
```

---

## 四、自动翻页：顺滑的跨章体验

自动翻页是用户体验的关键。我们希望在朗读时，用户的视线可以一直跟着高亮走，不需要手动翻页。

**单页内的逻辑：**
1. 播放句子 N
2. 找到 DOM 中 `[data-tts-idx="N"]` 的元素
3. 判断 `rect.bottom > viewerRect.bottom`
4. 超出则调用 `rendition.next()`

**跨章节的逻辑：** `rendition.next()` 在到达章节最后一页时会自动加载下一章。`epubjs` 触发 `relocated` 事件，我们在 handler 中：

```typescript
rendition.on('relocated', (loc) => {
  // 延迟等新页面 DOM 渲染
  setTimeout(() => {
    const doc = rendition.getContents()?.[0]?.document
    const newSentences = extractSentences(doc)
    markSentencesInDOM(doc, newSentences)

    // 追加到全局句子列表（globalIndex 不归零）
    audiobookStore.appendSentences(newSentences)

    // 恢复高亮
    highlightSentence(doc, audiobookStore.currentSentenceIdx)
  }, 200)
})
```

注意 `appendSentences` 是追加而不是替换——这样 `globalIndex` 始终递增，即使翻页了也不会和之前的句子索引冲突。

---

## 五、语音包管理：三层分级下载

TTS 要出声，需要模型文件。但模型文件很大——Kokoro 多语言模型约 160MB，Supertonic 整套约 99MB。让用户一次性下载几百兆是不现实的。

我们设计了三层分级下载策略：

### 第一层：预打包（随安装包分发）
用 MATCHA-TTS 的 `matcha-icefall-zh-baker.onnx`（仅 8MB）作为保底语音。安装后开箱即用，虽然音质一般，但断网也能用。

### 第二层：首次启动后台静默下载
安装后 30 秒，检测到网络可用时，自动在后台下载 Kokoro 多语言模型（~160MB）。下载期间用第一层保底语音。下载完成后自动切换，通过 IPC 通知渲染进程更新 UI。

### 第三层：用户按需手动下载
用户在 TTS 设置页浏览语音列表，点击"下载"按钮触发。支持多种引擎（Kokoro 的其他语音、Piper、Supertonic）。已下载的可删除释放空间。

**下载管理器**（`VoiceManager`）运行在主进程，复用项目已有的进度通知模式。最大并发 2 个下载任务，支持取消、断点续传、完整性校验（SHA256）：

```typescript
class VoiceManager {
  async startDownload(engineId, voiceId) {
    const taskId = `${engineId}:${voiceId}`
    // 创建任务 → 加入队列 → processQueue()
    // processQueue 用 fetch 分块下载，广播进度
  }

  cancelDownload(taskId) { /* ... */ }
  deleteModel(engineId, voiceId) { /* ... */ }
  verifyModel(engineId, voiceId) { /* ... */ }
}
```

---

## 六、进度持久化与断点恢复

SQLite 三张表：

```sql
-- 进度表
CREATE TABLE audiobook_progress (
  book_path TEXT PRIMARY KEY,
  cfi TEXT NOT NULL,
  sentence_index INTEGER NOT NULL DEFAULT 0,
  voice_engine_id TEXT,
  voice_id TEXT,
  speed REAL NOT NULL DEFAULT 1.0,
  updated_at INTEGER NOT NULL
);

-- 书签表
CREATE TABLE audiobook_bookmarks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  book_path TEXT NOT NULL,
  cfi TEXT NOT NULL,
  sentence_index INTEGER,
  label TEXT,
  created_at INTEGER NOT NULL
);

-- 播放统计表
CREATE TABLE audiobook_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  book_path TEXT NOT NULL,
  duration_seconds INTEGER,
  sentences_read INTEGER DEFAULT 0,
  voice_engine_id TEXT,
  voice_id TEXT,
  speed REAL
);
```

保存策略是分层级的：每 5 秒定时存一次进度（精确到句子索引），用户暂停时立即保存，翻页时存关键节点，应用退出前通过 `beforeunload` 事件保底。

恢复流程也很直接：打开 EPUB → 查 `audiobook_progress` → 有记录则显示"上次听到第 X 章，是否继续？" → 用户确认后 `rendition.display(savedCfi)` 跳转到对应位置，从 `sentence_index` 继续播放。

---

## 七、播放器 UI 设计

播放条渲染在 EPUB 阅读器底部，与全局 MiniPlayer 互斥：

```
┌─────────────────────────────────────────────────────────────────────┐
│ 📖 当前朗读句子（字幕式，超出 80 字自动省略到尾） │
├─────────────────────────────────────────────────────────────────────┤
│ ⏮ ⏪ -10s ▶/⏸ ⏩ +30s ⏭ │
│ 上一章 后退 暂停 快进 下一章 │
│ ──●───────────────────────────────── 12:34 / 45:12 │
│ 🔊 小北(中文) │ 语速 1.25x │ ⏱ 30分钟后 │ 📎 书签 │
└─────────────────────────────────────────────────────────────────────┘
```

底部五个控件的设计逻辑：
- **快进/快退**依赖 `AudioChunk.duration` 累加计算——找到跨越目标时间点的那一句，从那里恢复播放
- **语音选择器**只显示已下载的本地语音，云端语音在有 API Key 配置后才可选
- **定时关闭**提供 15/30/60/90 分钟和"当前章结束"选项，背后是个简单的倒计时器

---

## 八、性能实测

我们自己测了一组数据（15 字中文句子，本地引擎）：

| 指标 | Kokoro | Supertonic（英文） | 远程阿里云 |
|------|:------:|:-----------------:|:---------:|
| 单句合成延迟 | ~0.5s | ~0.01s | ~0.3s |
| 预缓冲 5 句 | ~2.5s | ~0.05s | ~1.5s |
| 首次出声 | ~2-3s | ~0.5s | ~1-2s |
| 内存占用 | ~300MB | ~150MB | ~0 |
| 磁盘占用 | ~160MB | ~99MB | 0 |

Supertonic 在英文场景几乎是瞬时的，但因为不支持中文，国内用户的主力引擎还是 Kokoro。2-3 秒的首次延迟可以接受——第一次点击"朗读"后，用户看到字幕出现 + 句子高亮，这个反馈本身已经降低了等待感。

---

## 九、实施计划

整个功能分四个里程碑，总计约 14-20 天（纯有声书部分）：

| 里程碑 | 时间 | 交付物 |
|--------|:---:|--------|
| M1：核心循环 | 7-9 天 | 文本提取 → 合成 → 播放 → 高亮 → 翻页，基础版可出声 |
| M2：播放体验 | 3-5 天 | 语音选择、语速调节、定时关闭、快进快退、跨章连续 |
| M3：进度书签 | 2-3 天 | SQLite 持久化、断点恢复、书签管理 |
| M4：打磨 | 2-3 天 | 文本跟随模式、播放统计、导出音频、边界测试 |

每个里程碑都是可交付状态，不会出现"开发两周还是个半成品"的尴尬。

---

## 十、一些心得

做完这个方案设计，有几个体会想分享：

**1. 非侵入式设计真的省心。** 一开始想过直接在 `EpubPreview.tsx` 里加状态、加播放逻辑，后来发现这会让一个 942 行的组件膨胀到 1200+ 行，而且每次 epubjs 升级都可能冲突。改成独立 Hook + 独立组件 + 独立 Store 后，修改量从"大改"变成了"嵌入 3 个地方"，风险小得多。

**2. 预缓冲是消除等待感的关键。** 用户对"等待"的耐心不超过 3 秒。如果点击播放后等 10 秒才出声，体验就毁了。预缓冲 5 句 + 边合成边播放的策略，让首次声音延迟控制在 2-3 秒，后续几乎无感。

**3. epubjs 的 DOM 操作要格外小心。** 0.3.x 版本的 epubjs 本身就有不少 bug，我们已经在 `EpubPreview.tsx` 里积累了多个 workaround。这次又新增了一个：不要用 `innerHTML` 操作标记，用 `TreeWalker` + `Range.surroundContents()`，既安全又精确。

**4. 边界情况永远比想象的多。** 纯图片的 EPUB、空章节、巨长的句子（一段 500 字没有句号）、用户网络中断、用户快速切章节……每个都要处理。我们的原则是：任何边界情况至少不能崩溃，最好能优雅降级提示。

---

如果你也在做类似的项目，希望这份方案能给你一些参考。代码部分（`textSplitter.ts`、`domMarker.ts`、`useAudiobook.ts`）的核心片段上面已经贴了，完整的实现预计在后续的 PR 中提交。

欢迎交流讨论~ 🎧
