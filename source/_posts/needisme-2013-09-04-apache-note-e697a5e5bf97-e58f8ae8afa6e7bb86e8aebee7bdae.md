---
title: "apache note 日志 及详细设置"
date: 2013-09-04 17:03:56
categories: NeedIsMe
tags: ["DNS", "HTML", "Apache", "LINUX", "Linux", "系统管理"]
---

<p>引：http://blog.csdn.net/btbtd/archive/2005/02/15/288027.aspx<br />
# apache note | Apache 学习笔记(心得) by Emerald 绿色学院 - Green Institute</p>
<p># 分类:<br />
# 01.常规设置<br />
# 02.虚拟主机<br />
# 03. + Alias<br />
# 04..htaccess<br />
# 05.Log<br />
# 06.URL Rewrite<br />
# 07.其他</p>
<p>########01.常规设置</p>
<p># Listen<br />
# 监听端口, 例: Listen 80</p>
<p># ServerRoot<br />
# Apache 所在目录, 例: ServerRoot "C:/Program Files/Apache Group/Apache2" (WINDOWS)</p>
<p># ServerAdmin<br />
# 错误报告邮箱, 例: ServerAdmin btbtd@yahoo.com.cn</p>
<p># DocumentRoot<br />
# 站点根目录, 例: DocumentRoot "I:/gi-2288"</p>
<p># DirectoryIndex<br />
# 配置目录索引文件,<br />
# 例: DirectoryIndex index.php index.php3 index.html index.htm</p>
<p># ServerName<br />
# 服务器域名/IP地址, 例<!-- more -->: ServerName gi.2288.org</p>
<p># DefaultLanguage<br />
# 为所有指令作用域范围内的文件设定某一特定的缺省语言<br />
# 语法: DefaultLanguage MIME-lang, 例: DefaultLanguage zh-CN</p>
<p># AddDefaultCharset<br />
# 在没有进行指定字符集的情况下向回应中加入的默认字符集, 默认值: AddDefaultCharset Off<br />
# 例: AddDefaultCharset utf-8, 语法: 语法: AddDefaultCharset On|Off|字符集</p>
<p># AddHandler<br />
# 在文件扩展名与特定的处理器间建立映射, 例: AddHandler cgi-script .cgi .pl<br />
# 语法: AddHandler handler-name extension</p>
<p># AccessFileName<br />
# 定义配置文件, 例: AccessFileName .htaccess<br />
# 当向客户端返回文档时，如果设置了此目录的发布配置文件功能。<br />
# 服务器将在这个文档的各个路径中从名字列表中查找第一个存在的配置文件。</p>
<p># Timeout<br />
# 超时时间, 例: Timeout 300</p>
<p># TypesConfig<br />
# 指定mime.types文件的位置, 默认: TypesConfig conf/mime.types</p>
<p># DefaultType<br />
# DefaultType MIME类型,<br />
# 有时会发生这样的事：服务器会被要求提供一个文档，而这个文档的类型无法由它的MIME类型映射所决定。<br />
# 服务器必须通知客户端其文档的内容类型。<br />
# 所以当一个未知类型出现时，将会使用DefaultType。<br />
# 例: DefaultType image/gif</p>
<p># HostnameLookups<br />
# 启用对客户端IP的DNS查找, 语法: HostnameLookups on|off|double</p>
<p># ErrorLog<br />
# 定位服务器存放错误日志的位置, 例: ErrorLog "G:/Apache/dummy-gi.2288.org.80-error_log"</p>
<p># LogLevel<br />
# 控制错误日志的级别, 默认值: LogLevel warn<br />
# emerg 紧急 - 系统无法使用。<br />
# alert 必须立即采取措施。<br />
# crit 致命情况。<br />
# error 错误情况。<br />
# warn 警告情况。<br />
# notice 一般重要情况。<br />
# info 普通信息。<br />
# debug 出错级别信息</p>
<p># CustomLog<br />
# 设定日志的文件名和格式, 默认: CustomLog logs/access.log common</p>
<p># ServerTokens<br />
# 配置服务器HTTP回应头, 默认: ServerTokens Full</p>
<p># ServerTokens Prod[uctOnly], 服务器会发送（比如说）：Server:Apache</p>
<p># ServerTokens Major, 服务器会发送（比如说）：Server:Apache/2</p>
<p># ServerTokens Minor, 服务器会发送（比如说）：Server:Apache/2.0</p>
<p># ServerTokens Min[imal], 服务器会发送（比如说）：Server:Apache/2.0.41</p>
<p># ServerTokens OS, 服务器会发送（比如说）：Server: Apache/2.0.41 (Unix)</p>
<p># ServerTokens Full (or not specified),</p>
<p># 服务器会发送（比如说）：Server: Apache/2.0.41 (Unix) PHP/4.2.2 MyMod/1.2</p>
<p># MaxSpareServers<br />
# 设置apache的最大空闲进程数<br />
# 语法: MaxSpareServers number<br />
# 默认: MaxSpareServers 100<br />
# 例: MaxSpareServers 1000</p>
<p># MaxKeepAliveRequests<br />
# 设置每个连接的最大请求数<br />
# 语法: MaxKeepAliveRequests number<br />
# 默认值: MaxKeepAliveRequests 100</p>
<p># ServerSignature<br />
# 配置服务器生成页面的页脚, 默认值: ServerSignature Off<br />
# 语法: ServerSignature On|Off|EMail</p>
<p># 应用:<br />
# Listen 80<br />
# ServerRoot "C:/Program Files/Apache Group/Apache2"<br />
# ServerAdmin btbtd@yahoo.com.cn<br />
# DocumentRoot "I:/gi-2288"<br />
# DirectoryIndex index.php index.php3 index.html index.htm<br />
# ServerName gi.2288.org<br />
# DefaultLanguage zh-CN<br />
# AddDefaultCharset utf-8<br />
# AddDefaultCharset Off<br />
# AddHandler cgi-script .cgi .pl<br />
# AccessFileName .htaccess<br />
# Timeout 300<br />
# TypesConfig conf/mime.types<br />
# ErrorLog "G:/Apache/dummy-gi.2288.org.80-error_log"<br />
# LogLevel warn<br />
# CustomLog logs/access.log common<br />
# ServerTokens Prod[uctOnly]<br />
# ServerSignature Off</p>
<p>########02. 　虚拟主机</p>
<p># Listen 80<br />
# 设定监听端口</p>
<p># NameVirtualHost 192.168.1.2:80<br />
# 名字／端口型 虚拟主机</p>
<p>#<br />
#<br />
# 虚拟主机段</p>
<p># ServerAdmin btbtd@yahoo.com.cn<br />
# 联系管理会用的信箱<br />
# DocumentRoot "I:/gi-2288"<br />
# 站点根目录<br />
# ServerName gi.2288.org<br />
# 域名<br />
# ErrorLog "G:/Apache/dummy-gi.2288.org.80-error_log"<br />
# 错误日志 # 日志记录是好东西，注意查看日志记录<br />
# －－－－－－－－－－－－以上是虚拟主机内容</p>
<p># 完整应用:<br />
# Listen 80<br />
# NameVirtualHost 192.168.1.2:80<br />
#<br />
# ServerAdmin btbtd@yahoo.com.cn<br />
# DocumentRoot "I:/gi-2288"<br />
# ServerName gi.2288.org<br />
#</p>
<p>########03. + Alias</p>
<p># 语法: ...<br />
# 封装一组指令，使之仅对具有某个名字的文件系统目录及其子目录起作用。</p>
<p># 不允许目录浏览, 例:<br />
# Alias /document "J:/Document/"<br />
#<br />
# Options FollowSymLinks<br />
# AllowOverride none<br />
# Order allow,deny<br />
# Allow from all<br />
#</p>
<p># 允许目录浏览, 例:<br />
# Alias /document "J:/Document/"<br />
#<br />
# Options Indexes<br />
# AllowOverride none<br />
# Order allow,deny<br />
# Allow from all<br />
#</p>
<p># Allow &amp; Deny</p>
<p># Allow和Deny指令可以允许或拒绝来自特定主机名或主机地址的访问，<br />
# 同时，Order指令告诉Apache处理这两个指令的顺序， 以改变过滤器。</p>
<p># Allow<br />
# 允许所有地址的访问, 例: Allow from all</p>
<p># 只允许特定IP地址访问目录, 例: Allow from 205.252.46.165</p>
<p># 只允许特定域名地址访问目录, 例: Allow from www.google.com</p>
<p># 只允许特定IP 段访问, 例: Allow from 10.10.10.0/255.255.0.0</p>
<p># Deny<br />
# 拒绝所有地址访问目录, 例: Deny from all</p>
<p># 拒绝特定域名访问目录, 例: Deny from www.google.com</p>
<p># 拒绝特定IP访问目录, 例: Deny from 218.15.84.152</p>
<p># 拒绝某个IP段访问目录, 例: Deny from 10.10.10.0/255.255.0.0</p>
<p># Allow &amp; Deny 混合使用</p>
<p># 拒绝所有地址的访问, 但接受 Google 的访问, 例:<br />
#<br />
# Options FollowSymLinks<br />
# Order Deny, Allow<br />
# Deny from all<br />
# Allow from www.google.com<br />
#</p>
<p># 接受所有地址的访问, 但拒绝 Google 的访问, 例:<br />
#<br />
# Options FollowSymLinks<br />
# Order Deny, Allow<br />
# Deny from www.google.com<br />
# Allow from all<br />
#</p>
<p># Options</p>
<p># 语法: Options [+|-]可选项 [[+|-]可选项] ...</p>
<p># 配置在特定目录使用哪些特性,<br />
# Options指令控制了在特定目录中将使用哪些服务器特性。<br />
# 可选项能设置为None，在这种情况下，将不启用任何额外特性。<br />
# 或设置为以下选项中的一个或多个：</p>
<p># All, 除MultiViews之外的所有特性。这是默认设置。</p>
<p># ExecCGI, 允许执行CGI脚本.</p>
<p># FollowSymLinks, 服务器会在此目录中使用符号连接。<br />
# 注意：即便服务器会使用符号连接，但它不会改变用于匹配配置段的路径名。<br />
# 注意：如果此配置位于配置段中，则此设置会被忽略。</p>
<p># Includes, 允许服务器端包含。</p>
<p># IncludesNOEXEC,允许服务器端包含，但禁用#exec命令和#exec CGI。<br />
# 但仍可以从ScriptAliase目录使用#include 虚拟CGI脚本。</p>
<p># Indexes, 如果一个映射到目录的URL被请求，<br />
# 而此目录中又没有DirectoryIndex（例如：index.html.zh-cn.gb2312），<br />
# 那么服务器会返回一个格式化后的目录列表。</p>
<p># MultiViews,允许内容协商的多重视图。</p>
<p># SymLinksIfOwnerMatch, 服务器仅在符号连接与其目的目录或文件拥有者具有同样的用户id时才使用它。<br />
# 注意：如果此配置出现在配置段中，此选项将被忽略。</p>
<p># AllowOverride</p>
<p># 语法: AllowOverride All|None|指令类型 [指令类型] ...<br />
# 说明: 允许存在于.htaccess文件中的指令类型</p>
<p># 当服务器发现了一个.htaccess文件（由AccessFileName指定）时，<br />
# 它需要知道在这个文件中声明的哪些指令能覆盖在此之前指定的访问信息。</p>
<p># AllowOverride仅在小节中才是有效的。在或小节中都是无效的。</p>
<p># 如果此指令设置为None，那么.htaccess文件将被完全忽略。<br />
# 在这种情况下，服务器甚至都不会试着从文件系统读取.htaccess文件。<br />
# 当此指令设置为All时，所有具有.htaccess 上下文的指令都允许出现在.htaccess文件中。</p>
<p>########4. .htaccess</p>
<p># 提示:允许使用 .htaccess 文件将会导致服务器性能的下降。<br />
# 另外，每次请求一个页面时，都需要读取.htaccess文件。</p>
<p># 开启 .htaccess 支持必须 这样设置 AllowOverride all, 例:</p>
<p># Alias /v "J:/pwd/"<br />
#<br />
# Options Indexes<br />
# AllowOverride all<br />
# Order allow,deny<br />
# Allow from all<br />
#</p>
<p># 如果网络站点上有些敏感信息或只希望为一个小群体所访问，<br />
# 这里介绍几个方法确保使用户只能访问允许被访问的资源。</p>
<p># 通常在 段或针对单个目录的配置文件(.htaccess files)。<br />
# 如果希望使用 .htaccess 文件， 则必须设置服务器以允许在这些文件中使用认证指令，<br />
# 即，用 AllowOverride 指令 指定哪些指令在针对单个目录的配置文件中有效。</p>
<p># 用密码来保护服务器上的目录, 首先需要建立一个密码文件。<br />
# 这个文件可以放在不能被网络访问的位置，以避免被下载，</p>
<p># 例如: G:\Apache 以外的空间不能被网络访问，<br />
# 那么可以考虑把密码文件放在 G:\Apached 目录中。</p>
<p># Apache在其安装目录的 bin 子目录中提供了叫 htpasswd 的工具，</p>
<p># 以建立密码文件，可以这样使用：<br />
# (先切换到Apache 安装目录, 例: C:\Program Files\Apache Group\Apache2\bin)</p>
<p># 在命令行输入: htpasswd -c G:/Apache/passwords E</p>
<p># (这样就建立了一个用户 E, 具体按自己需要设置用户和密码)<br />
# 接着会要求你输入密码, 然后再输入一次,检验密码.</p>
<p># 这样在 G:\Apache\ 就多了一个 passwords 文件(没有后缀名)</p>
<p># Windows 下的话会用 MD5 加密密码.</p>
<p># 然后在要 设置权限的目录里建立一个 .htaccess 文件,</p>
<p># .htaccess 文件的内容是:<br />
# AuthType Basic<br />
# AuthName "Restricted Files"<br />
# AuthUserFile G:/Apache/passwords<br />
# Require user E</p>
<p># 演示页面: http://gi.2288.org:88/v<br />
# 用户: E 密码:testhtpasswd</p>
<p># 注: 目录必须允许 AllowOverride all ,这样 .htaccess 文件才能生效.</p>
<p>########5. Log</p>
<p># Apache 的日志文件可以提供非常多的信息, 很有必要了解这些日志</p>
<p># C:\Program Files\Apache Group\Apache2\logs (Windows 中的日志文件存放处)<br />
# access.log(访问日志,了解客户端所访问的内容) &amp; error.log(错误日志)</p>
<p># 自定义日志格式</p>
<p># mod_log_config<br />
# 状态: Base<br />
# 说明: 将对服务器发起的请求记录到日志<br />
# 默认: CustomLog logs/access.log common</p>
<p># 推荐设置:<br />
# CustomLog logs/access_log "%h %l %u %t "%r" %s %b "%{Referer}i" "%{User-Agent}i""</p>
<p># LogFormat<br />
# 默认值: LogFormat "%h %l %u %t \"%r\" %>s %b"<br />
# 语法: LogFormat format|nickname [nickname]<br />
# 说明: 定义日志文件里的记录格式<br />
# 例: LogFormat "%v %h %l %u %t \"%r\" %>s %b" vhost_common</p>
<p># CustomLog<br />
# 状态: Base<br />
# 语法: CustomLog file|pipe format|nickname [env=[!]environment-variable]<br />
# 说明: 设定日志的文件名和格式<br />
# 例: CustomLog logs/access_log "%h %l %u %t \"%r\" %>s %b"</p>
<p># ErrorLog<br />
# 语法: ErrorLog 文件路径|syslog[:facility]<br />
# 默认值: ErrorLog logs/error_log (Unix) ErrorLog logs/error.log (Windows and OS/2)<br />
# 说明: 定位服务器存放错误日志的位置<br />
# 例: ErrorLog "G:/Apache/dummy-gi.2288.org.88-error_log"</p>
<p># CookieLog<br />
# 语法: CookieLog filename<br />
# 说明: 设定针对cookies的日志文件名<br />
# 模块: mod_log_config</p>
<p># RewriteLog<br />
# 语法: RewriteLog file-path<br />
# 说明: 设置重写引擎日志的文件名<br />
# 模块: mod_rewrite<br />
# 例: RewriteLog "/usr/local/var/apache/logs/rewrite.log" (Unix/Linux)<br />
# RewriteLog "G:/Apache/rewrite.log" (Windows)</p>
<p># 一些常见的格式串如下所示：</p>
<p># 能用日志格式（CLF）: "%h %l %u %t \"%r\" %>s %b"</p>
<p># 带虚拟主机的通用日志格式: "%v %h %l %u %t \"%r\" %>s %b"</p>
<p># NCSA扩展/组合日志格式: "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-agent}i\""</p>
<p># Referer日志格式: "%{Referer}i -> %U"</p>
<p># Agent （Browser）日志格式: "%{User-agent}i"</p>
<p>########6.URL Rewrite</p>
<p># 注意：根据你的服务器配置，可能有必要对例子作些微修改，<br />
# 比如，新启用 mod_alias 和 mod_userdir 时要增加[PT]标志，<br />
# 或者重写 .htaccess 而不是单个服务器中的规则集。<br />
# 对一个特定的规则集应该首先去理解而后再去用以避免出问题。</p>
<p># 重写语法<br />
# RewriteEngine on<br />
# RewriteRule ^/$ /www/ [R]</p>
<p># 一般重写方法</p>
<p># 重写页面：http://gi.2288.org:88/modules/news/index.php<br />
# RewriteRule /modules/news/index.htm$ /modules/news/index.php<br />
# 完成页面: http://gi.2288.org:88/modules/news/index.htm</p>
<p># 重写页面： http://gi.2288.org:88/modules/news/index.php?storytopic=2<br />
# RewriteRule /modules/news/topic_(.*)\.htm$ /modules/news/index.php?storytopic=$1<br />
# 完成页面: http://gi.2288.org:88/modules/news/topic_2.htm</p>
<p># 重写页面：http://gi.2288.org:88/index.php?storytopic=2start=10<br />
# RewriteRule /topic(.*)-(.*)\.htm$ /index.php?storytopic=$1&amp;start=$2<br />
# 完成页面: http://gi.2288.org:88/topic2-2.htm</p>
<p># 注: 每增加一个重写ID,必须累加$1<br />
# 比如页面: http://gi.2288.org:88/ct=2x=10y=20<br />
# 可以这样重写:<br />
# RewriteRule /ct(.*)-(.*)-(.*)\.htm$ /ct=$1x=$2y=$3<br />
# 效果: http://gi.2288.org:88/ct2-10-20.htm</p>
<p># 移动宿主目录到不同的网站服务器</p>
<p># 说明:<br />
# 通常，许多网管在建立一个新的网站服务器时，都会有这样的要求：<br />
# 重定向一个网站服务器上的所有宿主目录到另一个网站服务器</p>
<p># 方案:<br />
# 很简单，用mod_rewrite。在老的网站服务器上重定向所有的URL<br />
# /~user/anypath到http://newserver/~user/anypath。</p>
<p># RewriteEngine on<br />
# RewriteRule ^/~(.+) http://newserver/~$1 [R,L]</p>
<p># 依赖于浏览器的内容</p>
<p># 说明:<br />
# 至少对重要的顶级页面，有时候有必要提供依赖于浏览器的最佳的内容，<br />
# 即对最新的Netscape提供最大化的版本，对Lynx提供最小化的版本，<br />
# 而对其他的浏览器则提供一个功能一般的版本。</p>
<p># 方案:<br />
# 对此，内容协商无能为力，因为浏览器不提供其那种形式的类型，<br />
# 所以只能在HTTP头"User-Agent"上想办法。<br />
# 以下规则集可以完成这个操作：<br />
# 如果HTTP头"User-Agent"以"Mozilla/3"开头，<br />
# 则页面foo.html 被重写为foo.NS.html ，而后重写操作终止；<br />
# 如果是"Lynx"或者版本号为1和2的"Mozilla"，则重写为foo.20.html ；<br />
# 而其他所有的浏览器收到的页面则是foo.32.html ：</p>
<p># RewriteCond %{HTTP_USER_AGENT} ^Mozilla/3.*<br />
# RewriteRule ^foo\.html$ foo.NS [L]</p>
<p># RewriteCond %{HTTP_USER_AGENT} ^Lynx/.* [OR]<br />
# RewriteCond %{HTTP_USER_AGENT} ^Mozilla/[12].*<br />
# RewriteRule ^foo\ $ foo.20 [L]</p>
<p># RewriteRule ^foo\ $ foo.32 [L]</p>
<p># 阻止Robots</p>
<p># 说明:<br />
# 如何阻止一个完全匿名的robot取得特定网络区域的页面？<br />
# 一个/robots.txt文件可以包含若干"Robot Exclusion Protocol(robot排除协议)"的行，<br />
# 但不足以阻止此类robot。</p>
<p># 方案:<br />
# 可以用一个规则集以拒绝对网络区域/~quux/foo/arc/<br />
# (对一个很深的目录区域进行列表可能会使服务器产生很大的负载)的访问。<br />
# 还必须确保仅阻止特定的robot，就是说，仅仅阻止robot访问主机是不够的，<br />
# 这样会同时也阻止了用户访问该主机。为此，就需要对HTTP头的User-Agent信息作匹配。</p>
<p># RewriteCond %{HTTP_USER_AGENT} ^NameOfBadRobot.*<br />
# RewriteCond %{REMOTE_ADDR} ^123\.45\.67\.[8-9]$<br />
# RewriteRule ^/~quux/foo/arc/.+ - [F]</p>
<p># 防止盗链图片</p>
<p># 说明:<br />
# 假设，http://gi.2288.org:88/myalbum/有一些内嵌图片的页面，<br />
# 这些图片很好，所以就有人用超链连到他们自己的页面中了。<br />
# 由于这样徒然增加了我们的服务器的流量，因此，我们不愿意这种事情发生。</p>
<p># 方案:<br />
# 虽然，我们不能100%地保护这些图片不被写入别人的页面，<br />
# 但至少可以对发出HTTP Referer头的浏览器加以限制。</p>
<p># RewriteCond %{HTTP_REFERER} !^$<br />
# RewriteCond %{HTTP_REFERER} !^http://gi.2288.org:88/myalbum/.*$ [NC]<br />
# RewriteRule .*\.gif$ - [F]</p>
<p># RewriteCond %{HTTP_REFERER} !^$<br />
# RewriteCond %{HTTP_REFERER} !.*/foo-with-gif\.html$<br />
# RewriteRule ^inlined-in-foo\.gif$ - [F]</p>
<p>########7.其他</p>
<p># 禁止盗链<br />
# SetEnvIfNoCase Referer "^http://gi.2288.org:88/" local_ref=1<br />
#<br />
# Order Allow,Deny<br />
# Allow from env=local_ref<br />
#</p>
<p># 加载 PHP 5<br />
# LoadModule php5_module c:\php\php5apache2.dll<br />
# #AddModule mod_php4.c<br />
# AddType application/x-httpd-php .php<br />
# ScriptAlias /php/ "c:/php/"<br />
# AddType application/x-httpd-php .php<br />
# Action application/x-httpd-php "/php/php-cgi.exe"</p>
<p># 以服务方式运行Apache for Windows</p>
<p># 你可以像下面这样将Apache安装为Windows NT服务：apache -i -n "服务名"</p>
<p># 要安装一个使用特定配置的服务，安装时指定配置文件：<br />
# apache -i -n "服务名" -f "\my server\conf\my.conf"</p>
<p># 要移除一个Apache服务，使用: apache -u -n "服务名"</p>
<p># 注: 如果没有指定服务名，缺省地，将使用"Apache"。</p>
<p># 一旦服务被安装，你可以使用-n选项和其他选项一起访问该服务的配置文件。<br />
# 例如：测试一个服务的配置文件：apache -n "服务名" -t</p>
<p># 启动一个使用某服务配置文件的控制台Apache：apache -n "服务名"</p>
<p># 控制服务方式的Apache</p>
<p># 启动、重启及关闭/停止Apache服务：<br />
# apache -n "服务名" -k start<br />
# apache -n "服务名" -k restart<br />
# apache -n "服务名" -k shutdown<br />
# apache -n "服务名" -k stop</p>
<p># 或使用NT本机命令NET来启动和停止Apache服务，像这样：<br />
# NET START "服务名"<br />
# NET STOP "服务名"</p>

---

[📚 返回目录](/needisme-mu-lu/)
