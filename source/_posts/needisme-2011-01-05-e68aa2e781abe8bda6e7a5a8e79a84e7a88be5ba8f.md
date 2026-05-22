---
title: "抢火车票的程序"
date: 2011-01-05 09:33:33
categories: NeedIsMe
tags: ["Bash", "HTML", "编程", "Ubuntu", "Programmers"]
---

<blockquote>转载说明：2011年的春运开始了，作为身在异乡的打工者，一张车票是多么的珍贵。买票抢票的苦，今天让它拜拜吧，让知识武装我们</p></blockquote>
<p>这篇文章写于十月份 &nbsp;现在把它转载过来</p>
<p>这两天帮朋友买火车票，身在帝都我早就懂得了快稳狠的道理，</p>
<p>虽然这样你想买到一张火车票那還是相当难的</p>
<p>话说在九月十九号的那一天，经过多方打听我终于知道火车开始售票的时间，</p>
<p>于是早早的去排队买票，</p>
<p>可是我還是太低估帝都的实力了，这里是帝都，一切不可能的事情在这里都可能发生，</p>
<p>火车票刚开始买就没了，娘里的蛋蛋啊，</p>
<p>我纠结了一分钟后回到公司后 开始在网上找有没有转让票的，</p>
<p>这一招是我去年过年回家买票的时候学到的，</p>
<p>现实再一次很打击人，禀着快稳狠的准则，帝都的人们把网上转让的票也抢个一个不剩</p>
<p>在深深的反省自身后 我写下了如下的抢火车票的代码，不敢独享。</p>
<p>(娘的 看谁还给我抢 我用知识的力量鄙视你一下)<br />
<code><br />
#!/bin/bash<br />
export DISPLAY=:0<br />
URL_58='http://www.58.com/huochepiao/beijing-wuhan/'</code></p>
<p>CURRENTDIR=$( pwd )<br />
TMPFILE="$CURRENTDIR/$$"<br />
WGET="wget --timeout 30 --tries=1 --limit-rate=50k"</p>
<p>usage()<br />
{<br />
{<br />
echo "first you run $(basename $0) ready"<br />
echo "then you run $(basename $0 ) run"<br />
echo " bula bula~~"<br />
} >&amp;2</p>
<p>}</p>
<p>get_ready()<br />
{<br />
rm -rf *.html<br />
$WGET -O- "$URL_58" |  grep -oE '[0-9]{13}' > 2.html<br />
echo "ready"<br />
}<br />
get_our_tickets()<br />
{</p>
<p>echo "ticket" >> test.txt<br />
$WGET -O- "$URL_58" |  grep -E -A 1 '[0-9]{13}'<br />
| sed -e 's/--//g' -e 's/ //g' -e '/^$/d' > 3.html<br />
cat 3.html | grep -oE '[0-9]{13}' > 4.html<br />
cat 3.html | grep -oE '[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}'<br />
> 5.html<br />
paste 4.html 5.html >6.html<br />
while read line;do<br />
id=$( echo $line | awk '{ print $1 }' )<br />
day=$( echo $line | awk '{print $2 }' )<br />
if grep -qF "$id" 2.html;then<br />
continue<br />
else<br />
notify-send "you get a ticket" "$day"<br />
echo $id >> 2.html<br />
fi<br />
done < 6.html</p>
<p>}</p>
<p>touch "$TMPFILE"</p>
<p>arg=$1</p>
<p>if [[ -n $arg ]];then<br />
case $arg in<br />
ready)<br />
get_ready<br />
;;<br />
run)<br />
get_our_tickets<br />
;;<br />
esac<br />
fi</p>
<p>此代码在ubuntu 10.04 下运行良好  需要安装libnotify</p>
<p>然后 chmod +x the script</p>
<p>然后 crontab -e</p>
<p>然后  */1 * * * *  the path to the script</p>
<p>每分钟执行一次  每当有人转让票的时候  就会提醒你啦</p>
<p>你就等着去抢票吧  hum  ～～  it's good >>>>></p>
<p>源代码在这里<a href="http://code.google.com/p/notedit-code/downloads/detail?name=buyticket.sh">http://code.google.com/p/notedit-code/downloads/detail?name=buyticket.sh</a></p>
<p>转载地址：http://www.notedit.com/2010/11/%E6%8A%A2%E7%81%AB%E8%BD%A6%E7%A5%A8%E7%9A%84%E7%A8%8B%E5%BA%8F/</p>

---

[📚 返回目录](/needisme-mu-lu/)
