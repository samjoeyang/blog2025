---
title: "修改CentOS的yum源及安装配置PHP+MySQL环境"
date: 2016-10-27 14:46:08
categories: NeedIsMe
tags: ["SQL", "CentOS", "MySQL", "PHP"]
---

<p><strong>1. 换源，在这里我们使用搜狐的镜像源。&nbsp;</strong></p>
<p>&nbsp;</p>
<div>1.1 备份CentOS-Base.repo</div>
<div>cd /etc/yum.repos.d/</div>
<div>cp CentOS-Base.repo CentOS-Base.repo.bak</div>
<div></div>
<div>1.2 替换源</div>
<div>用vi打开CentOS-Base.repo，并将内容清空，然后将下面的内容复制进去，并保存。</div>
<div># CentOS-Base.repo</div>
<div>#</div>
<div># This file uses a new mirrorlist system developed by Lance Davis for CentOS.</div>
<div># The mirror system uses the connecting IP address of the client and the</div>
<div># update status of each mirror to pick mirrors that are updated to and</div>
<div># geographically close to the client. You should use this for CentOS updates</div>
<div># unless you are manually picking other mirrors.</div>
<div>#</div>
<div># If the mirrorlist= does not work for you, as a fall back you can try the</div>
<div># remarked out baseurl= line instead.</div>
<div>#</div>
<div>#</div>
<div>[base]</div>
<div>name=CentOS-$releasever - Base</div>
<div>baseurl=http://mirrors.sohu.com/centos/$releasever/os/$basearch/</div>
<div>gpgcheck=1</div>
<div>gpgkey=http://mirrors.sohu.com/centos/RPM-GPG-KEY-CentOS-5</div>
<div>#released updates</div>
<div>[updates]</div>
<div>name=CentOS-$releasever - Updates</div>
<div>baseurl=http://mirrors.sohu.com/centos/$releasever/updates/$basearch/</div>
<div>gpgcheck=1</div>
<div>gpgkey=http://mirrors.sohu.com/centos/RPM-GPG-KEY-CentOS-5</div>
<div>#packages used/produced in the build but not released</div>
<div>[addons]</div>
<div>name=CentOS-$releasever - Addons</div>
<div>baseurl=http://mirrors.sohu.com/centos/$releasever/addons/$basearch/</div>
<div>gpgcheck=1</div>
<div>gpgkey=http://mirrors.sohu.com/centos/RPM-GPG-KEY-CentOS-5</div>
<div>#additional packages that may be useful</div>
<div>[extras]</div>
<div>name=CentOS-$releasever - Extras</div>
<div>baseurl=http://mirrors.sohu.com/centos/$releasever/extras/$basearch/</div>
<div>gpgcheck=1</div>
<div>gpgkey=http://mirrors.sohu.com/centos/RPM-GPG-KEY-CentOS-5</div>
<div>#additional packages that extend functionality of existing packages</div>
<div>[centosplus]</div>
<div>name=CentOS-$releasever - Plus</div>
<div>baseurl=http://mirrors.sohu.com/centos/$releasever/centosplus/$basearch/</div>
<div>gpgcheck=1</div>
<div>enabled=0</div>
<div>gpgkey=http://mirrors.sohu.com/centos/RPM-GPG-KEY-CentOS-5</div>
<div></div>
<div>1.3 更新一下</div>
<div>yum -y update</div>
<div></div>
<div><strong>2. 用yum升级安装Apache, Mysql, PHP.</strong></div>
<div>Centos默认已安装相应的环境，但是版本可能达不到相关的要求。</div>
<div></div>
<div>A. 安装部分</div>
<div></div>
<div>2.1 安装Apache</div>
<div>
<div>yum -y install httpd httpd-devel</div>
</div>
<div>安装完成后，用/etc/init.d/httpd start 启动apache</div>
<div>设为开机启动:chkconfig httpd on</div>
<div></div>
<div>2.2 安装mysql</div>
<div></div>
<div>2.2.1 yum install mysql mysql-server mysql-devel</div>
<div>同样，完成后，用/etc/init.d/mysqld start 启动mysql</div>
<div></div>
<div>2.2.2设置mysql密码</div>
<div>mysql -u root -p （提示输入密码时，直接回车即可。）</div>
<div>mysql>; USE mysql;</div>
<div>mysql>; UPDATE user SET Password=PASSWORD('newpassword') WHERE user='root';</div>
<div>
<div>mysql>; FLUSH PRIVILEGES;</div>
<div></div>
<div>授权远程访问</div>
<div>mysql>; <code>GRANT</code>&nbsp;<code>ALL</code>&nbsp;<code>PRIVILEGES</code>&nbsp;<code>ON</code>&nbsp;<code>*.*</code> <code>TO</code>&nbsp;<code>'root'</code><code>@</code><code>'%'</code>&nbsp;<code>IDENTIFIED</code> <code>BY</code>&nbsp;<code>'123456'</code>&nbsp;<code>WITH</code>&nbsp;<code>GRANT</code>&nbsp;<code>OPTION</code><code>;</code></div>
</div>
<div></div>
<div>2.2.3设为开机启动</div>
<div>chkconfig mysqld on</div>
<div></div>
<div><strong>3. 安装php&nbsp;</strong></div>
<div></div>
<div>yum install php php-mysql php-common php-gd php-mbstring php-mcrypt php-devel php-xml</div>
<div>/etc/init.d/httpd start</div>
<div></div>
<div><strong>4. 测试一下&nbsp;</strong></div>
<div></div>
<div>4.1 在/var/www/html/新建个test.php文件，将以下内容写入，然后保存。</div>
<div><?</div>
<div>phpinfo();</div>
<div>?></div>
<div>
<div></div>
<div>安装其他</div>
<div>yum -y install perl</div>
<div>yum -y install mod_python</div>
<div></div>
</div>
<div>4.2 防火墙配置</div>
<div>a.添加.允许访问端口{21: ftp, 22:ssh, 80: http}. &nbsp;vi&nbsp;/etc/sysconfig/iptables</div>
<div></div>
<div>iptables -I RH-Firewall-1-INPUT -m state &ndash;state NEW -m tcp -p tcp &ndash;dport 21 -j ACCEPT</div>
<div>iptables -I RH-Firewall-1-INPUT -m state &ndash;state NEW -m tcp -p tcp &ndash;dport 22 -j ACCEPT</div>
<div>iptables -I RH-Firewall-1-INPUT -m state &ndash;state NEW -m tcp -p tcp &ndash;dport 80 -j ACCEPT</div>
<div></div>
<div>b.关闭防火墙{不推荐}.</div>
<div>service iptables stop</div>
<div></div>
<div>c.重启iptables</div>
<div>service iptables restart</div>
<div></div>
<div>4.3 然后在客户端浏览器里打开http://serverip/test.php，若能成功显示，则表示安装成功。</div>
<div></div>
<div>至此，安装完毕。</div>

---

[📚 返回目录](/needisme-mu-lu/)
