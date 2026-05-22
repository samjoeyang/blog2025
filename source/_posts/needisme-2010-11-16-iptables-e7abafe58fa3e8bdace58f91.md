---
title: "iptables&nbsp;端口转发"
date: 2010-11-16 12:43:00
categories: NeedIsMe
tags: ["LINUX", "Linux", "系统管理"]
---

<p><a href="http://code.sh/linux/iptables-%e7%ab%af%e5%8f%a3%e8%bd%ac%e5%8f%91/">iptables 端口转发</a>: "</p>
<p>Johnmy  10:03:02</p>
<p>把本机的8080端口转发到53端口规则怎么写啊？</p>
<p><code>-A PREROUTING -i eth1 -p tcp -m tcp -d 121.192.19.137 --dport 8080 -j DNAT --to-destination 192.168.0.20:80</code></p>

---

[📚 返回目录](/needisme-mu-lu/)
