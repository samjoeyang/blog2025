---
title: "HTC VISION 刷机大集合"
date: 2011-09-07 14:04:57
categories: NeedIsMe
tags: ["Windows", "Android"]
---

<p>今年4月手机由G1换成了T-Mobile G2（DESIRE Z/VISION）以后就不怎么刷机了，一是对Vision相当满意，二是这段时间正好是辞职找工作和在新工作单位熟悉工作自己的时间比较少，没有花太多的精力来研究新手机的刷机方法以及了解新资源。从今天开始我要逐步总结有关HTC VISION的刷机方法和各类资源，以便随时可以查阅，其他型号的手机也可以参考。主要的信息采集论坛是机锋网和安卓网，在此我先集体感谢那些为了刷机做过贡献的同仁们。如果有版权问题请及时使用评论告知我。</p>
<p>各类资源、方法、技巧会陆续推出，敬请期待。</p>
<blockquote><p><strong>1、固件、刷固件</strong></p>
<p>固件是指固化的软件，英文为firmware，它是把某个系统程序写入到特定的硬件系统中的flashROM。</p>
<p>手机固件相当于手机的系统，刷新固件就相当于刷系统。不同的手机对应不同的固件，在刷固件前应该充分了解当前固件和所刷固件的优点缺点和兼容性， 并做好充分的准备。</p>
<p><strong>2、ROM（包）</strong></p>
<p>智能手机配置中的ROM指的是EEProm(电擦除可写只读存储器)类似于计算机的硬盘，手机里能存多少东西就看他的容量了。底包+更新包统称为一个ROM包。</p>
<p><strong>3、固件版本</strong></p>
<p>固件版本是指官方发布的固件的版本号！里面包含了应用部分的更新和基带部分的更新，官方新固件的推出的主要目的是为了修复已往固件中存在的BUG以及优化相关性能。</p>
<p><strong>4、CID、SUPERCID</strong></p>
<p>CID是CustomerIDentity的简称,简单来说就是手机的平台版本，破解限制之后的CID称为SUPERCID。</p>
<p>刷机过程中SPL需要根据CID效验ROM是否可用，并决定是否刷入，一般情况下要求一定要对应CID的ROM才可以用，cid不同的rom是刷不 上去的。对于普通的CID来说，一般有两个限制：1）不能刷入低版本的的ROM，2）不能刷入不同平台的ROM，比如：在台版机上刷欧版ROM、跨型号刷 ROM等。SUPERCID有些型号手机的CID的限制是可以通过软件来破解的，已知的有577W、586W等，但也有也些型号目前还没有有效的方法破解 CID，如838G4。</p>
<p>破解限制之后的cid称为SUPERCID，拥有SUPERCID的机器可以刷任意版本和平台的ROM。具体来说，同一个手机既可以刷台湾的 ROM，也可以刷日本的rom，也可以刷香港的rom等。甚至也可以刷进一个其他型号手机的ROM(如586W刷577W)。但是这也带来很大的危险性， 因为没有了限制，没有了校验，刷入一个错误的ROM也是很容易的事。我们一般刷机时需要破解为SUPERCID,因为一方面现在大部分情况下刷机所用的 ROM都是通不过CID校验的；另一方面万一刷机失败，对于SuperCID的手机更容易修复。</p>
<p><strong>5、HTC Sense</strong></p>
<p>HTC为<a href="http://android.sj.91.com/" target="_blank">Android</a>系统设计的用户界面。从HTC Hero开始，HTC推出的所有产品都將整合HTC Sense。并符合三個设计理念，包括Make It Mine、Stay Close、与Discover the Unexpected。</p>
<p><strong>6、Recovery</strong></p>
<p>笼统的说，就是一个刷机的工程界面。如果你装过系统，你可能知道dos界面或者winPE，安装了Recovery相当于给系统安了一个dos界 面。在recovery界面可以选择安装系统，清空数据，ghost备份系统，恢复系统等等。刷recovery与刷rom不冲突。</p>
<p><strong>7、APP TO SD、APP2SD</strong></p>
<p>一些Android机器在安装程序的时候默认是安装在机器内存上的，这就会导致原本不大的内存被占用，运行速度降低，而存储卡却利用率很低的情况。APP TO SD就是把程序安装到SD卡从而腾出手机内存提高运行速度的意思。APP2SD亦然，只是谐音而已。</p>
<p><strong>8、Root</strong></p>
<p>Root权限跟我们在Windows系统下的Administrator权限可以理解成一个概念 。Root是Android系统中的超级管理员用户帐户,该帐户拥有整个系统至高无上的权利,所有对象他都可以操作。只有拥有了这个权限我们才可以将原版 系统刷新为改版的各种系统，比如简体中文系统。</p>
<p><strong>9、RADIO</strong></p>
<p>Radio简单的说是无线通信模块的驱动程序。ROM是系统程序，Radio负责网络通信，ROM和Radio可以分开刷，互不影响。如果你的手机刷新了ROM后有通讯方面的问题可以刷新RADIO试一试。</p>
<p><strong>10、ROM分类</strong></p>
<p>一般分为两大类，一种是出自手机制造商官方的原版ROM，特点是稳定，功能上随厂商定制而各有不同；另一种是开发爱好者利用官方发布的源代码自主编译的原生ROM，特点是根据用户具体需求进行调整，使ROM更符合不同地区用户的使用习惯。</p>
<p><strong>11、IPL、SPL</strong></p>
<p>IPL英文全称是InitialProgramLoader,负责主板，电源、硬件初始化程序、并把SPL装入RAM。IPL损坏了可把手机扔进河里,或者通过换字库来解决。</p>
<p>SPL英文全称是SecondProgramLoader,&ldquo;第二次装系统&rdquo;，就是负责装载OS操作系统到RAM中。另外SPL还包括许多系统命令，如mtty中使用的命令等。SPL损坏了还可以用烧录器重写。</p>
<p>SPL一般提供这几部分功能：检测手机硬件、寻找系统启动分区、启动操作系统为系统的基本维护提供操作界面，可以通过数据线与操作终端（如PC）建 立连接，并接受和执行相应命令。它里面包含许多命令，像r2sd,l,doctest(危险命令，他会擦除gsmdata)等。我们常说的三色屏就是由 SPL驱动的。检测SD卡，当你把一些特殊制作的SD卡插入后，SPL可以在启动时校验并根据SD卡内容刷机或执行一些命令。这有点类似于PC的从软驱启 动。</p>
<p>IPL和SPL版本可以在三色屏中查看。按住照相键不放，然后短按电源开机键即可进入三色屏查看相关信息。</p>
<p><strong>12、Sign</strong></p>
<p>Sign是指给Rom包或者Apk应用程序签名，只有签名过的Rom或者Apk才可以刷入或安装到手机上。</p>
<p><strong>13、Cyanogen、CM</strong></p>
<p>Cyanogen是国外一位牛人，其制作的CyanogenMod系列Rom比较流行，主要追求的就是速度，CyanogenMod的缩写就是CM，因而我们也常见CM ROM。</p>
<p><strong>14、adb</strong></p>
<p>adb是Android Debug Bridge的缩写，意为Android系统的调试桥。通过adb我们可以在Eclipse中方面通过DDMS来调试Android程序，其实这就是用于谷歌Android系统的debug调试工具。</p>
<p>adb的工作方式比较特殊，采用监听Socket TCP 5554等端口的方式让IDE和Qemu通讯，默认情况下adb会daemon相关的网络端口，所以当我们运行APK安装器时adb进程就会自动运行。</p>
<p>除了上述的操作功能之外，我们还可以通过adb管理设备或手机模拟器的状态。还可以进行很多手机操作，比如刷ROM系统升级、运行shell命令等等。</p></blockquote>
<p>在手机拨号界面输入*#*#4636#*#*即可快速进入Android的工程测试模式，在菜单中有手机信息、电池信息、电池历史记录、使用情况统计数据四个选项（各不同版本的ROM可能在表述上存在差异），对每个选项里面请确认后再更改。</p>
<p>关于恢复模式很早以前就有篇文章介绍过了，请看这里<a title="【刷机模式介绍】Android Recovery模式！！" href="../?p=100">《【刷机模式介绍】Android Recovery模式！！》</a>；VISION的进入恢复模式的方法是&ldquo;电源+音量-&rdquo;两个组合键进入HBOOT模式，然后用&ldquo;音量-&rdquo;移动光标提示到&ldquo;Recovery&rdquo;再按&ldquo;电源&rdquo;键确认，进入（进入官方recovery方法按照前面的操作，然后看到红色三角形感叹号后按&ldquo;音量+&rdquo;和&ldquo;开机键&rdquo;），G1的方法是&ldquo;电源+menu+home&rdquo;三个组合键，进入Recovery后请按照提示操作。</p>
<p>刷recovery的方法：<br />
把下载下来的ZIP文件改名为PC10IMG.ZIP放入SD卡根目录<br />
手机重启进入Bootlaoder会提示更新按音量向上键选择YES即可</p>
<p>Radio是掌管着通讯功能包括手机上网,如果信号不好或者在没有信号情况下手机频繁重启可以尝试刷一下Radio。刷RADIO有一定风险的，如果信号没有问题请不要随意更新RADIO，刷Radio时请保持持续电源供应切勿断电，否则有变砖的风险。</p>
<p>之前已经发过一篇<a title="Android RIL结构分析与移植" href="../?p=1271">《Android RIL结构分析与移植》</a>，作为知识性了解。</p>

---

[📚 返回目录](/needisme-mu-lu/)
