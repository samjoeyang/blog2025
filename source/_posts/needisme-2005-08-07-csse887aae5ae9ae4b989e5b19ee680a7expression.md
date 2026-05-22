---
title: "CSS自定义属性Expression"
date: 2005-08-07 18:27:57
categories: NeedIsMe
tags: ["HTML", "CSS", "HTML/CSS", "前端", ".NET"]
---

<div id="msgcns!A634C4CD7A14B666!223" class="bvMsg">
<div>
<p><a title="Permanent Link: CSS自定义属性Expression" rel="bookmark" href="http://tech.21ds.net/2004/11/30/e2addbcfd77ccfdb5411ce4497386f20/">CSS自定义属性Expression</a></p>
<div>
<p>CSS的出现使网页制作者在对网页元素的控制方便许多，当然，有利必有弊，CSS只能对颜色、大小、距离等静态样式有效，对于要实现某些html元素的动态样式就显得有些力不从心。</p>
<p>有了CSS的自定义属性Expression，可以自己定义属性，自己在属性里写需要的代码，这样就可以结合CSS的特性与JS特效，实现对整体页面上相同元素的控制。是不是觉得有点不可思议？我们先拿新手们经常问的怎么消除页面上的链接虚线框为例。</p>
<p>通常的做法是：</p>
<blockquote><p><a href="link1.htm">link1</a></p>
<p><a href="link2.htm">link2</a></p>
<p><a href="link3.htm">link3</a></p></blockquote>
<p>粗看或许还体现不出采用expression的优势，但如果你的页面上有几十甚至上百个链接，这时的你难道还会机械式地Ctrl+C，Ctrl+V么，何况两者一比较，哪个产生的冗余代码更多呢？</p>
<p>采用expression的做法如下：</p>
<blockquote><p>
<a href="link1.htm">link1</a></p>
<p><a href="link2.htm">link2</a></p>
<p><a href="link3.htm">link3</a></p></blockquote>
<p>说明：里面的star就是自己任意定义的属性，你可以随自己喜好另外定义，接着包含在expression()里的语句就是JS脚本，在自定义属性与expression之间可别忘了还有一个引号，因为实质还是CSS，所以放在style标签内，而非script内。OK，这样就很容易地用一句话实现了页面中的链接虚线框的消除。不过你先别得意，如果触发的特效是CSS的属性变化，那么出来的结果会跟你的本意有差别。例如你想随鼠标的移进移出而改变页面中的文本框颜色更改，你可能想当然的会认为应该写为</p>
<blockquote></blockquote>
<p>可结果却是出现脚本出错，正确的写法应该把CSS样式的定义写进函数内，如下所示：</p>
<blockquote></blockquote>
<p>看了这么多，感觉怎么样，是不是有点概念了呢。使用CSS的自定义属性很简洁地用较少的代码实现了用JS产生的相同的效果，真正起到了事半功倍的作用，你还不赶快去试试？</p>
</div>
</div>
</div>

---

[📚 返回目录](/needisme-mu-lu/)
