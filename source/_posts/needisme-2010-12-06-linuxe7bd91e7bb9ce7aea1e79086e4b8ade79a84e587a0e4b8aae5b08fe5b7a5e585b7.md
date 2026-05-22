---
title: "Linux网络管理中的几个小工具"
date: 2010-12-06 09:58:17
categories: NeedIsMe
tags: ["DNS", "LINUX", "Linux", "系统管理", ".NET"]
---

<div></div>
<p>发表: <a title="查看所有由 崔玉松 发布的文章" href="http://fendou.org/author/admin/" target="_blank">崔玉松</a></p>
<p>1、ifconfig<br />
提供基本的配置信息，在侦测错误IP地址、不正确的网络掩码和不适当的广播地址时，都很有用。</p>
<p>2、arp</p>
<p>提供Ethernet与IP地址的转换信息，它可以用不过来侦测网络上的IP地址配置错误的系统,Arp是Unix系统的一部分</p>
<p>3、netstat<br />
提供各式各样的网络信息，通常用来显示个网络接口，socket及路由表等统计信息。</p>
<p>4、ping<br />
做技术的地球人都知道的一个玩意，主要作用是指出IP包是否能够到达某台主机，同事也会显示分组包漏失与传送时间等统计信息</p>
<p>5、nslookup<br />
提供DNS域名服务的有关信息</p>
<p>6、dig<br />
也提供域名服务相关的信息，和nslookup类似的玩意</p>
<p>7、ripquery<br />
提供系统发送或者接受RIP更新分组包的内容。riquery是gated软件一部分，但你并非一定要执行gated，它可以在所有执行RIP的系统上操作。</p>
<p>8、tracerute<br />
告诉你到远程系统分组包使用哪一条路由，每一站的记录都会显示（理论上如此，实际上很多特殊应用的路由会关闭自己反馈信息，tracerute将跟踪不到，比如著名的万里长城）</p>
<p>9、snoop<br />
分析每一个网络上主机间彼此传送的分组包。soop是一种TCP/IP协议分析器，用来分析分组包内容包括其表头，这是分析协议问题时最有用的工具之一。</p>
<p>10、tcpdump<br />
功能和snoop类似，比前者提供更多的功能，以巨多的参数和强大的功能而闻名</p>

---

[📚 返回目录](/needisme-mu-lu/)
