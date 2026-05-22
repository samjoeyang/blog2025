---
title: "解决Gravatar头像问题"
date: 2016-01-08 11:07:49
categories: NeedIsMe
tags: ["互联网", "Internet", "PHP"]
---

<p>方法一：禁用<br />
进入站点后台，打开 &ldquo;设置&rdquo; &rarr; &ldquo;讨论&rdquo;，向下滚动，找到 &ldquo;头像&rdquo; 设置区域，把 &ldquo;显示头像&rdquo; 勾选掉。<br />
<a href="http://needis.me/wp-content/uploads/2016/01/endskin.com_20140704-11.png"><img src="http://needis.me/wp-content/uploads/2016/01/endskin.com_20140704-11.png" alt="endskin.com_20140704-11" width="623" height="280" class="alignnone size-full wp-image-4869" /></a><br />
这样就不会显示 Gravatar 头像了，不过某些主题可能会导致样式错位。<br />
<a href="http://needis.me/wp-content/uploads/2016/01/endskin.com_20140704-12.png"><img src="http://needis.me/wp-content/uploads/2016/01/endskin.com_20140704-12.png" alt="endskin.com_20140704-12" width="470" height="549" class="alignnone size-full wp-image-4870" /></a></p>
<p>方法二：使用https，修改functiom.php页面，加入如下代码</p>
<p>&nbsp;</p>
<blockquote>
<pre>//官方Gravatar头像调用ssl头像链接
function get_ssl_avatar($avatar) {
 $avatar = preg_replace('/.*\/avatar\/(.*)\?s=([\d]+)&amp;.*/','<img src="https://secure.gravatar.com/avatar/$1?s=$2" height="$2" width="$2">',$avatar);
 return $avatar;
}
add_filter('get_avatar', 'get_ssl_avatar');</pre>
</blockquote>

---

[📚 返回目录](/needisme-mu-lu/)
