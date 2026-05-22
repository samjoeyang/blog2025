---
title: "通过 Apt-get/Synaptic 安装 GetDeb 网站的软件"
date: 2010-12-02 15:05:00
categories: NeedIsMe
tags: ["HTML", "LINUX", "Linux", "系统管理", "Ubuntu", ".NET"]
---

<p>想必使用 Ubuntu 的朋友都知道有个名叫 <a href="http://www.getdeb.net/">GetDeb</a> 的网站（<a href="http://www.linuxhobby.com/archives/ubuntu_click_and_run.html">这里是我们曾经的介绍</a>），它将最新的软件、游戏打包成 deb 格式供 Ubuntu 用户直接下载安装使用，可谓对 Ubuntu 的使用者帮助不小。为了更好的使用 GetDeb 网站，我们介绍一个从 Apt-get 或 Synaptic 来安装其上的软件、游戏的方法。<br />
<a href="http://i.linuxtoy.org/i/2007/09/getdeb.png"><img src="http://www.linuxhobby.com/images/getdeb_s.png" alt="  通过 Apt-get/Synaptic 安装 GetDeb 网站的软件 " /></a></p>
<p><em>从 Synaptic 安装 GetDeb 网站的软件、游戏</em></p>
<p>要通过 Apt-get 或 Synaptic 安装 GetDeb 网站上的软件或游戏，其操作步骤如下：</p>
<ol>
<li>打开终端并输入下列指令以编辑 /etc/apt/sources.list 文件：<br />
<code>sudo gedit /etc/apt/sources.list</code></li>
<li>然后添加下列内容：<br />
<code>deb http://ubuntu.org.ua/ getdeb/</code>在保存文件后退出编辑程序。</li>
<li>更新源：<br />
<code>sudo apt-get update</code></li>
<li>如果你需要对当前的软件更新，可以执行：<br />
<code>sudo apt-get upgrade</code>如果你希望安装自己喜欢的软件或游戏，使用如下命令即可：</p>
<p><code>sudo apt-get install software/game</code></li>
</ol>

---

[📚 返回目录](/needisme-mu-lu/)
