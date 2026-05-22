---
title: "Ubuntu下安装JDK和Eclipse"
date: 2011-01-15 13:05:16
categories: NeedIsMe
tags: ["Vim", "Ubuntu", "Linux", "Java"]
---

<p>首先安装jdk,命令如下：</p>
<blockquote><p>sudo apt-get install sun-java6-jdk</p></blockquote>
<p>设置默认的java程序，会有提示，按照提示操作</p>
<blockquote><p>sudo update-alternatives &mdash;&mdash;config java</p></blockquote>
<p>设置环境</p>
<blockquote><p>sudo vim /etc/environment</p></blockquote>
<p>添加下面两行</p>
<blockquote><p>CLASSPATH=/usr/lib/jvm/java-6-sun/lib<br />
JAVA_HOME=/usr/lib/jvm/java-6-sun</p></blockquote>
<p>如果其中已经设置了CLASSPATH和JAVA_HOME则进行修改或覆盖</p>
<p>安装Eclipse</p>
<blockquote><p>sudo apt-get install eclipse</p></blockquote>
<p>修改Eclipse的配置,首先将 SUN-JDK-6彻底设为系统默认</p>
<blockquote><p>sudo update-java-alternatives -s java-6-sun</p></blockquote>
<p>编辑JVM配置文件：</p>
<blockquote><p>sudo vim /etc/jvm</p></blockquote>
<p>在文件顶部添加</p>
<blockquote><p>/usr/lib/jvm/java-6-sun</p></blockquote>
<p>sudo vim /etc/eclipse/java_home</p>
<p>在文件顶部添加/usr/lib/jvm/java-6-sun</p>
<p>完成之后启动Eclipse，选择Help->About Eclipse SDK，选择Configuration Details，可以看到JDK6的设置已经生效</p>

---

[📚 返回目录](/needisme-mu-lu/)
