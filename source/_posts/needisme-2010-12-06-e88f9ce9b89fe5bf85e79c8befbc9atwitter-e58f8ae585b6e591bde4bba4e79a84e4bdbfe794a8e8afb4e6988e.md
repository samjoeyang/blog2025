---
title: "菜鸟必看：Twitter 及其命令的使用说明"
date: 2010-12-06 09:37:00
categories: NeedIsMe
tags: ["微博", "Twitter", "Micro-Blog", "Google"]
---

<p>原始来源：<a href="https://docs.google.com/View?id=adgc5cmwpb9_50hpkjdpww">https://docs.google.com/View?id=adgc5cmwpb9_50hpkjdpww</a></p>
<div>
<div><strong>.:: Twitter 推特 = (Micro-Blog 微博 + SNS 社交网) * SMS 短信 ::.</strong></div>
<div>首先，&ldquo;推特&rdquo;是一个微博(micro-blog)服务，用户每次发布一句话更新，而此用户的关注者/跟随者(followers)可以不断地接收更新。这里&ldquo;<strong>一句话</strong>&rdquo;，确切地说是不超过 140 个字符（相当于 46 个中文字），因为受限于手机短信 SMS 的 160 字符，却也是魅力所在。再者，称之为&ldquo;<strong>更新(update)</strong>&rdquo;而不是消息，因为即时发布和接收的是最新的一条消息，Twitter 更通称之为 tweet。</div>
<div>&ldquo;推特&rdquo;一开始就设计能让<strong>绑定</strong>的手机号用短信(命令)发布更新和接收最新更新，Twitter 不收费用，当然，这需要当地手机商的支持（新西兰的 Twitter 短号是 TWTR/8987，标准短信费用，发送短信 '<span style="background-color: #b6d7a8;">START</span>' 到 8987 经过绑定手机号以后，发送短信到 8987 就是发布更新，而跟随者手机就能免费自动地接收此最新更新）。如果作为发布者的用户名是 username，跟随者设置跟随此 username 的手机短信格式是：</div>
<blockquote style="border: medium none; margin: 0 0 0 40px;"><p><span style="background-color: #b6d7a8;">FOLLOW username</span></p></blockquote>
<div>注意，在手机上使用 '<span style="background-color: #b6d7a8;">FOLLOW/LEAVE username</span>' 与使用 '<span style="background-color: #b6d7a8;">ON/OFF username</span>' 相同是&ldquo;启/禁用&rdquo;手机的自动接收此 username 的更新，网页上还是仍然跟随着并接收着最新更新，虽然手机上对某 username  第一次使用 FOLLOW 时是设置跟随此 username 并启用手机自动接收此 username 的最新更新。不管怎样，任何时候手动接收某  username 的一条最新更新的手机短信格式是：</div>
<blockquote style="border: medium none; margin: 0 0 0 40px;">
<div><span style="background-color: #b6d7a8;">GET username</span></div>
</blockquote>
<div>手机上是一条条地接收最新更新，而可以不断刷新的网页上是列出自动接收的最新的更新和历史的更新。在 <a title="Twitter.com" href="http://twitter.com/">twitter.com</a> 的<strong>个性化主页(home)<sup><a href="https://docs.google.com/View?id=adgc5cmwpb9_50hpkjdpww#FOOTNOTE-2">2</a></sup></strong>上的时间轴列表（Twitter 称之为 timeline ）是所有自己跟随的按时间排列的更新。在&ldquo;<strong>个人页面(profile)</strong>&rdquo;上的列表是个人发布的更新，可供&ldquo;<strong>任何人</strong>&rdquo; 浏览。如果某个用户的用户名是 username，那么 http://twitter.com/username  是此用户名的个人页面，任何人登录后，可以在上面设置跟随此 username、设置手机自动接收此 username 的最新更新。注意，如果发布者的 tweets 是受保护的，只有发布者所允许的跟随者才能看到这些 tweets。有趣的是已经发布的 tweets  不能再编辑修改，但在网页上能删除。</div>
<div>第二，&ldquo;推特&rdquo;像是&ldquo;异步的&rdquo;即时通讯工具，能对跟随自己的 username 密送消息(<strong>Direct Message</strong> 简称 <strong>DM</strong><sup><a href="https://docs.google.com/View?id=adgc5cmwpb9_50hpkjdpww#FOOTNOTE-3">3</a></sup>)。与即时通讯工具不同的是双方都能删除密送了的消息。密送消息时，密送的手机短信格式是：</div>
<blockquote style="border: medium none; margin: 0 0 0 40px;"><p><span style="background-color: #b6d7a8;"><span style="font-size: 130%;">D username message </span></span></p></blockquote>
<div>注意，官方 FAQ 中说手机发送短信 '<span style="background-color: #b6d7a8;">OFF</span>' 一次是禁用手机（而不是网页）上的自动接收所有更新，但手机还是能接收密送消息。禁用手机的接收任何密送消息需手机发送 '<span style="background-color: #b6d7a8;">OFF</span>' 二次，或者在网页上&ldquo;移动设备&rdquo;中设置。</div>
<div>第 三，&ldquo;推特&rdquo;的用户或者称为&ldquo;推友&rdquo;，有一条单向的跟随线 following  关系，即：任何人能知道某推友在跟随谁（而不是知道其跟随者）。这是社交网与即时通讯网不同的地方，即时通讯仅容许知道自己本人的联系人。推友分单向的跟 随和被跟随（呵，有点像粉丝和偶像），以及双向的相互跟随。</div>
<div>接下来，好玩的地方是&ldquo;公开地&rdquo;回复/提及(Reply/Mention)某个 username。这是从&ldquo;发布更新&rdquo;发展出来的，'<span style="background-color: #b6d7a8;">@username</span>' 出现在 tweet 的开头是&ldquo;公开地&rdquo;回复，在 tweet  的其它位置就是&ldquo;公开地&rdquo;提及。于是，作为同时是发布者的和被回复者的追随者，都能接收到这些更新。那些回复和提及自己的 tweets  还被（搜索过似的）特别列出。如果作为发布者的 tweets  是受保护的，发布者只能回复其所允许的跟随者，而且更新中的被提及者必须是发布者的跟随者才能看到此更新。</div>
<div>第五，官方新恢复的回推（Retweet，锐推），能把有意义的 tweets 推得更广。锐推某 username 的最新更新的手机短信格式是：</div>
<blockquote style="border: medium none; margin: 0 0 0 40px;"><p><span style="background-color: #b6d7a8;">RT username</span></p></blockquote>
<div>第 六，官方新出的自定义 tweet lists (列表)。不同于个性化主页上所有自己跟随的 tweets  的列表，用户自己定制列表，加入（但并不要求自己跟随）某 username，甚至加入某 username 的列表。（客观上，是自己分类组织  tweets 供网上阅读而不像在自己的主页上似的被&ldquo;唠&rdquo;）</div>
<div>第七，推特只支持 TXT，不利于发送长长的网页地址，需借助 <a title="http://bit.ly" href="http://bit.ly/">http://bit.ly</a> 缩短网址。</div>
<div>第八，非官方支持的<strong><span style="font-size: 130%;"> # </span></strong>标签。用于标签一些热门词供搜索 tweets。热门使用的标签参见 <a title="hashtags.org" href="http://hashtags.org/">hashtags.org</a> 网</div>
<div>第九，推特的目标是发现和共享信息。信息的传播单元，从书本到文章，又到一句话。传播更轻巧更平民化了，有人形容推特像是鸡尾酒会。</p>
</div>
<div>附：<br />
《<a title="Twitter 新手使用教程" href="https://docs.google.com/view?id=dfs98nc3_197xphstjw6">Twitter 新手使用教程</a>》 <sub>http://docs.google.com/view?id=dfs98nc3_197xphstjw6</sub></div>
<p>&ldquo;<a title="怎样使用和利用微博客？" rel="bookmark" href="http://www.kenengba.com/post/1544.html">怎样使用和利用微博客？</a>&rdquo; <sub>http://www.kenengba.com/post/1544.html<br />
</sub>&ldquo;<a title="Ｔwitter 如何颠覆 Google" href="http://www.cnemag.com.cn/fenxplun/newsfx/2009-05-21/177375.shtml">Twitter 如何颠覆 Google</a>&rdquo; <sub>http://www.cnemag.com.cn/fenxplun/newsfx/2009-05-21/177375.shtml</sub><br />
&ldquo;<a title="The Official Twitter Text Commands" href="http://help.twitter.com/forums/10711/entries/14020">官方的推特命令格式</a>&rdquo; <span style="font-size: 85%;">http://help.twitter.com/forums/10711/entries/14020</span></p>
</div>

---

[📚 返回目录](/needisme-mu-lu/)
