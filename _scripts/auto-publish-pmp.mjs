#!/usr/bin/env node

/**
 * 📘 PMP职场实战108问 · 自动发布脚本
 * 
 * 每天生成3篇PMP文章，更新目录页，构建并推送
 * 用法: node scripts/auto-publish-pmp.mjs
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';

const BLOG_DIR = '/Users/samjoeyang/workspace/blog2025';
const POSTS_DIR = `${BLOG_DIR}/source/_posts`;
const STATE_FILE = `${BLOG_DIR}/scripts/pmp-state.json`;
const DIR_PAGE_FILE = `${POSTS_DIR}/PMP职场实战108问.md`;
const MODEL = 'deepseek/deepseek-v4-flash';
const MAX_RETRIES = 3;
const MIN_ARTICLE_LENGTH = 800;

// ===== 108问完整列表 =====
const QUESTIONS = [
  // 一、基础铺垫（1-10）
  { num: 1, title: 'PMP证书和实操能力为什么差了十万八千里？', slug: '001-PMP证书和实操能力为什么差了十万八千里' },
  { num: 2, title: '如何建立"知识点→工作场景"的一对一映射？', slug: '002-如何建立知识点到工作场景的一对一映射' },
  { num: 3, title: '每天15分钟的PMP复盘怎么做才有效？', slug: '003-每天15分钟的PMP复盘怎么做才有效' },
  { num: 4, title: '"范围蔓延"在你工作中长什么样？', slug: '004-范围蔓延在你工作中长什么样' },
  { num: 5, title: '人员域的三大核心：沟通、冲突、激励怎么落地？', slug: '005-人员域三大核心沟通冲突激励落地' },
  { num: 6, title: '过程域的七大管控模块是哪些？', slug: '006-过程域七大管控模块' },
  { num: 7, title: '商业环境域：项目价值、收益、合规、战略对齐是什么？', slug: '007-商业环境域项目价值收益合规战略对齐' },
  { num: 8, title: '书本中的完美变更流程 vs 职场的紧急口头变更', slug: '008-书本完美变更流程与职场紧急口头变更' },
  { num: 9, title: '如何建立个人《PMP对标手册》？', slug: '009-如何建立个人PMP对标手册' },
  { num: 10, title: '如何甄别理论的"纸上差异"避免生搬硬套？', slug: '010-如何甄别理论的纸上差异避免生搬硬套' },
  // 二、范围管理（11-20）
  { num: 11, title: '为什么需求总是一变再变？——范围定义的实操方法', slug: '011-为什么需求总是一变再变范围定义的实操方法' },
  { num: 12, title: '什么是WBS工作分解？如何在日常项目中落地？', slug: '012-什么是WBS工作分解如何落地' },
  { num: 13, title: '一页纸"需求边界清单"该写什么？', slug: '013-一页纸需求边界清单该写什么' },
  { num: 14, title: '验收标准不明确，项目永远做不完', slug: '014-验收标准不明确项目永远做不完' },
  { num: 15, title: '口头加需求怎么办？这套固定话术帮你挡掉80%的坑', slug: '015-口头加需求固定话术' },
  { num: 16, title: '什么是范围基准？怎么建立和维护它？', slug: '016-什么是范围基准怎么建立和维护' },
  { num: 17, title: '"做白工"的根源到底在哪里？', slug: '017-做白工的根源到底在哪里' },
  { num: 18, title: 'WBS拆到"最小可执行单元"是什么标准？', slug: '018-WBS最小可执行单元标准' },
  { num: 19, title: '单人单任务、权责清晰——如何分配工作才合理？', slug: '019-单人单任务权责清晰分配工作' },
  { num: 20, title: '每周一次"范围偏差记录"该记什么？', slug: '020-每周范围偏差记录该记什么' },
  // 三、进度管理（21-30）
  { num: 21, title: '为什么项目总是延期？——进度管理的核心认知', slug: '021-为什么项目总是延期进度管理的核心认知' },
  { num: 22, title: '关键路径是什么？怎样识别自己项目中的关键路径？', slug: '022-关键路径是什么如何识别' },
  { num: 23, title: '浮动时间怎么用？非关键任务如何利用缓冲', slug: '023-浮动时间怎么用非关键任务缓冲' },
  { num: 24, title: '里程碑节点如何设定？标注"最晚完成时间"的重要性', slug: '024-里程碑节点设定最晚完成时间' },
  { num: 25, title: '进度压缩技术的正确用法', slug: '025-进度压缩技术的正确用法' },
  { num: 26, title: '敏捷小项目的迭代周期怎么定？', slug: '026-敏捷小项目迭代周期怎么定' },
  { num: 27, title: '每周进度同步怎么做才能不流于形式？', slug: '027-每周进度同步不流于形式' },
  { num: 28, title: '进度偏差分析怎么写？（附框架）', slug: '028-进度偏差分析怎么写附框架' },
  { num: 29, title: '杜绝"攒到月底爆雷"的周同步机制', slug: '029-杜绝攒到月底爆雷的周同步机制' },
  { num: 30, title: '被动加班和盲目赶工的根本解决方案', slug: '030-被动加班和盲目赶工的解决方案' },
  // 四、风险管理（31-40）
  { num: 31, title: '从救火式工作到预判式工作——风险管理的本质', slug: '031-从救火式工作到预判式风险管理' },
  { num: 32, title: '什么是风险登记册？最简单的四列模板就够了', slug: '032-风险登记册四列模板' },
  { num: 33, title: '项目启动初期识别5个核心风险的方法', slug: '033-项目启动识别5个核心风险' },
  { num: 34, title: '定性分析与定量分析在职场中的简化版', slug: '034-定性定量分析职场简化版' },
  { num: 35, title: '四种风险应对策略：规避、转移、减轻、接受', slug: '035-四种风险应对策略' },
  { num: 36, title: '可控风险和不可控风险如何区分处理？', slug: '036-可控与不可控风险区分处理' },
  { num: 37, title: '每日新增临时风险的记录习惯', slug: '037-每日新增临时风险记录习惯' },
  { num: 38, title: '预判对的风险和突发踩坑的风险怎么复盘？', slug: '038-预判风险与突发踩坑风险复盘' },
  { num: 39, title: '风险缓冲时间预留多少才合理？', slug: '039-风险缓冲时间预留多少合理' },
  { num: 40, title: '风险管理的"保险思维"——日常工作中的预判逻辑', slug: '040-风险管理的保险思维' },
  // 五、变更管理（41-48）
  { num: 41, title: '为什么先做后补是变更管理的头号死敌？', slug: '041-先做后补是变更管理头号死敌' },
  { num: 42, title: '变更控制四步法：记录→评估→同步→更新', slug: '042-变更控制四步法' },
  { num: 43, title: '什么是CCB评审？小团队没有CCB怎么办？', slug: '043-什么是CCB评审小团队怎么办' },
  { num: 44, title: '变更对进度、成本、质量的三角影响怎么评估？', slug: '044-变更对三角影响评估' },
  { num: 45, title: '相关方确认变更的沟通技巧', slug: '045-相关方确认变更沟通技巧' },
  { num: 46, title: '基准更新后如何同步给全员？', slug: '046-基准更新后同步全员' },
  { num: 47, title: '"紧急需求"和"变更管理"的灰色地带怎么处理？', slug: '047-紧急需求与变更管理的灰色地带' },
  { num: 48, title: '变更管理的制度化需要多久？', slug: '048-变更管理制度化需要多久' },
  // 六、相关方管理（49-58）
  { num: 49, title: '相关方管理不只是"搞定领导"', slug: '049-相关方管理不只是搞定领导' },
  { num: 50, title: '谁管审批、谁受影响、谁配合执行——相关方分类法', slug: '050-相关方分类法' },
  { num: 51, title: '四象限权力/利益矩阵的实操用法', slug: '051-权力利益矩阵实操用法' },
  { num: 52, title: '针对不同相关方采用不同沟通频率', slug: '052-不同相关方不同沟通频率' },
  { num: 53, title: '阻扰型相关方怎么应对？', slug: '053-阻扰型相关方怎么应对' },
  { num: 54, title: '沉默型相关方往往是最危险的', slug: '054-沉默型相关方最危险' },
  { num: 55, title: '相关方分析应该在项目什么时候做？', slug: '055-相关方分析什么时候做' },
  { num: 56, title: '项目中途相关方变动怎么办？', slug: '056-项目中途相关方变动' },
  { num: 57, title: '无效对接的根因分析', slug: '057-无效对接根因分析' },
  { num: 58, title: '相关方满意度的量化衡量方法', slug: '058-相关方满意度量化衡量' },
  // 七、沟通管理（59-68）
  { num: 59, title: '模糊沟通是项目混乱的第一源头', slug: '059-模糊沟通是项目混乱第一源头' },
  { num: 60, title: '"结论先行+风险同步+需求明确"的沟通公式', slug: '060-结论先行风险同步需求明确沟通公式' },
  { num: 61, title: '口头沟通后的文字复盘确认——多一步避免大量返工', slug: '061-口头沟通后文字复盘确认' },
  { num: 62, title: '沟通计划书在小项目中需要什么程度？', slug: '062-沟通计划书小项目程度' },
  { num: 63, title: '向上汇报的黄金框架', slug: '063-向上汇报黄金框架' },
  { num: 64, title: '跨部门沟通的障碍怎么打破？', slug: '064-跨部门沟通障碍怎么打破' },
  { num: 65, title: '信息过载 vs 信息不足——什么时候同步谁？', slug: '065-信息过载与信息不足同步策略' },
  { num: 66, title: '会议纪要不是记录，是承诺', slug: '066-会议纪要不是记录是承诺' },
  { num: 67, title: '敏捷站会的"三问"落地法', slug: '067-敏捷站会三问落地法' },
  { num: 68, title: '沟通渠道太多，怎么管理信息流？', slug: '068-沟通渠道太多怎么管理信息流' },
  // 八、冲突管理（69-78）
  { num: 69, title: '职场冲突的本质是什么？', slug: '069-职场冲突的本质是什么' },
  { num: 70, title: '合作解决策略——什么时候应该正面解决核心问题', slug: '070-合作解决策略正面解决核心问题' },
  { num: 71, title: '妥协策略——次要分歧要学会让步', slug: '071-妥协策略次要分歧让步' },
  { num: 72, title: '规避策略——哪些争执根本不值得参与', slug: '072-规避策略哪些争执不值得参与' },
  { num: 73, title: '强制策略——紧急情况下如何推进', slug: '073-强制策略紧急情况推进' },
  { num: 74, title: '缓和策略——化解情绪矛盾的分步方法', slug: '074-缓和策略化解情绪矛盾' },
  { num: 75, title: '跨部门推诿的根本原因剖析', slug: '075-跨部门推诿根本原因剖析' },
  { num: 76, title: '冲突管理的"黄金24小时"原则', slug: '076-冲突管理黄金24小时原则' },
  { num: 77, title: '团队内部分歧和外部冲突处理的不同策略', slug: '077-团队内外冲突不同策略' },
  { num: 78, title: '建立健康的冲突文化', slug: '078-建立健康的冲突文化' },
  // 九、团队管理（79-88）
  { num: 79, title: '新人、熟手、核心成员的差异化管理办法', slug: '079-新人熟手核心成员差异化管理' },
  { num: 80, title: '塔克曼模型：形成、震荡、规范、成熟四阶段如何应用？', slug: '080-塔克曼模型四阶段应用' },
  { num: 81, title: '震荡期的团队冲突怎么平稳度过？', slug: '081-震荡期团队冲突平稳度过' },
  { num: 82, title: '授权不等于放权——熟手如何被正确授权？', slug: '082-授权不等于放权熟手正确授权' },
  { num: 83, title: '赋能型管理——核心成员的成长路径', slug: '083-赋能型管理核心成员成长路径' },
  { num: 84, title: '团队士气低落的5个修复方法', slug: '084-团队士气低落5个修复方法' },
  { num: 85, title: 'RACI矩阵在团队分工中的实操用法', slug: '085-RACI矩阵团队分工实操' },
  { num: 86, title: '跨职能团队的协作障碍怎么拆？', slug: '086-跨职能团队协作障碍' },
  { num: 87, title: '虚拟团队和远程协作的管理挑战', slug: '087-虚拟团队远程协作管理挑战' },
  { num: 88, title: '团队知识传承与文档沉淀', slug: '088-团队知识传承文档沉淀' },
  // 十、商业环境与价值思维（89-98）
  { num: 89, title: '接手项目前必须问自己的三个核心问题', slug: '089-接手项目前三个核心问题' },
  { num: 90, title: '能解决公司什么问题——价值对齐思维', slug: '090-价值对齐思维' },
  { num: 91, title: '从"做完项目"到"做对项目"的认知升级', slug: '091-从做完项目到做对项目' },
  { num: 92, title: '项目收尾的"价值复盘"怎么写？', slug: '092-项目收尾价值复盘' },
  { num: 93, title: '哪些工作是"无效工作"？怎么识别？', slug: '093-无效工作识别方法' },
  { num: 94, title: '资源配置效率——用最少资源产出最大价值', slug: '094-资源配置效率最大化' },
  { num: 95, title: '合规与战略对齐——商业环境域的核心', slug: '095-合规与战略对齐' },
  { num: 96, title: '为什么很多项目做完了却没有产生商业价值？', slug: '096-项目做完无商业价值原因' },
  { num: 97, title: '收益实现管理——项目结束后的价值追踪', slug: '097-收益实现管理价值追踪' },
  { num: 98, title: '如何向高层证明项目的商业价值？', slug: '098-向高层证明项目商业价值' },
  // 十一、闭环复盘与持续提升（99-108）
  { num: 99, title: '每日10分钟复盘法——用最少时间固化PMP思维', slug: '099-每日10分钟复盘法固化PMP思维' },
  { num: 100, title: '周报怎么写才不只是"流水账"？', slug: '100-周报怎么写才不是流水账' },
  { num: 101, title: '错题和踩坑怎么转化成经验？', slug: '101-错题踩坑转化成经验' },
  { num: 102, title: '区分"理论不懂"和"实操不会"的针对性补强', slug: '102-区分理论不懂和实操不会补强' },
  { num: 103, title: '知识沉淀——如何建立个人项目管理SOP库', slug: '103-知识沉淀建立个人项目管理SOP库' },
  { num: 104, title: 'PMP实战框架在不同行业中的适配技巧', slug: '104-PMP实战框架不同行业适配' },
  { num: 105, title: '传统瀑布 vs 敏捷混合——如何选择落地模式', slug: '105-传统瀑布与敏捷混合如何选择' },
  { num: 106, title: 'PMP从学习到内化需要多长时间？', slug: '106-PMP从学习到内化需要多长时间' },
  { num: 107, title: '项目管理能力提升的"飞轮效应"', slug: '107-项目管理能力提升的飞轮效应' },
  { num: 108, title: '从项目经理到项目思维——PMP实战的终极目标', slug: '108-从项目经理到项目思维终极目标' },
];

// ===== 工具函数 =====
function run(cmd, opts = {}) {
  return execSync(cmd, { encoding: 'utf-8', cwd: BLOG_DIR, timeout: 120000, ...opts }).trim();
}

function getState() {
  if (existsSync(STATE_FILE)) {
    return JSON.parse(readFileSync(STATE_FILE, 'utf-8'));
  }
  return { published: 3 }; // 初始已发布3篇
}

function saveState(state) {
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function dirPagePath(slug) {
  return `/pmp-zhi-chang-shi-zhan-108-wen/`;
}

function getNextQuestions(state) {
  const start = state.published + 1;
  const end = Math.min(start + 2, 108);
  const result = [];
  for (let i = start; i <= end; i++) {
    const q = QUESTIONS.find(q => q.num === i);
    if (q) result.push(q);
  }
  return result;
}

function buildPrompt(q, previousContext) {
  return `你是一位项目管理实战专家，正在撰写「PMP职场实战108问」系列文章。

## 当前任务
写第${q.num}问：**${q.title}**

## 写作要求
1. 风格：真实、直接、有洞察，像在跟职场人聊天，不说空话套话
2. 结构：开篇点出核心问题 → 分析原因 → 给具体可操作的方法 → 今日动作 → 结尾链接
3. 必须包含一个真实的职场场景举例
4. 每段话都要有实际价值，不凑字数
5. 全文约800-1500字
6. 使用中文

## 文章格式
- 第一行: # PMP职场实战108问 · 第${q.num}问
- 正文中适当使用小标题、列表、表格
- 使用 <!-- more --> 在正文开头后（约第3-4段）插入作为摘要分隔
- 文末必须有今日动作（格式：> **📌 今日动作**：xxx）
- 文末必须有返回目录链接（格式：📚 **[返回 PMP职场实战108问 目录 →](/pmp-zhi-chang-shi-zhan-108-wen/)**）

## 前几问的风格参考
- 每问聚焦一个具体问题，不贪多
- 用职场人听得懂的大白话写
- 给出能明天就用上的操作方法
- 适当用emoji点缀（📌✅❌📚等）

请直接输出文章正文，不需要解释。`;
}

function generateArticle(q, context) {
  const prompt = buildPrompt(q, context);
  
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    console.log(`\n📝 生成第${q.num}问「${q.title}」（尝试 ${attempt}/${MAX_RETRIES}）...`);
    
    try {
      const output = run(
        `openclaw infer model run --model "${MODEL}" --prompt "${prompt.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`,
        { timeout: 180000 }
      );
      
      // 清理输出（去掉可能的cli前缀/后缀信息）
      let content = output.trim();
      // 去掉可能的模型信息行
      const lines = content.split('\n');
      const startIdx = lines.findIndex(l => l.startsWith('# PMP职场实战108问'));
      if (startIdx >= 0) {
        content = lines.slice(startIdx).join('\n');
      }
      
      // 验证
      if (content.length < MIN_ARTICLE_LENGTH) {
        console.warn(`  ⚠️ 内容过短 (${content.length}字)，重试...`);
        continue;
      }
      if (!content.includes('📚') || !content.includes('/pmp-zhi-chang-shi-zhan-108-wen/')) {
        console.warn(`  ⚠️ 缺少返回目录链接，重试...`);
        // 补上目录链接
        content += `\n\n---\n\n📚 **[返回 PMP职场实战108问 目录 →](/pmp-zhi-chang-shi-zhan-108-wen/)**`;
      }
      if (!content.startsWith('# PMP职场实战108问')) {
        content = `# PMP职场实战108问 · 第${q.num}问\n\n${content}`;
      }
      
      return content;
    } catch (e) {
      console.error(`  ❌ 生成失败: ${e.message}`);
      if (attempt === MAX_RETRIES) throw e;
    }
  }
  throw new Error(`第${q.num}问生成失败（重试${MAX_RETRIES}次）`);
}

function saveArticle(q, content) {
  const frontMatter = `---
title: ${q.title}
date: ${new Date().toISOString().split('T')[0]} 02:00:00
categories: 项目管理
tags: [PMP, 项目管理, 职场]
---

`;
  const filePath = `${POSTS_DIR}/${q.slug}.md`;
  writeFileSync(filePath, frontMatter + content);
  console.log(`  ✅ 已保存: ${q.slug}.md (${content.length}字)`);
  return filePath;
}

function updateDirPage(questions) {
  let dirContent = readFileSync(DIR_PAGE_FILE, 'utf-8');
  
  for (const q of questions) {
    // 在目录页中找到对应行，加上 ✅ 标记
    // 链接格式： [问题标题](/slug/)
    const oldLink = new RegExp(`(\\d+\\.\\s*)\\[${escapeRegex(q.title)}\\]\\(/[^)]+\\)`, 'g');
    const newLink = `$1✅ [${q.title}](/${q.slug}/)`;
    
    if (oldLink.test(dirContent)) {
      dirContent = dirContent.replace(oldLink, newLink);
      console.log(`  ✅ 已更新目录页: 第${q.num}问`);
    } else {
      console.warn(`  ⚠️ 目录页未找到第${q.num}问的条目`);
    }
  }
  
  writeFileSync(DIR_PAGE_FILE, dirContent);
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildAndPush() {
  console.log('\n🔨 构建中...');
  try {
    const buildOutput = run('npm run build 2>&1', { timeout: 120000 });
    const fileCount = (buildOutput.match(/Generated:/g) || []).length;
    console.log(`  ✅ 构建完成，${fileCount}个文件`);
  } catch (e) {
    throw new Error(`构建失败: ${e.message}`);
  }
  
  console.log('\n📤 推送中...');
  try {
    run('git add -A');
    const today = new Date().toISOString().split('T')[0];
    run(`git commit -m "feat: PMP职场实战108问自动发布（${today}）"`);
    run('git push origin theme-cards 2>&1');
    console.log('  ✅ 推送成功');
  } catch (e) {
    // 可能没有新内容需要提交
    if (e.message.includes('nothing to commit')) {
      console.log('  ℹ️ 无新内容需要提交');
    } else {
      throw e;
    }
  }
}

// ===== 主流程 =====
async function main() {
  console.log('📘 PMP职场实战108问 · 自动发布脚本');
  console.log('========================================');
  
  const state = getState();
  console.log(`当前进度: 已发布 ${state.published}/108 问`);
  
  if (state.published >= 108) {
    console.log('🎉 全部108问已发布完毕！');
    return;
  }
  
  const nextQuestions = getNextQuestions(state);
  if (nextQuestions.length === 0) {
    console.log('🎉 没有新的待发布问题');
    return;
  }
  
  console.log(`本次计划发布: 第${nextQuestions[0].num}~${nextQuestions[nextQuestions.length-1].num}问`);
  
  const contextLines = [];
  for (const q of nextQuestions) {
    const content = generateArticle(q, contextLines);
    saveArticle(q, content);
    contextLines.push(`第${q.num}问「${q.title}」已发布，简要内容：${content.substring(0, 100)}...`);
  }
  
  // 更新目录页
  console.log('\n📋 更新目录页...');
  updateDirPage(nextQuestions);
  
  // 更新状态
  const lastQ = nextQuestions[nextQuestions.length - 1];
  state.published = lastQ.num;
  saveState(state);
  console.log(`  状态已更新: published=${state.published}`);
  
  // 构建和推送
  buildAndPush();
  
  console.log(`\n🎉 完成！已发布第${nextQuestions[0].num}~${lastQ.num}问`);
}

main().catch(e => {
  console.error(`\n❌ 脚本异常退出:`, e.message);
  process.exit(1);
});
