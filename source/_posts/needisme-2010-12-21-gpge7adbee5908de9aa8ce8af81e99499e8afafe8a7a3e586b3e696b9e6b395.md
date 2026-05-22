---
title: "GPG签名验证错误解决方法"
date: 2010-12-21 12:23:35
categories: NeedIsMe
tags: ["Ubuntu", ".NET", "Linux"]
---

<p>W: GPG 错误：http://archive.getdeb.net lucid-getdeb Release: 由于没有公钥，无法验证下列签名： NO_PUBKEY A8A515F046D7E7CF</p>
<p>出现以上错误提示时，只要把后八位拷贝一下来，并在[终端]里输入以下命令并加上这八位数字回车即可！</p>
<blockquote><p>sudo apt-key adv &ndash;recv-keys &ndash;keyserver keyserver.Ubuntu.com 46D7E7CF</p></blockquote>

---

[📚 返回目录](/needisme-mu-lu/)
