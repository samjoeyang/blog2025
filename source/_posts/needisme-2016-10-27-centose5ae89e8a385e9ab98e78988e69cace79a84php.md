---
title: "CentOS安装高版本的PHP"
date: 2016-10-27 14:28:29
categories: NeedIsMe
tags: ["HTML", "Apache", "SQL", "PHP", "CentOS", "MySQL"]
---

<p>1.检查当前是否有安装php<br />
rpm -qa|grep php<br />
如果有安装PHP，那么请先删除这些安装包：<br />
yum remove php*<br />
2.安装php源<br />
Centos 5 安装php源：<br />
rpm -ivh http://mirror.webtatic.com/yum/el5/latest.rpm<br />
CentOs 6 安装php源：<br />
rpm -ivh http://mirror.webtatic.com/yum/el6/latest.rpm<br />
CentOs 7 安装php源和epel扩展源：<br />
rpm -ivh https://mirror.webtatic.com/yum/el7/epel-release.rpmrpm -ivh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm<br />
3.现在开始安装php<br />
安装php5.5的基本安装包：<br />
yum install php55w php55w-gd php55w-mbstring php55w-mysql php55w-fpm<br />
安装php5.6的基本安装包：<br />
yum install php56w php55w-gd php56w-mbstring php56w-mysql php56w-fpm<br />
安装php7.0的基本安装包：<br />
yum install php70w php70w-gd php70w-mbstring php70w-mysql php70w-fpm<br />
安装完成php之后需要重启apache：<br />
service restart<br />
4. 测试网页<br />
我安装的php7.0，就拿php7.0写个网页测试一下<br />
/var/www/html/index.php<?php phpinfo(); ?></p>

---

[📚 返回目录](/needisme-mu-lu/)
