---
title: "Ubuntu系统清理"
date: 2011-01-19 09:29:07
categories: NeedIsMe
tags: ["Ubuntu", "Linux"]
---

<p>1.删除 Residual Config package（未安装的残存配置）文件。</p>
<p>打开系统－系统管理－新立得软件包管理器，点击左下角的&ldquo;状态&rdquo;，点击&ldquo;未安装的残存配置&rdquo;（如果没有这一项，恭喜你，你的系统比较干净，看2.吧），右键点击项目勾选 &ldquo;标记以便彻底删除&rdquo;，点击上面的&ldquo;应用&rdquo;按钮即可。</p>
<p>2.删除不完整的软件包。打开终端，输入</p>
<p>sudo apt-get autoclean</p>
<p>这个命令会删除所有不完整（下载没完成）的软件包。</p>
<p>3.删除系统中不用的多语言支持。在新立得里搜索 localepurge 勾选并安装。</p>
<p>安装后直接出现语言选择面板，选择所有需要的语言即可，我选择的是英文和中文。</p>
<p>en</p>
<p>zh</p>
<p>zh_CN</p>
<p>zh_CN.GB18030</p>
<p>zh_CN.GB2312</p>
<p>zh_CN.GBK</p>
<p>zh_CN.UTF-8</p>
<p>zh_HK</p>
<p>zh_HK.UTF-8</p>
<p>zh_TW</p>
<p>zh_TW.Big5</p>
<p>zh_TW.EUC-TW</p>
<p>zh_TW.UTF-8</p>
<p>清理后，显示释放了十几M空间。终端运行</p>
<p>gedit /etc/locale.nopurge</p>
<p>可以查看 localepurge 的配置文件。</p>
<p>注意：别删错了。不过这个 wizard 做的不太好，我不能肯定选中的是 被删除的？还是要留下的？&mdash;&mdash;选中的是留下的。不知道删错了会怎样？中文都是方块？</p>
<p>4.删除孤立的库文件。新立得搜索安装 deborphan。</p>
<p>sudo deborphan</p>
<p>查看孤立（没有依赖关系）库文件。运行下面命令删除它们</p>
<p>sudo deborphan | xargs sudo apt-get -y remove &ndash;purge</p>
<p>但我在搜索 deborphan的时候发现了gtkorpha，这是个图形界面的孤立包删除工具，很不错。</p>
<p>我用 deborphan 删除后还是留下了两个</p>
<p>sudo deborphan</p>
<p>libsmpeg0</p>
<p>liblame0</p>
<p>用 这个 gtkorphan 再次选择并删除，成功删掉。个人推荐使用 gtkorphan。</p>
<p>5.建立新立得过滤器。打开新立得 －设置 － 过滤器</p>
<p>以后，在新立得左下角的&ldquo;自定义&rdquo;可迅速定位 orphaned 文件包。</p>

---

[📚 返回目录](/needisme-mu-lu/)
