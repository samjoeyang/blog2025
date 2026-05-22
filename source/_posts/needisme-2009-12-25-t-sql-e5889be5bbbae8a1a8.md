---
title: "T-SQL 创建表"
date: 2009-12-25 10:19:00
categories: NeedIsMe
tags: ["T-SQL", "SQL"]
---

<p><span style="font-family: 宋体;">在一个</span>SQL Server<span style="font-family: 宋体;">数据库中，可以创建多达两万亿个表</span></p>
<p><span style="font-family: 宋体;">输入一条</span>Create Table <span style="font-family: 宋体;">语句</span> <span style="font-family: 宋体;">指定下列内容</span></p>
<p>1.<span style="font-family: 宋体;">包含表的数据库</span></p>
<p>2.<span style="font-family: 宋体;">表的所有者</span></p>
<p>3.<span style="font-family: 宋体;">表名，在同一个数据库中和同一个所有者下，改表名必须与任何其他基表或视图不同</span></p>
<p>4.<span style="font-family: 宋体;">指定</span>1<span style="font-family: 宋体;">到</span>1024<span style="font-family: 宋体;">个列</span></p>
<p>5.<span style="font-family: 宋体;">主键约束（可选）</span></p>
<p>6.1<span style="font-family: 宋体;">到</span>250<span style="font-family: 宋体;">个</span>Uniquer<span style="font-family: 宋体;">约束（可选）</span></p>
<p>7.1<span style="font-family: 宋体;">到</span>253<span style="font-family: 宋体;">个外键约束（可选）</span></p>
<p>8.1<span style="font-family: 宋体;">个或者多个</span>Check<span style="font-family: 宋体;">约束</span> <span style="font-family: 宋体;">，限制插入表中的数据（可选）</span></p>
<p>9.<span style="font-family: 宋体;">存储表的文件组（可选）</span></p>
<div class="cnblogs_code"><span style="color: #008080;">--</span><span style="color: #008080;">创建表</span><span style="color: #008080;">*/</span><span style="color: #000000;"><br />
</span><span style="color: #0000ff;">use</span><span style="color: #000000;"> databaseName<br />
</span><span style="color: #0000ff;">go</span><span style="color: #000000;"><br />
</span><span style="color: #0000ff;">create</span><span style="color: #000000;"> </span><span style="color: #0000ff;">Table</span><span style="color: #000000;"> tbName<br />
(<br />
tb_id </span><span style="color: #0000ff;">int</span><span style="color: #000000;"> </span><span style="color: #808080;">Not</span><span style="color: #000000;"> </span><span style="color: #0000ff;">Null</span><span style="color: #000000;"> </span><span style="color: #0000ff;">check</span><span style="color: #000000;">(tb_id</span><span style="color: #808080;">></span><span style="font-weight: bold; color: #800000;">0</span><span style="color: #000000;">),<br />
UserName </span><span style="color: #0000ff;">varchar</span><span style="color: #000000;">(</span><span style="font-weight: bold; color: #800000;">50</span><span style="color: #000000;">) </span><span style="color: #808080;">NOT</span><span style="color: #000000;"> </span><span style="color: #0000ff;">NULL</span><span style="color: #000000;"> </span><span style="color: #0000ff;">CHECK</span><span style="color: #000000;">(UserName</span><span style="color: #808080;"><></span><span style="color: #ff0000;">''</span><span style="color: #000000;">)&nbsp;,<br />
Sex </span><span style="color: #0000ff;">int</span><span style="color: #000000;"> </span><span style="color: #808080;">not</span><span style="color: #000000;"> </span><span style="color: #0000ff;">Null</span><span style="color: #000000;"> </span><span style="color: #0000ff;">Default</span><span style="color: #000000;"> </span><span style="font-weight: bold; color: #800000;">1</span><span style="color: #000000;"> ,<br />
price </span><span style="color: #0000ff;">Money</span><span style="color: #000000;"> </span><span style="color: #808080;">NOT</span><span style="color: #000000;"> </span><span style="color: #0000ff;">NULL</span><span style="color: #000000;"> </span><span style="color: #0000ff;">CHECK</span><span style="color: #000000;">((price </span><span style="color: #0000ff;">is</span><span style="color: #000000;"> </span><span style="color: #0000ff;">NULL</span><span style="color: #000000;"> ) </span><span style="color: #808080;">OR</span><span style="color: #000000;"> (price</span><span style="color: #808080;">>=</span><span style="font-weight: bold; color: #800000;">0</span><span style="color: #000000;">)),<br />
</span><span style="color: #0000ff;">constraint</span><span style="color: #000000;"> tbPriKey </span><span style="color: #0000ff;">Primary</span><span style="color: #000000;"> </span><span style="color: #0000ff;">Key</span><span style="color: #000000;"> (tb_id)<br />
)</p>
<p></span><span style="color: #008080;">--</span><span style="color: #008080;">--修改表--</span><span style="color: #008080;"><br />
--</span><span style="color: #008080;">1.新增字段-</span><span style="color: #008080;"><br />
</span><span style="color: #0000ff;">Alter</span><span style="color: #000000;"> </span><span style="color: #0000ff;">Table</span><span style="color: #000000;"> tbName<br />
</span><span style="color: #0000ff;">add</span><span style="color: #000000;"> tbNewColumn </span><span style="color: #0000ff;">int</span><span style="color: #000000;"> </span><span style="color: #0000ff;">Null</span><span style="color: #000000;"><br />
</span><span style="color: #008080;">--</span><span style="color: #008080;">在为原来的表添加一条字段的时候需要注意的是&nbsp;不允许指定该列为【&nbsp;NOT&nbsp;NULL&nbsp;】</span><span style="color: #008080;">*/</span><span style="color: #000000;"></p>
<p></span><span style="color: #008080;">--</span><span style="color: #008080;">-2.删除字段------</span><span style="color: #008080;"><br />
</span><span style="color: #0000ff;">Alter</span><span style="color: #000000;"> </span><span style="color: #0000ff;">Table</span><span style="color: #000000;"> tbName </span><span style="color: #0000ff;">drop</span><span style="color: #000000;"> </span><span style="color: #0000ff;">column</span><span style="color: #000000;"> tbNewColumn</p>
<p></span><span style="color: #008080;">--</span><span style="color: #008080;">-3.修改字段---</span><span style="color: #008080;"><br />
</span><span style="color: #0000ff;">Alter</span><span style="color: #000000;"> </span><span style="color: #0000ff;">Table</span><span style="color: #000000;"> tbName </span><span style="color: #0000ff;">Alter</span><span style="color: #000000;"> </span><span style="color: #0000ff;">column</span><span style="color: #000000;"> tbNewColumn </span><span style="color: #0000ff;">char</span><span style="color: #000000;">(</span><span style="font-weight: bold; color: #800000;">30</span><span style="color: #000000;">) </span><span style="color: #0000ff;">null</span><span style="color: #000000;"></p>
<p></span><span style="color: #008080;">--</span><span style="color: #008080;">--4.新建约束-------</span><span style="color: #008080;"><br />
</span><span style="color: #0000ff;">ALTER</span><span style="color: #000000;"> </span><span style="color: #0000ff;">Table</span><span style="color: #000000;"> tbName </span><span style="color: #0000ff;">ADD</span><span style="color: #000000;"> </span><span style="color: #0000ff;">constraint</span><span style="color: #000000;"> tbNewRestrain </span><span style="color: #0000ff;">check</span><span><br />
yle="color:rgb(0,0,0);">(tb_id</span><span style="color: #808080;">></span><span style="font-weight: bold; color: #800000;">0</span><span style="color: #000000;">)</p>
<p></span><span style="color: #008080;">--</span><span style="color: #008080;">---5.删除约束---------</span><span style="color: #008080;"><br />
</span><span style="color: #0000ff;">Alter</span><span style="color: #000000;"> </span><span style="color: #0000ff;">Table</span><span style="color: #000000;"> tbName </span><span style="color: #0000ff;">Drop</span><span style="color: #000000;"> </span><span style="color: #0000ff;">constraint</span><span style="color: #000000;"> tbNewRestrain</p>
<p></span><span style="color: #008080;">--</span><span style="color: #008080;">-----6.新建默认值--------</span><span style="color: #008080;"><br />
</span><span style="color: #0000ff;">Alter</span><span style="color: #000000;"> </span><span style="color: #0000ff;">Table</span><span style="color: #000000;"> tbName </span><span style="color: #0000ff;">Add</span><span style="color: #000000;"> </span><span style="color: #0000ff;">constraint</span><span style="color: #000000;"> tbNewDefault </span><span style="color: #0000ff;">Default</span><span style="color: #000000;"> </span><span style="color: #ff0000;">'</span><span style="color: #ff0000;">10</span><span style="color: #ff0000;">'</span><span style="color: #000000;"> </span><span style="color: #0000ff;">for</span><span style="color: #000000;"> tb_id</p>
<p></span><span style="color: #008080;">--</span><span style="color: #008080;">-----7.删除默认值----------</span><span style="color: #008080;"><br />
</span><span style="color: #0000ff;">Alter</span><span style="color: #000000;"> </span><span style="color: #0000ff;">Table</span><span style="color: #000000;"> tbName </span><span style="color: #0000ff;">drop</span><span style="color: #000000;"> </span><span style="color: #0000ff;">constraint</span><span style="color: #000000;"> tbNewDefault</p>
<p></span><span style="color: #0000ff;">select</span><span style="color: #000000;"> </span><span style="color: #808080;">*</span><span style="color: #000000;"> </span><span style="color: #0000ff;">from</span><span style="color: #000000;"> tbName</span></div>
<p>2.表约束</p>
<p><span> </span><span style="font-family: 宋体;">在我们创建表的时候，可以有选择的制定四种类型的约束：</span></p>
<p>1.<span style="font-family: 宋体;">主键</span></p>
<p>2.<span style="font-family: 宋体;">唯一性</span></p>
<p>3.<span style="font-family: 宋体;">外键</span></p>
<p>4.<span style="font-family: 宋体;">检查</span></p>
<div class="cnblogs_code"><span style="color: #0000ff;">create</span><span style="color: #000000;"> </span><span style="color: #0000ff;">table</span><span style="color: #000000;"> student<br />
(<br />
s_id </span><span style="color: #0000ff;">int</span><span style="color: #000000;"> </span><span style="color: #ff00ff;">identity</span><span style="color: #000000;">(</span><span style="font-weight: bold; color: #800000;">1</span><span style="color: #000000;">,</span><span style="font-weight: bold; color: #800000;">1</span><span style="color: #000000;">) </span><span style="color: #0000ff;">primary</span><span style="color: #000000;"> </span><span style="color: #0000ff;">key</span><span style="color: #000000;">,<br />
s_name </span><span style="color: #0000ff;">varchar</span><span style="color: #000000;">(</span><span style="font-weight: bold; color: #800000;">20</span><span style="color: #000000;">) </span><span style="color: #808080;">not</span><span style="color: #000000;"> </span><span style="color: #0000ff;">null</span><span style="color: #000000;">,<br />
s_age </span><span style="color: #0000ff;">int</span><span style="color: #000000;"><br />
)</p>
<p></span><span style="color: #0000ff;">create</span><span style="color: #000000;"> </span><span style="color: #0000ff;">table</span><span style="color: #000000;"> test<br />
(<br />
test_no </span><span style="color: #0000ff;">int</span><span style="color: #000000;"> </span><span style="color: #ff00ff;">identity</span><span style="color: #000000;">(</span><span style="font-weight: bold; color: #800000;">1</span><span style="color: #000000;">,</span><span style="font-weight: bold; color: #800000;">1</span><span style="color: #000000;">) </span><span style="color: #0000ff;">primary</span><span style="color: #000000;"> </span><span style="color: #0000ff;">key</span><span style="color: #000000;">,<br />
test_name </span><span style="color: #0000ff;">varchar</span><span style="color: #000000;">(</span><span style="font-weight: bold; color: #800000;">30</span><span style="color: #000000;">),<br />
nax_marks </span><span style="color: #0000ff;">int</span><span style="color: #000000;"> </span><span style="color: #808080;">not</span><span style="color: #000000;"> </span><span style="color: #0000ff;">null</span><span style="color: #000000;"> </span><span style="color: #0000ff;">default</span><span style="color: #000000;">(</span><span style="font-weight: bold; color: #800000;">0</span><span style="color: #000000;">),<br />
min_marks </span><span style="color: #0000ff;">int</span><span style="color: #000000;"> </span><span style="color: #808080;">not</span><span style="color: #000000;"> </span><span style="color: #0000ff;">null</span><span style="color: #000000;"> </span><span style="color: #0000ff;">default</span><span style="color: #000000;">(</span><span style="font-weight: bold; color: #800000;">0</span><span style="color: #000000;">)<br />
)<br />
</span><span style="color: #0000ff;">create</span><span style="color: #000000;"> </span><span style="color: #0000ff;">table</span><span style="color: #000000;"> marks<br />
(<br />
s_id </span><span style="color: #0000ff;">int</span><span style="color: #000000;"> </span><span style="color: #808080;">not</span><span style="color: #000000;"> </span><span style="color: #0000ff;">null</span><span style="color: #000000;">,<br />
test_no </span><span style="color: #0000ff;">int</span><span style="color: #000000;"> </span><span style="color: #808080;">not</span><span style="color: #000000;"> </span><span style="color: #0000ff;">null</span><span style="color: #000000;">,<br />
marks </span><span style="color: #0000ff;">int</span><span style="color: #000000;"> </span><span style="color: #808080;">not</span><span style="color: #000000;"> </span><span style="color: #0000ff;">null</span><span style="color: #000000;"> </span><span style="color: #0000ff;">default</span><span style="color: #000000;">(</span><span style="font-weight: bold; color: #800000;">0</span><span style="color: #000000;">),<br />
</span><span style="color: #0000ff;">primary</span><span style="color: #000000;"> </span><span style="color: #0000ff;">key</span><span style="color: #000000;">(s_id,test_no),<br />
</span><span style="color: #0000ff;">foreign</span><span style="color: #000000;"> </span><span style="color: #0000ff;">key</span><span style="color: #000000;">(s_id) </span><span style="color: #0000ff;">references</span><span style="color: #000000;"> student(s_id),<br />
</span><span style="color: #0000ff;">foreign</span><span style="color: #000000;"> </span><span style="color: #0000ff;">key</span><span style="color: #000000;">(test_no) </span><span><br />
yle="color:rgb(0,0,255);">references</span><span style="color: #000000;"> test(test_no)<br />
)</p>
<p></span></div>
<p>3. 索引以及视图的创建</p>
<div class="cnblogs_code"><span style="color: #000000;">-----</span><span style="color: #000000;">视图的建立</span><span style="color: #000000;">-------</span><span style="color: #000000;"><br />
create&nbsp;view&nbsp;&nbsp;视图名<br />
(<br />
字段1，<br />
字段2，<br />
<img src="http://www.cnblogs.com/Images/dot.gif" alt="" />..<br />
)<br />
</span><span style="color: #0000ff;">as</span><span style="color: #000000;"> select&nbsp;a.字段1&nbsp;,a.字段2,<img src="http://www.cnblogs.com/Images/dot.gif" alt="" />..&nbsp;from&nbsp;tableName </span><span style="color: #0000ff;">as</span><span style="color: #000000;"> a </span><span style="color: #0000ff;">where</span><span style="color: #000000;"> <img src="http://www.cnblogs.com/Images/dot.gif" alt="" /></p>
<p></span><span style="color: #000000;">------</span><span style="color: #000000;">索引的创建</span><span style="color: #000000;">--------</span><span style="color: #000000;"><br />
create&nbsp;index&nbsp;indexName<br />
on&nbsp;TableName<br />
(字段1，字段2，字段3)</span></div>

---

[📚 返回目录](/needisme-mu-lu/)
