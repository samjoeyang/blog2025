---
title: "Android 2.2 RC4 真正实现 app2ext"
date: 2010-12-06 14:04:57
categories: NeedIsMe
tags: ["Linux", "Android", "Google", "PHP", "Windows"]
---

<p>来源：机锋网 作者：<a href="http://bbs.gfan.com/space.php?uid=638383" target="_blank">343443594</a></p>
<p><strong>Dream G1 Android 2.2 CM6 RC4 </strong><br />
<strong>一、基础</strong></p>
<p><strong> </strong>1、什么是APP2SD: APP2SD顾名思义就是Application to sd-card的意思，即将应用程序安装在SD卡里，减少手机内存的空间占用。</p>
<p>2、什么是APP2FAT: FAT是一种由微软始创的文件格式，目前各种操作系统均可以支持该文件格式。APP2FAT就是将应用程序安装在手机存贮卡的FAT分区中，是APP2SD的一种实现方法。在Google官方Android 2.2版本中默认提供此方式。</p>
<p>3、什么是APP2EXT:   EXT是Linux操作系统中主要文件格式，由于Android本身就是一种Linux操作系统，故此对该文件格式支持较好。EXT文件格式有多种版本，  如EXT2、EXT3及EXT4。APP2EXT即将应用程序安装在手机存贮卡的EXT分区中，也为APP2SD的一种实现方法。</p>
<p><strong>二、APP2EXT实现步骤</strong><br />
1、为简化操作，建议大家在新刷固件后进行下述操作，如果目前已经使用了APP2FAT，那么需要在最后将已经安装在FAT分区中的程序导入到EXT分区中。</p>
<p>2、进行操作前一定<strong>注意进行备份</strong>。</p>
<p>3、操作前，应对SD卡进行分区（至少分成FAT和EXT两个分区）。分区可在Recovery中操作完成，也可在Windows系统中使用Acronis Disk Director Suite等分区软件完成，详细步骤建议论坛搜索分区教程。<em>（EXT分区建议使用EXT2或EXT3）</em></p>
<p>4、下载这个文件：   <img src="http://bbs.gfan.com/images/attachicons/rar.gif" border="0" alt="" /> <a href="http://bbs.gfan.com/attachment.php?aid=MjY3MTA5fDUzZjEwNDcyfDEyOTE2MTUzMzV8NDFhYW5jSVFBbnZYcXFHNW5UelVjN3dGQTg5dmMyWjdKeSsvSzl4ZWJyYlBWNGc%3D" target="_blank"><strong>fr-patch134.rar</strong></a> (5.63 KB)</p>
<div>
<p>下载次数: 252</p>
<div>2010-8-25 00:42</div>
<p>下载消耗 G币 1</p>
</div>
<p>解压后</p>
<p>并拷贝到SD卡根目录，即/sdcard 。</p>
<p>5、以上操作完成后，打开手机中的&ldquo;超级终端&rdquo;，并进行以下操作：</p>
<ul>
<li>$ su&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;使用root权限</li>
</ul>
<p><em>复制代码</em></p>
<ul>
<li># sh /sdcard/fr-patch134.txt sdext</li>
</ul>
<p><em>复制代码</em></p>
<p>操作完成后，输入：</p>
<ul>
<li># busybox df -h</li>
</ul>
<p><em>复制代码</em></p>
<p>然后在显示出的一大堆里文字里检查是否有sd-ext分区，如果一切顺利那就可以继续进行下一步了。</p>
<p>6、拷贝内存中的app等目录到ext分区：</p>
<ul>
<li># cp -a /data/app /sd-ext/　　　　　　　&nbsp; &nbsp;　拷贝app目录到ext分区</li>
</ul>
<p><em>复制代码</em></p>
<ul>
<li># cp -a /data/app-private /sd-ext/　　　&nbsp; &nbsp;　拷贝收费app-private目录到ext分区</li>
</ul>
<p><em>复制代码</em></p>
<ul>
<li># cp -a /data/dalvik-cache /sd-ext/　　　&nbsp; &nbsp; 缓存dalvik-cache到ext分区</li>
</ul>
<p><em>复制代码</em></p>
<p><em>注意：如果SD卡速较慢，建议不进行&nbsp;&nbsp;cp -a /data/dalvik-cache /sd-ext/ 操作。</em></p>
<p>7、删除内存中的app等目录，对目录设置链接：</p>
<ul>
<li><em># rm -rf /data/app&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;删除手机内存中的app目录及目录中文件</em></li>
</ul>
<p><em><br />
</em><em>复制代码</em></p>
<ul>
<li><em># ln -s /sd-ext/app /data/app&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; 设置链接</em></li>
</ul>
<p><em><br />
</em><em>复制代码</em></p>
<ul>
<li><em># rm -rf /data/app-private&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; 删除手机内存中app-private目录及文件</em></li>
</ul>
<p><em><br />
</em><em>复制代码</em></p>
<ul>
<li><em># ln -s /sd-ext/app-private /data/app-private</em></li>
</ul>
<p><em><br />
</em><em>复制代码</em></p>
<ul>
<li><em># rm -rf /data/dalvik-cache</em></li>
</ul>
<p><em><br />
</em><em>复制代码</em></p>
<ul>
<li><em># ln -s /sd-ext/dalvik-cache /data/dalvik-cache</em></li>
</ul>
<p><em><br />
</em><em>复制代码</em></p>
<p><em></em><em>注意：如果第6部时未进行# cp -a /data/dalvik-cache /sd-ext/ 操作，请不要进行 rm  -rf  /data/dalvik-cache及 ln -s /sd-ext/dalvik-cache /data/dalvik-cache </em></p>
<p>8、做完以上全部操作请输入：</p>
<ul>
<li># reboot</li>
</ul>
<p><em>复制代码</em></p>
<p>重启后即可，检查一下你的内存剩余空间吧。</p>
<p>9、如果以前已经进行过APP2FAT的（即将程序安装在FAT分区内的），请先在设置&mdash;&mdash;N多设置&mdash;&mdash;安装中将允许移动程序选项选中，随后进入设置&mdash;&mdash;应用程序&mdash;&mdash;管理应用程序&mdash;&mdash;SD卡中，选中程序将程序移至内存即可。</p>
<p><strong>三、截图展示</strong></p>
<p><img src="http://bbs.gfan.com/images/default/attachimg.gif" border="0" alt="" /> <img src="http://bbs.gfan.com/attachments/day_100825/1008250047d50fc6902b7503b1.jpg" alt="yhjkh.jpg" width="326" /></p>
<div>
<p><a title="yhjkh.jpg" href="http://bbs.gfan.com/attachment.php?aid=MjY3MTIyfDhjOTdmNGU1fDEyOTE2MTUzMzV8NDFhYW5jSVFBbnZYcXFHNW5UelVjN3dGQTg5dmMyWjdKeSsvSzl4ZWJyYlBWNGc%3D&amp;nothumb=yes" target="_blank"><strong>下载</strong></a> (31.23 KB)</p>
<div>2010-8-25 00:47</div>
</div>
<p>程序安装在sd上设置：设置&mdash;-Cyanogenmod设置&mdash;-程序设置&mdash;-安装位置&mdash;&ndash;储存卡</p>
<p>sd卡必须是分区过的装个swap那速度爽死你！</p>
<p>swap<br />
<strong>使用方法：<br />
<img src="http://bbs.gfan.com/images/attachicons/binary.gif" border="0" alt="" /> <a href="http://bbs.gfan.com/attachment.php?aid=MjY2Mjc0fDhhM2EyOTBmfDEyOTE2MTUzMzV8NDFhYW5jSVFBbnZYcXFHNW5UelVjN3dGQTg5dmMyWjdKeSsvSzl4ZWJyYlBWNGc%3D" target="_blank"><strong>swapper1.3.apk</strong></a> (19.77 KB)</strong></p>
<div>
<p><strong>下载次数: 324</strong></p>
<div><strong>2010-8-24 18:33</strong></div>
<p><strong>下载消耗 G币 1</strong></p>
</div>
<p><strong>有两种设置高速缓存分区的方式：</strong></p>
<p><strong>第一种是创建一个Swap文件到SD卡的Fat32分区，大小可以自定义设置。</strong></p>
<p><strong>第一种貌似很多童鞋都不会设置，简单讲下具体设置情况。有电脑的话我上下图。</strong><br />
<strong>进入软件主菜单，点击设置，把</strong><strong>swap</strong>位置和<strong>swap</strong>大小设置好。高级选项&rarr;使用<strong>swap</strong>分区的勾去掉（很多童鞋反应都是fail很大一部分都是这个勾没去掉，，特别注意一下）&rarr;返回进入主菜单&rarr;创建<strong>swap</strong>&rarr;<strong>swap</strong> on &rarr;获取信息查看是否已经开启成功。</p>
<p><strong>另一种是你的SD卡已经有Swap分区，但是未开启，那么可以使用它来开启</strong><br />
<strong>1.首先你必须已经有Swap分区，新手可以使用内置分区功能的Recovery分区</strong><br />
<strong>2.运行Swapper，点击【设置】找到【高级选项】，</strong><br />
<strong>3.勾选『使用SWAP分区』，点击下面的『SWAP分区』查看是否与你的SD卡分区相对应，在第三分区。。确定后，返回主界面。</strong><br />
<strong>4.点击【Swap ON】，最后点击【获取信息】看看是否开启成功。成功后第四行 Swap: 93864KB</strong></p>
<p><strong>本人实测，后台开照相、音乐、网页、QQ等10来个程序，按小房子瞬间返回桌面！不再出现黑屏20秒或者桌面程序长期无响应！运行速度依然流程！</strong></p>
<p><strong>每次开机或设置过swap都会关闭，重新点下swap on就可以</strong><br />
<strong><br />
</strong></p>
<div>
<p><strong><a title="123.jpg" href="http://bbs.gfan.com/attachment.php?aid=MjY2Mjg5fDdhZjliNWVlfDEyOTE2MTUzMzV8NDFhYW5jSVFBbnZYcXFHNW5UelVjN3dGQTg5dmMyWjdKeSsvSzl4ZWJyYlBWNGc%3D&amp;nothumb=yes" target="_blank"><strong>下载</strong></a> (111.85 KB)</strong></p>
<div><strong>2010-8-24 18:41</strong></div>
</div>
<p><strong> </strong></p>
<div>
<dl>
<dt>
</dt>
<dd><a href="http://bbs.gfan.com/attachment.php?aid=MjY3MTIzfDE0YjViMTFlfDEyOTE2MTUzMzV8NDFhYW5jSVFBbnZYcXFHNW5UelVjN3dGQTg5dmMyWjdKeSsvSzl4ZWJyYlBWNGc%3D&amp;nothumb=yes" target="_blank">yhjkh.jpg</a> <em>(31.23 KB)</em></p>
<div>
<div>
<p>下载次数:2</p>
<p>2010-8-25 00:47</p>
</div>
</div>
<p><img src="http://bbs.gfan.com/attachments/day_100825/100825004762a9b3f28a06c110.jpg" alt="yhjkh.jpg" width="326" /></p>
</dd>
</dl>
</div>

---

[📚 返回目录](/needisme-mu-lu/)
