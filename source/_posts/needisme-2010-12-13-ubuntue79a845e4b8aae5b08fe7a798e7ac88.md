---
title: "Ubuntu的5个小秘笈"
date: 2010-12-13 11:50:00
categories: NeedIsMe
tags: ["Ubuntu", "LINUX", "Linux", "系统管理"]
---

<p>Ubuntu一直被认为是最适合初学者的Linux操作系统，但也不是仅仅适合初学者的，同样也非常适合各个水平层次的用户。网上一些技巧都是针对初级用户的，这篇文章将介绍几个适用于高级用户的操作技巧。这几个技巧会涉及到不同的范围和专业知识水平，但都将会提升你的Ubuntu用户体验。<br />
<strong>1、减少启动时间</strong></p>
<p>从Ubuntu6.04开始就可以通过使用工具来配置Ubuntu的启动过程以便系统启动的更加合理。在Ubuntu10.04中，这个工具的速度更快了，可以将启动控制在非常短的时间里，想要是Ubuntu启动的更快，只需要编辑/etc/default/grub这个文件，找到这行：</p>
<blockquote><p>GRUB_CMDLINE_LINUX_DEFAULT=&rdquo;quiet splash&rdquo;</p></blockquote>
<p>修改为：</p>
<blockquote><p>GRUB_CMDLINE_LINUX_DEFAULT=&rdquo;quiet splash profile&rdquo;</p></blockquote>
<p>保存退出后，运行命令：sudo update-grub2</p>
<p>之后重启系统，由于要运行配置系统，启动的速度会稍慢，启动之后，再次编辑/etc/default/grub这个文件，再将刚才加入的profile去掉，改回原来的值：</p>
<blockquote><p>GRUB_CMDLINE_LINUX_DEFAULT=&rdquo;quiet splash&rdquo;</p></blockquote>
<p>保存后再运行一次sudo update-grub2</p>
<p>然后就会发现系统的启动速度会有很大的提升。</p>
<p><strong>2、使用快捷键启动程序</strong></p>
<p>将更多的操作用键盘完成是一个高效率的程序员的必要素质。要怎么实现尽可能的高效呢，必然要使用到快捷键。在Ubuntu的Gnome桌面上，需要使用gconf-editor这个程序，启动这个软件，点击apps -> metacity -> global_keybindings，就可以定义12个快捷键来启动常用程序或者命令。</p>
<p>这里还推荐另外一个软件GNOME Do，它能根据用户键入的内容进行自动匹配，从而快速打开系统中已有的程序、文件、书签等。不仅如此，GNOME Do 还包括插件，从而能够做更多事。我会另外写一篇介绍此软件的文章。</p>
<p><strong>3、离线升级系统</strong></p>
<p>可以借助APTonCD这个程序通过一台能访问网络的计算机制作一张升级CD，就可以升级其它的Ubuntu系统了。APTonCD会将所有需要升级的文件制作成一张CD/DVD，在别的计算机中通过dpkg命令升级各自的系统，APTonCD包括一个图形界面可以很容易地制作升级CD/DVD。</p>
<p><strong>4、加速菜单项弹出速度</strong></p>
<p>当点击Ubuntu系统中的菜单弹出选项时，都会有一个延迟毫秒级时间，可以通过设置这个延迟时间来加速菜单的弹出速度。编辑~/.gtkrc-2.0这个文件，在最后加入这行：</p>
<blockquote><p>gtk-menu-popup-delay = 0</p></blockquote>
<p>保存后，注销系统，重新登录之后，菜单项的弹出速度就会相当的快了。</p>
<p><strong>5、建立文件管理器右键操作</strong></p>
<p>在Ubuntu桌面操作中，点击右键之后可以选择相应的操作是一项非常方便的功能。在默认的文件管理器(Nautilus)中也可以把各种操作添加在右键菜单中，添加操作需要借助Nautilus Actions Configuration Tool，可以在System -> Preferences -> Nautilus Actions Configuration启动这个程序，需要添加五项设置，分别是Action, Command, Folders, Conditions, 和Advanced Conditions，还可以导入别人创建的一些操作。如果要用Thunderbird将文件作为附件发送邮件，就可以在Command页中输入：</p>
<blockquote><p>Path: /usr/bin/thunderbird</p>
<p>Parameters: -compose &lsquo;attachment=file://%f&rsquo;</p></blockquote>
<p>确定之后，重启nautilus，killall nautilus</p>
<p>然后就可以用右键调用Thunderbird直接发送文件了。</p>
<p>如果系统中没有安装Nautilus Actions Configuration Tool，可以用下面的命令安装：</p>
<blockquote><p>sudo apt-get install nautilus-actions</p></blockquote>
<p>本文参考：http://lveyo.info/5-ubuntu-power-tips.html</p>
<blockquote>
<div>本文所处位置：<a href="http://www.linuxhobby.com/">Linux爱好者</a> &raquo; <a title="Ubuntu的5个小秘笈" rel="bookmark" href="http://www.linuxhobby.com/ubuntu-tips-5/">《Ubuntu的5个小秘笈》</a></div>
<div>文章地址：<a title="Ubuntu的5个小秘笈" rel="bookmark" href="http://www.linuxhobby.com/ubuntu-tips-5/">http://www.linuxhobby.com/ubuntu-tips-5/</a></div>
<div>网站RSS订阅：<a title="Linux爱好者" href="http://feed.feedsky.com/linuxhobby/">http://feed.feedsky.com/linuxhobby/</a></div>
</blockquote>

---

[📚 返回目录](/needisme-mu-lu/)
