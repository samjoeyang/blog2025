---
title: "一键安装LAMP和LNMP"
date: 2017-02-04 23:01:09
categories: NeedIsMe
tags: ["Nginx", "Git", "SSH", "PHP", ".NET", "CentOS"]
---

<p>2017-06-02 我更新了</p>
<p>重新整理编写的一件安装，通过数字选择进行选项选择安装，一次性安装完成，把环境部署工作更简单的操作，而且是可选项操作。目前是centos6.8，大部分环境测试没有问题，有遇到的问题的可以留言或微信沟通</p>
<p>如此，完整包下载<a href="http://needis.me/lanmp.zip">点这里</a></p>
<p>只需要脚本的<a href="http://needis.me/lanmp_install.sh">点这里</a></p>
<p>只是要看看看代码的，看下面吧</p>
<p>&nbsp;</p>
<p>代码实在太长了，去<a href="http://needis.me/lanmp_install.sh">下载</a>吧，自己慢慢看</p>
<p>文末的下载链接任然有效，但是代码有错，不想花时间改了，各位<a href="http://needis.me/lanmp_install.sh">下载</a>最新的吧</p>
<p>&nbsp;<br />
----------我是美丽的分割线，我代表着有更美的更新-------------</p>
<p>可以一键安装LAMP或者LNMP，自由选择</p>
<p>同时扩展了ssh、oci、ssl</p>
<p>目标项目中使用了phalcon框架和jdk，不需要的可以不安装。</p>
<p>不多说，上代码</p>
<p><del><code><br />
#!bin/sh</code></del></p>
<p><del>function init()</del><br />
<del> {</del><br />
<del> #import RPM-GPG-KEY and install initscripts,wget,git</del><br />
<del> yum clean all</del><br />
<del> # cp -rf ./repo/aliyun.repo /etc/yum.repos.d/</del><br />
<del> # cp -rf ./repo/epel.repo /etc/yum.repos.d/</del><br />
<del> rpm --import /etc/pki/rpm-gpg/RPM* &amp;&amp; rpm --import http://mirrors.aliyun.com/centos/RPM-GPG-KEY-CentOS-6</del><br />
<del> yum -y install gcc gcc-c++ bison autoconf automake initscripts wget git</del><br />
<del> }</del></p>
<p><del>function install_httpd()</del><br />
<del> {</del><br />
<del> yum -y install httpd httpd-devel</del><br />
<del> sed -i 's/#ServerName www.example.com:80/ServerName localhost:80/g' /etc/httpd/conf/httpd.conf</del><br />
<del> }</del></p>
<p><del>function install_nginx()</del><br />
<del> {</del><br />
<del> echo -e "[nginx]\nname=nginx repo\nbaseurl=http://nginx.org/packages/centos/6/x86_64\ngpgcheck=0\nenabled=1" >> /etc/yum.repos.d/nginx.repo</del><br />
<del> yum -y install nginx</del></p>
<p><del>}</del></p>
<p><del>function download_php()</del><br />
<del> {</del><br />
<del> wget -c http://cn2.php.net/distributions/php-5.6.29.tar.bz2</del><br />
<del> }</del></p>
<p><del>function install_php()</del><br />
<del> {</del><br />
<del> #install support libs</del><br />
<del> yum -y install libxml2 libxml2-devel curl curl-devel libjpeg libjpeg-devel libpng libpng-devel libmcrypt libmcrypt-devel mhash mcrypt libtool-ltdl libtool-ltdl-devel bzip2 bzip2-devel freetype freetype-devel openldap openldap-devel openssl openssl-devel</del></p>
<p><del>cp -frp /usr/lib64/libldap* /usr/lib/</del></p>
<p><del>#install php</del><br />
<del> tar -jxvf php-5.6.29.tar.bz2 &amp;&amp; cd php-5.6.29 &amp;&amp; ./configure --with-apxs2=/usr/sbin/apxs --with-mysql=mysqlnd --with-mysqli=mysqlnd --with-mysql-sock --with-pdo-mysql=mysqlnd --with-openssl --with-gd --with-iconv --with-jpeg-dir=/usr/local/lib --with-png-dir --with-freetype-dir --with-zlib --with-bz2 --with-libxml-dir --with-gettext --with-curl --with-mhash --with-mcrypt --enable-mbstring --enable-mbregex --with-ldap --with-ldap-sasl --with-xmlrpc --enable-gd-native-ttf --enable-pdo --enable-pcntl --enable-sockets --enable-bcmath --enable-xml --enable-zip --enable-soap --enable-bcmath --enable-shmop --enable-sysvsem --enable-inline-optimization --enable-maintainer-zts --enable-opcache --enable-cgi --without-pear --disable-phar >> ../install_php_log &amp;&amp; make >> ../install_php_log &amp;&amp; make install >> ../install_php_log &amp;&amp; cd ../</del></p>
<p><del>#config PHP</del><br />
<del> cp ./php-5.6.29/php.ini-development $(php-config --prefix)/lib/php.ini &amp;&amp; sed -i 's/\;date\.timezone \=/date\.timezone \=PRC/g' $(php-config --prefix)/lib/php.ini &amp;&amp; sed -i "s/\;include_path \= \"\.\:\/php\/includes\"/include_path \= \"\$\(php-config --prefix\)\/lib\/php\"/g" $(php-config --prefix)/lib/php.ini &amp;&amp; ln -s $(php-config --prefix)/bin/php /usr/bin/php</del><br />
<del> echo "AddHandler application/x-httpd-php .php" >> /etc/httpd/conf/httpd.conf</del><br />
<del> echo "<!--?php phpinfo();?-->" > /var/www/html/i.php</del><br />
<del> }</del></p>
<p><del>function install_phpfpm()</del><br />
<del> {</del><br />
<del> #install support libs</del><br />
<del> yum -y install libxml2 libxml2-devel curl curl-devel libjpeg libjpeg-devel libpng libpng-devel libmcrypt libmcrypt-devel mhash mcrypt libtool-ltdl libtool-ltdl-devel bzip2 bzip2-devel freetype freetype-devel openldap openldap-devel openssl openssl-devel</del></p>
<p><del>cp -frp /usr/lib64/libldap* /usr/lib/</del></p>
<p><del>#install php</del><br />
<del> tar -jxvf php-5.6.29.tar.bz2 &amp;&amp; cd php-5.6.29 &amp;&amp; ./configure --enable-fpm --enable-cgi --with-mysql=mysqlnd --with-mysqli=mysqlnd --with-mysql-sock --with-pdo-mysql=mysqlnd --with-openssl --with-gd --with-iconv --with-jpeg-dir=/usr/local/lib --with-png-dir --with-freetype-dir --with-zlib --with-bz2 --with-libxml-dir --with-gettext --with-curl --with-mhash --with-mcrypt --enable-mbstring --enable-mbregex --with-ldap --with-ldap-sasl --with-xmlrpc --enable-gd-native-ttf --enable-pdo --enable-pcntl --enable-sockets --enable-bcmath --enable-xml --enable-zip --enable-soap --enable-bcmath --enable-shmop --enable-sysvsem --enable-inline-optimization --enable-maintainer-zts --enable-opcache --enable-cgi --without-pear --disable-phar >> ../install_php_log &amp;&amp; make >> ../install_php_log &amp;&amp; make install >> ../install_php_log &amp;&amp; cd ../</del></p>
<p><del>#config PHP</del><br />
<del> cp ./php-5.6.29/php.ini-development $(php-config --prefix)/lib/php.ini &amp;&amp; sed -i 's/\;date\.timezone \=/date\.timezone \=PRC/g' $(php-config --prefix)/lib/php.ini &amp;&amp; sed -i "s/\;include_path \= \"\.\:\/php\/includes\"/include_path \= \"\$\(php-config --prefix\)\/lib\/php\"/g" $(php-config --prefix)/lib/php.ini &amp;&amp; ln -s $(php-config --prefix)/bin/php /usr/bin/php</del></p>
<p><del>#config php-fpm. use -t test fpm&rsquo;s configs</del><br />
<del> cp ./php-5.6.29/sapi/fpm/init.d.php-fpm /etc/init.d/php-fpm &amp;&amp; chmod a+x /etc/init.d/php-fpm &amp;&amp; chkconfig --add php-fpm &amp;&amp; chkconfig php-fpm on &amp;&amp; cp /usr/local/etc/php-fpm.conf.default /usr/local/etc/php-fpm.conf &amp;&amp; /usr/local/sbin/php-fpm -c $(php-config --prefix)/lib/php.ini -y /usr/local/etc/php-fpm.conf -t &amp;&amp; /usr/local/sbin/php-fpm -c $(php-config --prefix)/lib/php.ini -y /usr/local/etc/php-fpm.conf</del></p>
<p><del>#write something into readme.txt</del><br />
<del> echo -e "start php-fpm:\n/usr/local/sbin/php-fpm -c $(php-config --prefix)/lib/php.ini -y /usr/local/etc/php-fpm.conf\nstop php-fpm:\nkill -INT 'cat /usr/local/php/var/run/php-fpm.pid'\nOR\nservice php-fpm stop\nreboot php-fpm:\nkill -USR2 'cat /usr/local/php/var/run/php-fpm.pid'\nOR\nservice php-fpm reboot" >> ../readme.txt</del></p>
<p><del>#config nginx</del><br />
<del> mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.bak</del><br />
<del> echo -e "server\n{\n listen 80;\n server_name localhost;\n root /var/www/zhenzhidaole;\n access_log /var/log/nginx/access_zhenzhidaole_com.log;\n error_log /var/log/nginx/error_zhenzhidaole_com.log;\n index index.html index.php;\n location ~ \.php$ {\n fastcgi_pass 127.0.0.1:9000;\n fastcgi_index index.php;\n fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;\n include fastcgi_params; \n }\n}" >> /etc/nginx/conf.d/vhost.conf</del></p>
<p><del>mkdir -p /var/www/html &amp;&amp; echo "<!--?php phpinfo();?-->" > /var/www/html/i.php</del></p>
<p><del>service nginx restart</del><br />
<del> }</del></p>
<p><del>function install_php_by_yum()</del><br />
<del> {</del><br />
<del> yum install libxml2 libxml2-devel curl curl-devel libjpeg libjpeg-devel libpng libpng-devel libmcrypt libmcrypt-devel mhash mcrypt libtool-ltdl libtool-ltdl-devel bzip2 bzip2-devel freetype freetype-devel openldap openldap-devel openssl openssl-devel</del><br />
<del> yum -y install php php-mysql php-common php-gd php-mbstring php-mcrypt php-devel php-xml</del><br />
<del> yum -y install perl</del><br />
<del> yum -y install mod_python</del><br />
<del> }</del></p>
<p><del>function download_mysql()</del><br />
<del> {</del><br />
<del> wget -c http://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-community-client-5.7.16-1.el6.x86_64.rpm</del><br />
<del> wget -c http://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-community-server-5.7.16-1.el6.x86_64.rpm</del><br />
<del> wget -c http://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-community-devel-5.7.16-1.el6.x86_64.rpm</del><br />
<del> wget -c http://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-community-libs-5.7.16-1.el6.x86_64.rpm</del><br />
<del> wget -c http://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-community-common-5.7.16-1.el6.x86_64.rpm</del><br />
<del> }</del></p>
<p><del>function install_mysql()</del><br />
<del> {</del><br />
<del> #install mysql</del><br />
<del> yum -y install libaio net-tools numactl</del><br />
<del> yum -y remove mysql*</del></p>
<p><del>echo -e "HOSTNAME=internal.hostname.DOMAIN.com" >> /etc/sysconfig/network</del></p>
<p><del>rpm -ivh mysql-community-common-5.7.16-1.el6.x86_64.rpm &amp;&amp; rpm -ivh mysql-community-libs-5.7.16-1.el6.x86_64.rpm &amp;&amp; rpm -ivh mysql-community-devel-5.7.16-1.el6.x86_64.rpm &amp;&amp; rpm -ivh mysql-community-client-5.7.16-1.el6.x86_64.rpm &amp;&amp; rpm -ivh mysql-community-server-5.7.16-1.el6.x86_64.rpm &amp;&amp; echo "max_allowed_packet=200M" >> /etc/my.cnf &amp;&amp; service mysqld start</del></p>
<p><del>#find the default password and save it into readme.txt</del><br />
<del> echo -e "\nmysql install information:" >> ../readme.txt</del><br />
<del> sed -n '/A temporary password is generated for root@localhost:/p' /var/log/mysqld.log >> ../readme.txt</del><br />
<del> echo -e "After login mysql,you need to do:\nstep 1: SET PASSWORD = PASSWORD(\"your new password\");\nstep 2: ALTER USER 'root'@'localhost' PASSWORD EXPIRE NEVER;\nstep 3: flush privileges;" >> ../readme.txt</del><br />
<del> # echo -e "export MYSQL_HOME=/usr/local/mysql\nexport PATH=\$MYSQL_HOME/bin:\$PATH" >>/etc/profile &amp;&amp; source /etc/profile</del><br />
<del> }</del></p>
<p><del>function download_ssh2()</del><br />
<del> {</del><br />
<del> wget -c https://www.libssh2.org/download/libssh2-1.8.0.tar.gz</del><br />
<del> wget -c http://pecl.php.net/get/ssh2-0.13.tgz</del><br />
<del> }</del></p>
<p><del>function install_ssh2()</del><br />
<del> {</del><br />
<del> tar -zxvf libssh2-1.8.0.tar.gz &amp;&amp; cd libssh2-1.8.0 &amp;&amp; ./configure --prefix=/usr/local/libssh2 &amp;&amp; make &amp;&amp; make install &amp;&amp; cd ../</del><br />
<del> tar -zxvf ssh2-0.13.tgz &amp;&amp; cd ssh2-0.13 &amp;&amp; phpize &amp;&amp; ./configure --prefix=/usr/local/ssh2 --with-ssh2=/usr/local/libssh2 &amp;&amp; make &amp;&amp; make install &amp;&amp; echo "extension=ssh2.so" >> $(php-config --prefix)/lib/php.ini &amp;&amp; cd ../</del><br />
<del> }</del></p>
<p><del>function download_oci()</del><br />
<del> {</del><br />
<del> # wget -c http://download.oracle.com/otn/linux/instantclient/11204/oracle-instantclient11.2-basic-11.2.0.4.0-1.x86_64.rpm</del><br />
<del> # wget -c http://download.oracle.com/otn/linux/instantclient/11204/oracle-instantclient11.2-devel-11.2.0.4.0-1.x86_64.rpm</del><br />
<del> wget -c http://pecl.php.net/get/PDO_OCI-1.0.tgz</del><br />
<del> wget -c http://pecl.php.net/get/oci8-2.0.12.tgz</del><br />
<del> }</del></p>
<p><del>Function install_oci()</del><br />
<del> {</del><br />
<del> #install oci8 support oracle11grc2</del><br />
<del> rpm -ivh oracle-instantclient11.2-basic-11.2.0.4.0-1.x86_64.rpm &amp;&amp; rpm -ivh oracle-instantclient11.2-devel-11.2.0.4.0-1.x86_64.rpm &amp;&amp; echo '/usr/lib/oracle/11.2/client64/lib/' > /etc/ld.so.conf.d/oracle-x86_64.conf &amp;&amp; ln -s /usr/lib/oracle/11.2/client64 /usr/lib/oracle/11.2/client &amp;&amp; ln -s /usr/include/oracle/11.2/client64 /usr/include/oracle/11.2/client &amp;&amp; echo -e "export ORACLE_HOME=/usr/lib/oracle/11.2/client64/\nexport LD_LIBRARY_PATH=/usr/lib/oracle/11.2/client64:\$LD_LIBRARY_PATH\nexport NLS_LANG=\"AMERICAN_AMERICA.AL32UTF8\"" >> /etc/profile &amp;&amp; source /etc/profile</del></p>
<p><del>tar -zxvf oci8-2.0.12.tgz &amp;&amp; cd oci8-2.0.12 &amp;&amp; phpize &amp;&amp; ./configure --with-oci8=shared,instantclient,/usr/lib/oracle/11.2/client64/lib &amp;&amp; make &amp;&amp; make install &amp;&amp; echo "extension=oci8.so" >> $(php-config --prefix)/lib/php.ini &amp;&amp; cd ../</del></p>
<p><del>tar -zxvf PDO_OCI-1.0.tgz &amp;&amp; cd PDO_OCI-1.0 &amp;&amp; ln -s /usr/include/oracle/11.2 /usr/include/oracle/10.2.0.1 &amp;&amp; ln -s /usr/lib/oracle/11.2 /usr/lib/oracle/10.2.0.1 &amp;&amp; sed -i '101i 11.2)\n PHP_ADD_LIBRARY(clntsh, 1, PDO_OCI_SHARED_LIBADD)\n \;\;' config.m4 &amp;&amp; sed -i '10i elif test -f \$PDO_OCI_DIR/lib/libclntsh\.\$SHLIB_SUFFIX_NAME.11.2\; then\n PDO_OCI_VERSION=11\.2' config.m4 &amp;&amp; sed -i 's/function_entry/zend_function_entry/g' pdo_oci.c &amp;&amp; phpize &amp;&amp; ./configure --with-pdo-oci=instantclient,/usr,11.2 &amp;&amp; make &amp;&amp; make install &amp;&amp; echo "extension=pdo_oci.so" >> $(php-config --prefix)/lib/php.ini &amp;&amp; cd ../</del></p>
<p><del>}</del></p>
<p><del>function download_phalcon()</del><br />
<del> {</del><br />
<del> git clone --depth=1 git://github.com/phalcon/cphalcon.git</del><br />
<del> }</del></p>
<p><del>function install_phalcon()</del><br />
<del> {</del><br />
<del> #install phalcon frameworks</del><br />
<del> cd cphalcon/build &amp;&amp; ./install &amp;&amp; echo "extension=phalcon.so" >> $(php-config --prefix)/lib/php.ini &amp;&amp; cd ../../</del><br />
<del> }</del></p>
<p><del>function download_jdk()</del><br />
<del> {</del><br />
<del> # http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html</del><br />
<del> }</del></p>
<p><del>function install_jdk()</del><br />
<del> {</del><br />
<del> install_path=$(pwd) &amp;&amp; mkdir -p /usr/java &amp;&amp; cp -rf jdk-8u111-linux-x64.tar.gz /usr/java/ &amp;&amp; cd /usr/java &amp;&amp; tar -zxvf jdk-8u111-linux-x64.tar.gz &amp;&amp; echo -e "JAVA_HOME=/usr/java/jdk1.8.0_111\nCLASSPATH=\$JAVA_HOME/lib/\nPATH=\$PATH:\$JAVA_HOME/bin:\$JAVA_HOME/jre/bin\nexport PATH JAVA_HOME CLASSPATH" >> /etc/profile &amp;&amp; source /etc/profile &amp;&amp; java -version &amp;&amp; cd $install_path</del><br />
<del> }</del></p>
<p><del>function install_openssl()</del><br />
<del> {</del><br />
<del> yum -y install openssl mod_ssl</del><br />
<del> cd /etc/pki/tls/private/ &amp;&amp; openssl genrsa 1024 >localhost.key &amp;&amp; openssl req -new -key localhost.key > localhost.csr &amp;&amp; openssl req -x509 -days 3650 -key localhost.key -in localhost.csr > localhost.crt &amp;&amp; cp localhost.crt /etc/pki/tls/certs/localhost.crt</del><br />
<del> }</del></p>
<p><del>function test_http()</del><br />
<del> {</del><br />
<del> echo -e "Alias /webalias \"/var/www/alias\&rdquo;\n\n Options Indexes MultiViews FollowSymLinks\n AllowOverride None\n Order allow,deny\n Allow from all\n" >> /etc/httpd/conf/httpd.conf</del><br />
<del> echo -e "\n ServerAdmin admin@zhenzhidaole.com\n DocumentRoot /var/www/html\n ServerName www.zhenzhidaole.com\n ErrorLog /var/www/logs/error_log\n CustomLog /var/www/logs/access_log common\n" >> /etc/httpd/conf/httpd.conf</del><br />
<del> mkdir -p /var/www/web &amp;&amp; mkdir -p /var/www/alias</del><br />
<del> echo "<!--?php phpinfo();?-->" > /var/www/alias/s.php</del><br />
<del> echo -e "127.0.0.1 www.zhenzhidaole.com" >> /etc/hosts</del><br />
<del> service httpd restart</del><br />
<del> }</del></p>
<p><del>function test_phpinfo()</del><br />
<del> {</del><br />
<del> php -v</del><br />
<del> php -i |grep mcrypt</del><br />
<del> php -i |grep ssh</del><br />
<del> php -i |grep oci</del><br />
<del> php -i |grep phalcon</del><br />
<del> curl https://localhost/ -k</del><br />
<del> curl http://www.zhenzhidaole.com/c.php |grep oci</del></p>
<p><del>#<!--?php #$con = mysqli_connect("127.0.0.1","root","!qaz@wsx"); #if (!$con) # { # die('Could not connect: ' . mysql_error()); # } #echo 'Connected successfully'; #mysql_close($con); #phpinfo(); #?--></del><br />
<del> }</del></p>
<p><del>init()</del><br />
<del> install_httpd()</del><br />
<del> #install_nginx()</del><br />
<del> #download_php()</del><br />
<del> install_php()</del><br />
<del> #install_phpfpm()</del><br />
<del> #download_mysql()</del><br />
<del> install_mysql()</del><br />
<del> #download_ssh2()</del><br />
<del> install_ssh2()</del><br />
<del> #download_oci()</del><br />
<del> install_oci()</del><br />
<del> #download_phalcon()</del><br />
<del> install_phalcon()</del><br />
<del> #download_jdk()</del><br />
<del> install_jdk()</del><br />
<del> install_openssl()</del></p>
<p><del>#test_http()</del><br />
<del> #test_phpinfo()</del></p>
<p><del>&nbsp;</del></p>
<p>附件下载<a href="http://needis.me/wp-content/uploads/2017/02/install-php.sh_.zip">install-php.sh</a><br />
另外附repo文件<a href="http://needis.me/wp-content/uploads/2017/02/repo.zip">repo</a></p>

---

[📚 返回目录](/needisme-mu-lu/)
