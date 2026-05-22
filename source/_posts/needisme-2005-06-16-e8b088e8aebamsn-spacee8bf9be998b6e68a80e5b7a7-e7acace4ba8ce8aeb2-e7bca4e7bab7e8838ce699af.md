---
title: "谈论MSN Space进阶技巧"
date: 2005-06-16 01:34:52
categories: NeedIsMe
tags: ["WordPress", "HTML"]
---

第二讲 缤纷背景
author:
  display_name: Samjoe Yang
  login: blogerlogin
  email: youremail@example.com
  url: http://needis.me
author_login: blogerlogin
author_email: youremail@example.com
author_url: http://needis.me
wordpress_id: 33
wordpress_url: http://samjoeyang.wordpress.com/2005/06/16/%e8%b0%88%e8%ae%bamsn-space%e8%bf%9b%e9%98%b6%e6%8a%80%e5%b7%a7-%e7%ac%ac%e4%ba%8c%e8%ae%b2-%e7%bc%a4%e7%ba%b7%e8%83%8c%e6%99%af
date: '2005-06-16 01:34:52 +0800'
date_gmt: '2005-06-16 01:34:52 +0800'
categories:
- Blog
tags:
- 博客
- MSN Space
- 进阶
- 技巧
comments: []
---
<div id="msgcns!A634C4CD7A14B666!201" class="bvMsg">
原创：Loadmemory</p>
<p>MSN Space中日志的背景颜色随不同的模版类型而有所变化，但并不提供给用户自定义背景颜色的功能，但我们可以通过编辑HTML语言的方式来实现这一目的，让日志随我们的心情而变换不同的色彩。</p>
<p>编辑日志之前，先点击上一讲提到的那个&ldquo;Edit It&rdquo;按钮，然后选取编辑区域下方的HTML语法编辑选项，即将Use HTML to create your page选项挑上勾，此时即进入HTML编辑状态，你会看到页面上有如下标记</p>
<p>。将下列语句放置到编辑页面中：</p>
<p><span style="color: #cc0000;">
<div style="width:100%;height:100%;background-color:#990000;"></div>
<p></span></p>
<p>注意，这里需要你略微调整一下，将</p>
<p>嵌套在这一语句中，即如下形式：</p>
<p><span style="color: #cc0000;">
<div style="width:100%;height:100%;background-color:#990000;">
</div>
<p></span></p>
<p>在
<p>和</p>
<p>之间试着打几个字，然后点击预览日志，可以看到日志的背景颜色已经改变。当你想更改不同色彩的时候，只需将#990000这个颜色编码的数值加以调整就行了（注意不要丢了这个符号#）。如何获取自己心仪的色彩的数值呢？如果你手头有图形处理软件或网页编辑软件，使用里面的调整色彩功能，都会获取相应的数值。另外你也可以参考我提供色版。</p>
<p>在HTML编辑状态你会发现，文本编辑按钮都消失了，这种情况下处理起文字来可是有些困难，当然对高手来说，区区几个语句就能解决问题，但我们普通大众可没这本事和耐心。怎么办？好办！将Use HTML to create your page选项前的勾勾挑下去，即取消HTML语法编辑状态就可以了。这时你会发现，我们重新进入了文本编辑模式，但这里已不是一片空白，而是多了一个色块，在色块内双击鼠标，下面对文字的编辑就是轻车熟路了。</p>
<p>一个色彩还不够丰富，我想要五颜六色的生活!没问题，重新回到HTML语法编辑状态，在你想使用其他色彩的文字前再加入上面HTML语句，然后调整色彩值。这里还需注意两点：一是仍然注意要把文字部分嵌套在上述语句中，二是为达到最佳效果必须调整提供不同色彩的HTML语句中的高度比值，至于什么值比较合适，就得根据文字内容的长短了，你可以边调整，边预览之。
</p></div>

---

[📚 返回目录](/needisme-mu-lu/)
