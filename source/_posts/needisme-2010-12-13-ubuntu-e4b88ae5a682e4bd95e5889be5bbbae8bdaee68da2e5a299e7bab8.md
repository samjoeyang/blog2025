---
title: "Ubuntu 上如何创建轮换墙纸"
date: 2010-12-13 12:51:00
categories: NeedIsMe
tags: ["XML", "LINUX", "Linux", "系统管理", "PHP", "Ubuntu"]
---

<p>投稿文章：<a href="http://www.naich.org/2010/ubuntu-desktop-with-many-wallpapers/">原文链接</a><br />
如果我们留心的话，会发现 Ubuntu 在自带的桌面中，有几组是以好几张图片轮换组成的！也就是说，Ubuntu或者说Gnome桌面完全也可以实现类似的功能。那么这个功能是如何实现的呢？经过一番查找，我发现这个问题早已经有人研究过了（<a href="http://forum.ubuntu.org.cn/viewtopic.php?f=86&amp;t=266567">链接</a>）。</p>
<p>原来Ubuntu的桌面管理可以支持xml文件写成的脚本，从而实现进一步的功能。不仅可以实现多张图片轮换出现，还可以定义每张图片显示的时间，图片切换的淡入淡出时间等，甚至经过合适的修改，可以在每天固定的时间显示对应的桌面（比如早饭的时候显示点早饭，午饭的时候桌面变成午餐..好吧，我就在想吃的..）。</p>
<p>我们可以很容易的找到这样xml的样例，例如 /usr/share/backgrounds/cosmos/background-1.xml ，内容如下：</p>
<blockquote><p>01 <background></p>
<p>02 <starttime></p>
<p>03 <year>2009</year></p>
<p>04 <month>08</month></p>
<p>05 <day>04</day></p>
<p>06 <hour>00</hour></p>
<p>07 <minute>00</minute></p>
<p>08 <second>00</second></p>
<p>09 </starttime></p>
<p>10 <!&ndash; This animation will start at midnight. &ndash;></p>
<p>11 <static></p>
<p>12 <duration>1795.0</duration></p>
<p>13 <file>/usr/share/backgrounds/cosmos/cloud.jpg</file></p>
<p>14 </static></p>
<p>15<br />
<transition>
<p>16 <duration>5.0</duration></p>
<p>17 <from>/usr/share/backgrounds/cosmos/cloud.jpg</from></p>
<p>18 <to>/usr/share/backgrounds/cosmos/comet.jpg</to></p>
<p>19 </transition>
<p>20 <static></p>
<p>21 <duration>1795.0</duration></p>
<p>22 <file>/usr/share/backgrounds/cosmos/comet.jpg</file></p>
<p>23 </static></p>
<p>24<br />
<transition>
<p>25 <duration>5.0</duration></p>
<p>26 <from>/usr/share/backgrounds/cosmos/comet.jpg</from></p>
<p>27 <to>/usr/share/backgrounds/cosmos/earth-horizon.jpg</to></p>
<p>28 </transition></blockquote>
<p>相信看了这个样例大家都已经知道怎么设置了吧。只要更改starttime、duration、transition等相关部分的值，然后在更改桌面的时候添加这个xml文件，就可以实现桌面幻灯片的效果啦。</p>
<p>那么有人要说了，我改个桌面还这么麻烦，果然是Linux易用性太差了，我完全看不懂这个文件的意思啊。还好，早有人想到了这个问题，所以做了一个傻瓜程序。只要把你想更改的桌面图片们放到一个文件夹内，再在这个文件夹里运行下面附带的python小程序，就会自动生成xml文件。怎样，这样总可以了吧。</p>
<p>程序下载：<a href="http://www.naich.org/2010/ubuntu-desktop-with-many-wallpapers/backgroud-py-tar/">backgroud.py.tar</a>（<a href="http://forum.ubuntu.org.cn/viewtopic.php?f=86&amp;t=266567">来源</a>）</p>

---

[📚 返回目录](/needisme-mu-lu/)
