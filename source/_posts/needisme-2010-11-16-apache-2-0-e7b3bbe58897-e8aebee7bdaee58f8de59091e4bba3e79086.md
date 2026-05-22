---
title: "apache 2.0 系列&nbsp;设置反向代理"
date: 2010-11-16 13:18:00
categories: NeedIsMe
tags: ["HTML", "Apache", "LINUX", "Linux", "系统管理"]
---

<p><a href="http://code.sh/linux/apache-2-0-reverse-proxy/">apache 2.0 系列 设置反向代理</a>: "</p>
<p>残念,居然用2.0 ,记录下</p>
<p>要增加俩module</p>
<p>切到</p>
<blockquote><p>源文件目录/module/proxy</p></blockquote>
<p>编译这几个模块(因为俺这情况默认安装需要另行编译)</p>
<pre><code>apxs -i -a -c mod_proxy.c proxy_util.c proxy_http.c</code></pre>
<p>改httpd.conf</p>
<pre><code>LoadModule proxy_module modules/mod_proxy.soLoadModule proxy_http_module  modules/proxy_http.so</code></pre>
<p>修改虚拟主机设置</p>
<pre><code><VirtualHost *:80>   DocumentRoot /data/htdocs/   ErrorLog logs/ooxx.me-error_log   CustomLog logs/ooxx.me-access_log common   DirectoryIndex index.shtml index.html   ServerName ooxx.me   ServerAlias code.sh

ProxyPass /qzonestyle !ProxyPass / http://172.25.32.72/</VirtualHost></code></pre>

---

[📚 返回目录](/needisme-mu-lu/)
