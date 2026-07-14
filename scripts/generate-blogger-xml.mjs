#!/usr/bin/env node
/**
 * generate-blogger-xml.mjs
 *
 * Traverse source/_posts/*.md → parse front-matter → generate WXR XML → write blogger-import.xml
 */

import fs from 'node:fs';
import path from 'node:path';
import { globSync } from 'node:fs';

const POSTS_DIR = path.resolve(import.meta.dirname, '../source/_posts');
const OUTPUT_FILE = path.resolve(import.meta.dirname, '../blogger-import.xml');
const SITE_URL = 'https://blog.example.com';
const SITE_NAME = 'Samjoe 的博客';

// ── helpers ────────────────────────────────────────────────────

/** Escape XML special chars */
function esc(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Convert a date string like "2025-05-29 22:44:37" or "2026-07-10 02:00:00" to RFC 2822 */
function toRfc2822(dateStr) {
  if (!dateStr) return new Date().toUTCString();
  // handle "2025-05-29 22:44:37" and "2026-07-10 02:00:00"
  const cleaned = dateStr.trim().replace(/[年月日]/g, '-').replace(/[时分秒]/g, ':').replace(/[T]/g, ' ');
  const d = new Date(cleaned);
  if (isNaN(d.getTime())) {
    // try "2025-05-29" only
    const d2 = new Date(cleaned.split(' ')[0]);
    if (!isNaN(d2.getTime())) return d2.toUTCString();
    return new Date().toUTCString();
  }
  return d.toUTCString();
}

/** WXR-safe CDATA block */
function cdata(content) {
  // escape any CDATA close sequences
  const safe = String(content || '').replace(/]]>/g, ']]&gt;');
  return `<![CDATA[${safe}]]>`;
}

// ── Markdown → HTML (simple but reasonable) ────────────────────

function mdToHtml(md) {
  let html = md;

  // Remove <!-- more --> comment (keep a visual separator)
  html = html.replace(/<!--\s*more\s*-->/g, '<!--more-->');

  // Horizontal rules
  html = html.replace(/^---\s*$/gm, '<hr/>');

  // Code blocks (fenced) - must be before inline code
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const langAttr = lang ? ` class="language-${esc(lang)}"` : '';
    return `<pre><code${langAttr}>${esc(code.trimEnd())}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Blockquotes
  html = html.replace(/^>\s?(.*)$/gm, '<blockquote>$1</blockquote>');
  // Merge consecutive blockquotes
  html = html.replace(/<\/blockquote>\n<blockquote>/g, '\n');

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic
  html = html.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1"/>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Headings
  html = html.replace(/^######\s+(.*)$/gm, '<h6>$1</h6>');
  html = html.replace(/^#####\s+(.*)$/gm, '<h5>$1</h5>');
  html = html.replace(/^####\s+(.*)$/gm, '<h4>$1</h4>');
  html = html.replace(/^###\s+(.*)$/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s+(.*)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#\s+(.*)$/gm, '<h1>$1</h1>');

  // Unordered lists
  html = html.replace(/^[\s]*[-*+]\s+(.*)$/gm, '<li>$1</li>');
  // Wrap consecutive <li> in <ul>
  html = html.replace(/((?:<li>.*?<\/li>\n?)+)/g, (match) => {
    if (!/<\/ul>/.test(match) && !/<\/ol>/.test(match)) {
      return `<ul>\n${match}\n</ul>`;
    }
    return match;
  });

  // Ordered lists
  html = html.replace(/^\d+[\.\）\）]\s+(.*)$/gm, '<li>$1</li>');

  // Paragraphs: double newlines
  const paragraphs = html.split(/\n\n+/);
  html = paragraphs
    .map((p) => {
      const trimmed = p.trim();
      if (!trimmed) return '';
      // Already block-level
      if (/^<\/?(h[1-6]|ul|ol|li|blockquote|pre|hr|table|div|p)/i.test(trimmed)) return trimmed;
      // Wrap in <p>
      // But don't double-wrap
      if (/^<p>/i.test(trimmed)) return trimmed;
      return `<p>${trimmed}</p>`;
    })
    .join('\n\n');

  // Line breaks within paragraphs (single newline)
  // TODO: handle judiciously - skip for now to avoid over-converting

  return html;
}

// ── YAML front-matter parsing (no dependencies) ─────────────────

function parseFrontMatter(raw) {
  const meta = { title: '', date: '', categories: [], tags: [] };

  // Find YAML between --- markers
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (!match) return meta;

  const yamlBlock = match[1];
  const lines = yamlBlock.split('\n');

  let currentKey = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trimEnd();

    if (!trimmed || trimmed.startsWith('#')) continue;

    // Key: value (top-level)
    const topMatch = trimmed.match(/^(\w[\w_-]*)\s*:\s*(.*)$/);
    if (topMatch) {
      currentKey = topMatch[1];
      const valuePart = topMatch[2].trim();

      if (currentKey === 'title') {
        meta.title = valuePart.replace(/^["']|["']$/g, '');
        continue;
      }

      if (currentKey === 'date') {
        meta.date = valuePart.replace(/^["']|["']$/g, '');
        continue;
      }

      if (currentKey === 'categories') {
        meta.categories = parseYamlListOrString(valuePart, lines, i);
        continue;
      }

      if (currentKey === 'tags') {
        meta.tags = parseYamlListOrString(valuePart, lines, i);
        continue;
      }

      // skip other keys
      continue;
    }

    // Continuation of a list (indented -)
    if (currentKey && (currentKey === 'tags' || currentKey === 'categories')) {
      const listItem = trimmed.match(/^\s*-\s+(.*)$/);
      if (listItem) {
        const item = listItem[1].trim().replace(/^["']|["']$/g, '');
        if (meta[currentKey]) {
          meta[currentKey].push(item);
        }
      }
    }
  }

  return meta;
}

function parseYamlListOrString(value, lines, lineIndex) {
  // Inline array: [a, b, c]
  if (value.startsWith('[') && value.endsWith(']')) {
    return value
      .slice(1, -1)
      .split(',')
      .map((s) => s.trim().replace(/^["']|["']$/g, ''))
      .filter(Boolean);
  }

  // Single string value
  if (value && !value.startsWith('-')) {
    return [value];
  }

  // List item on same line? e.g. tags: - tag1
  if (value.startsWith('-')) {
    const items = [];
    // current line
    const itemMatch = value.match(/^-\s+(.*)$/);
    if (itemMatch) items.push(itemMatch[1].trim().replace(/^["']|["']$/g, ''));
    // subsequent lines
    for (let j = lineIndex + 1; j < lines.length; j++) {
      const nextLine = lines[j].trimEnd();
      const nextMatch = nextLine.match(/^\s*-\s+(.*)$/);
      if (nextMatch) {
        items.push(nextMatch[1].trim().replace(/^["']|["']$/g, ''));
      } else {
        break;
      }
    }
    return items;
  }

  return [];
}

function getBody(raw) {
  const match = raw.match(/^---\s*\n[\s\S]*?\n---\s*\n([\s\S]*)$/);
  return match ? match[1].trim() : raw.trim();
}

// ── slug from filename ─────────────────────────────────────────

function slugFromFilename(filename) {
  return filename.replace(/\.md$/i, '');
}

// ── WXR generation ──────────────────────────────────────────────

async function main() {
  // Read all .md files
  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .sort(); // alphabetical → roughly chronological

  console.log(`Found ${files.length} .md files in ${POSTS_DIR}`);

  // Parse each file
  const items = [];

  for (const file of files) {
    const filepath = path.join(POSTS_DIR, file);
    const raw = fs.readFileSync(filepath, 'utf-8');

    const meta = parseFrontMatter(raw);
    const body = getBody(raw);
    const contentHtml = mdToHtml(body);
    const slug = slugFromFilename(file);
    const pubDate = toRfc2822(meta.date);
    const year = new Date(pubDate).getFullYear() || new Date().getFullYear();

    // Categories (mix of actual categories + tags both as wp:category + domain attribute)
    const allCats = [
      ...(Array.isArray(meta.categories) ? meta.categories : [meta.categories]).filter(Boolean),
    ];
    const allTags = [
      ...(Array.isArray(meta.tags) ? meta.tags : [meta.tags]).filter(Boolean),
    ];

    items.push({
      title: meta.title || slug,
      slug,
      pubDate,
      creator: 'samjoeyang',
      categories: allCats,
      tags: allTags,
      content: contentHtml,
      year,
    });
  }

  // Sort by date (oldest first)
  items.sort((a, b) => new Date(a.pubDate) - new Date(b.pubDate));

  console.log(`Parsed ${items.length} posts successfully.`);

  // Build XML
  const parts = [];
  parts.push('<?xml version="1.0" encoding="UTF-8" ?>');
  parts.push(
    '<rss version="2.0"',
    '  xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"',
    '  xmlns:content="http://purl.org/rss/1.0/modules/content/"',
    '  xmlns:wfw="http://wellformedweb.org/CommentAPI/"',
    '  xmlns:dc="http://purl.org/dc/elements/1.1/"',
    '  xmlns:wp="http://wordpress.org/export/1.2/">',
    '<channel>',
  );

  // Channel header
  parts.push(`  <title>${esc(SITE_NAME)}</title>`);
  parts.push(`  <link>${esc(SITE_URL)}</link>`);
  parts.push('  <description>Samjoe Yang 的个人博客 - 科技、管理、AI 与思考</description>');
  parts.push('  <language>zh-CN</language>');
  parts.push(`  <wp:wxr_version>1.2</wp:wxr_version>`);
  parts.push(`  <wp:base_site_url>${esc(SITE_URL)}</wp:base_site_url>`);
  parts.push(`  <wp:base_blog_url>${esc(SITE_URL)}</wp:base_blog_url>`);

  // Collect all unique categories & tags for the header
  const allCatNames = [...new Set(items.flatMap((i) => i.categories))].sort();
  const allTagNames = [...new Set(items.flatMap((i) => i.tags))].sort();

  for (const cat of allCatNames) {
    parts.push(
      `  <wp:category><wp:category_nicename>${esc(slugify(cat))}</wp:category_nicename><wp:category_parent></wp:category_parent><wp:cat_name>${esc(cat)}</wp:cat_name></wp:category>`,
    );
  }
  for (const tag of allTagNames) {
    parts.push(
      `  <wp:tag><wp:tag_slug>${esc(slugify(tag))}</wp:tag_slug><wp:tag_name>${esc(tag)}</wp:tag_name></wp:tag>`,
    );
  }

  // Items
  let postCount = 0;
  for (const item of items) {
    postCount++;
    parts.push('  <item>');

    parts.push(`    <title>${esc(item.title)}</title>`);
    parts.push(`    <link>${esc(SITE_URL)}/${esc(item.slug)}/</link>`);
    parts.push(`    <pubDate>${item.pubDate}</pubDate>`);
    parts.push(`    <dc:creator><![CDATA[${esc(item.creator)}]]></dc:creator>`);
    parts.push(`    <guid isPermaLink="false">${esc(SITE_URL)}/?p=${postCount}</guid>`);
    parts.push(`    <description></description>`);
    parts.push(`    <content:encoded>${cdata(item.content)}</content:encoded>`);
    parts.push(`    <excerpt:encoded>${cdata('')}</excerpt:encoded>`);
    parts.push(`    <wp:post_id>${postCount}</wp:post_id>`);
    parts.push(`    <wp:post_date>${new Date(item.pubDate).toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, '')}</wp:post_date>`);
    parts.push(`    <wp:post_date_gmt>${new Date(item.pubDate).toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, '')}</wp:post_date_gmt>`);
    parts.push(`    <wp:comment_status>open</wp:comment_status>`);
    parts.push(`    <wp:ping_status>open</wp:ping_status>`);
    parts.push(`    <wp:post_name>${esc(item.slug)}</wp:post_name>`);
    parts.push(`    <wp:status>publish</wp:status>`);
    parts.push(`    <wp:post_parent>0</wp:post_parent>`);
    parts.push(`    <wp:menu_order>0</wp:menu_order>`);
    parts.push(`    <wp:post_type>post</wp:post_type>`);
    parts.push(`    <wp:post_password></wp:post_password>`);
    parts.push(`    <wp:is_sticky>0</wp:is_sticky>`);

    // Categories
    for (const cat of item.categories) {
      parts.push(`    <category domain="category" nicename="${esc(slugify(cat))}">${esc(cat)}</category>`);
    }
    // Tags
    for (const tag of item.tags) {
      parts.push(`    <category domain="post_tag" nicename="${esc(slugify(tag))}">${esc(tag)}</category>`);
    }

    parts.push('  </item>');
  }

  parts.push('</channel>');
  parts.push('</rss>');

  const xml = parts.join('\n');
  fs.writeFileSync(OUTPUT_FILE, xml, 'utf-8');

  const stats = fs.statSync(OUTPUT_FILE);
  console.log(`\n✅ Done! WXR file written to: ${OUTPUT_FILE}`);
  console.log(`   File size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Total articles: ${items.length}`);
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff\s-]/g, '')
    .replace(/[\s]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
