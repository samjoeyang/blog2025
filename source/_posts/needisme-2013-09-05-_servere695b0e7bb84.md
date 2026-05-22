---
title: "$_SERVER数组"
date: 2013-09-05 21:45:20
categories: NeedIsMe
tags: ["PHP"]
---

<p>$_SERVER 是一个包含了诸如头信息(header)、路径(path)、以及脚本位置(script locations)等等信息的数组。这个数组中的项目由 Web 服务器创建。不能保证每个服务器都提供全部项目；服务器可能会忽略一些，或者提供一些没有在这里列举出来的项目。</p>
<p>在 $_SERVER 中，你也许能够，也许不能够找到下面的这些元素。注意，如果以命令行方式运行 PHP，下面列出的元素几乎没有有效的(或是没有任何实际意义的)。</p>
<p>'PHP_SELF'<br />
    当前执行脚本的文件名，与 document root 有关。例如，在地址为 http://example.com/test.php/foo.bar 的脚本中使用 $_SERVER['PHP_SELF'] 将得到/test.php/foo.bar。__FILE__ 常量包含当前(例如包含)文件的完整路径和文件名。 从 PHP 4.3.0 版本开始，如果 PHP 以命令行模式运行，这个变量将包含脚本名。之前的版本该变量不可用。<br />
'argv'<br />
    传递给该脚本的参数的数组。当脚本以命令行方式运行时，argv 变量传递给程序 C 语言样式的命令行参数。当通过 GET 方式调用时，该变量包含query string。<br />
'argc'<br />
    包含命令行模式下传递给该脚本的参数的数目(如果运行在命令行模式下)。<br />
'GATEWAY_INTERFACE'<br />
    服务器使用的 CGI 规范的版本；例如，&ldquo;CGI/1.1&rdquo;。<br />
'SERVER_ADDR'<br />
    当前运行脚本所在的服务器的 IP 地址。<br />
'SERVER_NAME'<br />
    当前运行脚本所在的服务器的主机名。如果脚本运行于虚拟主机中，该名称是由那个虚拟主机所设置的值决定。<br />
'SERVER_SOFTWARE'<br />
    服务器标识字符串，在响应请求时的头信息中给出。<br />
'SERVER_PROTOCOL'<br />
    请求页面时通信协议的名称和版本。例如，&ldquo;HTTP/1.0&rdquo;。<br />
'REQUEST_METHOD'<br />
    访问页面使用的请求方法；例如，&ldquo;GET&rdquo;, &ldquo;HEAD&rdquo;，&ldquo;POST&rdquo;，&ldquo;PUT&rdquo;<br />
'REQUEST_TIME'<br />
    请求开始时的时间戳。从 PHP 5.1.0 起可用。<br />
'REQUEST_TIME_FLOAT'<br />
    请求开始时的时间戳，微秒级别的精准度。 自 PHP 5.4.0 开始生效。<br />
'QUERY_STRING'<br />
    query string（查询字符串），如果有的话，通过它进行页面访问。<br />
'DOCUMENT_ROOT'<br />
    当前运行脚本所在的文档根目录。在服务器配置文件中定义。<br />
'HTTP_ACCEPT'<br />
    当前请求头中 Accept: 项的内容，如果存在的话。<br />
'HTTP_ACCEPT_CHARSET'<br />
    当前请求头中 Accept-Charset: 项的内容，如果存在的话。例如：&ldquo;iso-8859-1,*,utf-8&rdquo;。<br />
'HTTP_ACCEPT_ENCODING'<br />
    当前请求头中 Accept-Encoding: 项的内容，如果存在的话。例如：&ldquo;gzip&rdquo;。<br />
'HTTP_ACCEPT_LANGUAGE'<br />
    当前请求头中 Accept-Language: 项的内容，如果存在的话。例如：&ldquo;en&rdquo;。<br />
'HTTP_CONNECTION'<br />
    当前请求头中 Connection: 项的内容，如果存在的话。例如：&ldquo;Keep-Alive&rdquo;。<br />
'HTTP_HOST'<br />
    当前请求头中 Host: 项的内容，如果存在的话。<br />
'HTTP_REFERER'<br />
    引导用户代理到当前页的前一页的地址（如果存在）。由 user agent 设置决定。并不是所有的用户代理都会设置该项，有的还提供了修改 HTTP_REFERER 的功能。简言之，该值并不可信。<br />
'HTTP_USER_AGENT'<br />
    当前请求头中 User-Agent: 项的内容，如果存在的话。该字符串表明了访问该页面的用户代理的信息。一个典型的例子是：Mozilla/4.5 [en] (X11; U; Linux 2.2.9 i586)。<br />
'HTTPS'<br />
    如果脚本是通过 HTTPS 协议被访问，则被设为一个非空的值。<br />
'REMOTE_ADDR'<br />
    浏览当前页面的用户的 IP 地址。<br />
'REMOTE_HOST'<br />
    浏览当前页面的用户的主机名。DNS 反向解析不依赖于用户的 REMOTE_ADDR。<br />
'REMOTE_PORT'<br />
    用户机器上连接到 Web 服务器所使用的端口号。<br />
'REMOTE_USER'<br />
    经验证的用户<br />
'REDIRECT_REMOTE_USER'<br />
    验证的用户，如果请求已在内部重定向。<br />
'SCRIPT_FILENAME'</p>
<p>    当前执行脚本的绝对路径<br />
'SERVER_ADMIN'<br />
    该值指明了 Apache 服务器配置文件中的 SERVER_ADMIN 参数。如果脚本运行在一个虚拟主机上，则该值是那个虚拟主机的值。<br />
'SERVER_PORT'<br />
    Web 服务器使用的端口。默认值为 &ldquo;80&rdquo;。如果使用 SSL 安全连接，则这个值为用户设置的 HTTP 端口。<br />
'SERVER_SIGNATURE'<br />
    包含了服务器版本和虚拟主机名的字符串。<br />
'PATH_TRANSLATED'<br />
    当前脚本所在文件系统（非文档根目录）的基本路径。这是在服务器进行虚拟到真实路径的映像后的结果。<br />
'SCRIPT_NAME'<br />
    包含当前脚本的路径。这在页面需要指向自己时非常有用。__FILE__ 常量包含当前脚本(例如包含文件)的完整路径和文件名。<br />
'REQUEST_URI'<br />
    URI 用来指定要访问的页面。例如 &ldquo;/index.html&rdquo;。<br />
'PHP_AUTH_DIGEST'<br />
    当作为 Apache 模块运行时，进行 HTTP Digest 认证的过程中，此变量被设置成客户端发送的&ldquo;Authorization&rdquo; HTTP 头内容（以便作进一步的认证操作）。<br />
'PHP_AUTH_USER'<br />
    当 PHP 运行在 Apache 或 IIS（PHP 5 是 ISAPI）模块方式下，并且正在使用 HTTP 认证功能，这个变量便是用户输入的用户名。<br />
'PHP_AUTH_PW'<br />
    当 PHP 运行在 Apache 或 IIS（PHP 5 是 ISAPI）模块方式下，并且正在使用 HTTP 认证功能，这个变量便是用户输入的密码。<br />
'AUTH_TYPE'<br />
    当 PHP 运行在 Apache 模块方式下，并且正在使用 HTTP 认证功能，这个变量便是认证的类型。<br />
'PATH_INFO'<br />
    包含由客户端提供的、跟在真实脚本名称之后并且在查询语句（query string）之前的路径信息，如果存在的话。例如，如果当前脚本是通过 URLhttp://www.example.com/php/path_info.php/some/stuff?foo=bar 被访问，那么 $_SERVER['PATH_INFO'] 将包含 /some/stuff。<br />
'ORIG_PATH_INFO'<br />
    在被 PHP 处理之前，&ldquo;PATH_INFO&rdquo; 的原始版本。</p>

---

[📚 返回目录](/needisme-mu-lu/)
