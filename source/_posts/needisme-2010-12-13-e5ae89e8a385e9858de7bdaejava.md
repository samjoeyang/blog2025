---
title: "安装配置JAVA"
date: 2010-12-13 15:12:05
categories: NeedIsMe
tags: ["Ubuntu", "Linux", "Java"]
---

<p>和大多数Linux一样，一般默认<strong>安装</strong>的Open JDK，<strong>安装</strong>Sun JDK需要：</p>
<p>1. 确定 sources.list 中包含 ： deb&nbsp;http://archive.canonical.com/ubuntu maverick partner</p>
<p>添加partner源<br />
sudo add-apt-repository "deb http://archive.canonical.com/ubuntu maverick partner"</p>
<p>开始安装JDK<br />
sudo apt-get install sun-java6-jdk sun-java6-plugin</p>
<p>如果需要安装JRE<br />
sudo apt-get install sun-java6-jre sun-java6-plugin</p>
<p>2. 可以在 /etc/jvm 查看默认的 JVM</p>
<p>查看版本信息<br />
java -version</p>
<p>设为默认Java<br />
sudo update-alternatives --config java<br />
3. 在 /etc/enviroment 中添加 ：</p>
<p>PATH 中增加&nbsp;/usr/lib/jvm/java-6-sun/</p>
<p>CLASSPATH=&rdquo;/usr/lib/jvm/java-6-sun/lib&rdquo;</p>
<p>JAVA_HOME=&rdquo;/usr/lib/jvm/java-6-sun&rdquo;</p>

---

[📚 返回目录](/needisme-mu-lu/)
