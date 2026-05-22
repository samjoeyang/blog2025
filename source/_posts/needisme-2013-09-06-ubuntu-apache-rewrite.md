---
title: "ubuntu apache rewrite"
date: 2013-09-06 14:43:03
categories: NeedIsMe
tags: ["Vim", "Ubuntu", "Linux", "Apache"]
---

<div id="cnblogs_post_body">
<p>解决方法一</p>
<p>需要通过命令，或者自己重新创建个软连接才可以。<br />
命令是：sudo a2enmod rewrite<br />
软连接是：sudo ln -s /etc/apache2/mods-available/rewrite.load /etc/apache2/mods-enabled/rewrite.load</p>
<p>因为Ubuntu下，Apache的配置文件及目录结构不大一样，所以mods-avalilable下的是可用的模块，而真正启用了的模块是在mods-enable目录底下的。所以自己创建软连接也可以实现启用rewrite模块。</p>
<p>除了启用rewrite外，还有地方需要修改的，如果你的站点只有一个，那修改/etc/apache2/sites-available/default这个文件就可以</p>
<p><Directory /><br />
Options FollowSymLinks<br />
AllowOverride None（修改为AllowOverride All）<br />
</Directory><br />
<Directory "/var/orioner"><br />
Options Indexes FollowSymLinks MultiViews<br />
AllowOverride None（修改为AllowOverride All）<br />
Order allow,deny<br />
allow from all<br />
</Directory><br />
其实网上其它地方贴出来的解决办法是吧Options FollowSymlinks的给改了就行了。其实不行，还要把Options Indexes FollowSymLinks MultiViews的也给改了才可以。</p>
<p>&nbsp;</p>
<p>==============================================================================</p>
<p>解决方法二</p>
<p>在终端中执行</p>
<p>sudo a2enmod rewrite</p>
<p>指令后，即启用了 Mod_rewrite 模块。</p>
<p>另外，也可以通过将 /etc/apache2/mods-available/rewrite.load 连接到 /etc/apache2/mods-enabled/rewrite.load 来打开 Mod_rewrite 模块。用指令操作就是：</p>
<p>sudo ln -s /etc/apache2/mods-available/rewrite.load /etc/apache2/mods-enabled/rewrite.load</p>
<p>一点小提示</p>
<p>事实上，当我在 Ubuntu 中采用上述做法并重启了 Apache 服务后，仍然无法正常 rewrite 网址。这里，还有一点需要注意的地方：</p>
<p>sudo vim /etc/apache2/sites-enabled/000-default</p>
<p>将其中的：</p>
<p>AllowOverride None</p>
<p>修改为：</p>
<p>AllowOverride All</p>
<p>上面的 /etc/apache2/sites-enabled/000-default 实则为 /etc/apache2/sites-available/default 的连接。而 AllowwOverride None 则会完全忽略 .htaccess 文件，自然其中所定义的 rewrite 规则也就不能生效了。</p>
<p>最后，别忘了使用下列指令来重启 Apache:</p>
<p>sudo /etc/init.d/apache2 restart.</p>
</div>

---

[📚 返回目录](/needisme-mu-lu/)
