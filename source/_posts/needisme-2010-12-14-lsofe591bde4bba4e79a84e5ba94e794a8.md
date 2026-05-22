---
title: "lsof命令的应用"
date: 2010-12-14 11:24:00
categories: NeedIsMe
tags: ["Bash", "LINUX", "Linux", "系统管理", ".NET"]
---

<p>lsof，全称为：list open  files。是一个列出当前系统打开文件的工具。在linux环境下，任何事物都以文件的形式存在，通过文件不仅仅可以访问常规数据，还可以访问网络连接 和硬件。所以如传输控制协议 (TCP) 和用户数据报协议 (UDP)  套接字等，系统在后台都为该应用程序分配了一个文件描述符，无论这个文件的本质如何，该文件描述符为应用程序与基础操作系统之间的交互提供了通用接口。因 为应用程序打开文件的描述符列表提供了大量关于这个应用程序本身的信息，因此通过lsof工具能够查看这个列表对系统监测以及排错将是很有帮助的。<br /><b>lsof命令的常用参数列表：</b></p>
<blockquote><p>lsof  filename 显示打开指定文件的所有进程</p>
<p>lsof -a 表示两个参数都必须满足时才显示结果</p>
<p>lsof -c string   显示COMMAND列中包含指定字符的进程所有打开的文件</p>
<p>lsof -u username  显示所属user进程打开的文件</p>
<p>lsof -g gid 显示归属gid的进程情况</p>
<p>lsof +d /DIR/ 显示目录下被进程打开的文件</p>
<p>lsof +D /DIR/ 同上，但是会搜索目录下的所有目录，时间相对较长</p>
<p>lsof -d FD 显示指定文件描述符的进程</p>
<p>lsof -n 不将IP转换为hostname，缺省是不加上-n参数</p>
<p>lsof -i 用以显示符合条件的进程情况</p>
<p>lsof -i[46] [protocol][@hostname|hostaddr][:service|port]</p>
<p>46 &ndash;> IPv4 or IPv6</p>
<p>protocol &ndash;> TCP or UDP</p>
<p>hostname &ndash;> Internet host name</p>
<p>hostaddr &ndash;> IPv4地址</p>
<p>service &ndash;> /etc/service中的 service name (可以不只一个)</p>
<p>port &ndash;> 端口号 (可以不只一个)</p></blockquote>
<p><b></p>
<p>应用举例：</b></p>
<p>如果你在卸载一个分区的时候，会出现以下信息内容：</p>
<blockquote><p># umount /media/usbdisk/</p>
<p>umount: /media/usbdisk: device is busy</p></blockquote>
<p>可以使用lsof命令可以找出是哪个程序正在使用这哪些文件：</p>
<blockquote><p># lsof /media/usbdisk/</p>
<p>COMMAND  PID USER  FD TYPE DEVICE SIZE NODE NAME</p>
<p>bash    6925 root cwd  DIR   8,17 4096    1 /media/usbdisk/</p>
<p>xmms    6979 root cwd  DIR   8,17 4096    1 /media/usbdisk/</p></blockquote>
<p>为了获取更多的信息可以直接使用设备名来代替挂载点：</p>
<blockquote><p># lsof /dev/sdb1</p>
<p>COMMAND  PID USER  FD TYPE DEVICE    SIZE NODE NAME</p>
<p>bash    6925 root cwd  DIR   8,17    4096    1 /media/usbdisk</p>
<p>xmms    6979 root cwd  DIR   8,17    4096    1 /media/usbdisk</p>
<p>xmms    6979 root  8r  REG   8,17 2713101  377 /media/usbdisk/a.mp3</p></blockquote>
<p>lsof很强大的，更多方法，请找&ldquo;男人&rdquo;！</p>
<blockquote><div>本文所处位置：<a href="http://www.linuxhobby.com/" title="">Linux爱好者</a> &raquo; <a href="http://www.linuxhobby.com/linux-command-lsof/" rel="bookmark" title="lsof命令的应用">《lsof命令的应用》</a></div>
<div>文章地址：<a href="http://www.linuxhobby.com/linux-command-lsof/" rel="bookmark" title="lsof命令的应用">http://www.linuxhobby.com/linux-command-lsof/</a></div>
<div>网站RSS订阅：<a href="http://feed.feedsky.com/linuxhobby/" title="Linux爱好者">http://feed.feedsky.com/linuxhobby/</a></div>
</blockquote>
<h2></h2>

---

[📚 返回目录](/needisme-mu-lu/)
