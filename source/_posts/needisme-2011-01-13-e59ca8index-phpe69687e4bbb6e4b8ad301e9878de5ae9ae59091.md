---
title: "在index.php文件中301重定向"
date: 2011-01-13 15:20:22
categories: NeedIsMe
tags: ["互联网", "Internet", "PHP"]
---

<pre lang="php">//如果是别的域名，永久转向needis.me
$host = $_SERVER['HTTP_HOST'];
$request_uri = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '';
$flag=0;
switch ($request_uri)
{
	case '/2010/12/09/647/':
		$request_uri = '/?p=302';
		break;
...
...
...
	default:
		$flag=1;
		break;
}		

if($host!='needis.me' || $flag==0)
{
	header('HTTP/1.1 301 Moved Permanently');
	header('Location: http://needis.me'.$request_uri);
	exit;
}

前提

1.开启了rewrite
2.代码加在index.php最前面


以上方法我自己没实验成功，可能是rewrite有问题，不晓得</pre>

---

[📚 返回目录](/needisme-mu-lu/)
