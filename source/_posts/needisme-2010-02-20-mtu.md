---
title: "MTU"
date: 2010-02-20 09:45:00
categories: NeedIsMe
tags: ["Mac", "互联网", "Internet", "Windows", ".NET"]
---

<p>MTU，即Maximum Transmission<br />
Unit(最大传输单元)，此值设定TCP/IP协议传输数据报时的最大传输单元。设置合适的MTU值可以解决"部分网站打不开"、"上网速度慢"等问题，并且可以适当提升上网速度。<br />
设置多大的MTU值取决于你的上网方式，不同的上网方式支持不同的MTU，下面列出了一些上网方式的MTU值：<br />
EtherNet(一般上网方式，默认值):1500<br />
PPPoE/ADSL:1492<br />
Dial Up/Modem:576</p>
<p>问题一：知道了我的上网方式，如何设置MTU值？<br />
1. 在 『开始』>『运行』中，键入regedit，点确定；<br />
2. 选择『HKEY_Local_Machine』>『SYSTEM』>『CurrentControlSet』><br />
『Services』>『Tcpip』>『Parameters』>『interface』；<br />
3. 在 interface 底下可能有很多的选项，你一个一个的去看，会有一个选项与你的网卡的 IP<br />
相同，那个就是你要挑选的选项啦！然后同样的在该选项上选择『编辑』>『新建』>『DWORD值』之后，建立一个名为『MTU』的<br />
DWORD，然后双击修改，选择十进制，填入合适 MTU 值，确定！大功告成！</p>
<p>问题二：我不知道自己的上网方式，如何确定MTU值呢？<br />
ping -f -l 1500 127.0.0.1</p>
<p>C:\WINDOWS>ping -f -l 1500 127.0.0.1<br />
Pinging 127.0.0.1 with 1500 bytes of data:<br />
Packet needs to be fragmented but DF set.<br />
Packet needs to be fragmented but DF set.<br />
Packet needs to be fragmented but DF set.<br />
Packet needs to be fragmented but DF set.<br />
Ping statistics for <a href="http://127.0.0.1">127.0.0.1</a>:<br />
Packets: Sent = 4, Received = 0, Lost = 4 (100% loss), Approximate<br />
round trip times in milli-seconds:<br />
Minimum = 0ms, Maximum = 0ms, Average = 0ms</p>
<p>上面的式子中，-l 是 L 的小写（不是 1 喔），1500 是我们要测的 MTU 值，结果出现了 Packet needs to be<br />
fragmented but DF set. 这个东西，那表示MTU值太大了，你需要更小的 MTU 值才行！好啦！那假设我们使用 1464<br />
来测试时：</p>
<p>C:\WINDOWS>ping -f -l 1464 127.0.0.1<br />
Pinging 127.0.0.1 with 1464 bytes of data:<br />
Reply from <a href="http://127.0.0.1">127.0.0.1</a>: bytes=1464 time=10ms TTL=128<br />
Reply from <a href="http://127.0.0.1">127.0.0.1</a>: bytes=1464 time<10ms TTL=128<br />
Reply from <a href="http://127.0.0.1">127.0.0.1</a>: bytes=1464 time<10ms TTL=128<br />
Reply from <a href="http://127.0.0.1">127.0.0.1</a>: bytes=1464 time<10ms TTL=128<br />
Ping statistics for <a href="http://127.0.0.1">127.0.0.1</a>:<br />
Packets: Sent = 4, Received = 4, Lost = 0 (0% loss), Approximate round<br />
trip times in milli-seconds:<br />
Minimum = 0ms, Maximum = 10ms, Average = 2ms<br />
结果出现了回应了！这表示这一个 MTU 值是可行的！不过，强烈建议找出可行的最大 MTU 值！这样一来，在设定的时候，才可以达到最佳的网速！</p>
<p>找出 MTU 值：利用上面这个方法找到的数值还不是 MTU 喔！由于一些封包上面的问题，上面这个值再加上 28 才是我们所需要的 MTU<br />
值！所以，在上面的例子中，我们所需要的 MTU 值是 1464+28=1492！</p>
<p>一般来讲，设计好本机的MTU值，可以解决部分网站打不开的情况，但是如果你的共享主机或路由器的MTU设置有问题，有时问题仍然存或，或者出现网速过慢的情况。合理的设置路由器与本机的MTU值，就可以完全解决上述问题，使上网速度达到最大化。</p>

---

[📚 返回目录](/needisme-mu-lu/)
