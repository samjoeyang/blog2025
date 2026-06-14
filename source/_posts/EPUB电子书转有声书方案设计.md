---
title: 'EPUB 电子书转有声书方案设计'
date: 2026-06-14 22:30:00
categories: 技术
tags: [前端, Electron, EPUB, TTS, 有声书, 架构设计]
---

> 设计日期：2026-06-05 | 基于 unobox 现有 EPUB 阅读器 + TTS 多引擎架构

---

## 一、方案概述

### 1.1 目标

在现有 EPUB 阅读器（`EpubPreview.tsx`，基于 epubjs 0.3.93）基础上，增加**完整有声书功能**。用户点击"朗读"按钮后，当前章节文本被逐句提取、送入 TTS 引擎合成为音频、通过独立音频元素播放，同时：

- 当前朗读的句子在阅读器中高亮显示
- 高亮句超出当前视口时自动翻页
- 跨章节自动连续播放
- 进度持久化，下次打开可从断点继续

### 1.2 核心设计原则

| 原则 | 说明 |
|------|------|
| **TTS 默认本地免费** | 有声书默认使用本地引擎（Kokoro/Supertonic），无需 API Key，零成本 |
| **云端 TTS 可选增强** | 高级用户在设置中配好 API Key 后，可在有声书模块中选择云端引擎 |
| **逐句合成 + DOM 标记同步** | 文本分句 → TTS 逐个合成 → DOM span 标记 → 播放时逐句高亮 |
| **复用现有播放器基础设施** | 音频输出使用独立 `HTMLAudioElement`（参考 `useAudioEngine` 模式），不污染全局 `useMediaPlayerStore` 队列 |
| **epubjs 内置分页驱动力** | 自动翻页完全依赖 epubjs `rendition.next()` + `relocated` 事件 |
| **非侵入式改造** | 不影响现有 EPUB 阅读功能，有声书模式为可选叠加层 |

---

## 二、系统架构

### 2.1 整体数据流

```
┌─────────────────────────────────────────────────────────────────────┐
│                     EPUB 有声书系统架构                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  主进程 (Main Process)             渲染进程 (Renderer)              │
│  ════════════════════             ═══════════════════════           │
│                                                                     │
│  ┌──────────────────────┐        ┌─────────────────────────┐        │
│  │  TTS 引擎层 (Phase 1) │  IPC  │  EpubPreview.tsx        │        │
│  │  ├─ SherpaOnnx       │ tts:   │  (现有 942 行组件)      │        │
│  │  ├─ Supertonic       │ speak()│  ┌─────────────────────┐│        │
│  │  └─ PiperCli         │◄───────│  │ + 有声书模式叠加    ││        │
│  └──────────────────────┘        │  │  ├─ 播放/暂停按钮   ││        │
│                                   │  │  ├─ 语音选择器     ││        │
│  ┌──────────────────────┐  IPC    │  │  ├─ 语速调节       ││        │
│  │  AudiobookProgressDB │ audio-  │  │  └─ 定时关闭       ││        │
│  │  ├─ 进度 CRUD        │ book:   │  └─────────────────────┘│        │
│  │  ├─ 书签 CRUD        │◄────────│                         │        │
│  │  └─ 播放统计         │         │  ┌─────────────────────┐│        │
│  └──────────────────────┘         │  │  AudiobookPlayer    ││        │
│                                   │  │  (内嵌播放条 UI)    ││        │
│  ┌──────────────────────┐  IPC    │  │  ├─ 字幕 + 进度条  ││        │
│  │  VoiceManager        │ tts:    │  │  ├─ 快进/快退按钮  ││        │
│  │  ├─ 模型列表         │ downl-  │  │  └─ 章节导航       ││        │
│  │  ├─ 下载/删除/校验   │ oad-    │  └─────────────────────┘│        │
│  │  └─ 进度回调         │ voice() │                         │        │
│  └──────────────────────┘         │  ┌─────────────────────┐│        │
│                                   │  │  useAudiobook       ││        │
│                                   │  │  (核心调度 Hook)    ││        │
│  ┌──────────────────────┐         │  │  ├─ 文本提取+分句  ││        │
│  │  TTS 模型存储        │         │  │  ├─ TTS 合成队列   ││        │
│  │  {userData}/         │         │  │  ├─ DOM 标记+高亮  ││        │
│  │  tts-models/         │         │  │  ├─ 自动翻页同步   ││        │
│  │  ├─ kokoro/          │         │  │  └─ 预缓冲管理     ││        │
│  │  ├─ supertonic/      │         │  └─────────────────────┘│        │
│  │  └─ piper/           │         │                         │        │
│  └──────────────────────┘         │  ┌─────────────────────┐│        │
│                                   │  │  Audio 元素 (独立)  ││        │
│                                   │  │  ├─ 逐句拼接播放   ││        │
│  ┌──────────────────────┐         │  │  ├─ 速率控制       ││        │
│  │  数据库 (SQLite)     │         │  │  └─ ended → 下一句 ││        │
│  │  unobox.db           │         │  └─────────────────────┘│        │
│  │  ├─ audiobook_progress         └─────────────────────────┘        │
│  │  ├─ audiobook_bookmarks                                         │
│  │  └─ audiobook_history                                           │
│  └──────────────────────┘                                          │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 与现有系统的集成关系

| 现有模块 | 有声书如何使用 | 修改量 |
|---------|-------------|:--:|
| `EpubPreview.tsx` | 嵌入有声书按钮 + 文本标记 + 翻页同步，约 +200 行 | 中等 |
| `useAudioEngine.ts` | **不直接复用**——有声书使用独立 `Audio` 元素，参考其 blob URL 处理模式 | 零 |
| `useMediaPlayerStore` | **不干扰**——有声书激活时暂停全局播放器，关闭后恢复 | 微小（新增互斥逻辑） |
| `MiniPlayer / FullPlayer` | 零改动——有声书使用独立播放条 `AudiobookPlayer` | 零 |
| `api.file.readBuffer` | 零改动——epubjs 自行加载 EPUB 内容，不需要 IPC 读取 | 零 |
| `api.epub.*` (FTS5 搜索) | 零改动——全文搜索保持独立 | 零 |
| `api.tts.*` (Phase 1 本地 TTS) | 核心依赖——有声书通过 `api.tts.speak()` 逐句合成 | 零（调方） |
| `api.db.*` | 有声书进度/书签通过 `api.db.run/query` 读写 | 零（调方） |
| `TTSManager` (主进程) | 零改动——有声书通过已有 IPC 调用，不感知管理层 | 零 |

---

## 三、核心模块设计

### 3.1 文本提取与分句 (`textSplitter.ts`)

```typescript
/**
 * textSplitter.ts
 * EPUB 有声书文本处理工具
 */

/** 跳过的非正文元素选择器 */
const SKIP_SELECTORS = [
  '[epub|type="pagebreak"]',
  '.page-break',
  '.page-number',
  '.footnote',
  '.endnote',
  'sup.reference',
  '.fn-ref',
]

/** 判断 DOM 元素是否为可朗读的正文 */
export function isReadableElement(el: Element): boolean {
  // 跳过隐藏元素
  if (!(el as HTMLElement).offsetParent && el.tagName !== 'BODY') return false
  // 跳过非正文选择器匹配的元素
  if (SKIP_SELECTORS.some(sel => el.matches(sel) || el.closest(sel))) return false
  // 跳过空元素
  const text = (el.textContent || '').trim()
  if (!text) return false
  // 跳过纯数字（可能是页码）
  if (/^\d{1,4}$/.test(text)) return false
  return true
}

/** 将文本按句子分割（支持中英文混合） */
export function splitSentences(text: string): string[] {
  // 预处理：合并多余空白
  const normalized = text.replace(/\s+/g, ' ').trim()
  if (!normalized) return []

  // 分句正则：匹配常见句子结束标点
  // 中文：。！？； ｜ 英文：. ! ? ; 后跟空格或换行
  // 特殊处理：省略号…… / ... 不在此处分句；引号收尾 »「」』" 算前句
  const SENTENCE_END = /([。！？；]|(?<!\d)\.(?!\d)|[!?;])(?=\s|$|[“”「」『』‘’‚‛""''»«])/g

  const sentences: string[] = []
  let lastIdx = 0
  let match: RegExpExecArray | null

  // 使用 exec 循环以支持全局正则
  const regex = new RegExp(SENTENCE_END.source, 'g')
  while ((match = regex.exec(normalized)) !== null) {
    const endIdx = match.index + match[0].length
    const sentence = normalized.slice(lastIdx, endIdx).trim()
    if (sentence.length >= 2) {
      sentences.push(sentence)
    }
    lastIdx = endIdx
  }

  // 收尾片段
  const tail = normalized.slice(lastIdx).trim()
  if (tail.length >= 2) {
    sentences.push(tail)
  }

  return sentences
}

/** 从 epubjs Rendition 当前视图提取可朗读段落的纯文本序列 */
export function extractReadableText(doc: Document): string[] {
  const paragraphs: string[] = []
  // 遍历块级元素
  const blocks = doc.body.querySelectorAll(
    'p, h1, h2, h3, h4, h5, h6, div, li, td, th, blockquote, pre'
  )
  for (const block of blocks) {
    if (!isReadableElement(block)) continue
    const text = (block.textContent || '').replace(/\s+/g, ' ').trim()
    if (text.length >= 2) {
      paragraphs.push(text)
    }
  }
  return paragraphs
}

/** 完整流程：提取段落 → 逐段分句 → 扁平化为全局句子数组 */
export function extractSentences(doc: Document): SentenceItem[] {
  const paragraphs = extractReadableText(doc)
  const sentences: SentenceItem[] = []
  let globalIdx = 0
  for (let pIdx = 0; pIdx < paragraphs.length; pIdx++) {
    const parts = splitSentences(paragraphs[pIdx]!)
    for (let sIdx = 0; sIdx < parts.length; sIdx++) {
      sentences.push({
        globalIndex: globalIdx++,
        paragraphIndex: pIdx,
        sentenceInParagraph: sIdx,
        text: parts[sIdx]!,
      })
    }
  }
  return sentences
}

export interface SentenceItem {
  globalIndex: number       // 全局唯一序号
  paragraphIndex: number    // 段落序号
  sentenceInParagraph: number // 段内句序号
  text: string              // 纯文本句子
}
```

### 3.2 DOM 标记与高亮 (`domMarker.ts`)

```typescript
/**
 * domMarker.ts
 * EPUB DOM 中的句子标记与高亮管理
 */

const MARK_ATTR = 'data-tts-idx'
const ACTIVE_CLASS = 'tts-sentence-active'
const PLAYED_CLASS = 'tts-sentence-played'

/**
 * 在当前 epubjs 视图中为每个句子包裹 <span> 标记
 * 索引与 AudioSentence.globalIndex 一一对应
 */
export function markSentencesInDOM(
  doc: Document,
  sentences: SentenceItem[]
): void {
  // 先清除旧标记
  clearAllMarks(doc)

  const blocks = doc.body.querySelectorAll(
    'p, h1, h2, h3, h4, h5, h6, div, li, td, th, blockquote, pre'
  )
  const blockList = Array.from(blocks).filter(el => {
    const text = (el.textContent || '').trim()
    return text.length >= 2
  })

  let sentenceIdx = 0
  for (const block of blockList) {
    const text = block.textContent || ''
    const parts = splitSentences(text)

    // 在原 DOM 中查找并包裹每个句子
    for (const part of parts) {
      const wrapper = doc.createElement('span')
      wrapper.setAttribute(MARK_ATTR, String(sentenceIdx))
      // 在原文本中定位并包裹
      if (wrapTextInElement(block, part, wrapper)) {
        sentenceIdx++
      }
    }
  }
}

/**
 * 在容器元素中查找文本子串并用 span 包裹
 * 使用 TreeWalker 遍历文本节点，找到匹配位置后分割替换
 */
function wrapTextInElement(
  container: Element,
  searchText: string,
  wrapper: HTMLSpanElement
): boolean {
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT)
  const textNodes: Text[] = []
  let node: Text | null
  while ((node = walker.nextNode() as Text | null)) {
    textNodes.push(node)
  }

  // 拼接所有文本以定位
  const fullText = textNodes.map(n => n.textContent || '').join('')
  const idx = fullText.indexOf(searchText)
  if (idx < 0) return false

  // 找到跨越的文本节点并插入 span
  let currentPos = 0
  let startNode: Text | null = null
  let startOffset = 0
  let endNode: Text | null = null
  let endOffset = 0

  for (const tn of textNodes) {
    const len = (tn.textContent || '').length
    if (!startNode && currentPos + len > idx) {
      startNode = tn
      startOffset = idx - currentPos
    }
    if (!endNode && currentPos + len >= idx + searchText.length) {
      endNode = tn
      endOffset = idx + searchText.length - currentPos
      break
    }
    currentPos += len
  }

  if (!startNode || !endNode) return false

  const range = document.createRange()
  range.setStart(startNode, startOffset)
  range.setEnd(endNode, endOffset)
  range.surroundContents(wrapper)
  range.detach()
  return true
}

/** 高亮当前朗读的句子 */
export function highlightSentence(doc: Document, sentenceIdx: number): void {
  // 移除上一个高亮
  const prev = doc.querySelector(`.${ACTIVE_CLASS}`) as HTMLElement | null
  if (prev) {
    prev.classList.remove(ACTIVE_CLASS)
    prev.classList.add(PLAYED_CLASS)
  }

  // 添加新高亮
  const el = doc.querySelector(`[${MARK_ATTR}="${sentenceIdx}"]`) as HTMLElement | null
  if (el) {
    el.classList.add(ACTIVE_CLASS)
  }
}

/** 清除所有标记（还原 DOM） */
export function clearAllMarks(doc: Document): void {
  const marks = doc.querySelectorAll(`[${MARK_ATTR}]`)
  marks.forEach(mark => {
    const parent = mark.parentNode
    if (!parent) return
    while (mark.firstChild) {
      parent.insertBefore(mark.firstChild, mark)
    }
    parent.removeChild(mark)
  })
}

/** 检查指定句子是否在当前视口内 */
export function isSentenceInViewport(
  doc: Document,
  sentenceIdx: number,
  viewerEl: HTMLElement
): boolean {
  const el = doc.querySelector(`[${MARK_ATTR}="${sentenceIdx}"]`)
  if (!el) return true // 未找到元素时不触发翻页
  const rect = el.getBoundingClientRect()
  const viewerRect = viewerEl.getBoundingClientRect()
  // 句子底部超出视口底部 → 需要翻页
  return rect.bottom <= viewerRect.bottom
}
```

### 3.3 核心调度 Hook (`useAudiobook.ts`)

```typescript
/**
 * useAudiobook.ts
 * 有声书核心调度 Hook
 *
 * 职责：
 * 1. 管理音频队列（预缓冲 + 播放）
 * 2. 协调 TTS 合成 → DOM 高亮 → 自动翻页
 * 3. 进度持久化 + 断点恢复
 */

import { useEffect, useRef, useCallback } from 'react'
import { useAudiobookStore } from '../store/useAudiobookStore'
import {
  extractSentences,
  type SentenceItem,
} from '../utils/textSplitter'
import {
  markSentencesInDOM,
  highlightSentence,
  clearAllMarks,
  isSentenceInViewport,
} from '../utils/domMarker'

const PREBUFFER_SIZE = 5       // 预缓冲句子数
const SAVE_INTERVAL = 5000     // 进度保存间隔（毫秒）

export function useAudiobook(
  rendition: any,              // epubjs Rendition 实例
  book: any,                   // epubjs Book 实例
  viewerRef: React.RefObject<HTMLDivElement>,
  bookPath: string             // EPUB 文件路径
) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const saveTimerRef = useRef<ReturnType<typeof setInterval>>()
  const storeRef = useRef(useAudiobookStore.getState())

  // 订阅 store 最新值
  useEffect(() => {
    return useAudiobookStore.subscribe(s => { storeRef.current = s })
  }, [])

  // ── 初始化 / 销毁 audio 元素 ──
  useEffect(() => {
    const audio = new Audio()
    audioRef.current = audio
    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  // ── 开始朗读当前章节 ──
  const startReading = useCallback(async () => {
    const store = useAudiobookStore.getState()
    const doc = rendition?.getContents()?.[0]?.document as Document | undefined
    if (!doc) return

    // 1. 提取文本 + 分句
    const sentences = extractSentences(doc)
    if (sentences.length === 0) return

    // 2. 标记 DOM
    markSentencesInDOM(doc, sentences)

    // 3. 更新 store
    store.setSentences(sentences)
    store.setIsActive(true)
    store.setIsPlaying(true)

    // 4. 从断点恢复或从头开始
    const progress = store.currentProgress
    const startIdx = progress?.sentenceIndex ?? 0

    // 5. 预缓冲前 N 句
    await prebufferRange(startIdx, Math.min(startIdx + PREBUFFER_SIZE, sentences.length))
  }, [rendition, bookPath])

  // ── 预缓冲指定范围的句子 ──
  const prebufferRange = useCallback(async (fromIdx: number, toIdx: number) => {
    const store = useAudiobookStore.getState()
    const { sentences, voiceEngineId, voiceId, speed } = store

    for (let i = fromIdx; i < toIdx && i < sentences.length; i++) {
      const sentence = sentences[i]
      if (!sentence || sentence.audioStatus !== 'pending') continue

      store.updateSentenceStatus(i, 'synthesizing')

      try {
        // 调用 TTS IPC
        const result = await window.api.tts.speak(sentence.text, {
          engineId: voiceEngineId,
          voiceId: voiceId,
          speed: speed,
        })

        if (result.success && result.filePath) {
          store.addAudioChunk({ sentenceIdx: i, audioUrl: result.filePath, duration: result.duration ?? 0 })
          store.updateSentenceStatus(i, 'ready')
        }
      } catch (e) {
        console.warn(`[Audiobook] 合成句子 ${i} 失败:`, e)
        store.updateSentenceStatus(i, 'failed')
      }
    }
  }, [])

  // ── 播放循环 ──
  const playLoop = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    const store = useAudiobookStore.getState()
    const { sentences, audioQueue } = store

    for (let i = store.currentSentenceIdx; i < sentences.length; i++) {
      // 检查是否需要预缓冲
      const remainingReady = audioQueue.filter(
        c => c.sentenceIdx >= i && c.sentenceIdx < i + PREBUFFER_SIZE
      ).length
      if (remainingReady < 3) {
        prebufferRange(i + PREBUFFER_SIZE - remainingReady, i + PREBUFFER_SIZE)
      }

      // 等待当前句合成完成
      let chunk = audioQueue.find(c => c.sentenceIdx === i)
      while (!chunk) {
        await new Promise(r => setTimeout(r, 200))
        chunk = audioQueue.find(c => c.sentenceIdx === i)
      }

      // 播放
      store.setCurrentSentenceIdx(i)
      await playAudioUrl(audio, chunk.audioUrl, store.speed)

      // 高亮
      const doc = rendition.getContents()?.[0]?.document
      if (doc) {
        highlightSentence(doc, i)

        // 检查自动翻页
        if (viewerRef.current && !isSentenceInViewport(doc, i, viewerRef.current)) {
          await rendition.next()
        }
      }

      // 进度持久化
      store.updateProgress(i)
    }
  }, [rendition, viewerRef, prebufferRange])

  // ── 播放单个音频 URL ──
  const playAudioUrl = useCallback((
    audio: HTMLAudioElement,
    url: string,
    speed: number
  ): Promise<void> => {
    return new Promise((resolve) => {
      audio.src = url
      audio.playbackRate = speed
      audio.onended = () => resolve()
      audio.onerror = () => resolve() // 跳过失败的句子
      audio.play().catch(() => resolve())
    })
  }, [])

  // ── epubjs relocated 事件 → 对新页面重新标记句子 ──
  useEffect(() => {
    if (!rendition) return
    const handler = (loc: any) => {
      const store = useAudiobookStore.getState()
      if (!store.isActive) return

      // 延迟等待 DOM 渲染
      setTimeout(() => {
        const doc = rendition.getContents()?.[0]?.document as Document | undefined
        if (!doc) return

        const sentences = extractSentences(doc)
        markSentencesInDOM(doc, sentences)
        store.appendSentences(sentences)

        // 恢复高亮
        highlightSentence(doc, store.currentSentenceIdx)
      }, 200)
    }
    rendition.on('relocated', handler)
    return () => { rendition.off?.('relocated', handler) }
  }, [rendition])

  // ── 进度定时保存 ──
  useEffect(() => {
    saveTimerRef.current = setInterval(() => {
      const { isActive, currentSentenceIdx, sentences } = useAudiobookStore.getState()
      if (!isActive) return
      persistProgress(currentSentenceIdx)
    }, SAVE_INTERVAL)
    return () => { if (saveTimerRef.current) clearInterval(saveTimerRef.current) }
  }, [])

  return { startReading, playLoop }
}

/** 持久化进度到 SQLite */
async function persistProgress(sentenceIdx: number): Promise<void> {
  const store = useAudiobookStore.getState()
  try {
    await window.api.db.run(
      `INSERT OR REPLACE INTO audiobook_progress
       (book_path, cfi, sentence_index, voice_engine_id, voice_id, speed, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        store.currentBookPath,
        store.currentCfi,
        sentenceIdx,
        store.voiceEngineId,
        store.voiceId,
        store.speed,
        Date.now(),
      ]
    )
  } catch { /* 非 Electron 环境 */ }
}
```

### 3.4 状态管理 (`useAudiobookStore.ts`)

```typescript
/**
 * useAudiobookStore.ts
 * 有声书全局状态管理
 */

import { create } from 'zustand'

interface Sentence {
  globalIndex: number
  text: string
  audioStatus: 'pending' | 'synthesizing' | 'ready' | 'failed'
}

interface AudioChunk {
  sentenceIdx: number
  audioUrl: string    // unbox-file:// 或 blob URL
  duration: number
}

interface AudiobookBookmark {
  id: number
  bookPath: string
  cfi: string
  sentenceIndex: number
  label: string
  voiceEngineId?: string
  voiceId?: string
  speed?: number
  createdAt: number
}

interface AudiobookProgress {
  bookPath: string
  cfi: string
  sentenceIndex: number
  voiceEngineId?: string
  voiceId?: string
  speed: number
}

interface AudiobookState {
  // ── 激活状态 ──
  isActive: boolean
  isPlaying: boolean

  // ── 书籍信息 ──
  currentBookPath: string
  currentCfi: string

  // ── 句子数据 ──
  sentences: Sentence[]
  currentSentenceIdx: number

  // ── 音频队列 ──
  audioQueue: AudioChunk[]

  // ── TTS 配置 ──
  voiceEngineId: string    // 当前使用的 TTS 引擎 ID
  voiceId: string          // 当前使用的语音 ID
  speed: number            // 播放速度 0.5-4.0

  // ── UI 偏好 ──
  sleepTimerMinutes: number | null       // 定时关闭（分钟）
  sleepTimerStartedAt: number | null     // 定时器启动时间戳
  textFollowMode: boolean                // 文本跟随模式（自动滚动到高亮句）

  // ── 书签 ──
  bookmarks: AudiobookBookmark[]

  // ── 进度 ──
  currentProgress: AudiobookProgress | null

  // Actions
  setIsActive: (v: boolean) => void
  setIsPlaying: (v: boolean) => void
  initBook: (bookPath: string) => void
  setSentences: (sentences: Sentence[]) => void
  appendSentences: (sentences: Sentence[]) => void
  setCurrentSentenceIdx: (idx: number) => void
  updateSentenceStatus: (idx: number, status: Sentence['audioStatus']) => void
  addAudioChunk: (chunk: AudioChunk) => void
  setVoiceEngine: (engineId: string, voiceId: string) => void
  setSpeed: (speed: number) => void
  setSleepTimer: (minutes: number | null) => void
  setTextFollowMode: (v: boolean) => void
  setBookmarks: (bookmarks: AudiobookBookmark[]) => void
  updateProgress: (sentenceIdx: number) => void
  reset: () => void
}
```

---

## 四、语音包二次下载机制

### 4.1 设计原则

```
{userData}/tts-models/       ← 语音模型根目录
├── .manifest.json            ← 本地清单（版本/校验）
├── kokoro/                   ← Kokoro 模型
│   ├── kokoro-multi-lang-v1_0.onnx  (~160MB)
│   ├── tokens.txt
│   └── espeak-ng-data/       ← 音素化数据
├── supertonic/               ← Supertonic 模型
│   ├── dp.onnx               (~25MB)
│   ├── text_encoder.onnx     (~30MB)
│   ├── vector_estimator.onnx (~20MB)
│   ├── vocoder.onnx          (~24MB)
│   └── voice_styles/         ← 语音风格 JSON
├── piper/                    ← Piper 模型
│   ├── zh_CN-huayan-medium.onnx      (~50MB)
│   ├── zh_CN-huayan-medium.onnx.json
│   └── en_US-lessac-medium.onnx      (~50MB)
└── matcha/                   ← MATCHA-TTS 保底语音
    ├── matcha-icefall-zh-baker.onnx  (~8MB)
    └── tokens.txt
```

### 4.2 三层分级下载

**第一层：预打包（随安装包分发，零下载等待）**

| 项目 | 内容 |
|------|------|
| 引擎 | MATCHA-TTS |
| 模型 | matcha-icefall-zh-baker.onnx (~8MB) |
| 语言 | 中文（保底） |
| 场景 | 断网环境 / 首次启动 / 极低配设备 |
| 成本 | 安装包体积增加 ~8MB |

**第二层：首次启动后台静默下载（自动，有进度提示）**

| 项目 | 内容 |
|------|------|
| 引擎 | Sherpa-ONNX + Kokoro |
| 模型 | kokoro-multi-lang-v1_0.onnx (~160MB) |
| 语音 | 中文 8 种 + 英文 10+ 种 |
| 触发 | 首次启动完成 30 秒后 |
| 条件 | 检测到网络可用 |
| 体验 | 下载期间用第一层保底语音；完成后自动切换 |
| 通知 | 系统托盘显示 "TTS 语音包下载中 45%..." |
| | 设置页显示进度条，用户可暂停/取消 |

**第三层：用户按需手动下载（需用户主动操作）**

| 项目 | 内容 |
|------|------|
| 引擎 | Supertonic / Piper / 额外 Kokoro 语音 |
| 触发 | 用户在 TTS 设置页浏览语音列表 |
| 体验 | 点击"下载" → 进度条 → 完成后可试听 |
| 管理 | 已下载语音可删除释放空间 |

### 4.3 下载流程设计

用户在 TTS 设置页看到的界面：

```
┌─────────────────────────────────────────────────────────────┐
│  🔊 语音合成 (TTS)                                          │
│─────────────────────────────────────────────────────────────│
│  引擎：🏠 Sherpa-ONNX + Kokoro [本地免费]                    │
│                                                             │
│  ┌─ 已下载语音 ────────────────────────────────────────────┐ │
│  │ 🟢 中文 · 小北 (zf_xiaobei)  Kokoro · 78MB             │ │
│  │ 🟢 英文 · Bella (af_bella)    Kokoro · 80MB             │ │
│  └─────────────────────────────────────────────────────────┘ │
│  ┌─ 可供下载 ──────────────────────────────────────────────┐ │
│  │ ⬇️ 中文 · 小妮 (zf_xiaoni)     Kokoro · 75MB            │ │
│  │ ⬇️ 中文 · 逍遥 (度逍遥)        百度 · 12MB               │ │
│  │ ⬇️ 英文 · Nicole (af_nicole)   Kokoro · 78MB            │ │
│  │ ⬇️ 英文 · Lessac (Medium)       Piper · 52MB             │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─ ⚙️ 可选引擎 ──────────────────────────────────────────┐ │
│  │ ⬜ Supertonic (极速英文) [安装引擎 ~99MB]                │ │
│  │ ⬜ Piper CLI (多语言兜底) [已安装]                       │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  磁盘使用：已用 158MB / 可用 12.3GB                         │
│  [下载管理]  批量删除 · 清除缓存                            │
└─────────────────────────────────────────────────────────────┘
```

### 4.4 下载管理器 (VoiceManager)

主进程中的语音模型下载管理，复用项目 `@ffmpeg-installer` 的二进制管理思路和 `updater.ts` 的进度通知模式：

```typescript
// apps/desktop/src/main/tts/VoiceManager.ts

interface DownloadTask {
  engineId: string
  voiceId: string
  url: string                    // Hugging Face / 各引擎官方下载源
  targetPath: string             // 本地目标路径
  expectedSize?: number
  expectedSha256?: string        // 完整性校验
  status: 'pending' | 'downloading' | 'verifying' | 'completed' | 'failed' | 'cancelled'
  progress: number               // 0-100
  bytesDownloaded: number
  totalBytes: number
  error?: string
}

class VoiceManager {
  private tasks: Map<string, DownloadTask> = new Map()
  private downloadQueue: string[] = []
  private activeDownloads = 0
  private readonly MAX_CONCURRENT = 2

  /**
   * 开始下载语音模型
   * @returns taskId 用于查询进度和取消
   */
  async startDownload(engineId: string, voiceId: string): Promise<string> {
    const taskId = `${engineId}:${voiceId}`
    if (this.tasks.has(taskId) && this.tasks.get(taskId)!.status === 'downloading') {
      return taskId
    }

    const url = this.resolveDownloadUrl(engineId, voiceId)
    const targetPath = this.resolveTargetPath(engineId, voiceId)

    const task: DownloadTask = {
      engineId, voiceId, url, targetPath,
      status: 'pending', progress: 0,
      bytesDownloaded: 0, totalBytes: 0,
    }
    this.tasks.set(taskId, task)
    this.downloadQueue.push(taskId)
    this.processQueue()
    return taskId
  }

  /** 获取下载进度 */
  getProgress(taskId: string): DownloadTask | undefined {
    return this.tasks.get(taskId)
  }

  /** 取消下载 */
  cancelDownload(taskId: string): void { /* ... */ }

  /** 删除已下载的模型 */
  async deleteModel(engineId: string, voiceId: string): Promise<void> { /* ... */ }

  /** 校验模型完整性 */
  async verifyModel(engineId: string, voiceId: string): Promise<boolean> { /* ... */ }

  /** 获取本地已下载模型清单 */
  getLocalManifest(): LocalManifest { /* ... */ }

  private async processQueue(): Promise<void> { /* 并发控制 + fetch + 进度广播 */ }

  /** 解析下载源 URL */
  private resolveDownloadUrl(engineId: string, voiceId: string): string {
    const SOURCES: Record<string, string> = {
      'kokoro': 'https://huggingface.co/csukuangfj/kokoro-multi-lang-v1_0/resolve/main/',
      'sherpa-onnx': 'https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models/',
      'supertonic': 'https://huggingface.co/Supertone/supertonic/resolve/main/assets/onnx/',
      'piper': 'https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/',
    }
    return SOURCES[engineId] ?? ''
  }

  private resolveTargetPath(engineId: string, voiceId: string): string {
    // → {userData}/tts-models/{engineId}/{voiceId}
  }
}
```

### 4.5 下载流程 IPC 接口

新增 `tts:download-voice`、`tts:get-download-progress`、`tts:cancel-download` 三个 IPC 通道：

```typescript
// preload/index.ts 补充
api.tts = {
  // ... 原有合成接口

  /** 开始下载语音模型，返回 taskId */
  downloadVoice: (engineId: string, voiceId: string)
    => ipcRenderer.invoke('tts:download-voice', engineId, voiceId),

  /** 获取下载进度 */
  onDownloadProgress: (callback: (task: DownloadTask) => void) => {
    const listener = (_event: any, task: DownloadTask) => callback(task)
    ipcRenderer.on('tts:download-progress', listener)
    return () => ipcRenderer.removeListener('tts:download-progress', listener)
  },

  /** 取消下载 */
  cancelDownload: (taskId: string)
    => ipcRenderer.invoke('tts:cancel-download', taskId),
}
```

---

## 五、播放器 UI 设计

### 5.1 内嵌播放条 (`AudiobookPlayer.tsx`)

渲染在 EPUB 阅读器底部，与全局 MiniPlayer 互斥（同一时间只有一个音频输出）：

```
┌────────────────────────────────────────────────────────────────────┐
│ 📖 当前朗读句子文本（字幕式，单行滚动，超出时跑马灯）              │
│ "夜色沉沉地压下来，林峰推开那扇半掩的木门——门轴发出一声悠长的呻吟—— │
│  屋内一片漆黑，只有窗缝里漏进几缕月光，在地板上画出冷白色的格子。"  │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ⏮  ⏪ -10s  ▶ / ⏸  ⏩ +30s  ⏭                                  │
│  上一章  后退  播放/暂停  快进  下一章                             │
│                                                                    │
│  ──●────────────────────────────────────── 12:34 / 45:12          │
│       进度条（可拖拽）                  已播 / 全书预估             │
│                                                                    │
│  🔊 小北(中文) │ 语速 1.25x │ ⏱ 30分钟后 │ 📎 书签 │ ⚙          │
│  语音选择器     语速调节      定时关闭      添加书签   更多         │
└────────────────────────────────────────────────────────────────────┘
```

### 5.2 与全局 MiniPlayer 的关系

```
有声书模式激活时:
 1. 暂停全局 useMediaPlayerStore（保留队列和播放位置）
 2. 隐藏 MiniPlayer / FullPlayer（isVisible = false）
 3. 渲染 AudiobookPlayer 在 EPUB 阅读器底部
 4. AudiobookPlayer 使用独立 Audio 元素

用户关闭有声书时:
 1. AudiobookPlayer destroy → 释放 Audio 元素
 2. 保存进度到 SQLite
 3. 恢复全局 useMediaPlayerStore（但不自动播放，等用户操作）
 4. MiniPlayer 重新可见

用户手动切换到 MiniPlayer 模式:
 1. AudiobookPlayer 右上角 [📱] 按钮
 2. AudiobookPlayer 转为 MiniPlayer 模式渲染
 3. 方便用户最小化阅读器后继续听书
```

### 5.3 语音选择器 (`AudiobookVoiceSelector.tsx`)

```
┌──────────────────────────────┐
│  选择朗读语音                 │
│──────────────────────────────│
│  ┌─ 🏠 本地免费 ────────────┐ │
│  │ 🔘 小北 (zf_xiaobei)    │ │
│  │    中文 · Kokoro · 78MB  │ │
│  │ ○  小妮 (zf_xiaoni)     │ │
│  │    中文 · Kokoro · 75MB  │ │
│  │ ○  Bella (af_bella)     │ │
│  │    英文 · Kokoro · 80MB  │ │
│  └──────────────────────────┘ │
│  ┌─ ☁️ 云端高级（需配 Key）──┐ │
│  │ ○  度逍遥 (阿里云)       │ │
│  │    中文 · 精品音色        │ │
│  │ ○  Alloy (OpenAI)        │ │
│  │    英文 · tts-1           │ │
│  └──────────────────────────┘ │
│                               │
│  [试听选中语音]  [管理语音包]  │
└──────────────────────────────┘
```

### 5.4 定时关闭 (`AudiobookSleepTimer.tsx`)

```
┌──────────────────────────────┐
│  ⏱ 定时关闭                  │
│──────────────────────────────│
│  ○ 关闭                      │
│  ○ 15 分钟后                 │
│  ● 30 分钟后                 │
│  ○ 60 分钟后                 │
│  ○ 90 分钟后                 │
│  ○ 当前章节结束时            │
│                              │
│  剩余: 约 23 分钟            │
│  [确定]                      │
└──────────────────────────────┘
```

---

## 六、进度持久化与断点恢复

### 6.1 数据库设计

```sql
-- 有声书播放进度
CREATE TABLE IF NOT EXISTS audiobook_progress (
  book_path TEXT PRIMARY KEY,
  cfi TEXT NOT NULL,                              -- epubjs CFI 位置
  sentence_index INTEGER NOT NULL DEFAULT 0,      -- 章节内句子全局索引
  voice_engine_id TEXT,                           -- 上次使用的 TTS 引擎
  voice_id TEXT,                                  -- 上次使用的语音
  speed REAL NOT NULL DEFAULT 1.0,                -- 播放速度
  position_ms INTEGER NOT NULL DEFAULT 0,         -- 音频位置（毫秒）- 预留
  updated_at INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000)
);

-- 有声书书签
CREATE TABLE IF NOT EXISTS audiobook_bookmarks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  book_path TEXT NOT NULL,
  cfi TEXT NOT NULL,                              -- 书签位置的 CFI
  sentence_index INTEGER,                         -- 书签位置的句子索引
  label TEXT,                                     -- 用户自定义名称
  voice_engine_id TEXT,
  voice_id TEXT,
  speed REAL,
  created_at INTEGER NOT NULL DEFAULT (strftime('%s','now') * 1000)
);

-- 播放统计
CREATE TABLE IF NOT EXISTS audiobook_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  book_path TEXT NOT NULL,
  book_title TEXT,                                -- 书名（从 epub meta 提取）
  started_at INTEGER NOT NULL,                    -- 开始时间戳
  ended_at INTEGER,                               -- 结束时间戳
  duration_seconds INTEGER,                       -- 实际播放时长（秒）
  sentences_read INTEGER DEFAULT 0,               -- 朗读句子总数
  voice_engine_id TEXT,
  voice_id TEXT,
  speed REAL
);
```

### 6.2 保存策略

| 触发条件 | 保存内容 | 说明 |
|---------|---------|------|
| 每 5 秒定时 | `audiobook_progress` 全部字段 | 精确到当前句子索引 |
| 用户暂停 | `audiobook_progress` | 立即保存 |
| 用户翻页（epubjs relocated） | CFI + sentence_index | 跨章节关键节点 |
| 用户关闭有声书 | `audiobook_progress` + `audiobook_history` 写入结束时间 | |
| 用户添加书签 | `audiobook_bookmarks` 插入新行 | 含自定义标签 |
| 应用退出前 | `audiobook_progress` + `audiobook_history` | beforeunload 事件 |

### 6.3 断点恢复流程

```
用户打开 EPUB 文件
 │
 ├─ 1. 检查 audiobook_progress (book_path = current)
 │   ├─ 有记录 → 显示 "上次听到第 X 章，是否继续？"
 │   │   ├─ 是 → rendition.display(savedCfi) → 从 sentence_index 继续
 │   │   └─ 否 → 清除进度，从头开始
 │   └─ 无记录 → 正常阅读模式
 │
 └─ 2. 恢复上次使用的语音和语速（从 audiobook_progress 字段）
```

---

## 七、自动翻页逻辑

### 7.1 核心机制

```
播放句子 N 时:
 │
 ├─ 1. doc.querySelector(`[data-tts-idx="${N}"]`) → 找到 DOM 元素
 │
 ├─ 2. getBoundingClientRect() → 获取元素的视口位置
 │
 ├─ 3. 判断: rect.bottom > viewerRect.bottom？
 │   ├─ 否 → 句子完全在视口内，无需翻页
 │   └─ 是 → 句子底部超出视口
 │       │
 │       └─ 4. 调用 rendition.next()（epubjs 自动跨章节处理）
 │           │
 │           └─ 5. relocated 事件触发
 │               ├─ 新页面 DOM 就绪 → 重新提取句子 + 重新标记
 │               ├─ 全局句子索引继续递增（不重置）
 │               └─ 恢复高亮当前句
```

### 7.2 跨章节连续播放

epubjs 的 `rendition.next()` 在到达当前章节最后一页时，**自动加载下一章**并触发 `relocated` 事件。这使得有声书天然支持跨章节连续播放：

```
章节 A (Section 1, 3 页)       章节 B (Section 2, 5 页)
┌─────┐ ┌─────┐ ┌─────┐     ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│页 1 │ │页 2 │ │页 3 │ → next() → │页 4 │ │页 5 │ │页 6 │ │页 7 │ ...
└─────┘ └─────┘ └─────┘     └─────┘ └─────┘ └─────┘ └─────┘
                              ↑ relocated: section=2, page=4 ↑
                              重新提取句子，追加到 sentences[] 继续播放
```

```typescript
// relocated 事件处理
rendition.on('relocated', (loc: any) => {
  if (!audiobookStore.isActive) return

  const newHref = loc.start?.href  // 新章节的 href
  const newCfi = loc.start?.cfi

  // 更新 CFI
  audiobookStore.setCurrentCfi(newCfi)

  setTimeout(() => {
    const doc = rendition.getContents()?.[0]?.document
    if (!doc) return

    // 新章节 → 提取新句子并追加
    const newSentences = extractSentences(doc)
    markSentencesInDOM(doc, newSentences)
    audiobookStore.appendSentences(newSentences)

    // 恢复上一句高亮（可能在新页面中）
    highlightSentence(doc, audiobookStore.currentSentenceIdx)
  }, 200)
})
```

---

## 八、特色功能详细设计

### 8.1 功能清单与优先级

| 功能 | 优先级 | 说明 |
|------|:--:|------|
| **断点续听** | P0 | 记录最后 CFI + 句子索引，下次打开提示恢复 |
| **多语音选择** | P0 | 从已下载的本地语音列表中选择 |
| **语速调节** | P0 | 0.5x-4.0x，滑块 + 预设按钮 |
| **逐句高亮** | P0 | 当前朗读句黄色背景，已读句淡灰色 |
| **自动翻页** | P0 | 高亮句超出视口自动 rendition.next() |
| **字幕显示** | P1 | 播放器顶部显示当前句完整文本 |
| **定时关闭** | P1 | 15/30/60/90 分钟 / 当前章节结束 |
| **快进快退** | P1 | -10s / +30s 快捷跳转（跨句边界） |
| **章节导航** | P1 | ⏮上一章 / ⏭下一章（通过 TOC/spine） |
| **书签** | P1 | 命名书签 + 跳转 + 恢复语音/语速 |
| **跳过非正文** | P1 | 自动跳过页眉/页码/脚注 |
| **文本跟随** | P2 | 高亮句始终在视口中央（`scrollIntoView`） |
| **播放历史** | P2 | 每次听书记录时长/日期/书名 |
| **导出音频** | P2 | 当前章/全书导出 WAV/MP3（后台批量合成） |
| **音效优化** | P2 | 句间 200ms 间隔 / 淡入淡出 / 长句停顿 |
| **进度条拖拽** | P2 | 已合成的句子可拖拽跳转 |
| **语音预览** | P2 | 每个语音试听一句测试文本 |
| **多人朗读** | P3 | 基于 epub 语义标注（角色），需模型支持 |
| **播放统计面板** | P3 | 今日/本周/总计听书时长仪表板 |

### 8.2 字幕实现

```typescript
// AudiobookPlayer 中的字幕行
{subtitle && currentSentence && (
  <div className="audiobook-subtitle" style={{
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    padding: '6px 12px',
    fontSize: '13px',
    color: '#ccc',
    background: 'rgba(0,0,0,0.3)',
    borderRadius: '4px',
  }}>
    {currentSentence.text.length > 80
      ? currentSentence.text.slice(0, 77) + '...'
      : currentSentence.text
    }
  </div>
)}
```

### 8.3 快进快退

```
快退 -10s: 当前的句子不是第一句，计算前 N 句的音频总时长
  跳到超过 10 秒的那个句子 → 从该句重新播放

快进 +30s: 类似逻辑，向前跳过 ~30 秒的句子

实现依赖: 每个 AudioChunk 携带已知 duration（TTS 合成后填充）
  实时 accumulative 时长可通过累加 played chunks 获取
```

### 8.4 导出音频

```
用户点击 "导出本章为 MP3"
 │
 ├─ 1. 收集本章全部句子的文本（已提取）
 ├─ 2. 显示进度弹窗：
 │    "正在合成第 12/156 句..."
 │    [████████░░░░░░░░] 45%
 ├─ 3. 逐句调用 api.tts.speak() 获取 WAV 文件
 ├─ 4. 合并全部 WAV → 调用 IPC 通知主进程用 FFmpeg 拼接
 │    ffmpeg -f concat -i list.txt -c copy output.wav
 ├─ 5. 可选转码为 MP3
 │    ffmpeg -i output.wav -codec:a libmp3lame -b:a 128k output.mp3
 └─ 6. 弹出保存对话框 → 用户选择保存路径
```

---

## 九、文件清单

```
新增文件（11 个）:
═══════════════════════════════════════

渲染进程 - 核心逻辑（3 个）:
├── apps/desktop/src/renderer/src/
│   ├── hooks/useAudiobook.ts          # 核心调度 Hook（TTS 队列+播放+同步）
│   ├── utils/textSplitter.ts          # 文本提取+分句+非正文过滤
│   └── utils/domMarker.ts             # DOM 句子标记+高亮管理

渲染进程 - 状态管理（1 个）:
├── apps/desktop/src/renderer/src/
│   └── store/useAudiobookStore.ts     # 有声书 Zustand Store

渲染进程 - UI 组件（4 个）:
├── apps/desktop/src/renderer/src/components/
│   ├── AudiobookPlayer.tsx            # 内嵌播放条（字幕+控制+进度）
│   ├── AudiobookVoiceSelector.tsx     # 语音选择弹窗（本地/云端）
│   ├── AudiobookSleepTimer.tsx        # 定时关闭设置弹窗
│   └── AudiobookBookmarkList.tsx      # 书签列表管理

主进程 - DB + 语音管理（2 个）:
├── apps/desktop/src/main/tts/
│   ├── VoiceManager.ts                # 语音模型下载/缓存/校验/清单
│   └── AudiobookProgressDB.ts         # 进度/书签/统计 DB CRUD

主进程 - 入口修改（1 个）:
└── apps/desktop/src/main/index.ts     # 新增 tts:download-voice / audiobook:* IPC

预加载/类型修改（2 个）:
├── apps/desktop/src/preload/index.ts  # 新增 api.audiobook / api.tts.downloadVoice
└── apps/desktop/src/renderer/src/env.d.ts  # 类型声明

────────

修改文件（1 个，约 +200 行）:
└── apps/desktop/src/renderer/src/components/previews/
    └── EpubPreview.tsx                # 嵌入"朗读"按钮 + 播放停靠区 + relocated 同步
```

---

## 十、实施计划

### 10.1 里程碑

```
═══════════════════════════════════════════════════════════════
Milestone 0：前置依赖 —— TTS Phase 1 本地引擎（14-20 天）
═══════════════════════════════════════════════════════════════
  交付物: api.tts.speak() IPC 可用 + 本地引擎就绪 + 语音模型按需下载
  验收标准: 右键消息"朗读"能出声

  注：本有声书方案的所有 TTS 依赖均通过 api.tts.speak() 满足，
  不依赖远程云引擎。Milestone 0 完成即可开始有声书开发。

═══════════════════════════════════════════════════════════════
Milestone 1：核心有声书循环（+7-9 天）
═══════════════════════════════════════════════════════════════
  交付物:
  ├─ textSplitter.ts + domMarker.ts（文本处理+DOM标记）
  ├─ useAudiobookStore.ts（状态管理）
  ├─ useAudiobook.ts（核心调度：合成→播放→高亮→翻页）
  ├─ AudiobookPlayer.tsx（基础版：播放/暂停+进度条+字幕）
  └─ EpubPreview.tsx 集成（朗读按钮+播放停靠区）
  验收标准: 打开 EPUB → 点"朗读" → 逐句高亮 + 自动翻页 + 可暂停

═══════════════════════════════════════════════════════════════
Milestone 2：播放体验完善（+3-5 天）
═══════════════════════════════════════════════════════════════
  交付物:
  ├─ AudiobookVoiceSelector.tsx（语音选择+试听）
  ├─ AudiobookSleepTimer.tsx（定时关闭）
  ├─ 语速调节 + 快进快退
  ├─ 跨章节连续播放验证
  └─ 全局播放器互斥逻辑
  验收标准: 可选语音/语速 + 定时关闭 + 跨章节不断播

═══════════════════════════════════════════════════════════════
Milestone 3：进度与书签（+2-3 天）
═══════════════════════════════════════════════════════════════
  交付物:
  ├─ AudiobookProgressDB.ts（SQLite 表 + CRUD IPC）
  ├─ 断点恢复提示弹窗
  └─ AudiobookBookmarkList.tsx（书签增删改查+跳转）
  验收标准: 关闭重开可恢复 + 书签可用

═══════════════════════════════════════════════════════════════
Milestone 4：打磨与高级功能（+2-3 天）
═══════════════════════════════════════════════════════════════
  交付物:
  ├─ 文本跟随模式（scrollIntoView）
  ├─ 播放统计
  ├─ 导出音频功能
  ├─ 音效优化（句间停顿+淡入淡出）
  └─ 边界测试（空章节/纯图片章/长句/并发取消/网络中断降级）
  验收标准: 各种边界情况不崩溃

═══════════════════════════════════════════════════════════════
  总计: +14-20 天 (纯有声书部分)
  含 TTS: 28-40 天 (TTS 14-20 + 有声书 14-20)
═══════════════════════════════════════════════════════════════
```

### 10.2 技术风险与缓解

| 风险 | 等级 | 缓解措施 |
|------|:--:|------|
| epubjs 0.3.x 的 DOM 操作不稳定 | 🟡 | 已有大量 patch 经验（EpubPreview.tsx 含多个 workaround）；domMarker 通过 TreeWalker 而非 innerHTML 操作 |
| 长句 TTS 合成时间 > 播放时间 | 🟡 | 预缓冲 5-8 句；超快引擎（Supertonic）天然无此问题 |
| 跨章节换页间隙可能断播 | 🟡 | relocated 事件 200ms 延迟后重新标记；跨章间隙插入 500ms 静音 |
| epub 无文本（纯图片 PDF 合成的 epub） | 🟢 | extractSentences 返回空数组 → 提示"本章无可朗读文本" |
| TTS 引擎编译失败 | 🟢 | 降级链已设计（Sherpa → Piper CLI → MATCHA-TTS） |
| 中文分句不精确 | 🟡 | 分句正则经过三轮迭代；Phase 2 可引入更精确的 NLP 分句 |

---

## 十一、与全局 TTS 方案的衔接

有声书模块完全基于 TTS Phase 1 的本地引擎运行，与远程云服务的关系如下：

```
TTS 方案中的引擎分层 → 有声书如何使用
─────────────────────────────────────────────────────
🏠 Phase 1 本地引擎（默认） → ✅ 有声书默认使用，零成本
  ├─ Sherpa-ONNX + Kokoro  → 中文有声书主力
  ├─ Supertonic            → 英文有声书极速
  └─ Piper CLI + MATCHA-TTS → 编译失败 / 极低配兜底

☁️ Phase 2 远程云引擎（可选） → ✅ 高级用户在设置页配好 Key 后可选
  ├─ 阿里云 / 火山引擎等   → 追求最佳中文音质时切换
  └─ OpenAI / Google 等    → 多语言有声书场景

💎 Phase 3 专业增强（可选） → ✅ 语音克隆场景
  └─ ElevenLabs             → 用户自备订阅后可用来读英文书
```

**对有声书用户来说，TTS 引擎的切换是透明的**——他们只需在语音选择器中挑一个语音，系统自动路由到对应的引擎。如果没有配置远程引擎，语音选择器只显示本地已下载的语音。

---

## 十二、性能预估

| 指标 | 本地 Kokoro | 本地 Supertonic | 远程阿里云 |
|------|:--:|:--:|:--:|
| 单句合成延迟（15 字中文） | ~0.5s | N/A (无中文) | ~0.3s |
| 单句合成延迟（15 词英文） | ~0.3s | ~0.01s | ~0.2s |
| 预缓冲 5 句时间 | ~2.5s | ~0.05s | ~1.5s |
| 首次交互到开始播放 | ~2-3s | ~0.5s | ~1-2s |
| 跨章节间隙 | <1s | <1s | <1s |
| 内存占用 (模型加载后) | ~300MB | ~150MB | ~0（无本地模型） |
| 磁盘占用 | ~160MB | ~99MB | 0 |

**结论：Supertonic 在英文有声书场景下几乎是即时响应；Kokoro 中文场景需 2-3 秒预缓冲后即可流畅播放。** 两者都满足"边合成边播放"的体验要求。
