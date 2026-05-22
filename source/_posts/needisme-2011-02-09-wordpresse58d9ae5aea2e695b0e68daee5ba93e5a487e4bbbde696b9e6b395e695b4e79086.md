---
title: "wordpress博客数据库备份方法整理"
date: 2011-02-09 12:05:24
categories: NeedIsMe
tags: ["Blog", "SQL", "PHP", "WordPress", "MySQL"]
---

<p><span style="font-size: x-small;">来源：<a href="http://fhttian.info/archives/176" target="_blank">http://fhttian.info/archives/176</a><br />
</span></p>
<p><span style="font-size: x-small;">不管你的空间多么稳定，操作多么小心翼翼，自信心多么强，都请你抽出一定点时间来备份一下你的<a title="查看 博客 的全部文章" href="http://fhttian.info/archives/tag/%e5%8d%9a%e5%ae%a2" target="_blank">博客</a>数据吧，因为很多人就是因为太自信或者太相信空间商，而导致自己多年的<a title="查看 博客 的全部文章" href="http://fhttian.info/archives/tag/%e5%8d%9a%e5%ae%a2" target="_blank">博客</a>数据丢失。</span></p>
<p><span style="font-size: x-small;">数据库的备份方法无外乎有两种，一种是手动备份，一种是通过插件自动备份，下面分别介绍一下这两种方法的操作步骤和主要用到哪些工具。<br />
<img src="http://imgur.com/A6ULq.jpg" alt="" /><br />
<strong>一、手动备份</strong><br />
1、通过 <a title="查看 WordPress 的全部文章" href="http://fhttian.info/archives/tag/wordpress" target="_blank">WordPress</a> 后台备份博客数据库。<br />
进入 <a title="查看 WordPress 的全部文章" href="http://fhttian.info/archives/tag/wordpress" target="_blank">WordPress</a> 后台，点击"工具"选项下面的"导出"，然后在出现的页面点击"下载导出文件"就可以了。如果你的博客有多个作者，你还可以选择导出某一个作者的相关文件。导出文件包括对应作者的全部文章、页面、评论、自定义域、分类目录和标签，但是不包括 <a title="查看 WordPress 的全部文章" href="http://fhttian.info/archives/tag/wordpress" target="_blank">WordPress</a> 插件和小工具的设置。<br />
2、通过 cPanel 备份博客数据库。<!-- more --><br />
进入 cPanel 之后，点击"文件"分类里面的"备份"，在出现页面的"部分备份"下面，选择需要备份的博客对应的 MySQL 数据库并下载。<br />
3、通过 phpMyAdmin 备份博客数据库<br />
点击 cPanel "数据库" 分类下面的 "phpMyAdmin"，在出现的页面点击博客对应的数据库，然后点击工具栏上的"导出"，并在下一页面的"另存为文件"一栏下面选择"gzip压缩"，然后点击"执行"，就可以把数据库下载到你的电脑硬盘了。<br />
<strong>二、常用wordpress数据库备份插件</strong><br />
1、<a title="查看 WordPress 的全部文章" href="http://fhttian.info/archives/tag/wordpress" target="_blank">WordPress</a> Database Backup<br />
安装并激活 <a title="查看 WordPress 的全部文章" href="http://fhttian.info/archives/tag/wordpress" target="_blank">WordPress</a> Database Backup 插件之后，你会在 <a title="查看 WordPress 的全部文章" href="http://fhttian.info/archives/tag/wordpress" target="_blank">WordPress</a> 控制面板的"工具"分类下面看到"备份"选项，点击就可以对插件进行设置。你可以选择要备份的数据表，然后通过设定"定时备份"把备份数据库发到你的邮箱，当然，你也可以选择"立即备份"，把数据库备份到你的电脑硬盘。<br />
地址：<a href="http://wordpress.org/extend/plugins/wordpressbackup/" target="_blank">http://wordpress.org/extend/plugins/wp-db-backup/</a><br />
2、<a title="查看 WordPress 的全部文章" href="http://fhttian.info/archives/tag/wordpress" target="_blank">WordPress</a> Online Automated Backup<br />
到 <a href="http://wordpressbackup.com/" target="_blank">wordpressbackup.com</a> 网站注册一个帐号，并添加你的博客（一个帐号一个博客），接着下载并安装 <a title="查看 WordPress 的全部文章" href="http://fhttian.info/archives/tag/wordpress" target="_blank">WordPress</a> Online Automated Backup 插件，然后按照要求对插件进行设置，完了之后，该插件就会自动备份你的博客数据库到 <a href="http://wordpressbackup.com/" target="_blank">wordpressbackup.com</a> 网站，备份时间是经常而不定时的，免费帐户数据库的最大容量为 5M。<br />
地址：<a href="http://wordpress.org/extend/plugins/wordpressbackup" target="_blank">http://wordpress.org/extend/plugins/wordpressbackup</a><br />
3、BackWPup<br />
BackWPup 可以备份数据库，也可以备份 <a title="查看 WordPress 的全部文章" href="http://fhttian.info/archives/tag/wordpress" target="_blank">WordPress</a> 文件夹里面的文件，还可以优化数据表。备份的数据库会保存在博客所在服务器，同时也可以下载或者发送到邮箱，支持自动备份。<br />
地址：<a href="http://wordpress.org/extend/plugins/backwpup" target="_blank">http://wordpress.org/extend/plugins/backwpup</a><br />
4、DBC Backup<br />
DBC Backup 是把你的 WordPress  博客数据库备份到博客所在的服务器，你可以随时进行手动备份，也可以设定自动备份的时间；你可以选择自动删除所有的旧备份，也可以选择不删除或者删除多少 天之后的备份；你可以选择压缩备份文件，也可以选择不压缩文件。<br />
地址：<a href="http://wordpress.org/extend/plugins/dbc-backup/" target="_blank">http://wordpress.org/extend/plugins/dbc-backup/</a><br />
5、myEASYbackup<br />
myEASYbackup 的操作也很简单，安装并激活插件之后，就可以直接进行备份了，除了备份 WordPress 博客数据库之外，还可以备份  WordPress 的安装文件，备份文件会保存在你的服务器，但是你也可以在 WordPress  后台直接下载到你的电脑。该插件目前不支持自动备份。<br />
地址：<a href="http://wordpress.org/extend/plugins/myeasybackup/" target="_blank">http://wordpress.org/extend/plugins/myeasybackup/</a><br />
6、Online Backup for WordPress<br />
在使用 Online Backup for WordPress 之前，你需要先到插件开发者 BTE 那里注册，免费注册后你可以获得 50M  的存储空间，你可以把 WordPress  博客的数据库备份到那个空间，也可以把数据库下载到你的电脑或者备份到你的邮箱，可以设置自动备份时间，也可以马上进行手动备份。<br />
地址：<a href="http://wordpress.org/extend/plugins/wponlinebackup/" target="_blank">http://wordpress.org/extend/plugins/wponlinebackup/</a><br />
7、WordPress EZ Backup<br />
WordPress EZ Backup 可以把你 WordPress 博客的任意文件夹以及数据库备份到博客服务器上。除了手动备份，你也可以进行自动备份，不过 WordPress EZ Backup 需要设置的地方比较多。<br />
地址：<a href="http://wordpress.org/extend/plugins/wordpress-ez-backup/" target="_blank">http://wordpress.org/extend/plugins/wordpress-ez-backup/</a><br />
8、 Bei Fen<br />
Bei Fen 插件可以把你 WordPress 的文件以及/或者数据库备份到博客的服务器，你可以手动进行立即备份，也可以设定自动备份时间。备份数据库可以直接在 WordPress 后台删除或者恢复。<br />
地址：<a href="http://wordpress.org/extend/plugins/bei-fen/" target="_blank">http://wordpress.org/extend/plugins/bei-fen/</a><br />
9、 Remote Database Backup<br />
Remote Database Backup 插件可以说是 WordPress Database Backup 的简化，你可以直接在 WordPress 管理后台备份并下载数据库，但是不可以自动备份数据库，也不可以设置把备份的数据库发送到邮箱。<br />
地址：<a href="http://wordpress.org/extend/plugins/remote-database-backup/" target="_blank">http://wordpress.org/extend/plugins/remote-database-backup/</a><br />
10、 WP-DBManager<br />
WP-DBManager 的功能相当丰富，你可以把数据库备份到服务器、邮箱或者电脑硬盘，可以设置自动备份，可以修复、优化、清空甚至删除数据表，还可以删除或者还原备份到博客所在服务器的数据库。 </span></p>

---

[📚 返回目录](/needisme-mu-lu/)
