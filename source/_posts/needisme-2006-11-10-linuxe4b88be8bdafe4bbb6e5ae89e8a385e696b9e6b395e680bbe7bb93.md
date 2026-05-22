---
title: "Linux下软件安装方法总结"
date: 2006-11-10 14:14:19
categories: NeedIsMe
tags: ["LINUX", "Linux", "系统管理"]
---

<p>一、rpm包安装方式步骤：<br />
1、找到相应的软件包，比如soft.version.rpm，<a style="cursor: hand; color: #0000ff; background-color: transparent; text-decoration: underline;">下载</a>到本机某个目录；<br />
2、打开一个终端，su -成root用户；<br />
3、cd soft.version.rpm所在的目录；<br />
4、输入rpm -ivh soft.version.rpm</p>
<p>二、deb包安装方式步骤：<br />
1、找到相应的软件包，比如soft.version.deb，下载到本机某个目录；<br />
2、打开一个终端，su -成root用户；<br />
3、cd soft.version.deb所在的目录；<br />
4、输入dpkg -i soft.version.deb</p>
<p>三、tar.gz源代码包安装方式：<br />
1、找到相应的软件包，比如soft.tar.gz，下载到本机某个目录；<br />
2、打开一个终端，su -成root用户；<br />
3、cd soft.tar.gz所在的目录；<br />
4、tar -xzvf soft.tar.gz //一般会生成一个soft目录<br />
5、cd soft<br />
6、./configure<br />
7、make<br />
8、make install</p>
<p>四、tar.bz2源代码包安装方式：<br />
1、找到相应的软件包，比如soft.tar.bz2，下载到本机某个目录；<br />
2、打开一个终端，su -成root用户；<br />
3、cd soft.tar.bz2所在的目录；<br />
4、tar -xjvf soft.tar.bz2 //一般会生成一个soft目录<br />
5、cd soft<br />
6、./configure<br />
7、make<br />
8、make install</p>
<p>五、apt方式安装：<br />
1、打开一个终端，su -成root用户；<br />
2、apt-cache search soft 注：soft是你要找的软件的名称或相关信息<br />
3、如果2中找到了软件soft.version，则用apt-get install soft.version命令安装软件 注：只要你可以上网，只需要用apt-cache search查找软件，用apt-get install软件</p>
<p>六、bin文件安装：<br />
如果你下载到的软件名是soft.bin，一般情况下是个可执行文件，安装方法如下：<br />
1、打开一个终端，su -成root用户；<br />
2、chmod +x soft.bin<br />
3、./soft.bin //运行这个命令就可以安装软件了</p>
<p>--***********关于本文档********************************************<br />
*filename:Linux下软件安装方法总结<br />
*purpose:总结了Linux下各种软件安装方法<br />
*wrote by: zhoulifa(<a href="mailto:zhoulifa@163.com">zhoulifa@163.com</a>) 周立发(<a href="http://zhoulifa.bokee.com/">http://zhoulifa.bokee.com</a>)<br />
Linux爱好者 Linux知识传播者 SOHO族 开发者 最擅长C语言编程<br />
*date time:2006-07-26 18:10:00<br />
*Note: 任何人可以任意复制代码并运用这些文档，当然包括你的商业用途<br />
* 但请遵循GPL。<br />
*Hope:希望越来越多的人贡献自己的力量，为科学技术发展出力<br />
*********************************************************************/</p>
<p>七、不需要安装的软件：<br />
有了些软件，比如lumaqq，是不需要安装的，自带jre解压缩后可直接运行。假设下载的是lumaqq.tar.gz，使用方法如下：<br />
1、打开一个终端，su -成root用户；<br />
2、tar -xzvf lumaqq.tar.gz //这一步会生成一个叫LumaQQ的目录<br />
3、cd LumaQQ<br />
4、chmod +x lumaqq //设置lumaqq这个程序文件为可运行<br />
5、此时就可以运行lumaqq了，用命令./lumaqq即可，但每次运行要输入全路径或切换到刚才生成的LumaQQ目录里<br />
6、为了保证不设置路径就可以用，你可以在/bin目录下建立一个lumaqq的链接，用命令ln -s lumaqq /bin/ 即可，以后任何时候打开一个终端输入lumaqq就可以启动QQ聊天软件了<br />
7、如果你要想lumaqq有个菜单项，使用菜单编辑工具，比如Alacarte Menu Editor，找到上面生成的LumaQQ目录里的lumaqq设置一个菜单项就可以了，当然你也可以直接到/usr/share/applications目录，按照里面其它*.desktop文件的格式生成一个自己的desktop文件即可。</p>
<p>建议开发者们不要用red hat/red flag/suse等第一代Linux操作系统，用这些除了方便（也就是说比较傻瓜型）、界面豪华点外没什么好。用debian/ubuntu等第二代吧，apt命令安装软件是最简单的。apt命令会自动解决软件安装过程中的依赖问题，会把没有的包安装上，会把版本低的包自动升级，当然，都是要经你确认一次的。<br />
如果你使用Red Hat等第1代Linux系统，安装软件是比较麻烦的事，rpm -ivh softA.rpm是用来安装softA软件的，但通常情况下可能遇到的问题是提示说需要安装softB1, softB2, softB3等一堆软件，然后你安装softB1软件包时，可能又会提示你说需要安装softC1, softC2, softC3, softC4等一堆软件&hellip;&hellip;这样一来你就只够时间到处去找这些软件包了。光盘上没有就得去网上下载，网上还得<a style="cursor: hand; color: #0000ff; background-color: transparent; text-decoration: underline;">搜索</a>半天，时间都花在搜索软件包了。而且就算找到这些软件包，还可能会遇到的问题是：softC2软件包必须在softC1软件包之前安装才可以，顺序错了也安装不成功。但这谁知道呢？难啊。所以，你没有时间来安装体验软件的功能了，更别说开发软件了。<br />
建议你安装第2代Linux操作系统，典型的是Debian Linux和Ubuntu Linux，我之前在文章&ldquo;<a href="http://bbs.chinaunix.net/viewthread.php?tid=788150&amp;highlight=zhoulifa">如何在安装了Windows操作系统的电脑上安装Linux操作系统</a>&rdquo;里提到一个简明安装手册，你下载来照着操作就可以安装Ubuntu了。<br />
第2代操作系统在安装软件方面相当简单：第一步，搜索你要的软件，比如你要找一个游戏软件，它的名称叫myward，这个游戏软件的说明是：my own war game。搜索这个软件包就只需要输入命令apt-cache search myward，或者输入软件名称的一部分apt-cache search war，或者你不知道软件名称，输入软件说明里的一部分文字apt-cache search game，都可以找到这个软件，找到后进行第二步，只需要输入apt-get install myward，即后面跟上软件名称就可以安装了。<br />
我是做程序开发的，不希望自己只会google找东西，希望有更多的时间研究Linux内核。</p>

---

[📚 返回目录](/needisme-mu-lu/)
