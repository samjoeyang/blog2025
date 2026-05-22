---
title: "在 Ubuntu 下使用中兴 ZTE AC581/AC580/AC560 接入中国电信 3G 网络"
date: 2011-01-12 09:32:56
categories: NeedIsMe
tags: ["Linux", "Google", "Ubuntu", "Windows", ".NET"]
---

<p>之前我出门上网用的一直是移动的 G3 加一块华为的上网卡，后来由于移动太恶心，就换了一块电信的上网卡，但一直是 Windows 系统，驱动之类的根本就不用操心。<br />
但是因为我主要用的笔记本是 17 寸的，每天背着那么沉的笔记本挤两个小时地铁，实在是有点儿让人受不了。<br />
于是我就买了一台华硕 EeePC 1215n ，这机器按理说已经不算是上网本了，毕竟 CPU 是桌面版的，还有 ION 芯片组和 ION 2 显卡。<br />
不过对我来说，这款东西性能再强也比不过我那台 17 寸的索尼，所以这台机器无论如何我也要装 Linux 。<br />
然而问题来了，电信中兴的这款 AC581 上网卡，虽然说明上支持 Linux ，但所有 Linux 用户都遇到了兼容问题。<br />
就连同一个模子不同网络制式的 AC580 和 AC560 也有这样的问题，甚至后来出的新款 AC590 也有这样的问题。<br />
幸好，人一多了，研究这个问题的人也就多了，经过我十几个小时的 google 与尝试，终于找出了最简单的解决方法。</p>
<p>   1. 先把网卡插上&hellip;&hellip;<br />
   2. 检查 usb-modeswitch 和 usb-modeswitch-data 这两个包是否已经安装完毕<br />
   3. 然后启动终端，在终端中输入</p>
<p>      lsusb</p>
<p>      这时应该可以看到类似于</p>
<p>      Bus 007 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub<br />
      Bus 006 Device 003: ID 19d2:0094 ONDA Communication S.p.A.<br />
      Bus 006 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub</p>
<p>      而其中</p>
<p>      Bus 006 Device 003: ID 19d2:0094 ONDA Communication S.p.A.</p>
<p>      就说明 Ubuntu 已经识别了设备，只是没能将其识别为 USB Modem<br />
   4. 这样我们就知道，供应商 id 是 19d2 ，产品 id 是 0094 ，然后在终端中输入</p>
<p>      sudo modprobe usbserial vendor=0x19d2 product=0&times;0094</p>
<p>      这时候网络链接应该出现了移动宽带这一新的可选想，并且自动生成了中国电信的接入点<br />
   5. 如果觉得每次重新插入无线网卡都需要执行一遍很麻烦，可以在终端中执行</p>
<p>      sudo gedit /etc/modules</p>
<p>      然后在最后加入</p>
<p>      usbserial vendor=0x19d2 product=0&times;0094</p>
<p>      保存即可<br />
   6. 然后打开网络设置，设置拨号号码为</p>
<p>      #777</p>
<p>      用户名为</p>
<p>      ctnet@mycdma.cn</p>
<p>      密码为</p>
<p>      vnet.mobi</p>
<p>   7. 这时选择接入中国电信网络即可</p>
<p>然后就大功告成了，这样拨号接入的是 CDMA 3G 网络，速度至少能达到 100kb/s 。</p>
<p>转自：<a href='http://ketech.me/1308/ubuntu-zte-ac581-ac580-ac560-3g-evdo/'>柯学技术</a></p>

---

[📚 返回目录](/needisme-mu-lu/)
