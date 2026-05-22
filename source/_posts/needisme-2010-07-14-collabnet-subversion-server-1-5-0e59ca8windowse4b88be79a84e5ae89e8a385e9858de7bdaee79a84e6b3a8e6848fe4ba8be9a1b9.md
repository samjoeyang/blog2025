---
title: "CollabNet Subversion-server-1.5.0在windows下的安装配置的注意事项"
date: 2010-07-14 09:56:00
categories: NeedIsMe
tags: ["项目管理", "Project Management", "Apache", "SVN", "Windows", ".NET"]
---

<p>原文地址：<a href="http://www.subversion.org.cn/?action-viewnews-itemid-62">http://www.subversion.org.cn/?action-viewnews-itemid-62</a><br />
1、安装</p>
<p>* Subversion1.5版本的安装包自带了Apache2.2.8，所以无需额外安装Apache服务器<br />
* 一路默认安装，如果需要修改仓库根目录或者Apache2.2.8端口可以自行修改为自己的信息，Apache默认端口为80，Subversion默认仓库存储路径为C:\svn_repository。<br />
安装的过程中会自动将Subversion和Apache注册成服务，安装完成后重启一下电脑，运行services.msc查看服务，可以看到<br />
"Apache2.2"和"Subversion Server"两个服务已经自动启动，如果不想让他们自动启动，可以修改为手动启动。</p>
<p>注：安装结束时没有提示重启系统，但重启之前Apache服务无法启动。</p>
<p>* 安装好后进入安装目录C:\Program Files\CollabNet Subversion<br />
Server，里面有一个httpd目录，这里面就是Apache服务器。<br />
进入httpd下的bin目录，可以看到Apache服务器的各个程序<br />
双击"ApacheMonitor.exe"打开Apache控制台，可以看到控制台的状态栏有如下内容：<br />
Apache/2.2.8 (Win32) DAV/2 SVN/1.5.0<br />
这说明Apache与Subversion在安装的过程中已经整合成功。</p>
<p>上面介绍的主要是安装的部分，没有什么特殊注意的，一切都很顺利的可以完成。接下来主要讲一下配置用户和权限的过程中需要注意的事项。</p>
<p>2、配置用户和权限</p>
<p>注：下面用的用户配置文件passwords.auth和权限配置文件access.auth的生成、配置及使用方式，在我的另一篇文章<br />
"Apache2.2.9+Subversion1.4.6(for<br />
Apache2.2.X)在windows下的配置与权限设置"中有详细的介绍，这里就不再赘述。</p>
<p>* 进入安装目录下的httpd目录中的conf目录，如：<br />
C:\Program Files\CollabNet Subversion Server\httpd\conf<br />
打开httpd.conf文件，先看看文件最后面，已经自动为我们配置好了仓库的信息如下：<br />
<Location /svn><br />
DAV svn<br />
SVNParentPath C:\svn_repository<br />
</Location><br />
在这里我们先加入，用户配置，代码如下：</p>
<p><Location /svn><br />
DAV svn<br />
SVNParentPath C:\svn_repository<br />
AuthType Basic<br />
AuthName "Subversion Repository"<br />
AuthUserFile "C:\svn_repository\passwords.auth"<br />
Require valid-user<br />
</Location></p>
<p>加入那四行新的信息后，重新启动Apache服务器，一切正常，这是可通过浏览器输入<a href="http://localhost/svn">http://localhost/svn</a>测试，会提示输入用户名、密码，用SVN客户端软件同样可以测试得到相同的结果。</p>
<p>下面是本文的主要内容，及权限配置的注意事项。</p>
<p>我们再在代码中加入权限配置的代码AuthzSVNAccessFile "C:\svn_repository\access.auth"<br />
修改后的代码如下：<br />
<Location /svn><br />
DAV svn<br />
SVNParentPath C:\svn_repository<br />
AuthType Basic<br />
AuthName "Subversion Repository"<br />
AuthUserFile "C:\svn_repository\passwords.auth"<br />
AuthzSVNAccessFile "C:\svn_repository\access.auth"<br />
Require valid-user<br />
</Location></p>
<p>此时重启Apache服务器，发现无法启动，提示"The requested operation has failed!"</p>
<p>这是我们需要再次修改httpd.conf配置文件，加入mod_authz_svn.so的加载项。</p>
<p>找到配置文件的116行(推荐使用UtralEdit或EditPlus编辑工具，不要一行一行的数哦)，115和116行的代码如下：</p>
<p>115 LoadModule dav_module         modules/mod_dav.so<br />
116 LoadModule dav_svn_module     modules/mod_dav_svn.so</p>
<p>其中116行中的mod_dav_svn.so文件就是以前我们安装Subversion1.4.6和Apache时，由Subversion<br />
的lib目录拷贝到Apache的modules目录的，并在Apache的httpd.conf下新加入的那行代码。</p>
<p>再找到84行的代码，会发现和115行的代码一样，只是多了一个#号，表示这一行被注释了，115行的作用就是使这行代码重新生效，这就是以前取消注释的那行代码。</p>
<p>84  #LoadModule dav_module modules/mod_dav.so</p>
<p>如果装过Subversion以前的版本，应该记得当时需要拷贝两个文件到Apache的modules目录下，一个<br />
是上面说过的mod_dav_svn.so，另一个就是mod_authz_svn.so。在Subversion1.5的安装目录下的<br />
Apache目录httpd的modules中已经包含了mod_authz_svn.so文件，所以无需拷贝，只需要加入一行加载代码即可。</p>
<p>再次回到116行的位置，在他的下面加入如下一行代码，这行代码就成为了117行：</p>
<p>LoadModule authz_svn_module  modules/mod_authz_svn.so</p>
<p>此时我们再保存配置文件，重启Apache服务器，发现又可以正常的启动了。</p>
<p>到此，我们完成了Subversion1.5的安装与配置工作，可以在实际的开发中使用Subversion1.5了。</p>
<p>3、总结</p>
<p>Subversion1.5的安装包集成了Apache2.2.8的安装，一次安装就可以完成两个软件的安装，并同时自动完成Subversion与<br />
Apache的集成。但在用户账号配置和用户权限配置的过程中还是需要所有注意，特别的用户权限的配置，需要填入一行模块加载代码，如下：<br />
LoadModule authz_svn_module  modules/mod_authz_svn.so</p>
<p>在以前版本的Subversion安装中我们通常需要取消注释两行代码，并加入两行新的模块加载代码，而在1.5的版本中，取消注释的工作已经有安装程序自动完成，新加代码的工作也有安装程序完成了一大半，只需要我们加入上面的这一行代码就可以使我们的用户和权限配置生效并正常使用了。</p>

---

[📚 返回目录](/needisme-mu-lu/)
