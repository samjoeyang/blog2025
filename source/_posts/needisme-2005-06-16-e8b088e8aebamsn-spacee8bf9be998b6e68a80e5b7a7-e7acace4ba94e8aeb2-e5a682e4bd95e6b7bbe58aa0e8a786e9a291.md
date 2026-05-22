---
title: "谈论MSN Space进阶技巧"
date: 2005-06-16 02:09:46
categories: NeedIsMe
tags: ["WordPress"]
---

第五讲 如何添加视频
author:
  display_name: Samjoe Yang
  login: blogerlogin
  email: youremail@example.com
  url: http://needis.me
author_login: blogerlogin
author_email: youremail@example.com
author_url: http://needis.me
wordpress_id: 36
wordpress_url: http://samjoeyang.wordpress.com/2005/06/16/%e8%b0%88%e8%ae%bamsn-space%e8%bf%9b%e9%98%b6%e6%8a%80%e5%b7%a7-%e7%ac%ac%e4%ba%94%e8%ae%b2-%e5%a6%82%e4%bd%95%e6%b7%bb%e5%8a%a0%e8%a7%86%e9%a2%91
date: '2005-06-16 02:09:46 +0800'
date_gmt: '2005-06-16 02:09:46 +0800'
categories:
- Blog
tags:
- 博客
- MSN Space
- 进阶
- 技巧
comments: []
---
<div id="msgcns!A634C4CD7A14B666!204" class="bvMsg">原创：loadmemory<br />
我要我的日志有声有色，不少在MSN Space安家的朋友都有这个想法。毕竟&ldquo;声情并茂&rdquo;的页面会吸引不少关注。上一章里我们了解了如何加入背景音乐，接下来我们看看怎样在日志中放入视频片断。</p>
<p>也是偶然的机会，我发现某些网站提供所谓的Music Video Code，选中自己需要的视频，再设定几个简单参数，网站就会即时为你生成一段代码，这段代码可用于自己的网页或Blog，从而实现实时播放的效果。当时我就产生了要在MSN Space中尝试的念头，但几经试验都不成功。后来我将一段视频拷贝到Dreamweaver网页编辑器中，查看了一下它的源代码，稍微做了一下修改，然后在IE中预览，再将预览页面里的视频加以复制，粘贴到日志里，没想到竟然成功了！不过这种做法比较繁琐，在此不再详述了。</p>
<p>我要为大家介绍的是一种更为简便的方法，它的灵感也来自于背景音乐的语法格式。实际通过上一个教程大家就可以了解到，图片&ldquo;属性设置&rdquo;里的&ldquo;视频源&rdquo;选项起到了关键作用，那么既然它叫做&ldquo;视频&rdquo;源，我们又成功地用它实现了音乐的载入，那理所当然就可以加入视频了。本着这个思路，我将语法中的音乐文件改为asf流媒体文件的链接，然后又调整了语法中IMG的宽度和高度，在Space的日志中一试即告成功，同时利用Loop参数也解决了以往不能循还播放的问题。</p>
<p>看到这你会恍然大悟，原来这么简单！是啊，其实就是这么简单！所以，如何加入视频，就和上一章介绍的加入背景音乐一样可以通过两种方式实现，一是利用MS Frontpage，二是使用我提供给你的下面这段语法：</p>
<p><span style="color: #cc0000;"><P><IMG height=150px width=150px loop=infinite dynsrc=流媒体文件链接></P></span></p>
<p>IMG后的Height和Width分别控制视频画面的高度和宽度，你可以根据需要自行调整，如果这里你都设置成0的话，那么就只有音乐看不到图像，这也等同于插入背景音乐的效果。Loop控制循环次数，用法可参见上一章的描述。</p>
<p>对于页面中视频位置的控制，可以使用日志编辑器里简单命令，另外也可通过加入下述语法实现视频与文字的完美结合。举例如下：</p>
<p><span style="color: #330000;">align=left 文字置于视频的右边，并与其紧密结合<br />
align=right文字置于视频的右边，并与其紧密结合<br />
align=top 文字队齐视频顶端<br />
align=middle 文字队齐视频中部<br />
align=bottom 文字队齐视频底端</span></p>
<p>这里关键是流媒体文件的获取，正常的流媒体文件以asf，wmv，或mov等为后缀，这是最直接的形式；也有以asx为后缀的，这种文件格式隐藏了流媒体的真正地址，但没有关系，你一样可以将带有asx后缀的链接放到你的语法中。目前网上多数流媒体文件都隐藏了其链接，很难通过直接的方法来查看，有关这方面的破解技巧网上多有提供，大家可以试试。</p>
</div>

---

[📚 返回目录](/needisme-mu-lu/)
