---
title: "T-sql DateTime数据类型的格式转换"
date: 2009-10-16 21:32:00
categories: NeedIsMe
tags: ["T-SQL", "SQL"]
---

<p>数据库中有个字段叫orderTime，是DateTime类型的数据，如果我们用以下SQL语句把它取出来：<br />
select<br />
orderTime<br />
from orders<br />
则会把时间都显示出来，而如果改成下面的SQL语句：<br />
select<br />
orderTime = convert(varchar(10),orderTime,120)<br />
from orders<br />
则会显示YYYY-MM-DD的格式，如：2006-06-13<br />
实际上还有其它的样式，如SQL这样写：</p>
<p>select<br />
orderTime = convert(varchar(12),orderTime,111)<br />
from orders<br />
则以YYYY/MM/DD格式显示。如2006/06/13<br />
还有一大堆的格式(下面的getdate()方法是SQL里面的函数，取得服务器当前时间，也是DateTime格式的)<br />
select CONVERT(varchar(12) , getdate(), 112 )<br />
20040912<br />
select CONVERT(varchar(12) , getdate(), 102 )<br />
2004.09.12<br />
select CONVERT(varchar(12) , getdate(), 101 )<br />
09/12/2004<br />
select CONVERT(varchar(12) , getdate(), 103 )<br />
12/09/2004<br />
select CONVERT(varchar(12) , getdate(), 104 )<br />
12.09.2004<br />
select CONVERT(varchar(12) , getdate(), 105 )<br />
12-09-2004<br />
select CONVERT(varchar(12) , getdate(), 106 )<br />
12 09 2004<br />
select CONVERT(varchar(12) , getdate(), 107 )<br />
09 12, 2004<br />
select CONVERT(varchar(12) , getdate(), 108 )<br />
11:06:08<br />
select CONVERT(varchar(12) , getdate(), 109 )<br />
09 12 2004 1<br />
select CONVERT(varchar(12) , getdate(), 110 )<br />
09-12-2004<br />
select CONVERT(varchar(12) , getdate(), 113 )<br />
12 09 2004 1<br />
select CONVERT(varchar(12) , getdate(), 114 )<br />
11:06:08.177</p>

---

[📚 返回目录](/needisme-mu-lu/)
