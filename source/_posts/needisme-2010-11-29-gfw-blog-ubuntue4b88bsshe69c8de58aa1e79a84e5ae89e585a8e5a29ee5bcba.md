---
title: "Ubuntu下ssh服务的安全增强"
date: 2010-11-29 13:36:00
categories: NeedIsMe
tags: ["HTML", "SSH", "LINUX", "Linux", "系统管理", "Ubuntu"]
---

<p>来源：<a href="http://www.td2.us/blog/2010-11/103.html">http://www.td2.us/blog/2010-11/103.html</a></p>
<p>虽然ssh将联机的封包通过加密的技术来进行资料的传递，能够有效地抵御黑客使用网络侦听来获取口令和秘密信息，但是仍然不乏大量入侵者进行密码尝试或其他手段来攻击ssh服务器以图获得服务器控制权。Ubuntu下面一些配置将进一步加强其安全性：</p>
<p>1.修改sshd服务器的配置文件/etc/ssh/sshd_config，将部分参数参照如下修改，增强安全性。</p>
<p>Port 4321</p>
<p>系统缺省使用22号端口，将监听端口更改为其他数值（最好是1024以上的高端口，以免和其他常规服务端口冲突），这样可以增加入侵者探测系统是否运行了sshd守护进程的难度。</p>
<p>ListenAddress 192.168.0.1</p>
<p>对于在服务器上安装了多个网卡或配置多个IP地址的情况，设定sshd只在其中一个指定的接口地址监听，这样可以减少sshd的入口，降低入侵的可能性。</p>
<p>PermitRootLogin no</p>
<p>如果允许用户使用root用户登录，那么黑客们可以针对root用户尝试暴力破解密码，给系统安全带来风险。</p>
<p>PermitEmptyPasswords no</p>
<p>允许使用空密码系统就像不设防的堡垒，任何安全措施都是一句空话。</p>
<p>AllowUsers sshuser1 sshuser2</p>
<p>只允许指定的某些用户通过ssh访问服务器，将ssh使用权限限定在最小的范围内。</p>
<p>AllowGroups sshgroup</p>
<p>同上面的AllowUsers类似，限定指定的用户组通过ssh访问服务器，二者对于限定访问服务器有相同的效果。</p>
<p>Protocol 2</p>
<p>禁止使用版本1协议，因为其存在设计缺陷，很容易使密码被黑掉。</p>
<p>禁止所有不需要的（或不安全的）授权认证方式。</p>
<p>X11Forwarding no</p>
<p>关闭X11Forwarding，防止会话被劫持。</p>
<p>MaxStartups 5</p>
<p>sshd服务运行时每一个连接都要使用一大块可观的内存，这也是ssh存在拒绝服务攻击的原因。一台服务器除非存在许多管理员同时管理服务器，否则上面这个连接数设置是够用了。</p>
<p>注意：以上参数设置仅仅是一个示例，用户具体使用时应根据各自的环境做相应的更改。</p>
<p>2.修改sshd服务器的配置文件/etc/ssh/sshd_config的读写权限，对所有非root用户设置只读权限，防止非授权用户修改sshd服务的安全设置。</p>
<p>chmod 644 /etc/ssh/sshd_config</p>
<p>3.设置TCP Wrappers。服务器默认接受所有的请求连接，这是非常危险的。使用TCP<br />
Wrappers可以阻止或允许应用服务仅对某些主机开放，给系统在增加一道安全屏障。这部分设置共涉计到两个文件：hosts.allow和hosts.deny。</p>
<p>将那些明确允许的请求添加到/etc/hosts.allow中。如系统仅允许IP地址为192.168.0.15和10.0.0.11的主机使用sshd服务，则添加如下内容：</p>
<p>sshd:192.168.0.15 10.0.0.11</p>
<p>将需要禁止使用的信息添加到/etc/hosts.deny中。如对除了在hosts.allow列表中明确允许使用sshd的用户外，所有其他用户都禁止使用sshd服务，则添加如下内容到hosts.deny文件中：</p>
<p>sshd:All</p>
<p>注意：系统对上述两个文件的判断顺序是先检查hosts.allow文件再查看hosts.deny文件，因此一个用户在hosts.allow允<br />
许使用网络资源，而同时在hosts.deny中禁止使用该网络资源，在这种情况下系统优先选择使用hosts.allow配置，允许用户使用该网络资<br />
源。</p>
<p>4.尽量关闭一些系统不需要的启动服务。系统默认情况下启动了许多与网络相关的服务，因此相对应的开放了许多端口进行LISTENING（监听）。我们知<br />
道，开放的端口越多，系统从外部被入侵的可能也就越大，所以我们要尽量关闭一些不需要的启动服务，从而尽可能的关闭端口，提供系统的安全性。</p>

---

[📚 返回目录](/needisme-mu-lu/)
