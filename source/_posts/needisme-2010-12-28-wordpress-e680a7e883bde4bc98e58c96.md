---
title: "wordpress 性能优化"
date: 2010-12-28 21:47:00
categories: NeedIsMe
tags: ["互联网", "HTML", "CSS", "SQL", "PHP", "WordPress"]
---

<p>原文地址：http://wangyueblog.com/2010/12/15/wordpress-performance-optimization/</p>
<p>前段时间，主机供应商Hellohost提醒我的资源占用有点高了，同时也有几个朋友反映博客页面载入速度有点慢，我觉得是时候对博客进行一些优化了，可是这方便又不怎么在行。刚好bbayou同学投了一篇关于wordpress性能优化的文章，于是，放出来供自己和需要的朋友参考。以下是投稿内容，原文在<a title="wordpress性能优化" href="http://www.auu.name/423/index.html">这里</a>。<br />
wordpress 并不是那么智能，我们都知道插件太多的情况下，网站打开速度会越来越慢，而php绝对不会是性能的瓶颈，因此，一个原因可能是因为过多的mysql查询，增加了系统负载。这个问题，插件<a rel="nofollow" href="http://wordpress.org/extend/plugins/wp-super-cache/">super cache</a> （全静态化缓存）可以轻松解决掉，那第二个原因呢，也许就出在网站的前端上了。比如，插件会有自己的JS/CSS/img文件读取方式，从而产生出了过多的HTTP请求。这些多余的请求以及加载方式，同样也有办法被轻易的解决掉。这里我以我的网站为例，加以说明。令人欣慰的是，优化后，我的网站速度有了明显提升（打开速度应该快30%以上），Yslow评级从 <strong>C</strong> 上升到 <strong>A</strong>。</p>
<p><img src="http://lh5.ggpht.com/_6yYTDeH8b5M/SVXg2VS68TI/AAAAAAAABLU/FWyOwDrX9OA/s800/wordpress-5-year-olds.jpg" alt="" /></p>
<h3>优化前</h3>
<blockquote><p>1.这是Firefox的插件<a href="https://addons.mozilla.org/zh-CN/firefox/addon/1843/"> Firebug </a>抓取的瀑布式HTTP请求.</p>
<p><a href="http://wangyueblog.com/wp-content/uploads/5.jpg"><img title="HTTP请求" src="http://wangyueblog.com/wp-content/uploads/5-500x288.jpg" alt="" width="500" height="288" /></a><a href="http://wangyueblog.com/wp-content/uploads/6.jpg"><img title="timeline" src="http://wangyueblog.com/wp-content/uploads/6-500x287.jpg" alt="" width="500" height="287" /></a>可以看到，优化前，我的网站有15个HTTP请求。耗时1.09秒.</p>
<p>2.然后分别用Firefox插件 <a href="http://code.google.com/intl/zh-CN/speed/page-speed/download.html#extension-rel">PageSpeed</a> 和 <a href="http://developer.yahoo.com/yslow/">Yslow</a> 进行一些分析，优化前，我的Yslow评分为<strong>C</strong>，同时也智能的列出了一些优化方案，事实上，我们的要做的工作就在其中。</p>
<p><a href="http://wangyueblog.com/wp-content/uploads/42.jpg"><img title="wordpress优化" src="http://wangyueblog.com/wp-content/uploads/42-500x244.jpg" alt="" width="500" height="244" /></a></p></blockquote>
<h3>着手优化</h3>
<blockquote><p><strong>1.减少HTTP请求</strong></p>
<blockquote><p>可以看到共产生的15个HTTP中，有1个来自html文档，4个来自CSS，3个来自JS，2个来自blog图片，5个来自CSS中使用的背景图片。</p>
<p>其中的3个CSS 请求来自插件：Pagenavi，EasyArchives，Syntax。分别读取了自己的css文件，而事实上，完全可以将他们的样式写入 style.css 内，然后再后台设置插件不读取自己的CSS，从而减少3个HTTP请求。</p>
<p>其中的5个CSS背景图片，可以用PS进行合并，合成一张图片，然后用 background-position 来显示。这样又可以减少4个HTTP请求。</p>
<p>之后，还有3个JS文件，一个来自插件 Collapsing Categories，一个来自 google 分析，另一个是整站使用的 Jquery 库。还算OK。因为我已经在后台将插件 Collapsing Categories 自带的 Jquery 库禁用。</p>
<p>最终，我们已经减少了7个HTTP请求，将总请求数减少了 40%。</p></blockquote>
<p><strong>2.gzip压缩</strong></p>
<blockquote><p>我们知道，GZIP压缩可以非常有效的减少传输的数据量大小（可降低40%-60%），数据量小了，从服务端返回给浏览器的时间也就缩小了。</p>
<p>推荐一个在线工具，可检查文件是否被gzip压缩。</p>
<p>Gzip需要去服务器进行设置，并且需要支持http1.1协议的浏览器（只要不是IE5），Linux下的Gzip安装及其配置方案可以 看这篇文章。</p>
<p>如果你用的虚拟服务器，可以在.htaccess文件中加入：</p>
<div>
<ol title="Double click to hide line number.">
<li><ifmodule mod_deflate.c></li>
<li> DeflateCompressionLevel 7</li>
<li> AddOutputFilterByType DEFLATE text/html text/plain text/xml application/x-httpd-php</li>
<li> AddOutputFilter DEFLATE css js</li>
<li></ifmodule></li>
</ol>
</div>
</blockquote>
<p><strong>3.增加Expires时间</strong></p>
<blockquote><p>毕竟返回304响应还是会请求服务器，所以延长缓存时间，直接从浏览器取cache可以大大的减少网站打开速度</p>
<p>此方案需要服务器安装Expires模块，不过一般都会默认安装的（如没有，可以单独编译 mod_expires 模块解决）。所以我们要做的，只需配置 .htaccess 文件:</p>
<div>
<ol title="Double click to hide line number.">
<li><ifmodule mod_expires.c></li>
<li> ExpiresActive On</li>
<li> ExpiresDefault A604800</li>
<li> ExpiresByType text/css "access plus 2 month"</li>
<li> ExpiresByType application/x-javascript "access plus 2 month"</li>
<li> ExpiresByType image/gif "access plus 2 month"</li>
<li> ExpiresByType image/jpeg "access plus 2 month"</li>
<li> ExpiresByType image/png "access plus 2 month"</li>
<li> ExpiresByType image/x-icon "access plus 2 month"</li>
<li> ExpiresByType image/x-ico a2592000</li>
<li> ExpiresByType application/x-shockwave-flash A2592000</li>
<li></ifmodule></li>
</ol>
</div>
</blockquote>
<p><strong>4.CDN</strong></p>
<blockquote><p>CDN就是按地理位置去寻找离客户端最近的服务器，对静态内容非常管用，比如图片，视频。但是一般CDN的架设非常昂贵，不建议个人blog使用。不过，貌似有免费的CDN服务，可以去google一下。</p></blockquote>
<p><strong>5.JS放到尾部，CSS放到头部</strong></p>
<blockquote><p>将 JS 文件放到尾部，可避免下载JS时阻塞网络，影响并行下载。尤其对图片比较多的网站影响较大。因为浏览器在下载JS时，会等到JS文件全部下载完后，再进行余下的组件下载，所以将一些JS文件放到最后，让他不影响图片的下载，是个不错的选择</p>
<p>将 CSS 文件放到头部，可避免页面白屏，影响用户体验。这个大家都懂。你把CSS文件去掉，看看网站什么样就明白了。</p></blockquote>
<p><strong>6.减小JS文件大小</strong></p>
<blockquote><p>利用 JSmin 工具 ，可智能化去掉空格、回车、注释，减小JS文件约30%的大小。同理，因为文件大小的减少，可减少服务器返回响应的时间。</p>
<p>这里需要说明的是，我按照官方的方法没成功，即</p>
<p>运行 jsmin.exe，输入：jsmin  small_script.js 没反应?</p>
<p>于是只好cmd，输入：D:\jsmin\jsmin.exe  D:\jsmin\small_script.js</p></blockquote>
<p><strong>7.删除ETags</strong></p>
<blockquote><p>ETags 的问题在于它们是基于服务器唯一性的某些属性构造的。而当今大部分网站都是使用服务器集群来处理请求，这样Etag不容易命中。因此，若不需要用到ETags系统提供的灵活的验证机制，最好删除 ETag。</p>
<p>再说，Last-Modified头已经提供了基于元素时间戳的验证，而且删除ETag会减少 http 响应头的大小</p>
<p>只需在httpd.conf文件最后添加一行：FileETag none</p></blockquote>
</blockquote>
<h3>优化后</h3>
<blockquote><p>我的blog访问速度得到了很大的提升，首页的HTTP请求降为：8个，耗时0.62秒。性能提升在30%-40%左右</p>
<p>Yslow评分为：A ,很荣幸跟 google,baidu 同级~哈哈。</p>
<p><a href="http://wangyueblog.com/wp-content/uploads/a.jpg"><img title="a" src="http://wangyueblog.com/wp-content/uploads/a-500x288.jpg" alt="" width="500" height="288" /></a></p></blockquote>

---

[📚 返回目录](/needisme-mu-lu/)
