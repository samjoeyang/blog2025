---
title: "T-SQL学习 字符串函数"
date: 2009-09-28 16:37:00
categories: NeedIsMe
tags: ["T-SQL", "SQL"]
---

<p>字符串函数对二进制数据、字符串和表达式执行不同的运算。此类函数作用于CHAR、VARCHAR、 BINARY、 和VARBINARY 数据类型以及可以隐式转换为CHAR 或VARCHAR的数据类型。可以在SELECT 语句的SELECT 和WHERE 子句以及表达式中使用字符串函数。常用的字符串函数有：1、字符转换函数<br />
有以下几种字符转换函数：<br />
・ASCII（）<br />
ASCII（） 函数返回字符表达式最左端字符的ASCII 码值。ASCII（） 函数语法如下：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915445734.gif" alt="" width="302" height="31" /></p>
<p>例4-40：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915446580.gif" alt="" width="560" height="82" /><br />
<img src="http://www.gu916.cn/UploadFiles/200872915446621.gif" alt="" width="278" height="82" /></p>
<p>提醒：在ASCII（）函数中，纯数字的字符串可不用&lsquo;&rsquo;括起来，但含其它字符的字符串必须用&lsquo;&rsquo;括起来使用，否则会出错。</p>
<p>・CHAR（）<br />
CHAR（） 函数用于将ASCII 码转换为字符。其语法如下：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915446360.gif" alt="" width="288" height="28" /><br />
如果没有输入0 ~ 255 之间的ASCII 码值，CHAR（） 函数会返回一个NULL 值。</p>
<p>例4-41：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915446371.gif" alt="" width="361" height="145" /></p>
<p>・LOWER（）<br />
LOWER（） 函数把字符串全部转换为小写，其语法如下：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915446797.gif" alt="" width="304" height="27" /></p>
<p>例4-42：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915446112.gif" alt="" width="284" height="143" /></p>
<p>・UPPER（）<br />
UPPER（） 函数把字符串全部转换为大写，其语法如下：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915446784.gif" alt="" width="309" height="27" /></p>
<p>例4-43：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915446833.gif" alt="" width="307" height="133" /></p>
<p>・STR（）<br />
STR（） 函数把数值型数据转换为字符型数据，其语法如下：<br />
STR （<float _expression>[，length[， <decimal>]]）<br />
自变量length 和decimal 必须是非负值，length 指定返回的字符串的长度，decimal 指定返回的小数位数。如果没有指定长度，缺省的length 值为10， decimal 缺省值为0。 小数位数大于decimal 值时，STR（） 函数将其下一位四舍五入。指定长度应大于或等于数字的符号位数+小数点前的位数+小数点位数+小数点后的位数。如果<float _expression>小数点前的位数超过了指定的长度，则返回指定长度的&ldquo;*&rdquo;。</p>
<p>例4-44：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915446738.gif" alt="" width="560" height="131" /></p>
<p>2、去空格函数<br />
去空格函数有如下两种：<br />
・LTRIM（）<br />
LTRIM（） 函数把字符串头部的空格去掉，其语法如下：<br />
LTRIM （<character _expression>）</p>
<p>例4-45：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915446140.gif" alt="" width="163" height="143" /></p>
<p>・RTRIM（）<br />
RTRIM（） 函数把字符串尾部的空格去掉，其语法如下：<br />
RTRIM （<character _expression>）</p>
<p>例4-46：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915446472.gif" alt="" width="174" height="145" /></p>
<p>提示：在许多情况下，往往需要得到头部和尾部都没有空格字符的字符串，这时可将上两个函数嵌套使用。</p>
<p>例4-47：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915446876.gif" alt="" width="304" height="133" /></p>
<p>3、取子串函数<br />
取子串函数如下所示：<br />
・LEFT（）<br />
LEFT（） 函数返回部分字符串，其语法如下：<br />
LEFT （<character_expression>， <integer_expression>）<br />
LEFT（） 函数返回的子串是从字符串最左边起到第integer_expression 个字符的部分。若integer_expression 为负值，则返回NULL 值。</p>
<p>例4-48：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915446811.gif" alt="" width="205" height="135" /></p>
<p>・RIGHT（）<br />
RIGHT（） 函数返回部分字符串，其语法如下：<br />
RIGHT （<character_expression>， <integer_expression>）<br />
RIGHT（） 函数返回的子串是从字符串右边第integer_expression 个字符起到最后一个字符的部分。若integer_expression 为负值，则返回NULL 值。</p>
<p>例4-49：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915446436.gif" alt="" width="214" height="137" /></p>
<p>・SUBSTRING（）<br />
SUBSTRING（） 函数返回部分字符串，其语法如下：<br />
SUBSTRING （<expression>， <starting_ position>， length）<br />
SUBSTRING（） 函数返回的子串是从字符串左边第starting_ position 个字符起length个字符的部分。其中表达式可以是字符串或二进制串或含字段名的表达式。SUBSTRING（）函数不能用于TEXT 和IMAGE 数据类型。</p>
<p>例4-50：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915447965.gif" alt="" width="460" height="214" /></p>
<p>4、字符串比较函数<br />
字符串比较函数如下所示：<br />
・CHARINDEX（）<br />
CHARINDEX（） 函数返回字符串中某个指定的子串出现的开始位置，其语法如下：<br />
CHARINDEX （<&rsquo;substring_expression&rsquo;>， <expression>）<br />
其中substring _expression 是所要查找的字符表达式，expression 可为字符串也可为列名表达式。如果没有发现子串，则返回0 值。此函数不能用于TEXT 和IMAGE 数据类型。</p>
<p>例4-51：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915447884.gif" alt="" width="272" height="131" /></p>
<p>例4-52：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915447150.gif" alt="" width="241" height="209" /></p>
<p>・PATINDEX（）<br />
PATINDEX（） 函数返回字符串中某个指定的子串出现的开始位置，其语法如下：<br />
PATINDEX （<&rsquo;%substring _expression%&rsquo;>，<br />
<column_ name>）<br />
其中子串表达式前后必须有百分号&ldquo;%&rdquo;否则返回值为0。</p>
<p>例4-53：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915447954.gif" alt="" width="474" height="131" /></p>
<p>与CHARINDEX（） 函数不同的是，PATINDEX（） 函数的子串中可以使用通配符，且此函数可用于CHAR、 VARCHAR 和TEXT 数据类型。</p>
<p>例4-54：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915447427.gif" alt="" width="321" height="268" /></p>
<p>・SOUNDEX（）<br />
SOUNDEX（） 函数返回一个四位字符码，其语法如下：<br />
SOUNDEX （<character _expression>）<br />
SOUNDEX（） 函数将character _expression 转换为4 个字符的声音码。其中第一个码为原字符串的第一个字符，第二到第四个字符则为数字，是该字符串的声音字母所对应的数字，但是忽略了除首字母外的串中的所有元音字母 。SOUNDEX（） 函数可用来查找声音相似的字符串。但SOUNDEX 函数对数字和汉字均只返回0 值。</p>
<p>例4-55：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915447572.gif" alt="" width="560" height="135" /></p>
<p>・DIFFERENCE（）<br />
DIFFERENCE（） 函数返回由SOUNDEX（） 函数返回的两个字符表达式的值的差异。其语法如下：<br />
DIFFERENCE （<character_expression1>， <character_expression2>）<br />
值的差异是用0、 1、 2、 3、 4 来表示的，含义如下：<br />
0--两个SOUNDEX（） 函数返回值的第一个字符不同<br />
1--两个SOUNDEX（） 函数返回值的第一个字符相同<br />
2--两个SOUNDEX（） 函数返回值的第一、二个字符相同<br />
3--两个SOUNDEX（） 函数返回值的第一、二、三个字符相同<br />
4--两个SOUNDEX（） 函数返回值完全相同</p>
<p>例4-56：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915447790.gif" alt="" width="560" height="150" /></p>
<p>5、字符串操作函数<br />
字符串操作函数如下所示：<br />
・QUOTENAME（）<br />
QUOTENAME（） 函数返回被特定字符括起来的字符串，其语法如下：<br />
QUOTENAME （<&rsquo;character_expression&rsquo;>[， quote_ character]）<br />
其中quote_ character 标明括字符串所用的字符，如&ldquo;&lsquo;&rdquo;、&ldquo;（&rdquo;、&ldquo;[&rdquo; 等，缺省值为&ldquo;[]&rdquo;</p>
<p>例4-57：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915447148.gif" alt="" width="364" height="136" /></p>
<p>・REPLICATE（）<br />
REPLICATE（） 函数返回一个重复character_expression 指定次数的字符串，其语法如下：<br />
REPLICATE （character_expression integer_expression）<br />
如果integer_expression 值为负值，则REPLICATE（） 函数返回NULL 串。</p>
<p>例4-58：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915447633.gif" alt="" width="357" height="137" /></p>
<p>・REVERSE（）<br />
REVERSE（） 函数将指定的字符串的字符排列顺序颠倒，其语法如下：<br />
REVERSE （<character_expression>）<br />
其中character_expression 可以是字符串、常数或一个列的值。</p>
<p>例4-59：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915447521.gif" alt="" width="286" height="132" /></p>
<p>・REPLACE（）<br />
REPLACE（） 函数返回被替换了指定子串的字符串，其语法如下：<br />
REPLACE （<string_expression1>， <string_expression2>， <string_expression3>）<br />
REPLACE（） 函数用string_expression3 替换在string_expression1 中的子串string_expression2。</p>
<p>例4-60：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915447368.gif" alt="" width="296" height="132" /></p>
<p>・SPACE（）<br />
SPACE（） 函数返回一个有指定长度的空白字符串，其语法如下：<br />
SPACE （<integer_expression>）<br />
如果integer_expression 值为负值，则SPACE（） 函数返回NULL 串。</p>
<p>例4-61：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915447660.gif" alt="" width="233" height="128" /></p>
<p>・STUFF（）<br />
STUF（）函数用另一子串替换字符串指定位置、长度的子串，其语法如下：<br />
STUFF （<character_expression1>， <start_ position>， <length>，<character_expression2>）<br />
如果起始位置为负或长度值为负，或者起始位置大于character_expression1 的长度，则STUFF（） 函数返回NULL 值。如果length 长度大于character_expression1 的长度，则character_expression1 只保留首字符。</p>
<p>例4-62：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915447683.gif" alt="" width="560" height="115" /></p>
<p>6、数据类型转换函数<br />
在一般情况下，SQL Server 会自动完成数据类型的转换，例如，可以直接将字符数据类型或表达式与DATATIME 数据类型或表达式比较当表达式中用了INTEGER、 SMALLINT或TINYINT 时，SQL Server 也可将INTEGER 数据类型或表达式转换为SMALLINT数据类型或表达式，这称为隐式转换。如果不能确定SQL Server 是否能完成隐式转换或者使用了不能隐式转换的其它数据类型，就需要使用数据类型转换函数做显式转换了。此类函数有两个：<br />
・CAST（）<br />
CAST（） 函数语法如下：<br />
CAST （<expression> AS <data_ type>[ length ]）</p>
<p>・CONVERT（）<br />
CONVERT（） 函数语法如下：<br />
CONVERT （<data_ type>[ length ]， <expression> [， style]）</p>
<p>提醒：&nbsp;1、data_type为SQL Server系统定义的数据类型，用户自定义的数据类型不能在此使用。<br />
2、length用于指定数据的长度，缺省值为30。<br />
3、把CHAR或VARCHAR类型转换为诸如INT或SAMLLINT这样的INTEGER类型、结果必须是带正号（+）或负号（-）的数值。<br />
4、TEXT类型到CHAR或VARCHAR类型转换最多为8000个字符，即CHAR或VARCHAR数据类型是最大长度。<br />
5、IMAGE类型存储的数据转换到BINARY或VARBINARY类型，最多为8000个字符。<br />
6、把整数值转换为MONEY或SMALLMONEY类型，按定义的国家的货币单位来处理，如人民币、美元、英镑等。<br />
7、BIT类型的转换把非零值转换为1，并仍以BIT类型存储。<br />
8、试图转换到不同长度的数据类型，会截短转换值并在转换值后显示&ldquo;+&rdquo;，以标识发生了这种截断。</p>
<p>例4-63：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915448337.gif" alt="" width="524" height="130" /></p>
<p>例4-64：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915448351.gif" alt="" width="560" height="105" /></p>
<p>例4-65：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915448846.gif" alt="" width="560" height="257" /><br />
<img src="http://www.gu916.cn/UploadFiles/200872915448842.gif" alt="" width="229" height="30" /></p>
<p>用CONVERT（） 函数的style 选项能以不同的格式显示日期和时间。style 是将DATATIME 和SMALLDATETIME 数据转换为字符串时所选用的由SQL Server 系统提供的转换样式编号，不同的样式编号有不同的输出格式。如表4-8 所示。<br />
<img src="http://www.gu916.cn/UploadFiles/200872915448630.gif" alt="" width="560" height="420" /></p>
<p>例4-66：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915448987.gif" alt="" width="560" height="126" /></p>
<p>7、日期函数<br />
日期函数用来操作DATETIME 和SMALLDATETIME 类型的数据，执行算术运算。与其它函数一样，可以在SELECT 语句的SELECT 和WHERE 子句以及表达式中使用日期函数。其使用方法如下：<br />
日期函数参数，其中参数个数应不同的函数而不同。</p>
<p>・DAY（）<br />
DAY（） 函数语法如下：<br />
DAY （<date_expression>）<br />
DAY（） 函数返回date_expression 中的日期值。</p>
<p>例4-67：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915448919.gif" alt="" width="342" height="127" /></p>
<p>在上例中，DAY（） 函数使用整数值作参数，系统从1900 年1 月1 日起往后数指定整数值+1， 天再返回其日期。</p>
<p>・MONTH（）<br />
MONTH（） 函数语法如下：<br />
MONTH (<date_expression>)<br />
MONTH（） 函数返回date_expression 中的月份值。</p>
<p>例4-68：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915448304.gif" alt="" width="363" height="128" /></p>
<p>与DAY（） 函数不同的是，MONTH（） 函数的参数为整数时，一律返回整数值1，即SQL Server 认为其是1900 年1 月。</p>
<p>例4-69：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915448725.gif" alt="" width="265" height="102" /></p>
<p>・YEAR（）<br />
YEAR（） 函数语法如下：<br />
YEAR （<date_expression>）<br />
YEAR（） 函数返回date_expression 中的年份值。<br />
r><br />
例4-70：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915448982.gif" alt="" width="347" height="132" /></p>
<p>提醒：在使用日期函数时，其日期值应在1753年到9999年之间，这是SQL Server系统所能识别的日期范围，否则会出现错误。</p>
<p>例4-71：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915448319.gif" alt="" width="560" height="137" /></p>
<p>・DATEADD（）<br />
DATEADD（） 函数语法如下：<br />
DATEADD （<datepart>， <number>， <date>）<br />
DATEADD（） 函数返回指定日期date 加上指定的额外日期间隔number 产生的新日期。参数&ldquo;datepart&rdquo; 在日期函数中经常被使用，它用来指定构成日期类型数据的各组件，如年、季、月、日、星期等。其取值如表4-9 所示：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915448580.gif" alt="" width="501" height="318" /></p>
<p>例4-72：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915448195.gif" alt="" width="560" height="55" /><br />
<img src="http://www.gu916.cn/UploadFiles/200872915449999.gif" alt="" width="455" height="107" /></p>
<p>・DATEDIFF（）<br />
DATEDIFF（） 函数语法如下：<br />
DATEDIFF（） （<datepart>， <date1>， <date2>）<br />
DATEDIFF（） 函数返回两个指定日期在datepart 方面的不同之处，即date2 超过date1的差距值，其结果值是一个带有正负号的整数值。针对不同的datepart， DATEDIFF（）函数所允许的最大差距值不一样，如：datepart 为second 时，DATEDIFF（） 函数所允许的最大差距值为68： 年datepart 为millisecond 时，DATEDIFF（） 函数所允许的最大差距值为24 天20 小时30 分23 秒647 毫秒。</p>
<p>例4-73：&nbsp;查询在本单位工作了8 年以上的员工的姓名和所在的部门，结果按在本单位工作的时间长短排序。<br />
<img src="http://www.gu916.cn/UploadFiles/200872915449708.gif" alt="" width="403" height="315" /></p>
<p>・DATENAME（）<br />
DATENAME（） 函数语法如下：<br />
DATENAME （<datepart>， <date）><br />
DATENAME（） 函数以字符串的形式返回日期的指定部分此部分。由datepart 来指定。</p>
<p>例4-74：&nbsp;查询工资大于等于7000 的员工的姓名、部门编号、工资和进入单位的年份，结果按工资高低降序排列。<br />
<img src="http://www.gu916.cn/UploadFiles/200872915449114.gif" alt="" width="560" height="84" /><img src="http://www.gu916.cn/UploadFiles/200872915449617.gif" alt="" width="469" height="315" /></p>
<p>・DATEPART（）<br />
DATEPART（） 函数语法如下：<br />
DATEPART （<datepart>， <date>）<br />
DATEPART（） 函数以整数值的形式返回日期的指定部分。此部分由datepart 来指定。<br />
DATEPART （dd， date） 等同于DAY （date）<br />
DATEPART （mm， date） 等同于MONTH （date）<br />
DATEPART （yy， date） 等同于YEAR （date）</p>
<p>例4-75：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915449190.gif" alt="" width="486" height="317" /></p>
<p>・GETDATE（）<br />
GETDATE（） 函数语法如下：<br />
GETDATE（）<br />
GETDATE（） 函数以DATETIME 的缺省格式返回系统当前的日期和时间，它常作为其它函数或命令的参数使用。</p>
<p>例4-71：<br />
<img src="http://www.gu916.cn/UploadFiles/200872915449192.gif" alt="" width="409" height="131" /></p>

---

[📚 返回目录](/needisme-mu-lu/)
