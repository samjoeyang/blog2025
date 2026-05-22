---
title: "关于PATH"
date: 2010-07-08 16:15:00
categories: NeedIsMe
tags: ["Bash", "SSH", "LINUX", "Linux", "系统管理", "Shell"]
---

<p>PATH的值是一系列目录，当您运行一个程序时，Linux在这些目录下进行搜寻编译链接。</p>
<p>可用 export 命令查看PATH值</p>
<p>[root@localhost u-boot-sh4]# export<br />
declare -x CVS_RSH="ssh"<br />
declare -x DISPLAY=":0.0"<br />
declare -x G_BROKEN_FILENAMES="1"<br />
declare -x HISTSIZE="1000"<br />
declare -x HOME="/root"<br />
declare -x HOSTNAME="localhost"<br />
declare -x INPUTRC="/etc/inputrc"<br />
declare -x LANG="zh_CN.UTF-8"<br />
declare -x LESSOPEN="|/usr/bin/lesspipe.sh %s"<br />
declare -x LOGNAME="root"<br />
declare -x LS_COLORS="no=00:fi=00:di=00;34:ln=00;36:pi=40;33:so=00;35:bd=40;33;01:cd=40;33;01:or=01;05;37;41:mi=01;05;37;41:ex=00;32:*.cmd=00;32:*.exe=00;32:*.com=00;32:*.btm=00;32:*.bat=00;32:*.sh=00;32:*.csh=00;32:*.tar=00;31:*.tgz=00;31:*.arj=00;31:*.taz=00;31:*.lzh=00;31:*.zip=00;31:*.z=00;31:*.Z=00;31:*.gz=00;31:*.bz2=00;31:*.bz=00;31:*.tz=00;31:*.rpm=00;31:*.cpio=00;31:*.jpg=00;35:*.gif=00;35:*.bmp=00;35:*.xbm=00;35:*.xpm=00;35:*.png=00;35:*.tif=00;35:"<br />
declare -x MAIL="/var/spool/mail/root"<br />
declare -x OLDPWD="/root"<br />
declare -x PATH="/usr/kerberos/sbin:/usr/kerberos/bin:/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin"<br />
declare -x PWD="/opt/STM/STLinux-2.3/devkit/sources/u-boot/u-boot-sh4"<br />
declare -x SHELL="/bin/bash"<br />
declare -x SHLVL="1"<br />
declare -x SSH_ASKPASS="/usr/libexec/openssh/gnome-ssh-askpass"<br />
declare -x TERM="xterm"<br />
declare -x USER="root"<br />
declare -x XAUTHORITY="/root/.xauthkSzH7b"</p>
<p>单独查看PATH环境变量，可用：</p>
<p>[root@localhost u-boot-sh4]# echo $PATH<br />
/usr/kerberos/sbin:/usr/kerberos/bin:/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin</p>
<p>添加PATH环境变量，可用：</p>
<p>[root@localhost u-boot-sh4]# export<br />
PATH=/opt/STM/STLinux-2.3/devkit/sh4/bin:$PATH</p>
<p>再次查看：</p>
<p>[root@localhost u-boot-sh4]# echo $PATH<br />
/opt/STM/STLinux-2.3/devkit/sh4/bin:/usr/kerberos/sbin:/usr/kerberos/bin:/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin</p>
<p>说明添加PATH成功。<br />
上述方法的PATH 在终端关闭 后就会消失。所以还是建议通过编辑/etc/profile来改PATH，也可以改bashrc</p>
<p>第二种方法：<br />
# vim /etc/profile<br />
在文档最后，添加:<br />
export PATH="/opt/STM/STLinux-2.3/devkit/sh4/bin:$PATH"<br />
保存，退出，然后运行：<br />
# source /etc/profile<br />
不报错则成功。</p>

---

[📚 返回目录](/needisme-mu-lu/)
