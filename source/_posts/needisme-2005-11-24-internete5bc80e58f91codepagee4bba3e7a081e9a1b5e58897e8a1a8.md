---
title: "[Internet开发]CODEPAGE代码页列表"
date: 2005-11-24 14:09:28
categories: NeedIsMe
tags: ["HTML", "CSS", "HTML/CSS", "前端", ".NET"]
---

<div id="msgcns!A634C4CD7A14B666!263" class="bvMsg">
<div>
<p>CODEPAGE<br />
可以使用 @CODEPAGE 指令为 .asp 文件设置代码页。代码页是一个字符集，包括数字、标点符号及其他字符。不同的语言和现场<br />
用不同的代码页。例如，ANSI 代码页 1252 为美国英语和大多欧洲语言所使用，而 OEM 代码页 932 为日本汉字所使用。</p>
<p>代码页可表示为一个字符到单字节值或多字节值的映射表。许多代码页都共享在 0x00-0x7F 之间的 ASCII 字符集。</p>
<p>可以通过 Session.CodePage 属性忽略由 @CODEPAGE 指令设置的代码页。但是，这样做的结果只适用于在会话作用域中运行的脚<br />
本。</p>
<p>语法<br />
<%@ CODEPAGE=codepage%></p>
<p>参数<br />
codepage<br />
无符号整数，代表正在运行 ASP 脚本引擎的系统的有效代码页</p>
<p>Conversion between any of the following codepages is provided.</p>
<p>37 (=x0025) EBCDIC US English<br />
273 (=x0111) EBCDIC German<br />
277 (=x0115) EBCDIC Danish/Norwegian<br />
278 (=x0116) EBCDIC Finnish/Swedish<br />
280 (=x0118) EBCDIC Italian<br />
284 (=x011C) EBCDIC Spanish<br />
285 (=x011D) EBCDIC UK English<br />
297 (=x0129) EBCDIC French<br />
300 (=x012C) EBCDIC Japanese DBCS<br />
301 (=x012D) Japanese PC DBCS<br />
420 (=x01A4) EBCDIC Arabic<br />
424 (=x01A8) EBCDIC Arabic<br />
437 (=x01B5) PC-ASCII US<br />
500 (=x01F4) EBCDIC International<br />
803 (=x0323) Hebrew Set A<br />
813 (=x032D) ISO8859-7 Greek<br />
819 (=x0333) ISO8859-1 Western European<br />
833 (=x0341) IBM-833: Korean<br />
834 (=x0342) IBM-834: Korean Host DBCS<br />
835 (=x0343) EBCDIC Traditional Chinese DBCS<br />
836 (=x0344) EBCDIC Simplified Chinese SBCS<br />
838 (=x0346) EBCDIC Thai SBCS<br />
850 (=x0352) ISO8859-1 Western European<br />
852 (=x0354) PC-ASCII Eastern European<br />
855 (=x0357) PC-ASCII Cyrillic<br />
856 (=x0358) PC-ASCII Hebrew<br />
857 (=x0359) PC-ASCII Turkish<br />
858 (=x035A) PC-ASCII Western European with Euro<br />
860 (=x035C) PC-ASCII Portuguese<br />
861 (=x035D) PC-ASCII Icelandic<br />
862 (=x035E) PC-ASCII Hebrew<br />
863 (=x035F) PC-ASCII Canadian French<br />
864 (=x0360) PC-ASCII Arabic<br />
865 (=x0361) PC-ASCII Scandinavian<br />
866 (=x0362) PC-ASCII Cyrillic #2<br />
868 (=x0364) PC-ASCII Urdu<br />
869 (=x0365) PC-ASCII Greek<br />
870 (=x0366) EBCDIC Eastern Europe<br />
871 (=x0367) EBCDIC Icelandic<br />
872 (=x0368) PC-ASCII Cyrillic with Euro<br />
874 (=x036A) PC-ASCII Thai SBCS<br />
875 (=x036B) EBCDIC Greek<br />
880 (=x0370) EBCDIC Cyrillic<br />
891 (=x037B) IBM-891: Korean<br />
897 (=x0381) PC-ASCII Japan Data SBCS<br />
903 (=x0387) PC Simplified Chinese SBCS<br />
904 (=x0388) PC Traditional Chinese Data - SBCS<br />
912 (=x0390) ISO8859-2 Eastern European<br />
915 (=x0393) ISO8859-5 Cyrillic<br />
916 (=x0394) ISO8859-8 Hebrew<br />
918 (=x0396) EBCDIC Urdu<br />
920 (=x0398) ISO8859-9 Turkish<br />
921 (=x0399) ISO Baltic<br />
922 (=x039A) ISO Estonian<br />
923 (=x039B) ISO8859-15 Western Europe with euro (Latin 9)<br />
924 (=x039C) EBCDIC Western Europe with euro<br />
927 (=x039F) PC Traditional Chinese DBCS<br />
928 (=x03A0) PC Simplified Chinese DBCS<br />
930 (=x03A2) EBCDIC Japanese Katakana/Kanji mixed<br />
932 (=x03A4) Japanese OS/2<br />
933 (=x03A5) EBCDIC Korean Mixed<br />
935 (=x03A7) EBCDIC Simplified Chinese Mixed<br />
937 (=x03A9) EBCDIC Traditional Chinese Mixed<br />
939 (=x03AB) EBCDIC Japanese Latin/Kanji mixed<br />
941 (=x03AD) Japanese PC DBCS - for open systems<br />
942 (=x03AE) Japanese PC Data Mixed - extended SBCS<br />
943 (=x03AF) Japanese PC Mixed - for open systems<br />
944 (=x03BO) Korean PC data Mixed - extended SBCS<br />
946 (=x03B2) Simplified Chinese PC data Mixed - extended SBCS<br />
947 (=x03B3) PC Traditional Chinese DBCS<br />
948 (=x03B4) PC Traditional Chinese Mixed - extended SBCS<br />
949 (=x03B5) PC Korean Mixed - KS code<br />
950 (=x03B6) PC Traditional Chinese Mixed - big5<br />
951 (=x03B7) PC Korean DBCS - KS code<br />
970 (=x03CA) euc Korean<br />
1004 (=x03EC) PC Data Latin1<br />
1006 (=x03EE) ISO Urdu<br />
1008 (=x03F0) ASCII Arabic 8-bit ISO<br />
1025 (=x0401) EBCDIC Cyrillic<br />
1026 (=x0402) EBCDIC Turkish<br />
1027 (=x0403) EBCDIC Japanese Latin<br />
1040 (=x0410) IBM-1040: Korean<br />
1041 (=x0411) Japanese PC - extended SBCS<br />
1042 (=x0412) PC Simplified Chinese - extended SBCS<br />
1043 (=x0413) PC Traditional Chinese - extended SBCS<br />
1046 (=x0416) PC-ASCII Arabic<br />
1047 (=x0417) IBM-1047: Western European<br />
1051 (=x041B) ASCII roman8 for HP Western European<br />
1088 (=x0440) PC Korean SBCS - KS code<br />
1089 (=x0441) ISO8859-6 Arabic<br />
1097 (=x0449) EBCDIC Farsi<br />
1098 (=x044A) PC-ASCII Farsi<br />
1112 (=x0458) EBCDIC Baltic (Latvian/Lithuanian)<br />
1114 (=x045A) PC Traditional Chinese - big 5 SBCS<br />
1115 (=x045B) PC Simplified Chinese SBCS<br />
1122 (=x0462) EBCDIC Estonian<br />
1123 (=x0463) EBCDIC Ukrainian<br />
1124 (=x0464) UNIX-ASCII Ukrainian<br />
1131 (=x046B) PC-ASCII Belarus<br />
1140 (=x0474) EBCDIC USA, with euro (like 037)<br />
1141 (=x0475) EBCDIC Austria, Germany, with euro (like 273)<br />
1142 (=x0476) EBCDIC Denmark, Norway, with euro (like 277)<br />
1143 (=x0477) EBCDIC Finland, Sweden, with euro (like 278)<br />
1144 (=x0478) EBCDIC Italy, with euro (like 280)<br />
1145 (=x0479) EBCDIC Spain, with euro (like 284)<br />
1146 (=x047A) EBCDIC UK, with euro (like 285)<br />
1147 (=x047B) EBCDIC France, with euro (like 297)<br />
1148 (=x047C) EBCDIC International, with euro (like 500)<br />
1149 (=x047D) EBCDIC Iceland, with euro (like 871)<br />
1200 (=x04B0) Unicode - UCS-2<br />
1208 (=x04B8) Unicode - UTF-8<br />
1250 (=x04E2) Windows - Eastern European<br />
1251 (=x04E3) Windows - Cyrillic<br />
1252 (=x04E4) Windows - Western European<br />
1253 (=x04E5) Windows - Greek<br />
1254 (=x04E6) Windows - Turkish<br />
1255 (=x04E7) Windows - Hebrew<br />
1256 (=x04E8) Windows - Arabic<br />
1257 (=x04E9) Windows - Baltic Rim<br />
1275 (=x04FB) Apple - Western European<br />
1280 (=x0500) Apple - Greek<br />
1281 (=x0501) Apple - Turkish<br />
1282 (=x0502) Apple - Eastern European<br />
1283 (=x0503) Apple - Cyrillic<br />
1284 (=x0504) IBM-504: Eastern European<br />
1285 (=x0505) IBM-505: Eastern European<br />
1363 (=x0553) Windows Korean PC Mixed including 11,172 full hangul<br />
1364 (=x0554) Korean Host Mixed extended including 11,172 full hangul<br />
1380 (=x0564) PC Simplified Chinese DBCS<br />
1381 (=x0565) PC Simplified Chinese Mixed<br />
1383 (=x0567) euc Simplified Chinese Mixed<br />
1386 (=x056A) PC Simplified Chinese Data GBK Mixed<br />
1388 (=x056C) DBCS Host Simplified Chinese Data GBK Mixed<br />
5346 (=x14E2) Windows-Eastern European with Euro (like 1250)<br />
5347 (=x14E3) Windows - Cyrillic with Euro (like 1251)<br />
5348 (=x14E4) Windows-Western European with Euro (like 1252)<br />
5349 (=x14E5) Windows-Windows - Greek with Euro (like 1253)<br />
5350 (=x14E6) Windows - Turkish with Euro (like 1254)<br />
5351 (=x14E7) Windows - Hebrew with Euro (like 1255)<br />
5352 (=x14E8) Windows - Arabic with Euro (like 1256)<br />
5353 (=x14E9) Windows - Baltic Rim with Euro (like 1257)<br />
5354 (=x14EA) Windows - Vietnamese with Euro (like 1258)</p>
</div>
</div>

---

[📚 返回目录](/needisme-mu-lu/)
