---
title: 'unobox TTS 多引擎集成评估报告'
date: 2026-06-14 23:00:00
categories: 技术
tags: [TTS, Electron, 语音合成, 架构设计, unobox]
---

> 评估日期：2026-06-05 | 评估对象：unobox 桌面端 (Electron)
> 评估范围：本地引擎 4 种 + 国内云 5 种 + 国际云 5 种，共 14 种方案

---

## 一、现状分析

### 有利条件（已有基础设施）

| 基础设施 | 状态 | 说明 |
|---------|------|------|
| 音频播放引擎 (`useAudioEngine`) | ✅ 完整 | 隐藏 `HTMLAudioElement`，支持 blob URL、进度保存 |
| 媒体播放器 Store (`useMediaPlayerStore`) | ✅ 完整 | 队列管理、倍速、循环模式、Mini/Full 两种 UI |
| 播放器 UI (`MiniPlayer` / `FullPlayer`) | ✅ 完整 | 迷你播放栏 + 全屏播放器，开箱即用 |
| 自定义协议 (`unbox-file://`) | ✅ 完整 | 支持 Range 请求、流式传输大文件 |
| IPC 桥接模式 | ✅ 完整 | `namespace:action` 约定，流式/非流式两种模式 |
| `IServerProvider` 多 Provider 架构 | ✅ 完整 | TTS 引擎切换可直接复用 ProviderManager 热插拔模式 |
| `MediaSource` 类型 | ✅ 已预留 `'ai'` | 在 `audioPlayer.ts` 第 8 行，直接可用 |

### 缺失部分

零 TTS 代码。无语音合成引擎、无语音下载管理、无 TTS 设置界面。

---

## 二、TTS 引擎全景对比

### 2.1 引擎分类

```
TTS 引擎全集（14 种）
├── 🏠 本地离线引擎（4 种）
│ ├── Sherpa-ONNX + Kokoro ← 主力：中英文双语高质
│ ├── Supertonic TTS ← 极速：英文/韩文
│ ├── Piper TTS ← 兜底：40+ 语言覆盖
│ ├── PaddleSpeech ← 开源：中文离线（Python子进程）
│ └── Pico TTS (SVOX) ← 不推荐：无中文
│
├── 🇨🇳 国内云 TTS（4 种）—— 中文质量最优
│ ├── 阿里云 TTS (Qwen3-TTS) ← 综合最佳
│ ├── 火山引擎 TTS (豆包语音) ← 长文本最低价
│ ├── 腾讯云 TTS ← 预付费最便宜
│ └── 百度智能云 TTS ← 免费额度最大方
│
└── 🌍 国际云 TTS（5 种）—— 多语言/高质量
 ├── OpenAI TTS ← AI 原生，gpt-4o-mini-tts
 ├── Google Cloud TTS ← 语言最多（75+）
 ├── Amazon Polly ← AWS 生态
 ├── Azure Speech ← 国内版便宜
 └── ElevenLabs ← 质量天花板 + 语音克隆
```

### 2.2 本地引擎核心指标对比

| 维度 | Sherpa-ONNX + Kokoro | Supertonic TTS | Piper TTS | PaddleSpeech | Pico TTS |
|------|:---:|:---:|:---:|:---:|:---:|
| **语音质量** | ⭐⭐⭐⭐⭐ TTS Arena #1 | ⭐⭐⭐⭐ 自然稳定 | ⭐⭐⭐⭐ 自然流畅 | ⭐⭐⭐⭐ 中文良好 | ⭐⭐ 机械感强 |
| **中文支持** | ✅ 8 种中文语音 | **❌ 不支持** | ✅ 约 5-6 种 | ✅ 中文原生 | **❌ 不支持** |
| **语言总数** | ~10 种 | 31 种（无中文） | 40+ 种 | ~10 种 | 仅 6 种 |
| **模型体积** | ~160MB | ~99MB | 30-80MB/语音 | ~300MB（完整） | ~2MB |
| **CPU 推理** | ~1-3x 实时 | **167x 实时** | >1x 实时 | ~1-3x 实时 | 极快 |
| **GPU 推理** | CUDA 可选 | **1000x 实时** | 不支持 | 不支持 | 不支持 |
| **流式合成** | ✅ | ❌（分块模式） | ✅ | ✅（服务模式） | ❌ |
| **集成方式** | npm 原生插件 / WASM | npm 原生插件 | CLI 子进程 | Python CLI 子进程 | CLI 子进程 |
| **许可协议** | Apache 2.0 | MIT / OpenRAIL-M | MIT | Apache 2.0 | Apache 2.0 |
| **活跃维护** | ✅ 非常活跃 | ✅ 极其活跃 | ✅ 活跃 | ✅ 活跃 | ❌ 近乎停止 |
| **在 unobox 中的定位** | **主力引擎** | 英文极速引擎 | 编译失败兜底 | 中文离线备选 | **不推荐** |

### 2.3 国内云 TTS 核心指标对比

| 维度 | 阿里云 (Qwen3-TTS) | 火山引擎 (豆包语音) | 腾讯云 | 百度智能云 |
|------|:---:|:---:|:---:|:---:|
| **中文质量** | ⭐⭐⭐⭐⭐ WER 1.9% | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **语音数量** | 49 种音色 | 多款基础+精品 | 标准+精品+大模型 | 基础+精品+臻品+大模型 |
| **方言支持** | ✅ 9 种方言 | 部分支持 | 部分支持 | ✅ 粤语等 |
| **免费额度** | 100 万字符/月 | 基础音色免费 | 精品 800 万字符（3 月） | 个人 5 万次（180 天） |
| **长文本单价** | ¥0.8/万字符 | **¥1.0/万字符** | ¥0.75/万字符（预付费） | ¥1.7/万字符 |
| **短文本单价** | ¥1.0/千次（预付费） | ¥4/千次 | — | ¥12/万次（预付费） |
| **流式合成** | ✅ | ✅ | ✅ | ✅（WebSocket） |
| **Node.js SDK** | ✅ DashScope SDK | ✅ `@volcengine/openapi` | ✅ `tencentcloud-sdk-nodejs-tts` | ❌ 需手动 HTTP |
| **自定义语音** | ✅ 10 个免费音色 | ✅ 声音复刻 | ❌ | ✅ 个性化定制 |
| **SSML 支持** | ✅ 完整 | ✅ | ✅ | ✅ |
| **在 unobox 中的定位** | **国内首选远程** | 长文本性价比王 | 预付费最省钱 | 免费额度最慷慨 |

### 2.4 国际云 TTS 核心指标对比

| 维度 | OpenAI TTS | Google Cloud TTS | Amazon Polly | Azure Speech | ElevenLabs |
|------|:---:|:---:|:---:|:---:|:---:|
| **语音质量** | ⭐⭐⭐⭐⭐ AI 原生 | ⭐⭐⭐⭐⭐ Chirp 3 HD | ⭐⭐⭐⭐ 可接受 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ 行业最佳 |
| **免费额度** | $5 新用户赠送 | 标准 400 万字符/月 | 标准 500 万字符/月（首年） | 神经 50 万字符/月 | 1 万字符/月 |
| **神经语音价** | $15/百万字符 | $16/百万字符 | $16/百万字符 | $15/百万字符 | $5/月起（订阅制） |
| **中文支持** | ✅ 但偏僵硬 | ✅ 普通话/粤语 | ✅ 普通话/粤语 | ✅ 普通话/粤语 | ✅ 多语言 v2 |
| **语言总数** | ~20 种 | 75+ 种 | 40+ 种 | 50+ 种 | 30+ 种 |
| **语音数量** | 13 种（含 gpt-4o-mini-tts） | 380+ | 100+ | 300+ | 按需克隆 |
| **流式合成** | ✅ 实时流式 | ✅ | ✅ | ✅ | ✅ 极低延迟 |
| **语音克隆** | ❌ | ✅ Instant Custom Voice | ✅ Brand Voice | ✅ Custom Neural Voice | ✅ **从 1 分钟音频** |
| **Node.js SDK** | ✅ `openai` | ✅ `@google-cloud/text-to-speech` | ✅ `@aws-sdk/client-polly` | ✅ `microsoft-cognitiveservices-speech-sdk` | ✅ REST API |
| **输出格式** | MP3/Opus/AAC/FLAC/WAV | MP3/WAV/OGG/PCM | MP3/OGG/PCM | MP3/WAV/OGG/PCM | MP3/WAV/OGG/PCM |
| **速度控制** | ✅ 0.25-4.0x | ✅ SSML | ✅ SSML | ✅ SSML | ✅ |
| **在 unobox 中的定位** | AI 对话最佳 | 语言覆盖最广 | 成本最低国际 | 国内节点便宜 | 高端付费首选 |

### 2.5 PaddleSpeech 详细分析

**PaddleSpeech** 是百度飞桨开源的端到端语音工具包，不同于百度智能云的商业 API，它是完全本地运行的。

| 特性 | 说明 |
|------|------|
| **定位** | 开源离线语音工具包（Apache 2.0） |
| **中文模型** | `fastspeech2_csmsc` / `tacotron2_csmsc` + `hifigan_csmsc` 声码器 |
| **中英混合** | `fastspeech2_mix` 模型支持中英混合合成 |
| **多音色** | 174 个多说话人模型（CSMSC 数据集，仅限非商业用途） |
| **流式合成** | ✅ 支持 HTTP 流式服务模式 |
| **ONNX 加速** | ✅ `use_onnx=True` 启用 ONNX Runtime 推理加速 |
| **安装** | `pip install paddlepaddle paddlespeech` |
| **首次使用** | 自动下载预训练模型（数百 MB），之后可离线 |
| **集成方式** | Python CLI 子进程（`paddlespeech tts --input "..." --output out.wav`） |
| **自定义语音** | ✅ 语音克隆模型 AISHELL3-VC + 声音转换 |
| **关键限制** | CSMSC 数据集非商业许可；需 Python + PaddlePaddle 环境（额外 ~2GB） |
| **在 unobox 中的定位** | **开源可定制中文备选**；Python 依赖是最大门槛，适合开发者/极客 |

---

## 三、集成方案推荐

### 3.1 架构设计：统一的 ITTSProvider 接口

项目已有 `IServerProvider` 多服务商架构（`ProviderManager` 管理多个 Provider 热插拔），TTS 引擎切换可直接复用此模式。`ITTSProvider` 接口对调用方来说，本地 Kokoro 和远程 OpenAI TTS 没有任何区别：

```typescript
// packages/core/src/providers/ITTSProvider.ts（新增）

interface ITTSProvider {
  readonly id: string // 'sherpa-onnx' | 'supertonic' | 'piper-cli' | 'paddlespeech' |
                      // 'aliyun-qwen3' | 'volcengine' | 'tencent-cloud' | 'baidu-cloud' |
                      // 'openai' | 'google-cloud' | 'amazon-polly' | 'azure-speech'
  readonly name: string      // 展示名称
  readonly type: 'local' | 'remote'
  readonly priority: number  // 推荐排序

  /** 当前环境是否可用 */
  isAvailable(): Promise<boolean>

  /** 已安装/已配置的语音列表 */
  getVoices(): Promise<TTSVoice[]>

  /** 合成语音 → 返回 PCM/WAV buffer */
  synthesize(text: string, voiceId: string, opts: TTSOptions): Promise<AudioResult>

  /** 流式合成（长文本逐句输出） */
  synthesizeStream?(text: string, voiceId: string, opts: TTSOptions): AsyncIterable<AudioChunk>

  /** 远程引擎特有：是否需要 API Key */
  readonly requiresAuth: boolean

  /** 远程引擎特有：设置认证凭据 */
  setCredentials?(credentials: TTSApiCredentials): Promise<{ valid: boolean; error?: string }>

  /** 安装/更新引擎 */
  install?(): Promise<{ success: boolean; error?: string }>

  /** 下载语音模型 */
  downloadVoice?(voiceId: string, onProgress?: (pct: number) => void): Promise<{ success: boolean }>

  /** 释放资源 */
  dispose(): void
}
```

### 3.2 系统架构图

```
渲染进程（Renderer）                   主进程（Main Process）
══════════════════════                 ════════════════════════════

TTSStore (Zustand)                    TTSManager（类似 ProviderManager）
├─ currentEngine: ITTSProvider         ├─ engines: ITTSProvider[]
├─ voices: TTSVoice[]                  │   │
├─ preferences:                        │   ├─ 🏠 本地引擎（4 种）
│  ├─ enginePriority: 'local-first'    │   │  ├─ SherpaOnnxProvider（主力）
│  └─ fallbackChain: [...]             │   │  ├─ SupertonicProvider（极速英文）
│                                       │   │  ├─ PiperCliProvider（兜底）
 IPC bridge                             │   │  └─ PaddleSpeechProvider（中文开源）
┌──────────────────────────┐            │   │
│ api.tts.*                 │            │   ├─ 🇨🇳 国内云（4 种）
│ - getEngines()            │            │   │  ├─ AliyunQwen3Provider
│ - setEngine()             │            │   │  ├─ VolcengineProvider
│ - getVoices()             │            │   │  ├─ TencentCloudProvider
│ - speak()                 │            │   │  └─ BaiduCloudProvider
│ - speakStream()           │            │   │
│ - setCredentials()        │            │   └─ 🌍 国际云（5 种）
│ - downloadVoice()         │            │     ├─ OpenAIProvider
│ - previewVoice()          │            │     ├─ GoogleCloudProvider
└──────────────────────────┘            │     ├─ AmazonPollyProvider
                                         │     ├─ AzureProvider
useMediaPlayerStore                      │     └─ ElevenLabsProvider
└─ playOrEnqueue({ source: 'ai' })       │
                                         ├─ VoiceManager（统一模型/语音管理）
MiniPlayer / FullPlayer                  │  ├─ 模型下载（Hugging Face / 各云存储）
└─ 零改动，完全复用                      │  ├─ 缓存管理（{userData}/tts-models/）
                                          │  └─ 格式校验
                                          │
                                          └─ IPC Handlers
                                            ├─ tts:get-engines / tts:set-engine
                                            ├─ tts:get-voices / tts:download-voice
                                            ├─ tts:speak / tts:speak-stream
                                            └─ tts:set-credentials
```

### 3.3 各引擎集成方式总结

| 类别 | 引擎 | 集成方式 | 技术栈 | 复杂度 |
|------|------|---------|--------|:----:|
| 🏠 本地 | Sherpa-ONNX + Kokoro | npm 预编译平台包 + WASM 兜底 | onnxruntime-node | ⭐⭐ 中 |
| 🏠 本地 | Supertonic TTS | 官方 nodejs/ 移植，4 个 ONNX session | onnxruntime-node | ⭐⭐ 中 |
| 🏠 本地 | Piper TTS | CLI 子进程 stdin→stdout | child_process | ⭐ 低 |
| 🏠 本地 | PaddleSpeech | Python CLI 子进程 | child_process (Python) | ⭐⭐ 中 |
| 🇨🇳 国内云 | 阿里云 Qwen3-TTS | DashScope SDK / REST API | `dashscope` npm | ⭐ 低 |
| 🇨🇳 国内云 | 火山引擎 | OpenAPI SDK | `@volcengine/openapi` npm | ⭐ 低 |
| 🇨🇳 国内云 | 腾讯云 | 专用 SDK | `tencentcloud-sdk-nodejs-tts` | ⭐ 低 |
| 🇨🇳 国内云 | 百度智能云 | HTTP REST（无 SDK） | axios + Bearer Token | ⭐ 低 |
| 🌍 国际云 | OpenAI | OpenAI Node.js SDK | `openai` npm | ⭐ 低 |
| 🌍 国际云 | Google Cloud | 官方 gax 客户端 | `@google-cloud/text-to-speech` | ⭐ 低 |
| 🌍 国际云 | Amazon Polly | AWS JS SDK v3 | `@aws-sdk/client-polly` | ⭐ 低 |
| 🌍 国际云 | Azure Speech | Speech SDK | `microsoft-cognitiveservices-speech-sdk` | ⭐ 低 |
| 🌍 国际云 | ElevenLabs | REST API | axios + API Key | ⭐ 低 |

**关键观察：远程引擎的集成复杂度普遍为 ⭐ 低。** 本质都是 HTTP API 调用 → JSON/base64 音频响应，比本地 ONNX 推理简单得多。第一个远程引擎约需 1 天（搭认证框架），后续每个仅需 0.5 天。

---

## 四、各引擎差异化定位与推荐策略

### 核心原则：本地免费默认，云端增值可选

unobox 是一款**私有 IM 应用**，本地离线是核心竞争力。TTS 引擎的分层策略如下：

```
所有用户 ──→ 🏠 本地引擎（默认、免费、零配置）
 ├─ 开箱即用，无需 API Key，无需网络
 ├─ 预打包 1 个保底语音（<15MB），其余按需二次下载
 └─ 覆盖 90% 日常场景

高价值用户 ──→ ☁️ 远程云端引擎（可选、高质量、需自备 API Key）
 ├─ 用户自行注册云服务商账号，自行管理配额和费用
 ├─ unobox 仅提供设置页面的 API Key 配置入口
 └─ 不做代理、不做中转、不计费
```

**产品设计上的体现：**
- TTS 设置页默认展示本地引擎，远程引擎折叠在"☁️ 云端引擎（高级）"分区
- 远程引擎分区标注"需自行申请 API Key，可能产生费用"
- 本地引擎始终作为降级链的最终兜底

### 4.1 用户场景 → 引擎映射（本地默认版）

```
┌────────────────────────────┬──────────────────────┬───────────────────────────┬─────────────────────┐
│ 场景                        │ 默认引擎（本地免费）    │ 升级引擎（云端增值）        │ 不推荐              │
├────────────────────────────┼──────────────────────┼───────────────────────────┼─────────────────────┤
│ AI 对话语音回复（中英双语） │ Sherpa-ONNX + Kokoro │ 阿里云 Qwen3-TTS          │ Pico（无中文）      │
│ AI 对话语音回复（纯英文）   │ Supertonic           │ OpenAI / ElevenLabs       │ PaddleSpeech        │
│ 消息朗读（中文）            │ Kokoro               │ 阿里云 Qwen3-TTS          │ Pico / Supertonic   │
│ 消息朗读（英文）            │ Supertonic           │ OpenAI TTS                │ Pico                │
│ 消息朗读（日/韩/德等）      │ Piper TTS            │ Google Cloud TTS          │ Supertonic（无中文） │
│ 极低配设备兜底              │ MATCHA-TTS (<10MB)   │ Piper low 质量            │ PaddleSpeech        │
│ 高质量中文配音（专业需求）   │ —                    │ 阿里云 / 火山引擎          │ —                   │
│ 语音克隆需求（专业需求）     │ —                    │ ElevenLabs / Azure Custom  │ 本地引擎             │
│ 开源可定制中文 TTS          │ PaddleSpeech         │ Kokoro                    │ —                   │
│ 数据隐私优先                │ 本地引擎（全部）       │ —                         │ 全部远程引擎         │
│ 断网环境                    │ 本地引擎（全部）       │ —                         │ 全部远程引擎         │
└────────────────────────────┴──────────────────────┴───────────────────────────┴─────────────────────┘
```

**核心变化：默认列全部是本地免费引擎。** 远程云端引擎仅在用户主动配置 API Key 后才出现在可选列表中。

### 4.2 推荐优先级

```
═══════════════════════════════════════════════════════════════
🏠 Phase 1：本地引擎（免费默认，首批交付，12-18 天）
═══════════════════════════════════════════════════════════════
 目标：覆盖 90% 用户的日常 TTS 场景，零成本、零配置、零网络依赖
 ├─ Sherpa-ONNX + Kokoro-multi-lang（中英文双语主力）
 ├─ Supertonic（极速英文加速引擎）
 ├─ Piper CLI（编译失败兜底 + 多语言扩展）
 ├─ MATCHA-TTS / Piper low 质量（极低配保底语音，<15MB 预打包）
 └─ 设置 UI：
    ├─ 引擎状态（已就绪/未安装）
    ├─ 语音浏览 + 下载管理 + 试听预览
    ├─ 语速/音调调节
    └─ 语音包二次下载（首次启动后台静默下载主力语音）

═══════════════════════════════════════════════════════════════
☁️ Phase 2：远程云端引擎（增值升级，+4-6 天）
═══════════════════════════════════════════════════════════════
 目标：为高价值用户提供更高质量的云端 TTS 选项
 前提：用户自行申请云服务商 API Key，自行承担费用
 ├─ 🇨🇳 国内云：阿里云 Qwen3-TTS / 火山引擎 / 腾讯云 / 百度智能云
 ├─ 🌍 国际云：OpenAI / Google Cloud / Azure / Amazon Polly
 ├─ 设置 UI 新增：
 │   ├─ "☁️ 云端引擎（高级）"折叠分区
 │   ├─ API Key 配置 + 验证 + 本地加密存储
 │   ├─ 隐私声明弹窗（强制确认）
 │   └─ 可用额度查询（远程引擎带有用量估算）
 └─ 降级链：远程超时/失败 → 自动切回本地引擎

═══════════════════════════════════════════════════════════════
💎 Phase 3：专业增强（+2-3 天）
═══════════════════════════════════════════════════════════════
 ├─ ElevenLabs（语音克隆 + 顶级质量，订阅制）
 ├─ PaddleSpeech（开源可定制中文 TTS，Python 依赖）
 └─ Amazon Polly（AWS 生态用户备选）

不推荐:
 └─ 🏠 Pico TTS（无中文，MATCHA-TTS 替代）
```

### 4.3 引擎自动选择逻辑（本地默认，云端需主动启用）

```typescript
function selectEngine(
  userLang: string,
  hardwareTier: 'high' | 'mid' | 'low',
  hasRemoteConfigured: boolean // 用户是否主动配置了远程引擎
): ITTSProvider {

  // ── 默认路径：纯本地引擎（所有用户都走这里）──
  // 中文用户
  if (userLang.startsWith('zh')) {
    if (sherpaOnnx.isAvailable()) return sherpaKokoroProvider // Kokoro 中文
    if (paddleSpeech.isAvailable()) return paddleSpeechProvider // 开源备选
    return piperCliProvider // Piper 最终兜底
  }

  // 英文/韩文用户
  if (['en', 'ko'].includes(userLang)) {
    if (supertonic.isAvailable()) return supertonicProvider // 极速首选
    if (sherpaOnnx.isAvailable()) return sherpaKokoroProvider // Kokoro 备选
    return piperCliProvider
  }

  // 其他语言用户
  if (sherpaOnnx.isAvailable()) return sherpaOnnxProvider // Sherpa 多语
  return piperCliProvider // Piper 40+ 语言兜底

  // ── 注意：远程引擎不会出现在自动选择逻辑中 ──
  // 远程引擎仅在用户同时满足以下条件时才可选：
  // 1. 已在设置页主动配置 API Key
  // 2. 已通过隐私声明确认
  // 3. 在引擎切换器中手动选择了某个远程引擎
  // 远程引擎失败时 → 自动降级回上述本地引擎（用户无感知）
}
```

---

## 五、国内云 TTS 详细说明

### 5.1 阿里云 Qwen3-TTS（推荐首选）

| 项目 | 详情 |
|------|------|
| **模型** | Qwen3-TTS，49 种音色，10 种语言 + 9 种方言，48kHz |
| **WER** | 中文 1.9%，英文 2.8%（优于 Azure TTS） |
| **免费额度** | **100 万字符/月**（49 种音色全免费） |
| **付费价格** | **¥0.8/万字符** |
| **Node.js SDK** | `npm install dashscope` |
| **调用方式** | `dashscope.audio.speech({ model: 'qwen-tts', input: { text }, voice: 'longxiaoxia_v2', response_format: 'mp3' })` |
| **特色** | 支持粤语/四川话/东北话；语音合成+识别双功能；流式实时合成 |
| **推荐指数** | ⭐⭐⭐⭐⭐ 国内远程首选 |

### 5.2 火山引擎（豆包语音TTS）

| 项目 | 详情 |
|------|------|
| **价格** | 长文本普通版 **¥1.0/万字符**，情感预测版 ¥2.0/万字符 |
| **免费额度** | 基础音色完全免费；非基础音色年授权费 ¥1 万/个 |
| **短文本** | ≤300 字符/次，后付费 ¥4/千次（1 万次以上） |
| **Node.js SDK** | `npm install @volcengine/openapi` |
| **特色** | 情感预测版溢价 100%；可与豆包大模型联动（同生态）；多场景音色定制 |
| **推荐指数** | ⭐⭐⭐⭐ 长文本性价比王者 |

### 5.3 腾讯云 TTS

| 项目 | 详情 |
|------|------|
| **免费额度** | 精品音色 **800 万字符**（领取后 3 个月有效） |
| **价格** | 标准音色后付费 ¥1.9/万字符起，预付费最低 **¥0.75/万字符** |
| **精品音色** | ¥2.8/万字符（后付费小体量比火山高 180%） |
| **Node.js SDK** | `npm install tencentcloud-sdk-nodejs-tts` |
| **特色** | 预付费资源包可退款（7 天内）；大模型音色 + 超自然大模型音色 |
| **推荐指数** | ⭐⭐⭐⭐ 预付费最省钱 |

### 5.4 百度智能云 TTS

| 项目 | 详情 |
|------|------|
| **免费额度** | 个人认证：基础音库 **5 万次/180 天**；企业认证：**1 亿次/180 天** |
| **价格** | 短文本基础音库 ¥12/万次（预付费）；长文本 ¥1.7/万字符 |
| **大模型音色** | 度涵竹/度嫣然/度泽言/度怀安/度小粤等，与精品音库同价 |
| **Node.js SDK** | 无专用 SDK，HTTP REST 调用（axios + Bearer Token） |
| **接口特点** | 短文本最长 500 汉字；长文本最长 **10 万字**（异步）；流式 WebSocket 协议 |
| **推荐指数** | ⭐⭐⭐ 免费额度最慷慨（适合企业认证） |

### 5.5 国内云 TTS 价格速查

| 场景 | 最便宜方案 | 单价 |
|------|----------|------|
| 🆓 量少免费 | 百度智能云（个人）+ 阿里云 Qwen3 | ¥0 |
| 🀄 中文长文本 | 腾讯云标准预付费 | **¥0.75/万字符** |
| 🀄 中文后付费小体量 | 火山引擎普通版 | **¥1.0/万字符** |
| 🀄 中文短文本高频 | 阿里云 30 万千次包 | **¥1.0/千次** |
| 📞 中文质量优先 | 阿里云 Qwen3-TTS | ¥0.8/万字符 |
| 🤖 对标 AI 通话 | 火山引擎情感预测版 | ¥2.0/万字符 |

---

## 六、国际云 TTS 详细说明

### 6.1 OpenAI TTS

| 项目 | 详情 |
|------|------|
| **模型** | `tts-1` / `tts-1-hd` / `gpt-4o-mini-tts` |
| **价格** | `tts-1`: $15/M 字符；`tts-1-hd`: $30/M 字符；`gpt-4o-mini-tts`: $0.60/M 输入 token + $12/M 音频输出 token |
| **实际成本** | ~$0.86/小时音频（tts-1） |
| **语音数量** | 13 种（Alloy/Echo/Fable/Nova/Onyx/Shimmer/Ash/Ballad/Coral/Sage/Verse/Marin/Cedar） |
| **gpt-4o-mini-tts 特色** | 语音指令定制（如"热情的意大利厨师"），Marin/Cedar 独占 |
| **Node.js SDK** | `npm install openai` → `openai.audio.speech.create()` |
| **中文** | ✅ 但偏僵硬，不如国内云 |
| **推荐指数** | ⭐⭐⭐⭐⭐ AI 对话原生场景首选 |

### 6.2 Google Cloud TTS

| 项目 | 详情 |
|------|------|
| **价格** | 标准 $4/M 字符；神经 $16/M 字符；Chirp 3 HD $30/M 字符；Gemini TTS token 制 |
| **免费额度** | 标准 400 万字符/月 + 神经 100 万字符/月；新用户 $300 赠送 |
| **语言** | **75+ 种**，380+ 语音（所有引擎中最广） |
| **Node.js SDK** | `npm install @google-cloud/text-to-speech` |
| **推荐指数** | ⭐⭐⭐⭐ 语言覆盖最广 |

### 6.3 Azure Speech

| 项目 | 详情 |
|------|------|
| **价格** | 神经 TTS $15/M 字符；国内版 ¥0.95/万字（非常便宜） |
| **免费额度** | 神经 50 万字符/月 |
| **Node.js SDK** | `npm install microsoft-cognitiveservices-speech-sdk` |
| **推荐指数** | ⭐⭐⭐⭐ 国内版极便宜 |

### 6.4 Amazon Polly

| 项目 | 详情 |
|------|------|
| **价格** | 标准 $4/M 字符；神经 $16/M 字符；生成式 $30/M 字符 |
| **免费额度** | 标准 500 万字符/月 + 神经 100 万字符/月（首年）；新用户 $200 赠送 |
| **语言** | 40+ 种，100+ 语音 |
| **Node.js SDK** | `npm install @aws-sdk/client-polly` |
| **推荐指数** | ⭐⭐⭐ AWS 用户首选 |

### 6.5 ElevenLabs

| 项目 | 详情 |
|------|------|
| **价格** | $5/月起（3 万字符）→ $99/月（50 万字符），**订阅制非按量付费** |
| **免费额度** | 1 万字符/月 |
| **特色** | 从 **1 分钟音频**即可克隆语音；公认质量天花板 |
| **Node.js** | REST API（axios + API Key） |
| **推荐指数** | ⭐⭐⭐ 高端付费用户（语音克隆需求） |

### 6.6 国际云 TTS 价格速查

| 场景 | 最便宜方案 | 单价 |
|------|----------|------|
| 🆓 英文少量 | Google 标准 + Amazon 标准（免费层内） | $0 |
| 🇺🇸 英文神经质量 | Azure 国内版 / Google Neural | $15-16/M 字符 |
| 🏆 英文最佳质量 | OpenAI tts-1 / ElevenLabs | $15/M 字符 / $5/月起 |
| 🌐 多语言覆盖 | Google Cloud TTS（75+ 语言） | $4/M 字符起步 |
| 🇨🇳 中文 | **不推荐国际云**（国内云质量更好且更便宜） | — |

---

## 七、隐私与安全设计（远程引擎专项）

远程 TTS 引擎涉及**文本内容离开用户设备**，需要严格防护：

```
第一层：用户知情同意（强制）
 ┌─────────────────────────────────────────┐
 │ ⚠️ 启用远程 TTS 服务                     │
 │                                         │
 │ 您将朗读的消息文本将发送到第三方服务器     │
 │ 进行处理。请确认您已阅读并同意。          │
 │                                         │
 │ ☐ 我理解消息文本将离开本地设备            │
 │ ☐ 我同意服务商的数据处理条款             │
 │                                         │
 │ [取消]               [同意并配置 API Key] │
 └─────────────────────────────────────────┘

第二层：API Key 本地加密存储
 - 所有 API Key 使用设备相关密钥 AES 加密后存储到 app_kv_store
 - 不传输、不同步、不备份到任何远程位置
 - 参考 device.getMachineId() 作为加密盐

第三层：引擎级降级保护
 - 远程请求超时（5s）→ 自动回退到本地引擎
 - 余额不足 / 配额超限 → 提示用户，同时切回本地
 - 网络断开 → 静默切换，用户无感知
```

---

## 八、引擎降级策略

```
用户点击"朗读"消息时的引擎选择流程：

1. 检查用户偏好设置
 ├─ "🔒 仅本地" → 跳过远程，直接用本地引擎
 ├─ "☁️ 远程优先" → 先尝试远程，失败则降级
 └─ "🏠 本地优先"（默认）→ 本地可用即用本地

2. 🏠 "本地优先" 降级链（推荐默认）：
 Sherpa-ONNX Kokoro (<2s 生成)
 → Supertonic（英文）
 → Piper CLI
 → PaddleSpeech（中文备选）
 → 用户已配的远程引擎
 → 全部失败 → 提示用户

3. ☁️ "远程优先" 降级链：
 阿里云 Qwen3-TTS (3s 超时，中文)
 → 火山引擎 (3s 超时)
 → 腾讯云 / 百度智能云 (3s 超时)
 → OpenAI / Google / Azure (3s 超时)
 → 本地 Kokoro（最终兜底）

4. 自动降级时的 UI 反馈：
 ┌─────────────────────────────────────┐
 │ TTS 合成中...                        │
 │ 🟡 远程引擎无响应，正在切换本地引擎... │
 │ [取消朗读]                           │
 └─────────────────────────────────────┘
```

---

## 九、各引擎集成难点与风险

### 9.1 共性难点

| 难点 | 风险等级 | 说明 | 缓解措施 |
|------|:------:|------|---------|
| **原生 Node.js 插件跨平台分发** | 🟡 中 | `onnxruntime-node` 和 `sherpa-onnx-node` 是原生插件 | 预编译平台包 + WASM 兜底 |
| **大文本合成延迟** | 🟡 中 | 长文本需数秒 | 按句切分流式分段合成 |
| **语音模型管理** | 🟡 中 | 格式不统一 | VoiceManager 统一管理 |
| **API Key 安全存储** | 🟡 中 | 敏感凭据存储 | AES 加密 + 设备指纹盐 |
| **Electron 打包体积** | 🟡 中 | 本地模型 100-250MB | 模型按需下载，内置仅 1 个保底语音 |

### 9.2 各引擎特有风险

| 引擎 | 风险 | 等级 | 说明 |
|------|------|:--:|------|
| Sherpa-ONNX | npm 插件编译失败 | 🟡 | 预编译包 + WASM 兜底 |
| Supertonic | **无中文** | 🔴 | 仅英文/韩文场景使用 |
| PaddleSpeech | Python 环境依赖 | 🟡 | 需预装 Python + PaddlePaddle（~2GB） |
| 阿里云 | 依赖 DashScope 平台 | 🟢 | API 稳定，SDK 成熟 |
| 火山引擎 | 非基础音色年费 | 🟡 | 默认用基础音色免费 |
| 腾讯云 | 免费额度有时限 | 🟢 | 3 个月后转预付费 |
| 百度智能云 | 无 Node.js SDK | 🟢 | HTTP 调用简单，无额外依赖 |
| OpenAI | 中文发音僵硬 | 🟡 | 中文场景推荐国内云 |
| Google Cloud | 国内访问不便 | 🟡 | 国内用户建议用国内云 |
| ElevenLabs | 订阅制非按量 | 🟡 | 仅适应重度用户 |

---

## 十、需要新增的模块

```
新增文件清单（约 18 个文件）
═══════════════════════════════════════

核心接口（1 个文件）:
├── packages/core/src/providers/ITTSProvider.ts # 统一 TTS Provider 接口 + 类型定义

主进程 - 本地引擎实现（4 个文件）:
├── apps/desktop/src/main/tts/
│   ├── TTSManager.ts                # 多引擎管理器（类似 ProviderManager）
│   ├── providers/
│   │   ├── SherpaOnnxProvider.ts     # Sherpa-ONNX 引擎（Kokoro + Piper/VITS）
│   │   ├── SupertonicProvider.ts     # Supertonic 引擎
│   │   ├── PiperCliProvider.ts       # Piper CLI 子进程兜底
│   │   └── PaddleSpeechProvider.ts   # PaddleSpeech Python CLI

主进程 - 远程引擎实现（9 个文件）:
│   ├── providers/
│   │   ├── AliyunQwen3Provider.ts    # 阿里云 Qwen3-TTS
│   │   ├── VolcengineProvider.ts     # 火山引擎
│   │   ├── TencentCloudProvider.ts   # 腾讯云
│   │   ├── BaiduCloudProvider.ts     # 百度智能云
│   │   ├── OpenAIProvider.ts         # OpenAI TTS
│   │   ├── GoogleCloudProvider.ts    # Google Cloud TTS
│   │   ├── AmazonPollyProvider.ts    # Amazon Polly
│   │   ├── AzureProvider.ts          # Azure Speech
│   │   └── ElevenLabsProvider.ts     # ElevenLabs

主进程 - 辅助模块（2 个文件）:
├── apps/desktop/src/main/tts/
│   ├── VoiceManager.ts               # 统一语音模型下载/缓存/校验
│   ├── CredentialStore.ts             # API Key 加密存储
│   └── audio-utils.ts                 # PCM/WAV 格式转换 + 采样率适配

预加载 + 类型（2 个文件修改）:
├── apps/desktop/src/renderer/src/env.d.ts  # 新增 api.tts 类型声明
├── apps/desktop/src/preload/index.ts       # 新增 api.tts 桥接

渲染进程（4 个文件）:
├── apps/desktop/src/renderer/src/store/useTTSStore.ts      # TTS 状态管理
├── apps/desktop/src/renderer/src/components/TTSSettings.tsx # TTS 设置页
├── apps/desktop/src/renderer/src/components/RemoteTTSSetup.tsx # API Key 配置向导
├── apps/desktop/src/renderer/src/components/TTSPrivacyNotice.tsx # 隐私声明弹窗
├── apps/desktop/src/renderer/src/hooks/useTTSPlayer.ts     # TTS 播放 Hook

主进程入口（1 个文件修改）:
└── apps/desktop/src/main/index.ts           # 新增 tts:* IPC 处理器
```

---

## 十一、IPC 接口设计（最终版，覆盖本地+远程）

```typescript
api.tts = {
  // ── 引擎管理 ──

  /** 获取所有可用引擎列表 */
  getEngines: () => Promise<{
    id: string
    name: string
    type: 'local' | 'remote'
    available: boolean
    version?: string
    recommended: boolean
    requiresAuth: boolean
    supportedLangs: string[]
    pricing?: string // 价格简写（如 "¥0.8/万字符" | "$15/M字符" | "免费"）
  }[]>

  /** 设置当前使用的引擎 */
  setEngine: (engineId: string) => Promise<{ success: boolean; error?: string }>

  /** 设置降级链 */
  setFallbackChain: (chain: string[]) => Promise<{ success: boolean }>

  /** 下载/安装指定引擎 */
  installEngine: (engineId: string, onProgress?: (pct: number) => void)
    => Promise<{ success: boolean; error?: string }>

  // ── 凭据管理（远程引擎） ──

  /** 设置远程引擎凭据 */
  setCredentials: (engineId: string, credentials: Record<string, string>)
    => Promise<{ valid: boolean; error?: string }>

  /** 验证凭据有效性 */
  validateCredentials: (engineId: string) => Promise<{ valid: boolean; quota?: number }>

  /** 移除凭据 */
  removeCredentials: (engineId: string) => Promise<{ success: boolean }>

  // ── 语音管理 ──

  /** 获取可用语音列表 */
  getVoices: (engineId?: string) => Promise<{
    id: string; name: string; lang: string
    quality: 'low' | 'medium' | 'high'
    sizeBytes?: number
    downloaded?: boolean  // 仅本地引擎
    price?: string        // 仅远程引擎的特殊语音
  }[]>

  /** 下载语音模型（仅本地引擎） */
  downloadVoice: (engineId: string, voiceId: string, onProgress?: (pct: number) => void)
    => Promise<{ success: boolean; error?: string }>

  /** 删除语音模型 */
  deleteVoice: (engineId: string, voiceId: string) => Promise<{ success: boolean }>

  // ── 合成 ──

  /** 合成语音（非流式） */
  speak: (text: string, opts?: {
    engineId?: string
    voiceId?: string
    speed?: number
    pitch?: number
    format?: 'wav' | 'mp3' | 'ogg'
  }) => Promise<{ success: boolean; filePath?: string; duration?: number; error?: string }>

  /** 流式合成（长文本分段，边生成边播放） */
  speakStream: (text: string, opts?: {
    engineId?: string
    voiceId?: string
    speed?: number
  }) => { cancel: () => void }

  /** 用指定语音合成测试文本并播放 */
  previewVoice: (engineId: string, voiceId: string) => Promise<{ success: boolean; error?: string }>

  // ── 偏好设置 ──

  /** 获取 TTS 偏好 */
  getPreferences: () => Promise<{
    engineId: string
    voiceId: string
    speed: number
    pitch: number
    privacyMode: 'local-only' | 'remote-ok' | 'remote-preferred'
    fallbackChain: string[]
  }>

  /** 更新 TTS 偏好 */
  setPreferences: (prefs: Partial<TTSPreferences>) => Promise<{ success: boolean }>
}
```

---

## 十二、与现有系统集成

| 现有系统 | 复用方式 | 改动量 |
|---------|---------|:----:|
| `IServerProvider` 多 Provider 模式 | TTS 完全复用，TTSManager ≈ ProviderManager | 微小 |
| `useMediaPlayerStore` + `useAudioEngine` | 合成后的音频直接 `playOrEnqueue({ source: 'ai' })` | 零改动 |
| IPC 桥接 (`api.*` 命名空间) | 新增 `api.tts`，遵循现有约定 | 约 100 行新增 |
| 设置页面 UI 模式 | 参考"数据与存储"三层递进布局 | 复用样式 |
| `net.streamRequest` cancel 模式 | TTS 流式合成的取消机制直接复用 | 参考即可 |
| `@ffmpeg-installer` 二进制管理 | 本地引擎的二进制下载管理参照此模式 | 参考即可 |
| `api.file.readBuffer` (unbox-file:// → blob URL) | 合成后的 WAV 文件通过此协议访问和播放 | 零改动 |
| `app_kv_store` SQLite 表 | API Key 加密存储 + TTS 偏好持久化 | 新增 1 个表 |

---

## 十三、成本对比（以日均朗读 20 条消息、每条 200 字符为例）

> 月均 = 20 × 200 × 30 = **12 万字符/月**

| 引擎 | 月度成本 | 年度成本 | 备注 |
|------|:------:|:------:|------|
| 🏠 本地引擎（全部） | **¥0** | **¥0** | 磁盘 ~160MB |
| 🇨🇳 阿里云 Qwen3 | **¥0** | **¥0** | 免费层内（100 万/月） |
| 🇨🇳 火山引擎 | **¥0** | **¥0** | 基础音色免费 |
| 🇨🇳 腾讯云 | **¥0（首 3 月）** | ~¥9 | 首 3 月 800 万字符免费 |
| 🇨🇳 百度智能云 | **¥0** | **¥0** | 免费层内（个人 5 万次/180 天） |
| 🌍 OpenAI tts-1 | ~$1.80 | ~$21.60 | $15/M 字符 |
| 🌍 Google 标准 | **$0** | **$0** | 免费层内（400 万/月） |
| 🌍 Google 神经 | ~$1.92 | ~$23.04 | $16/M 字符 |
| 🌍 Amazon Polly 神经 | **$0（首年）** | ~$23 | 首年 100 万/月免费 |
| 🌍 Azure 神经 | ~$1.80 | ~$21.60 | $15/M 字符 |
| 🌍 ElevenLabs | **$5/月** | **$60** | 订阅制起步 |

**结论：对个人用户正常使用量，无论是国内云还是国际云，基本都在免费层内，远程 TTS 实际成本为 ¥0。**

---

## 十四、工作量估算（本地优先，云端增值）

### 核心策略

**Phase 1 交付后即可发版，本地 TTS 功能完整可用。** Phase 2/3 的远程云端引擎按需叠加，不影响已上线功能。

### 14.1 分阶段估算

| 阶段 | 内容 | 工时 | 备注 |
|------|------|:--:|------|
| **Phase 0：接口设计** | `ITTSProvider` + `TTSManager` + `VoiceManager` + `CredentialStore` | 1-2 天 | 覆盖本地+远程，但 Phase 1 只实现本地 |
| **Phase 1a：主力本地引擎** | Sherpa-ONNX (Kokoro/Piper) + Supertonic + 语音模型下载管理 | 5-6 天 | 首个引擎最耗时 |
| **Phase 1b：本地兜底** | Piper CLI 子进程 + MATCHA-TTS 预打包保底语音 | 1-2 天 | 编译失败 + 极低配设备 |
| **Phase 2a：统一 Store** | `useTTSStore`（引擎切换/语音列表/合成队列/偏好持久化） | 1-2 天 | 本地引擎阶段即可完成 |
| **Phase 2b：消息集成** | 右键"朗读"按钮 + TTS 播放指示器 + AI 对话自动朗读 | 1-2 天 | |
| **Phase 3a：设置 UI** | 引擎状态展示 + 语音浏览/下载/试听 + 语速/音调调节 | 2-3 天 | 不含远程引擎分区 |
| **Phase 3b：测试打磨** | 跨平台测试 + 引擎降级测试 + 语音模型下载异常处理 | 2-3 天 | |
| **🏠 本地引擎合计** | | **14-20 天** | **此阶段完成即可发版** |
| | | | |
| **Phase 4：远程云端引擎** | 8 个远程 Provider + API Key 配置 UI + 隐私声明 + 降级链 | 4-6 天 | 本地引擎发版后开始 |
| **Phase 5：高端增强** | ElevenLabs + PaddleSpeech | 2-3 天 | 语音克隆 + 开源中文 |
| **☁️ 远程引擎增量合计** | | **+6-9 天** | 叠加到本地引擎之上 |
| | | | |
| **🏆 全部合计** | | **20-29 天** | 本地 14-20 + 远程 6-9 |

### 14.2 推荐交付节奏

| 里程碑 | 包含内容 | 工时 | 用户可感知 |
|------|---------|:--:|:--:|
| **🚀 v1.0 本地免费版** | Sherpa-ONNX (Kokoro) + Supertonic + Piper CLI + MATCHA-TTS + 设置 UI + 消息朗读 | **14-20 天** | ✅ TTS 功能完整可用 |
| **☁️ v1.1 云端增值版** | 阿里云 + 火山引擎 + 腾讯云 + 百度智能云 + OpenAI + Google + Azure | **+4-6 天** | ✅ 高级用户可配 API Key |
| **💎 v1.2 专业增强版** | ElevenLabs + PaddleSpeech + Amazon Polly | **+2-3 天** | ✅ 语音克隆等专业场景 |

### 14.3 与有声书的叠加

有声书功能严重依赖 TTS 引擎。日程安排：

```
v1.0 本地 TTS（14-20 天）
 │
 └─→ v1.0 + 有声书（+11-18 天） = 总计 25-38 天
 │   └── 可从 v1.0 发版后立即开始
 │
 └─→ v1.0 + v1.1 云端 TTS + 有声书 = 总计 29-44 天
```

---

## 十五、总体评估

### 15.1 分类推荐度

| 类别 | 推荐引擎 | 推荐度 | 理由 |
|------|---------|:--:|------|
| 🏠 本地主力 | **Sherpa-ONNX + Kokoro** | ⭐⭐⭐⭐⭐ | 中英文双语覆盖，一个框架承载多种模型 |
| 🏠 极速英文 | **Supertonic** | ⭐⭐⭐⭐ | CPU 167x 实时，长文稳定性最佳 |
| 🏠 中文开源 | **PaddleSpeech** | ⭐⭐⭐ | 可定制但 Python 环境是门槛 |
| 🏠 本地兜底 | **Piper CLI** | ⭐⭐⭐ | 编译失败时的安全网 |
| 🇨🇳 国内首选 | **阿里云 Qwen3-TTS** | ⭐⭐⭐⭐⭐ | WER 中文最低，100 万字符/月免费 |
| 🇨🇳 国内性价比 | **火山引擎** | ⭐⭐⭐⭐ | 基础音色免费，长文本 ¥1.0/万字 |
| 🇨🇳 国内省钱 | **腾讯云** | ⭐⭐⭐⭐ | 预付费 ¥0.75/万字最低 |
| 🇨🇳 国内免费 | **百度智能云** | ⭐⭐⭐ | 企业认证 1 亿次免费（无 SDK） |
| 🌍 国际首选 | **OpenAI TTS** | ⭐⭐⭐⭐⭐ | AI 对话原生场景，gpt-4o-mini-tts |
| 🌍 多语言首选 | **Google Cloud TTS** | ⭐⭐⭐⭐ | 75+ 语言 380+ 语音 |
| 🌍 极致质量 | **ElevenLabs** | ⭐⭐⭐ | 语音克隆 + 天花板质量（订阅制） |
| 🌍 微软生态 | **Azure Speech** | ⭐⭐⭐ | 国内版 ¥0.95/万字极便宜 |
| 🌍 AWS 生态 | **Amazon Polly** | ⭐⭐⭐ | 首年免费额度最慷慨 |
| ❌ 不推荐 | **Pico TTS** | ⭐ | 无中文，MATCHA-TTS 替代 |

### 15.2 综合评分

| 维度 | 评分 | 说明 |
|------|:--:|------|
| 技术可行性 | ⭐⭐⭐⭐⭐ | 所有引擎均可集成，成熟 SDK 或 HTTP API |
| 多引擎架构契合度 | ⭐⭐⭐⭐⭐ | 项目 `IServerProvider` 多 Provider 模式直接复用 |
| 中文场景覆盖 | ⭐⭐⭐⭐⭐ | 国内 4 云质量顶尖 + Kokoro 离线可定制 + PaddleSpeech 开源 |
| 实现复杂度 | ⭐⭐⭐ | 主要是胶水代码，但引擎数量使 UI 和测试复杂度显著 |
| 跨平台风险 | ⭐⭐⭐ | 本地引擎需预编译包；远程引擎仅需 HTTP，无此风险 |
| 隐私合规 | ⭐⭐⭐⭐ | 远程引擎需用户知情同意 + 本地加密存储凭据 + 降级保护 |
| 用户体验增益 | ⭐⭐⭐⭐⭐ | 10+ 引擎覆盖全部场景，用户按需自由选择 |

### 15.3 最终结论

**本地免费默认，云端增值可选。建议分三个里程碑交付。**

核心设计原则：

1. **本地引擎是默认选项，面向所有用户免费可用。** 开箱即用，零配置，零网络依赖。预打包 1 个保底语音（<15MB），主力语音首次启动后台静默下载。

2. **远程云端引擎是增值选项，面向高价值用户。** 用户自行注册云服务商账号、自行管理 API Key、自行承担费用。unobox 仅提供设置页面的 Key 配置入口和引擎切换器，不做代理、不做中转、不计费。

3. **统一接口承载一切。** `ITTSProvider` 对本地引擎和远程 API 完全透明——调用方不感知引擎类别差异。远程引擎实现上反而更简单（HTTP API ≈ 0.5 天/个）。

4. **`useMediaPlayerStore` 零改动。** 合成后的 WAV 文件直接送入现有音频播放器队列（`source: 'ai'`），MiniPlayer/FullPlayer 完全复用。

5. **推荐首个交付版本（v1.0 本地免费版，14-20 天）：**
 - 🏠 Sherpa-ONNX + Kokoro-multi-lang（中英文双语主力）
 - 🏠 Supertonic（极速英文加速引擎）
 - 🏠 Piper CLI + MATCHA-TTS（编译失败 + 极低配兜底）
 - 设置 UI（语音浏览/下载/试听/语速调节）
 - 消息集成（右键"朗读"按钮 + AI 对话自动朗读）

6. **v1.1 云端增值版（+4-6 天）：** 阿里云/火山引擎/腾讯云/百度智能云 + OpenAI/Google/Azure + API Key 配置 + 隐私声明

7. **不推荐集成的引擎：Pico TTS**（无中文，MATCHA-TTS 替代）。

8. **语音包完全二次下载。** 预打包仅保留一个 ≤15MB 的保底中文语音，其余全部按需下载。

9. **远程引擎的隐私合规是强制要求。** 文本离开设备前必须获得用户明确知情同意，API Key 本地加密存储，任何远程失败均自动降级到本地引擎。

10. **有声书功能基于 Phase 1 本地 TTS 即可独立开发（+11-18 天），无需等待远程引擎。**
