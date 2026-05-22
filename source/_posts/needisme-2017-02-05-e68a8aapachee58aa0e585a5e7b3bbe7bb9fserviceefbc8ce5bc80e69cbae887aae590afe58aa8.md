---
title: "把apache加入系统service，开机自启动"
date: 2017-02-05 11:28:52
categories: NeedIsMe
tags: ["Apache"]
---

<p class="p1">sudo cp /usr/local/httpd/bin/apachectl /etc/init.d/httpd</p>
<p class="p1">sudo</p>
<p class="p1">vi /etc/init.d/httpd</p>
<p class="p3">在文件开头加入下面几行：</p>
<p class="p1">#!/bin/sh</p>
<p class="p1"># chkconfig: 2345 85 15</p>
<p class="p1"># description: Apache is a World Wide Web server.</p>
<p class="p1">sudo chmod +x /etc/init.d/httpd</p>
<p class="p1">sudo /sbin/chkconfig --add httpd</p>
<p class="p1">sudo /sbin/chkconfig --list httpd</p>
<p class="p1">sudo ln -s /sbin/chkconfig /usr/bin/chkconfig</p>
<p class="p1">sudo ln -s /sbin/service /usr/bin/service</p>

---

[📚 返回目录](/needisme-mu-lu/)
