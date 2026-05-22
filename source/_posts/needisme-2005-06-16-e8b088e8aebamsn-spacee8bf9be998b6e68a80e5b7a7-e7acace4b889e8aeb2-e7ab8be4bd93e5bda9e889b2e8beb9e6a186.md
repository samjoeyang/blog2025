---
title: "谈论MSN Space进阶技巧"
date: 2005-06-16 01:35:46
categories: NeedIsMe
tags: ["WordPress", "CSS"]
---

第三讲 立体彩色边框
author:
  display_name: Samjoe Yang
  login: blogerlogin
  email: youremail@example.com
  url: http://needis.me
author_login: blogerlogin
author_email: youremail@example.com
author_url: http://needis.me
wordpress_id: 34
wordpress_url: http://samjoeyang.wordpress.com/2005/06/16/%e8%b0%88%e8%ae%bamsn-space%e8%bf%9b%e9%98%b6%e6%8a%80%e5%b7%a7-%e7%ac%ac%e4%b8%89%e8%ae%b2-%e7%ab%8b%e4%bd%93%e5%bd%a9%e8%89%b2%e8%be%b9%e6%a1%86
date: '2005-06-16 01:35:46 +0800'
date_gmt: '2005-06-16 01:35:46 +0800'
categories:
- Blog
tags:

comments: []
---
<div id="msgcns!A634C4CD7A14B666!202" class="bvMsg">
<p>原创：Loadmemory</p>
<p>拥有了背景色彩的日志显得生动活泼了许多，那么如何让她更具特色呢？在这一章里我将向大家讲述如何定制具有立体效果的背景样式。</p>
<p>我们先从为日志文字添加带有色彩的边框说起，因为其涉及到的CSS边框属性语法是以后制作立体效果边框的基础形式。请记住下面这段语法：</p>
<p><span style="color: #cc0033;">
<div STYLE="border-style:solid;border-width:5pt; border-color:red">日志文字</div>
<p></span></p>
<p><span style="color: #cc0033;"> </span></p>
<p>它会在你的文字外围生成一个红色边框，border-width控制边框的粗细，border-color调整边框的颜色，这里你仍然何以使用前文提到的形式如#xxxxxx的颜色数值，而border-style则控制边框的效果，当使用&ldquo;solid&rdquo;则为单一颜色的线形简单边框。</p>
<p>接下来我们再将上述语法扩展一下，就可以获得具有立体效果的彩色边框。那么从何下手呢？其实就是在border-style后面使用不同的语法描述:</p>
<p><span style="color: #330000;">Solid 简单线形边框&nbsp;&nbsp; Double&nbsp;简单双线边框&nbsp;&nbsp; Groove&nbsp;沟线立体效果边框 Ridge&nbsp;脊线立体效果边框&nbsp;&nbsp; Inset&nbsp;嵌入线立体效果边框&nbsp; Outset 浮出线立体效果边框</span></p>
<p>你可以在MSN Space日志中尝试一下上面不同的语法，然后在预览中观看效果。</p>
<p>通过定制边框的方法再将上一教程添加色彩的语法嵌套其中，你就可以创造出具有立体效果的彩色日志背景。</p>
<p>例如<span style="color: #cc0000;">：
<div STYLE="border-style:outset;border-width:2pt; border-color: red">
<div style="width:100%;height:100%;background-color:#ffff00;">日志文字
</div>
</div>
<p></span></p>
<p><span style="color: #cc0000;"> </span></p>
<p>使用上述语法将会为你呈现一个黄底色红边框的浮出线效果背景，其实上述语法还有其他形式的简化写法，这里不再赘述，只采用上述较直接易理解形式。</p>
<p>对于背景边框的四个边你也可以按自己的需要进行调整，以左边框为例，你可以使用下述语法：</p>
<p><span style="color: #330000;">Border-left-style:solid (double, groove, ridge, inset, outset)定制边框样式<br />
Border-left-color: #xxxxxx定制边框颜色<br />
Border-left-width: xpt 定制边框粗细</span></p>
<p>其他三个边框只要分别使用Right, Top, Bottom就可以了。将下面的语法放到你的日志中预览一下，看一看是什么效果：</p>
<p><span style="color: #cc0000;">
<div style= "border-top-sty</span><span style="color: #cc0000;">le:outset;border-right-style:outset;border-left-style:outset;<br />
border-bottom-style:outset;background-color:#cc3366"></span></p>
<p>你可以按照自己的想法随意调整四个边框的式样，以便创造与众不同的效果，记住一点，不同的属性描述之间用 ; 隔开。另外，你可能会注意到，当你设置完边框返回到日志文本编辑模式，在键入文字过程中如果使用回车键，就会又出现一个边框，从而影响文字的连贯性，这是因为HTML语法中不支持硬回车。要解决这个问题，必须返回到HTML编辑模式，在需要回车的地方键入<br>，需要几次回车就键入几个<br>，然后再返回到文本编辑模式，你就会发现边框背景内已经为你加入了回车后的效果。</p>
</div>

---

[📚 返回目录](/needisme-mu-lu/)
