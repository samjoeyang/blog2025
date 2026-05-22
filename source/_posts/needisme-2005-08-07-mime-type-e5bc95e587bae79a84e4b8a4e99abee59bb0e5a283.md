---
title: "MIME Type 引出的两难困境"
date: 2005-08-07 18:30:33
categories: NeedIsMe
tags: ["Mac", "HTML", "XML", "CSS", "HTML/CSS", "前端"]
---

<div id="msgcns!A634C4CD7A14B666!228" class="bvMsg">
<div>
<p><a title="Permanent Link: MIME Type 引出的两难困境" rel="bookmark" href="http://tech.21ds.net/2004/11/19/2be6acd9cef454ff8aa3c126976ceb94/">MIME Type 引出的两难困境</a></p>
<div>
<p>一切从一个糟糕的浏览器开始，它完全不支持 XHTML。<a></a></p>
<p>什么是 MIME Type？</p>
<p>为什么这么说呢？首先，我们要了解浏览器是如何处理内容的。在浏览器中显示的内容有 HTML、有 XML、有 GIF、还有 Flash&hellip;&hellip;那么，浏览器是如何区分它们，绝对什么内容用什么形式来显示呢？答案是 MIME Type，也就是该资源的媒体类型。</p>
<p>媒体类型通常是通过 HTTP 协议，由 Web 服务器告知浏览器的，更准确地说，是通过 <code>Content-Type</code> 来表示的，例如:</p>
<pre><code>Content-Type: text/html
</code></pre>
<p>表示内容是 <code>text/html</code> 类型，也就是超文本文件。为什么是&ldquo;<code>text/html</code>&rdquo;而不是&ldquo;<code>html/text</code>&rdquo;或者别的什么？MIME Type 不是个人指定的，是经过 ietf 组织协商，以 RFC 的形式作为建议的标准发布在网上的，大多数的 Web 服务器和用户代理都会支持这个规范 (顺便说一句，Email 附件的类型也是通过 MIME Type 指定的)。</p>
<p>通常只有一些在互联网上获得广泛应用的格式才会获得一个 MIME Type，如果是某个客户端自己定义的格式，一般只能以 <code>application/x-</code> 开头。</p>
<p>XHTML 正是一个获得广泛应用的格式，因此，在 <a href="http://www.ietf.org/rfc/rfc3236.txt">RFC 3236</a> 中，说明了 XHTML 格式文件的 MIME Type 应该是 <code>application/xhtml+xml</code>。</p>
<p>当然，处理本地的文件，在没有人告诉浏览器某个文件的 MIME Type 的情况下，浏览器也会做一些默认的处理，这可能和你在操作系统中给文件配置的 MIME Type 有关。比如在 Windows 下，打开注册表的&ldquo;<code>HKEY_LOCAL_MACHINESOFTWAREClassesMIMEDatabaseContent Type</code>&rdquo;主键，你可以看到所有 MIME Type 的配置信息。</p>
<p>浏览器处理 XHTML 和 HTML 有什么区别？</p>
<p>HTML 的语法过于随意了，有许多简写，标记不匹配的复杂情况，同时长期 Web 发展下来积累下来了许多错误的用法&mdash;&mdash;比如一个文档里完全没有 标记&mdash;&mdash;但浏览器还是得支持它，可想而知，为了支持这些&ldquo;Tag Soup&rdquo;&mdash;&mdash;也就是我们所说的那些，乱成一锅粥的标签&mdash;&mdash;浏览器要很费力地去猜测一段标记的意思，努力以用户期望的形式表达出来。一句话说，虽然 HTML 4.01 允许你用语义化、结构化的、内容与表现分离的方法来书写标记，但由于它沿袭了 HTML 这种格式，使得浏览器对于凡是 MIME Type 为&ldquo;<code>text/html</code>&rdquo;的文件，都得采用一种非常费劲的方法去处理，这对于 Web 的发展是很不利的。</p>
<p>再说除了浏览器，还有许多其他的用户代理要阅读 HTML：纯文本的浏览工具、读屏器等等。</p>
<p>创造 XHTML，很大一部分原因正是要通过 XML 重新严格地规范一遍标记，让这些用户代理可以以一种更简便的方式来解析这些标记。因此，XHTML 这种新的格式，天生就要求内容的发布者必须以严格的方式来标记自己的文档。</p>
<p>当然，XHTML 对于内容提供者也有好处，此处先不展开，详见下文。</p>
<p>MIME Type 与之又有什么关系？</p>
<p>把前两节的内容合起来，你显然可以发现：一个正常支持 XHTML 的浏览器会根据服务器提供的 MIME Type 是 <code>text/html</code> 还是 <code>application/xhtml+xml</code> 来区分获取到的内容是 HTML 还是 XHTML，对这两种格式，分别以两种不同的方式来解析文档，后者解析起来要严格得多，但对于用户代理开发者和内容提供者都有很大的好处。</p>
<p>那么，那些浏览器正常的支持了 XHTML 呢？答案是 Mozilla、基于 Mozilla 的浏览器如 Netscape 7 和 Firefox、较新版本的 Opera 和 Safari 等等。但不包括 Microsoft Internet Explorer。问题是，这一&ldquo;不包括&rdquo;，就除掉了大约 90% 的浏览器市场啊，在我们抓狂以前，先来看看 IE 是什么处理 <code>application/xhtml+xml</code> 的：IE 不认得这种 MIME Type，它要么提示你是否下载那个文件，要么就把文件内容当作纯文本显示出来，反正是不可能正常显示标记。</p>
<p>这正是造成我们不得不给 XHTML 文档标以 <code>text/html</code> 的原因 <a href="http://jjgod.3322.org/2004/11/14/mime-type-oyouaaana/#footnote-1">1</a>，实际上，目前 Web 上 95% 的 XHTML，都是扮成 HTML 的 XHTML (包括 w3.org)，浏览器 (包括我们引以为傲的 Mozilla) 压根没有用 XML 解析器去解析那些 XHTML，而是沿用处理标签汤的老办法。</p>
<p>这个时候你会问了，在我看起来，老办法显示得很好啊，干吗为此感到头疼呢？问题正是出在&ldquo;看起来&rdquo;这个词上，实际上，一些细微但是不可忽略的差别仍然存在。</p>
<p>用 <code>application/xhtml+xml</code> 方式解析 XHTML 与用 <code>text/html</code> 方式解析的差别</p>
<p>下面所说的&ldquo;HTML&rdquo;，就是指 <code>text/html</code> 的解析方式；相应地&ldquo;XHTML&rdquo;就是指&ldquo;<code>application/xhtml+xml</code>&rdquo;的解析方式。</p>
<ol>
<li>这是最重要的，严格的 XML 解析至少要求文档是 well-formed 的，也就是标签要正确开闭，<code>&amp;</code> 等 XML 实体要正确使用。</li>
<li>在 HTML 中 是用户所能看到的全部视域，给 <code>body</code> 设置背景色就是给整个文档设置了背景色，但在 XHTML 中并非如此，给 设定背景色的效果和给 设定的不同。</li>
<li>在 HTML 中 CSS 规则中对元素的匹配是大小写不敏感的，BODY 和 body 匹配的是同一个元素，但在 XHTML 中却是大小写敏感的。</li>
<li>在注释中隐藏的 JavaScript 脚本会被 XHTML 忽略。</li>
<li><code>document.write()</code> 不能在 XHTML 中使用。</li>
<li>HTML DOM 和 XHTML DOM 的元素和属性返回值是不同的，HTML 中是大写，XHTML 中是小写。</li>
<li>还有不少其他的 DOM 问题。</li>
</ol>
<p>总结起来就是，我们正在广泛使用的其实是一种看起来已经 XHTML 化的 HTML，想象一下吧，如果要求所有这些网站立即把 MIME Type 换成 <code>application/xhtml+xml</code>，即便用可以正常解析 XHTML 的浏览器来浏览，它们多数会死在前面列举的某一条原因下，无法正常显示。然而这不好说是 XHTML 的错，正常的处理理应如此，只不过我们一直被纵容了。</p>
<p>可是 W3C 还是不断要求我们以正确的 MIME Type 来提供 XHTML，为什么呢？因为我们要用到 XHTML 提供的好处啊，只有被认为是 XHTML 或者 XML 文档的东西，浏览器才会启用这些&ldquo;好处&rdquo;，比如你可以试着在 IE 中打开 XHTML 中嵌入的 MathML 看看，没有效果，它被当作 HTML 一样显示。</p>
<p>现在的问题是，既然把文档设定为真正的 XHTML 是如此的麻烦，会带来如此多的问题，干吗不舒舒服服地呆在 HTML 上呢？为什么要往 XHTML 过渡？XHTML 提供的&ldquo;好处&rdquo;值得我们为此付出如此多的代价吗？</p>
<p>XHTML 的优势</p>
<p>最重要的两点是：</p>
<ol>
<li>除了前面讨论的用户代理易于处理以外，实际上，大量的基于 XML 的工具，许多对 XML 有很好支持的编程语言，都能够方便地解析你的文档，从中提取出需要的信息。当然，也包括搜索引擎。</li>
<li>你可以利用 XHTML 继承自 XML 的良好的扩展性，比如在 XHTML 中嵌入 RDF 数据，描述文档的语义信息；加入 MathML 标记，描述数学公式；加入 SVG 标记，使用可伸缩矢量图型。</li>
</ol>
<p>显然，如果文档连 well-formed 都做不到，优点 1 对你是无效的，就算有效吧，就个人来说，其实也没有多少人对 XHTML 进行 XML 解析，因为能做到的，大概也就是从 <code>h1</code>、<code>h2</code> 这些标记中读出文档结构一类的功能，实在没什么大用处。</p>
<p>而第二点对大多数内容提供者来说，太远了，RDF 是什么东东？加入 RDF 信息有什么好处？没多少人知道或者有兴趣知道；MathML？这是可扩展性目前用得最多的地方，因为很多 MathML 阅读和编辑工具已经普及了，但如果你不是个成天在公式中打转的科学工作者，多半对此也没有兴趣；SVG 呢？倒是挺有意思，但目前显然没有获得广泛的应用，事实上，日后能否获得广泛的应用，还要看它能不能在与 Flash 的竞争中活下来：成为标准的东西被人抛弃也是常有的事。</p>
<p>总结起来，所有这些优点几乎都是一些空头支票，一些未来才能实现甚至未来都不知道能不能实现的东西，比如说你现在在开发一个 CMS 系统，如果现在都已经不能保证里面的内容 well-formed，有什么理由说以后，数据越来越多以后，反而会回头去把错误的标记一一改正？</p>
<p>事实上，用不到这些空头支票，我们的生活几乎没有受到任何影响。</p>
<p>那么，是否这就是说，XHTML 几乎就是一个鸡肋了 ？</p>
<p>XHTML 啊 XHTML</p>
<p>行文至此，已经陷入了僵局，其实我本无意把 XHTML 说得那么差的，但问题是我每句说的都是实话呀，也没有忽略什么有必要提到的因素，但反复查考，总结起来还是那一句话：XHTML 其实是一个带一点理想主义的，对普通用户来说，相比 HTML 4.01 并没有显见优势的格式。</p>
<p>于是我们就陷入了两难困境：刨掉那些花言巧语，没有任何显见的优点吸引我们我们转向 XHTML，但如果我们永远躺在 HTML 4.01 舒服的被窝里，Web 岂不是永不前进了？</p>
<p>答案还是个问号。</p>
<p>小结</p>
<p>本来，仅仅为了未来的锦绣图景，大家多数还是愿意转向 XHTML 的，这大概是个博弈论中微妙的平衡，用户、浏览器厂家、标准制定者三家玩的一个游戏，但 IE 打破了这个平衡：它不支持 <code>application/xhtml+xml</code>，于是用户只好都以 <code>text/html</code> 来发布 XHTML 页面。</p>
<p>如果把他们人格化：我觉得&ldquo;用户&rdquo;大概是个剃头挑子一头热的家伙，他们为自己的 XHTML 页面在一切浏览器上都如此美好而感到满意，却浑不知道背后其实还是 HTML，自己没沾着一点&ldquo;X&rdquo;的好处。</p>
<p>这时标准制定者&mdash;&mdash;他一定是个理想主义者&mdash;&mdash;也不满意，因为用户其实还是在以 HTML 的方式来写 XHTML 的，根本没准备好向 XHTML 进行转变的决心，标准制定者一心领着大家往 Web 美好的未来远航，却发现无论是用户还是浏览器厂商都在尽给他添乱。</p>
<p>浏览器厂商们&mdash;&mdash;他们拥有最大的筹码，却始终冷眼旁观&mdash;&mdash;此时却在开心地内斗，对此情况耸耸肩表示无能为力。</p>
<p>你可能会对此感到沮丧，但这的确是目前 Web 中的事实，承认也好不承认也好，确定一个目标，然后艰难而执著地前行，大概是我们这些标准推广者唯一能做的。</p>
<p>注释</p>
<ol>
<li>也并非完全没有办法，对于用 PHP 或者 ASP 这样创建的动态内容而言，通过检测 HTTP 头来进行内容协商是最好的办法：给 `Accept: ` 中包含了 `application/xhtml+xml` 的请求提供 `Content-type: application/xhtml+xml` 的数据，而给其他的请求提供 `text/html` 的数据。(在 456 Berea Street 的一篇<a href="http://www.456bereastreet.com/lab/developing_with_web_standards/xhtml/">文章</a>详细解释了这种方法，实际上，打开 Mozilla/Firefox 的 `about:config` 页面，你可以找到相关的配置 `network.http.accept.default` 来验证一下 Mozilla 是否发送了正确的 HTTP 头。)，这几乎是一种完美的方法了 (实际上静态内容大概可以通过 Web 服务器的内容协商功能实现这种提供方式)，但考虑到本文主要的目的是探讨是否应该用 XHTML，所以不在正文中详细讨论。</li>
<li>仍旧是指对普通用户而言，事实上必须承认，XHTML 的出现对于整个 Web 本身的长远发展绝对有好处。</li>
<li>其实话不该说得那么绝，应该说 XHTML 的出现是绝对有必要的，但其带来的好处绝大部分是对 Web 本身的，长远的，现在难以看出的好处，对用户或者开发者的好处微乎其微。</li>
</ol>
<p>参考文献</p>
<ol>
<li>Ian Hickson, <a href="http://hixie.ch/advocacy/xhtml">Sending XHTML as text/html Considered Harmful</a></li>
<li>Gez Lemon, <a href="http://juicystudio.com/all-in-the-mime.asp">It&rsquo;s all in the MIME</a></li>
<li>Gez Lemon, <a href="http://juicystudio.com/tutorial/xhtml/mime.asp">Specifying a MIME Type</a></li>
<li>Roger Johansson, <a href="http://www.456bereastreet.com/lab/developing_with_web_standards/full/">Developing With Web Standards, Recommendations and best practices, Part 5: XHTML</a></li>
<li>Network Working Group, <a href="http://www.ietf.org/rfc/rfc3236.txt">The &lsquo;application/xhtml+xml&rsquo; Media Type</a></li>
<li>Tommy Olsson, <a href="http://www.autisticcuckoo.net/archive.php?id=2004/11/03/content-negotiation">Content Negotiation</a></li>
<li>W3C, <a href="http://www.w3.org/TR/2002/NOTE-xhtml-media-types-20020801/xhtml-media-types.html#text-html">XHTML Media Types</a></li>
</ol>
</div>
</div>
</div>

---

[📚 返回目录](/needisme-mu-lu/)
