#!/usr/bin/env node

/**
 * 🧭 PMP图表生成脚本
 *
 * 为PMP职场实战108问每篇文章生成SVG配图
 *
 * 用法:
 *   node tools/generate-pmp-diagram.mjs --number N --subject "主题" --type flowchart|process|tree|matrix|cycle|timeline
 *
 * 输出:
 *   source/images/pmp/qNNN-xxx.svg
 */

import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { execSync } from 'child_process';

const BLOG_DIR = resolve(import.meta.dirname, '..');
const IMAGES_DIR = `${BLOG_DIR}/source/images/pmp`;

// 确保输出目录存在
if (!existsSync(IMAGES_DIR)) {
  mkdirSync(IMAGES_DIR, { recursive: true });
}

// ===== 解析命令行参数 =====
function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--number') parsed.number = parseInt(args[++i], 10);
    else if (args[i] === '--subject' || args[i] === '--title') parsed.subject = args[++i];
    else if (args[i] === '--type') parsed.type = args[++i];
    else if (args[i] === '--slug') parsed.slug = args[++i];
  }
  return parsed;
}

// ===== 根据问题编号推断图表类型 =====
function inferDiagramType(num) {
  // 范围管理 (11-20) — WBS/流程
  if (num >= 11 && num <= 20) {
    if ([12, 18, 19].includes(num)) return 'tree';
    return 'process';
  }
  // 进度管理 (21-30) — 流程图/时间线
  if (num >= 21 && num <= 30) {
    if ([22, 24].includes(num)) return 'timeline';
    if ([25, 26, 28, 29].includes(num)) return 'flowchart';
    if ([21, 27, 30].includes(num)) return 'process';
    return 'flowchart';
  }
  // 风险管理 (31-40) — 流程图/矩阵
  if (num >= 31 && num <= 40) {
    if ([34].includes(num)) return 'matrix';
    if ([32, 35, 36, 39].includes(num)) return 'flowchart';
    return 'process';
  }
  // 变更管理 (41-48) — 流程图
  if (num >= 41 && num <= 48) return 'flowchart';
  // 相关方管理 (49-58) — 矩阵
  if (num >= 49 && num <= 58) {
    if ([51].includes(num)) return 'matrix';
    return 'process';
  }
  // 沟通管理 (59-68) — 流程图
  if (num >= 59 && num <= 68) return 'flowchart';
  // 冲突管理 (69-78) — 流程图/循环
  if (num >= 69 && num <= 78) {
    if ([70, 71, 72, 73, 74].includes(num)) return 'flowchart';
    if ([76].includes(num)) return 'cycle';
    return 'process';
  }
  // 团队管理 (79-88)
  if (num >= 79 && num <= 88) {
    if ([80].includes(num)) return 'cycle';
    if ([85].includes(num)) return 'matrix';
    if ([82, 83, 84].includes(num)) return 'process';
    return 'tree';
  }
  // 商业环境 (89-98)
  if (num >= 89 && num <= 98) return 'flowchart';
  // 复盘闭环 (99-108)
  if (num >= 99 && num <= 108) {
    if ([99].includes(num)) return 'cycle';
    if ([104, 105].includes(num)) return 'flowchart';
    if ([107].includes(num)) return 'cycle';
    return 'process';
  }
  return 'flowchart';
}

// ===== 生成安全的文件名 =====
function safeSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
}

// ===== ---- 模板: 流程图 (Flowchart / Process) ---- =====
function renderFlowchart(title, subtitle, steps, isProcess = false) {
  const boxW = 220;
  const boxH = 52;
  const gapX = 70;
  const gapY = 60;
  const cols = Math.min(steps.length, 4);
  const rows = Math.ceil(steps.length / cols);
  const svgW = cols * (boxW + gapX) + gapX;
  const svgH = rows * (boxH + gapY) + 100;
  const colorClass = isProcess ? 'process' : 'input';

  let boxes = '';
  let arrows = '';

  steps.forEach((step, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = gapX + col * (boxW + gapX);
    const y = 70 + row * (boxH + gapY);
    const cx = x + boxW / 2;
    const cy = y + boxH / 2;

    boxes += `
  <g class="node ${colorClass}" transform="translate(${x},${y})">
    <rect width="${boxW}" height="${boxH}" rx="8" ry="8"/>
    <text x="${boxW / 2}" y="${boxH / 2 - 6}" text-anchor="middle" class="label" dominant-baseline="auto">${step.label}</text>
    <text x="${boxW / 2}" y="${boxH / 2 + 12}" text-anchor="middle" class="small">${step.desc || ''}</text>
  </g>`;

    // 箭头：向右或向下
    if (i < steps.length - 1) {
      const nextCol = (i + 1) % cols;
      const nextRow = Math.floor((i + 1) / cols);
      if (nextCol > col) {
        // 向右
        const x1 = x + boxW;
        const y1 = cy;
        const x2 = x + boxW + gapX;
        arrows += `
  <line class="edge" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y1}" marker-end="url(#arrow)"/>`;
      } else {
        // 向下
        const x1 = cx;
        const y1 = y + boxH;
        arrows += `
  <line class="edge" x1="${x1}" y1="${y1}" x2="${x1}" y2="${y1 + gapY}" marker-end="url(#arrow)"/>`;
      }
    }
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgW} ${svgH}" width="${svgW}" height="${svgH}">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0,0 L10,5 L0,10 Z" fill="var(--line, #64748b)"/>
    </marker>
  </defs>
  <style>
    .label { font: 600 13px/1.3 ui-sans-serif,system-ui,sans-serif; fill: var(--fg, #172033); }
    .small { font: 11px/1.3 ui-sans-serif,system-ui,sans-serif; fill: var(--muted, #5b6475); }
    .node rect { stroke: var(--line, #64748b); stroke-width: 1; fill: var(--input, #bfdbfe); }
    .process rect { fill: var(--process, #c7d2fe); }
    .edge { stroke: var(--line, #64748b); stroke-width: 1.5; fill: none; }
    .title { font: 700 16px/1.3 ui-sans-serif,system-ui,sans-serif; fill: var(--fg, #172033); }
    .subtitle { font: 12px/1.3 ui-sans-serif,system-ui,sans-serif; fill: var(--muted, #5b6475); }
  </style>
  <text x="${svgW / 2}" y="28" text-anchor="middle" class="title">${title}</text>
  <text x="${svgW / 2}" y="48" text-anchor="middle" class="subtitle">${subtitle}</text>
  ${arrows}
  ${boxes}
</svg>`;
}

// ===== ---- 模板: 树形结构 (Tree) ---- =====
function renderTree(title, subtitle, root, children) {
  const nodeW = 180;
  const nodeH = 40;
  const gapY = 50;
  const childGapX = 30;
  const total = children.length;
  const svgW = Math.max(500, total * (nodeW + childGapX) + 60);
  const svgH = 200;
  const rootX = svgW / 2 - nodeW / 2;

  let elements = '';

  // 根节点
  elements += `
  <g class="node process" transform="translate(${rootX},60)">
    <rect width="${nodeW}" height="${nodeH}" rx="6" ry="6"/>
    <text x="${nodeW / 2}" y="${nodeH / 2 + 5}" text-anchor="middle" class="label">${root}</text>
  </g>`;

  // 子节点
  const totalW = total * nodeW + (total - 1) * childGapX;
  const startX = (svgW - totalW) / 2;
  children.forEach((child, i) => {
    const cx = startX + i * (nodeW + childGapX) + nodeW / 2;
    const childX = startX + i * (nodeW + childGapX);

    // 连线
    elements += `
  <line class="edge" x1="${svgW / 2}" y1="100" x2="${cx}" y2="130"/>`;

    // 子节点框
    elements += `
  <g class="node ${child.color || 'neutral'}" transform="translate(${childX},130)">
    <rect width="${nodeW}" height="${nodeH}" rx="6" ry="6"/>
    <text x="${nodeW / 2}" y="${nodeH / 2 + 5}" text-anchor="middle" class="label">${child.label}</text>
  </g>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgW} ${svgH}" width="${svgW}" height="${svgH}">
  <style>
    .label { font: 600 12px/1.3 ui-sans-serif,system-ui,sans-serif; fill: var(--fg, #172033); }
    .node rect { stroke: var(--line, #64748b); stroke-width: 1; }
    .process rect { fill: var(--process, #c7d2fe); }
    .neutral rect { fill: var(--neutral, #e2e8f0); }
    .input rect { fill: var(--input, #bfdbfe); }
    .edge { stroke: var(--line, #64748b); stroke-width: 1.5; fill: none; }
    .title { font: 700 16px/1.3 ui-sans-serif,system-ui,sans-serif; fill: var(--fg, #172033); }
    .subtitle { font: 12px/1.3 ui-sans-serif,system-ui,sans-serif; fill: var(--muted, #5b6475); }
  </style>
  <text x="${svgW / 2}" y="28" text-anchor="middle" class="title">${title}</text>
  <text x="${svgW / 2}" y="48" text-anchor="middle" class="subtitle">${subtitle}</text>
  ${elements}
</svg>`;
}

// ===== ---- 模板: 矩阵 (Matrix) ---- =====
function renderMatrix(title, subtitle, rows, cols, data) {
  const cellW = 150;
  const cellH = 40;
  const headerH = 36;
  const rowHeaderW = 100;
  const svgW = rowHeaderW + cols.length * cellW + 40;
  const svgH = 50 + headerH + rows.length * cellH + 20;

  let elements = '';

  // 列标题
  for (let c = 0; c < cols; c++) {
    const cx = 20 + rowHeaderW + c * cellW;
    elements += `
  <g class="header" transform="translate(${cx},50)">
    <rect width="${cellW}" height="${headerH}" rx="4" ry="4"/>
    <text x="${cellW / 2}" y="${headerH / 2 + 5}" text-anchor="middle" class="label">${cols[c]}</text>
  </g>`;
  }

  // 行标题 + 数据
  for (let r = 0; r < rows; r++) {
    const ry = 50 + headerH + r * cellH;
    // 行标题
    elements += `
  <g class="header" transform="translate(20,${ry})">
    <rect width="${rowHeaderW}" height="${cellH}" rx="4" ry="4"/>
    <text x="${rowHeaderW / 2}" y="${cellH / 2 + 5}" text-anchor="middle" class="label">${rows[r]}</text>
  </g>`;

    for (let c = 0; c < cols; c++) {
      const cx = 20 + rowHeaderW + c * cellW;
      const val = data[r]?.[c] || '';
      elements += `
  <g class="node ${val === '✅' ? 'input' : val === '⚠️' ? 'risk' : 'neutral'}" transform="translate(${cx},${ry})">
    <rect width="${cellW}" height="${cellH}" rx="4" ry="4"/>
    <text x="${cellW / 2}" y="${cellH / 2 + 5}" text-anchor="middle" class="label">${val}</text>
  </g>`;
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgW} ${svgH}" width="${svgW}" height="${svgH}">
  <style>
    .label { font: 600 12px/1.3 ui-sans-serif,system-ui,sans-serif; fill: var(--fg, #172033); }
    .header rect { fill: var(--process, #c7d2fe); stroke: var(--line, #64748b); stroke-width: 1; }
    .node rect { stroke: var(--line, #64748b); stroke-width: 1; }
    .neutral rect { fill: var(--neutral, #e2e8f0); }
    .input rect { fill: var(--input, #bfdbfe); }
    .risk rect { fill: var(--risk, #fecaca); }
    .title { font: 700 16px/1.3 ui-sans-serif,system-ui,sans-serif; fill: var(--fg, #172033); }
    .subtitle { font: 12px/1.3 ui-sans-serif,system-ui,sans-serif; fill: var(--muted, #5b6475); }
  </style>
  <text x="${svgW / 2}" y="28" text-anchor="middle" class="title">${title}</text>
  <text x="${svgW / 2}" y="48" text-anchor="middle" class="subtitle">${subtitle}</text>
  ${elements}
</svg>`;
}

// ===== ---- 模板: 循环 (Cycle) ---- =====
function renderCycle(title, subtitle, phases) {
  const cx = 300;
  const cy = 260;
  const outerR = 180;
  const innerR = 60;
  const svgW = 600;
  const svgH = 520;
  const count = phases.length;

  let elements = '';

  // 循环箭头环
  elements += `
  <circle cx="${cx}" cy="${cy}" r="${outerR}" class="cycle-ring"/>
  <circle cx="${cx}" cy="${cy}" r="${innerR}" class="cycle-ring"/>`;

  // 各阶段
  phases.forEach((phase, i) => {
    const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
    const x = cx + (outerR + innerR) / 2 * Math.cos(angle);
    const y = cy + (outerR + innerR) / 2 * Math.sin(angle);
    const textAngle = angle + (angle > Math.PI / 2 && angle < 3 * Math.PI / 2 ? Math.PI : 0);

    elements += `
  <g transform="translate(${x},${y})">
    <circle r="40" class="cycle-node ${phase.color || 'process'}"/>
    <text x="0" y="2" text-anchor="middle" class="label">${phase.num}</text>
  </g>`;
  });

  // 中心文字
  elements += `
  <text x="${cx}" y="${cy - 8}" text-anchor="middle" class="label cycle-center">${subtitle}</text>
  <text x="${cx}" y="${cy + 12}" text-anchor="middle" class="small">循环</text>`;

  // 标题 + 阶段标签放在圆外
  let labels = '';
  phases.forEach((phase, i) => {
    const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
    const lx = cx + (outerR + 55) * Math.cos(angle);
    const ly = cy + (outerR + 55) * Math.sin(angle);
    const anchor = angle > Math.PI / 2 && angle < 3 * Math.PI / 2 ? 'end' : 'start';
    labels += `
  <text x="${lx}" y="${ly}" text-anchor="${anchor}" class="label cycle-label">${phase.label}</text>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgW} ${svgH}" width="${svgW}" height="${svgH}">
  <style>
    .label { font: 600 13px/1.3 ui-sans-serif,system-ui,sans-serif; fill: var(--fg, #172033); }
    .small { font: 11px/1.3 ui-sans-serif,system-ui,sans-serif; fill: var(--muted, #5b6475); }
    .title { font: 700 16px/1.3 ui-sans-serif,system-ui,sans-serif; fill: var(--fg, #172033); }
    .subtitle { font: 12px/1.3 ui-sans-serif,system-ui,sans-serif; fill: var(--muted, #5b6475); }
    .cycle-ring { fill: none; stroke: var(--line, #64748b); stroke-width: 1.5; stroke-dasharray: 6 4; }
    .cycle-node { stroke: var(--line, #64748b); stroke-width: 1.5; }
    .cycle-node.process { fill: var(--process, #c7d2fe); }
    .cycle-node.input { fill: var(--input, #bfdbfe); }
    .cycle-node.neutral { fill: var(--neutral, #e2e8f0); }
    .cycle-node.storage { fill: var(--storage, #99f6e4); }
    .cycle-label { fill: var(--muted, #5b6475); }
    .cycle-center { font-size: 14px; }
  </style>
  <text x="${svgW / 2}" y="28" text-anchor="middle" class="title">${title}</text>
  ${elements}
  ${labels}
</svg>`;
}

// ===== ---- 模板: 时间线 (Timeline) ---- =====
function renderTimeline(title, subtitle, milestones) {
  const svgW = 680;
  const svgH = 60 + milestones.length * 70 + 30;
  const lineX = 60;

  let elements = '';

  // 时间线
  elements += `
  <line class="edge" x1="${lineX}" y1="60" x2="${lineX}" y2="${svgH - 30}"/>`;

  // 里程碑
  milestones.forEach((ms, i) => {
    const y = 60 + i * 70 + 35;

    // 节点
    elements += `
  <circle cx="${lineX}" cy="${y}" r="8" class="timeline-dot"/>`;

    // 内容框 (右)
    elements += `
  <g class="node ${ms.color || 'input'}" transform="translate(${lineX + 20},${y - 22})">
    <rect width="520" height="44" rx="6" ry="6"/>
    <text x="12" y="18" class="label">${ms.label}</text>
    <text x="12" y="34" class="small">${ms.desc || ''}</text>
    <text x="160" y="18" class="small milestone-date" text-anchor="end">${ms.time || ''}</text>
  </g>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgW} ${svgH}" width="${svgW}" height="${svgH}">
  <style>
    .label { font: 600 12px/1.3 ui-sans-serif,system-ui,sans-serif; fill: var(--fg, #172033); }
    .small { font: 11px/1.3 ui-sans-serif,system-ui,sans-serif; fill: var(--muted, #5b6475); }
    .milestone-date { font: 10px/1.3 ui-sans-serif,system-ui,sans-serif; fill: var(--fg, #172033); }
    .title { font: 700 16px/1.3 ui-sans-serif,system-ui,sans-serif; fill: var(--fg, #172033); }
    .subtitle { font: 12px/1.3 ui-sans-serif,system-ui,sans-serif; fill: var(--muted, #5b6475); }
    .node rect { stroke: var(--line, #64748b); stroke-width: 1; rx: 6; }
    .input rect { fill: var(--input, #bfdbfe); }
    .process rect { fill: var(--process, #c7d2fe); }
    .neutral rect { fill: var(--neutral, #e2e8f0); }
    .edge { stroke: var(--line, #64748b); stroke-width: 2; fill: none; }
    .timeline-dot { fill: var(--fg, #172033); stroke: var(--line, #64748b); stroke-width: 1.5; }
  </style>
  <text x="${svgW / 2}" y="28" text-anchor="middle" class="title">${title}</text>
  <text x="${svgW / 2}" y="48" text-anchor="middle" class="subtitle">${subtitle}</text>
  ${elements}
</svg>`;
}

// ===== ---- 根据问题和图表类型生成内容 ---- =====
function buildDiagram(num, subject, type) {
  // 通用的标题&副标题
  const title = `第${num}问：${subject.length > 24 ? subject.slice(0, 24) + '…' : subject}`;
  const subtitle = `PMP职场实战108问 · 图解`;

  switch (type) {
    case 'flowchart':
    case 'process': {
      const isProcess = type === 'process';
      // 根据问题生成不同的步骤
      const steps = buildFlowchartSteps(num, subject, type);
      return renderFlowchart(title, subtitle, steps, isProcess);
    }
    case 'tree': {
      const { root, children } = buildTreeData(num, subject);
      return renderTree(title, subtitle, root, children);
    }
    case 'matrix': {
      const { rows, cols, data } = buildMatrixData(num, subject);
      return renderMatrix(title, subtitle, rows, cols, data);
    }
    case 'cycle': {
      const phases = buildCyclePhases(num, subject);
      return renderCycle(title, subtitle, phases);
    }
    case 'timeline': {
      const milestones = buildTimelineData(num, subject);
      return renderTimeline(title, subtitle, milestones);
    }
    default:
      return renderFlowchart(title, subtitle, [
        { label: '分析场景', desc: '识别核心问题' },
        { label: '制定方案', desc: '定义应对策略' },
        { label: '执行落地', desc: '实施行动计划' },
        { label: '复盘改进', desc: '形成闭环优化' },
      ], false);
  }
}

// ===== ---- 流程图步骤生成器 ---- =====
function buildFlowchartSteps(num, subject, type) {
  const defaults = [
    { label: '识别问题', desc: '发现需求与痛点' },
    { label: '分析影响', desc: '评估变更影响范围' },
    { label: '制定方案', desc: '设计解决方案' },
    { label: '沟通同步', desc: '相关方确认' },
    { label: '执行落地', desc: '实施并跟踪' },
    { label: '复盘归档', desc: '记录经验教训' },
  ];

  // 按主题类型分类
  const themeMap = {
    '范围': [
      { label: '需求收集', desc: '明确边界定义' },
      { label: 'WBS分解', desc: '拆解可执行单元' },
      { label: '验收标准', desc: '定义完成条件' },
      { label: '范围确认', desc: '相关方签字确认' },
      { label: '范围控制', desc: '偏差监控与纠正' },
    ],
    '进度': [
      { label: '任务排序', desc: '识别依赖关系' },
      { label: '关键路径', desc: '识别最长路径' },
      { label: '资源分配', desc: '匹配人力与时间' },
      { label: '进度压缩', desc: '加班/并行/赶工' },
      { label: '偏差监控', desc: '周同步与纠正' },
    ],
    '风险': [
      { label: '风险识别', desc: '发现潜在威胁' },
      { label: '定性分析', desc: '评估概率影响' },
      { label: '应对策略', desc: '规避/转移/减轻' },
      { label: '应急储备', desc: '预留缓冲时间' },
      { label: '持续监控', desc: '定期重新评估' },
    ],
    '变更': [
      { label: '变更请求', desc: '记录变更内容' },
      { label: '影响评估', desc: '三角约束分析' },
      { label: 'CCB评审', desc: '决策批准或拒绝' },
      { label: '基准更新', desc: '同步计划文件' },
      { label: '全员通知', desc: '确保信息对称' },
    ],
    '沟通': [
      { label: '识别受众', desc: '谁需要什么信息' },
      { label: '选择渠道', desc: '正式/非正式' },
      { label: '信息传递', desc: '结论先行' },
      { label: '确认理解', desc: '文字复盘确认' },
      { label: '归档留痕', desc: '会议纪要即承诺' },
    ],
    '冲突': [
      { label: '识别冲突', desc: '发现分歧本质' },
      { label: '分类处理', desc: '选择应对策略' },
      { label: '直接沟通', desc: '正面解决问题' },
      { label: '达成共识', desc: '找到共同利益' },
      { label: '关系修复', desc: '建立冲突文化' },
    ],
    '团队': [
      { label: '角色定义', desc: 'RACI权责分配' },
      { label: '阶段诊断', desc: '塔克曼模型评估' },
      { label: '差异管理', desc: '新人/熟手/核心' },
      { label: '赋能授权', desc: '信任与成长' },
      { label: '知识传承', desc: '文档沉淀SOP' },
    ],
    '价值': [
      { label: '价值对齐', desc: '与公司战略匹配' },
      { label: '资源优化', desc: '最小投入最大产出' },
      { label: '收益追踪', desc: '项目结束非终点' },
      { label: '价值复盘', desc: '数据化衡量成效' },
      { label: '持续改进', desc: '建立评估机制' },
    ],
  };

  for (const [key, steps] of Object.entries(themeMap)) {
    if (subject.includes(key)) {
      return steps;
    }
  }

  return defaults;
}

// ===== ---- 树形数据生成器 ---- =====
function buildTreeData(num, subject) {
  const themeMap = {
    'WBS': {
      root: '工作分解结构 (WBS)',
      children: [
        { label: '阶段1：规划', color: 'input' },
        { label: '阶段2：执行', color: 'process' },
        { label: '阶段3：监控', color: 'neutral' },
        { label: '阶段4：收尾', color: 'storage' },
      ],
    },
    'RACI': {
      root: 'RACI权责矩阵',
      children: [
        { label: 'R 执行者', color: 'input' },
        { label: 'A 负责人', color: 'process' },
        { label: 'C 被咨询', color: 'neutral' },
        { label: 'I 被告知', color: 'storage' },
      ],
    },
    '知识': {
      root: '项目管理知识体系',
      children: [
        { label: '范围管理', color: 'input' },
        { label: '进度管理', color: 'process' },
        { label: '风险管理', color: 'risk' },
        { label: '团队管理', color: 'neutral' },
      ],
    },
    'SOP': {
      root: '个人SOP知识库',
      children: [
        { label: '流程模板', color: 'input' },
        { label: '检查清单', color: 'process' },
        { label: '话术模板', color: 'neutral' },
        { label: '复盘记录', color: 'storage' },
      ],
    },
  };

  for (const [key, data] of Object.entries(themeMap)) {
    if (subject.includes(key)) return data;
  }

  return {
    root: '项目管理核心能力',
    children: [
      { label: '硬技能', color: 'input' },
      { label: '软技能', color: 'process' },
      { label: '商业思维', color: 'neutral' },
      { label: '领导力', color: 'storage' },
    ],
  };
}

// ===== ---- 矩阵数据生成器 ---- =====
function buildMatrixData(num, subject) {
  // 权力利益矩阵
  if (num === 51 || subject.includes('权力') || subject.includes('利益')) {
    return {
      rows: ['低权力', '高权力'],
      cols: ['低利益', '高利益'],
      data: [
        ['🤏 最低努力', '💡 保持告知'],
        ['🤝 令其满意', '⭐ 重点管理'],
      ],
    };
  }

  // 风险四象限
  if (subject.includes('风险') || subject.includes('概率')) {
    return {
      rows: ['低概率', '高概率'],
      cols: ['低影响', '高影响'],
      data: [
        ['✅ 接受', '⚠️ 监控'],
        ['⚠️ 转移', '🚨 规避'],
      ],
    };
  }

  // RACI
  if (subject.includes('RACI')) {
    return {
      rows: ['需求定义', '方案设计', '开发实施', '测试验收'],
      cols: ['PM', '开发', '测试', '业务方'],
      data: [
        ['A', 'C', 'I', 'R'],
        ['R', 'R', 'I', 'C'],
        ['C', 'R', 'I', 'I'],
        ['A', 'C', 'R', 'R'],
      ],
    };
  }

  return {
    rows: ['维度A', '维度B'],
    cols: ['高', '低'],
    data: [
      ['✅ 是', '⚠️ 关注'],
      ['⚠️ 监控', '✅ 忽略'],
    ],
  };
}

// ===== ---- 循环阶段生成器 ---- =====
function buildCyclePhases(num, subject) {
  const themeMap = {
    '塔克曼': [
      { num: '1', label: '形成期', color: 'neutral' },
      { num: '2', label: '震荡期', color: 'risk' },
      { num: '3', label: '规范期', color: 'process' },
      { num: '4', label: '成熟期', color: 'input' },
    ],
    '飞轮': [
      { num: '1', label: '学习', color: 'input' },
      { num: '2', label: '实践', color: 'process' },
      { num: '3', label: '复盘', color: 'neutral' },
      { num: '4', label: '优化', color: 'storage' },
    ],
    '内化': [
      { num: '1', label: '理解', color: 'input' },
      { num: '2', label: '应用', color: 'process' },
      { num: '3', label: '融会', color: 'neutral' },
      { num: '4', label: '贯通', color: 'storage' },
    ],
    '复盘': [
      { num: '1', label: '记录事实', color: 'input' },
      { num: '2', label: '分析根因', color: 'process' },
      { num: '3', label: '总结经验', color: 'neutral' },
      { num: '4', label: '行动改进', color: 'storage' },
    ],
  };

  for (const [key, data] of Object.entries(themeMap)) {
    if (subject.includes(key)) return data;
  }

  return [
    { num: '1', label: '计划', color: 'input' },
    { num: '2', label: '执行', color: 'process' },
    { num: '3', label: '检查', color: 'neutral' },
    { num: '4', label: '改进', color: 'storage' },
  ];
}

// ===== ---- 时间线数据生成器 ---- =====
function buildTimelineData(num, subject) {
  if (num === 24 || subject.includes('里程碑')) {
    return [
      { label: '需求确认', desc: '范围基线建立', time: '第1周', color: 'input' },
      { label: '关键设计评审', desc: '方案评审通过', time: '第3周', color: 'process' },
      { label: '开发完成', desc: '核心功能交付', time: '第6周', color: 'neutral' },
      { label: '测试验收', desc: 'UAT通过', time: '第8周', color: 'storage' },
      { label: '正式发布', desc: '上线运营', time: '第10周', color: 'input' },
    ];
  }

  if (subject.includes('关键路径')) {
    return [
      { label: '任务A (2天)', desc: '设计原型', time: 'D1-D2', color: 'input' },
      { label: '任务B (3天)', desc: '开发核心功能', time: 'D3-D5', color: 'process' },
      { label: '任务C (2天)', desc: '系统集成测试', time: 'D6-D7', color: 'neutral' },
      { label: '任务D (1天)', desc: 'UAT验收', time: 'D8', color: 'storage' },
      { label: '任务E (1天)', desc: '上线部署', time: 'D9', color: 'input' },
    ];
  }

  return [
    { label: '阶段一：启动', desc: '明确目标与范围', time: '第1阶段', color: 'input' },
    { label: '阶段二：规划', desc: '制定详细计划', time: '第2阶段', color: 'process' },
    { label: '阶段三：执行', desc: '按计划实施', time: '第3阶段', color: 'neutral' },
    { label: '阶段四：收尾', desc: '验收与复盘', time: '第4阶段', color: 'storage' },
  ];
}

// ===== ---- 主函数 ---- =====
function main() {
  const args = parseArgs();

  if (!args.number) {
    console.error('❌ 缺少参数: --number N');
    console.error('用法: node tools/generate-pmp-diagram.mjs --number N --subject "主题" --type flowchart|process|tree|matrix|cycle|timeline [--slug xxx]');
    process.exit(1);
  }

  const num = args.number;
  const subject = args.subject || `项目管理第${num}问`;
  const type = args.type || inferDiagramType(num);
  const slug = args.slug || `q${String(num).padStart(3, '0')}-${safeSlug(subject)}`;

  console.log(`🧭 生成图表: 第${num}问「${subject}」 → ${type} 类型`);

  // 构建 SVG
  const svg = buildDiagram(num, subject, type);

  // 保存
  const outPath = `${IMAGES_DIR}/${slug}.svg`;
  writeFileSync(outPath, svg);
  console.log(`  ✅ SVG已保存: ${outPath}`);

  // 输出相对路径（供文章使用）
  const relPath = `/images/pmp/${slug}.svg`;
  console.log(`  📎 引用路径: ${relPath}`);

  return relPath;
}

// 当直接运行时执行
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

// 导出供其他脚本调用
export { generateDiagram, inferDiagramType, safeSlug };

function generateDiagram(num, subject, type, slug) {
  const resolvedType = type || inferDiagramType(num);
  const resolvedSlug = slug || `q${String(num).padStart(3, '0')}-${safeSlug(subject)}`;
  const svg = buildDiagram(num, subject, resolvedType);
  const outPath = `${IMAGES_DIR}/${resolvedSlug}.svg`;
  writeFileSync(outPath, svg);
  return `/images/pmp/${resolvedSlug}.svg`;
}

// 导出模板函数（供单元测试用）
export { buildDiagram, renderFlowchart, renderTree, renderMatrix, renderCycle, renderTimeline };
