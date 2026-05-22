---
title: "Mutt email程序使用入门教程"
date: 2010-12-02 15:09:00
categories: NeedIsMe
tags: ["Mac", "LINUX", "Linux", "系统管理", "Vim"]
---

<p>你也许听说过这句话？这不是危言耸听，我还没有遇到一个令我满意的 email 程序，直到我遇到  mutt。它不是图形界面的，但是它非常强大和方便。我曾经把它忽略，但是后来我发现其它 email 程序都有某种我不喜欢的怪毛病。最后我选择了  Mutt。<br />
有人说 Gnus 才是最好的 email 客户端，可是 Gnus 要达到 Mutt  这种效果和方便程度，你需要付出太多代价。所以我宁愿使用 Mutt 调用 Emacs 来编辑 email 而不愿把 Gnus 配置来处理  email.</p>
<h3>Mutt 的特点<a name="feature"></a></h3>
<p>mutt 具有以下特点：</p>
<ul>
<li><em>超强的信件分类功能</em>你可以设置几乎任意的条件来从一堆信件里找到你所需要的那封。比如，你可以说：&ldquo;只显示一个月之类，不是清华大学发来的，内容包含&lsquo;光盘&rsquo; 两个字的信件&rdquo;，&ldquo;把从 fvwm 邮件列表一个星期以前发来的，而且还没有看过的信件全部移到叫 old-fvwm 的信箱&rdquo;&hellip;&hellip;</li>
<li><em>信件打分排序功能</em>你可以给你的信件打分，比如我说：
<ul>
<li>主题包含 &ldquo;Circulation Notices&rdquo; 的 +3 分。否则小心被图书馆罚款。</li>
<li>从我爸爸发来的信件 +2 分。听爸爸话&hellip;&hellip;</li>
<li>主题包含&rdquo;通知&rdquo;两个字 +2 分。随时听取党中央号召。</li>
<li>主题包含&rdquo;believe me&rdquo;, &ldquo;believe.*dream&rdquo;, &ldquo;win.*free&rdquo; 字样的, -1  分。这些一般都是广告。</li>
<li>新的信件 +4 分。新的应该最先看。</li>
<li>新的而上次忘了读的信件(old), +1 分。可能太忙了上次忘了看的信，这次应该先看。</li>
</ul>
<p>信件最后的得分就是它的这些分数相加的结果。这样处理之后，你最想看的信件肯定就在最上面了。</li>
<li><em>几乎任意条件的彩色设置</em>你看我的 Mutt 可以变成这个样子。当然这太花了，我不会设置这么多颜色的。<a href="http://www.linuxhobby.com/images/mutt-color.png"><img title="mutt-color" src="http://www.linuxhobby.com/images/mutt-color.png" alt="Mutt email 程序使用入门 作者：王垠 " width="483" height="302" /></a></li>
<li><em>可以随意绑定热键</em>这个功能类似 Emacs。你可以把几乎任意的功能绑定到键盘。你可以让 Mutt 的行为变成你喜欢的编辑器。比如我习惯了 VIM  的控制方式，我就把 &ldquo;gg&rdquo; 绑定到 &ldquo;first-entry&rdquo;, 把 &ldquo;G&rdquo; 绑定到 &ldquo;last-entry&rdquo;, 把 &ldquo;Ctrl-F&rdquo; 绑定到  next-page, 把 &ldquo;Ctrl-B&rdquo; 绑定到 previous-page.</li>
<li><em>设置条件挂钩</em>你可以对满足不同条件的信件，信箱采取不同的设置。比如，对于用来收邮件的那些信箱，显示邮件时只显示 from, date,  subject, x-mailer 这几个邮件头，而对 sent-mail 信箱还显示 to  这个邮件头；发给我家人，朋友的信件都存到一个特别的信箱中保存。</li>
<li><em>批量邮件处理</em>你可以把一些邮件作上标记(tag)，然后对它们进行同意操作，比如删除，存到其它文件，删除附件，&hellip;&hellip;</li>
<li><em>任选编辑器</em>用一个强大的编辑器来编辑你的 email 你才能高效的完成编辑。一般 email  客户端都是用的自己内嵌的编辑器，这些编辑器一般功能很弱。mutt 并没有试图自己写一个编辑器，因为它明显不可能超过 VIM 和 Emacs,  所以 mutt 可以让你自己选择你喜欢的编辑器，它会去调用它，并且设置很多方便编辑 email 的参数。编辑器编辑完毕后 mutt  会从编辑器得到编辑好的文本，然后你可以加附件什么的。我现在在 mutt 里使用 Emacs 编辑器。</li>
<li><em>高级的 MIME 支持</em>Mutt 不像一般的 email 程序那样直接支持打开某些种类的附件。因为附件的种类实在太多，一个 email  客户端没有可能自己实现所有的功能。所以 Mutt 提供了 .mailcap  的设置。你可以启用你最喜欢的程序来打开某种特定类型的附件。比如，我可以让 lynx 帮我把含有 HTML 附件的信件都转成文本在 Mutt  里显示，我让 ImageMagick 的 display 程序帮我显示图片&hellip;&hellip;</li>
<li><em>支持PGP加密</em>Mutt 可以利用 GnuPG 这样的程序来对信件进行 PGP  加密和数字签名。别人可以用你的公用密钥给你发一封只有你才能看到的信件。你也可以用你的私有密钥给信件&ldquo;签名&rdquo;，收到信的人可以用你公布的公钥验证这封 信确实是你发出来的。</li>
<li><em>Mutt是免费的</em>听了上面那么多好处之后，还有比这更好的消息吗？</li>
</ul>
<h3>Mutt 到哪里去找？<a href="http://www.mutt.org/">http://www.mutt.org/</a></h3>
<p>Mutt 的主页在 <a href="http://www.mutt.org/">http://www.mutt.org/</a>。 上面有所有源程序和说明文档。</p>
<h3>Mutt 跟其它 email 程序有什么重大区别吗？<a name="diff"></a></h3>
<p>Mutt 显然是一个 Unix 的邮件程序，它跟一般的 Windows  邮件程序不同，它不是一个包罗万象的大杂烩。你甚至会发现它根本不直接发出邮件，它从来不自己编辑邮件，它从来不自己对邮件进行加密和数字签名&hellip;&hellip;</p>
<p>Mutt 更像一个文件管理器，只不过它管理的是email。它的功能是借助各个最强大的程序来实现的。这符合 UNIX 的设计思想。</p>
<ul>
<li>当 Mutt 需要编辑邮件时，它有可能调用 Emacs, vi, VIM, pico, &hellip;&hellip;等编辑器。</li>
<li>当 Mutt 需要发信时，它把需要发出的信件放到 sendmail 的队列里，就什么都不管了。</li>
<li>当需要数字签名时，Mutt 会把信件交给 GnuPG 之类的程序处理一下，然后再发出去。</li>
<li>怎么收邮件呢？Mutt 不会自己到 POP 服务器去取邮件，你需要一个 fetchmail 程序，帮你把 email 从  POP 服务器取回来，转发到自己的 sendmail 的邮箱里。这样看起来就是你的主机成为了一个完整的 UNIX 网络工作站。</li>
</ul>
<p>是不是觉得挺麻烦？其实有些 patch 可以使 Mutt  不依赖于这些程序，而自己处理收发工作。但是，强烈建议你使用这些外部程序！到时候你就知道这些东西的好处了。首先，VIM, sendmail,  fetchmail 这些程序都是经过千锤百炼的质量信得过的程序，用它们编辑，发送，收取邮件你绝对放心。其次，你得到了一个 UNIX  网络工作站的功能：</p>
<ul>
<li>sendmail 不但可以帮 Mutt 发出邮件，也可以帮其它 Unix 程序比如 tin  发送邮件。如果你需要一个邮件服务器帮你中转，那么你只需要设置一次就可以使所有的用户的所有这样的程序都自动可以发送邮件，不用每个程序都去设置帐号 了。</li>
<li>fetchmail 收到邮件之后会转发给本地的 sendmail. sendmail 如果允许 .forward,  你就可以在自己的目录里编辑一个 .forward  文件，信件可以自动被转发到其它地方或者经过一个过滤器过滤。你可以自己用perl等语言来写一个过滤器，它可以根据信件内容实现很多功能，比如自动回复 等等。比如我就写了一个简单的过滤器，它可以记录所有发件人的地址，如果我把 <a href="http://www.kreny.com/docs/programs.html#bbsbot">helloooo</a> 机器人连接到过滤器，恐怕你们就会收到可爱的 helloooo 的回信了。</li>
</ul>
<h3>Mutt 使用指南<a name="manual"></a></h3>
<p>Mutt 的用法类似 VIM。你的每一个键都是一个命令，你可以在配置文件~/.muttrc设置很多选项来改变 Mutt  的行为。我没有太多时间写一个入门的介绍。你可以自己看看 <a href="http://www.kreny.com/docs/mutt-manual/index.html">Mutt Manual</a>。 我下面只解决一些中国人用 Mutt 常常遇到的问题。</p>
<h3>基本配置 <a name="config"></a></h3>
<p>你一开始看到 Mutt 说明书上说的配置方法可能不知所措。现在我把你开始用的时候需要的一些必要的配置说一下。<br />
l></p>
<li>alternates这个变量应该设置为一个正则表达式，它是你有可能收到信件的地址。比如我的很简单，只有一个地址：
<pre>set alternates='wang-y01@mails.tsinghua.edu.cn'</pre>
<p>这个变量有助于 Mutt 显示邮件的地址特征。一般 Mutt 会在index中显示几种不同的邮件地址特征，它们是由  $to_chars 变量指定的。</li>
<li>to_chars一般 $to_chars 的定义为 &rdquo; +TCFL&rdquo;.
<ul>
<li>&rdquo; &ldquo;(空): 表示这封邮件不是给你的，也就是说 To: 和 Cc: Bcc:  都没有你的地址，很多转发的邮件，未确认的邮件列表邮件，垃圾邮件都有这个特征。</li>
<li>+: 表示你是收件人(To: 是你的地址之一)，而且是唯一的收件人。</li>
<li>T: 表示你是收件人(To: 包括了你的地址之一)，但是你不是唯一的收件人。这是一封群体信件。</li>
<li>C: 表示你的地址出现在 CC:，但是你不是唯一的被抄送的人。</li>
<li>F: 表示这封邮件是你发出去的。</li>
<li>L: 表示这是一封你已经加入的邮件列表寄来的。</li>
</ul>
<p>你看看下面这幅图，就是mutt 有可能出现的一种列表，你看到地址特征没有？实际上地址特征出现在列表中的位置是可以改变的。待会儿在  $index_format 里你会看到的。</p>
<p><a href="http://www.linuxhobby.com/images/mutt-to.png"><img title="mutt-to" src="http://www.linuxhobby.com/images/mutt-to.png" alt="Mutt email 程序使用入门 作者：王垠 " width="294" height="165" /></a></li>
<li>index_format这是一个格式字符串，用来控制你的index的列表显示。它的缺省定义是：
<pre>set index_format='%4C %Z %%b %d %-15.15L (%4l) %s'</pre>
<p>显示出来就是这个样子：</p>
<p><a href="http://www.linuxhobby.com/images/index-original.png"><img title="index-original" src="http://www.linuxhobby.com/images/index-original.png" alt="Mutt email 程序使用入门 作者：王垠 " width="423" height="17" /></a></p>
<p>这里有一个简单的对应关系，%4C表示4位数的序号，%Z是邮件状态，你看到那个 &ldquo;r&rdquo; 了吗？也就是说我已经回了这封信。%Z  还包含那个 &ldquo;T&rdquo;, 也就是说这封信不只是寄给我一个人的，我爸爸每次寄信都会CC他自己一份。 %%b %d 是日期格式，它是由  strftime() 函数的格式定义的。这里 %b 就是根据当前的 locale 设置的月份简称，&ldquo;12月&rdquo;。%d  就是十进制表示的每月的日号，&ldquo;31&rdquo;。后面的&hellip;&hellip;你自己看看manual吧，我不罗嗦了。</li>
<li>mailboxes指定你有那些信箱文件。当你按 &ldquo;c&rdquo; 切换信箱时，再按 Tab 键，这些信箱就可供你选择。
<pre>mailboxes Mailbox sent-mail</pre>
</li>
<li>header这是一个 bool 型变量。它表明你在回信时引用原文是否加入原文的邮件头。
<pre>set header=no</pre>
</li>
<li>quit<a href="http://www.linuxhobby.com/images/mutt-quit.png"><img title="mutt-quit" src="http://www.linuxhobby.com/images/mutt-quit.png" alt="Mutt email 程序使用入门 作者：王垠 " width="287" height="47" /></a>可以设置为 yes, no, ask-yes, 或者 ask-no.  这是说，当你按q退出时，是否提示你(ask-yes,ask-no)，还是直接就退出了(yes)，还是根本不理你(no)。
<pre>set quit=ask-yes</pre>
</li>
<li>auto_view那些类型的附件是允许直接通过 .mailcap 浏览的？
<pre>auto_view text/html</pre>
</li>
<li>move这也是一个提示性变量。它是确定当你退出时，是否提示你把信件从 spool 移动到的 mbox 文件。
<pre>set move=no</pre>
</li>
<li>ascii_chars当 Mutt 用 thread 方式显示时，是否用纯 ascii 表示树状列表。
<pre>set ascii_chars=yes</pre>
<p>如果设置了就是这个样子：</p>
<p><a href="http://www.linuxhobby.com/images/mutt-ascii.png"><img title="mutt-ascii" src="http://www.linuxhobby.com/images/mutt-ascii.png" alt="Mutt email 程序使用入门 作者：王垠 " width="399" height="104" /></a></li>
<li>include回信时是否包含原文。
<pre>set include</pre>
</li>
<li>indent_str回信的引文之前插入那个符号？
<pre>set indent_str="> "</pre>
</li>
<li>my_hdr设置你自己的邮件头。比如我想让信件看上去是从 wang-y01@mails.tsinghua.edu.cn 发出的，而不是从  wy@wangyin.com 发出的。因为 wangyin.com  是我自己设置的主机名，不是注册的合法域名。我想让别人看到我的信是从我的清华信箱发出的，让他们直接回信到我的清华信箱，就这么干：
<pre>my_hdr From: wang-y01@mails.tsinghua.edu.cn</pre>
</li>
<li>打分新信件+4分，爸爸(w2r007)发来的 +2，主题包含&ldquo;通知&rdquo;的+2，主题包含 &ldquo;Circulation&rdquo; +3,  已经标记删除的 -5，上次没有读的 +1，包含 &ldquo;believe&rdquo;的 -10(垃圾广告！)。
<pre>score '~N' +4score '~f w2r007' +2score '~s 通知' +2score '~s Circulation' +3score '~D' -5score '~O' +1score '~s believe' -10</pre>
</li>
<li>sort排序方式。可以是
<pre>datedate-sentdate-receivedfrommailbox-order (unsorted)scoresizesubjectthreadsto</pre>
<p>几种方式，每种方式可以在前面加一个 &ldquo;reverse-&rdquo; 前缀表示反方向排序。我一般按分数排序：</p>
<pre>set sort=score</pre>
</li>
<li>sort_aux当用 thread 排序方式时，我们对各个 thread 的相对排序顺序。
<pre>set sort_aux=date</pre>
</li>
<li>pager_stop如果设置，那么你在pager(就是你看信的内容的窗口里)翻页时，如果翻到最后，再按往下翻也不会翻到下一封信件。如果不设置就会自动翻 到下一封信。
<pre>set pager_stop</pre>
</li>
<li>fast_reply如果设置，当你按 &ldquo;r&rdquo; 回信时，就不会再提示你输入回信地址和主题，直接进入编辑模式。
<pre>set fast_reply</pre>
</li>
<li>resolve当你按 &ldquo;t&rdquo; 或者 &ldquo;D&rdquo; 之类的标记操作时，是否自动把光标移动到下一封信件。
<pre>set resolve=yes</pre>
</li>
<li>alias_file当你在 index 里按 &ldquo;a&rdquo; 为来信者取别名时，使用哪一个别名文件保存这个别名。
<pre>set alias_file=/home/wy/.mutt.alias</pre>
</li>
<li>record你发出的邮件保存到那个信箱文件？比如可以像我这样每个月发出的信件放在不同的文件里。
<pre>set record='~/Mail/=sent-mail-`date +%Y-%m`'</pre>
</li>
<li>charset你的终端支持哪一种编码的显示？这个必须和你的终端编码一样。
<pre>set charset='gb2312'</pre>
</li>
<li>send_charset发信时可以使用的字符集。只有当前面的字符集不能正确表示信件内容时才会使用后面的。比如，如果你像下面这样设置，你的信件如果全是英文， 那么信件就会被设置为 us-ascii 编码，如果出现了法语字符，那么就会用 iso-8859-1，如果出现了汉字就会用  gb2312，如果以上都不是，那么就用 utf-8。
<pre>set send_charset='us-ascii:iso-8859-1:gb2312:utf-8'</pre>
</li>
<li>wait_key当外部程序退出时，是否要求用户按一个键才返回。这在察看某些shell命令输出时是比要的，否则它们一下就消失了。
<pre>set wait_key=yes</pre>
</li>
<li>confirmappend当你要把信件存到另一个信箱，而这个信箱已经存在时，是否提示附加？
<pre>set noconfirmappend</pre>
</li>
<li>edit_headers是否把邮件头也放在编辑器里可以修改？
<pre>set edit_headers=no</pre>
</li>
<li>pager_index_lines当你在用 pager 看信件时，在 index 留出多少行显示邮件列表？
<pre>set pager_index_lines=4</pre>
<p>比如我留下4行显示列表，其它的用来显示正文： <a href="http://www.linuxhobby.com/images/mutt-indexpager.png"><img title="mutt-indexpager" src="http://www.linuxhobby.com/images/mutt-indexpager.png" alt="Mutt email 程序使用入门 作者：王垠 " width="442" height="174" /></a></li>
<li>subscribe <a><br />
href="" name="subscribe"></a>告诉 Mutt 你已经订阅了那些邮件列表(mailing-list). 这有助于 Mutt  判断那些信件是邮件列表转过来的，避免你错误的回复到别人的私人信箱。也避免别人回复到你的私人信箱。</p>
<pre>subscribe fvwm@fvwm.org</pre>
<p>之后，收到的 To: 是 fvwm@fvwm.org 的信件看起来是这样：</p>
<p><a href="http://www.linuxhobby.com/images/mutt-list.png"><img title="mutt-list" src="http://www.linuxhobby.com/images/mutt-list.png" alt="Mutt email 程序使用入门 作者：王垠 " width="707" height="19" /></a></p>
<p>地址前面那个 &ldquo;L&rdquo; 表示这是一个邮件列表转过来的。你看到以后就不要按 &ldquo;r&rdquo; 回信，这样会回到别人的私人信箱去。按  &ldquo;L&rdquo;，就可以回复到邮件列表地址，这里就是 fvwm@fvwm.org。</p>
<h3>Mutt中文FAQ<a name="chinese"></a></h3>
<p>以下是一些常见问题和解决方法。很多是我遇到的一些不能直接连接国外网络，没有自己的域名和邮件服务器的人遇到的问题。</p>
<ol>
<li>怎样才能让我发出的信件使用我的POP邮箱的地址，而不是 root@myhost.com 这样的地址？用 my_hdr 把你的 From: 设置为你想要的地址就行了。比如我是这样设置的：
<pre>my_hdr From: wang-y01@mails.tsinghua.edu.cn</pre>
<p>注意 From: 的冒号之后有空格！</li>
<li>怎样让 Mutt 显示日期等为中文？
<pre>set locale='zh_CN'</pre>
</li>
<li>发出的信件为什么设置了错误的 charset？别人的程序不能正确显示我的中文信件！把 gb2312 编码加到你的 send_charset. 就像这样最好：
<pre>set send_charset='us-ascii:iso-8859-1:gb2312:utf-8'</pre>
</li>
<li>收到一些中文信件全部显示为 &ldquo;???&rdquo;这是因为某些 email 客户端，比如清华大学 mails.tsinghua.edu.cn 的WWW界面客户端  没有设置字符编码，你看看邮件头(按h)，是不是有个
<pre>Content-Type: text/plain</pre>
<p>但是后面没有说 charset=&rdquo;GB2312&Prime;? Mutt 遇到这种没有设置 charset 的邮件就会使用  &ldquo;us-ascii&rdquo;，所以如果你想让这种信件可以正确显示，就把 &ldquo;us-ascii&rdquo; 设置为 &ldquo;gb2312&Prime; 的别名：</p>
<pre>charset-hook ^us-ascii$ gb2312</pre>
<p>注意 &ldquo;us-ascii&rdquo; 中间的连字号！</li>
<li>可是仍然有邮件标题乱码呢！看看你的 $spool 里那个乱码的信件是不是有类似如下内容：
<pre>Subject: =?iso8859-1?B?U29oddCj09HCvDq587Dg09DQwrPJ1LG808jro6E=?=</pre>
<p>Chinaren 等服务器发出来的信件使用了 quoted-printable 的 subject，而且设置编码为  &ldquo;iso8859-1&Prime;，这显然是错误的。</p>
<p>对付这个错误的办法是把 iso-8859-1 变成 gb2312 的别名：</p>
<pre>charset-hook ^iso-8859-1$ gb2312</pre>
<p>注意 &ldquo;iso-8859-1&Prime; 中间的连字号！</p>
<p>如果仍然有信件乱码。干脆用</p>
<pre>charset-hook .* gb2312</pre>
<p>把所有信件都用 gb2312 显示。</li>
<li>可是这样设置之后 evolution 发过来的 subject 为 utf-8 编码的邮件标题乱码！那就把不是 utf-8 的编码都映射到 gb2312:
<pre>charset-hook !utf-8 gb2312</pre>
</li>
<li>怎样配置 fetchmail?fetchmail 的配置非常简单。如果只是一个人用的话，可以这样设置：比如，我在我的 $HOME 目录编辑了一个  .fetchmailrc:
<pre>set daemon 60poll mails.tsinghua.edu.cnprotocol POP3user 'wang-y01'password 'wang-y01的密码'poll smth.org........</pre>
<p>然后把 fetchmail 写到我的shell启动脚本里:</p>
<pre>! ps aux | grep -q fetchmail &amp;&amp; fetchmail &amp;</pre>
<p>fetchmail 启动后成为一个 daemon, 每分种帮我检查所有邮箱里的邮件，收回来，并且转发到本地信箱。修改上面那个  &ldquo;60&Prime; 就可以改变检查时间间隔。</p>
<p>如果不想让 fetchmail 删除服务器上的文件，而且每次只取新的信。就在配置文件里加上：</p>
<pre>keepuidl</pre>
</li>
<li>我不想用 fetchmail，能不能直接收回 POP 信件啊？如果你的 Mutt 编译时加入了 POP 功能，那么你可以直接从 POP 服务器收邮件而不用借助于 fetchmail.  把类似这些行加入 ~/.muttrc
<pre>set pop_user=wang-y01set pop_pass='wang-y01的密码'set pop_host='pop://mails.tsinghua.edu.cn'</pre>
<p>也可以一次性输入所有内容：</p>
<pre>set pop_host='pop://wang-y01:wang-y01的密码@smth.org'</pre>
<p>在 Mutt 里按一下 &ldquo;G&rdquo; 就可以取邮件了。</li>
<li>怎样处理多个 POP3 信箱？如果你有多个POP信箱，你可以设置一些方便的宏把POP信件收到你信箱里。举个例子，就像我这样：
<pre>macro index ,shredder ":set pop_host=\\"pop://shredder:shredder的密码@smth.org\"\r\<fetch-mail>"

macro index ,sk8er ":set pop_host=\\"pop://sk8er:sk8er的密码@smth.org\"\r\<fetch-mail>"

macro index ,ts ":set pop_host=\\"pop://wang-y01:wang-y01的密码@mails.tsinghua.edu.cn\"\r\<fetch-mail>"

macro index ,g ",shredder,sk8er,ts"</pre>
<p>这样，我只要按 ,shredder 就可以收我在 smth 上 shredder 的信件，只要按 ,sk8er 就可以收我在  smth 上 sk8er 的信件，只要按 ,ts 就可以收 mails.tsinghua.edu.cn 的信件，只要按 ,g 就可以收取我所有  POP 信箱的信件了。</li>
<li>怎样直接访问 POP3 信箱?除了上面的方法，你还可以直接访问 POP3 信箱。比如，我可以直接按 &ldquo;c&rdquo; 切换到信箱  pop://sk8er:sk8er的密码@smth.org就可以浏览 pop 的信件了。切换到其它信箱就浏览不同的  pop。如果你嫌按键太多可以自己定义一个宏。这是同步操作，你如果在这个信箱里删除一封信件，mutt 就会删除你 pop3  服务器上的信件。你不删它也不删。邮件太多时这样效率很低，每次都要取所有邮件头，就像 Foxmail  的&ldquo;远程邮件管理&rdquo;。所以最好在那种不想取回信件，而想直接删除垃圾邮件的时候用这个办法。</li>
<li>怎样处理邮件列表？参看<a href="http://www.kreny.com/docs/mutt.html#subscribe">subscribe</a>命 令。</li>
<li>我按 &ldquo;d&rdquo; 的时候邮件被直接标记删除了，怎样才能把删掉的信件都移到一个&ldquo;垃圾箱&rdquo;呢？你只要把信件用 save-message 函数保存到你的垃圾箱，比如 ~/Mail/Trash，信件会被自动做上 &ldquo;D&rdquo;(删除)  标志。为了让 &ldquo;d&rdquo; 可以保存到垃圾箱，你可以把 &ldquo;d&rdquo; 键绑定到一个  宏。但是如果你要删除垃圾箱里的邮件，这个宏会再次把垃圾箱的邮件存储到垃圾箱，产生循环。所以你应该使用 folder-hook 在垃圾箱里把  &ldquo;d&rdquo; 恢复到原来的 delete-message 函数，而在其它信箱使用那个宏。现在你可以用以下设置得到一个&ldquo;垃圾箱&rdquo;的功能。第一次按 &ldquo;d&rdquo; 时有可能会被讯问是否建立这个信箱(Trash).
<pre>folder-hook . 'macro index d '~/Mail/Trash\r''folder-hook ~/Mail/Trash 'bind index d delete-message'</pre>
</li>
<li>当收到的邮件的 header 有很多项目时，我的 pager 里全都是邮件头。怎样才能只看到某些我想看的邮件头呢？你可以用 ignore 忽略你不想看到的邮件头，如果 ignore *，你就可以忽略所有邮件头。用 unignore  可以恢复显示被忽略的邮件头。所以一个简单的办法就是先把所有邮件头忽略，然后放出你想看的那几个。看下面的设置。我的 sent.*(发件箱) 里只显示 To: Subject: Date: 三项。而在其它信箱就显示  From: Subject: X-Mailer: Date: 这几项。
<pre>folder-hook . 'ignore *; unignore from subject X-mailer date'folder-hook sent.* 'ignore *; unignore to subject date'</pre>
<p>你还可以指定邮件头显示的顺序：</p>
<pre>hdr_order from to subject date</pre>
</li>
<li>Mutt 怎么使用地址簿呢？你可以用 alias 来实现一个地址簿</li>
</ol>
</li>

---

[📚 返回目录](/needisme-mu-lu/)
