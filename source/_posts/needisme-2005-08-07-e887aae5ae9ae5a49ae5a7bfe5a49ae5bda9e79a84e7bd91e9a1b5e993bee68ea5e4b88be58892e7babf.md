---
title: "自定多姿多彩的网页链接下划线"
date: 2005-08-07 18:29:54
categories: NeedIsMe
tags: ["HTML", "CSS", "HTML/CSS", "前端", ".NET"]
---

<div id="msgcns!A634C4CD7A14B666!227" class="bvMsg">
<div>
<p><a title="Permanent Link: 自定多姿多彩的网页链接下划线" rel="bookmark" href="http://tech.21ds.net/2004/11/30/04cfbfb06423595770f6cbe734ad1bb9/">自定多姿多彩的网页链接下划线</a></p>
<div>
<p>CSS本身没有直接提供变换HTML链接下划线的功能，但只要运用一些技巧，我们还是可以让单调的网页链接下划线变得丰富多彩。</p>
<p>一、基本原理</p>
<p>首先，自定义HTML链接下划线的第一步是创建一个图形，在水平方向重复放置这个图形即形成下划线效果。如果要显示出下划线背后的网页背景，可以使用透明的.gif图形。</p>
<p>其次，如果下划线图形的高度较大，则必须适当增加文本的高度，使得一行文本的底部与下一行文本的顶部之间有较大的空间，例如p { line-height: 1.5; }。</p>
<p>第三，为显示出自定义的下划线，必须隐藏默认的下划线，即a { text-decoration: none; }。</p>
<p>第四，为链接元素设置下划线图形，构造出自定义的下划线。假设下划线图形是underline.gif，则设置下划线图形的CSS代码为a { background-image: url(underline.gif); }。</p>
<p>第五，我们要让下划线图形在水平方向反复出现，但不能在垂直方向重复出现，否则它将被隐藏到文本的背后。要求下划线只在水平方向重复出现的代码为：a { background-repeat: repeat-x; }。</p>
<p>第六，为保证图形出现在链接文字的下方（不管字体的大小），用background-position属性将图形放在链接元素的底部。对于箭头之类的下划线图形，可能还要考虑图形在水平方向的对齐方向。假设要将下划线图形放在右下角，CSS代码为：a { background-position: 100% 100%; }。</p>
<p>第七，为了在链接文本的下方给自定义图形留出空间，必须加入适当的空白。下划线图形相对于链接文字的具体位置与文字的大小有关，但一般而言，可以先让底部空白等于下划线图形的高度，必要时再作调整。例如：a { padding-bottom: 4px; }。</p>
<p>第八，由于下划线图形放在链接元素的底部，必须保证链接不折行（如允许链接跨越多个行，则只有下面一行的链接文本下面会有自定义的下划线）。用CSS的white-space属性可以防止链接文字折行，即a { white-space: nowrap; }。</p>
<p>综上所述，为链接元素定义CSS样式属性的完整例子如：</p>
<p>a {<br />
text-decoration: none;<br />
background: url(underline.gif) repeat-x 100% 100%;<br />
padding-bottom: 4px;<br />
white-space: nowrap;<br />
}</p>
<p>如果要让自定义下划线只在鼠标停留时出现，只要把原来直接设置在链接元素上的CSS background属性改到:hover ，例如：</p>
<p>a {<br />
text-decoration: none;<br />
padding-bottom: 4px;<br />
white-space: nowrap;<br />
}</p>
<p>a:hover {<br />
background: url(underline.gif) repeat-x 100% 100%;<br />
}</p>
</div>
</div>
</div>

---

[📚 返回目录](/needisme-mu-lu/)
