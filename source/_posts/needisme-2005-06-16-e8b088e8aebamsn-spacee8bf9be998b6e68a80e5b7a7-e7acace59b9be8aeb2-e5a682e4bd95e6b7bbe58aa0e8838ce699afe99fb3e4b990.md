---
title: "谈论MSN Space进阶技巧"
date: 2005-06-16 01:36:31
categories: NeedIsMe
tags: ["WordPress", "Google"]
---

第四讲 如何添加背景音乐
author:
  display_name: Samjoe Yang
  login: blogerlogin
  email: youremail@example.com
  url: http://needis.me
author_login: blogerlogin
author_email: youremail@example.com
author_url: http://needis.me
wordpress_id: 35
wordpress_url: http://samjoeyang.wordpress.com/2005/06/16/%e8%b0%88%e8%ae%bamsn-space%e8%bf%9b%e9%98%b6%e6%8a%80%e5%b7%a7-%e7%ac%ac%e5%9b%9b%e8%ae%b2-%e5%a6%82%e4%bd%95%e6%b7%bb%e5%8a%a0%e8%83%8c%e6%99%af%e9%9f%b3%e4%b9%90
date: '2005-06-16 01:36:31 +0800'
date_gmt: '2005-06-16 01:36:31 +0800'
categories:
- Blog
tags:
- 博客
- MSN Space
- 进阶
- 技巧
comments: []
---
<div id="msgcns!A634C4CD7A14B666!203" class="bvMsg">
原创：Loadmemory</p>
<p>如何在自己MSN Space的日志中加入音频和视频是目前许多朋友关注的问题，毕竟拥有声光效果的页面即能娱人也能悦己。记得刚入Space的时候，一方面为它的简单实用而折服，另一方面又为它提供的少得可怜的个性化设置而烦恼，初期只是简单地写写字，上传些照片，后来学会了贴图都觉得兴奋不已。看看其他Blog空间五彩缤纷的样子，真的是羡慕不已。Space留给我们的发挥空间就真的如此有限吗？事实当然并非如此，无论微软是有意还是无意，她仍然在这里给了我们展示个性的可能，只是这种可能要靠大家自己去发现。好了，废话少说，进入正题！</p>
<p>先介绍如何添加音频，也就是为我们的日志加入背景音乐。目前Space上比较流行的做法是利用MS Frontpage，这对于手头没有该款网页编辑软件的朋友当然不是一个好消息。通过分析其语法格式，我发现了更为简便的办法，不需动用上述软件即可实现音频的加入。考虑到有些朋友对第一种方式可能也会感兴趣，因此一并将两种方法介绍如下：</p>
<p>1．&nbsp;MS Frontpage方式</p>
<p>首先在网上搜索你需要的音乐，这里推荐使用WMA格式的文件，因为它体积相对较小，因此会获得比较快的载入速度。你需要获取该文件的确切链接地址，格式形如：<br />
<a href="http://www.xxx.com/xxx.wma">http://www.xxx.com/xxx.wma</a>，某些在线播放的音乐不会直接显示链接地址，如何获取之，请通过Google等搜索引擎查询相关技巧。当然最满意的是你自己拥有主页空间，这样你就可以把心仪的歌曲上传到那里，而且不用担心以后会出现因为链接失效而造成Space背景音乐无法载入的情况。有了链接地址后，运行MS Frontpage，新建一个文件，然后在页面中插入图片，图片建议越小越好。然后用鼠标右键单击该图片，选择&ldquo;图片属性&rdquo;，在弹出的对话框中选择&ldquo;视频&rdquo;选项，将刚刚获取的音频文件的链接粘贴到&ldquo;视频源&rdquo;一栏，然后设置&ldquo;重复&rdquo;选项中的&ldquo;循环次数&rdquo;，这里依你自己的喜好加以选择。&ldquo;开始&rdquo;选项中的设置不用管它，留空即可，最后点击&ldquo;确定&rdquo;。Frontpage会用一段时间获取你的视频源，时间长短依据你的音频文件的大小。这时你会发现原来插入的图片缩成了一个小图标，用鼠标右键单击它，然后点击&ldquo;复制&rdquo;。回到你的Space空间，新建一篇日志，或打开你想添加背景音乐的日志，将光标移至空白处，然后用IE浏览器&ldquo;编辑&rdquo;菜单里的&ldquo;粘贴&rdquo;命令或CTRL+V快捷键，将你刚才复制的内容粘贴于此。正常的话，你不会看到任何粘贴的内容，再稍等一些时间，无须打开日志预览，你就可以听到背景音乐了。剩下的事，当然就是发布你的大作了。</p>
<p>2．&nbsp;Loadmemory简单语法方式</p>
<p>通过上述方法插入背景音乐，总的来说并不繁琐，但对于没有MS Frontpage以及对MS系列产品过敏的朋友该怎么解决这个问题呢。通过分析上述操作的源代码及语法格式，我发现了更为简便的方法，只需插入一个极简单的语法句子，就可快速实现背景音乐的加入。请大家记住下面这个语法：</p>
<p><span style="color: #cc0000;"><P><IMG height=0 loop=infinite dynsrc=音频文件链接地址 width=0 border=0></P></span></p>
<p>此段语法中唯一需要你更改的就是Loop，它控制循环播放的次数，当为infinite时是无限循环，为0时是不循环，其他循环次数只需键入相应数字即可。</p>
<p>在你的日志编辑页面，首先点击前文提到的&ldquo;Edit It&rdquo;按钮，进入HTML语法编辑模式，然后勾选Use HTML to Create Your Page，在空白处插入上述语法就可以了。由于需要载入时间，因此当你点击日志预览的时候，可能需要等待一会才能听到音乐。
</p></div>

---

[📚 返回目录](/needisme-mu-lu/)
