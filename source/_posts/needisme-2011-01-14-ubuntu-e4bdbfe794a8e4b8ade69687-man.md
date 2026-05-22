---
title: "Ubuntu 使用中文 man"
date: 2011-01-14 23:26:57
categories: NeedIsMe
tags: ["Ubuntu", "Linux"]
---

<p>都知道 man 特别给力，有什么不会了就 man 一下，甚至 man 自己也能 man 。<br />
不过 Ubuntu 默认的 man 是英文的，看着总归有些累，将 man 改为中文的就易读多了。</p>
<p>1. 打开终端，输入</p>
<p>sudo aptitude install manpages-zh</p>
<p>安装中文 man 手册。<br />
2. 安装完了不够，还要看一下中文 man 手册安装到哪里了，在终端输入</p>
<p>dpkg -L manpages-zh | less</p>
<p>看到中文 man 手册安装在了</p>
<p>/usr/share/man/zh_CN</p>
<p>3. 然后编辑一下配置文件，终端执行</p>
<p>sudo gedit /etc/manpath.config</p>
<p>把所有的</p>
<p>/usr/share/man</p>
<p>都替换为</p>
<p>/usr/share/man/zh_CN</p>
<p>保存即可（别忘了之前先备份！）</p>
<p>现在来 man 一下，已经变成中文了。<br />
不过有一点点问题就是中文部分的 man 似乎有些少，比如 aptitude 就没有，不过问题不大。</p>
<p>转自：<a href="http://ketech.me/1329/ubuntu-man-in-chinese/">柯学技术</a>.</p>

---

[📚 返回目录](/needisme-mu-lu/)
