---
title: "UTF-8 GBK UTF8 GB2312 之间的区别和关系"
date: 2010-11-29 10:40:00
categories: NeedIsMe
tags: ["Windows", "Programmers", "编程"]
---

<p><span style="color:#888888;">UTF-8：Unicode TransformationFormat-8bit，允许含BOM，但通常不含BOM。是用以解决国际上字符的一种多字节编码，它对英文使用8位（即一个字节），中文使用24为（三个字节）来编码。UTF-8包含全世界所有国家需要用到的字符，是国际编码，通用性强。UTF-8编码的文字可以在各国支持UTF8字符集的浏览器上显示。如，如果是UTF8编码，则在外国人的英文IE上也能显示中文，他们无需下载IE的中文语言支持包。 </span>
<div><span style="color:#888888;">GBK是国家标准GB2312基础上扩容后兼容GB2312的标准。GBK的文字编码是用双字节来表示的，即不论中、英文字符均使用双字节来表示，为了区分中文，将其最高位都设定成1。GBK包含全部中文字符，是国家编码，通用性比UTF8差，不过UTF8占用的数据库比GBD大。 </span></p>
<p><span style="color:#888888;">GBK、GB2312等与UTF8之间都必须通过Unicode编码才能相互转换： </span></p>
<p><span style="color:#888888;">GBK、GB2312－－Unicode－－UTF8 </span></p>
<p><span style="color:#888888;">UTF8－－Unicode－－GBK、GB2312 </span></p>
<p><span style="color:#888888;">对于一个网站、论坛来说，如果英文字符较多，则建议使用UTF－8节省空间。不过现在很多论坛的插件一般只支持GBK。</span><br /><span style="color:#888888;">个编码的区别详细解释</span><br /><span style="color:#888888;">简单来说，unicode，gbk和大五码就是编码的值，而utf-8,uft-16之类就是这个值的表现形式．而前面那三种编码是一兼容的，同一个汉字，那三个码值是完全不一样的．如＂汉＂的uncode值与gbk就是不一样的，假设uncode为a040，gbk为b030，而uft-8码，就是把那个值表现的形式．utf-8码完全只针对uncode来组织的，如果ＧＢＫ要转ＵＴＦ－８必须先转uncode码，再转utf-8就ＯＫ了．</span></p>
<p><span style="color:#888888;">详细的就见下面转的这篇文章．</span></p>
<p><span style="color:#888888;">谈谈Unicode编码，简要解释UCS、UTF、BMP、BOM等名词</span><br /><span style="color:#888888;">这是一篇程序员写给程序员的趣味读物。所谓趣味是指可以比较轻松地了解一些原来不清楚的概念，增进知识，类似于打RPG游戏的升级。整理这篇文章的动机是两个问题：</span></p>
<p><span style="color:#888888;">问题一： </span><br /><span style="color:#888888;">使用Windows记事本的&ldquo;另存为&rdquo;，可以在GBK、Unicode、Unicode big endian和UTF-8这几种编码方式间相互转换。同样是txt文件，Windows是怎样识别编码方式的呢？</span></p>
<p><span style="color:#888888;">我很早前就发现Unicode、Unicode bigendian和UTF-8编码的txt文件的开头会多出几个字节，分别是FF、FE（Unicode）,FE、FF（Unicode bigendian）,EF、BB、BF（UTF-8）。但这些标记是基于什么标准呢？</span></p>
<p><span style="color:#888888;">问题二： </span><br /><span style="color:#888888;">最近在网上看到一个ConvertUTF.c，实现了UTF-32、UTF-16和UTF-8这三种编码方式的相互转换。对于Unicode(UCS2)、GBK、UTF-8这些编码方式，我原来就了解。但这个程序让我有些糊涂，想不起来UTF-16和UCS2有什么关系。 </span><br /><span style="color:#888888;">查了查相关资料，总算将这些问题弄清楚了，顺带也了解了一些Unicode的细节。写成一篇文章，送给有过类似疑问的朋友。本文在写作时尽量做到通俗易懂，但要求读者知道什么是字节，什么是十六进制。</span></p>
<p><span style="color:#888888;">0、big endian和little endian</span><br /><span style="color:#888888;">big endian和littleendian是CPU处理多字节数的不同方式。例如&ldquo;汉&rdquo;字的Unicode编码是6C49。那么写到文件里时，究竟是将6C写在前面，还是将49写在前面？如果将6C写在前面，就是big endian。如果将49写在前面，就是little endian。</span></p>
<p><span style="color:#888888;">&ldquo;endian&rdquo;这个词出自《格列佛游记》。小人国的内战就源于吃鸡蛋时是究竟从大头(Big-Endian)敲开还是从小头(Little-Endian)敲开，由此曾发生过六次叛乱，一个皇帝送了命，另一个丢了王位。</span></p>
<p><span style="color:#888888;">我们一般将endian翻译成&ldquo;字节序&rdquo;，将big endian和little endian称作&ldquo;大尾&rdquo;和&ldquo;小尾&rdquo;。</span></p>
<p><span style="color:#888888;">1、字符编码、内码，顺带介绍汉字编码</span><br /><span style="color:#888888;">字符必须编码后才能被计算机处理。计算机使用的缺省编码方式就是计算机的内码。早期的计算机使用7位的ASCII编码，为了处理汉字，程序员设计了用于简体中文的GB2312和用于繁体中文的big5。</span></p>
<p><span style="color:#888888;">GB2312(1980年)一共收录了7445个字符，包括6763个汉字和682个其它符号。汉字区的内码范围高字节从B0-F7，低字节从A1-FE，占用的码位是72*94=6768。其中有5个空位是D7FA-D7FE。</span></p>
<p><span style="color:#888888;">GB2312支持的汉字太少。1995年的汉字扩展规范GBK1.0收录了21886个符号，它分为汉字区和图形符号区。汉字区包括21003个字符。</span></p>
<p><span style="color:#888888;">从ASCII、GB2312到GBK，这些编码方法是向下兼容的，即同一个字符在这些方案中总是有相同的编码，后面的标准支持更多的字符。在这些编码中，英文和中文可以统一地处理。区分中文编码的方法是高字节的最高位不为0。按照程序员的称呼，GB2312、GBK都属于双字节字符集 (DBCS)。</span></p>
<p><span style="color:#888888;">2000年的GB18030是取代GBK1.0的正式国家标准。该标准收录了27484个汉字，同时还收录了藏文、蒙文、维吾尔文等主要的少数民族文字。从汉字字汇上说，GB18030在GB13000.1的20902个汉字的基础上增加了CJK扩展A的6582个汉字（Unicode码0x3400-0x4db5），一共收录了27484个汉字。</span></p>
<p><span style="color:#888888;">CJK就是中日韩的意思。Unicode为了节省码位，将中日韩三国语言中的文字统一编码。GB13000.1就是ISO/IEC 10646-1的中文版，相当于Unicode 1.1。</span></p>
<p><span style="color:#888888;">GB18030的编码采用单字节、双字节和4字节方案。其中单字节、双字节和GBK是完全兼容的。4字节编码的码位就是收录了CJK扩展A的6582个汉字。例如：UCS的0x3400在GB18030中的编码应该是8139EF30，UCS的0x3401在GB18030中的编码应该是8139EF31。</span></p>
<p><span style="color:#888888;">微软提供了GB18030的升级包，但这个升级包只是提供了一套支持CJK扩展A的6582个汉字的新字体：新宋体-18030，并不改变内码。Windows 的内码仍然是GBK。</span></p>
<p><span style="color:#888888;">这里还有一些细节：</span></p>
<p><span style="color:#888888;">GB2312的原文还是区位码，从区位码到内码，需要在高字节和低字节上分别加上A0。</span></p>
<p><span style="color:#888888;">对于任何字符编码，编码单元的顺序是由编码方案指定的，与endian无关。例如GBK的编码单元是字节，用两个字节表示一个汉字。这两个字节的顺序是固定的，不受CPU字节序的影响。UTF-16的编码单元是word（双字节），word之间的顺序是编码方案指定的，word内部的字节排列才会受到endian的影响。后面还会介绍UTF-16。</span></p>
<p><span style="color:#888888;">GB2312的两个字节的最高位都是1。但符合这个条件的码位只有128*128=16384个。所以GBK和GB18030的低字节最高位都可能不是1。不过这不影响DBCS字符流的解析：在读取DBCS字符流时，只要遇到高位为1的字节，就可以将下两个字节作为一个双字节编</p>

---

[📚 返回目录](/needisme-mu-lu/)
