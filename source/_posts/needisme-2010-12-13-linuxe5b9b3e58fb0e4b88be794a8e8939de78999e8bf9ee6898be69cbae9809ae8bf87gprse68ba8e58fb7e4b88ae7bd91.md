---
title: "Linux平台下用蓝牙连手机通过GPRS拨号上网"
date: 2010-12-13 11:44:00
categories: NeedIsMe
tags: ["Mac", "DNS", "LINUX", "Linux", "系统管理", ".NET"]
---

<p>现在的智能手机一般都有&ldquo;猫&rdquo;的功能。因此可以把你的手机当做一个无线猫来用。如果你的手机开通了GPRS 流量包月，那么你拨号上网的流量也是算在这个里面的，Linux爱好者目前用的套餐是每月50M/8元。虽然现在在如火如荼推广3G的时候，来谈蜗牛般的拨号上网有些过时、落伍，但是从Linux应用技术研究角度来说，本文还是很有价值的。</p>
<div style="text-align: center;"><a href="http://www.linuxhobby.com/linux-bluetooth-connection-dial-up-phone-gprs"><img title="Linux连接蓝牙通过GPRS拨号上网" src="http://pic.yupoo.com/linuxhobby/AGJKBAe3/LI34o.jpg" alt="Linux连接Bluetooth通过GPRS拨号上网" width="436" height="311" /></a><a href="http://pic.yupoo.com/linuxhobby/AGJKBAe3/LI34o.jpg"></a></div>
<p>环境：Linux爱好者是通过USB蓝牙连接手机，然后利用PPPoe拨号，手机是Blackberry 8700，操作系统是Debian。接好USB蓝牙接收器后，Debian系统能自动识别，如果你的系统安装时，没有太精简，一般是可以直接被支持的。</p>
<p>首先，需要在Debian里面安装bluez-utils和ppp软件。</p>
<p>启动蓝牙服务：</p>
<blockquote><p>/etc/init.d/buletooth</p></blockquote>
<p>查找蓝牙设备：</p>
<blockquote><p>hciconfig</p></blockquote>
<p>打开手机的蓝牙，然后在电脑上执行hcitool命令，搜索你的手机，看看手机的蓝牙的MAC地址是多少。然后记下这个地址。</p>
<blockquote><p>hcitool scan</p></blockquote>
<p>将上面搜索到的MAC地址配置到 /etc/bluetooth/rfcomm.conf 文件里面，重启电脑的蓝牙服务。</p>
<p>然后是配置PPP拨号。</p>
<p>在 /etc/ppp/peers 里面建立文件gprs，内容如下：</p>
<blockquote><p>/dev/rfcomm0 115200</p>
<p>connect &lsquo;/usr/sbin/chat -v -f /etc/ppp/peers/chat-gprs&rsquo;</p>
<p>crtscts</p>
<p>modem -detach</p>
<p>noccp</p>
<p>defaultroute</p>
<p>usepeerdns</p>
<p>noauth</p>
<p>ipcp-accept-remote</p>
<p>ipcp-accept-local</p>
<p>noipdefault</p></blockquote>
<p>建立 /etc/ppp/peers/chat-gprs 文件，内容如下：</p>
<blockquote><p>&rdquo; ATZ OK</p>
<p>AT+CGDCONT=1,&rdquo;IP&rdquo;,&rdquo;cmnet&rdquo;</p>
<p>OK &ldquo;ATD*99***1#&rdquo;</p>
<p>CONNECT &rdquo;</p></blockquote>
<p>建立好以后，执行:<strong>pon gprs</strong> 就能连上网络了。</p>
<p>另外，对此文有兴趣的朋友可以查看<a title="Linux系统中蓝牙技术的应用" href="http://www.howtoforge.com/linux_internet_access_gprs_edge_via_bluetooth_gsm_phone">《Linux GPRS/EDGE via Bluetooth HOWTO》</a>一文，以便做更进一步研究。</p>
<blockquote>
<div>本文所处位置：<a href="http://www.linuxhobby.com/">Linux爱好者</a> &raquo; <a title="Linux平台下用蓝牙连手机通过GPRS拨号上网" rel="bookmark" href="http://www.linuxhobby.com/linux-bluetooth-connection-dial-up-phone-gprs/">《Linux平台下用蓝牙连手机通过GPRS拨号上网》</a></div>
<div>文章地址：<a title="Linux平台下用蓝牙连手机通过GPRS拨号上网" rel="bookmark" href="http://www.linuxhobby.com/linux-bluetooth-connection-dial-up-phone-gprs/">http://www.linuxhobby.com/linux-bluetooth-connection-dial-up-phone-gprs/</a></div>
<div>网站RSS订阅：<a title="Linux爱好者" href="http://feed.feedsky.com/linuxhobby/">http://feed.feedsky.com/linuxhobby/</a></div>
</blockquote>

---

[📚 返回目录](/needisme-mu-lu/)
