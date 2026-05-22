---
title: "OpenFetion 2.1.0 发布，增加命令行支持"
date: 2010-12-28 11:07:00
categories: NeedIsMe
tags: ["API", "HTML", "Linux", "Google", "Ubuntu"]
---

<p><img alt="" src="http://wowubuntu.com/wp-content/uploads/2010/12/Selection_068.png" /><br /><a href="http://basiccoder.com/openfetion">Levin</a> （@levin108 ） 童鞋今天扔出了开源飞信客户端 <a href="http://wowubuntu.com/openfetion-2.html">OpenFetion</a> 的最新 2.1.0 版，新版做了蛮多的调整，最大的特色是增加了命令行客户端，主要改变如下：</p>
<ol>
<li> 迁移为使用 CMake 编译系统</li>
<li> 修复若干个 Bugs</li>
<li> openfetion 程序增加命令行支持</li>
<li> 增加纯命令行的 cliofetion（仅依赖 libofetion）</li>
<li> 独立发布 libofetion、openfetion GUI 部分和 cliofetion 命令行部分</li>
<li> libofetion 的 API 升级至 1.1.0，ABI 升级至 1.0.0</li>
</ol>
<p><a href="http://code.google.com/p/ofetion/">项目主页</a> / <a href="http://code.google.com/p/ofetion/downloads/list">源码下载</a></p>
<p>各个 tarball 的说明：</p>
<ul>
<li> libofetion-2.1.0.tar.gz：单独的 libofetion</li>
<li> openfetion-2.1.0.tar.gz：GTK+ 界面，需要先安装 libofetion</li>
<li> openfetion-standalone-2.1.0.tar.gz：GTK+ 界面，带 lib 部分并直接编译进二进制程序，避免了ldconfig 的烦恼。建议自己编译代码的朋友使用。</li>
<li> cliofetion-2.1.0.tar.gz：纯命令行的 ofetion，需要先安装 libofetion</li>
<li> cliofetion-standalone-2.1.0.tar.gz：纯命令行的 ofetion 带 lib 部分并直接编译进二进制程序</li>
<li> openfetion-all-2.1.0.tar.gz：包含了 lib 部分, GTK+ 和命令行部分，编译后会生成独立的库文件</li>
</ul>
<p><del>Deb 包及 PPA 还没有跟上，估计会不久后发布。</del></p>
<p>Update:  PPA 已全面更新。安装</p>
<blockquote><p>sudo apt-add-repository ppa:happyaron/ppa</p>
<p>sudo apt-get update</p>
<p>sudo apt-get install openfetion</p></blockquote>
<p><a href="http://wowubuntu.com/openfetion210.html" title="Permalink">本文链接</a><a href=""></a></p>

---

[📚 返回目录](/needisme-mu-lu/)
