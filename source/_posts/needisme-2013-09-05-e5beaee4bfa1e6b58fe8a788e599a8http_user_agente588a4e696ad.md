---
title: "微信浏览器HTTP_USER_AGENT判断"
date: 2013-09-05 21:47:18
categories: NeedIsMe
tags: ["Mac", "iPhone", "HTML", "Linux", "Android", "PHP"]
---

<p>以下方法可获得</p>
<p><!--?php <br ?--> echo $_SERVER["HTTP_USER_AGENT"];<br />
?></p>
<p>在iPhone下，返回</p>
<p>Mozilla/5.0 (iPhone; CPU iPhone OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/9B176 MicroMessenger/4.3.2</p>
<p>在Android下，返回</p>
<p>Mozilla/5.0 (Linux; U; Android 2.3.6; zh-cn; GT-S5660 Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1 MicroMessenger/4.5.255</p>
<p>可以看到，微信浏览器为 MicroMessenger ，后面还有其版本号与此同时，还可以判断手机类型为iPhone还是Android</p>
<p>判断微信浏览器访问</p>
<p>我们判断HTTP_USER_AGENT中是否有MicroMessenger即可</p>
<p><!--?php <br ?--> if(strpos($_SERVER['HTTP_USER_AGENT'],"MicroMessenger")){<br />
echo "wechat";<br />
}else{<br />
echo "normal";<br />
}<br />
?></p>

---

[📚 返回目录](/needisme-mu-lu/)
