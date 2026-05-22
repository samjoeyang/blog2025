---
title: "为什么有的身份证后面是字母，怎么看懂身份证呀?"
date: 2005-12-02 08:42:09
categories: NeedIsMe
tags: ["CSS", "HTML", "HTML/CSS", "前端"]
---

<p>大陆的身份证为18位，老的身份证是15位。<br />
关于身份证第18是怎么计算的，原理如下：根据〖中华人民共和国国家标准 GB 11643-1999〗中有关公民身份号码的规定，公民身份号码是特征组合码，由十七位数字本体码和一位数字校验码组成。排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。<br />
地址码（身份证前六位）表示编码对象常住户口所在县(市、旗、区)的行政区划代码。（所有区域的编码可以到这个网站<a href="http://www.stats.gov.cn/tjbz/index.htm" target="_blank">http://www.stats.gov.cn/tjbz/index.htm</a><br />
查询到最新的县及县以上的行政编码资料。）<br />
生日期码（身份证第七位到第十四位）表示编码对象出生的年、月、日，其中年份用四位数字表示，年、月、日之间不用分隔符。例如：1981年05月11日就用19810511表示。<br />
顺序码（身份证第十五位到十七位）为同一地址码所标识的区域范围内，对同年、月、日出生的人员编定的顺序号。其中第十七位奇数分给男性，偶数分给女性。<br />
校验码（身份证最后一位）是根据前面十七位数字码，按照ISO 7064:1983.MOD 11-2校验码计算出来的检验码。</p>
<p>第十八位数字的计算方法为：<br />
1.将前面的身份证号码17位数分别乘以不同的系数。从第一位到第十七位的系数分别为：7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2<br />
2.将这17位数字和系数相乘的结果相加。<br />
3.用加出来和除以11，看余数是多少？<br />
4余数只可能有0 1 2 3 4 5 6 7 8 9 10这11个数字。其分别对应的最后一位身份证的号码为1 0 X 9 8 7 6 5 4 3 2。<br />
5.通过上面得知如果余数是2，就会在身份证的第18位数字上出现罗马数字的Ⅹ。如果余数是10，身份证的最后一位号码就是2。</p>
<p>例如：某男性的身份证号码是34052419800101001X。我们要看看这个身份证是不是合法的身份证。<br />
首先：我们得出，前17位的乘积和是189<br />
然后：用189除以11得出的结果是17 + 2/11，也就是说余数是2。<br />
最后：通过对应规则就可以知道余数2对应的数字是x。所以，这是一个合格的身份证号码。</p>
<p>&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;<br />
备注说明：关于大陆身份证有的人会发现前几位为什么变化了。这主要出现在中国的重庆。原有的重庆人的身份证多数以51开头。以前隶属于四川的原因。但新办的身份证可能是50开头，原因是行政区划改变所致。中国各地的行政区划代码请参考国家统计局网站<a href="http://www.stats.gov.cn/tjbz/index.htm" target="_blank">http://www.stats.gov.cn/tjbz/index.htm</a><br />
参考资料：<a href="http://spaces.msn.com/members/kinworld" target="_blank">http://spaces.msn.com/members/kinworld</a></p>
<p><html><br />
<head><br />
<meta http-equiv="Content-Type" content="text/html; charset=gb2312"><br />
<title>身份证查询</title><br />
< script><br />
function checkCard()<br />
{<br />
if(document.cardForm.strCard.value == "")<br />
{<br />
alert("请输入你的身份证号码");<br />
return false;<br />
}<br />
var filter=/^s*[xX0-9]{15,18}s*$/;<br />
if (!filter.test(document.cardForm.strCard.value))<br />
{<br />
alert("可使用的字符为（0-9,x,X)长度不小于15个字符，不超过18个字符。");<br />
return false;<br />
}<br />
//可使用的字符为（0-9,xX)长度不小于15个字符，不超过18个字符。<br />
this.cardForm.submit();<br />
}<br />
< /script><br />
</head></p>
<p><body><br />
<%<br />
dim strCard2,action<br />
strCard2 = Trim(Request("strCard"))</p>
<p>action = Trim(Request("action"))<br />
if action = "save" then<br />
if len(strCard2) <> 18 then<br />
response.write "<script>"<br />
response.write " alert('暂时只支持身份证号码为18位的查询');"<br />
response.write " history.go(-1);"<br />
response.write "</script>"<br />
end if<br />
response.write "你输入的身份证号码："&amp;strCard2 &amp; ""<br />
response.write "(暂时只支持身份证号码为18位的查询)<br>"<br />
int cardLength<br />
cardLength = len("strCard2")<br />
dim card(9)<br />
card(0) = left(strCard2,2)'省份<br />
card(1) = mid(strCard2,3,6)'具体城市<br />
card(2) = mid(strCard2,7,4)'出生年份<br />
card(3) = mid(strCard2,11,2)'出生月份<br />
card(4) = mid(strCard2,13,2)'出生哪天<br />
card(5) = mid(strCard2,15,3)'随机数<br />
card(6) = mid(strCard2,17,1)'男性/女性<br />
card(7) = right(strCard2,1)'验证码<br />
dim strProvince<br />
select case(card(0))<br />
case 11 strProvince = "北京"<br />
case 12 strProvince = "天津"<br />
case 13 strProvince = "河北"<br />
case 14 strProvince = "山西"<br />
case 15 strProvince = "内蒙古"<br />
case 21 strProvince = "辽宁"<br />
case 22 strProvince = "吉林"<br />
case 23 strProvince = "黑龙江"<br />
case 31 strProvince = "上海"<br />
case 32 strProvince = "江苏"<br />
case 33 strProvince = "浙江"<br />
case 34 strProvince = "安徽"<br />
case 35 strProvince = "福建"<br />
case 36 strProvince = "江西"<br />
case 37 strProvince = "山东"<br />
case 41 strProvince = "河南"<br />
case 42 strProvince = "湖北"<br />
case 43 strProvince = "湖南"<br />
case 44 strProvince = "广东"<br />
case 45 strProvince = "广西"<br />
case 46 strProvince = "海南"<br />
case 50 strProvince = "重庆"<br />
case 51 strProvince = "四川"<br />
case 52 strProvince = "贵州"<br />
case 53 strProvince = "云南"<br />
case 54 strProvince = "西藏"<br />
case 62 strProvince = "陕西"<br />
case 64 strProvince = "青海"<br />
case 65 strProvince = "新疆"<br />
case 71 strProvince = "台湾"<br />
case 81 strProvince = "香港"<br />
case 82 strProvince = "澳门"<br />
case 91 strProvince = "国外"<br />
case else strProvince = "哈哈，恭喜你发现了新大陆啦！"<br />
End Select<br />
dim randomIsRight,randomNums<br />
randomIsRight = false<br />
randomNums = 0</p>
<p>for i = 1 to len(strCard2)<br />
randomNums = randomNums + cint(mid(strCard2,i,1)) * cint(getCoefficient(i))<br />
'response.write cint(mid(strCard2,i,1)) &amp;" " &amp; cint(getCoefficient(i)) &amp;" " &amp; randomNums &amp; "<br>"<br />
Next<br />
dim dividedNums,lastIdentifyingNum<br />
'response.write randomNums<br />
dividedNums = randomNums mod 11<br />
'response.write "******" &amp; dividedNums</p>
<p>'余数只可能有0 1 2 3 4 5 6 7 8 9 10这11个数字。其分别对应的最后一位身份证的号码为1 0 X 9 8 7 6 5 4 3 2。<br />
select case dividedNums<br />
case 0 lastIdentifyingNum = "1"<br />
case 1 lastIdentifyingNum = "0"<br />
case 2 lastIdentifyingNum = "X"<br />
case 3 lastIdentifyingNum = "9"<br />
case 4 lastIdentifyingNum = "8"<br />
case 5 lastIdentifyingNum = "7"<br />
case 6 lastIdentifyingNum = "6"<br />
case 7 lastIdentifyingNum = "5"<br />
case 8 lastIdentifyingNum = "4"<br />
case 9 lastIdentifyingNum = "3"<br />
case 10 lastIdentifyingNum = "2"<br />
case else lastIdentifyingNum = ""<br />
end select<br />
'response.write "-----------"<br />
'response.write lastIdentifyingNum &amp; "---"<br />
'response.write card(7)<br />
if lastIdentifyingNum = cstr(card(7)) then<br />
response.write "<br>身份证号码正确！"<br />
else<br />
response.write "<br>身份证号码不正确，正确的为 "&amp; left(strCard2,17) &amp; lastIdentifyingNum &amp; "<br>"<br />
end if</p>
<p>if card(6) mod 2 = 0 then<br />
response.write "女性 "<br />
else<br />
response.write "男性 "<br />
end if</p>
<p>Response.Write "出生地："&amp;strProvince&amp; " "<br />
Response.Write "出生年月："&amp;card(2)&amp;"年"&amp;card(3)&amp;"月"&amp;card(4)&amp;"日"<br />
'for i = 0 to cardLength</p>
<p>'Next<br />
end if<br />
'7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2<br />
Function getCoefficient(intNums)<br />
select case(intNums)<br />
case 1 getCoefficient = 7<br />
case 2 getCoefficient = 9<br />
case 3 getCoefficient = 10<br />
case 4 getCoefficient = 5<br />
case 5 getCoefficient = 8<br />
case 6 getCoefficient = 4<br />
case 7 getCoefficient = 2<br />
case 8 getCoefficient = 1<br />
case 9 getCoefficient = 6<br />
case 10 getCoefficient = 3<br />
case 11 getCoefficient = 7<br />
case 12 getCoefficient = 9<br />
case 13 getCoefficient = 10<br />
case 14 getCoefficient = 5<br />
case 15 getCoefficient = 8<br />
case 16 getCoefficient = 4<br />
case 17 getCoefficient = 2<br />
case else getCoefficient = 0<br />
end select<br />
End Function<br />
%></p>
<form name="cardForm" method="post" action="?action=save">
<input name="strCard" type="text" size="15" maxlength="18"><br />
<input type="button" name="Submit" value="查&nbsp;&nbsp;询" onClick="return checkCard();"><br />
</form>
<p></body><br />
</html></p>

---

[📚 返回目录](/needisme-mu-lu/)
