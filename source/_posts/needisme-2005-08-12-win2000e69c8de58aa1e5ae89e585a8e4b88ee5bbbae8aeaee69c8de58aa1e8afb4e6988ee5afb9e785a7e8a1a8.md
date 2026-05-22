---
title: "win2000服务安全与建议服务说明对照表"
date: 2005-08-12 06:32:16
categories: NeedIsMe
tags: ["Network Security", "Windows", "DNS", "网络安全"]
---

<div id="msgcns!A634C4CD7A14B666!236" class="bvMsg">　　在windows2000中,服务基本上是一个在启动时运行的程序,它的运行和任何用户都无关,一台服务器所执行的大多数功能,例如文件共享等都是以服务得形式来运行.而且大多数十以system特权运行的,这样黑客们通过非法的途径利用某个服务获得system特权,那将决对不是个好事.因此,了解每个win2000的服务,并禁止一些不必要的,能让你的服务器更加安全.</p>
<p>　　Alerter</p>
<p>　　服务方向: 负责向用户通报管理警报,该服务和Mesenger服务一起工作,后者接收并路由前者的信息.</p>
<p>　　可执行文件: %systemRoot%system32services.exe</p>
<p>　　风险: 潜在可能导致社会工程攻击</p>
<p>　　建议: 将Alerter服务发出的警告限定为只由管理员接收.</p>
<p>　　Application Management</p>
<p>　　服务方向: 提供和active directory之间的通信.通过group policy(组策划)来指定,发布并删除在系统中安装的应用程序.</p>
<p>　　可执行文件: winntsystem32services.exe</p>
<p>　　风险: 无</p>
<p>　　建议: 非组策略使用应用程序,最好禁用该服务.</p>
<p>　　Boot Information Negotiation Layer</p>
<p>　　服务方向: 与Remote Installation Service(RIS)一起使用,除有需要通过RIS安装操作系统,否则不要运行.</p>
<p>　　可执行文件: winntsystem32services.exe</p>
<p>　　风险: 无</p>
<p>　　Brower</p>
<p>　　服务方向: 负责保存网络上的计算机列表,并将该列表提供给那些请求得到该列表的程序</p>
<p>　　可执行文件: winntsystem32services.exe</p>
<p>　　风险: 暴露有关网络的信息</p>
<p>　　建议: 禁止　　</p>
<p>　　Indexing</p>
<p>　　服务方向: 负责索引磁盘上的文档和文档属性,并且在一个目录中保存信息,使得你在以后可以搜索他们.</p>
<p>　　可执行文件: winntsystem32services.exe</p>
<p>　　风险: 其为IISweb服务器上诸多安全弱点的根源</p>
<p>　　建议: 除非特别需要,否则禁止. 　</p>
<p>　　ClipBook</p>
<p>　　服务方向: ClipBook支持ClipBook Viewer程序,该程序可以允许剪贴页被远程计算机上的ClipBook浏览.可以使得用户能够通过网络连接来剪切和粘贴文本和图形.</p>
<p>　　可执行文件: winntsystem32Clipsrv.exe</p>
<p>　　风险: 潜在被非法用于远程访问ClipBook剪贴页面</p>
<p>　　建议: 禁止</p>
<p>　　Distributed File System</p>
<p>　　服务方向: 允许创建单一逻辑盘.文件分布在网络上不同位置.</p>
<p>　　可执行文件: winntsystem32Dfssrc.exe</p>
<p>　　风险: 暂无已知风险</p>
<p>　　建议: 禁止(会产生disk error,可忽略该错误)</p>
<p>　　DHCP client</p>
<p>　　服务方向: 通过注册和更新IP地址和DNS域名来管理网络配置.</p>
<p>　　可执行文件: winntsystem32services.exe</p>
<p>　　风险: 无已知风险</p>
<p>　　建议:为服务器分配一个静态IP</p>
<p>　　Logical Disk Manager Administrative</p>
<p>　　服务方向: 用于管理逻辑盘</p>
<p>　　可执行文件: winntsystem32dmadmin.exe</p>
<p>　　风险: 暂无已知风险</p>
<p>　　建议:将服务的启动类型设为手动(Manual)</p>
<p>　　Logical Disk Manager</p>
<p>　　服务方向: 该服务为 Logical Disk Manager Watchdog 服务.负责管理动态磁盘的服务.</p>
<p>　　可执行文件: winntsystem32services.exe</p>
<p>　　风险: 无已知风险</p>
<p>　　建议: 系统运行时需要,保持默认得自动启动</p>
<p>　　 DNS Server</p>
<p>　　服务方向: 负责解答DNS域名查询</p>
<p>　　可执行文件: winntsystem32dns.exe</p>
<p>　　风险: 无已知风险</p>
<p>　　建议: 因其通常是导致许多安全性弱点的根源,该服务应谨慎使用.</p>
<p>　　DNS Client</p>
<p>　　服务方向: 用于缓存DNS查询来进行记录.可用于某个入侵检测系统的DNS查询,可加速DNS查询的速度.</p>
<p>　　可执行文件: winntsystem32services.exe</p>
<p>　　风险: 无已知风险,但攻击者可以查看你的缓存内容.确定你所访问过的网站. 命令行形式为(ipconfig/displaydns)</p>
<p>　　建议:可停可不停</p>
<p>　　Event Log</p>
<p>　　服务方向:Event Log服务负责记录来自系统和运行中程序的管理事件消息.虽然该服务功能有限,并具有一些小问题,但是该服务可以用于入侵检测和系统监视.</p>
<p>　　可执行文件: winntsystem32services.exe</p>
<p>　　风险: 无已知风险</p>
<p>　　建议: 该服务应该被启动,尤其实在独立服务器上.</p>
<p>　　COM+Eent System</p>
<p>　　服务方向: 提供自动事件分布功能来订阅COM组件.</p>
<p>　　可执行文件: winntsystem32svchost.exe -k nesvcs</p>
<p>　　风险: 无已知风险</p>
<p>　　建议: 如果该服务不需要已安装的任何程序所使用,你可以禁用COM+Event System 和 System Event Notification服务.</p>
<p>　　Fax</p>
<p>　　服务方向: 它负责管理传真的发送和接收.</p>
<p>　　可执行文件: winntsystem32faxsvc.exe</p>
<p>　　风险: 无已知风险</p>
<p>　　建议: 对于服务器而言,不需要也不建议使用该服务,除非该服务器专门被指定为用做一个传真服务器.</p>
<p>　　Single Instance Storage Groveler</p>
<p>　　服务方向: 该服务和Remote Installation服务一起使用.扫描单一实例存储卷来寻找重复的文件,并将重复文件指向某个数据存储点以节省磁盘空间.</p>
<p>　　风险: 无已知风险</p>
<p>　　建议: 除非你需要使用 Remote Installation 服务,否则请停止它.</p>
<p>　　Internet Authentication Service</p>
<p>　　服务方向: 用于认证拨号和VPN用户.</p>
<p>　　可执行文件: winntsystem32svchost.exe -k netsvcs</p>
<p>　　风险: 无已知风险</p>
<p>　　建议: 显然除了在拨号和VPN服务器上,该服务不应该使用.禁止.</p>
<p>　　IIS Admin</p>
<p>　　服务方向: IIS Admin服务允许通过Internet Services Manager MMC程序面板来对IIS服务进行管理.</p>
<p>　　可执行文件: winntsystem32inetsrvinetinfo.exe</p>
<p>　　风险: 无已知风险</p>
<p>　　建议: 如果服务器正在运行Inetrnet服务,则该服务是需要的.如果没有运行任何Inetrnet服务,则应当从Control Panel,Add and Remove Programs中卸载Internet Information Server,这样IIS Admin服务也将被卸载.</p>
<p>　　Intersite Messaging</p>
<p>　　服务方向: Intersite Messaging服务和Active Directory replication一起使用.</p>
<p>　　可执行文件: winntsystem32ismserv.exe</p>
<p>　　风险: 无已知风险</p>
<p>　　建议: 除了Active Directory服务器之外,不需要也不建议使用该服务.</p>
<p>　　Kerberos Key Distribution Center</p>
<p>　　服务方向: 这是个域服务,提供了Kerberos认证服务(AS Authentication Service)和票证授予服务(TGT,Ticket-Granting Service)</p>
<p>　　可执行文件: winntsystem32lsass.exe</p>
<p>　　风险: 没有已知风险</p>
<p>　　建议: Kerberos Key Distribution Center服务和位于某个域控制器是的Active Directory一起工作的,而且不能被停止,除了在域控制器上,该服务不应该在其他计算机上运行.</p>
<p>　　Server</p>
<p>　　服务方向: 该服务提供RPC支持以及文件,打印和命名管道共享,Server服务是作为文件系统驱动器来实现的,可以处理I/O请求.</p>
<p>　　可执行文件: winntsystem32services.exe</p>
<p>　　风险: 如果没有提供适当地用户保护,会暴露系统文件和打印机资源</p>
<p>　　建议: 除非你打算在windows网络上共享文件或打印机,否则不需要运行该服务. (附言: 对以2000而言,这个是一个高风险服务,2000的用户多知道默认共享吧,就是该服务的问题,如果不禁止,每次注销或开机,默认共享就会打开,你的所以重要信息都将暴露.例如winnt文件夹.大家都应该知道他对于2000的重要.除非你的密码够安全,否则这个共享将是你机子的死穴!!!!)</p>
<p>　　Workstation</p>
<p>　　服务方向: 该服务提供网络连接和通信,该服务以一个文件系统驱动器的形式工作,并且可以允许用户访问位于windows网络上的资源.</p>
<p>　　可执行文件: winntsystem32services.exe</p>
<p>　　风险: 一些独立服务器,例如web服务器,不应当参与到某个windows网络中</p>
<p>　　建议: 该服务应当只在位于某个内部网络,并受到某个防火墙保护的工作站和服务器上运行,在任何可以连接到Internet的服务器上都应该禁用这个服务.</p>
<p>　　TCP/IP打印服务器</p>
<p>　　服务方向: 该服务允许远程UNIX用户通过使用TCP/IP协议来访问由某个windows2000服务器所管理的打印机.</p>
<p>　　可执行文件: winntsystem32tcpsvcs.exe</p>
<p>　　风险: 具有一些安全性弱点,并打开一个监听端口</p>
<p>　　建议: 该服务具有一些安全性弱点,因为打开了一个到internet的端口,因此,除非网络通过防火墙与Internet隔离开.否则不要使用该服务.</p>
<p>　　License Logging</p>
<p>　　服务方向: 该服务负责管理某个站点的许可协议信息.</p>
<p>　　可执行文件: winntsystem32llssrv.exe</p>
<p>　　风险: 没有已知风险</p>
<p>　　建议: 除了在域控制器上,其他计算机不应当使用该服务.</p>
<p>　　TCP/IP NETBIOS Helper</p>
<p>　　服务方向: 该服务允许在TCP/IP网络上进行NETBIOS通信.</p>
<p>　　可执行文件: winntsystem32services.exe</p>
<p>　　风险: 暴露出系统中的netBIOS安全性弱点,例如NTLM认证</p>
<p>　　建议: 除非你需要和一个旧版本的windows保持兼容,否则应当禁止该服务.</p>
<p>　　Messenger</p>
<p>　　服务方向: Messenger服务负责发送和接收由管理员或Alerter服务所传递的消息.</p>
<p>　　可执行文件: winntsystem32services.exe</p>
<p>　　风险: 没有已知风险</p>
<p>　　建议: 该服务不需要而且应当被禁用.</p>
<p>　　NetMeeting Remote Desktop Sharing</p>
<p>　　服务方向: 该服务允许授权用户通过使用NetMeeting来远程访问你的Windows桌面.</p>
<p>　　可执行文件: winntsystem32mnmsrvc.exe</p>
<p>　　风险: 是一个具有潜在不安全性的服务</p>
<p>　　建议: 该服务应当被禁止.因为它是会导致潜在地安全性弱点的.你可以使用Terminal服务来代替该服务用于远程桌面访问.</p>
<p>　　Distributed Transaction Coordinator</p>
<p>　　服务方向: 微软的Distributed Transaction Coordinator服务(MS DTC)可以借助OLE Transactions协议来提供一个事务(Transaction)协调工具,可以协调分布于两个和多个数据库,消息队列文件系统和其他事务保护(trasaction protected)资源管理器的事务.</p>
<p>　　可执行文件: winntsystem32msdtc.exe</p>
<p>　　风险: 没有已知风险</p>
<p>　　建议: 无需禁止</p>
<p>　　FTP Publishing</p>
<p>　　服务方向: 文件传输协议不是一种安全的协议,如果不进行适当地保护,FTP Publishing服务将大来很多的安全性风险.</p>
<p>　　可执行文件: winntsystem32inetsrvinetinfo.exe</p>
<p>　　风险: 微软的FTP Server没有已知风险.但一般而言,FTP是已知不安全的服务.</p>
<p>　　建议: 除非你需要通过FTP来提供文件共享,否则该服务应当被禁止.如果需要,请谨慎地对其进行保护和监视.</p>
<p>　　Windows Installer</p>
<p>　　服务方向: 负责管理软件的安装,改服务对于安装和修复软件应用程序时很有用的.</p>
<p>　　可执行文件: winntsystem32msiexec.exe/V</p>
<p>　　风险:无已知风险</p>
<p>　　建议: 保留</p>
<p>　　Network DDE</p>
<p>　　服务方向: 该服务提供动态数据交换(DDE,Dynamic Data Exhange)数据流传输和安全性.</p>
<p>　　可执行文件: winntsystem32netdde.exe</p>
<p>　　风险: 通过网络接受DDE请求</p>
<p>　　建议: 对于大多数应用程序而言,Network DDE是不需要的,你应当将它设置为手工启动.</p>
<p>　　Network DDE DSDM</p>
<p>　　服务方向: 该服务保存一个共享对话(shared conversation)</p>
<p>　　数据库,这样当某个Network DDE共享被访问时,共享会话将被应用,并且安全性检测系统将确定请求这是否被允许访问.</p>
<p>　　可执行文件: winntsystem32netdde.exe</p>
<p>　　风险: 没有已知风险</p>
<p>　　建议: 该服务应当设置为手工启动</p>
<p>　　Net Logon</p>
<p>　　服务方向: 支持为域中计算机进行的帐号登录事件的传递认证(pass-through authentication).</p>
<p>　　可执行文件: winntsystem32lsass.exe</p>
<p>　　风险: 可以用于对强力密码攻击进行传递</p>
<p>　　建议: 该服务不应当在那些不作为域中一部分的独立服务器上使用.禁止.</p>
<p>　　Network Connections</p>
<p>　　服务方向: 该服务负责管理Network and Dial-Up Connections文件夹中的对象,该文件夹中你可以看到局域网和远程连接.</p>
<p>　　可执行文件: winntsystem32svchost.exe -k netsvcs</p>
<p>　　风险: 没有已知风险</p>
<p>　　建议: 由于该服务在需要时将自己启动,因此可以设置为手动启动.</p>
<p>　　Network News Transport Protocol(NNTP)</p>
<p>　　服务方向: 用于提供一个新闻服务器服务,例如USENET.</p>
<p>　　可执行文件: winntsystem32inetsrvinetinfo.exe</p>
<p>　　风险: 没有已知风险</p>
<p>　　建议: NNTP服务器应当安装在一个DMZ网络中,而且应当像其他网络服务,例如FTP,Nail和Web服务那样来对待.不建议在私有网络上配置NNTP服务器,任何位于某个内部网络上的服务器应当卸载或禁用NNTP服务.</p>
<p>　　File Replication</p>
<p>　　服务方向: file replication服务(FRS)可以跨域中的服务器来进行文件,系统策略和登录脚本的复制,该服务还可以用于为分布式文件系统(DFS, Distributed File System)复制数据.</p>
<p>　　可执行文件: winntsystem32ntfrs.exe</p>
<p>　　风险:没有已知风险</p>
<p>　　建议:它在多个服务之间维护文件目录内容的文件同步,保持原状.</p>
<p>　　NTLM Security Support Provider</p>
<p>　　服务方向: 该服务委远程过程调用(RPC.Remote Procedure Call)程序提供安全性,这些程序使用除命名管道之外的传输方式.该服务仅当client for microsoft安装后才在服务列表中出现.</p>
<p>　　可执行文件: winntsystem32lsass.exe</p>
<p>　　风险: 无已知风险</p>
<p>　　建议: 既然是安装后才有.当然无需去管,只有你没有安装client for microsoft.</p>
<p>　　Removable Storage</p>
<p>　　服务方向: 该服务负责管理可移动媒质,磁盘和库.</p>
<p>　　可执行文件 : winntsystem32svchost.exe -k netsvcs</p>
<p>　　风险: 没有已知风险</p>
<p>　　建议: 你可以在需要时启动该服务.</p>
<p>　　Plug-and-Play</p>
<p>　　服务方向: 该服务负责管理设备安装和配置,并向程序通告设备所出现的变化.</p>
<p>　　可执行文件: winntsystem32services.exe</p>
<p>　　风险: 无已知风险</p>
<p>　　建议: 在没有这个服务的情况下启动系统是可能的,但时间较长,而且一些服务也无法运行了(如RAS),所以服务可能最好是设置为自动启动.</p>
<p>　　IPSEC Policy Agent</p>
<p>　　服务方向: 该服务负责管理IP安全并启动ISAKMP/Oakley(IKE)和IP安全性驱动程序.</p>
<p>　　可执行文件: winntsystem32lsass.exe</p>
<p>　　风险: 无已知风险</p>
<p>　　建议: 这个服务请保留吧.</p>
<p>　　Protected Storage</p>
<p>　　服务方向: 该服务可以为敏感数据(例如私钥)提供受保护的储存来防止它们被未授权的服务,进程或用户访问.</p>
<p>　　可执行文件: winntsystem32services.exe</p>
<p>　　风险: 没有已知风险</p>
<p>　　建议: 这个就不必问了,它对系统来说是必须的.</p>
<p>　　Remote Access Auto Connection Manager</p>
<p>　　服务方向: 当用户请求访问某个远程网络地址时,该服务将自动拨号网络连接.</p>
<p>　　可执行文件: winntsystem32svchost.exe -k netsvcs</p>
<p>　　风险: 没有已知风险</p>
<p>　　建议: 该服务仅在你使用拨号网络连接时才需要,如果你不是通过拨号上网的,当然也就不需要了.</p>
<p>　　Remote Access Connection Manager</p>
<p>　　服务方向: 该服务管理拨号网络连接</p>
<p>　　可执行文件: winntsystem32svchost.exe -k netsvcs</p>
<p>　　风险: 没有已知风险</p>
<p>　　建议: 只有服务器需要支持Routing and Remote Access Service(RRAS)时才需要运行该服务,所以你可以禁止.</p>
<p>　　Routing and Remote Access</p>
<p>　　服务方向: 该服务在局域网和广域网环境中提供路由服务.该服务仅用于远程访问点.</p>
<p>　　可执行文件: winntsystem32svchost.exe -k netsvcs</p>
<p>　　风险: 如果配置不当,该服务将会使非法用户在未授权的情况下访问网络</p>
<p>　　建议: 该服务是不能关闭的,那只好好好配置咯.</p>
<p>　　Remote Registry</p>
<p>　　服务方向: 使得经过授权的管理员能够对位于远程主机上的注册表项目进行操作,对于一些功能,例如远程性能监视,是需要Remote Registry</p>
<p>　　服务才能工作的.</p>
<p>　　可执行文件: winntsystem32regsvc.exe</p>
<p>　　风险: 如果没有得到适当的配置,会潜在地将注册表暴露</p>
<p>　　建议: 风险是明显的了,所以啊,不是特别需要,还是禁止吧.</p>
<p>　　Remote Procedure Call(RPC) Locator</p>
<p>　　服务方向: 该服务可以使那些支持RPC的应用程序注册资源可用性,并使客户能够找到兼容的RPC服务器.</p>
<p>　　可执行文件: winntsystem32svchost -k rpcss</p>
<p>　　风险: 无已知风险</p>
<p>　　建议: 该服务应当仅在某个域控制器上运行</p>
<p>　　Remote Procedure Call(RPC)</p>
<p>　　服务方向: 该服务调用位于远程计算机上的可用服务,并用于远程计算机管理.</p>
<p>　　可执行文件: winntsystem32svchost -k rpcss</p>
<p>　　风险: 会暴露系统信息</p>
<p>　　建议: 虽然会暴露信息,不过没办法拉,谁叫他是任何Windows2000系统上都需要的?</p>
<p>　　QoS Admission Control</p>
<p>　　服务方向: 该服务提供带宽管理控制来保证到网络服务的访问.</p>
<p>　　可执行文件: winntsystem32rsvp.exe -s</p>
<p>　　风险: 无已知风险</p>
<p>　　建议: 如果你使用Windows QoS功能的话,就应当启用它,不要就禁了吧.</p>
<p>　　Secrity Accounts Manager</p>
<p>　　服务方向: Secrity Accounts Manager(SAM)服务保存了本地用户帐号的安全性信息以用于认证.</p>
<p>　　可执行文件: winntsystem32lsass.exe</p>
<p>　　风险: 虽然有一些方法可以获得SAM数据,但是SAM服务本身并不会带来安全性风险.</p>
<p>　　建议: 这可是个必须的服务</p>
<p>　　Task Scheduler</p>
<p>　　服务方向: 该服务将某个程序调度到在指定的时间运行.对于NT4,只有管理员可以调度任务,而且所以任务都是作为SYSTEM运行的,对于2000,则任何用户都可以调度某一个任务,而且该任务仅在用户各自的用户环境下运行.</p>
<p>　　可执行文件: winntsystem32MSTask.exe</p>
<p>　　风险: 入侵者可以在此替你运行他种下的木马服务端喔</p>
<p>　　建议: 除非你需要对某个任务作业进行调度,否则该服务应当被禁止.</p>
<p>　　RunAs</p>
<p>　　服务方向: 该服务使得进程可以在另外的用户凭证下启动,这是微软针对特洛伊木马程序的一种应对手段.使用RunAs,你可以在作为一个非特权用户而登录的同时以管理员权限运行某个进程.</p>
<p>　　可执行文件: winntsystem32services.exe</p>
<p>　　风险: 没有已知风险</p>
<p>　　建议: 该服务应当启动</p>
<p>　　System Event Notification</p>
<p>　　服务方向: 该服务跟踪系统事件.</p>
<p>　　可执行文件: winntsystem32svchost.exe -k netsvcs</p>
<p>　　风险: 没有已知风险</p>
<p>　　建议: 该服务记录windows登录,网络和电源事件,建议服务启用.</p>
<p>　　Internet Connection Sharing</p>
<p>　　服务方向: 将某计算机的Internet联机与其他一些计算机进行共享.</p>
<p>　　可执行文件: winntsystem32svchost.exe -k netsvcs</p>
<p>　　风险: 没有已知风险</p>
<p>　　建议: 该服务应当禁止,因为它可以使得用户使用一个未经授权的连接,绕过公司网络中的代理和监视服务.</p>
<p>　　Simple TCP/IP</p>
<p>　　服务方向: 这个服务是作为基本的TCP/IP服务而运行,打开了TCP端口7,9,13,17,19.</p>
<p>　　可执行文件: winntsystem32tcpsvcs.exe</p>
<p>　　风险: 在各种TCP端口上运行了一些不安全的服务</p>
<p>　　建议: 虽然有危险,还是运行吧.</p>
<p>　　Simple Mail Transport Protocol(SMTP)</p>
<p>　　服务方向: 提供外发的Internet邮件服务.</p>
<p>　　可执行文件: winntsystem32inetsrvinetinfo.exe</p>
<p>　　风险: 可以实现电子邮件的欺骗和中继</p>
<p>　　建议: 该服务很有用,应当被限制为只能从本地主机或网络上才能访问她.</p>
<p>　　SNMP</p>
<p>　　服务方向: 可以监视网络设备活动的代理,并将这些监视信息报告给网络控制台工作站</p>
<p>　　可执行文件: winntsystem32snmp.exe</p>
<p>　　风险: 在默认情况下,被设置为使用Public作为其社区字符串.他会暴露有关windows2000服务器的敏感信息.</p>
<p>　　建议: 在内部网上用它才好.</p>
<p>　　SNMP Trap</p>
<p>　　服务方向: 接受从其他SNMP代理发过来的SNMP信息</p>
<p>　　可执行文件: winntsystem32snmptrap.exe</p>
<p>　　风险: 没有已知风险</p>
<p>　　建议: 在内部网使用吧,其他就不要了.</p>
<p>　　Print Spooler</p>
<p>　　服务方向: 该服务用于假脱机打印作业,使得应用程序打印文件时不必等待.</p>
<p>　　可执行文件: winntsystem32spoolsv.exe</p>
<p>　　风险: 没有已知风险</p>
<p>　　建议: 除非你要处理打印队列,否则应当禁止该服务.</p>
<p>　　Performance Logs and Alerts</p>
<p>　　服务方向: 处理性能日志和警报,对系统和网络监视而言都是有用的.</p>
<p>　　可执行文件: winntsystem32smlogsvc.exe</p>
<p>　　风险: 没有已知风险</p>
<p>　　建议: 当然是启用啊</p>
<p>　　Telephony</p>
<p>　　服务方向: 提供电话和基于IP地语音连接.</p>
<p>　　可执行文件: winntsystem32svchost.exe -k tapisrv</p>
<p>　　风险: 没有已知风险</p>
<p>　　建议: 除非你打算在局域网上使用这种功能,否则应当禁止该服务.</p>
<p>　　Terminal</p>
<p>　　服务方向: 可以提供通过TCP/IP连接的远程桌面访问</p>
<p>　　可执行文件: winntsystem32termsrv.exe</p>
<p>　　风险: 可以导致潜在的非法访问远程桌面以及强力攻击.</p>
<p>　　建议: 你应当通过IP地址的限制来严格限制对该服务的访问.并且应该进行密切监视.</p>
<p>　　Terminal Services Licensing</p>
<p>　　服务方向: 用于在应用程序服务模式下使用Terminal服务时管理客户的许可协议.</p>
<p>　　可执行文件: winntsystem32lserver.exe</p>
<p>　　风险: 没有已知风险</p>
<p>　　建议: 该服务当服务器在Application Server Mode下运行Terminal服务时是必须得.</p>
<p>　　Trivial FTP Daemon</p>
<p>　　服务方向: 实现Trivial FTP Internet标准.</p>
<p>　　可执行文件: winntsystem32tftpb.exe</p>
<p>　　风险: 导致潜在的未经授权的文件访问</p>
<p>　　建议: 应当应用在本地的可信任网络上.</p>
<p>　　Telnet</p>
<p>　　服务方向: 该服务允许某个远程用户登录到系统,并使用命令行来运行控制台程序.</p>
<p>　　可执行文件: winntsystem32tlntsvr.exe</p>
<p>　　风险:他的密码是以明文形式传输,如果MTLM认证被启用,则NTLM密码散列也会被发现.</p>
<p>　　建议: 禁止吧</p>
<p>　　Utility Manager</p>
<p>　　服务方向: 可以启动和配置可达性工具.</p>
<p>　　可执行文件: winntsystem32UtilMan.exe</p>
<p>　　风险: 没有已知风险</p>
<p>　　建议: 除非你需要使用可达性工具,否则应当禁止他</p>
<p>　　Windows Time</p>
<p>　　服务方向: 从一个网络时间服务器来设置系统时间.</p>
<p>　　可执行文件: winntsystem32services.exe</p>
<p>　　风险: 没有已知风险</p>
<p>　　建议: 如果你不是2000,就禁了吧</p>
<p>　　World Wide Web Publishing</p>
<p>　　服务方向: 该服务提供Internet的匿名Web站点访问服务.</p>
<p>　　可执行文件: winntsystem32inetsrvinetinfo.exe</p>
<p>　　风险: 各种文件访问,远程命令执行,拒绝服务和其他风险都有</p>
<p>　　建议: 他是必须得,只有靠其他工具维护他的安全咯</p>
<p>　　Windows Management Instrumentation</p>
<p>　　服务方向: 提供系统管理信息,它基本上是一个基于WEB的企业管理兼容工具,用于从各种来源收集并关联管理数据.</p>
<p>　　可执行文件: winntsystem32WBEMWinMgmt.exe</p>
<p>　　风险: 具有暴露敏感信息的潜在危险</p>
<p>　　建议: WMI是一种有用的工具,同样也可用于收集信息.如果你不是特别不希望使用该服务,还是启用吧</p>
<p>　　Windows Internet Name Service</p>
<p>　　服务方向: 是微软用于NetBIOS网络的名称服务.</p>
<p>　　可执行文件: winntsystem32win.exe</p>
<p>　　风险: 具有暴露敏感系统信息的潜在危险</p>
<p>　　建议: 纯粹的Windows2000网络并不依赖WINS.应当被禁用.或是只在本地使用好了.</p></div>

---

[📚 返回目录](/needisme-mu-lu/)
