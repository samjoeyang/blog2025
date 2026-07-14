#!/usr/bin/env node
/**
 * sync-to-blogger.mjs
 * 将 Hexo 博客新文章通过邮件同步到 Blogger
 * 使用方法：AGENTMAIL_KEY=xxx node scripts/sync-to-blogger.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const STATE_FILE = path.join(__dirname, 'sync-state.json');
const BLOGGER_EMAIL = 'samjoeyang.blogger@blogger.com';
const AGENTMAIL_API = 'https://api.agentmail.to/v0/inboxes/samjoeyang@agentmail.to/messages/send';

// 排除的非文章目录
const EXCLUDE_DIRS = new Set([
  'archives', 'tags', 'categories', 'page', 'search',
  'baidusitemap.xml', 'sitemap.xml', 'atom.xml', 'rss2.xml',
  'search.json', 'search.xml',
]);

// 读取已同步记录
function loadState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf-8');
}

// 从HTML中提取文章标题
function extractTitle(html) {
  const m1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (m1) return m1[1].replace(/<[^>]+>/g, '').trim();
  const m2 = html.match(/<title>([^<]*)<\/title>/i);
  if (m2) return m2[1].trim();
  return 'Untitled';
}

/**
 * 提取文章正文区域的 HTML
 * 返回 { htmlContent, textContent }
 */
function extractArticleBody(html) {
  // 尝试提取 <article> 区域
  let article = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (!article) {
    // 尝试提取 .post-content 或 .article-content 或 .entry-content
    article = html.match(/<div[^>]*class="[^"]*(?:post-content|article-content|entry-content)[^"]*"[\s\S]*?>([\s\S]*?)<\/div>/i);
  }
  if (!article) {
    // 尝试提取 <main> 区域
    article = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  }

  const rawHtml = article ? article[1] : html;

  // 从 HTML 中去除无关元素，保留纯净的文章内容
  const cleanHtml = rawHtml
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<aside[\s\S]*?<\/aside>/gi, '')
    .trim();

  // 纯文本版本
  const textContent = cleanHtml
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/tr>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\s+|\s+$/gm, '')
    .trim();

  return { htmlContent: cleanHtml, textContent };
}

// 通过 AgentMail API 发送邮件
async function sendToBlogger(title, textContent, htmlContent) {
  const apiKey = process.env.AGENTMAIL_KEY;
  if (!apiKey) {
    throw new Error('AGENTMAIL_KEY 环境变量未设置');
  }

  // 构建请求体：优先用 html 字段发送 HTML 内容
  const body = {
    to: [BLOGGER_EMAIL],
    subject: title,
  };

  // 如果提取到了 HTML 内容（有标签结构），用 html 字段发送
  if (/<[a-z][\s\S]*>/i.test(htmlContent)) {
    body.html = htmlContent;
    body.text = textContent;
  } else {
    body.text = textContent;
  }

  const resp = await fetch(AGENTMAIL_API, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`AgentMail API error ${resp.status}: ${err}`);
  }

  return resp.json();
}

// 获取所有文章目录
function getArticleDirs() {
  const items = fs.readdirSync(PUBLIC, { withFileTypes: true });
  const dirs = [];
  for (const item of items) {
    if (item.isDirectory() && !EXCLUDE_DIRS.has(item.name)) {
      const indexPath = path.join(PUBLIC, item.name, 'index.html');
      if (fs.existsSync(indexPath)) {
        dirs.push({ slug: item.name, indexPath });
      }
    }
  }
  return dirs;
}

async function main() {
  const state = loadState();
  const articles = getArticleDirs();

  console.log(`找到 ${articles.length} 篇文章目录`);

  let synced = 0;
  for (const article of articles) {
    if (state[article.slug]) {
      continue; // 已同步过
    }

    const html = fs.readFileSync(article.indexPath, 'utf-8');
    const title = extractTitle(html);
    const { htmlContent, textContent } = extractArticleBody(html);

    if (!title || !textContent) {
      console.log(`  ⏭ 跳过 ${article.slug}: 无法提取标题或内容`);
      continue;
    }

    try {
      console.log(`  📤 发送: ${title}`);
      await sendToBlogger(title, textContent, htmlContent);
      state[article.slug] = Date.now();
      synced++;
    } catch (err) {
      console.error(`  ❌ 发送失败 ${article.slug}: ${err.message}`);
    }
  }

  saveState(state);
  console.log(`\n已同步${synced}篇新文章，累计 ${Object.keys(state).length} 篇`);
}

main().catch(err => {
  console.error('脚本执行失败:', err);
  process.exit(1);
});
