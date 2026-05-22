---
title: "ASP函数详解"
date: 2005-04-30 04:42:08
categories: NeedIsMe
tags: ["Programmers", "编程"]
---

<div id="msgcns!A634C4CD7A14B666!111" class="bvMsg">Array()<br />
FUNCTION: 返回一个数组<br />
SYNTAX: Array(list)<br />
ARGUMENTS: 字符，数字均可<br />
EXAMPLE: <%<br />
Dim myArray()<br />
For i = 1 to 7<br />
Redim Preserve myArray(i)<br />
myArray(i) = WeekdayName(i)<br />
Next<br />
%[/IMG]<br />
RESULT: 建立了一个包含7个元素的数组myArray<br />
myArray("Sunday","Monday", ... ... "Saturday")</p>
<p><!-- more -->CInt()<br />
FUNCTION: 将一个表达式转化为数字类型<br />
SYNTAX: CInt(expression)<br />
ARGUMENTS: 任何有效的字符均可<br />
EXAMPLE: <%<br />
f = "234"<br />
response.write cINT(f) + 2<br />
%[/IMG]<br />
RESULT: 236<br />
转化字符"234"为数字"234"，如果字符串为空，则返回0值</p>
<p>CreateObject()<br />
FUNCTION: 建立和返回一个已注册的ACTIVEX组件的实例。<br />
SYNTAX: CreateObject(objName)<br />
ARGUMENTS: objName 是任何一个有效、已注册的ACTIVEX组件的名字.<br />
EXAMPLE: <%<br />
Set con = Server.CreateObject("ADODB.Connection")<br />
%[/IMG]<br />
RESULT:</p>
<p>CStr()<br />
FUNCTION: 转化一个表达式为字符串.<br />
SYNTAX: CStr(expression)<br />
ARGUMENTS: expression 是任何有效的表达式。<br />
EXAMPLE: <%<br />
s = 3 + 2<br />
response.write "The result is: " &amp; cStr(s)<br />
%[/IMG]<br />
RESULT: 转化数字&ldquo;5&rdquo;为字符&ldquo;5&rdquo;。</p>
<p>Date()<br />
FUNCTION: 返回当前系统日期.<br />
SYNTAX: Date()<br />
ARGUMENTS: None.<br />
EXAMPLE: <%=Date%[/IMG]<br />
RESULT: 8/4/99</p>
<p>DateAdd()<br />
FUNCTION: 返回一个被改变了的日期。<br />
SYNTAX: DateAdd(timeinterval,number,date)<br />
ARGUMENTS: timeinterval is the time interval to add; number is amount of time intervals to add; and date is the starting date.<br />
EXAMPLE: <%<br />
currentDate = #8/4/99#<br />
newDate = DateAdd("m",3,currentDate)<br />
response.write newDate<br />
%[/IMG]</p>
<p><%<br />
currentDate = #12:34:45 PM#<br />
newDate = DateAdd("h",3,currentDate)<br />
response.write newDate<br />
%[/IMG]<br />
RESULT: 11/4/99<br />
3:34:45 PM</p>
<p>"m" = "month";<br />
"d" = "day";</p>
<p>If currentDate is in time format then,<br />
"h" = "hour";<br />
"s" = "second";</p>
<p>DateDiff()<br />
FUNCTION: 返回两个日期之间的差值 。<br />
SYNTAX: DateDiff(timeinterval,date1,date2 [, firstdayofweek [, firstweekofyear[/IMG][/IMG])<br />
ARGUMENTS: timeinterval 表示相隔时间的类型，如&ldquo;M&ldquo;表示&ldquo;月&rdquo;。<br />
EXAMPLE: <%<br />
fromDate = #8/4/99#<br />
toDate = #1/1/2000#<br />
response.write "There are " &amp; _<br />
DateDiff("d",fromDate,toDate) &amp; _<br />
" days to millenium from 8/4/99."<br />
%[/IMG]<br />
RESULT: 从8/4/99 到2000年还有 150 天.</p>
<p>Day()<br />
FUNCTION: 返回一个月的第几日 .<br />
SYNTAX: Day(date)<br />
ARGUMENTS: date 是任何有效的日期。<br />
EXAMPLE: <%=Day(#8/4/99#)%[/IMG]<br />
RESULT: 4</p>
<p>FormatCurrency()<br />
FUNCTION: 返回表达式，此表达式已被格式化为货币值<br />
SYNTAX: FormatCurrency(Expression [, Digit [, LeadingDigit [, Paren [, GroupDigit[/IMG][/IMG][/IMG][/IMG])<br />
ARGUMENTS: Digit 指示小数点右侧显示位数的数值。默认值为 -1，指示使用的是计算机的区域设置; 　　LeadingDigit 三态常数，指示是否显示小数值小数点前面的零。<br />
EXAMPLE: <%=FormatCurrency(34.3456)%[/IMG]<br />
RESULT: $34.35</p>
<p>FormatDateTime()<br />
FUNCTION: 返回表达式，此表达式已被格式化为日期或时间<br />
SYNTAX: FormatDateTime(Date, [, NamedFormat[/IMG])<br />
ARGUMENTS: NamedFormat 指示所使用的日期/时间格式的数值，如果省略，则使用 vbGeneralDate.<br />
EXAMPLE: <%=FormatDateTime("08/4/99", vbLongDate)%[/IMG]<br />
RESULT: Wednesday, August 04, 1999</p>
<p>FormatNumber()<br />
FUNCTION: 返回表达式，此表达式已被格式化为数值.<br />
SYNTAX: FormatNumber(Expression [, Digit [, LeadingDigit [, Paren [, GroupDigit[/IMG][/IMG][/IMG][/IMG])<br />
ARGUMENTS: Digit 指示小数点右侧显示位数的数值。默认值为 -1，指示使用的是计算机的区域设置。; LeadingDigit i指示小数点右侧显示位数的数值。默认值为 -1，指示使用的是计算机的区域设置。; Paren 指示小数点右侧显示位数的数值。默认值为 -1，指示使用的是计算机的区域设置。; GroupDigit i指示小数点右侧显示位数的数值。默认值为 -1，指示使用的是计算机的区域设置。.<br />
EXAMPLE: <%=FormatNumber(45.324567, 3)%[/IMG]<br />
RESULT: 45.325</p>
<p>FormatPercent()<br />
FUNCTION: 返回表达式，此表达式已被格式化为尾随有 % 符号的百分比（乘以 100 ）。 (%)<br />
SYNTAX: FormatPercent(Expression [, Digit [, LeadingDigit [, Paren [, GroupDigit[/IMG][/IMG][/IMG][/IMG])<br />
ARGUMENTS: 同上.<br />
EXAMPLE: <%=FormatPercent(0.45267, 3)%[/IMG]<br />
RESULT: 45.267%</p>
<p>Hour()<br />
FUNCTION: 以24时返回小时数.<br />
SYNTAX: Hour(time)<br />
ARGUMENTS:<br />
EXAMPLE: <%=Hour(#4:45:34 PM#)%[/IMG]<br />
RESULT: 16<br />
(Hour has been converted to 24-hour system)</p>
<p>Instr()<br />
FUNCTION: 返回字符或字符串在另一个字符串中第一次出现的位置.<br />
SYNTAX: Instr([start, [/IMG] strToBeSearched, strSearchFor [, compare[/IMG])<br />
ARGUMENTS: Start为搜索的起始值，strToBeSearched接受搜索的字符串 strSearchFor要搜索的字符compare 比较方式（详细见ASP常数）<br />
EXAMPLE: <%<br />
strText = "This is a test!!"<br />
pos = Instr(strText, "a")<br />
response.write pos<br />
%[/IMG]<br />
RESULT: 9</p>
<p>InstrRev()<br />
FUNCTION: 同上，只是从字符串的最后一个搜索起<br />
SYNTAX: InstrRev([start, [/IMG] strToBeSearched, strSearchFor [, compare[/IMG])<br />
ARGUMENTS: 同上.<br />
EXAMPLE: <%<br />
strText = "This is a test!!"<br />
pos = InstrRev(strText, "s")<br />
response.write pos<br />
%[/IMG]<br />
RESULT: 13</p>
<p>Int()<br />
FUNCTION: 返回数值类型,不四舍五入。<br />
SYNTAX: Int(number)<br />
ARGUMENTS:<br />
EXAMPLE: <%=INT(32.89)%[/IMG]<br />
RESULT: 32</p>
<p>IsArray()<br />
FUNCTION: 判断一对象是否为数组，返回布尔值 .<br />
SYNTAX: IsArray(name)<br />
ARGUMENTS:<br />
EXAMPLE: <%<br />
strTest = "Test!"<br />
response.write IsArray(strTest)<br />
%[/IMG]<br />
RESULT: False</p>
<p>IsDate()<br />
FUNCTION: 判断一对象是否为日期，返回布尔值<br />
SYNTAX: IsDate(expression)<br />
ARGUMENTS: expression is any valid expression.<br />
EXAMPLE: <%<br />
strTest = "8/4/99"<br />
response.write IsDate(strTest)<br />
%[/IMG]<br />
RESULT: True</p>
<p>IsEmpty()<br />
FUNCTION: 判断一对象是否初始化，返回布尔值.<br />
SYNTAX: IsEmpty(expression)<br />
ARGUMENTS:<br />
EXAMPLE: <%<br />
Dim i<br />
response.write IsEmpty(i)<br />
%[/IMG]<br />
RESULT: True</p>
<p>IsNull()<br />
FUNCTION: 判断一对象是否为空，返回布尔值.<br />
SYNTAX: IsNull(expression)<br />
ARGUMENTS:<br />
EXAMPLE: <%<br />
Dim i<br />
response.write IsNull(i)<br />
%[/IMG]<br />
RESULT: False</p>
<p>IsNumeric()<br />
FUNCTION: 判断一对象是否为数字，返回布尔值.<br />
SYNTAX: IsNumeric(expression)<br />
ARGUMENTS:<br />
EXAMPLE: <%<br />
i = "345"<br />
response.write IsNumeric(i)<br />
%[/IMG]<br />
RESULT: True<br />
就算数字加了引号，ASP还是认为它是数字。</p>
<p>IsObject()<br />
FUNCTION: 判断一对象是否为对象，返回布尔值.<br />
SYNTAX: IsObject(expression)<br />
ARGUMENTS:<br />
EXAMPLE: <%<br />
Set con = Server.CreateObject("ADODB.Connection")<br />
response.write IsObject(con)<br />
%[/IMG]<br />
RESULT: True</p>
<p>LBound()<br />
FUNCTION: 返回指定数组维的最小可用下标.<br />
SYNTAX: Lbound(arrayname [, dimension[/IMG])<br />
ARGUMENTS: dimension 指明要返回哪一维下界的整数。使用 1 表示第一维，2 表示第二维，以此类　　推。如果省略 dimension 参数，默认值为 1.<br />
EXAMPLE: <%<br />
i = Array("Monday","Tuesday","Wednesday")<br />
response.write LBound(i)<br />
%[/IMG]<br />
RESULT: 0</p>
<p>LCase()<br />
FUNCTION: 返回字符串的小写形式<br />
SYNTAX: Lcase(string)<br />
ARGUMENTS: string is any valid string expression.<br />
EXAMPLE: <%<br />
strTest = "This is a test!"<br />
response.write LCase(strTest)<br />
%[/IMG]<br />
RESULT: this is a test!</p>
<p>Left()<br />
FUNCTION: 返回字符串左边第length个字符以前的字符（含第length个字符).<br />
SYNTAX: Left(string, length)<br />
ARGUMENTS:<br />
EXAMPLE: <%<br />
strTest = "This is a test!"<br />
response.write Left(strTest, 3)<br />
%[/IMG]<br />
RESULT: Thi</p>
<p>Len()<br />
FUNCTION: 返回字符串的长度.<br />
SYNTAX: Len(string | varName)<br />
ARGUMENTS:<br />
EXAMPLE: <%<br />
strTest = "This is a test!"<br />
response.write Len(strTest)<br />
%[/IMG]<br />
RESULT: 15</p>
<p>LTrim()<br />
FUNCTION: 去掉字符串左边的空格.<br />
SYNTAX: LTrim(string)<br />
ARGUMENTS:<br />
EXAMPLE: <%<br />
strTest = " This is a test!"<br />
response.write LTrim(strTest)<br />
%[/IMG]<br />
RESULT: This is a test!</p>
<p>Mid()<br />
FUNCTION: 返回特定长度的字符串(从start开始,长度为length).<br />
SYNTAX: Mid(string, start [, length[/IMG])<br />
ARGUMENTS:<br />
EXAMPLE: <%<br />
strTest = "This is a test! Today is Monday."<br />
response.write Mid(strTest, 17, 5)<br />
%[/IMG]<br />
RESULT: Today</p>
<p>Minute()<br />
FUNCTION: 返回时间的分钏.<br />
SYNTAX: Minute(time)<br />
ARGUMENTS:<br />
EXAMPLE: <%=Minute(#12:45:32 PM#)%[/IMG]<br />
RESULT: 45</p>
<p>Month()<br />
FUNCTION: 返回日期.<br />
SYNTAX: Month(date)<br />
ARGUMENTS: date is any valid date expression.<br />
EXAMPLE: <%=Month(#08/04/99#)%[/IMG]<br />
RESULT: 8</p>
<p>MonthName()<br />
FUNCTION: Returns a string identifying the specified month.<br />
SYNTAX: MonthName(month, [, Abb[/IMG])<br />
ARGUMENTS: month is the numeric representation for a given month; Abb (optional) is a boolean value used to display month abbreviation. True will display the abbreviated month name and False (default) will not show the abbreviation.<br />
EXAMPLE: <%=MonthName(Month(#08/04/99#))%[/IMG]<br />
RESULT: August</p>
<p>Now()<br />
FUNCTION: Returns the current system date and time.<br />
SYNTAX: Now()<br />
ARGUMENTS: None<br />
EXAMPLE: <%=Now%[/IMG]<br />
RESULT: 8/4/99 9:30:16 AM</p>
<p>Replace()<br />
FUNCTION: Returns a string in which a specified sub-string has been replaced with another substring a specified number of times.<br />
SYNTAX: Replace(strToBeSearched, strSearchFor, strReplaceWith [, start [, count [, compare[/IMG][/IMG][/IMG])<br />
ARGUMENTS: strToBeSearched is a string expression containing a sub-string to be replaced; strSearchFor is the string expression to search for within strToBeSearched; strReplaceWith is the string expression to replace sub-string strSearchFor; start (optional) is the numeric character position to begin search; count (optional) is a value indicating the comparision constant.<br />
EXAMPLE: <%<br />
strTest = "This is an apple!"<br />
response.write Replace(strTest, "apple", "orange")<br />
%[/IMG]<br />
RESULT: This is an orange!</p>
<p>Right()<br />
FUNCTION: 返回字符串右边第length个字符以前的字符（含第length个字符).<br />
SYNTAX: Right(string, length)<br />
ARGUMENTS: .<br />
EXAMPLE: <%<br />
strTest = "This is an test!"<br />
response.write Right(strTest, 3)<br />
%[/IMG]<br />
RESULT: st!</p>
<p>Rnd()<br />
FUNCTION: 产生一个随机数.<br />
SYNTAX: Rnd [ (number) [/IMG]<br />
ARGUMENTS:<br />
EXAMPLE: <%<br />
Randomize()<br />
response.write RND()<br />
%[/IMG]<br />
RESULT: 任何一个在0 到 1 之间的数</p>
<p>Round()<br />
FUNCTION: 返回按指定位数进行四舍五入的数值.<br />
SYNTAX: Round(expression [, numRight[/IMG])<br />
ARGUMENTS: numRight数字表明小数点右边有多少位进行四舍五入。如果省略，则 Round 函数返回整数.<br />
EXAMPLE: <%<br />
i = 32.45678<br />
response.write Round(i)<br />
%[/IMG]<br />
RESULT: 32</p>
<p>Rtrim()<br />
FUNCTION: 去掉字符串右边的字符串.<br />
SYNTAX: Rtrim(string)<br />
ARGUMENTS:<br />
EXAMPLE: <%<br />
strTest = "This is a test!! "<br />
response.write RTrim(strTest)<br />
%[/IMG]<br />
RESULT: This is a test!!</p>
<p>Second()<br />
FUNCTION: 返回秒.<br />
SYNTAX: Second(time)<br />
ARGUMENTS: .<br />
EXAMPLE: <%=Second(#12:34:28 PM#)%[/IMG]<br />
RESULT: 28</p>
<p>StrReverse()<br />
FUNCTION: 反排一字符串<br />
SYNTAX: StrReverse(string)<br />
ARGUMENTS:<br />
EXAMPLE: <%<br />
strTest = "This is a test!!"<br />
response.write StrReverse(strTest)<br />
%[/IMG]<br />
RESULT: !!tset a si sihT</p>
<p>Time()<br />
FUNCTION: 返回系统时间.<br />
SYNTAX: Time()<br />
ARGUMENTS: .<br />
EXAMPLE: <%=Time%[/IMG]<br />
RESULT: 9:58:28 AM</p>
<p>Trim()<br />
FUNCTION: 去掉字符串左右的空格.<br />
SYNTAX: Trim(string)<br />
ARGUMENTS: string is any valid string expression.<br />
EXAMPLE: <%<br />
strTest = " This is a test!! "<br />
response.write Trim(strTest)<br />
%[/IMG]<br />
RESULT: This is a test!!</p>
<p>UBound()<br />
FUNCTION: 返回指定数组维数的最大可用下标.<br />
SYNTAX: Ubound(arrayname [, dimension[/IMG])<br />
ARGUMENTS: dimension (optional) 指定返回哪一维上界的整数。1 表示第一维，2 表示第二维，以此类推。如果省略 dimension 参数，则默认值为 1.<br />
EXAMPLE: <%<br />
i = Array("Monday","Tuesday","Wednesday")<br />
response.write UBound(i)<br />
%[/IMG]<br />
RESULT: 2</p>
<p>UCase()<br />
FUNCTION: 返回字符串的大写形式.<br />
SYNTAX: UCase(string)<br />
ARGUMENTS:<br />
EXAMPLE: <%<br />
strTest = "This is a test!!"<br />
response.write UCase(strTest)<br />
%[/IMG]<br />
RESULT: THIS IS A TEST!!</p>
<p>VarType()<br />
FUNCTION: 返回指示变量子类型的值<br />
SYNTAX: VarType(varName)<br />
ARGUMENTS:<br />
EXAMPLE: <%<br />
i = 3</p>
</div>

---

[📚 返回目录](/needisme-mu-lu/)
