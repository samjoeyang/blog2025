---
title: "Linux系统中的入侵检测"
date: 2009-09-05 13:29:00
categories: NeedIsMe
tags: ["DNS", "LINUX", "Linux", "系统管理", "FTP", ".NET"]
---

<p>介绍</p>
<p>这篇文章集中讨论Linux平台上的几种基于主机的入侵检测系统。而且，我还会介绍一下如何安装这些软件包、它们有什么用处以及在什么情况下使用这些软件包。</p>
<p>系统安全101</p>
<p>这篇文章假定你已经有了一些系统安全的基本知识。而且，为了防止来自Internet的入侵也已经采取了一些基本的安全防范措施。这些措施包括：</p>
<p>l　　　　防火墙，用来防止系统中的TCP和UDP端口不会被黑客利用。例如，用于Web服务器的一组基本的防火墙规则要保证只能通过TCP端口80(通常是HTTP协议的端口号)用TCP/IP协议来访问这台计算机。</p>
<p>l　　　　禁止不必要的daemon。例如，一个Web服务器在正常情况下只需要一个进程用来处理网页的请求。与处理网页请求无关的进程，如：RPC/Portmap服务、NFS服务、X字体服务、DNS域名服务以及其它用不着的程序必须被禁止运行。在Red<br />
Hat Linux系统中，通常使用象ntsysv或tksysv这样的程序来禁止不必要的daemon或服务的。</p>
<p>l　　　　通过编辑"/etc/inetd.conf"，禁止不必要的端口。在一般情况下，系统安装完之后在"/etc/inetd.conf"文件中许多端口都被设置成有效的。编辑这个文件并把不必要的行删掉或注释掉是最基本的安全防范措施，必须在所有的系统中都使用这样的安全措施。</p>
<p>安全防线</p>
<p>在这篇文章中，我将讨论保证系统安全的多层次的解决方案。如果任何一层安全防线被破坏了，其它安全防线也能够对系统提供保护。多层次的系统安全结构就是如图表1所示的这个例子。</p>
<p>图中的每一层为其上面一层提供更多的数据保护。例如，第一层是防火墙。一旦防火墙被攻破，第二层，也就是Port Sentry程序，也还能够提供保护。</p>
<p>在系统中第三第四层分别是LIDS和LogCheck程序，一旦Port Sentry对入侵者无能为力，它们将提供更进一步的保护。</p>
<p>监控连接请求</p>
<p>在防火墙之后的第一层是用来监控连接请求的软件包。PortSentry软件包(<a href="http://www.psionic.com/abacus/portsentry/)">http://www.psionic.com/abacus/portsentry/)</a>提供了简单而有效地完成这项任务的方法。</p>
<p>PortSentry是用来做什么的?</p>
<p>PortSentry是用来监控TCP/IP端口活动的监控器。被PortSentry监控的端口活动都会被报告出来而且可以设置某些参数，包括根据端口活动的来源禁止其对系统进一步的访问。这是一个很重要的防御措施，因为黑客在入侵之前都会试图探查系统的弱点(通过端口扫描)。检测"探查"或端口扫描，可以彻底地防止潜在的黑客入侵系统，让黑客不可能在扫描过端口之后发动真正的攻击。</p>
<p>安装PortSenty</p>
<p>对Red Hat Linux的用户，PortSentry的RPM包可以在Red Hat contrib<br />
FTP站点找到。这个站点在世界各地都有镜像，查看<a href="http://www.redhat.com">www.redhat.com</a>找到离你最近的镜像站点。我不能确定是否有.deb格式的PortSentry软件包，但是我想可能会有吧。</p>
<p>对于其它Linux系统，用源代码来安装PortSentry相对来说也很容易。</p>
<p>建议配置</p>
<p>PortSentry可以在很多种模式下运行，包括各种各样的TCP和UDP"秘密"(stealth)模式。我喜欢把PortSentry和一些TCP端口绑定，这些端口是：(a)不在使用的;(b)众所周知的很容易被攻击的端口。例如，端口143(imap2)，端口111(portmap)和端口23(telnet)都是很容易被攻击的端口，因此我在自己的系统中都没有使用这些端口，但是我的Web服务器的这些端口在24小时之内已经都被扫描过来了。</p>
<p>为了让PortSentry在基本的TCP模式下运行，必须确保系统的启动脚本中有这么一行：</p>
<p>portsentry �tcp</p>
<p>而且还要保证在PortSentry的配置文件(portsentry.conf)中包含有让你需要监控的端口生效的TCP_PORTS行。</p>
<p>反应(response)选项</p>
<p>"portsentry.conf"文件中的"Response<br />
Options"部分允许你设定当检测到端口有异常活动之后PortSentry将采取怎样的反应。我使用的方法是让ipchains阻塞更进一步的攻击。这只要在"portsentry.conf"文件中去掉下面这一行的注释：</p>
<p>KILL_ROUTE="/sbin/ipchains -I input -s $TARGET$ -j DENY -l"</p>
<p>在端口被扫描的频率很高的系统中，把上面这一行中末尾的"-l"去掉，可以不记录连接请求，这样就能节省日志文件所占的空间。</p>
<p>监控系统日志</p>
<p>用防火墙保护系统以及用类似PortSentry的软件所起到的作用就是它们可以监控和阻止连接到系统中空闲端口的企图。这可以防止用"扫描-入侵"的方法对系统进行攻击。</p>
<p>如果系统需要运行一个特定的服务(例如，在Web服务器上运行Apache、在DNS服务器上运行BIND)而且黑客发现了服务软件中的一个安全漏洞，那么防火墙和PortSentry就不能防止黑客对系统进行攻击。当作为DNS服务器上运行的BIND软件有安全漏洞，而且黑客通过扫描一定范围内计算机的某一个特定端口(DNS端口)发现了这台有安全隐患的计算机并通过这个端口发动攻击，防火墙和PortSentry都会把这样的入侵看成是正常的对系统的访问。</p>
<p>LogCheck</p>
<p>LogCheck(<a href="http://www.psionic.com/abacus/logcheck/)">http://www.psionic.com/abacus/logcheck/)</a>是一个非常有用的程序用来检查系统日志查看有没有什么异常的活动。LogCheck扫描不同的系统日志文件(在Linux系统中是在"/var/log"目录下)，一旦发现有异常情况就会用email通知系统管理员。如果有黑客企图攻击你的系统或者已经攻击了你的系统在日志文件中是可以找到一些蛛丝马迹的。</p>
<p>安装LogCheck</p>
<p>LogCheck的RPM软件包象PortSentry一样可以在Red Hat contrib<br />
FTP服务器上得到。安装LogCheck的RPM软件包或者用源代码安装(请看源代码中提供的INSTALL文件)相对来说都是很简单的。</p>
<p>配置LogCheck</p>
<p>LogCheck有四个主要的配置文件。在RPM的版本中，这些文件都保存在"/etc/logcheck"目录下。正常情况下只有"logcheck.ignore"和"logcheck.violations.ignore"文件需要修改。安装完LogCheck之后，还要做的事有：</p>
<p>l　　　　用标准的配置文件运行一次LogCheck。这将产生一个很大的输出文件，这个文件可以删掉。</p>
<p>l　　　　24小时之后，再运行一次LogCheck。这会检测到上次运行之后日志文件中新增加的一些项，而且会生成一个小了一点但是还是很大的输出文件。认真读一下这个输出文件。</p>
<p>l　　　　对于日志文件中一些用不着考虑的消息(根据自己的判断)找到可以标识这些消息的某个特殊的字符串。对于"Security<br />
Violations"部分的消息，把这个标识字符串加入"logcheck.violations.ignore"文件。对于其它的消息(在"Unusual<br />
System Events"部分)，把标识串加入"logcheck.ignore"文件中。</p>
<p>l　　　　在一周之内每隔12-24小时重复上面的过程。直到通过在".ignore"文件中不断地加入标识串把用不着的消息过滤掉，最后在LogCheck每天的报表中只剩下那些真正需要好好查看的消息为止。</p>
<p>注意，安装完RPM的软件包之后，LogCheck在默认情况下被设置成每小时运行一次。但是在一般情况下，除了那些需要定期监控的非常重要的系统，只要每天运行一次就行了。只要把"/etc/cron.hourly/logcheck"文件移到"/etc/cron.daily"目录下就解决问题了。</p>
<p>基</p>

---

[📚 返回目录](/needisme-mu-lu/)
