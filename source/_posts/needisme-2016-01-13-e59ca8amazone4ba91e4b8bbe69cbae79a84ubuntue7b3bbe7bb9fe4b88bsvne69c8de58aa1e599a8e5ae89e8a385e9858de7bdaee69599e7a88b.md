---
title: "在Amazon云主机的Ubuntu系统下SVN服务器安装配置教程"
date: 2016-01-13 11:42:21
categories: NeedIsMe
tags: ["Ubuntu", "SVN"]
---

<p>一、SVN服务端的安装</p>
<p>1.安装包<br />
$ sudo apt-get install subversion</p>
<p>2.添加svn管理用户及subversion组<br />
$ sudo adduser svnuser<br />
$ sudo addgroup subversion<br />
$ sudo addgroup svnuser subversion</p>
<p>3.创建项目目录<br />
$ sudo mkdir /home/svn<br />
$ cd /home/svn<br />
$ sudo mkdir fitness<br />
$ sudo chown -R root:subversion fitness<br />
$ sudo chmod -R g+rws fitness</p>
<p>4.创建SVN文件仓库<br />
$ sudo svnadmin create /home/svn/fitness</p>
<p>5.访问方式及项目导入：<br />
$ svn co file:///home/svn/fitness<br />
或者<br />
$ svn co file://localhost/home/svn/fitness<br />
* 注意：<br />
如果您并不确定主机的名称，您必须使用三个斜杠(///)，而如果您指定了主机的名称，则您必须使用两个斜杠(//).<br />
//--<br />
下面的命令用于将项目导入到SVN 文件仓库：<br />
$ svn import -m "New import" /home/svn/fitness file:///home/svnuser/src/fitness<br />
一定要注明导入信息</p>
<p>//--------------------------//<br />
6.访问权限设置<br />
修改 /home/svn/fitness目录下：<br />
svnserve.conf 、passwd 、authz三个文件,行最前端不允许有空格<br />
//--<br />
编辑svnserve.conf文件,把如下两行取消注释<br />
password-db = password<br />
authz-db = authz</p>
<p>//补充说明<br />
# [general]<br />
anon-access = read<br />
auth-access = write<br />
password-db = passwd<br />
其中 anon-access 和 auth-access 分别为匿名和有权限用户的权限，默认给匿名用户只读的权限,但如果想拒绝匿</p>
<p>名用户的访问，只需把 read 改成 none 就能达到目的。</p>
<p>//--<br />
编辑/home/svnuser/etc/passwd 如下:<br />
[users]<br />
mirze = 123456<br />
test1 = 123456<br />
test2 = 123456<br />
//--<br />
编辑/home/svnuser/etc/authz如下<br />
[groups]<br />
admin = mirze,test1<br />
test = test2<br />
[/]<br />
@admin=rw<br />
*=r<br />
这里设置了三个用户mirze,test1,test2密码都是123456<br />
其中mirze和test1属于admin组，有读和写的权限,test2属于test组只有读的权限</p>
<p>7.启动SVN服务<br />
svnserve -d -r /home/svn<br />
描述说明：<br />
-d 表示svnserver以&ldquo;守护&rdquo;进程模式运行<br />
-r 指定文件系统的根位置（版本库的根目录），这样客户端不用输入全路径，就可以访问版本库<br />
如: svn://192.168.12.118/fitness</p>
<p>这时SVN安装就完成了.<br />
局域网访问方式：<br />
例如：svn checkout svn://192.168.12.118/fitness --username mirze --password 123456 /var/www/fitness</p>
<p>-----------------------------------------------------------------------</p>
<p>二、HTTP:// [apache]<br />
1.安装包 [已安装subversion]<br />
$ sudo apt-get install libapache2-svn</p>
<p>创建版本仓库：<br />
sudo svnadmin create /目录地址<br />
目录地址必须存在，这个就是保存版本仓库的地方，不同的版本仓库创建不同的文件夹即可，比如：<br />
sudo svnadmin create /home/svn/project<br />
本来/home/svn/project这个目录下什么都没有，执行下面的命令之后再去看一下，多出一些文件和文件夹，我们需要操作的是conf这个文件夹，这个文件夹下有一个文件，叫做passwd，用来存放用户名和密码。<br />
然后把这个版本仓库目录授权给apache读写：<br />
sudo chown -R www-data:www-data /目录地址<br />
然后来到打开apache配置文件：<br />
sudo gedit /etc/apache2/mods-available/dav_svn.conf</p>
<p>加入如下内容：<br />
<Location /project><br />
DAV svn<br />
SVNPath /home/svn/project<br />
AuthType Basic<br />
AuthName &ldquo;myproject subversion repository&rdquo;<br />
AuthUserFile /home/svn/project/conf/passwd<br />
#<LimitExcept GET PROPFIND OPTIONS REPORT><br />
Require valid-user<br />
#</LimitExcept><br />
</Location></p>
<p>location说的是访问地址，比如上述地址，访问的时候就是<br />
http://127.0.0.1/project<br />
其中有两行被注释掉了，以保证每次都需要用户名密码。<br />
最后一步就是创建访问用户了，建议将用户名密码文件存放在当前版本仓库下conf文件夹下，这样版本仓库多的时候无至于太乱。<br />
因为conf文件夹下已经存在passwd文件了，所以直接添加用户：<br />
sudo htpasswd -c /home/svn/project/conf/passwd test<br />
然后输入两遍密码，laoyang这个用户就创建好了。<br />
打开/home/svn/project/conf/passwd这个文件，会开到形如如下形式的文本：<br />
test:WEd.83H.gealA //后面是加密后的密码。<br />
创建以后，再次需要往别的版本仓库添加这个用户，直接把这一行复制过去就可以了。<br />
重启apache就可以了。<br />
sudo /etc/init.d/apache2 restart</p>
<p>-----------------------------------------------------------------------</p>
<p>三、同步更新 [勾子]</p>
<p>同步程序思路：用户提交程序到SVN，SVN触发hooks,按不同的hooks进行处理，这里用到的是post-commit，利用post-commit到代码检出到SVN服务器的本地硬盘目录，再通过rsync同步到远程的WEB服务器上。</p>
<p>知识点：<br />
1、SVN的hooks<br />
# start-commit 提交前触发事务<br />
# pre-commit 提交完成前触发事务<br />
# post-commit 提交完成时触发事务<br />
# pre-revprop-change 版本属性修改前触发事务<br />
# post-revprop-change 版本属性修改后触发事务<br />
通过上面这些名称编写的脚本就就可以实现多种功能了，相当强大。<br />
2、同步命令rsync的具体参数使用<br />
3、具有基个语言的编程能力bash python perl都可以实现</p>
<p>post-commit具体实现细节<br />
post-commit脚本</p>
<p>编辑文件：sudo vim /home/svn/fitness/hooks/post-commit</p>
<p>注意：编辑完成post-commit后，执行：sudo chmod 755 post-commit</p>
<p>内容：</p>
<p>#!/bin/sh<br />
export LANG=zh_CN.UTF-8<br />
sudo /usr/bin/svn update /var/www/www --username mirze --password 123456</p>
<p>或<br />
#Set variable<br />
SVN=/usr/bin/svn<br />
WEB=/home/test_nokia/<br />
RSYNC=/usr/bin/rsync<br />
LOG=/tmp/rsync_test_nokia.log<br />
WEBIP="192.168.0.23"<br />
export LANG=en_US.UTF-8</p>
<p>#update the code from the SVN<br />
$SVN update $WEB --username user --password password<br />
#If the previous command completed successfully, to continue the following<br />
if [ $? == 0 ]<br />
then<br />
echo "" >> $LOG<br />
echo `date` >> $LOG<br />
echo "##############################" >> $LOG<br />
chown -R nobody:nobody /home/test_nokia/<br />
#Synchronization code from the SVN server to the WEB server, notes:by the key<br />
$RSYNC -vaztpH --timeout=90 --exclude-from=/home/svn/exclude.list $WEB root@$WEBIP:/www/ >> $LOG<br />
fi</p>
<p>以上是具体的post-commit程序<br />
注意事项：<br />
1、一定要定义变量，主要是用过的命令的路径。因为SVN的考虑的安全问题，没有调用系统变量，如果手动执行是没有问题，但SVN自动执行就会无法执行了。<br />
2、SVN update 之前一定要先手动checkout一份出来，还有这里一定要添加用户和密码如果只是手动一样会更新，但自动一样的不行。<br />
3、加上了对前一个命令的判断，如果update的时候出了问题，程序没有退出的话还会继续同步代码到WEB服务器上，这样会造成代码有问题<br />
4、记得要设置所属用户，因为rsync可以同步文件属性，而且我们的WEB服务器一般都不是root用户，用户不正确会造成WEB程序无法正常工作。<br />
5、建议最好记录日志，出错的时候可以很快的排错<br />
6、最后最关键的数据同步，rsync的相关参数一定要清楚，这个就不说了。注意几个场景：<br />
这里的环境是SVN服务器与WEB服务器是开的<br />
把SVN服务器定义为源服务器 WEB服务器为目的服务器<br />
场景一、如果目的WEB服务器为综合的混杂的，像只有一个WEB静态资源，用户提交的，自动生成的都在WEB的一个目录下，建议不要用&ndash;delete这个参数<br />
上面这个程序就是这样，实现的是源服务器到目的服务器的更新和添加，而没有删除操作，WEB服务器的内容会多于源SVN的服务器的<br />
场景二、实现镜像，即目的WEB服务器与源SVN服务器一样的数据，SVN上任何变化WEB上一样的变化，就需要&ndash;delete参数<br />
场景三、不需要同步某些子目录，可能有些目录是缓存的临时垃圾目录，或者是专用的图片目录（而不是样式或者排版的）要用exclude这个参数<br />
注意：这个参数的使用不用写绝对路径，只要目录名称就行 aa代表文件 aa/ 代表目录 ，缺点就是如果有多个子目录都是一样的名称那么这些名称就都不会被同步<br />
建议用&ndash;exclude-from=/home/svn/exclude.list 用文件的形式可以方便的添加和删除<br />
exclude.list</p>
<p>.svn/<br />
.DS_Store<br />
images/</p>
<p>利用SVN的钩子还可以写出很多的程序来控制SVN 如代码提交前查看是否有写日志，是否有tab，有将换成空格，是否有不允许上传的文件，是否有超过限制大小的文件等等。</p>

---

[📚 返回目录](/needisme-mu-lu/)
