---
title: "centOS软件安装源资源"
date: 2016-01-12 12:59:42
categories: NeedIsMe
tags: ["CentOS", "LINUX", "Linux", "系统管理"]
---

<p>1.进入yum源配置目录<br />
cd /etc/yum.repos.d<br />
2.备份系统自带的yum源（以网易的安装源为例）<br />
mv CentOS-Base.repo CentOS-Base.repo.bk<br />
下载163网易的yum源：<br />
wget http://mirrors.163.com/.help/CentOS6-Base-163.repo<br />
3.更新玩yum源后，执行下边命令更新yum配置，使操作立即生效<br />
yum makecache<br />
4.国内较好的安装源<br />
4.1 网易的yum源： wget http://mirrors.163.com/.help/CentOS6-Base-163.repo<br />
4.2 中科大的yum源：wget http://centos.ustc.edu.cn/CentOS-Base.repo<br />
4.3 sohu的yum源：wget http://mirrors.sohu.com/help/CentOS-Base-sohu.repo</p>

---

[📚 返回目录](/needisme-mu-lu/)
