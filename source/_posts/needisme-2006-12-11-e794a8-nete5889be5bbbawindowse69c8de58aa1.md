---
title: "用.NET创建Windows服务"
date: 2006-12-11 03:50:57
categories: NeedIsMe
tags: ["Windows", ".NET", "SQL"]
---

<div id="msgcns!A634C4CD7A14B666!392" class="bvMsg">
<div>我们将研究如何创建一个作为Windows服务的应用程序。内容包含什么是Windows服务，如何创建、安装和调试它们。会用到System.ServiceProcess.ServiceBase命名空间的类。 </div>
<div>什么是Windows服务？ </div>
<div>Windows服务应用程序是一种需要长期运行的应用程序，它对于服务器环境特别适合。它没有用户界面，并且也不会产生任何可视输出。任何用户消息都会被写进Windows事件日志。计算机启动时，服务会自动开始运行。它们不要用户一定登录才运行，它们能在包括这个系统内的任何用户环境下运行。通过服务控制管理器，Windows服务是可控的，可以终止、暂停及当需要时启动。 </div>
<div>Windows 服务，以前的NT服务，都是被作为Windows NT*作系统的一部分引进来的。它们在Windows 9x及Windows Me下没有。你需要使用NT级别的*作系统来运行Windows服务，诸如：Windows NT、Windows 2000 Professional或Windows 2000 Server。举例而言，以Windows服务形式的产品有：Microsoft Exchange、SQL Server，还有别的如设置计算机时钟的Windows Time服务。 </div>
<div>创建一个Windows服务 <br />我们即将创建的这个服务除了演示什么也不做。服务被启动时会把一个条目信息登记到一个数据库当中来指明这个服务已经启动了。在服务运行期间，它会在指定的时间间隔内定期创建一个数据库项目记录。服务停止时会创建最后一条数据库记录。这个服务会自动向Windows应用程序日志当中登记下它成功启动或停止时的记录。 </div>
<div>Visual Studio .NET能够使创建一个Windows服务变成相当简单的一件事情。启动我们的演示服务程序的说明概述如下。 </div>
<div>1. 新建一个项目 <br />2. 从一个可用的项目模板列表当中选择Windows服务 <br />3. 设计器会以设计模式打开 <br />4. 从工具箱的组件表当中拖动一个Timer对象到这个设计表面上 (注意: 要确保是从组件列表而不是从Windows窗体列表当中使用Timer) <br />5. 设置Timer属性，Enabled属性为False，Interval属性30000毫秒 <br />6. 切换到代码视图页(按F7或在视图菜单当中选择代码)，然后为这个服务填加功能 </div>
<div>Windows服务的构成 <br />在你类后面所包含的代码里，你会注意到你所创建的Windows服务扩充了System.ServiceProcess.Service类。所有以.NET方式建立的Windows服务必须扩充这个类。它会要求你的服务重载下面的方法，Visual Studio默认时包括了这些方法。 </div>
<div><I>&amp;#</I>8226; Dispose &ndash; 清除任何受控和不受控资源(managed and unmanaged resources) <br /><I>&amp;#</I>8226; OnStart &ndash; 控制服务启动 <br /><I>&amp;#</I>8226; OnStop &ndash; 控制服务停止 </div>
<div>数据库表脚本样例 <br />在这个例子中使用的数据库表是使用下面的T-SQL脚本创建的。我选择SQL Server数据库。你可以很容易修改这个例子让它在Access或任何你所选择的别的数据库下运行。 </div>
<div>CREATE TABLE [dbo].[MyServiceLog] ( <br />&nbsp; [in_LogId] [int] IDENTITY (1, 1) NOT NULL, <br />&nbsp; [vc_Status] [n<I>var</I>char] (40) <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL, <br />&nbsp; [dt_Created] [datetime] NOT NULL <br />) ON [PRIMARY] </div>
<div>Windows服务样例 <br />下面就是我命名为MyService的Windows服务的所有源代码。大多数源代码是由Visual Studio自动生成的。 </div>
<div>using System; <br />using System.Collections; <br />using System.ComponentModel; <br />using System.Data; <br />using System.Data.SqlClient; <br />using System.Diagnostics; <br />using System.ServiceProcess; </div>
<div>namespace CodeGuru.MyWindowsService <br />&#123; <br />public class MyService : System.ServiceProcess.ServiceBase <br />&#123; <br />&nbsp; private System.Timers.Timer timer1; <br />&nbsp; /// <remarks> <br />&nbsp; /// Required designer <I>var</I>iable. <br />&nbsp; /// </remarks> <br />&nbsp; private System.ComponentModel.Container components = null; </div>
<div>&nbsp; public MyService() <br />&nbsp; &#123; <br />&nbsp;&nbsp;&nbsp; // This call is required by the Windows.Forms <br />&nbsp;&nbsp;&nbsp; // Component Designer. <br />&nbsp;&nbsp; InitializeComponent(); <br />&nbsp; &#125; </div>
<div>&nbsp; // The main entry point for the process <br />&nbsp; static void Main() <br />&nbsp; &#123; <br />&nbsp;&nbsp; System.ServiceProcess.ServiceBase[] ServicesToRun; <br />&nbsp; <br />&nbsp;&nbsp; ServicesToRun = new System.ServiceProcess.ServiceBase[] <br />&#123; new MyService() &#125;; </div>
<div>&nbsp;&nbsp; System.ServiceProcess.ServiceBase.Run(ServicesToRun); <br />&nbsp; &#125; </div>
<div>&nbsp; ///<br />
<summary>&nbsp; /// Required method for Designer support - do not modify <br />&nbsp; /// the contents of this method with the code editor. <br />&nbsp; /// </summary>
<p>&nbsp; private void InitializeComponent() <br />&nbsp; &#123; <br />&nbsp;&nbsp; this.timer1 = new System.Timers.Timer(); <br />&nbsp;&nbsp; ((System.ComponentModel.ISupportInitialize) <br />(this.timer1)).BeginInit(); <br />&nbsp;&nbsp; // <br />&nbsp;&nbsp; // timer1 <br />&nbsp;&nbsp; // <br />&nbsp;&nbsp; this.timer1.Interval = 30000; <br />&nbsp;&nbsp; this.timer1.Elapsed += <br />&nbsp; new System.Timers.ElapsedEventHandler(this.timer1_Elapsed); <br />&nbsp;&nbsp; // <br />&nbsp;&nbsp; // MyService <br />&nbsp;&nbsp; // <br />&nbsp;&nbsp; this.ServiceName = "My Sample Service"; <br />&nbsp;&nbsp; ((System.ComponentModel.ISupportInitialize) <br />(this.timer1)).EndInit(); </div>
<div>&nbsp; &#125; </div>
<div>&nbsp; ///<br />
<summary>&nbsp; /// Clean up any resources being used. <br />&nbsp; /// </summary>
<p>&nbsp; protected override void Dispose( bool disposing ) <br />&nbsp; &#123; <br />&nbsp;&nbsp; if( disposing ) <br />&nbsp;&nbsp; &#123; <br />&nbsp;&nbsp; if (components != null) <br />&nbsp;&nbsp; &#123; <br />&nbsp;&nbsp;&nbsp;&nbsp; components.Dispose(); <br />&nbsp;&nbsp; &#125; <br />&nbsp;&nbsp; &#125; <br />&nbsp;&nbsp; base.Dispose( disposing ); <br />&nbsp; &#125; </div>
<div>&nbsp; ///<br />
<summary>&nbsp; /// Set things in motion so your service can do its work. <br />&nbsp; /// </summary>
<p>&nbsp; protected override void OnStart(string[] args) <br />&nbsp; &#123; <br />&nbsp;&nbsp; this.timer1.Enabled = true; <br />&nbsp;&nbsp; this.LogMessage("Service Started"); <br />&nbsp; &#125; </div>
<div>&nbsp; ///<br />
<summary>&nbsp; /// Stop this service. <br />&nbsp; /// </summary>
<p>&nbsp; protected override void OnStop() <br />&nbsp; &#123; <br />&nbsp;&nbsp; this.timer1.Enabled = false; <br />&nbsp;&nbsp; this.LogMessage("Service Stopped"); <br />&nbsp; &#125; </div>
<div>&nbsp; -- <br />&nbsp; * Respond to the Elapsed event of the timer control <br />&nbsp; */ <br />&nbsp; private void timer1_Elapsed(object sender, <br />System.Timers.ElapsedEventArgs e) <br />&nbsp; &#123; <br />&nbsp;&nbsp; this.LogMessage("Service Running"); <br />&nbsp; &#125; </div>
<div>&nbsp; -- <br />&nbsp; * Log specified message to database <br />&nbsp; */ <br />&nbsp; private void LogMessage(string Message) <br />&nbsp; &#123; <br />&nbsp;&nbsp; SqlConnection connection = null; <br />&nbsp;&nbsp; SqlCommand command = null; <br />&nbsp;&nbsp; try <br />&nbsp;&nbsp; &#123; <br />&nbsp;&nbsp; connection = new SqlConnection( <br />"Server=localhost;Database=SampleDatabase;Integrated <br />Security=false;User Id=sa;Password=;"); <br />command = new SqlCommand( <br />"INSERT INTO MyServiceLog (vc_Status, dt_Created) <br />valueS ('" + Message + "',getdate())", connection); <br />&nbsp;&nbsp; connection.Open(); <br />&nbsp;&nbsp; int numrows = command.ExecuteNonQuery(); <br />&nbsp;&nbsp; &#125; <br />&nbsp;&nbsp; catch( Exception ex ) <br />&nbsp;&nbsp; &#123; <br />&nbsp;&nbsp; System.Diagnostics.Debug.WriteLine(ex.Message); <br />&nbsp;&nbsp; &#125; <br />&nbsp;&nbsp; finally <br />&nbsp;&nbsp; &#123; <br />&nbsp;&nbsp; command.Dispose(); <br />&nbsp;&nbsp; connection.Dispose(); <br />&nbsp;&nbsp; &#125; <br />&nbsp; &#125; <br />&#125; <br />&#125; </div>
<div>安装Windows服务 <br />Windows服务不同于普通Windows应用程序。不可能简简单单地通过运行一个EXE就启动Windows服务了。安装一个Windows服务应该通过使用.NET <I>Frame</I>work提供的InstallUtil.exe来完成，或者通过诸如一个Microsoft Installer (MSI)这样的文件部署项目完成。 </div>
<div>&nbsp;</div>
<div>添加服务安装程序 <br />创建一个Windows服务，仅用InstallUtil程序去安装这个服务是不够的。你必须还要把一个服务安装程序添加到你的Windows服务当中，这样便于InstallUtil或是任何别的安装程序知道应用你服务的是怎样的配置设置。 </div>
<div>1. 将这个服务程序切换到设计视图 <br />2. 右击设计视图选择&ldquo;添加安装程序&rdquo; <br />3. 切换到刚被添加的ProjectInstaller的设计视图 <br />4. 设置serviceInstaller1组件的属性： <br />&nbsp; 1) ServiceName = My Sample Service <br />&nbsp; 2) StartType = Automatic <br />5. 设置serviceProcessInstaller1组件的属性 <br />&nbsp; 1) Account = LocalSystem <br />6. 生成解决方案 </div>
<div>在完成上面的几个步骤之后，会自动由Visual Studio产生下面的源代码，它包含?rojectInstaller.cs这个源文件内。 </div>
<div>using System; <br />using System.Collections; <br />using System.ComponentModel; <br />using System.Configuration.Install; </div>
<div>namespace CodeGuru.MyWindowsService <br />&#123; <br />///<br />
<summary>/// Summary de<I>script</I>ion for ProjectInstaller. <br />/// </summary>
<p>[RunInstaller(true)] <br />public class ProjectInstaller : <br />System.Configuration.Install.Installer <br />&#123; <br />&nbsp; private System.ServiceProcess.ServiceProcessInstaller <br />serviceProcessInstaller1; <br />&nbsp; private System.ServiceProcess.ServiceInstaller serviceInstaller1; <br />&nbsp; ///<br />
<summary>&nbsp; /// Required designer <I>var</I>iable. <br />&nbsp; /// </summary>
<p>&nbsp; private System.ComponentModel.Container components = null; </div>
<div>&nbsp; public ProjectInstaller() <br />&nbsp; &#123; <br />&nbsp;&nbsp; // This call is required by the Designer. <br />&nbsp;&nbsp; InitializeComponent(); </div>
<div>&nbsp;&nbsp; // TODO: Add any initialization after the InitComponent call <br />&nbsp; &#125; </div>
<div>&nbsp; #region Component Designer generated code <br />&nbsp; ///<br />
<summary>&nbsp; /// Required method for Designer support - do not modify <br />&nbsp; /// the contents of this method with the code editor. <br />&nbsp; /// </summary>
<p>&nbsp; private void InitializeComponent() <br />&nbsp; &#123; <br />&nbsp;&nbsp; this.serviceProcessInstaller1 = new <br />System.ServiceProcess.ServiceProcessInstaller(); <br />&nbsp;&nbsp; this.serviceInstaller1 = new <br />System.ServiceProcess.ServiceInstaller(); <br />&nbsp;&nbsp; // <br />&nbsp;&nbsp; // serviceProcessInstaller1 <br />&nbsp;&nbsp; // <br />&nbsp;&nbsp; this.serviceProcessInstaller1.Account = <br />System.ServiceProcess.ServiceAccount.LocalSystem; <br />&nbsp;&nbsp; this.serviceProcessInstaller1.Password = null; <br />&nbsp;&nbsp; this.serviceProcessInstaller1.Username = null; <br />&nbsp;&nbsp; // <br />&nbsp;&nbsp; // serviceInstaller1 <br />&nbsp;&nbsp; // <br />&nbsp;&nbsp; this.serviceInstaller1.ServiceName = "My Sample Service"; <br />&nbsp;&nbsp; this.serviceInstaller1.StartType = <br />System.ServiceProcess.ServiceStartMode.Automatic; <br />&nbsp;&nbsp; // <br />&nbsp;&nbsp; // ProjectInstaller <br />&nbsp;&nbsp; // <br />&nbsp;&nbsp; this.Installers.AddRange(new <br />System.Configuration.Install.Installer[] <br />&#123;this.serviceProcessInstaller1, this.serviceInstaller1&#125;); <br />&#125; <br />&nbsp; #endregion <br />&#125; <br />&#125; </div>
<div>用InstallUtil安装Windows服务 <br />现在这个服务已经生成，你需要把它安装好才能使用。下面*作会指导你安装你的新服务。 </div>
<div>1. 打开Visual Studio .NET命令提示 <br />2. 改变路径到你项目所在的binDebug文件夹位置(如果你以Release模式编译则在binRelease文件夹) <br />3. 执行命令&ldquo;InstallUtil.exe MyWindowsService.exe&rdquo;注册这个服务，使它建立一个合适的注册项。 <br />4. 右击桌面上&ldquo;我的电脑&rdquo;，选择&ldquo;管理&rdquo;就可以打计算机管理控制台 <br />5. 在&ldquo;服务和应用程序&rdquo;里面的&ldquo;服务&rdquo;部分里，你可以发现你的Windows服务已经包含在服务列表当中了 <br />6. 右击你的服务选择启动就可以启动你的服务了 </div>
<div>在每次需要修改Windows服务时，这就会要求你卸载和重新安装这个服务。不过要注意在卸载这个服务前，最好确保服务管理控制台已经关闭，这会是一个很好的习惯。如果没有这样*作的话，你可能在卸载和重安装Windows服务时会遇到麻烦。仅卸载服务的话，可以执行相的InstallUtil命令用于注销服务，不过要在后面加一个/u命令开关。 </div>
<div>调试Windows服务 <br />从另外的角度度看，调试Windows服务绝不同于一个普通的应用程序。调试Windows服务要求的步骤更多。服务不能象你对普通应用程序做的那样，只要简单地在开发环境下执行就可以调试了。服务必须首先被安装和启动，这一点在前面部分我们已经做到了。为了便于跟踪调试代码，一旦服务被启动，你就要用Visual Studio把运行的进程附加进来(attach)。记住，对你的Windows服务做的任何修改都要对这个服务进行卸载和重安装。 </div>
<div>附加正在运行的Windows服务 <br />为了调试程序，有些附加Windows服务的*作说明。这些*作假定你已经安装了这个Windows服务并且它正在运行。 </div>
<div>1. 用Visual Studio装载这个项目 <br />2. 点击&ldquo;调试&rdquo;菜单 <br />3. 点击&ldquo;进程&rdquo;菜单 <br />4. 确保 显示系统进程 被选 <br />5. 在 可用进程 列表中，把进程定位于你的可执行文件名称上点击选中它 <br />6. 点击 附加 按钮 <br />7. 点击 确定 <br />8. 点击 关闭 <br />9. 在timer1_Elapsed方法里设置一个断点，然后等它执行 </div>
<div>总结 <br />现在你应该对Windows服务是什么，以及如何创建、安装和调试它们有一个粗略的认识了。Windows服务的额处的功能你可以自行研究。这些功能包括暂停(OnPause)和恢复(OnContinue)的能力。暂停和恢复的能力在默认情况下没有被启用，要通过Windows服务属性来设置。 </div>
</div>

---

[📚 返回目录](/needisme-mu-lu/)
