---
title: "转：GAE ip的HTTPS访问被墙解决方法"
date: 2010-06-12 22:10:00
categories: NeedIsMe
tags: ["Network Security", "网络安全"]
---

<p>目前部分GAE ip的HTTPS访问被墙，解决方法有两个：<br />
1. 修改app.yaml，把所有secure: always的行删掉，然后用HTTP访问（不推荐，如果传送内容有<br />
敏感词很有可能被封）<br />
2. 到 <a href="http://just-ping.com/">http://just-ping.com/</a> ping程序的域名，然后选一个ip在浏览器用https访问，例如<br />
<a href="https://xxx.xxx.xxx.xxx">https://xxx.xxx.xxx.xxx</a>，如果出现证书错误就代表该ip可以用，把域名和这个ip加到HOSTS就<br />
可以了。</p>

---

[📚 返回目录](/needisme-mu-lu/)
