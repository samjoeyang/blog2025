---
title: "SSH 连接管理器 PAC Manager 2.5.4 发布"
date: 2010-12-14 12:32:00
categories: NeedIsMe
tags: ["SSH", "LINUX", "Linux", "系统管理", "Google", "Ubuntu"]
---

<p>PAC Manager 是一款不错的带有 GUI 界面的 SSH 链接管理器，可帮助你管理大量的远程 SSH 主机。近日， PAC 发布了最新的 2.5.4 版，在代码方面做了相当大的修改，主要更新如下：
<ul>
<li>终端和 PAC 主 GUI 界面之间采用基于事件的 Socket-UNIX 进行通信。</li>
<li>代码改善，当 PAC 处于空闲状态时占用 0% 的 CPU 使用率（之前会有 5%)</li>
<li>添加了保存 session 日志的功能。</li>
<li>为 VNC 功能添加 "listen mode" 和 "view only" 模式</li>
</ul>
<p>更多改变见<a href="http://sites.google.com/site/davidtv/">官方网站</a>。另外，在试用中发现， PAC 也已支持 SSH Key 认证方式，这样可进一步保证安全性。</p>
<p><img src="/images/needisme/2010/12/101214_Selection_01.png" /></p>
<p># 安装： 到<a href="http://sourceforge.net/projects/pacmanager/files/pac-2.0/">这里下载 DEB</a> ，安装完 Deb 包后再运行以下命令安装相应的依赖包。</p>
<blockquote><p>sudo apt-get install -f</p></blockquote>

---

[📚 返回目录](/needisme-mu-lu/)
