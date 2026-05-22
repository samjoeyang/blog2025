---
title: "关于Gmail安全"
date: 2010-12-13 11:19:00
categories: NeedIsMe
tags: ["Facebook", "Google Fans", "Twitter", "HTML", "Google"]
---

<p>原始来源：<a href="http://lowstz.info/archives/165">http://lowstz.info/archives/165</a>
<div>
<h3><b>目录</b></h3>
<p>
<blockquote>
<ol>
<li><a href="http://lowstz.info/archives/165#1">第0部分 前言</a> </li>
<li><a href="http://lowstz.info/archives/165#2">Gmail官方帮助篇</a> </li>
<li><a href="http://lowstz.info/archives/165#3">浏览器篇</a>
<ul>
<li><a href="http://lowstz.info/archives/165#3-1">浏览器选择</a> </li>
<li><a href="http://lowstz.info/archives/165#3-2">CNNIC证书移除和防钓鱼</a> </li>
</ul>
<p></li>
<li><a href="http://lowstz.info/archives/165#4">第三方应用篇</a>
<ul>
<li><a href="http://lowstz.info/archives/165#4-1">邮件客户端</a> </li>
<li><a href="http://lowstz.info/archives/165#4-2">官方im和多协议IM</a> </li>
<li><a href="http://lowstz.info/archives/165#4-3">慎用帐号信息导入和第三方web登录</a></li>
</ul>
<p></li>
<li><a href="http://lowstz.info/archives/165#5">补充</a> </li>
</ol>
<p></p></blockquote>
<p>
<h3><b>１.前言</b> </h3>
<p><a href="http://mail.google.com/mail/help/intl/zh-CN/about.html">Gmail作为免费邮箱服务</a>，<br />它令电子邮件简单、有效，甚至充满乐趣。其出色的安全性也是很多人钟爱它的原因。但在网络环境复杂的景德镇，Gmail的安全性也受到了极大的挑战。很容<br />易想象，如果某人的Gmail的帐号出现安全问题，那他泄漏的不仅仅是他的邮件信息那么简单，像facebook，twitter等网络服务的信息都可能<br />会一起泄漏。 <br />说到这可能会有人说网络上没有什么隐私和安全可言。我并不这么认为，我们必须承认这么一个事实&mdash;&mdash;&ldquo;没有绝对的安全&rdquo;。所以，安全对我们来说就是通过适当的解决方案来提高安全性，以提高别人的犯罪成本。</p>
<p>
<h3><b>２.Gmail官方帮助篇</b> </h3>
<p><img src="http://img.lowstz.info/images/gmailsecur.jpg" /></p>
<p>Gmail的支持页面里<a href="http://mail.google.com/support/bin/static.py?page=checklist.cs&amp;tab=29488">更新了一篇安全清单</a>，通过以下5个方法即可知道自己的Gmail是否有安全隐患：</p>
<p><a href="https://www.google.com/accounts/IssuedAuthSubTokens">在这里</a>查看授权获取Google帐户数据的网站。我自认为自己的安全功夫做的很到家，但在这里依然发现了1个奇怪的网站获得了Google帐户的访问权，赶紧ban掉 </p>
<ol>
<li>检查你浏览器的插件、扩展和第三方应用是否需要访问你的Google帐户。比如你安装了一个可检查Gmail新邮件的扩展，那么Google是无法控制这个扩展的安全性的，如果你安装了并不知名的扩展，需要小心了 </li>
<li>查看邮件设置，以确保你的Gmail邮件没有被转发出去，有四个地方的设置会有安全隐患：
<ul>
<li><a href="https://mail.google.com/mail/?shva=1#settings/general">常规</a>：检查签名、外出回复 </li>
<li><a href="https://mail.google.com/mail/?shva=1#settings/accounts">帐户</a>：检查&ldquo;用这个地址发送邮件&rdquo;、 </li>
<li><a href="https://mail.google.com/mail/?shva=1#settings/filters">过滤器</a>：检查是否有过滤器将你的邮件转发到垃圾箱、垃圾邮件，或是转发到其它邮箱里 </li>
<li><a href="https://mail.google.com/mail/?shva=1#settings/fwdandpop">转发和POP/IMAP</a>：查看这里是否有位置的帐户或邮件客户端 </li>
</ul>
<p></li>
<li>检查帐户最近的可疑活动。点击Gmail最下面的&ldquo;上次帐户活动时间&rdquo;后的&ldquo;详细信息&rdquo;链接，看看是否有可疑的IP访问了你的Gmail </li>
<li>进入设置的&ldquo;<a href="https://mail.google.com/mail/?shva=1#settings/general">常规</a>&rdquo;里，将&ldquo;浏览器连接&rdquo;设置为&ldquo;始终使用 https&rdquo;，以确保当你使用咖啡厅或酒店的公众网络访问邮箱时不会泄露信息 </li>
</ol>
<p>
<h3><b>3.浏览器篇</b></h3>
<p>
<h4>3.1 浏览器选择</h4>
<p><a href="http://www.jobbole.com/entry.php/8">IE 6 退出历史的舞台，如何选择浏览器的建议。</a> （伯乐在线） </p>
<p>微软在2010年3月1日宣布停止对IE6的主流支持，这也就意味着IE6不久就会完全退出历史舞台。事实上，IE6在现在已经属于较老版本的浏览<br />器类，很多主流的互联网应用都逐渐放弃对IE6的支持。例如：Google Docs, Google Sites, Gmail, Google<br />Calendar服务将逐渐不再支持IE6。在计算机比较普及的欧美国家，非IE浏览器的市场份额不断增加。在欧洲，Firefox甚至在2009年还超<br />越了IE6，成为市场份额第一的浏览器。作为普通的个人用户，是继续使用IE6，还是升级到更好的浏览器Firefox, IE7, IE 8,<br />Chrome, Opera, Safari 等等 只要简单对比一下就可以明白。这里用几项用户最为关注的方面来做对比。</p>
<ol>
<li><b>安全性</b>     <br />IE6是微软的产品。既然微软宣布停止对IE6的主流支持，也就不会再为IE6进行安全漏洞的修复。因此，对比有官方支持的Firefox, IE7, IE 8, Chrome, Opera, Safari 等等，IE6将会越来越不安全。 </li>
<li><b>用户体验</b>     <br />IE6最大的弱点是不缓存图片、样式文件、JS等，导致每次打开网页都需要重新下载。所以，IE浏<br />览网页相对Firefox, IE7, IE 8, Chrome, Opera, Safari<br />等等浏览器而言要慢很多。另外，由于IE6属于较老版本的浏览器，很多动态的网页效果在IE6当中无效，使用IE6的用户也就无法体会到新技术带来更好的<br />体验。 </li>
<li><b>普及性(兼容)</b>     <br />顾名思义，市场份额越高普及性越广,意味着会被很多应用所支持。根据Statcounter<br />的统计表明，2010年3月10日，所有版本IE系列浏览器的欧洲市场份额为46.44%，Firefox的市场份额为<br />39.26%，Chrome的市场份额为5.8%，Opera的市场份额为4.28%，Safari的市场份额为3.18%，其他浏览器的市场份额则为<br />1.05%。第三方机构提供的2010年2月份最新数据显示，在全球浏览器市场，IE系列浏览器市场份额为61.2%，Firefox为<br />24.2%，Opera为5.6%，Safari为4.4%。从Statcounter和第三方机构的统计来看，IE系列无疑是第一,Firefox紧随<br />其后。 </li>
<li><b>中国国情</b>     <br />中国所有银行的网银，现在都只支持IE系浏览器 (注意是指IE系列)，对其他浏览器支持不好。     <br />综上所述，对于Windows用户，如果现在使用的浏览器是IE6，明智的做法是将IE6升级到IE7或IE8。如果不愿意升级IE6，可以安装最新版本的Firefox, Chrome, Opera, Safari等安全性、普及率高，使用方便的浏览器。 </li>
</ol>
<p>
<h4>3.2 CNNIC证书移除和防钓鱼</h4>
<p>虽然Gmail可以强制使用Https，但是不要以为https就安全了，安全证书是可以伪造的，所以有很多Gmail用户在<b>不可抗拒的因素</b>下被钓鱼，例如：&ldquo;使用gmail时，会遇到原本登录的情况下还会提示输入用户名密码的情况。&rdquo;</p>
<p>最严重的是，他们对此毫不知情。所以，无论你是受害者还是局外人，请<a href="http://www.blogkid.net/archives/2711.html">小心输入你的Gmail密码</a>。</p>
<p><b>这里有几点安全建议</b></p>
<p>1. 移除你电脑中所有浏览器的CNNIC证书，具体移除教程请参考：<a href="https://felixcat.net/2010/01/throw-out-cnnic/" title="https://felixcat.net/2010/01/throw-out-cnnic/">https://felixcat.net/2010/01/throw-out-cnnic/</a></p>
<p>如果是linux用户，请自行google</p>
<p>2.修改你的Gmail密码</p>
<p>3. 坚持使用https访问Gmail，而且坚持手动输入url或把url放入书签。</p>
<p>*4. 喜欢折腾的朋友可以使用油猴脚本来进一步提高安全性。</p>
<h3><b>4.第三方应用篇</b> </h3>
<p>
<h4>4.1 邮件客户端</h4>
<p>我们平时使用Gmail的时候，除了浏览器，还有大部分人会用到邮件客户端，使用的<br />
时候，我们强烈建议使用SSL/TLS加密以保证信息传输的安全。</p>
<p>
<h4>4.2 官方im和多协议im</h4>
<p>Gmail除了可以发邮件外，它还内置了<a href="http://www.google.com/talk/index.html">Gtalk</a>，<br />而Gtalk有桌面客户端，而桌面客户端中又有分景德镇和谐版（105）和英文版（104）。这里我强力建议使用104版，英文版 gtalk<br />对聊天内容进行加密传输，并提供了&ldquo;不保存聊天记录&rdquo;和&ldquo;OTR 加密&rdquo;<br />等更多安全选项。完全可以有效保障您的聊天活动和聊天内容的安全。这对你的Gmail密码安全也是相当重要的。</p>
<p>同样，像pidgin这样的多协议聊天im中，帐号&mdash;&mdash;高级&mdash;&mdash;一定要勾选里面的使用SSL/TLS加密，这样才能大大提高Gmail帐号安全。</p>
<h4>4.3 慎用帐号信息导入或第三方web登录</h4>
<p>目前国内很多网络服务都有帐号导入或者第三方web登录，其中有相当一部分被报告为钓鱼网站，其中<a href="http://www.cnbeta.com/articles/121892.htm">WebQQ2.0 的Gmail 钓鱼</a></p>
<p>和<a href="http://www.cnbeta.com/articles/126356.htm">360的webapps</a>就都出现过，镇上局域网巨头和安全巨头都这样，那没有什么不可能了，所以一定要慎用。</p>
<p><img src="http://img.lowstz.info/images/1333270185.jpg" /> </p>
<h3><b>5.补充</b></h3>
<p>推荐阅读：<a href="http://is.gd/iBc0o">邮箱防间谍</a>                </div>

---

[📚 返回目录](/needisme-mu-lu/)
