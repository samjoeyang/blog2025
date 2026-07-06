#!/usr/bin/env node

/**
 * auto-publish-108.mjs
 * 
 * 本地自动化脚本：从《企业管理的108个问题》系列生成并发布每日两篇文章。
 * 通过 openclaw infer model run 调用 AI 模型，含重试验证逻辑 + 自动补全 front-matter + 修正明日预告。
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_ROOT = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(BLOG_ROOT, 'source/_posts');
const STATE_FILE = path.join(BLOG_ROOT, '.108-questions-state.json');
const QUESTIONS_FILE = path.join(POSTS_DIR, '企业管理的108个问题.md');
const MODEL = 'deepseek/deepseek-v4-pro';
const FALLBACK_MODEL = 'deepseek/deepseek-chat';
const MAX_RETRIES = 3;
const MIN_ARTICLE_LENGTH = 2800;

// ===== Utilities =====

function callModel(prompt, model = MODEL) {
  const escaped = prompt
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$')
    .replace(/\n/g, '\\n');
  const cmd = `openclaw infer model run --model "${model}" --json --prompt "${escaped}" 2>/dev/null`;
  const output = execSync(cmd, { timeout: 180000, encoding: 'utf-8' });
  const result = JSON.parse(output);
  if (result.ok && result.outputs && result.outputs.length > 0) {
    return result.outputs[0].text;
  }
  throw new Error(`Model returned no output: ${output.slice(0, 200)}`);
}

function readJSON(fp) {
  return existsSync(fp) ? JSON.parse(readFileSync(fp, 'utf-8')) : null;
}

function readText(fp) {
  return existsSync(fp) ? readFileSync(fp, 'utf-8') : null;
}

function isValidArticle(text) {
  if (!text || text.length < MIN_ARTICLE_LENGTH) return false;
  if (!text.includes('# ') && !text.includes('## ')) return false;
  const lower = text.toLowerCase();
  if (lower.startsWith('sorry') || lower.startsWith('i cannot') ||
      lower.startsWith("i'm sorry") || lower.startsWith('我不能') ||
      lower.startsWith('抱歉') || text.includes('作为AI')) return false;
  return true;
}

function makeSlug(str) {
  // Keep Chinese chars and alphanumeric, replace other special chars with hyphens
  let slug = str
    .replace(/[，。！？、；：""''（）【】《》——…·]/g, '')
    .replace(/[^a-zA-Z0-9\u4e00-\u9fff\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase()
    .slice(0, 80)
    .replace(/^-+|-+$/g, '');
  return slug || 'article';
}

function generateArticle(prompt, questionNum, questionText, retryCount = 0) {
  console.log(`\n📝 正在生成第${questionNum}问... (尝试 ${retryCount + 1}/${MAX_RETRIES + 1})`);

  try {
    let text;
    try {
      text = callModel(prompt, MODEL);
    } catch (e) {
      console.log(`  ⚠️ 主模型失败，尝试备用模型...`);
      text = callModel(prompt, FALLBACK_MODEL);
    }

    if (isValidArticle(text)) {
      console.log(`  ✅ 第${questionNum}问生成成功 (${text.length} 字符)`);
      return text;
    }

    console.log(`  ⚠️ 输出长度不足 (${text?.length || 0}/${MIN_ARTICLE_LENGTH} 字符)`);
    if (retryCount < MAX_RETRIES) {
      const retryPrompt = prompt + `\n\n⚠️ 注意：上次生成的回复过于简短。请务必写一篇完整的中长篇文章（1500-2000字），含具体案例、分层结构、实操建议。`;
      return generateArticle(retryPrompt, questionNum, questionText, retryCount + 1);
    }
    console.error(`  ❌ 第${questionNum}问生成失败：重试耗尽`);
    return null;
  } catch (err) {
    console.error(`  ❌ 第${questionNum}问出错: ${err.message}`);
    if (retryCount < MAX_RETRIES) {
      return generateArticle(prompt, questionNum, questionText, retryCount + 1);
    }
    return null;
  }
}

// ===== Question Helpers =====

function getAllQuestions() {
  const content = readText(QUESTIONS_FILE);
  if (!content) return {};
  const result = {};
  const lines = content.split('\n');
  for (const line of lines) {
    const match = line.trim().match(/^(\d+)\.\s*(.*)/);
    if (match) result[parseInt(match[1])] = match[2].trim();
  }
  return result;
}

// ===== Article Processing =====

function extractBody(text) {
  // Remove existing front-matter if present
  let body = text;
  if (body.startsWith('---')) {
    const endIdx = body.indexOf('---', 3);
    if (endIdx !== -1) body = body.slice(endIdx + 3).trim();
  }
  return body;
}

function buildArticle(questionNum, questionText, nextNum, nextText, modelOutput, dateStr) {
  const heading = `# 企业管理的108个问题 · 第${questionNum}问`;
  let body = extractBody(modelOutput);

  // Remove any heading the model may have added
  body = body.replace(/^#\s+企业管理的108个问题.*(\n|$)/, '').trim();

  // Fix "明日预告" to point to the actual next question
  const previewPattern = /明日预告[：:].*/g;
  if (nextText) {
    body = body.replace(previewPattern, `**明日预告：第${nextNum}问 —— ${nextText}**`);
  } else {
    body = body.replace(previewPattern, '');
  }

  // Ensure it ends with the preview
  const previewLine = nextText ? `\n\n**明日预告：第${nextNum}问 —— ${nextText}**` : '';
  if (!body.includes('明日预告')) {
    body = body.trimEnd() + previewLine;
  }

  const frontMatter = `---
title: '${questionText}'
date: ${dateStr} 12:00:00
categories: 管理
tags: [企业管理, 企业文化, 管理心得]
---

`;

  return frontMatter + heading + '\n\n' + body.trimStart() + '\n';
}

function writeArticleFile(questionNum, questionText, fullArticle) {
  const slug = makeSlug(questionText);
  const filename = `${String(questionNum).padStart(3, '0')}-${slug}.md`;
  const filepath = path.join(POSTS_DIR, filename);
  writeFileSync(filepath, fullArticle, 'utf-8');
  console.log(`  📄 已写入: ${filename}`);
  return filename;
}

// ===== Build & Push =====

function buildSite() {
  console.log('\n🔨 正在构建静态页面...');
  try {
    execSync('npm run build 2>&1', { cwd: BLOG_ROOT, timeout: 120000, encoding: 'utf-8' });
    console.log('  ✅ 构建成功');
    return true;
  } catch (err) {
    console.error(`  ❌ 构建失败: ${err.message.slice(0, 200)}`);
    return false;
  }
}

function gitPush(commitMsg) {
  console.log('\n📤 正在推送到 GitHub...');
  try {
    execSync('git add -A', { cwd: BLOG_ROOT, timeout: 30000, encoding: 'utf-8' });
    execSync(`git commit -m "${commitMsg.replace(/"/g, '\\"')}"`, { cwd: BLOG_ROOT, timeout: 30000, encoding: 'utf-8' });
    execSync('git pull --rebase origin theme-cards 2>&1 || true', { cwd: BLOG_ROOT, timeout: 60000, encoding: 'utf-8' });
    execSync('git push origin theme-cards', { cwd: BLOG_ROOT, timeout: 120000, encoding: 'utf-8' });
    console.log('  ✅ 推送成功');
    return true;
  } catch (err) {
    const msg = err.message;
    if (msg.includes('nothing to commit') || msg.includes('Everything up-to-date') || msg.includes('up-to-date')) {
      console.log('  ℹ️  无需推送');
      return true;
    }
    // Try force push as last resort
    try {
      console.log('  ⚠️ 尝试强制推送...');
      execSync('git push origin theme-cards --force', { cwd: BLOG_ROOT, timeout: 120000, encoding: 'utf-8' });
      console.log('  ✅ 强制推送成功');
      return true;
    } catch (e2) {
      console.error(`  ❌ 强制推送也失败: ${e2.message.slice(0, 200)}`);
      return false;
    }
  }
}

// ===== Prompt Building =====

function buildPrompt(questionNum, questionText, prevNum, prevText, nextNum, nextText, styleRef) {
  return `你是一个中文商业管理文章作者。请写一篇关于企业管理的中文分析文章，作为《企业管理的108个问题》系列的一部分。

## 当前文章
- 问题编号：第${questionNum}问
- 问题内容：${questionText}
- 上一问（第${prevNum}问）：${prevText}
- 下一问（第${nextNum}问）：${nextText}

## 格式要求（严格）
1. 文章以第一人称视角写，语气像资深管理顾问在分享
2. 结构：用中文小标题分层（一、二、三）
3. 开篇引用上一问（用"第${prevNum}问"或类似表述过渡）
4. 包含真实商业案例或比喻
5. 有实操建议
6. 末尾添加一行"**明日预告：第${nextNum}问 —— ${nextText}**"
7. 不要包含任何 front-matter（由我的系统自动添加）
8. 不要以 "# 企业管理的108个问题 · 第N问" 开头（由我的系统自动添加）
9. 直接输出正文内容即可
10. 全文中长篇，约1500-2000字（中文）

## 近期风格参考（前两篇的开头部分）
${styleRef}

## 输出
只输出文章的正文内容，不要添加任何额外说明。`;
}

function getStyleRef() {
  const state = readJSON(STATE_FILE);
  if (!state || !state.completed) return '';
  const content = [];
  for (const num of [state.completed - 1, state.completed]) {
    if (num < 1) continue;
    let files = [];
    try {
      const out = execSync(`ls ${POSTS_DIR} | grep -E "^0*${num}-"`, { encoding: 'utf-8' });
      files = out.trim().split('\n').filter(Boolean);
    } catch (e) { continue; }
    if (files[0]) {
      const text = readText(path.join(POSTS_DIR, files[0].trim()));
      if (text) {
        const lines = text.split('\n');
        const bodyStart = lines.findIndex(l => l.startsWith('# ')) + 1;
        const snippet = lines.slice(bodyStart, Math.min(bodyStart + 40, lines.length)).join('\n');
        content.push(`### 第${num}问 开头风格参考\n${snippet}`);
      }
    }
  }
  return content.join('\n\n');
}

// ===== Main =====

async function main() {
  console.log('='.repeat(60));
  console.log('📚 《企业管理的108个问题》自动发布脚本 v3');
  console.log('='.repeat(60));

  const state = readJSON(STATE_FILE);
  if (!state) { console.error('❌ 状态文件未找到'); process.exit(1); }

  const next = state.next;
  const total = state.total || 108;
  if (next > total) {
    console.log(`\n🎉 全部 ${total} 问已发布完毕！`);
    process.exit(0);
  }

  console.log(`\n📋 当前进度: ${state.completed}/${total}，下一题: #${next}`);

  const allQ = getAllQuestions();
  const q1 = allQ[next];
  const q2 = allQ[next + 1];
  const qPrev = allQ[next - 1] || '';
  const qNext1 = allQ[next + 1] || '';
  const qNext2 = allQ[next + 2] || '';

  if (!q1) { console.error(`❌ 找不到第${next}问`); process.exit(1); }
  console.log(`  📖 第${next}问: ${q1}`);
  if (q2) console.log(`  📖 第${next + 1}问: ${q2}`);

  // Style reference
  const styleRef = getStyleRef();
  console.log(`  📖 风格参考: ${styleRef.length} 字符`);

  // Today's date
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  // ===== Generate Article 1 =====
  const prompt1 = buildPrompt(next, q1, next - 1, qPrev, next + 1, qNext1, styleRef);
  const raw1 = generateArticle(prompt1, next, q1);
  if (!raw1) { console.error(`❌ 第${next}问生成失败`); process.exit(1); }
  const article1 = buildArticle(next, q1, next + 1, qNext1, raw1, dateStr);

  // ===== Generate Article 2 =====
  let article2 = null;
  if (q2) {
    const prompt2 = buildPrompt(next + 1, q2, next, q1, next + 2, qNext2, styleRef);
    const raw2 = generateArticle(prompt2, next + 1, q2);
    if (raw2) {
      article2 = buildArticle(next + 1, q2, next + 2, qNext2, raw2, dateStr);
    } else {
      console.log(`  ⚠️ 第${next + 1}问生成跳过`);
    }
  }

  // ===== Write Files =====
  writeArticleFile(next, q1, article1);
  if (article2) writeArticleFile(next + 1, q2, article2);

  // ===== Update State =====
  if (article2) {
    updateState(next + 1, next + 2);
  } else {
    updateState(next, next + 1);
  }

  // ===== Build & Push =====
  const buildOk = buildSite();
  const commitMsg = `发布第${next}问${article2 ? `和第${next + 1}问` : ''}`;
  const pushOk = gitPush(commitMsg);

  // ===== Report =====
  console.log('\n' + '='.repeat(60));
  console.log('📰 发布报告');
  console.log('='.repeat(60));
  console.log(`  第${next}问: ${q1}`);
  if (article2) console.log(`  第${next + 1}问: ${q2}`);
  console.log(`  构建: ${buildOk ? '✅' : '❌'}`);
  console.log(`  推送: ${pushOk ? '✅' : '❌'}`);
  if (buildOk && pushOk) console.log('\n🎉 发布成功！');
  else console.log('\n⚠️ 部分步骤失败，请检查');
}

function updateState(completed, next) {
  const state = { completed, total: 108, next };
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + '\n', 'utf-8');
  console.log(`  📋 状态更新: completed=${completed}, next=${next}`);
}

main().catch(err => {
  console.error('\n❌ 脚本出错:', err.message);
  process.exit(1);
});
