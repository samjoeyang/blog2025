---
title: "【转】Subversion安装配置指南"
date: 2010-07-13 10:11:00
categories: NeedIsMe
tags: ["DNS", "项目管理", "Project Management", "Apache", "Linux", "Ubuntu"]
---

<h1 class="title_txt"><cite class="fav_csdnstylebykimi"> </cite></h1>
<div class="blogstory">原文地址：<a href="http://blog.csdn.net/sinboy/archive/2009/03/18/4000524.aspx">http://blog.csdn.net/sinboy/archive/2009/03/18/4000524.aspx</a></p>
<div id="qajd">Subversion是一个非常优秀的源代码管理控制系统，它的支持独立启动使用和结合Apache使用两种服务方式。</div>
<div id="bogj">一、安装Subversion</div>
<div id="pram">1.从<a id="efd8" title="Subversion主页" href="http://subversion.tigris.org/" target="_blank">Subversion主页</a> 下载最新版本的安装程序</div>
<div id="kdpj">2.如果是Windows平台，直接运行Exe的安装程序即可</div>
<div id="kdpj0">3.如果是一般的Linux平台：</div>
<div id="tfcv">1）执行<a id="ls0f" title="tar" href="http://linux-vbird.bluedata.org/linux_base/0240tarcompress.htm" target="_blank">tar</a> -zxvf subversion.xxx.tar.gz进行解压</div>
<div id="uf23">2）执行cd subversion.xxx切换到解压后的目录</div>
<div id="uf230">3）执行./configure --prefix=/opt/subversion进行配置设定，并指明安装目录</div>
<div id="s4zq">4）执行make进行编译</div>
<div id="s4zq0">5）执行make install 进行安装</div>
<div id="uf3e">4.如果是Fedora Linux，可以直接执行yum install subversion进行自动安装（<em><span style="color: #ff0000;">Fedora7以上的版本已自带</span></em>）</div>
<div id="uf3e0">5.如果是Ubuntu Linux，可以直接执行sudo apt-get install subversion进行自动安装</div>
<div id="pnf5">二、安装Apache</div>
<div id="hd5w">1.从<a id="tuwg" title="Apache主页" href="http://httpd.apache.org/" target="_blank">Apache主页</a> 下载最新版本的安装程序</div>
<div id="hd5w0">2.如果是Windows平台，直接运行安装程序</div>
<div id="hd5w1">3.如果是一般的Linux平台：</div>
<div id="hd5w2">
<div id="wgbw">1）执行tar -zxvf httpd.xxx.tar.gz进行解压</div>
<div id="wgbw0">2）执行cd httpd.xxx切换到解压后的目录</div>
<div id="wgbw1">3）执行./configure --prefix=/opt/httpd进行配置设定，并指明安装目录</div>
<div id="wgbw2">4）执行make进行编译</div>
<div id="wgbw3">5）执行make install 进行安装</div>
<div id="wgbw4">4.如果是Fedora Linux，可以直接执行yum install httpd进行自动安装（<em><span style="color: #ff0000;">Fedora7以上的版本已自带</span></em>）</div>
<div id="wgbw7">5.如果是Ubuntu Linux，可以直接执行sudo apt-get install apache2进行自动安装</div>
<div id="lmff">三、创建数据仓库</div>
<div id="bfum">1.执行mkdir /var/gftech/subversion/repos创建数据仓库的目录</div>
<div id="y-pw">2.执行svnadmin create /var/gftech/subversion/repos创建数据仓库，将自动生成几个文件和目录：</div>
<div id="emgt">/conf</div>
<div id="emgt0">/db</div>
<div id="emgt1">/hooks</div>
<div id="mfss">...</div>
</div>
<div id="pram0">四、独立启动方式</div>
<div id="pram1">
<div id="d7fa0">独立启动方式是做为一个单独的服务程序，默认情况下通过本地端口3690来对外提供服务。</div>
<div id="r_r3">启动步骤：</div>
<div id="l2z2">1.执行svnserve -d -r /var/gftech/subversion/repos以Daemon方式运行，默认情况下匿名访问</div>
<div id="p8sr">2.在Fedora中，可以用chkconfig把Subversion做一个服务程序，随系统自动启动：</div>
<div id="d153">1）以root帐号登录</div>
<div id="xmt1">2）执行cd /etc/rc.d/init.d切换到服务程序所在目录</div>
<div id="xmt10">3）执行vi svnd进行文件编辑</div>
<div id="ye.z">4）添加下面的内容到svnd文件当中：</div>
<div id="arvf">
<div id="vei0" style="text-align: center; padding: 1em 0;"><img src="https://docs.google.com/File?id=dhj79c2b_30hcx2vjg5_b" alt="" /></div>
</div>
<div id="arvf1">5）保存退出</div>
<div id="bks:">6）执行chmod a+x svnd 使之可执行</div>
<div id="bks:0">7）执行chkconfig --add svnd添加该服务到系统当中</div>
<div id="li45">8）执行chkconfig --list svnd查看该服务</div>
<div id="li450">9）执行service svnd start可以启动该服务</div>
<div id="li451">10）执行service svnd stop可以停止该服务</div>
<div id="arvf8">在进行源代码管理时，为了安全起见，需要对用户的权限进行控制，主要通过三个配置文件来实 现，svnservice.conf、passwd、authz，第一个文件指明是否需要进行访问控制以及第二、三个文件的位置，第二个文件存放用户帐号 信息，第三个文件存放用户的访问权限，具体配置如下：</div>
<div id="ca_r">1.打开svnserve.conf文件，把auth-access=write前面的#号去掉，使受权用户可以进行写操作</div>
<div id="i4yj">2.把password-db=passwd前面的#号去掉，表明密码文件为当前目录下的passwd文件</div>
<div id="t4hd">3.把auth-db=authz前面的#号去掉，表明用户访问权限文件为当前目录下的authz文件</div>
<div id="gbq.0">4.打开passwd文件，在末行添加需要的帐号，比如：test=123456</div>
<div id="g2ob">5.打开authz文件，在[/]一行下面添加test=rw，表明数据仓库的根目录下的所有目录，test都可进行读写操作</div>
<div id="gr2w">6.再添加一行*=r，表明其他帐号可以进行只读操作</div>
<div id="x_gy">7.在该文件中还可以为用户分组，添加到[groups]下面，比如：admin=sinboy,others=u1,u2</div>
<div id="ac-5">8.还可以对根目录下的子目录进行具体的权限控制，只需要添加相应目录，比如：</div>
<div id="pfl0">[/web]</div>
<div id="pfl00">u1=rw</div>
<div id="pfl01">*=</div>
<div id="pfl02">表明web子目录只允许u1帐号进行读写操作，禁止其他帐号访问</div>
<div id="bogj1">它的缺点是：</div>
<div id="o-gc">1.对外提供服务时，有可能受到防火墙的阻隔，造成服务无法访问</div>
<div id="o-gc0">2.并且它的密码文件是明文显示，没有进行MD5加密，存在安全隐患</div>
<div id="k8ou">3.只能启动一个数据仓库，如果想要创建多个数据仓库，必须启动多个svnserve服务进程</div>
</div>
<div id="pram2">五、结合Apache方式</div>
<div id="dqtu">结合Apache使用的方式，克服了svnserve方式的缺点，用户可以直接通过浏览器浏览源代码，还可以对浏览器访问进行SSL加密控制，更好的提高安全性</div>
<div id="dqtu0">1.Apache本身不支持SVN，需要先安装mod_dav_svn模块</div>
<div id="fyyo">2.在Fedora下，执行yum install mod_dav_svn进行自动安装</div>
<div id="scid">3.确保/etc/httpd/moudles目录下有<a href="http://mod_dav_svn.xn--somod_authz_svn-794z.so">mod_dav_svn.so和mod_authz_svn.so</a></div>
<div id="jjrf">4.打开/etc/httpd/conf/httpd.conf文件，在<span id="wglw" style="color: #0010ff;">LoadModule dav_module modules/mod_dav.so</span><br />
一行下面添加下面两行内容：</div>
<div id="jjrf0"><span id="jzgb" style="color: #0010ff;">LoadModule dav_svn_module modules/mod_dav_svn.so<br />
LoadModule authz_svn_module modules/mod_authz_svn.so</span><br />
5.再添加如下内容：</div>
<div><span id="s6t0" style="color: #0010ff;"><Location /svn><br />
DAV svn<br />
SVNPath /var/gftech/subversion/repos</p>
<p>AuthzSVNAccessFile /var/gftech/subversion/repos/conf/access.auth<br />
Satisfy Any<br />
Require valid-user<br />
AuthType Basic<br />
AuthName &amp;quot<br />
;Subversion repositories"</p>
<p></span></div>
<div><span style="color: #0010ff;"><br />
AuthUserFile&nbsp; /var/gftech/subversion/repos/conf/users.auth<br />
Require valid-user<br />
</Location> </span></div>
<div id="cv460"><span id="cv461" style="color: #0010ff;"><span style="color: #000000;">6.切换到/var/gftech/subversion/repos/conf目录下</span></span></div>
<div id="jkym"><span id="jkym0" style="color: #0010ff;"><span style="color: #000000;">7.执行htpasswd -cb users.auth test 123456创建帐号文件</span></span></div>
<div id="jkym2"><span id="jkym3" style="color: #0010ff;"><span style="color: #000000;">8.再次添加用户，去掉参数c即可：htpasswd -b users.auth test2 123456</span></span></div>
<div id="wtbm"><span id="wtbm0" style="color: #0010ff;"><span style="color: #000000;">9.执行service httpd restart启动Apache</span></span></div>
<div id="wtbm2"><span id="wtbm3" style="color: #0010ff;"><span style="color: #000000;">10.在浏览器中输入<a id="wtbm5" href="http://host/svn">http://host/svn</a>打开SVN仓库，输入用户名密码进行访问</span></span></div>
<div id="oz4f2"><span id="oz4f3" style="color: #0010ff;"><span style="color: #000000;">六、SVN客户端</span></span></div>
<div id="z-2v"><span id="z-2v0" style="color: #0010ff;"><span style="color: #000000;">推荐使用<a id="e6fm" title="TortoiseSVN" href="http://tortoisesvn.tigris.org/" target="_blank">TortoiseSVN</a> </span></span></div>
<div id="fh5x2"><span id="fh5x3" style="color: #0010ff;"><span style="color: #000000;">七、其他文章推荐</span></span></div>
<div id="fh5x5"><span id="fh5x6" style="color: #0010ff;"><span style="color: #000000;">1.<a id="viewpost1_TitleUrl" class="postTitle2" href="http://www.blogjava.net/hadeslee/archive/2008/03/12/185788.html"><span style="color: #800080;">Apache和Subversion集成安装与配置</span></a><br />
</span></span></div>
</div>

---

[📚 返回目录](/needisme-mu-lu/)
