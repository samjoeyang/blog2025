---
title: "GAE应用&mdash;&mdash;mail2sms，用邮件给MM发短信吧！"
date: 2010-12-06 21:04:00
categories: NeedIsMe
tags: ["Programmers", "编程", "Google"]
---

<p>原始来源：<a href="http://donotdot.cn/project/mail2sms">http://donotdot.cn/project/mail2sms</a></p>
<p>编辑说明：这个东东太棒啦！</p>
<p>以后可以接收邮件了，我通过gmail-gae-calender实现了一个邮件短信提醒工具，延时可控制在1- 2分钟，基本满足实时要求，gae免费的方案可以每日接受7000封邮件，对于个人来讲应该足够用了。</p>
<p>基本原理：邮箱转发->Appengine->Google日历->短信</p>
<p>部署流程：</p>
<p>在你的appengine中新建一个项目</p>
<p>下载代码<br />
在下面的地址下载代码，并解压到任意目录。</p>
<p><a href="http://youngking.googlecode.com/files/mail2sms_beta_20100919.zip">点击下载 beta20100929版</a><br />
<a href="http://youngking.googlecode.com/files/mail2sms_beta_20091104.zip">点击下载 beta20091104版</a></p>
<p>修改目录中的<br />
将application:后面的xx修改为你的项目名称</p>
<p>修改目录中的<br />
将user=&rdquo;xx@gmail.com&rdquo;，pw=&rdquo;xx&rdquo;的引号中的xx修改为你的Google日历的帐户名和密码</p>
<p>上传目录<br />
上传前确认你已经安装了appengine的<br />
用户请运行update.bat ，之后需要输入你的appengine帐户和密码<br />
用户请先修改update.sh中的appengine目录后 运行，之后需要输入你的appengine帐户和密码</p>
<p>测试并设置转发<br />
你可以发送一个邮件至mail@xx.appspotmail.com（将xx替换为你的项目id），然后到你的Google日历中查看是否已经新建了一个名为mail2sms的日历，并且邮件主题已经作为事件添加到了这个日历中，如果不出意外，你将在1分钟内收到提醒邮件。<br />
如果测试成功，你可以在gmail或qq邮箱的设置转发 中将邮件转发至mail@xx.appspotmail.com（将xx替换为你的项目id）。</p>
<p>更新（2010年9月19日）：gmail设置好转发之后需要验证，验证邮件会返回给你的gmail，如果没收到请到gmail垃圾邮件中寻找，标题可能是&ldquo;Delivery Status Notification (Failure)&rdquo;。在邮件中找到验证码，输入后即可转发。</p>
<p>至此设置成功。<br />
如果你有在安装过程中有什么问题，对此项目有什么建议，请直接留言或者发送邮件至<a href="mailto:ohhhhe+mail2sms@gmail.com">ohhhhe+mail2sms@gmail.com</a>，或者gtalk联系</p>

---

[📚 返回目录](/needisme-mu-lu/)
