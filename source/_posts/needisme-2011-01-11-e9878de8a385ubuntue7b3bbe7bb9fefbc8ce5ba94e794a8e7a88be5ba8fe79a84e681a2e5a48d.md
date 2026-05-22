---
title: "重装Ubuntu系统，应用程序的恢复"
date: 2011-01-11 16:31:18
categories: NeedIsMe
tags: ["Ubuntu", "Linux"]
---

<p>重装Ubuntu系统后,很多之前一直使用正常的软件都要重新安装一边，软件多了就会感觉很麻烦，那么有什么方法可以在重装系统后方便快捷恢复这些软件和用户信息呢？方法是有的</p>
<p>1.备份已安装软件包列表</p>
<p>sudo dpkg &ndash;get-selections > /home/user/package.selections</p>
<p>2.备份Home下的用户文件夹</p>
<p>复制所有用户文件夹下的所有内容到指定路径，注意隐藏文件，这个要包含的</p>
<p>3.备份软件源列表，将/etc/apt/文件夹下的sources.list拷贝出来保存即可</p>
<p>新系统安装后的恢复：</p>
<p>1.复制备份的Sources.list文件到新系统的/etc/apt/目录，覆盖原文件，并替换（Ctrl+H）文档中的intrepid为jaunty。然后更新软件源（sudo apt-get update）。</p>
<p>2.重新下载安装之前系统中的软件（如果你安装的软件数量比较多，可能会花费较长时间）</p>
<p>sudo dpkg &ndash;set-selections /home/package.selections &amp;&amp; apt-get dselect-upgrade</p>
<p>3.最后将备份的主文件夹（/home/用户名）粘贴并覆盖现有主文件夹</p>

---

[📚 返回目录](/needisme-mu-lu/)
