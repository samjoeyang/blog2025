---
title: "CSS快速入门"
date: 2005-08-07 18:24:21
categories: NeedIsMe
tags: ["HTML", "CSS", "HTML/CSS", "前端", ".NET"]
---

<div id="msgcns!A634C4CD7A14B666!217" class="bvMsg">
<div>
<p><a title="Permanent Link: CSS快速入门" href="http://tech.21ds.net/2004/11/30/46ba6236b477cbb84714a530e36a8ff0/" rel="bookmark"><font color="#8a3207">CSS快速入门</font></a></p>
<div>
<p>&nbsp;&nbsp;&nbsp; 在当今的网页制作中，几乎所有漂亮的网页都用了CSS。 CSS是 Cascading Style Sheet的缩写，有些书上把它译为 &ldquo;层叠样式表&rdquo;。有了CSS的控制，我们的网页便会给人一种赏心悦目、工工整整的感觉，同时字体的色彩变化也使主页变得更加生动活泼。虽然只短短的十几行代码，得到的效果却不同凡响。其基本用法是在网页中插入如下格式的一段代码：<br />　　下面以一段比较典型的CSS代码为例介绍其具体用法。<br />　　例：这段代码 中间的部分共七行，可看出有这样的特点：前两行的格式分别为P &#123;&hellip;&hellip;&#125; 和 TD &#123;&hellip;&hellip;&#125; 。后五行均是 A:命令词 &#123;&hellip;&hellip;&#125; 的格式。其中前两行的作用是对网页文字的字体、大小、颜色等的控制，而后五行则是对链接的色彩及下划线的控制。<br />　　1.文字控制 <br />　　例中的前两行:<br />　　P &#123;FONT－FAMILY: 宋体; FONT－SIZE: 9pt; LINE－HEIGHT: 12pt; color:＃000000&#125; TD &#123;FONT－FAMILY: 宋体; FONT－SIZE: 9pt&#125; 说明：FONT－FAMILY:宋体;(指定网页文字的字体) FONT－SIZE:9pt;（指定网页文字的字号大小，pt是表示大小的单位）LINE－HEIGHT:12pt;（指定行与行的垂直距离，即行高）color:＃000000（指定网页文字的颜色，＃000000 代表黑色，为十六进制数）TD &#123;FONT－FAMILY:宋体;FONT－SIZE:9pt&#125;（对网页表格里的文字进行控制）<br />　　2.链接色彩变化及下划线的控制 <br />　　例中的后5行说明：<br />　　A:hover &#123;BACKGROUND－COLOR: ＃ffccff; COLOR: ＃0080ff&#125;<br />　　(hover表示鼠标指示时,链接文字背景色为＃ffccff;前景色为＃0080ff)<br />　　A:link &#123;color:＃000000;TEXT－DECORATION: none&#125;<br />　　(link表示未被访问时,链接颜色为黑色,链接无下划线.)<br />　　A:visited &#123;color:gray;TEXT－DECORATION: none&#125;<br />　　(visited表示被访问后,链接颜色为灰色,链接无下划线.)<br />　　A:active &#123;color:green;text－decoration: none&#125;<br />　　(active表示鼠标点击时,链接颜色为绿色,链接无下划线.)<br />　　A:hover &#123;TEXT－DECORATION: underline&#125;<br />　　(hover表示鼠标指示时,链接显示下划线)<br />　　注释：<br />　　none&mdash;&mdash;没有下划线<br />　　underline&mdash;&mdash;下划线<br />　　overline&mdash;&mdash;上划线<br />　　line－through&mdash;&mdash;中划线 <br />　　以上是比较典型的一段CSS代码，代码中的参数值可随意更换调试。有了CSS的预先设置，你会发现制作网页变得更轻松了。</p>
</div>
</div>
</div>

---

[📚 返回目录](/needisme-mu-lu/)
