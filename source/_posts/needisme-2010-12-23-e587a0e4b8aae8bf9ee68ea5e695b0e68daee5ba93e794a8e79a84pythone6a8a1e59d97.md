---
title: "几个连接数据库用的python模块"
date: 2010-12-23 11:42:00
categories: NeedIsMe
tags: ["Bash", "HTML", "SQL", ".NET", "MySQL", "Python"]
---

<p>工作中，经常会有用python访问各种数据库的需求，比如从oracle读点配置文件或者往mysql写点结果信息之类的。<br />这里列一下可能用到的各个模块。</p>
<p>sqlite3:  <a href="http://docs.python.org/library/sqlite3.html">内置模块</a><br />用sqlite，有时候确实很方便，我觉得它确实做到了宣称的&ldquo;零配置&rdquo;。python自2.5版以来，就内置了对sqlite3的支持，使用也非常简单，按照文档上来：</p>
<p><span style="color:grey;font-style:italic;">#打开db文件，获得连接</span><br />conn = sqlite3.<span style="color:black;">connect</span><span style="color:black;">(</span><span style="color:darkslateblue;">'数据文件名'</span><span style="color:black;">)</span><span style="color:grey;font-style:italic;"><br />#获得游标</span><br />c = conn.<span style="color:black;">cursor</span><span style="color:black;">(</span><span style="color:black;">)</span><span style="color:grey;font-style:italic;"><br />#执行SQL</span><br />c.<span style="color:black;">execute</span><span style="color:black;">(</span><span style="color:darkslateblue;">''</span><span style="color:darkslateblue;">'SQL 片段'</span><span style="color:darkslateblue;">''</span><span style="color:black;">)</span><span style="color:grey;font-style:italic;"><br />#如果有对数据的修改操作，那就需要commit一下</span><br />conn.<span style="color:black;">commit</span><span style="color:black;">(</span><span style="color:black;">)</span><span style="color:grey;font-style:italic;"><br />#关闭游标</span><br />c.<span style="color:black;">close</span><span style="color:black;">(</span><span style="color:black;">)</span><span style="color:grey;font-style:italic;"><br />#关闭连接</span><br />conn.<span style="color:black;">close</span><span style="color:black;">(</span><span style="color:black;">)</span></p>
<p>另外，关于sqlite在C和bash下的用法，可以参考为以前的<a href="http://luy.li/2009/01/11/sqlite/">文章</a>。</p>
<p>oracle： <a href="http://cx-oracle.sourceforge.net/html/index.html">cx_Oracle</a><br />其实，前面先介绍sqlite3，除了它确实是个小数据库以外，还有一个原因：其他数据库在python下的操作，其实基本上和sqlite3的操作是一样的，也就是说，python其实已经几乎统一了数据库的接口。<br />打开cx_Oracle的文档页面，你会发现其风格也和python文档很像，因为他们都是用 Sphinx 做的。模块的使用方法就更像了，把上面的代码里，获得连接的那行，换成这样：
<div>
<pre style="font-family:monospace;"><span style="font-family:Georgia,serif;">c</span>onn = cx_Oracle.<span style="color:black;">connect</span><span style="color:black;">(</span><span style="color:darkslateblue;">'username/password@TNSname'</span><span style="color:black;">)</span><br /></pre>
</div>
<p>就可以了。只要把用户名、密码、TNS组成一个字符串，传进去，就可以得到一个oracle的连接了。<br />mysql： <a href="http://mysql-python.sourceforge.net/MySQLdb.html">MySQLdb</a></p>
<p>和前两个非常类似，连接的时候用以下两个语法之一：</p>
<p>conn = MySQLdb.<span style="color:black;">connect</span><span style="color:black;">(</span><span style="color:darkslateblue;">'host'</span>, <span style="color:darkslateblue;">'username'</span>, <span style="color:darkslateblue;">'password'</span>, <span style="color:darkslateblue;">'database'</span><span style="color:black;">)</span>
<pre>conn = MySQLdb.<span style="color:black;">connect</span><span style="color:black;">(</span>host=<span style="color:darkslateblue;">"host"</span>, <span style="color:crimson;">user</span>=<span style="color:darkslateblue;">"username"</span>, passwd=<span style="color:darkslateblue;">"password"</span>, db=<span style="color:darkslateblue;">"database"</span><span style="color:black;">)</span><br /></pre>
<p>接下来，也把它当成sqlite用就好了。<br />excel： <a href="http://pyexcelerator.sourceforge.net/">pyExcelerator</a><br />好吧，我承认excel不算数据库，只是写在这里充数而已，哈哈。因为偶尔还是要取下别人发来的excel里的数据的。<br />其实，用pyExcelerator来读取文件也是很简单的：<br />sheets=pyExcelerator.<span style="color:black;">parse_xls</span><span style="color:black;">(</span><span style="color:darkslateblue;">'xxx.xls'</span><span style="color:black;">)</span>这样出来以后，sheets就是整个工作薄了，它是工作表组成的list，而一个工作表对应于一个tuple，格式是： <code>('工作表名', 内容)</code>，而内容又是一个dict，key是一个<code>(行数, 列数)</code>的tuple，value才是正在的对应格子的内容。看起来确实比较绕，好在处理excel的应用也不多，将就吧。<br />另外，其实pyExcelerator还支持写入数据到excel的，如果有把查询结果保存成excel的需求的话，可以试试看，我还是尽量不用这种格式了，哈哈。</p>

---

[📚 返回目录](/needisme-mu-lu/)
