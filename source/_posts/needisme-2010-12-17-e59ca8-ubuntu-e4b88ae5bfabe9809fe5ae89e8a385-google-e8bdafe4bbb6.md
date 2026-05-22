---
title: "在 Ubuntu 上快速安装 Google 软件"
date: 2010-12-17 12:23:49
categories: NeedIsMe
tags: ["Google Fans", "HTML", "Linux", "Google", "Ubuntu"]
---

<p>用 root 帐户运行下面的命令，添加证书</p>
<pre>wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -</pre>
<p>把下面的源添加到 /etc/apt/sources.list 文件中</p>
<pre>deb http://dl.google.com/linux/deb/ stable non-free main</pre>
<p>随后更新数据库</p>
<pre>sudo apt-get update</pre>
<p>安装软件</p>
<pre>sudo apt-get install google-chrome-unstable
sudo apt-get install picasa
sudo apt-get install google-desktop-linux</pre>
<p>Google earth 安装，试了一下，下面的方法可能会不成功，感觉比较麻烦，还是建议文件下载安装。</p>
<pre>sudo apt-get install googleearth-package
sudo make-googleearth-package &ndash;force
sudo dpkg -i *.deb</pre>
<p>参考：<a title="http://www.google.com/linuxrepositories/apt.html" rel="nofollow" href="http://www.google.com/linuxrepositories/apt.html" target="_blank">http://www.google.com/linuxrepositories/apt.html</a></p>
<p>来源：<a href="http://wiki.wowubuntu.com/howto/install_google_apps" target="_blank">http://wiki.wowubuntu.com/howto/install_google_apps</a></p>
<p>编者按：</p>
<pre>
在update过程中会遇到如下提示
<div id="_mcePaste">W: 无法下载 http://dl.google.com/linux/deb/dists/stable/Release &nbsp;Unable to find expected entry &nbsp;non-free/source/Sources in Meta-index file (malformed Release file?)</div>
<div id="_mcePaste">E: 有一些索引文件不能下载，它们可能被忽略了，也可能转而使用了旧的索引文件。</div>
W: 无法下载 http://dl.google.com/linux/deb/dists/stable/Release &nbsp;Unable to find expected entry &nbsp;non-free/source/Sources in Meta-index file (malformed Release file?)
E: 有一些索引文件不能下载，它们可能被忽略了，也可能转而使用了旧的索引文件。
</pre>
<p>在ubuntu10.10下，软件中心的软件源把下载自：&ldquo;中国的服务器&rdquo;修改为&ldquo;主服务器&rdquo;即可</p>

---

[📚 返回目录](/needisme-mu-lu/)
