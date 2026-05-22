---
title: "HTML中Codepage的定义和历史"
date: 2005-11-24 14:16:26
categories: NeedIsMe
tags: ["HTML", "CSS", "Linux", "HTML/CSS", "前端"]
---

<div id="msgcns!A634C4CD7A14B666!264" class="bvMsg">
<p>字符内码(charcter code)指的是用来代表字符的内码.读者在输入和存储文档时都要使用内码,内码分为</p>
<p>单字节内码 -- Single-Byte character sets (SBCS),可以支持256个字符编码.<br />
双字节内码 -- Double-Byte character sets)(DBCS),可以支持65000个字符编码.主要用来对大字符集的东方文字进行编码.<br />
codepage 指的是一个经过挑选的以特定顺序排列的字符内码列表,对于早期的单字节内码的语种,codepage中的内码顺序使得系统可以按照此列表来根据键盘的输入值给出一个对应的内码.对于双字节内码,则给出的是MultiByte到Unicode的对应表,这样就可以把以Unicode形式存放的字符转化为相应的字符内码,或者反之,在Linux核心中对应的函数就是utf8_mbtowc和utf8_wctomb.<br />
在1980年前,仍然没有任何国际标准如ISO-8859或Unicode来定义如何扩展US-ASCII编码以便非英语国家的用户使用.很多IT厂商发明了他们自己的编码,并且使用了难以记忆的数目来标识:</p>
<p>例如936代表简体中文. 950代表繁体中文.</p>
<p>1.1 CJK Codepage<br />
同 Extended Unix Coding ( EUC )编码大不一样的是,下面所有的远东 codepage 都利用了C1控制码 { =80..=9F } 做为首字节, 使用ASCII值 { =40..=7E { 做为第二字节,这样才能包含多达数万个双字节字符,这表明在这种编码之中小于3F的ASCII值不一定代表ASCII字符.</p>
<p>CP932</p>
<p>Shift-JIS包含日本语 charset JIS X 0201 (每个字符一个字节) 和 JIS X 0208 (每个字符两个字节),所以 JIS X 0201平假名包含一个字节半宽的字符,其剩馀的60个字节被用做7076个汉字以及648个其他全宽字符的首字节.同EUC-JP编码区别的是,Shift-JIS没有包含JIS X 202中定义的5802个汉字.</p>
<p>CP936</p>
<p>GBK 扩展了 EUC-CN 编码( GB 2312-80编码,包含 6763 个汉字)到Unicode (GB13000.1-93)中定义的20902个汉字,中国大陆使用的是简体中文zh_CN.</p>
<p>CP949</p>
<p>UnifiedHangul (UHC) 是韩文 EUC-KR 编码(KS C 5601-1992 编码,包括2350 韩文音节和 4888 个汉字a)的超集,包含 8822个附加的韩文音节( 在C1中 )</p>
<p>CP950</p>
<p>是代替EUC-TW (CNS 11643-1992)的 Big5 编码(13072 繁体 zh_TW 中文字) 繁体中文,这些定义都在Ken Lunde的 CJK.INF中或者 Unicode 编码表中找到.</p>
<p>注意: Microsoft采用以上四种Codepage,因此要访问Microsoft的文件系统时必需采用上面的Codepage .</p>
<p>1.2 IBM的远东语言Codepage<br />
IBM的Codepage分为SBCS和DBCS两种:</p>
<p>IBM SBCS Codepage</p>
<p>37 (英文) *<br />
290 (日文) *<br />
833 (韩文) *<br />
836 (简体中文) *<br />
891 (韩文)<br />
897 (日文)<br />
903 (简体中文)<br />
904 (繁体中文)<br />
IBM DBCS Codepage</p>
<p>300 (日文) *<br />
301 (日文)<br />
834 (韩文) *<br />
835 (繁体中文) *<br />
837 (简体中文) *<br />
926 (韩文)<br />
927 (繁体中文)<br />
928 (简体中文)<br />
将SBCS的Codepage和DBCS的Codepage混合起来就成为: IBM MBCS Codepage</p>
<p>930 (日文) (Codepage 300 加 290) *<br />
932 (日文) (Codepage 301 加 897)<br />
933 (韩文) (Codepage 834 加 833) *<br />
934 (韩文) (Codepage 926 加 891)<br />
938 (繁体中文) (Codepage 927 加 904)<br />
936 (简体中文) (Codepage 928 加 903)<br />
5031 (简体中文) (Codepage 837 加 836) *<br />
5033 (繁体中文) (Codepage 835 加 37) *<br />
*代表采用EBCDIC编码格式</p>
</div>

---

[📚 返回目录](/needisme-mu-lu/)
