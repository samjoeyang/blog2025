---
title: "Ubuntu下定时执行任务"
date: 2013-09-27 21:32:02
categories: NeedIsMe
tags: ["Ubuntu", "Shell"]
---

<p>在Ubuntu下我想定时备份！我想定时重启！我想定时... 用crontab 来处理吧</p>
<p>使用指令：crontab &ndash;e</p>
<p>编辑格式：* * * * * shell.sh</p>
<p>说明：分钟(0-59)小时(0-23)日期(1-31)月份(1-12)星期(0-6,0是星期天),date是你要执行的文件</p>
<p>比如我要在每天的00:01定时执行一个shell脚本，可以编辑如下一条  01 00 * * * /usr/local/runtime/shell.sh</p>
<p>添加完毕后重启生效：service crond restart</p>
<p>另：查看cron清单使用<br />
crontab &ndash;l</p>
<p>cron文件所处位置是/etc/crontab</p>

---

[📚 返回目录](/needisme-mu-lu/)
