---
title: "Linux短信平台的搭建"
date: 2010-12-06 13:49:00
categories: NeedIsMe
tags: ["VPN", "API", "SSH", "LINUX", "Linux", "SQL"]
---

<p>来源:<a href="http://www.cnblogs.com/pipc/" target="_blank">贤钟的博客</a></p>
<p>前段时间为用户提供VPN 和SSH 服务，消息的都是通过电子邮件发送的。没有短信的快捷和实时性，决定搭建自己的短信平台。</p>
<p>在此之前我也用过其他服务商提供的短信平台，都有各种各样的问题。</p>
<p>其中短信平台存在的问题：</p>
<p>1、发送短信有时段限制，有些短信通道只能在 上午8点 到晚上8点发送，如果遇到夜间的紧急时间需要发送短信就无能为力了，比如服务器当机、MSSQL数据库日志满了、系统盘空间不足。 在Linux 下磁盘空间不足会照成MySQL启动失败。</p>
<p>2、通过通道发送短信限制十分严格，相对于个人手机，进行关键词屏蔽非常厉害，&nbsp; 比如   &ldquo;发票&rdquo;、&ldquo;还钱&rdquo;、&ldquo;你妈&rdquo;有些常用词都不能发。&nbsp;句子里包含关键词都发送失败，   &ldquo;我中午去打印手机话费发票&rdquo;、&ldquo;听说你妈住院了，现在身体好吗？&rdquo;， 通过个人手机限制的就不严格。</p>
<p>3、通道拥挤的情况，因为这些通道一般都是提供批量发送广告的， 一次发送1万条，10万条都很正常。 如果这个时候你发送短信，只能排在消息队列的最后。 通常延时20分钟到4小时。</p>
<p>4、通道设备故障，因为各种情况照成的消息队列内的短信丢失。 你调用API接口发送短信，短信状态时成功的，由于平台的故障照成短信没有发送成功，而且你得不到错误的状态，费用照扣。</p>
<p>5、扣量，各个短信平台情况不一样， 价格比较低的扣量比较严重， 比如你群发 10万条，&nbsp; 前 5000条100%发送，&nbsp; 5000 -1万条&nbsp; 发送 95%， 1万-2万条 发送 90%， 到10万条的时候55% 甚至更低。</p>
<p>发送短信一般有2种方法， 一种是通过短信通道发送， 还有就是自己购买设备发送短信。</p>
<p>申请单独的短信通道要求比较高，一般在10-30万费用，比较大型的公司才会申请，比如银行、证劵等， 发送的号码都是95555   ，96000等， 还有就是106557**** 这样的通道。&nbsp;申请的费用较少，一般几千元就可以申请到。 通道提供商业一般提供2种接口，   一种是API接口,通过API发送短信，比如http://www.pipc.net/sms/send.aspx?id=130130****&amp; amp; amp;msg=测试短信 ,还有一种数据库接口，你可以连接到数据库直接把消息插入相关的表中。</p>
<p>个人如果出于研究的目的，可以使用手机最为短信发送设备。 只要支持串口,AT指令就可以了。</p>
<p>首先要准备短信发送设备，为此测试过很多手机。&nbsp; MTK 台湾联发科技 芯片非常不稳定，经常发送几条短信以后就没有响应了，完全靠运气。</p>
<p>越是老手机越稳定，比如西门子的3508 系列，我在2000年时候买的西门子3508i 手机连接线是COM口的，发送短信非常稳定。</p>
<p>测试过的设备，来个合影。</p>
<p><img src="http://image.pipc.net//2010/07/11/1.gif" border="0" alt="" width="880" height="541" /></p>
<p>西门子3508的机器稳定性非常好，来张特写。</p>
<p><a href="http://image.pipc.net/2010/07/11/2.gif" target="_blank"><img src="http://image.pipc.net/2010/07/11/2.gif" border="0" alt="" width="259" height="522" /></a></p>
<p>后来因为3508的电池不行了，因为比较老买不到电池，充电器和数据线用的同一个接口不能同时使用， 以后可以改造一下，增加供电线路可以继续使用。</p>
<p>图中第2和3都是NOKIA的了， 安装好PC套件，虚拟串口为COM5,驱动不稳定有时候连接不上。</p>
<p>图中第4和5都是国产小品牌，一个是友利通 还有一个不清楚牌子，他们使用的都是MTK方案。&nbsp;USB转串口芯片是MT6227驱动，比较头痛的是   USB转换芯片不稳定经常发送成功几条短信以后就没有响应了，这个时候关闭串口，重新初始化串口连接也不行。   必须把USB数据线拔掉重新插才可以，一直没有好的解决方案。</p>
<p>接下来就是本文的主角GSM MODEM ，采用的是法国WAVECOM公司的工业级芯片。 来张特写</p>
<p><img src="http://image.pipc.net/2010/07/11/3.gif" border="0" alt="" width="635" height="337" /></p>
<p>这里使用的操作系统是CentOS 5.5 ,</p>
<p>查看USB设备&nbsp; cat /proc/bus/usb/devices</p>
<p>能够看到这样一项： USB-Serial Controller</p>
<p><img src="http://image.pipc.net/2010/07/11/4.gif" border="0" alt="" width="666" height="413" /></p>
<p>中间是USB鼠标 USB Optical Mouse<br />
下面是设备， USB转串口控制器</p>
<p><img src="http://image.pipc.net/2010/07/11/5.gif" border="0" alt="" width="316" height="35" /></p>
<p>我们通过lsusb命令查看USB设备</p>
<p>lspci工具可以显示所有PCI总线信息，并列出与它们相连的硬件设备。Lspci对于集成声卡和显卡的X86主板尤其有用，因为它可以识别使用在主板PCI电路中的确切芯片。</p>
<p>lsusb工具可提供USB总线和连接设备的同类信息。</p>
<p>[root@host dev]# lsusb<br />
Bus 004 Device 001: ID 0000:0000<br />
Bus 003 Device 004: ID 067b:2303 Prolific Technology, Inc. PL2303 Serial Port<br />
Bus 003 Device 001: ID 0000:0000<br />
Bus 003 Device 002: ID 192f:0616 Avago Technologies, Pte.<br />
Bus 001 Device 001: ID 0000:0000<br />
Bus 002 Device 001: ID 0000:0000<br />
Bus 005 Device 001: ID 0000:0000<br />
[root@host dev]#</p>
<p>这里用的 是PL2303&nbsp; 转换芯片，非常稳定。</p>
<p>我们在Windows里都是用超级终端访问COM接口， 在LINUX下怎么查看呢？</p>
<p>我们可以直接查看&nbsp;/dev 里设备， 一般ttyUSB 开头的， 我们可以用命令 ls /dev/tty* 查看。</p>
<p><img src="http://image.pipc.net/2010/07/11/6.gif" border="0" alt="" width="666" height="413" /></p>
<p>接下来就是测试连接到串口的连接是否正常， 输入minicom -s ，minicom 相当于windows里的超级终端， -s 参数是配置。</p>
<p><img src="http://image.pipc.net/2010/07/11/7.gif" border="0" alt="" width="666" height="413" /></p>
<p>这里选择 Serial Port setup,配置串口</p>
<p><img src="http://image.pipc.net/2010/07/11/8.gif" border="0" alt="" width="666" height="413" /></p>
<p>这里按A配置我们刚才查到的设备 ttyUSB0&nbsp; , 按E配置波特率为9600&nbsp;，波特率越小传输的信号越稳定。这里数据线很短就无所谓了。</p>
<p>配置好以后 我们可以输入minicom连接设备， 下面是连接成功的图， 输入at 设备可以响应OK, 输入 AT+IPR?指令 查询设备的波特率。</p>
<p><img src="http://image.pipc.net/2010/07/11/9.gif" border="0" alt="" width="666" height="413" /></p>
<p>端口配置好以后， 我们可以安装软件了。</p>
<p>这里我们安装&nbsp;gnokii，&nbsp; 下载 gnokii-0.6.29.tar.bz2 程序，</p>
<p>wget <a href="http://linuxfile.pipc.net/file/gnokii/gnokii-0.6.29.tar.bz2" target="_blank">http://linuxfile.pipc.net/file/gnokii/gnokii-0.6.29.tar.bz2</a></p>
<p>编译出现错误 ：&nbsp; configure: error: Your intltool is too old.&nbsp; You need intltool 0.35.0 or later.&nbsp;&nbsp; 需要安装高版本的，这里我们下载4.0版本的编译</p>
<p>wget &nbsp;<a href="http://linuxfile.pipc.net/file/gnokii/intltool-0.40.6.tar.gz" target="_blank">http://linuxfile.pipc.net/file/gnokii/intltool-0.40.6.tar.gz</a> 你也可以到官方下载&nbsp; <a href="http://ftp.acc.umu.se/pub/gnome/sources/intltool/0.40/" target="_blank">http://ftp.acc.umu.se/pub/gnome/sources/intltool/0.40/</a></p>
<p>tar zxvf intltool-0.40.6.tar.gz</p>
<p>然后编译intltool 成功以后，再次编译 gnokii&nbsp; 。</p>
<p>编译成功后， 在/ect 下建立&nbsp; gnokiirc 文件， 可以直接从</p>
<p>/usr/local/share/doc/gnokii/sample/gnokiirc&nbsp; 这个文件复制， 直接修改一下参数就可以了。</p>
<p>你也可以直接下载配置好的， 这里是我配置成功的配置文件&nbsp;<a href="http://linuxfile.pipc.net/file/gnokii/gnokiirc" target="_blank">http://linuxfile.pipc.net/file/gnokii/gnokiirc</a></p>
<p>修改部分文件</p>
<p>[global]<br />
port = /dev/ttyUSB0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; #这个很重要，端口设备一定要填写正确<br />
model = AT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; #这里是使用AT指令<br />
##同时需要注释掉mode = 6510&nbsp; #如果不是用诺基亚手机发送短信就把这个注释掉<br />
serial_baudrate = 9600&nbsp; #这个非常重要设备的波特率一定要设置正确<br />
use_locking = no&nbsp;&nbsp; ;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; #发送短信有程序控制， 不能同时发送。 这里写NO实解决其他问题</p>
<p>#### use_locking</p>
<p>通过指令发送短信：</p>
<p>echo &ldquo;短信内容&rdquo; | gnokii &ndash;sendsms 手机号码</p>
<p>echo -n &ldquo;老婆老婆我爱你，就像老鼠爱大米&rdquo; |/usr/local/bin/gnokii &ndash;sendsms 130130*****</p>
<p>一般 2-5秒发送一条短信比较合适，可以使用C语言的system函数可以调用gnokii的命令来实现短信收发删，C语言,PHP,JAVA&nbsp;进行二次开发比较容易。</p>
<p>作者:方贤钟&nbsp; 网站: <a href="http://www.pipc.net/" target="_blank">http://www.pipc.net/</a> E-mail: <a href="mailto:fangxianzhong@163.com" target="_blank">fangxianzhong@163.com</a></p>
<p><img src="http://image.pipc.net/2010/07/11/10.gif" border="0" alt="" width="889" height="667" /></p>
<p>这里我们还有图形界面的程序， 因为服务器没有开远程桌面， 直接用相机照的。</p>

---

[📚 返回目录](/needisme-mu-lu/)
