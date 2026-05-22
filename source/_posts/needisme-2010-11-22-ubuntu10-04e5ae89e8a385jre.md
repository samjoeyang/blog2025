---
title: "UBUNTU10.04安装jre"
date: 2010-11-22 11:54:00
categories: NeedIsMe
tags: ["API", "Java", "Linux", "FTP", "Ubuntu", ".NET"]
---

<p><a href="http://felixcat.net/2010/04/install-sun-java6-jre-instead-of-openjdk-in-ubuntu-lucid/">http://felixcat.net/2010/04/install-sun-java6-jre-instead-of-openjdk-in-ubuntu-lucid/</a></p>
<p>Ubuntu Lucid 将 sun-java6-jre 系列包移出了源，java软件用 openjdk<br />
系列包提供支持。然而在某些软件（比如FreeRapid）的使用中，openjdk还是喜欢出一些莫名其妙的错误（比如栈溢出），因此考虑请回sun-<br />
java6-jre。</p>
<p>具体方法很简单，首先添加 Ubuntu Karmic 的multiverse源：</p>
<p>sudo gedit /etc/apt/sources.list</p>
<p>在底部添加</p>
<p>deb <a href="http://ftp.sjtu.edu.cn/ubuntu/">http://ftp.sjtu.edu.cn/ubuntu/</a> karmic multiverse</p>
<p>保存退出后</p>
<p>sudo apt-get update &amp;&amp; sudo apt-get install sun-java6-jre</p>
<p>完毕！</p>

---

[📚 返回目录](/needisme-mu-lu/)
