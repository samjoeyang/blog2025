---
title: "CM的Rom里OpenVPN设定指南――转自机锋网"
date: 2010-03-10 10:42:00
categories: NeedIsMe
tags: ["VPN", "DNS", "iPhone", "HTML", "Android", "PHP"]
---

<p>应该说N1的VPN是很烂的，特别对比iPhone的VPN。</p>
<p>N1下，包括目前所有的Android ROM,<br />
PPTP的VPN都不太灵光，官方ROM有时候不知道是superboot搞的还是怎么的，/etc/ppp/ip-up-vpn会没有了执行权，需要chmod<br />
755 /etc/ppp/ip-up-vpn后，VPN才能拨上，而且即使连上了，总是过一会儿就不通。</p>
<p>好在CM ROM里加上了OpenVPN的支持，不过配起来也不简单</p>
<p><a href="http://openvpn.net/index.php/open-source/documentation/howto.html">http://openvpn.net/index.php/open-source/documentation/howto.html</a><br />
这份HOWTO是教怎么架OpenVPN服务器的，这里不多说。要点是:<br />
a) 协议选tcp,<br />
b) 要push "redirect-gateway", 至于DNS一类的，push了也没用，下面会讲。</p>
<p>主要讲一下在手机上怎么设定:</p>
<p>1. 导入证书:<br />
前面的HOWTO有教怎么生成ca.crt, client.crt, client.key, 可以通过以下命令生成N1可以导入的P12格式<br />
openssl pkcs12 -export -in client.crt -inkey client.key -certfile<br />
ca.crt -out client.p12</p>
<p>把生成的client.p12拷到sdcard根目录下，在设置->位置和安全->从SD卡安装，导入client.p12, 按提示操作</p>
<p>2. 设定VPN连接<br />
这个相信大家知道在哪，要点是,<br />
a) 设置两个证书时都选刚才导入的那个<br />
b) 如果是OpenVPN服务器的一般配置，会有LZO压缩，要在菜单的高级设定里勾上，不然拨上了可能网也不通,<br />
c) 高级里选tcp协议</p>
<p>3. 如果成功拨通，可以试试ping 8.8.8.8 看通吗。可以在市场上安装一个VPN Widget这样就可以从桌面直接进VPN界面</p>
<p>4. 这时候国内的网站应该能上了，但是国外的一些网站还是上不了，原因为DNS被污染了，而目前android上的openvpn并没有支持相应的dns设置,<br />
所以只能在市场上安装一个GScript Lite, 里面建一个叫"Set DNS"的脚本，这么写<br />
setprop net.dns1 8.8.8.8<br />
setprop net.dns2 8.8.4.4</p>
<p>5. 每次拨通VPN后，运行"Set DNS"脚本，然后应该就能访问各类网站了。</p>
<p>写得比较简单，希望能帮到一些同好。</p>

---

[📚 返回目录](/needisme-mu-lu/)
