---
title: "minidwep-gtk for Ubuntu"
date: 2016-03-02 15:12:26
categories: NeedIsMe
tags: ["Ubuntu", ".NET", "Linux", "SQL"]
---

<p>一、相关依赖<br />
sudo apt-get install build-essential libssl-dev iw libpcap-dev sqlite3 libsqlite3-dev libpcap0.8-dev libssl0.9.8 libnl-dev</p>
<p>二、相关组件<br />
sudo apt-get install aircrack-ng</p>
<p>sudo apt-get install reaver</p>
<p>下载地址https://sourceforge.net/projects/xiaopanos/files/Minidwep%2040420/<br />
sudo dpkg -i minidwep-gtk-40420-ubuntu-64bit.deb</p>
<p>三、运行<br />
sudo minidwep-gtk</p>
<p>四、问题<br />
sudo minidwep-gtk无反应<br />
minidwep-gtk的执行主脚本位于/usr/local/bin/minileafdwep/minidwep-gtk.sh<br />
可执行这个脚本</p>
<p>原来Ubuntu没有安装gksu<br />
sudo apt-get install gksu<br />
sudo minidwep-gtk<br />
正常运行</p>

---

[📚 返回目录](/needisme-mu-lu/)
