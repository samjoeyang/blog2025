---
title: "HTML编写小经验"
date: 2005-08-07 18:31:58
categories: NeedIsMe
tags: ["HTML", "CSS", "HTML/CSS", "前端", "Windows", ".NET"]
---

<div id="msgcns!A634C4CD7A14B666!229" class="bvMsg"><a title="Permanent Link: HTML编写小经验" rel="bookmark" href="http://tech.21ds.net/2004/11/17/461e48c962820f2d6f7916d4b582f030/"><span style="color: #8a3207;"> </span></a><span style="color: #8a3207;"> </span></p>
<p>在用HTML(HyperText Markup Language，超文本链接标示语言)语言编写Web页面时，由于所用的Web浏览器对HTML支持的程度不同，常常会在HTML语言的运用上产生一些疑问。在此，笔者将学习和实践中获得的几点经验奉献给大家，以供参考。</p>
<p>HTML中的几种常用特殊符号：<br />
符号　　　　替代指令<br />
<(小于符号)　　＆lt<br />
>(大于符号)　　＆gt<br />
＆(与符号)　　　＆amp<br />
&Prime;(双引号)　　　＆quot<br />
不可分的空格　 ＆nbsp</p>
<p>其中，不可分的空格是指两个单词有时会因版面关系而分成两行，此时如果将两个单词之间的空格替代为＆nbsp，则它们将总是在一行中。</p>
<p>例1：在HTML中，语句<br />
A＋B<br />
3>1<br />
(显示为A＋B3>1)<br />
应写为<br />
A＋B＆ltC<br />
3＆gt1</p>
<p>(显示为A＋B1)</p>
<p>例2：&prime;＆&prime;符一般不使用，只要不产生歧义，就不必用&prime;＆amp&prime;替代。如：<br />
&prime;if (ac)&prime;可用语句<br />
if (a＆ltb＆＆b＆gtc)表示，而不必用<br />
if (a＆ltb＆amp＆ampb＆gtc)表示。<br />
&prime;＆lt&prime;则必须用语句＆amplt表示，而不能用＆lt表示(显示为<)。</p>
<p>例3：替代指令中的英文字母在HTML语句中的大小写必须统一，即或者均为大写，或者均为小写，而不能大小写混合。如：<br />
&prime;<&prime;符可用&prime;＆LT&prime;或&prime;＆lt&prime;表示，而不能用&prime;＆Lt&prime;或&prime;＆lT&prime;表示。</p>
<p>笔者所使用的是Netscape Navigator 3?0，在Windows 3?1环境中运行。</p>
</div>
<div>
<p><a title="Permanent Link: 用CSS轻松实现网上填空" rel="bookmark" href="http://tech.21ds.net/2004/11/15/479c3b6926f2307933f678c89b3183df/"><span style="color: #8a3207;">用CSS轻松实现网上填空</span></a></p>
<div>
<p><span style="color: #8a3207;"> </span></p>
<p style="text-indent: 2em;">在网上做有奖信息的时候，经常看见一些注册表单，只有一条线供你填写，就跟做考卷时的填空题一样，很Cool！</p>
<p style="text-indent: 2em;">其实要做成这样的效果并不难，只需用一段很简短的CSS代码即可搞定！</p>
<p>< style type=&rdquo;text/css&rdquo;><br />
< !&ndash;<br />
.xian{BORDER-LEFT-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-TOP-STYLE: none}<br />
&ndash; ><br />
< /style></p>
<p>其中代码的作用如下：</p>
<p>&ldquo;BORDER-LEFT-STYLE:none&rdquo;： 不显示左边框<br />
&ldquo;BORDER-RIGHT-STYLE: none&rdquo;： 不显示右边框<br />
&ldquo;BORDER-TOP-STYLE: none&rdquo;： 不显示上边框<br />
&ldquo;BORDER-bottom-STYLE: none&rdquo;： 不显示上边框，加上这条，什么边框也没有了</p>
<p>让我们一起来看一个应用实例吧：</p>
<p>< html><br />
< head><br />
< title>网上填空< /title><br />
< style type=&rdquo;text/css&rdquo;><br />
< !&ndash;<br />
.xian{BORDER-LEFT-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-TOP-STYLE: none ;}<br />
&ndash; ><br />
< /style>< !&ndash;注：此段为css代码，在这里更改参数可以设置出更cool的效果&ndash;><br />
< /head><br />
< body bgcolor=&rdquo;#FFFFFF&rdquo; text=&rdquo;#000000&Prime;><br />
隐藏你的边框<br />
< p>用户名：<br />
< input type=&rdquo;text&rdquo; name=&rdquo;name&rdquo; class=xian> < !&ndash;注：class=这条一定要加，设置你的css应用在表单里面&ndash; ><br />
< /p><br />
< /body><br />
< /html></p>
<p>实现的效果简洁清爽，怎么样，也改改你的表单吧！</p>
</div>
</div>
<div>
<p><a title="Permanent Link: 用CSS控制网页总体风格" rel="bookmark" href="http://tech.21ds.net/2004/11/08/115d181a94b160e723d366d69e187c25/"><span style="color: #8a3207;">用CSS控制网页总体风格</span></a></p>
<div>
<p><span style="color: #8a3207;"> </span></p>
<p>网页设计中我们通常需要统一网页的整体风格，统一的风格大部分涉及到网页中文字属性、网页背景色以及链接文字属性等等，如果我们应用CSS来控制这些属性，会大大提高网页设计速度，更加统一网页总体效果。</p>
<p>为了达到修改整个网页的目的，我们需要编辑一个外挂式的CSS文档。根据这个文档定义和修改不同CSS属性并在页面元素相同或者相似的网页里调用它。</p>
<p><strong>整体改变页面风格</strong></p>
<p>现在网页中流行宋体的9pt和10.5pt的字体，按快捷键&ldquo;Shift+F11&rdquo;打开&ldquo;CSS Style控制面板&rdquo;，单击&ldquo;New Style&rdquo;按钮，弹出&ldquo;New Style&rdquo;对话框，复选&ldquo;Redefine HTML Tag&rdquo;的&ldquo;Type&rdquo;类型，这时在Tag处会出现&ldquo;body&rdquo;、&ldquo;br&rdquo;、&ldquo;cite&rdquo;等选项，选择&ldquo;body&rdquo;后确认。这样我们就建立了一个外挂的CSS文档，在保存对话框中保存为all后就进入&ldquo;Style Definition for body in all.css&rdquo;对话框(如图1)。选择&ldquo;Category&rdquo;中的&ldquo;Type&rdquo;项，定义&ldquo;Font&rdquo;为&ldquo;宋体&rdquo;、&ldquo;Size&rdquo;参数为&ldquo;9&rdquo;，其后的下拉框选择&ldquo;Points&rdquo;、&ldquo;Color&rdquo;自定义为喜好颜色就可以了。当然还可以选择&ldquo;Category&rdquo;中的&ldquo;Background&rdquo;项来定义&ldquo;Background&rdquo;颜色和其他背景属性。这时您会看到页面中内容的整体改变。</p>
<p>< p></p>
<p>src="http://www.it.com.cn/f/edu/0410/27/02806css001.jpg"><br />
图1</p>
<p><strong>偏好元素风格的改变</strong></p>
<p>经过上面的改变有时不免给您带来一定麻烦，如果遇到页面中某个元素，比如突出显示的文字的字体、字号以及颜色怎么办！这里我们就需要再定义一个新的CSS样式单来对其进行控制，右键点击页面编辑区，在弹出快捷菜单中点击&ldquo;CSS Style/Edit Style Sheet&rdquo;命令，弹出&ldquo;Edit Style Sheet&rdquo;对话框，选择列表中的all.css，点击&ldquo;New&rdquo;按钮，在弹出的&ldquo;New Style&rdquo;对话框中选择&ldquo;Make Custom Style(class)&rdquo;的&ldquo;Type&rdquo;类型定义一个自己偏好的CSS控制。如果想更改页面中某一元素的属性，选中它然后右键单击&ldquo;CSS Styles&rdquo;面板中&ldquo;Apply Styles&rdquo;中刚才定义的CSS，执行&ldquo;Apply&rdquo;命令就可以了(如图2)。</p>
<p>< p></p>
<p>src="http://www.it.com.cn/f/edu/0410/27/02806css002.jpg"><br />
图2</p>
<p><strong>统一控制超级链接</strong></p>
<p>超级链接也是网页中经常使用的，而网页的链接色默认都是蓝色，虽然可以更改，但单一色彩在不同背景色的网页上显示就不是那么奏效了，我们来看一下如何用CSS控制网页实现不同的个性链接颜色。在&ldquo;New Style&rdquo;对话框中，选择&ldquo;Use CSS Selector&rdquo;的&ldquo;Type&rdquo;类型，在&ldquo;Selector&rdquo;下拉框中会列出&ldquo;a:link(链接属性)&rdquo;、&ldquo;a:hover(鼠标移动到链接上的属性)&rdquo;、&ldquo;a:visited(链接被访问后属性)&rdquo;、&ldquo;a:active(链接焦点状态下的属性)&rdquo;4个选项(如图3)，这4个选项的设置会控制网页中所有的链接的属性，我们可以分别定义这4个属性，然后添加到&ldquo;CSS Style&rdquo;面板中与默认设置不同的CSS控制中，再将其&ldquo;Apply&rdquo;到需要改变的链接上就实现了。如果将&ldquo;Hover&rdquo;的字体设置的比&ldquo;Link&rdquo;稍微大一点，就会出现鼠标移动到链接上时字体变大的效果，试试看是不是很奇妙！</p>
<p>< p></p>
<p>src="http://www.it.com.cn/f/edu/0410/27/02806css003.jpg"></p>
<p>图3</p>
<p>名词解释：CSS即层叠样式表(Cascading Style Sheet)是在网页制作过程中普遍用到的技术。采用了CSS技术控制的网页，设计者会更轻松、有效地对页面的整体布局、颜色、字体、链接、背景以及同一页面的不同部分、不同页面的外观和格式等效果实现更加精确地控制。Dreamweaver MX推出后，其改进的CSS渲染和设计工具、通过增强CSS面板清晰显示内、外部定义的样式，让用户构建出符合最新CSS标准的站点。</p>
</div>
</div>
<div>
<p><a title="Permanent Link: 网页字体的美化" rel="bookmark" href="http://tech.21ds.net/2004/10/31/462633230a1d7005f72facdd7ff2a038/"><span style="color: #8a3207;">网页字体的美化</span></a></p>
<div>
<p><span style="color: #8a3207;"> </span></p>
<p>本来，我没打算写这篇文。因为许多站长都亲自撰稿，传授秘籍了。但很多网页上的字体仍然没有&ldquo;美化&rdquo;效果，想必还是用了软件提供的默认字号，所以我也跟着来嚷嚷两句，凑凑热闹。</p>
<p>比如我吧，设计第一篇网页的时候，就遇到了字体的设置问题。我发现如果用软件约定的字体大小，则显示效果会很难看的。我是用Frontpage2000作网页，在这个微软大加宣传的网络软件里，文本的设置居然是如此令人失望，可能有它的难处，我不知道。总之，当我研究了半天之后，我明白过来：在显示器上，中文字体的字号，最保险的，是9pt，11pt也不错。如果你在word或excel里设置文本的大小，可很容易找到这两种字号。但在Frontpage里，甭想！除非你手工设置&ldquo;格式&rdquo;菜单里的&ldquo;样式&rdquo;。在&ldquo;样式&rdquo;对话框里，你可以对网页的各个部分进行较为自由的&ldquo;修改&rdquo;。修改的内容就是&ldquo;格式&rdquo;，有&ldquo;字体&rdquo;、&ldquo;段落&rdquo;、&ldquo;边框&rdquo;、&ldquo;编号方式&rdquo;和&ldquo;定位&rdquo;五种。实际上，这些格式内容，在&ldquo;格式&rdquo;菜单里就有的。但在&ldquo;样式&rdquo;设置当中，可以得到更大的自主权。不信你就试试，在某一表格内先随便写一段中文，然后打开&ldquo;格式&rdquo;菜单里的&ldquo;字体&rdquo;设置对话框。看看在字体大小选择中，是否有9pt？没有。直接写上9pt行吗？不行。没辙了？别急，请进入&ldquo;样式&rdquo;对话框试试，此对话框的左边是&ldquo;样式&rdquo;内容选择，也就是说，让你选择你想手工设置的具体内容。比如你可以选择&ldquo;td&rdquo;，即对表格内容进行设置。&ldquo;样式&rdquo;对话框的右边有一个&ldquo;修改&rdquo;按钮，进入&ldquo;修改&rdquo;后，就看到左下角那个讨厌的&ldquo;格式&rdquo;按钮了。里面就是上边谈到的五种选择。我们选&ldquo;字体&rdquo;。在这个字体对话框中，你可以写入自己想要的字体大小值，直接写入&ldquo;9pt&rdquo;，再一路&ldquo;确定&rdquo;回来，看看页面上的字体是否听话？<br />
好了，我们总算找到一种完全通过菜单选定字体大小的方法。用这种方法，你可以设置各种尺寸的字体。（这下微软又有理了：谁说我们的软件不是摆脱了编码的麻烦？）然而，这还不算麻烦么？</p>
<p>实际上，如果你对编码这玩意儿不抱成见，肯用心去研究一下，它也不见得有多吓人。还是以上面这个例子来说吧，我们自定义&ldquo;td&rdquo;即表格的字体大小为9pt。那么，它的编码是什么样的呢？转到软件界面左下角的HTML显示窗，你将看到网页的HTML编码。一般都叫它HTML代码。<br />
在代码的上方，区之间，有一句&ldquo;TD{ font-size: 9pt }&rdquo;。这就是我们刚才费半天劲设置的&ldquo;表格样式&rdquo;代码。实际上，如果你记得住，将这一句直接写上去就可以了。</p>
<p>现在，我可以告诉你简单的结果了：在网页字体的大小设置上，只须在每页的区之间加入以下一段代码即可。</p>
<p>关键的问题倒是：究竟我们可以在网页上用几种大小的字体？也就是说，显示器上的网页中，有几种字号是美观的？9pt是公认的字号。绝大多数网页都用它。11pt也好看。问题似乎解决了，可是假如你有一段文字想设置得比9pt更小，咋办？用8pt或7pt行吗？如果你的显示器&ldquo;桌面显示字体&rdquo;是大字体，那你会觉得可行。然而且住！大多数显示器不是1024&times;768分辨率的17寸，而是800&times;600或者640&times;480的14、15寸。他们的&ldquo;桌面显示字体&rdquo;往往是小字体，这时，8pt或7pt的显示效果会很难看，而且基本上看不清。有别的办法吗？有！</p>
<p>办法很简单，告诉你另一种大小的字体表示法，即：&ldquo;12px&rdquo;。它比9pt字号要小，而且在不同的显示器上，看上去都挺好。所以，你只要将上面代码中的9pt改为12px就行了。但你可能会问：我不想要整张网页都改成12px，而只想让某一段文字是12px，那又如何是好？</p>
<p>对单独文本的改动可用这样的方法：在这一段文本的开头位置（我是指在代码页），加入这样一句代码：</p>
<p><span style="font-size: 12px;"> </span></p>
<p>如此，这一段文字就是12px的小字体了。OK？</p>
<p>最后，捎带着讲一下&ldquo;粘贴代码&rdquo;的问题。你肯定会拿这些代码去粘贴的，因为很方便。我们在制作网页时，常常需要作这样的粘贴。在粘贴代码时，如果你的代码是直接从其它网页上copy的，则在粘贴时软件很有可能把代码看作文本，这时，代码不起作用，而且，你会在网页上看到你刚粘贴上的代码。如果是这种情况，可以先将copy的代码粘贴到写字板上，再copy一次，然后贴入网页代码区内，问题将得到解决。</p>
<p>好了，就写这么多吧，我后背都酸了。</p>
</div>
</div>

---

[📚 返回目录](/needisme-mu-lu/)
