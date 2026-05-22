---
title: "ubuntu菜鸟命令收集"
date: 2010-12-08 16:25:00
categories: NeedIsMe
tags: ["LINUX", "Linux", "系统管理", "Vim", "Ubuntu", "Shell"]
---

<p>[本菜鸟仅仅收录了菜鸟常用的命令,旨在方便新手入门,HX类生物就不用看了,以免被雷到 lol ]<br />
所有命令按字母顺序排列,只介绍最常用参数,相信等你看完之后,就有能力man更详细的用法了</p>
<p>此前own也曾发表过几篇文章,详细的介绍了几个命令比如ls,sudo,chmod等等,看不懂man的,请自行查找:)</p>
<p>直到前天群里有人问cd命令怎么用..暴寒~~想想也是,一定有很多在win下也没接触过命令的吧?于是决定写点东东</p>
<p><strong>apt-get:</strong></p>
<p>debian系系统的软件包管理程序(其图形化前端就是大名鼎鼎的新立得了),会自动帮你搞定依赖关系</p>
<p>最常用参数:</p>
<p>update        &mdash;-与你的软件源(在/etc/apt/sources.list中列出)更新软件包列表,换源后需要执行</p>
<p>upgrade        &mdash;-根据update得到的源软件库与本地已经安装的对比,(如果需要升级就)全部升级</p>
<p>install        &mdash;-安装软件包(可以使用tab补全软件包的名字,比较方便)</p>
<p>remove        &mdash;-卸载软件包</p>
<p>purge        &mdash;-卸载软件包,同时删除该软件的配置文件</p>
<p>source        &mdash;-从源里下载软件包的源码到当前目录(执行此命令的目录)并解压(除非指定&ndash;download-only参数)</p>
<p>该地址由/etc/apt/sources.list中的 deb-src 行指定</p>
<p>check        &mdash;-用来(自动)修复(已装)软件包之间的依赖关系</p>
<p>clean        &mdash;-清除/var/cache/apt/archives/包括其子目录partial/下的所有软件包缓存</p>
<p>autoclean    &mdash;-比clean常用,我的理解是删除低版本的缓存而保留高版本的(或者包括非当前源里的软件包?)</p>
<p><strong>aptitude:</strong></p>
<p>此为PT同学补充,他的说法是aptitude比apt-get少个横线,tab补全比较容易(=.=)~大概神牛都比较懒吧</p>
<p>不得不提下蛋蛋童鞋以前说过的ubuntu彩蛋:) <仅限于UBUNTU 8.04></p>
<p>man apt        &mdash;-最后会看到 &ldquo;本apt有着超级牛力&rdquo; or &ldquo;this APT has a super-cow power&rdquo;</p>
<p>man aptitude    &mdash;-会看到 &ldquo;这个aptitude没有超级牛力&rdquo;</p>
<p>看看aptitude的参数,你就会明白为什么aptitude会标称&rdquo;高级软件包管理程序&rdquo;了</p>
<p>最常用参数:</p>
<p>search        &mdash;-在(你的源的)所有软件包列表中搜索该软件,search的表达式可以很复杂,具体看man</p>
<p>其余常用参数同apt-get</p>
<p><strong>cat:</strong></p>
<p>把(一个或多个)文件内容(连接)显示到标准输出</p>
<p>当文本文件很小,而且你只是想看下,并不打算用gedit或者vim之类编辑器编辑的时候,可以cat一下,我是用来配合grep使用</p>
<p><strong>cd:</strong></p>
<p>切换当前工作目录</p>
<p>不同于其他命令,这是一个shell内置命令,所以没有手册页可看&hellip;够基础,所以才会出现在本篇文章中(=.=)郁闷</p>
<p>最常用参数:</p>
<p>.        &mdash;-切换到当前目录(貌似没有什么意义)(.这个目录可以通过ls -a看到)</p>
<p>..        &mdash;-切换到上层目录</p>
<p>~        &mdash;-回到家目录(/home/你的登录名/)</p>
<p><strong>chmod</strong>:</p>
<p>改变文件的权限位</p>
<p>linux文件系统的权限位有两种表示方法,要是详细说下,非得累死老鼠不可=.=,所以只说8进制数表示:)</p>
<p>简要介绍下:ls -l可以显示出文件的权限,比如(-rwxr-xr&ndash;),代表了三种用户的权限</p>
<p>第一个rwx,代表文件所有者的权限,即(读,写,执行),用二进制表示为111,代表八进制中的4+2+1=7</p>
<p>第二个r-x,代表文件所有者同一用户组其他用户的权限,即(读, ,执行),用二进制表示为101,代表八进制中的5=4+0+1</p>
<p>第三个r&ndash;,代表其他用户的权限,即(读, , ),二进制表示为100,代表八进制的4=4+0+0</p>
<p>所以这个文件的权限位为754</p>
<p>这也就是chmod的用法,例如chmod 751 myfile #将该文件权限设定为rwxr-x&ndash;x</p>
<p>最常用参数:</p>
<p>-v        &mdash;-列出当前正在执行的步骤</p>
<p>-R        &mdash;-递归式,即改变非空目录下的一切为指定权限</p>
<p><strong>cp</strong>:</p>
<p>拷贝文件和目录</p>
<p>最常用参数:</p>
<p>-b        &mdash;-为每个已经存在的目的文件作个备份</p>
<p>-d        &mdash;-遇到软链接时不拷贝软链接所指向的文件;拷贝时保留links属性(链接数)</p>
<p>-p        &mdash;-保留文件的访问权限,所有者,和时间戳</p>
<p>-R和-r    &mdash;-递归式拷贝(cp过程遇到非空目录才有效),即拷贝目录,子目录,子目录的子目录&hellip;..</p>
<p>-a        &mdash;-作用同-dpR</p>
<p>-s        &mdash;-并不真的做拷贝,而只是为每个文件作软链接(符号链接)</p>
<p>-u        &mdash;-同下面 mv 的-u参数</p>
<p><strong>head, tail</strong></p>
<p>就像这两个名字,一个显示文件头部,一个显示尾部</p>
<p>最常用参数:</p>
<p>-n        &mdash;-指定输出的(头部或尾部)行数, 当没有此参数时,默认显示10行</p>
<p><strong>ifconfig</strong>:</p>
<p>配置网卡</p>
<p>最常用参数:</p>
<p>没有参数        &mdash;-列出当前活动网卡的状态</p>
<p>-a            &mdash;-列出所有网卡的状态</p>
<p>interface    &mdash;-指定网卡名称比如eth0</p>
<p>up            &mdash;-唤醒该网卡</p>
<p>down        &mdash;-关闭该网卡</p>
<p>arp,mtu,netmask addr,&hellip;等等很多参数 =.=</p>
<p><strong>ln</strong>:</p>
<p>为文件建立链接</p>
<p>linux的链接分为两种:硬链接和软链接,ln默认建立硬链接(hard link),两种的区别请自己搜索:)</p>
<p>最常用参数:</p>
<p>-s        &mdash;-建立软链接(符号链接,可以理解为win下的快捷方式)</p>
<p>-f        &mdash;-如果要建立的链接名已经存在,则删除之</p>
<p><strong>ls</strong>:</p>
<p>显示目录内容</p>
<p>最常用参数:</p>
<p>-a        &mdash;-显示指定目录所有文件,包括文件名以 . 开头的文件</p>
<p>-l        &mdash;-显示文件详细信息(包括文件类型,权限,修改时间,访问时间,大小,文件名&hellip;)</p>
<p>-h        &mdash;-将文件大小以方便阅读的形式表示出来,配合 -l 参数使用,常有奇效</p>
<p><strong>man</strong>:</p>
<p>阅读参考手册of~</p>
<p>题外话:HX说这是linux最最难学的命令,因为man你学好了,就没有什么命令能难倒你了,=.=无敌了</p>
<p>man可以查的不仅仅是命令额(当然,因为man是无敌的嘛/ch)</p>
<p>最常用参数:</p>
<p>man 阿拉伯数字</p>
<p>阿拉伯数字1: 可执行程序(一般为用户安装的程序,如果提供了manpages的话)和shell命令</p>
<p>阿拉伯数字2: 系统调用(例如 open调用,socket调用,chmod调用 等等等等),先装manpages-dev先</p>
<p>阿拉伯数字3: 库函数调用(例如 man 3 printf),先装manpages-dev先</p>
<p>&hellip;&hellip;.</p>
<p>当你执行man ls 时, 和 man 1 ls结果是一样的,因为ls在man手册中只有一个入口</p>
<p>当你想看chmod调用的手册页时,就要特别指定 man 2 chmod了~~因为chmod不止有一个入口</p>
<p>在man的时候,可以通过j,k上下移动(和vi中类似),可以通过/查询,通过n,N查找下个,上个匹配(和vi类似)</p>
<p>q退出(也和vi类似&hellip;.)</p>
<p>比较有意思的一点:</p>
<p>由于man 本身是个命令,所以,连man都是可以man的 =.=</p>
<p><strong>mkdir</strong>:</p>
<p>创建一个目录</p>
<p>最常用参数:</p>
<p>-p        &mdash;-如果给出的路径中父目录不存在,则同时创建父目录</p>
<p><strong>mount</strong>:</p>
<p>挂载文件系统(可理解为挂载一个分区)</p>
<p>最常用参数:</p>
<p>-t        &mdash;-指定文件系统类型,比如iso9660(挂载iso镜像为光盘,相当于虚拟光驱),ntfs,ext3,rfs等等</p>
<p>-l        &mdash;-列出所有已经挂载的文件系统,支持卷标</p>
<p>-a        &mdash;-挂载fstab中记录的所有分区<strong><br />
r /><br />
-n        &mdash;-挂载的时候不写入/etc/mtab</strong></p>
<p><strong>-o        &mdash;-相当常用的一个参数,指定挂载文件系统的&rdquo;选项&rdquo;,比如noatime,用来挂载BT专用分区很合适</strong></p>
<p><strong></strong><strong>mv</strong>:</p>
<p><strong>移动或者更名文件,取决于目的目录是否为当前目录</strong></p>
<p><strong>最常用参数:</strong></p>
<p><strong>-b        &mdash;-为每个已经存在的目的文件做个备份(防止覆盖)</strong></p>
<p><strong>-f        &mdash;-不提示是否覆盖已经存在的目的文件</strong></p>
<p><strong>-i        &mdash;-与-f参数相反</strong></p>
<p><strong>-u        &mdash;-仅当源文件比目的文件更新或者目的文件不存在时候才移动</strong></p>
<p><strong>-v        &mdash;-显示移动文件的进度(个人总是推荐使用此参数,明白你在做什么)</strong></p>
<p><strong></strong><strong>ps,top:</strong></p>
<p><strong>列出当前命令的执行状态,ps为静态,top为动态(top时&rsquo;q&rsquo;退出)</strong></p>
<p><strong>ps:这个命令本人更常用些,推荐给你看看=.=</strong></p>
<p><strong>最常用参数(ps多用参数集合,而不是单个参数,并且配合grep使用)</strong></p>
<p><strong>-ef        &mdash;-以标准语法列出当前所有进程状态,例如ps -ef | grep eva #列出eva的进程状态</strong></p>
<p><strong>aux        &mdash;-以BSD语法列出&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;..</strong></p>
<p><strong>-ejH    &mdash;-列出进程树</strong></p>
<p><strong>-eLf    &mdash;-同时列出线程状态</strong></p>
<p><strong></strong><strong>rm, rmdir:</strong></p>
<p><strong>rm:删除文件或目录,rmdir:删除一个空目录(此命令个人认为没啥用,可以用rm -r替代)</strong></p>
<p><strong>rm最常用参数:</strong></p>
<p><strong>-f        &mdash;-不提示不存在的文件,直接跳过</strong></p>
<p><strong>-i        &mdash;-每个删除动作都提示 (=.= 删除多的话岂不是烦死)</strong></p>
<p><strong>-I        &mdash;-删除多个文件(多于3个时)或者递归式删除(对于非空目录)提示一次</strong></p>
<p><strong>-r和-R    &mdash;-递归式删除该目录下的一切东东</strong></p>
<p><strong>-v        &mdash;-显示每个文件的删除动作(个人总是推荐使用此参数,明白你在做什么)</strong></p>
<p><strong></strong><strong>sudo,su:</strong></p>
<p><strong>这大概是装好系统之后第一个要用的命令吧?</strong></p>
<p><strong>sudo我们主要用来临时提升权限,主要用以管理员(超级用户)的权限来运行命令,当需要修改当前登录用户力所不能及的文件/目录</strong></p>
<p><strong>时需要用sudo,或者su -c,当然sudo和su的作用范围不仅仅如此</strong></p>
<p><strong>可以使用visudo来编辑/etc/sudoers文件来修改sudo更详细的动作(比如记住密码的时间戳长度),请谨慎修改!</strong></p>
<p><strong></strong><strong>sh:</strong></p>
<p><strong>在终端解释执行</strong></p>
<p><strong>类似于&rsquo;./&rsquo;的形式,但PT给了不同点: &lsquo;./&rsquo;仅仅对当前目录下有执行权限的程序才有效,&rsquo;sh&rsquo;则不管这套</strong></p>
<p><strong>想想也是哈, &lsquo;./&rsquo;仅仅是给出了一个文件的路径(在当前目录下)而已, 但这个文件能不能执行就不好说了</strong></p>
<p><strong>所以用sh总是正确的</strong></p>
<p><strong></strong><strong>shutdown:</strong></p>
<p><strong>关闭系统,如果停留在TTY,请改用halt, poweroff等命令</strong></p>
<p><strong>常用参数:</strong></p>
<p><strong>+m        &mdash;-指定关机延迟的分钟</strong></p>
<p><strong>-c        &mdash;-取消一个等待关机的请求(关掉运行此命令的终端也可:))</strong></p>
<p><strong>now        &mdash;-立即关机</strong></p>
<p><strong>hh:mm    &mdash;-手动指定时间(以24小时计)</strong></p>
<p><strong></strong><strong>tar:</strong></p>
<p><strong>打包/解包</strong></p>
<p><strong>这个tar不多说了吧..到处都是tar.gz,tar.bz2的东东</strong></p>
<p><strong>和ps命令一样,tar一般不用单个参数,而是多个参数的组合,记住参数x是解压(extract),c是创建包(creat)即可</strong></p>
<p><strong>最常用参数:</strong></p>
<p><strong>-xvf    &mdash;-详细列出解包的步骤</strong></p>
<p><strong>-cvf    &mdash;-详细列出打包的步骤</strong></p>
<p><strong>-j        &mdash;-用来说明这是个tar.bz2包,例如tar -xjvf myfile.tar.bz2</strong></p>
<p><strong>-t        &mdash;-列出包中的文件列表</strong></p>
<p><strong>&mdash;&ndash;打包时常追加的参数:</strong></p>
<p><strong>-r        &mdash;-追加到压缩包中</strong></p>
<p><strong>-u        &mdash;-只把比包中更新的文件追加进去</strong></p>
<p><strong>-h        &mdash;-不把符号链接添加到包中,而是添加此符号链接指向的文件</strong></p>
<p><strong>附加说明:tar是个太强大的东东,常用的操作也就是打包解包,高级功能还是参阅man =.=</strong></p>
<p><strong></strong><strong>touch:</strong></p>
<p><strong>改变文件时间戳,默认包括修改时间和创建时间,默认修改为当前时间,默认如果文件不存在就新建(=.=是不是很罗嗦)</strong></p>
<p><strong>额&ldquo;差不多就收集了这么多,感谢Ubuntu Linux群(46603737),分群(514034120)众菜的帮助</strong></p>
<p><strong>本文的目的很明确,只方便菜鸟,不收录高级命令</strong></p>
<p><strong>如果还有类似命令没有提及的,在评论中补充即可:)</strong></p>
<blockquote>
<div><strong>文章所处位置：<a href="http://www.linuxhobby.com/">Linux爱好者</a> &raquo; <a title="ubuntu菜鸟命令收集" rel="bookmark" href="http://www.linuxhobby.com/ubuntu-useful-commands/">《ubuntu菜鸟命令收集》</a></strong></div>
<div><strong>本文地址：<a title="ubuntu菜鸟命令收集" rel="bookmark" href="http://www.linuxhobby.com/ubuntu-useful-commands/">http://www.linuxhobby.com/ubuntu-useful-commands/</a></strong></div>
<div><strong>订阅博客地址：<a title="Linux爱好者" href="http://feed.feedsky.com/linuxhobby/">http://feed.feedsky.com/linuxhobby/</a></strong></div>
</blockquote>

---

[📚 返回目录](/needisme-mu-lu/)
