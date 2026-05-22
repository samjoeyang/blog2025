---
title: "Ubuntu下PHP 环境快速配置"
date: 2011-01-18 17:07:15
categories: NeedIsMe
tags: ["Apache", "SQL", "PHP", "Ubuntu", "MySQL"]
---

<p>安装 Apache2：</p>
<blockquote><p>sudo apt-get install apache2</p></blockquote>
<p>安装PHP模块：</p>
<blockquote><p>sudo apt-get install php5</p></blockquote>
<p>编辑测试页：</p>
<blockquote><p>sudo gedit /var/www/testphp.php</p></blockquote>
<p>安装Mysql:</p>
<blockquote><p>sudo apt-get install mysql-server</p></blockquote>
<p>更改Mysql密码:</p>
<blockquote><p>mysqladmin -u root －p password </p></blockquote>
<p>安装Mysql模块:</p>
<blockquote><p>sudo apt-get install libapache2-mod-auth-mysql<br />
sudo apt-get install php5-mysql<br />
sudo apt-get install php5-gd<br />
sudo /etc/init.d/apache2 restart</p></blockquote>
<p>配置php.ini:</p>
<blockquote><p>sudo gedit /etc/php5/apache2/php.ini</p></blockquote>
<p>把文件在文件后面的：</p>
<blockquote><p>#extension=mysql.so<br />
#extension=gd.so</p></blockquote>
<p>的＃去掉。</p>
<p>安装phpmyadmin</p>
<blockquote><p>sudo apt-get install phpmyadmin</p></blockquote>
<p>测试：</p>
<p>http://localhost/phpmyadmin/</p>
<p>将URL映射到其他目录</p>
<blockquote><p>sudo gedit /etc/apache2/conf.d/alias</p></blockquote>
<p>重起apache</p>
<blockquote><p>sudo /etc/init.d/apache2 restart</p></blockquote>
<p>＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝</p>
<p>phpmyadmin 默认并不是安装在 /var/www下面的而是在 /usr/share/phpmyadmin,你可以把phpmyadmin复制过去或者可以创建一个链接然后把链接复制过去</p>
<p>然后 终端中运行命令</p>
<blockquote><p>sudo gedit /etc/phpmyadmin/apache.conf</p></blockquote>
<p>然后把下面两句的路径改为<br />
/var/www/phpmyadmin</p>
<p>Alias /phpmyadmin /usr/share/phpmyadmin<br />
<Directory /usr/share/phpmyadmin><br />
改为：<br />
Alias /phpmyadmin /var/www/phpmyadmin<br />
<Directory /var/www/phpmyadmin></p>
<p>1.重启apache</p>
<blockquote><p>sudo /etc/init.d/apache2 restart</p></blockquote>
<p>2.重启mysql</p>
<blockquote><p>sudo /etc/init.d/mysql restart</p></blockquote>
<p>至此 LAMP环境配置成功,试一下 echo phpinfo(); 吧！<br />
＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝<br />
apache 的配置文件路径<br />
/etc/apache2/apache2.conf</p>
<p>php.ini 路径<br />
/etc/php5/apache2/php5.ini</p>
<p>mysql配置文件路径<br />
/etc/mysql/my.cnf</p>
<p>phpmyadmin配置文件路径<br />
/etc/phpmyadmin/apache.conf</p>
<p>网站根目录<br />
 /var/www</p>
<p>sudo ln -s /usr/share/phpmyadmin/ /var/www/</p>

---

[📚 返回目录](/needisme-mu-lu/)
