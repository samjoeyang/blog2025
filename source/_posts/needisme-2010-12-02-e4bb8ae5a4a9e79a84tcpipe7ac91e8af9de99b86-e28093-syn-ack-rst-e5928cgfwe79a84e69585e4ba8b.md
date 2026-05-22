---
title: "今天的TCP/IP笑话集 &ndash; syn ack rst 和gfw的故事"
date: 2010-12-02 11:52:00
categories: NeedIsMe
tags: ["Programmers", "编程"]
---

<p>原始来源：<a href="http://phoeagon.byethost15.com/blog/2010/11/14/%E4%BB%8A%E5%A4%A9%E7%9A%84tcpip%E7%AC%91%E8%AF%9D%E9%9B%86-syn-ack-rst-%E5%92%8Cgfw%E7%9A%84%E6%95%85%E4%BA%8B/">http://phoeagon.byethost15.com/blog/2010/11/14/今天的tcpip笑话集-syn-ack-rst-和gfw的故事/</a></p>
<div>何亮：</p>
<p>加IT师兄为好友。弹过来的第一句话是:&rdquo;syn&rdquo;百度了半天回了句:&rdquo;ack?&rdquo;IT师兄于是很满意地说:&rdquo;Yes.&rdquo;</p>
<p>加师妹为好友，效仿IT师兄发过去一条&rdquo;syn&rdquo;，师妹回复&rdquo;rst&rdquo;</p>
<p>phoeagon:</p>
<p>找师弟传一张纸条求师妹交往，写上syn。过几天师弟转来了rst。再过几天师妹表示她发送了syn+ack，而收到了rst。</p>
<p>看看TCP/IP协议的三次握手原则。<br />
<img src="http://farm5.static.flickr.com/4106/5223426740_7f31a4c939_z.jpg" alt="" /></p>
<p>首先看右边服务器处理请求之前。那三条就是三次握手了。。。</p>
<p>首先client发送syn,seq=X. X是某个值。server如果收到，会回复syn,ack=x+1,seq=y. 即回复了syn，ack设置为序列号+1，序列号设置为y。</p>
<p>当client收到syn,ack之后会回复ack=y+1.</p>
<p>总的规律是，三次flag+1.</p>
<p>所以，第一个笑话中完成了第一、二次握手。</p>
<p>第二个中，师妹回复的rst表示重置链接。rst一般表示服务器超负荷或因为其他原因不能正常处理服务请求。。。</p>
<p>最后就是第三个了。</p>
<p>看看发生了什么。发送给师妹一个syn，表示客户端试图发起一个连接。这时候收到了师弟的rst。可是师妹并没有发送rst。而是发送了syn,ack表示接收连接，同时师妹也得到了一个rst。rst收到后，根据标准的TCP/IP协议，收到的会挂断连接。就是，发送syn的我认为遇到了笑话二中的情况。而师妹也认为连接被挂断了。</p>
<p>所以连接被师弟处于某种目的强制挂断了。</p>
<p>过了几分钟，终于有第一个回复看懂了。。。。师弟相当于GFW。</p>
<p>如果是这样的话，只要&ldquo;我&rdquo;够耐心，还可以收到syn,ack. 但是根据标准&ldquo;礼仪&rdquo;，收到rst后就会立刻挂断连接，即使后来收到了syn,ack。</p>
<p>正如这个笑话展示的，如果&ldquo;我&rdquo;和师妹约定不遵从礼仪，强制忽略rst。而师弟也严格遵循gfw设计，我们还是可以正常通信。</p>
<p>事实上，这个比喻有一个缺陷。如果中间设备是一个防火墙，就相当于师弟能做到的了。师弟可以发送rst后根本不继续转交数据包。这样&ldquo;我&rdquo;和师妹的约定是没有用的，数据包被&ldquo;没收&rdquo;了。然而对gfw的许多次黑箱测试表明，我们需要更改师弟的角色。</p>
<p>假设说&ldquo;我&rdquo;和师妹之间有一个通信渠道N个同学，他们都严格诚信地会转发&ldquo;我&rdquo;和师妹之间的通信。但是在其中某个同学，和那个居心不良的额师弟也是friend。师弟可以看到我发给师妹的内容，但是没有办法从正义的friend中拿到并销毁&ldquo;我&rdquo;的消息。</p>
<p>于是师弟伪造了两张纸条写上rst。一张拿给我，另一张拿给师妹。</p>
<p>如果师弟动作够快，在我收到师妹的回复之间把RST送到我手中，我会认为连接被挂断。同样的，如果动作够快，师妹也会直接得到rst而挂断连接。即使动作不够快，收到rst的时候也会挂断连接。这就出现了有时候收到师妹的一部分信息之后被重置的情况。。。。。</p>
<p>//请由此喻体自行想象本体</p>
<p>然而，为什么师弟不能采取直接没收信息的办法呢？因为现实中，师弟不仅要处理&ldquo;我&rdquo;和师妹之间的通信，还同时审查其他几亿个师兄和几亿个师妹之间的通信。。。</p>
</div>

---

[📚 返回目录](/needisme-mu-lu/)
