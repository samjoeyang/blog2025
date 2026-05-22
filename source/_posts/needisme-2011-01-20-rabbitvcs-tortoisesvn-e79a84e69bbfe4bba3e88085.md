---
title: "RabbitVCS : TortoiseSVN 的替代者"
date: 2011-01-20 12:00:09
categories: NeedIsMe
tags: ["Git", "HTML", "LINUX", "Linux", "SVN", "系统管理"]
---

<p>TortoiseSVN 是 Windows 平台上版本控制程序 Subversion 的前端客户端，而 <a href="http://wowubuntu.com/rabbitvcs.html" target="_blank">RabbitVCS</a> 就是 Linux 平台下 TortoiseSVN 的最佳替代者。</p>
<p>RabbitVCS 是一款 Linux 平台上的版本控制前端程序，使用 Ptyhon 技术构建。可以与文件管理器 Nautilus 紧密整合，支持 Subversion (SVN) , Git 版本控制系统，未来还将支持 Mercurial 。</p>
<p>项目主页： <a href="http://rabbitvcs.org/" target="_blank">http://rabbitvcs.org/</a> / <a href="http://wiki.rabbitvcs.org/wiki/about/screenshots" target="_blank">截图</a></p>
<p>＃ <a href="http://wowubuntu.com/" target="_blank">Ubuntu</a> 用户安装（与 Nautilus 整合）, 其它发行版请到<a href="http://wiki.rabbitvcs.org/wiki/download" target="_blank">这里下载</a>。</p>
<blockquote><p><code>sudo add-apt-repository ppa:rabbitvcs/ppa<br />
sudo apt-get update<br />
sudo apt-get install rabbitvcs-core rabbitvcs-nautilus rabbitvcs-cli</code></p></blockquote>
<p>附加： 安装 RabbitVCS Gedit 扩展</p>
<blockquote><p><code>sudo apt-get install rabbitvcs-gedit</code></p></blockquote>
<p>修复无法显示图标的问题</p>
<blockquote><p><code>gconftool-2 --set /desktop/gnome/interface/menus_have_icons --type bool true</code></p></blockquote>
<p>最后输入以下命令重启 Nautilus 就可以使用 RabbitVCS 了。</p>
<blockquote><p><code>nautilus -q</code></p></blockquote>
<p><a title="Permalink" href="http://wowubuntu.com/rabbitvcs.html" target="_blank">本文链接</a><a target="_blank"> </a></p>

---

[📚 返回目录](/needisme-mu-lu/)
