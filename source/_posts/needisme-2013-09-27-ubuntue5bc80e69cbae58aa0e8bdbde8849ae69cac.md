---
title: "ubuntu开机加载脚本"
date: 2013-09-27 21:14:20
categories: NeedIsMe
tags: ["Ubuntu", "Shell"]
---

<p>1.编写要执行的脚本，例如shell.sh<br />
2.保存在某个位置，例如/home/ubuntu<br />
3.在终端输入：<code>sudo vi /etc/init.d/rc.local</code><br />
4.进入编辑模式，在结尾处加入：<code>/home/ubuntu/shell.sh</code><br />
5.退出编辑模式，输入<code>:wq</code>,保存退出</p>
<p>即可开机自动加载脚本</p>

---

[📚 返回目录](/needisme-mu-lu/)
