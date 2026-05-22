---
title: "你了解BFS / CFS 吗？"
date: 2010-01-21 09:49:00
categories: NeedIsMe
tags: ["HTML", "Linux", "Android"]
---

<p>* 作者: cosmoswi&hellip;<br />
* 推荐者: gfguh<br />
* 上传日期: 1/18/2010 3:48:22 AM<br />
* 来源：AnGTalk.Com</p>
<p>Linux kernel 2.4之前一直用的某种O(N)调度算法，大概就是所有的cpu用1个全局的link<br />
list，也用一个超大的lock来做保护，这种坏处就不说了。</p>
<p>后来一个叫Ingo的人进入了kernel的dev，提出了O(1)算法，每个cpu都有一个run<br />
queue，O(1)算法就是我们在早年各种kernel书里必介绍的算法了，每个进程都有一个time<br />
slice，然后用完了就要被deschedule了。</p>
<p>再后来，CK大人(Con Kolivas)07年的时候提出了Rotating<br />
StaircaseDeadline算法，基于PacketSwitching中常用的fairqueueing。这也就是大名鼎鼎的ck补丁(部分)，但没能成功被kernel接纳。关于fairqueueing可以参看wikipedia。</p>
<p>之后Ingo在这个基础上写了CFS, Completely Fairness<br />
Scheduler。Ingo也是个牛人，他花了62个小时就写出了100k的CFS<br />
patch并且release了出去。当然CK大人就很不高兴了，于是在mailing list上有过一番争吵，然后CK似乎酒销声匿迹了。</p>
<p>CFS主要是用了virtual<br />
runtime的概念(对应fairqueueing里的virtualtime)，每个进程都有维护一个vruntime，scheduler总是挑最小的那个switch过去。在每个时间中断时更新当前进程的vruntime值，vruntime+=ticks/weight，weight值根据<br />
nice值来确定的，是一个指数关系。一旦当前运行的进程不再是最小的vruntime，就会进行scheduling。数据结构CFS采用的是Red-blackTree，O(logn)复杂度，但又维护了一个变量保存left-most节点也就是queue里最小的vruntime。另外Ingo在写的时候对scheduler做了模块化，有个sched_class的structure，里面就是各种函数指针<br />
orz。慢慢的，CFS就是我们现在的默认scheduler了。</p>
<p>关于CFS有些挺有用的资料：<br />
1. 一个介绍的ppt: <a href="http://www.linux-foundation.jp/jp_uploads/seminar20080709/lfjp2008.pdf">http://www.linux-foundation.jp/jp_uploads/seminar20080709/lfjp2008.pdf</a><br />
2. <a href="http://www.ibm.com/developerworks/linux/library/l-cfs/index.html">http://www.ibm.com/developerworks/linux/library/l-cfs/index.html</a><br />
3. Mailing list的一些讨论: <a href="http://kerneltrap.org/node/8208">http://kerneltrap.org/node/8208</a><br />
4. Kernel代码里 Document/scheduler/sched-design-CFS.txt 和 kernel/sched_fair.c</p>
<p>两年之后，CK再次出山，带来了BFS，Brain F u c k<br />
Scheduler。CK认为现在的Scheduler包括CFS用在个人电脑上浪费了太多的cpu在处理scheduling和cpu load<br />
balance（kernel要支持4096个cpu）。BFS用了超简单的算法，来获得在并没有那么多核时的性能突破。BFS就是一个全局的List，一个lock(不算realtime的100个list和另外两个和算法关系不大的list)，复杂度O(n)。BFS也是借鉴fair<br />
queueing，使用virtual deadline = jiffies +<br />
(prio_ratio*rr_interval)作为timeslice，一个进程用完之后就不得不被schedule了。rr_interval是可配置的参数，CK在document里还给出了一些指导。</p>
<p>在CK发布没多久，Ingo同学就在Mailing<br />
list里发布了他对bfs的一些评测，但他错误的采用了公司非常nb的测试机，跑出来的结果不那么优秀。但用户们普遍反应在双核和四核机器上性能提升显著。</p>
<p>-----------------------------------------------------------------------------------------------------------------------------------------</p>
<p>关于 BFS 的消息是最先在 Linux Magazine 上看到的；不久之后 G1 Android 手机 ROM 修改大神 CM<br />
开始在他的测试版 CyanogenMod 使用 BFS 作为 kernel 的 Scheduler，试用之后发现手机系统速度明显加快。<br />
用手滑动左右翻屏就像 Opera 下滚动网页那么平滑，搞得屏幕覆膜上多了好多指纹印。心痒已久，恰逢 Linux kernel 2.6.31<br />
新版正式发布，打上 BFS Patch 编译，重启。神一样的提速再次出现在我 4 年高龄的笔记本电脑上，注入了鸡血的 KDE4<br />
让人无比兴奋。快！快！快！</p>
<p>所以，BFS 是什么？ 要知道 BFS 是什么最好先了解一下它的作者，传说中的澳洲猛士 CK。</p>
<p>CK，Con Kolivas，男， 澳大利亚中年男子，资深内核 hacker。众所周知，Linux Kernel<br />
是聚集了一帮天才蠢才和暴君怪胎的地方，CK 貌似最适合这种地方的人。是真的貌似，一张电影里面典型高智商通缉犯的脸。</p>
<p>几年前编译 Linux kernel，ck 补丁集就是系统提速的代名词。当时编译内核的三部曲是下 kernel 源码，打上 ck<br />
补丁集，编译安装。后来上游代码将 ck 补丁集稳定的部分不断吸收，它的影响力也渐渐消失。</p>
<p>CK 本身对任务调度有很深的造诣，他聪明而经典地实现了 fair scheduling，而实现模式被 Igor 借鉴改进最终写出了现在<br />
kernel 用的进程调度管理器 CFS (Completely Fair Scheduler)。不得不顺便介绍一下任务调度。Kernel<br />
的进程调度主要是将 CPU 资源分配给各种驱动、进程等等。你可能听说过，一般人的大脑使用率不足 20%<br />
这种科学或者伪科学言论。但事实是，你电脑上的 CPU 从来就没有真正被 100% 的利用过（别跟我说你在资源管理器里面看到过 CPU<br />
100%，我还见过 101% 呢）。如何将各种运算任务一刻不停又有条不紊的塞给 CPU<br />
处理是一门严肃的科学，绝不是电视购物导购能解决的问题。一次塞的运算量少了，CPU 闲着，运算时间增长，电脑慢了；而一次塞的运算多了，CPU<br />
忙不过来，运算又要在门口排队，电脑也慢了。进程调度主要是用算法解决这个问题，而现在 Linux Kernel 用的 CFS<br />
据说非常经典，在不同情况下都可达到相当高的 CPU 利用率。而现用 CFS 也是在 2.6.23 才加入的，取代原来 O(1)，直接将<br />
Linux 桌面速度从 XX 时代带入了 XX+N 时代。</p>
<p>两年前，CK 淡出了内核开发，忽然从江湖中蒸发。几周前，CK 重出江湖，两年磨一剑，带来了 BFS ，全称 Brain Fuck<br />
Scheduler （只认识中间那个单词的请参考谷歌翻译），声称专为低端硬件设计（我的理解是不超过 10 个 CPU<br />
的电脑电视手机游戏机都算低端机），说白了就是比 Kernel 默认要更加山崩地裂海枯石烂房价上涨油价飞升的快。BFS<br />
为什么叫这个名字？为了中文用户，不能三个词让他们一个也不懂吧？ 好吧，这名字有点不雅，不过算是直爽。对了，据说 CK<br />
也是看到上面我提到的漫画才开始剑走偏锋。真正有几个人用有上千 CPU 的电脑呢？为什么要为这种扩展性牺牲桌面性能。BFS<br />
就在其间做了取舍，仅仅支持最多 16 个 CPU<br />
，把问题外沿做小，让算法更简单精悍高效。作为原理来讲，这足够解释速度的来源。对于其它废问题， CK 专门写了一个<br />
FAQ。在可以预见的将来，BFS 也不会进入 mainline kernel，说白了是取向问题。</p>

---

[📚 返回目录](/needisme-mu-lu/)
