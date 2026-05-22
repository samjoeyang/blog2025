---
title: "安装mysql"
date: 2010-04-24 15:39:00
categories: NeedIsMe
tags: ["LINUX", "Linux", "SQL", "系统管理", "MySQL"]
---

<p>系统自动下载和安装Mysql的<br />
yum -y install mysql-server</p>
<p>在服务清单中添加mysql服务<br />
chkconfig �add mysqld</p>
<p>服务启动<br />
service mysqld start</p>
<p>更改密码<br />
mysqladmin -u root password 'newpassword'</p>
<p>登录mysql<br />
mysql -u root -p</p>
<p>删除test数据库<br />
mysql> DROP DATABASE test;</p>
<p>删除匿名帐户<br />
mysql> DELETE FROM mysql.user WHERE user = ";</p>
<p>重载权限<br />
mysql> FLUSH PRIVILEGES;</p>
<p>添加mysql用户：<br />
GRANT ALL PRIVILEGES ON my_db.* TO 'user'@'localhost' IDENTIFIED BY 'password';</p>

---

[📚 返回目录](/needisme-mu-lu/)
