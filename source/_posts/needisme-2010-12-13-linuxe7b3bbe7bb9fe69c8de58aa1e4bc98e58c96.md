---
title: "Linux系统服务优化"
date: 2010-12-13 11:43:00
categories: NeedIsMe
tags: ["DNS", "HTML", "Apache", "LINUX", "Linux", "系统管理"]
---

<p>Linux系统服务优化: "<br />
<a href="http://www1.feedsky.com/r/l/feedsky/LinuxHobby/448032137/art01.html"><img src="http://www1.feedsky.com/r/i/feedsky/LinuxHobby/448032137/art01.gif" border="0" alt="" /></a><br />
Linux各个发行版在安装之后，在默认情况下，总是会开启一些我们可能不需要的服务，尤其是一些服务器类的发行版，比如<strong><a title="CentOS" href="http://www.linuxhobby.com/tag/centos">CentOS</a></strong>这样的发行版，默认开启的服务则更多，对于这些无关紧要或者不常用，甚至不用的Linux系统服务，Linux爱好者建议关闭它们，本文以CentOS为例，部分Linux系统服务也适合于其他Linux发行版。</p>
<div style="text-align: center;"><a href="http://www.linuxhobby.com/linux-service-optimization-system/"><img title="linux service optimization system" src="http://pic.yupoo.com/linuxhobby/AGSjSdhx/f3b7P.jpg" alt="Linux系统服务优化" width="420" height="280" /></a></div>
<p>下面则来介绍一些这些Linux系统服务的功能，以及是否可以关闭，具体请见下表。</p>
<blockquote><p>NetworkManager     自动在多种网络连接中进行转换</p>
<p>acpid     新型电源管理标准，通常笔记本电脑使用</p>
<p>anacron     自动化运行任务守护进程</p>
<p>atd     自动化运行任务守护进程</p>
<p>auditd     审核信息，存放内核生成的系统审查记录，建议开启</p>
<p>autofs     自动安装管理进程automount</p>
<p>avahi-daemon     Zeroconf service discovery守护进程</p>
<p>avahi-dnsconfd     /etc/avahi/dnsconf.action脚本守护进程</p>
<p>bluetooth     蓝牙</p>
<p>conman     控制台管理</p>
<p>cpuspeed     监测系统空闲百分比，降低或加快CPU时钟速度和电压，建议开启</p>
<p>crond     自动计划任务，建议开启</p>
<p>cups     通用UNIX打印守护进程</p>
<p>dnsmasq     Dns cache server守护进程</p>
<p>dund     蓝牙拨号网络</p>
<p>firstboot     安装完之后的用户配置向导，用于第一次设置系统</p>
<p>gpm     为文本模式下的Linux程序提供鼠标支持、拷贝、粘贴操作、弹出式菜单</p>
<p>haldaemon     硬件监控系统</p>
<p>hidd     蓝牙H.I.D.服务器</p>
<p>httpd     Apache服务器</p>
<p>ip6tables     ipv6 tables防火墙守护进程</p>
<p>ipmi     OpenIPMI Driver初始化脚本</p>
<p>iptables     iptables防火墙守护进程</p>
<p>irda     红外端口守护进程</p>
<p>irqbalance     多系统处理器环境下的系统中断请求进行负载平衡，单CPU无用</p>
<p>kdump     初始化kdump脚本</p>
<p>kudzu     硬件自动检测程序，如不增加新硬件，可以关闭</p>
<p>lvm2-monitor     LVM2 mirror devices守护进程</p>
<p>mcstrans     SELinux Context Translation System Daemon</p>
<p>mdmonitor     RAID相关设备的守护程序，建议开启</p>
<p>mdmpd     RAID相关设备的守护程序，建议开启</p>
<p>messagebus     事件监控服务，在必要时向所有用户发送广播信息，建议开启</p>
<p>microcode_ctl     可编码以及发送新微代码到内核以更新Intel IA32系列处理器守护进程</p>
<p>multipathd     Manage device-mapper multipath devices</p>
<p>netconsole     Initializes network console logging</p>
<p>netfs     安装和卸载NFS、SAMBA和NCP网络文件系统</p>
<p>netplugd     服务监控网络界面,根据信号关闭或启动它,用于手提电脑</p>
<p>network     激活已配置网络接口的脚本程序，建议开启</p>
<p>nfs     网络文件系统守护进程</p>
<p>nfslock     NFS文件锁定功能</p>
<p>nscd     密码与群查找服务</p>
<p>ntpd     网络时间同步</p>
<p>oddjobd</p>
<p>pand     蓝牙个人区域网络</p>
<p>pcscd     智能卡支持</p>
<p>portmap     用来支持RPC连接，RPC被用于NFS以及NIS 等服务</p>
<p>psacct     进程审计守护进程</p>
<p>rawdevices     rawdevices to block devices。Oracle数据库使用</p>
<p>rdisc     discovers routers守护进程</p>
<p>readahead_early     开机内存载入优化，建议开启</p>
<p>readahead_later     开机内存载入优化，建议开启</p>
<p>restorecond     SELinux相关联</p>
<p>rpcgssd     manages RPCSEC GSS contexts for the NFSv4 server</p>
<p>rpcidmapd     for NFSv4 that maps user names to UID and GID numbers</p>
<p>rpcsvcgssd     manages RPCSEC GSS contexts for the NFSv4 server</p>
<p>saslauthd     使用SASL的认证守护进程</p>
<p>sendmail     邮件服务器sendmail守护进程</p>
<p>setroubleshoot     SELinux Troubleshooting</p>
<p>smartd     监控硬盘故障，建议开启</p>
<p>sshd     OpenSSH服务器守护进程，建议开启</p>
<p>syslog     系统日志，建议开启</p>
<p>tcsd     TrouSerS server daemon</p>
<p>winbind     用于Samba服务器</p>
<p>wpa_supplicant     无线设备支持</p>
<p>xfs     X Window字型服务器守护进程，为本地和远程X服务器提供字型集</p>
<p>ypbind     为NIS客户机激活ypbind服务进程</p>
<p>yum-updatesd     RPM操作系统自动升级和软件包管理守护进程，建议开启</p></blockquote>
<p>Linux系统服务管理命令：<strong><a title="CentOS" href="http://www.linuxhobby.com/tag/chconfig">chconfig</a></strong></p>
<p>查询服务开启关闭状态 chkconfig &ndash;list</p>
<p>设置服务为启动开启：chkconfig 服务名称 on</p>
<p>设置服务为启动开启：chkconfig 服务名称off</p>
<p>关闭服务：service 服务名 stop</p>
<p>在实际应用中，Linux爱好者习惯以最小安装环境来安装系统，同时也会选择以下的软件包，比如以Linux爱好者喜欢的CentOS为例，在安装的时候选择如下软件包：</p>
<blockquote><p>Administration Tools 管理员工具</p>
<p>Base 基本系统</p>
<p>Development Libraries 开发链接库</p>
<p>Developmetn Tools 开发工具</p>
<p>Editors 编辑工具</p>
<p>Network Servers 网络服务</p>
<p>Server Configuration Tools 服务器配置工具</p>
<p>System Tools 系统工具</p>
<p>Text-Based Internet 文本模式浏览器</p></blockquote>
<p>本文以上介绍的系统服务优化方法中，有部分服务适合于桌面版的发行版，比如fedora、Archlinu、Ubuntu、Debian等发行版均可参考，大同小异，希望各位Linux爱好者能触类旁通。</p>
<p>另外提供一个适合CentOS的优化脚本：<a title="CentOS系统服务优化脚本" href="http://uploading.com/files/mdma9mc6/optimize_services.sh/"><strong>点击下载脚本</strong></a>。</p>
<blockquote>
<div>本文所处位置：<a href="http://www.linuxhobby.com/">Linux爱好者</a> &raquo; <a title="Linux系统服务优化" rel="bookmark" href="http://www.linuxhobby.com/linux-service-optimization-system/">《Linux系统服务优化》</a></div>
<div>文章地址：<a title="Linux系统服务优化" rel="bookmark" href="http://www.linuxhobby.com/linux-service-optimization-system/">http://www.linuxhobby.com/linux-service-optimization-system/</a></div>
<div>网站RSS订阅：<a title="Linux爱好者" href="http://feed.feedsky.com/linuxhobby/">http://feed.feedsky.com/linuxhobby/</a></div>
</blockquote>

---

[📚 返回目录](/needisme-mu-lu/)
