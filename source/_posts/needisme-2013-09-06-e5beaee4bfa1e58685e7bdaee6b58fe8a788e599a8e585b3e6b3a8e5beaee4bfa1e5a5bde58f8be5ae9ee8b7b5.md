---
title: "微信内置浏览器关注微信好友实践[已失效]"
date: 2013-09-06 12:44:28
categories: NeedIsMe
tags: ["iPhone", "Android"]
---

<p>在微信公众账号发布的图文信息中的原文链接中可以插入一段代码，通过这段代码可以实现关注其他的微信公众账号，是不是很神奇呢？不过这么做与微信官方的政策相抵触，请谨慎使用。</p>
<p>//通过关注微信好友</p>
<p>function WeiXinAddContact(wxid)<br />
{<br />
if (typeof WeixinJSBridge == 'undefined') return false;<br />
WeixinJSBridge.invoke('addContact', {<br />
webtype: '1',<br />
username: wxid<br />
}, function(d) {<br />
// 返回d.err_msg取值，d还有一个属性是err_desc<br />
// add_contact:cancel 用户取消<br />
// add_contact:fail　关注失败<br />
// add_contact:ok 关注成功<br />
// add_contact:added 已经关注<br />
// WeixinJSBridge.log(d.err_msg);</p>
<p>});<br />
};<br />
//通过微信分享<br />
function WeiXinShareBtn() {<br />
if (typeof WeixinJSBridge == "undefined") {<br />
alert("请先通过微信xxxx");<br />
} else {<br />
WeixinJSBridge.invoke('shareTimeline', {<br />
"title": "xxx",<br />
"link": "http://www.xxx.com",<br />
"desc": "关注xxx",<br />
"img_url": "http://www.xxx.com/xxx.png"<br />
});<br />
}<br />
}</p>
<p>上面的代码目前在微信内置浏览器才有效果<br />
WeiXinAddContact中的微信wxid需要 微信的原始id，为什么呢？<br />
例如美食行的微信id:meishixing,原始id：gh_6cc3b345c2f2，<br />
在iphone版本的微信中使用两种id都能完成正常的关注，但是在android版本的微信meishixing这个无法返回一直停留在&ldquo;正在关注。。。&rdquo;，修改成id：gh_6cc3b345c2f2，就正常了。这个问题找来好久。。。<br />
如果用户希望用户在打开页面的时候，直接能弹出关注的对话框</p>
<p>//init<br />
function r(f){(typeof WeixinJSBridge == 'undefined'||(typeof WeixinJSBridge.invoke == 'undefined'))?setTimeout('r('+f+')',200):f()}<br />
r(function(){<br />
WeiXinAddContact("gh_6cc3b345c2f2");<br />
});</p>
<p>微信内置浏览器会有WeixinJSBridge，但是需要一定的加载时间，WeixinJSBridge 有了之后 WeixinJSBridge.invoke也不一定有，所有看到r这个函数了把。。。（ps:每次打开都弹多不好意思阿，所以需要通过cookie来控 制，WeiXinAddContact回调状态来设置cookie和通过cookie判断是否要执行init的部分的r）</p>

---

[📚 返回目录](/needisme-mu-lu/)
