---
title: "Linux netstat命令详解"
date: 2010-12-13 11:47:00
categories: NeedIsMe
tags: ["LINUX", "Linux", "系统管理", ".NET", "Shell"]
---

<p>netstat命令的功能是显示网络连接、路由表和网络接口信息，可以让用户得知目前都有哪些网络连接正在运作。</p>
<p>该命令的一般格式为：</p>
<p>netstat [选项]</p>
<p>命令中各选项的含义如下：</p>
<p>-a 显示所有socket，包括正在监听的。</p>
<p>-c 每隔1秒就重新显示一遍，直到用户中断它。</p>
<p>-i 显示所有网络接口的信息，格式同&ldquo;ifconfig -e&rdquo;。</p>
<p>-n 以网络IP地址代替名称，显示出网络连接情形。</p>
<p>-r 显示核心路由表，格式同&ldquo;route -e&rdquo;。</p>
<p>-t 显示TCP协议的连接情况。</p>
<p>-u 显示UDP协议的连接情况。</p>
<p>-v 显示正在进行的工作。</p>
<p>[例]在本地机上使用netstat命令。</p>
<p>$ netstat</p>
<p>Active Internet connections （w/o servers）</p>
<p>Proto Recv-Q Send-Q Local Address Foreign Address State</p>
<p>Active UNIX domain sockets （w/o servers）</p>
<p>Proto RefCnt Flags Type State I-Node Path</p>
<p>unix 1 [ ] STREAM CONNECTED 270 @00000008</p>
<p>unix 1 [ ] STREAM CONNECTED 150 @00000002</p>
<p>unix 1 [ ] STREAM CONNECTED 104 @00000001</p>
<p>unix 1 [ ] STREAM CONNECTED 222 @00000004</p>
<p>unix 1 [ ] STREAM CONNECTED 171 @00000003</p>
<p>unix 1 [ ] STREAM CONNECTED 271 /dev/log</p>
<p>unix 1 [ ] STREAM CONNECTED 225 /dev/log</p>
<p>unix 1 [ ] STREAM CONNECTED 223 /dev/log</p>
<p>unix 1 [ ] STREAM CONNECTED 203 /dev/log</p>
<p>unix 1 [ ] STREAM CONNECTED 105 /dev/log</p>
<p>&hellip;&hellip;</p>
<p>■ nslookup命令</p>
<p>nslookup命令的功能是查询一台机器的IP地址和其对应的域名。它通常需要一台域名服务器来提供域名服务。如果用户已经设置好域名服务器，就可以用这个命令查看不同主机的IP地址对应的域名。</p>
<p>该命令的一般格式为：</p>
<p>nslookup [IP地址/域名]</p>
<p>[例]在本地机上使用nslookup命令。</p>
<p>$ nslookup</p>
<p>Default Server: name.tlc.com.cn</p>
<p>Address: 192.168.1.99</p>
<p>></p>
<p>在符号&ldquo;>&rdquo;后面输入要查询的IP地址或域名并回车即可。如果要退出该命令，输入exit并回车即可。</p>
<p>■ finger命令</p>
<p>finger命令的功能是查询用户的信息，通常会显示系统中某个用户的用户名、主目录、停滞时间、登录时间、登录shell等信息。如果要查询远程机上的用户信息，需要在用户名后面接&ldquo;@主机名&rdquo;，采用[用户名@主机名]的格式，不过要查询的网络主机需要运行finger守护进程。</p>
<p>该命令的一般格式为：</p>
<p>finger [选项] [使用者] [用户@主机]</p>
<p>命令中各选项的含义如下：</p>
<p>-s 显示用户的注册名、实际姓名、终端名称、写状态、停滞时间、登录时间等信息。</p>
<p>-l 除了用-s选项显示的信息外，还显示用户主目录、登录shell、邮件状态等信息，以及用户主目录下的.plan、.project和.forward文件的内容。</p>
<p>-p 除了不显示.plan文件和.project文件以外，与-l选项相同。</p>
<p>[例]在本地机上使用finger命令。</p>
<p>$ finger xxq</p>
<p>Login: xxq Name:</p>
<p>Directory: /home/xxq Shell: /bin/bash</p>
<p>Last login Thu Jan 1 21:43 （CST） on tty1</p>
<p>No mail.</p>
<p>No Plan.</p>
<p>$ finger</p>
<p>Login Name Tty Idle Login Time Office Office Phone</p>
<p>root root *1 28 Nov 25 09:17</p>
<p>&hellip;&hellip;</p>
<p>■ ping命令</p>
<p>ping命令用于查看网络上的主机是否在工作，它向该主机发送ICMP ECHO_REQUEST包。有时我们想从网络上的某台主机上下载文件，可是又不知道那台主机是否开着，就需要使用ping命令查看。</p>
<p>该命令的一般格式为：</p>
<p>ping [选项] 主机名/IP地址</p>
<p>命令中各选项的含义如下：</p>
<p>-c 数目 在发送指定数目的包后停止。</p>
<p>-d 设定SO_DEBUG的选项。</p>
<p>-f 大量且快速地送网络封包给一台机器，看它的回应。</p>
<p>-I 秒数 设定间隔几秒送一个网络封包给一台机器，预设值是一秒送一次。</p>
<p>-l 次数 在指定次数内，以最快的方式送封包数据到指定机器（只有超级用户可以使用此选项）。</p>
<p>-q 不显示任何传送封包的信息，只显示最后的结果。</p>
<p>-r 不经由网关而直接送封包到一台机器，通常是查看本机的网络接口是否有问题。</p>
<p>-s 字节数 指定发送的数据字节数，预设值是56，加上8字节的ICMP头，一共是64ICMP数据字节。</p>
<blockquote>
<div>本文所处位置：<a href="http://www.linuxhobby.com/">Linux爱好者</a> &raquo; <a title="Linux netstat命令详解" rel="bookmark" href="http://www.linuxhobby.com/linux-command-netstat/">《Linux netstat命令详解》</a></div>
<div>文章地址：<a title="Linux netstat命令详解" rel="bookmark" href="http://www.linuxhobby.com/linux-command-netstat/">http://www.linuxhobby.com/linux-command-netstat/</a></div>
<div>网站RSS订阅：<a title="Linux爱好者" href="http://feed.feedsky.com/linuxhobby/">http://feed.feedsky.com/linuxhobby/</a></div>
</blockquote>

---

[📚 返回目录](/needisme-mu-lu/)
