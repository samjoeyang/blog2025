---
title: "Ajax原理详细说明(转自ibm开发者网站) (三)"
date: 2006-04-25 05:11:42
categories: NeedIsMe
tags: ["互联网", "HTML", "JavaScript", "Java", "XML", "AJAX"]
---

<div id="msgcns!A634C4CD7A14B666!295" class="bvMsg">
<div>
<div style="line-height:14.25pt;" align="left"><a><strong><span style="font-size:13.5pt;color:black;font-family:宋体;">连接</span></strong></a><strong><span style="font-size:13.5pt;color:black;font-family:Arial;"> Web </span></strong><strong><span style="font-size:13.5pt;color:black;font-family:宋体;">表单</span></strong></div>
<div style="line-height:14.25pt;" align="left"><span style="font-size:9pt;color:black;font-family:宋体;">还有什么呢？实际上没有多少了。一个</span><span style="font-size:9pt;color:black;font-family:Verdana;"> JavaScript </span><span style="font-size:9pt;color:black;font-family:宋体;">方法捕捉用户输入表单的信息并将其发送到服务器，另一个</span><span style="font-size:9pt;color:black;font-family:Verdana;"> JavaScript </span><span style="font-size:9pt;color:black;font-family:宋体;">方法监听和处理响应，并在响应返回时设置字段的值。所有这些实际上都依赖于<em>调用</em></span><span style="font-size:9pt;color:black;font-family:宋体;">第一个</span><span style="font-size:9pt;color:black;font-family:Verdana;"> JavaScript </span><span style="font-size:9pt;color:black;font-family:宋体;">方法，它启动了整个过程。最明显的办法是在</span><span style="font-size:9pt;color:black;font-family:Verdana;"> HTML </span><span style="font-size:9pt;color:black;font-family:宋体;">表单中增加一个按钮，但这是</span><span style="font-size:9pt;color:black;font-family:Verdana;"> 2001 </span><span style="font-size:9pt;color:black;font-family:宋体;">年的办法，您不这样认为吗？还是像</span><span style="font-size:9pt;color:black;font-family:Verdana;"> <a href="http://www-128.ibm.com/developerworks/cn/xml/wa-ajaxintro1.html#code7#code7"><span style="font-family:宋体;"><font face="宋体"><u><font color="#0000ff"><span>清单</span> 7</font></u></font></span></a> </span><span style="font-size:9pt;color:black;font-family:宋体;">这样利用</span><span style="font-size:9pt;color:black;font-family:Verdana;"> JavaScript </span><span style="font-size:9pt;color:black;font-family:宋体;">技术吧。</span></div>
<div style="line-height:14.25pt;" align="left"><span style="font-size:9pt;color:black;font-family:Verdana;"><br /></span><a><strong><span style="font-size:9pt;color:black;font-family:宋体;">清单</span></strong></a><strong><span style="font-size:9pt;color:black;font-family:Verdana;"> 7. </span></strong><strong><span style="font-size:9pt;color:black;font-family:宋体;">启动一个</span></strong><strong><span style="font-size:9pt;color:black;font-family:Verdana;"> Ajax </span></strong><strong><span style="font-size:9pt;color:black;font-family:宋体;">过程</span></strong></div>
<table style="background:#eeeeee;width:100%;" cellspacing="0" cellpadding="0" width="100%" border="1">
<tbody>
<tr>
<td>
<div style="line-height:14.25pt;text-align:left;" align="left">&nbsp;</div>
<div style="line-height:14.25pt;text-align:left;" align="left"><span style="font-size:12pt;color:black;font-family:'Lucida Console';"><br />
<form></span></div>
<div style="line-height:14.25pt;text-align:left;" align="left"><span style="font-size:12pt;color:black;font-family:'Lucida Console';">&nbsp;
<p>City: <input type="text" name="city" id="city" size="25" </span></div>
<div style="line-height:14.25pt;text-align:left;" align="left"><span style="font-size:12pt;color:black;font-family:'Lucida Console';">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>onChange="callServer();"</strong> /></p>
<p></span></div>
<div style="line-height:14.25pt;text-align:left;" align="left"><span style="font-size:12pt;color:black;font-family:'Lucida Console';">&nbsp;
<p>State: <input type="text" name="state" id="state" size="25" </span></div>
<div style="line-height:14.25pt;text-align:left;" align="left"><span style="font-size:12pt;color:black;font-family:'Lucida Console';">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>onChange="callServer();"</strong> /></p>
<p></span></div>
<div style="line-height:14.25pt;text-align:left;" align="left"><span style="font-size:12pt;color:black;font-family:'Lucida Console';">&nbsp;
<p>Zip Code: <input type="text" name="zipCode" id="city" size="5" /></p>
<p></span></div>
<div style="line-height:14.25pt;text-align:left;" align="left"><span style="font-size:12pt;color:black;font-family:'Lucida Console';"></form>
<p></span></div>
</td>
</tr>
</tbody>
</table>
<div style="line-height:14.25pt;" align="left">&nbsp;</div>
<div style="line-height:14.25pt;" align="left"><span style="font-size:9pt;color:black;font-family:宋体;">如果感觉这像是一段相当普通的代码，那就对了，正是如此！当用户在</span><span style="font-size:9pt;color:black;font-family:Verdana;"> city </span><span style="font-size:9pt;color:black;font-family:宋体;">或</span><span style="font-size:9pt;color:black;font-family:Verdana;"> state </span><span style="font-size:9pt;color:black;font-family:宋体;">字段中输入新的值时，</span><span style="font-size:12pt;color:black;font-family:宋体;">callServer()</span><span style="font-size:9pt;color:black;font-family:宋体;">方法就被触发，于是</span><span style="font-size:9pt;color:black;font-family:Verdana;"> Ajax </span><span style="font-size:9pt;color:black;font-family:宋体;">开始运行了。有点儿明白怎么回事了吧？好，就是如此！</span></div>
<div style="line-height:14.25pt;" align="left">&nbsp;</div>
<table style="width:100%;" cellspacing="0" cellpadding="0" width="100%" border="0">
<tbody>
<tr></tr>
</tbody>
</table>
<table cellspacing="0" cellpadding="0" align="right" border="0">
<tbody>
<tr>
<td>
<div align="right">
<table cellspacing="0" cellpadding="0" border="0">
<tbody>
<tr>
<td valign="top">
<div style="line-height:14.25pt;" align="right"><span style="font-size:9pt;color:black;font-family:Verdana;"><a href="http://www-128.ibm.com/developerworks/cn/xml/wa-ajaxintro1.html#main#main"><strong><span style="font-family:宋体;text-decoration:none;"><font color="#0000ff">回页首</font></span></strong></a></span></div>
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
</tbody>
</table>
<div align="left">&nbsp;</div>
<div style="line-height:14.25pt;" align="left"><a><strong><span style="font-size:13.5pt;color:black;font-family:宋体;">结束语</span></strong></a></div>
<div style="line-height:14.25pt;" align="left"><span style="font-size:9pt;color:black;font-family:宋体;">现在您可能已经准备开始编写第一个</span><span style="font-size:9pt;color:black;font-family:Verdana;"> Ajax </span><span style="font-size:9pt;color:black;font-family:宋体;">应用程序了，至少也希望认真读一下</span><span style="font-size:9pt;color:black;font-family:Verdana;"> <a href="http://www-128.ibm.com/developerworks/cn/xml/wa-ajaxintro1.html#resources#resources"><span style="font-family:宋体;"><span><u><font face="宋体" color="#0000ff">参考资料</font></u></span></span></a> </span><span style="font-size:9pt;color:black;font-family:宋体;">中的那些文章了吧？但可以首先从这些应用程序如何工作的基本概念开始，对</span><span style="font-size:12pt;color:black;font-family:宋体;">XMLHttpRequest</span><span style="font-size:9pt;color:black;font-family:宋体;">对象有基本的了解。在下一期文章中，您将掌握这个对象，学会如何处理</span><span style="font-size:9pt;color:black;font-family:Verdana;"> JavaScript </span><span style="font-size:9pt;color:black;font-family:宋体;">和服务器的通信、如何使用</span><span style="font-size:9pt;color:black;font-family:Verdana;"> HTML </span><span style="font-size:9pt;color:black;font-family:宋体;">表单以及如何获得</span><span style="font-size:9pt;color:black;font-family:Verdana;"> DOM </span><span style="font-size:9pt;color:black;font-family:宋体;">句柄。</span></div>
<div style="line-height:14.25pt;" align="left"><span style="font-size:9pt;color:black;font-family:宋体;">现在先花点儿时间考虑考虑</span><span style="font-size:9pt;color:black;font-family:Verdana;"> Ajax </span><span style="font-size:9pt;color:black;font-family:宋体;">应用程序有多么强大。设想一下，当单击按钮、输入一个字段、从组合框中选择一个选项或者用鼠标在屏幕上拖动时，</span><span style="font-size:9pt;color:black;font-family:Verdana;">Web </span><span style="font-size:9pt;color:black;font-family:宋体;">表单能够立刻作出响应会是什么情形。想一想<em>异步</em></span><span style="font-size:9pt;color:black;font-family:宋体;">究竟意味着什么，想一想</span><span style="font-size:9pt;color:black;font-family:Verdana;"> JavaScript </span><span style="font-size:9pt;color:black;font-family:宋体;">代码运行而且<em>不等待</em></span><span style="font-size:9pt;color:black;font-family:宋体;">服务器对它的请求作出响应。会遇到什么样的问题？会进入什么样的领域？考虑到这种新的方法，编程的时候应如何改变表单的设计？</span></div>
<div style="line-height:14.25pt;" align="left"><span style="font-size:9pt;color:black;font-family:宋体;">如果在这些问题上花一点儿时间，与简单地剪切</span><span style="font-size:9pt;color:black;font-family:Verdana;">/</span><span style="font-size:9pt;color:black;font-family:宋体;">粘贴某些代码到您根本不理解的应用程序中相比，收益会更多。在下一期文章中，我们将把这些概念付诸实践，详细介绍使应用程序按照这种方式工作所需要的代码。因此，现在先享受一下</span><span style="font-size:9pt;color:black;font-family:Verdana;"> Ajax </span><span style="font-size:9pt;color:black;font-family:宋体;">所带来的可能性吧。</span></div>
<div style="line-height:14.25pt;" align="left">&nbsp;</div>
<table style="width:100%;" cellspacing="0" cellpadding="0" width="100%" border="0">
<tbody>
<tr></tr>
</tbody>
</table>
<table cellspacing="0" cellpadding="0" align="right" border="0">
<tbody>
<tr>
<td>
<div align="right">
<table cellspacing="0" cellpadding="0" border="0">
<tbody>
<tr>
<td valign="top">
<div style="line-height:14.25pt;" align="right"><span style="font-size:9pt;color:black;font-family:Verdana;"><a href="http://www-128.ibm.com/developerworks/cn/xml/wa-ajaxintro1.html#main#main"><strong><span style="font-family:宋体;text-decoration:none;"><font color="#0000ff">回页首</font></span></strong></a></span></div>
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
</tbody>
</table>
<div align="left">&nbsp;</div>
<div style="line-height:14.25pt;" align="left"><a><strong><span style="font-size:13.5pt;color:black;font-family:宋体;">参考资料</span></strong></a><strong><span style="font-size:13.5pt;color:black;font-family:Arial;"> </span></strong></div>
<div style="line-height:14.25pt;" align="left"><strong><span style="font-size:9pt;color:black;font-family:宋体;">学习</span></strong></div>
<ul>
<li><span style="font-size:9pt;font-family:宋体;">您可以参阅本文在</span><span style="font-size:9pt;font-family:Arial;"> developerWorks </span><span style="font-size:9pt;font-family:宋体;">全球站点上的</span><span style="font-size:9pt;font-family:Arial;"> <a href="http://www.ibm.com/developerworks/xml/library/wa-ajaxintro1.html"><span style="font-family:宋体;"><span><font face="宋体" color="#5c81a7"><u>英文原文</u></font></span></span></a></span><span style="font-size:9pt;font-family:宋体;">。</span>
</li>
<li><span style="font-size:9pt;font-family:Arial;"><a href="http://www.adaptivepath.com/"><font color="#5c81a7"><u>Adaptive Path</u></font></a> </span><span style="font-size:9pt;font-family:宋体;">是一家领先的用户界面设计公司，仔细阅读他们的网站可以更多地了解</span><span style="font-size:9pt;font-family:Arial;"> Ajax</span><span style="font-size:9pt;font-family:宋体;">。</span>
</li>
<li><span style="font-size:9pt;font-family:宋体;">如果关心</span><span style="font-size:9pt;font-family:Arial;"> Ajax </span><span style="font-size:9pt;font-family:宋体;">一词的来历，请看一看</span><span style="font-size:9pt;font-family:Arial;"> <a href="http://adaptivepath.com/team/jjg.php"><span><font face="Arial" color="#5c81a7"><u>Jesse James Garrett</u></font></span></a> </span><span style="font-size:9pt;font-family:宋体;">和他的</span><span style="font-size:9pt;font-family:Arial;"> Ajax </span><span style="font-size:9pt;font-family:宋体;">文章（比如</span><span style="font-size:9pt;font-family:Arial;"> <a href="http://adaptivepath.com/publications/essays/archives/000385.php"><span style="font-family:宋体;"><span><font face="宋体" color="#5c81a7"><u>这一篇</u></font></span></span></a></span><span style="font-size:9pt;font-family:宋体;">）。</span>
</li>
<li><span style="font-size:9pt;font-family:宋体;">可以先了解下一期文章的主题</span><span style="font-size:12pt;font-family:宋体;">XMLHttpRequest</span><span style="font-size:9pt;font-family:宋体;">对象，请阅读</span><span style="font-size:9pt;font-family:Arial;"> <a href="http://www.jibbering.com/2002/4/httprequest.html"><font color="#5c81a7"><span style="font-family:宋体;"><font face="宋体"><u><span>关于</span><span style="font-size:12pt;font-family:宋体;">XMLHttpRequest</span> <span style="font-family:宋体;">对象的这篇文章</span></u></font></span></font></a></span><span style="font-size:9pt;font-family:宋体;">。</span>
</li>
<li><span style="font-size:9pt;font-family:宋体;">如果使用</span><span style="font-size:9pt;font-family:Arial;"> Internet Explorer</span><span style="font-size:9pt;font-family:宋体;">，可以访问</span><span style="font-size:9pt;font-family:Arial;"> <a href="http://msdn.microsoft.com/xml/"><font color="#5c81a7"><span><u><font face="Arial">Microsoft Developer Network </font><span style="font-family:宋体;">的</span><font face="Arial"> XML Developer Center</font></u></span></font></a></span><span style="font-size:9pt;font-family:宋体;">。</span>
</li>
<li><span style="font-size:9pt;font-family:Arial;"><a href="http://www-128.ibm.com/developerworks/cn/java/j-ajax1/"><u><font color="#0000ff"><span style="font-family:宋体;">面向</span> Java <span style="font-family:宋体;">开发人员的</span> Ajax: <span style="font-family:宋体;">构建动态的</span> Java <span style="font-family:宋体;">应用程序</span></font></u></a></span><span style="font-size:9pt;font-family:宋体;">（</span><span style="font-size:9pt;font-family:Arial;">developerWorks</span><span style="font-size:9pt;font-family:宋体;">，</span><span style="font-size:9pt;font-family:Arial;">2005 </span><span style="font-size:9pt;font-family:宋体;">年</span><span style="font-size:9pt;font-family:Arial;"> 9 </span><span style="font-size:9pt;font-family:宋体;">月）介绍了这种革新方法，它解决了页面重新加载难题，可以创建动态的</span><span style="font-size:9pt;font-family:Arial;"> Web </span><span style="font-size:9pt;font-family:宋体;">应用程序体验。</span>
</li>
<li><span style="font-size:9pt;font-family:Arial;"><a href="http://www-128.ibm.com/developerworks/cn/java/j-ajax2/"><font color="#5c81a7"><u><span style="font-family:宋体;">面向</span> Java <span style="font-family:宋体;">开发人员的</span> Ajax: Ajax <span style="font-family:宋体;">的</span> Java <span style="font-family:宋体;">对象序列化</span></u></font></a></span><span style="font-size:9pt;font-family:宋体;">（</span><span style="font-size:9pt;font-family:Arial;">developerWorks</span><span style="font-size:9pt;font-family:宋体;">，</span><span style="font-size:9pt;font-family:Arial;">2005 </span><span style="font-size:9pt;font-family:宋体;">年</span><span style="font-size:9pt;font-family:Arial;"> 10 </span><span style="font-size:9pt;font-family:宋体;">月）介绍了在</span><span style="font-size:9pt;font-family:Arial;"> Ajax </span><span style="font-size:9pt;font-family:宋体;">应用程序中对数据进行序列化的五种方法。</span>
</li>
<li><span style="font-size:9pt;font-family:Arial;"><a href="http://www-128.ibm.com/developerworks/edu/os-dw-os-phpajax-i.html"><font color="#5c81a7"><u>Using Ajax with PHP and Sajax</u></font></a></span><span style="font-size:9pt;font-family:宋体;">（</span><span style="font-size:9pt;font-family:Arial;">developerWorks</span><span style="font-size:9pt;font-family:宋体;">，</span><span style="font-size:9pt;font-family:Arial;">2005 </span><span style="font-size:9pt;font-family:宋体;">年</span><span style="font-size:9pt;font-family:Arial;"> 10 </span><span style="font-size:9pt;font-family:宋体;">月），这篇教程针对那些对开发丰富</span><span style="font-size:9pt;font-family:Arial;"> Web </span><span style="font-size:9pt;font-family:宋体;">应用程序感兴趣的人，介绍了使用</span><span style="font-size:9pt;font-family:Arial;"> Ajax </span><span style="font-size:9pt;font-family:宋体;">和</span><span style="font-size:9pt;font-family:Arial;"> PHP </span><span style="font-size:9pt;font-family:宋体;">动态更新内容。</span>
</li>
<li><span style="font-size:9pt;font-family:Arial;"><a href="http://www-128.ibm.com/developerworks/webservices/library/ws-wsajax/"><font color="#5c81a7"><u>Call SOAP Web services with AJAX, Part 1: Build the Web services client</u></font></a></span><span style="font-size:9pt;font-family:宋体;">（</span><span style="font-size:9pt;font-family:Arial;">developerWorks</span><span style="font-size:9pt;font-family:宋体;">，</span><span style="font-size:9pt;font-family:Arial;">2005 </span><span style="font-size:9pt;font-family:宋体;">年</span><span style="font-size:9pt;font-family:Arial;"> 10 </span><span style="font-size:9pt;font-family:宋体;">月）介绍了如何使用</span><span style="font-size:9pt;font-family:Arial;"> Ajax </span><span style="font-size:9pt;font-family:宋体;">设计模式实现基于</span><span style="font-size:9pt;font-family:Arial;"> Web </span><span style="font-size:9pt;font-family:宋体;">浏览器的</span><span style="font-size:9pt;font-family:Arial;"> SOAP Web </span><span style="font-size:9pt;font-family:宋体;">服务客户机。</span>
</li>
<li><span style="font-size:9pt;font-family:Arial;"><a href="http://www.ibm.com/developerworks/cn/xml/x-matters41.html"><font color="#5c81a7"><u>XML <span style="font-family:宋体;">问题</span>: <span style="font-family:宋体;">超越</span> DOM</u></font></a></span><span style="font-size:9pt;font-family:宋体;">（</span><span style="font-size:9pt;font-family:Arial;">developerWorks</span><span style="font-size:9pt;font-family:宋体;">，</span><span style="font-size:9pt;font-family:Arial;">2005 </span><span style="font-size:9pt;font-family:宋体;">年</span><span style="font-size:9pt;font-family:Arial;"> 5 </span><span style="font-size:9pt;font-family:宋体;">月）详细阐述了如何使用文档对象模型来构建动态</span><span style="font-size:9pt;font-family:Arial;"> Web </span><span style="font-size:9pt;font-family:宋体;">应用程序。</span>
</li>
<li><span style="font-size:9pt;font-family:Arial;"><a href="http://www.ibm.com/developerworks/edu/wa-dw-wa-ajax-i.html"><font color="#5c81a7"><u>Build apps with Asynchronous JavaScript with XML, or AJAX</u></font></a></span><span style="font-size:9pt;font-family:宋体;">（</span><span style="font-size:9pt;font-family:Arial;">developerWorks</span><span style="font-size:9pt;font-family:宋体;">，</span><span style="font-size:9pt;font-family:Arial;">2005 </span><span style="font-size:9pt;font-family:宋体;">年</span><span style="font-size:9pt;font-family:Arial;"> 11 </span><span style="font-size:9pt;font-family:宋体;">月）演示了如何使用</span><span style="font-size:9pt;font-family:Arial;"> Ajax </span><span style="font-size:9pt;font-family:宋体;">构造支持实时检验的</span><span style="font-size:9pt;font-family:Arial;"> Web </span><span style="font-size:9pt;font-family:宋体;">应用程序。</span>
</li>
<li><span style="font-size:9pt;font-family:Arial;"><a href="http://www.ibm.com/developerworks/cn/java/j-ajax3/"><font color="#5c81a7"><u><span style="font-family:宋体;">面向</span> Java <span style="font-family:宋体;">开发人员的</span> Ajax: <span style="font-family:宋体;">结合</span> Direct Web Remoting <span style="font-family:宋体;">使用</span> Ajax </u></font></a></span><span style="font-size:9pt;font-family:宋体;">（</span><span style="font-size:9pt;font-family:Arial;">developerWorks</span><span style="font-size:9pt;font-family:宋体;">，</span><span style="font-size:9pt;font-family:Arial;">2005 </span><span style="font-size:9pt;font-family:宋体;">年</span><span style="font-size:9pt;font-family:Arial;"> 11 </span><span style="font-size:9pt;font-family:宋体;">月）演示了如何实现</span><span style="font-size:9pt;font-family:Arial;"> Ajax </span><span style="font-size:9pt;font-family:宋体;">的繁琐细节的自动化处理。</span>
</li>
<li><span style="font-size:9pt;font-family:Arial;">OSA Foundation </span><span style="font-size:9pt;font-family:宋体;">有一个</span><span style="font-size:9pt;font-family:Arial;"> wiki <a href="http://wiki.osafoundation.org/bin/view/Projects/AjaxLibraries"><font color="#5c81a7"><u><span style="font-family:宋体;">调查了</span> AJAX/JavaScript <span style="font-family:宋体;">库</span></u></font></a></span><span style="font-size:9pt;font-family:宋体;">。</span>
</li>
<li><span style="font-size:9pt;font-family:Arial;">XUL Planet </span><span style="font-size:9pt;font-family:宋体;">的</span><span style="font-size:9pt;font-family:Arial;"> <a href="http://www.xulplanet.com/references/objref/XMLHttpRequest.html"><span style="font-family:宋体;"><span><font face="宋体" color="#5c81a7"><u>对象参考部分</u></font></span></span></a> </span><span style="font-size:9pt;font-family:宋体;">详细介绍了</span><span style="font-size:9pt;font-family:Arial;"> XMLHttpRequest </span><span style="font-size:9pt;font-family:宋体;">对象（更不用说其他各种</span><span style="font-size:9pt;font-family:Arial;"> XML </span><span style="font-size:9pt;font-family:宋体;">对象了，如</span><span style="font-size:9pt;font-family:Arial;"> DOM</span><span style="font-size:9pt;font-family:宋体;">、</span><span style="font-size:9pt;font-family:Arial;">CSS</span><span style="font-size:9pt;font-family:宋体;">、</span><span style="font-size:9pt;font-family:Arial;">HTML</span><span style="font-size:9pt;font-family:宋体;">、</span><span style="font-size:9pt;font-family:Arial;">Web Service </span><span style="font-size:9pt;font-family:宋体;">以及</span><span style="font-size:9pt;font-family:Arial;"> Windows </span><span style="font-size:9pt;font-family:宋体;">和</span><span style="font-size:9pt;font-family:Arial;"> Navigation </span><span style="font-size:9pt;font-family:宋体;">对象）。</span>
</li>
<li><span style="font-size:9pt;font-family:宋体;">关于</span><span style="font-size:9pt;font-family:Arial;"> AJax </span><span style="font-size:9pt;font-family:宋体;">的基本原理，请阅读</span><span style="font-size:9pt;font-family:Arial;"> <a href="http://www.backbase.com/download/Whitepaper Backbase AJAX and Beyond.pdf"><span style="font-family:宋体;"><span><font face="宋体" color="#5c81a7"><u>策略白皮书</u></font></span></span></a></span><span style="font-size:9pt;font-family:宋体;">。</span>
</li>
<li><span style="font-size:9pt;font-family:宋体;">请看看</span><span style="font-size:9pt;font-family:Arial;"> <a href="http://www.flickr.com/"><span><font face="Arial" color="#5c81a7"><u>Flickr.com</u></font></span></a> </span><span style="font-size:9pt;font-family:宋体;">上展示的一些很棒的</span><span style="font-size:9pt;font-family:Arial;"> Ajax </span><span style="font-size:9pt;font-family:宋体;">应用程序。</span>
</li>
<li><span style="font-size:9pt;font-family:Arial;">Google </span><span style="font-size:9pt;font-family:宋体;">的</span><span style="font-size:9pt;font-family:Arial;"> <a href="http://gmail.google.com/"><span><font face="Arial" color="#5c81a7"><u>GMail</u></font></span></a> </span><span style="font-size:9pt;font-family:宋体;">是另一个利用</span><span style="font-size:9pt;font-family:Arial;"> Ajax </span><span style="font-size:9pt;font-family:宋体;">的革命性</span><span style="font-size:9pt;font-family:Arial;"> Web </span><span style="font-size:9pt;font-family:宋体;">应用程序的例子。</span>
</li>
<li><em><span style="font-size:9pt;font-family:Arial;"><a href="http://www.oreilly.com/catalog/headra/index.html"><font color="#5c81a7"><u>Head Rush Ajax</u></font></a></span></em><span style="font-size:9pt;font-family:宋体;">（</span><span style="font-size:9pt;font-family:Arial;">O'Reilly Media, Inc.</span><span style="font-size:9pt;font-family:宋体;">，</span><span style="font-size:9pt;font-family:Arial;">2006 </span><span style="font-size:9pt;font-family:宋体;">年</span><span style="font-size:9pt;font-family:Arial;"> 2 </span><span style="font-size:9pt;font-family:宋体;">月）包含了本文以及本系列文章所述的内容（还有更多），并采用了创新的获奖格式</span><span style="font-size:9pt;font-family:Arial;"> Head First</span><span style="font-size:9pt;font-family:宋体;">。</span>
</li>
<li><em><span style="font-size:9pt;font-family:Arial;"><a href="http://www.oreilly.com/catalog/jscript4/index.html"><font color="#5c81a7"><u>JavaScript: The Definitive Guide</u></font></a></span></em><span style="font-size:9pt;font-family:宋体;">，第</span><span style="font-size:9pt;font-family:Arial;"> 4 </span><span style="font-size:9pt;font-family:宋体;">版（</span><span style="font-size:9pt;font-family:Arial;">O'Reilly Media, Inc.</span><span style="font-size:9pt;font-family:宋体;">，</span><span style="font-size:9pt;font-family:Arial;">2001 </span><span style="font-size:9pt;font-family:宋体;">年</span><span style="font-size:9pt;font-family:Arial;"> 11 </span><span style="font-size:9pt;font-family:宋体;">月）是关于</span><span style="font-size:9pt;font-family:Arial;"> JavaScript </span><span style="font-size:9pt;font-family:宋体;">语言和使用动态网页的好资料。</span>
</li>
<li style="color:black;line-height:14.25pt;text-align:left;"><span style="font-size:9pt;font-family:Arial;">developerWorks <a href="http://www.ibm.com/developerworks/web/"><font color="#5c81a7"><u>Web <span style="font-family:宋体;">体系结构专区</span></u></font></a> </span><span style="font-size:9pt;font-family:宋体;">专门发表关于各种基于</span><span style="font-size:9pt;font-family:Arial;"> Web </span><span style="font-size:9pt;font-family:宋体;">的解决方案的文章。</span> </li>
</ul>
<div>&nbsp;</div>
<p>Trackback: http://tb.blog.csdn.net/TrackBack.aspx?PostId=586267</p>
</div>
</div>

---

[📚 返回目录](/needisme-mu-lu/)
