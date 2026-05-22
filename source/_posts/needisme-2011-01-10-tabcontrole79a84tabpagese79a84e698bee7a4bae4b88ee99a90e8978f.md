---
title: "TabControl的TabPages的显示与隐藏"
date: 2011-01-10 17:35:32
categories: NeedIsMe
tags: [".NET"]
---

<p>做程序开发中发现TabControl的TabPages没有visable和enable属性，如果需要对某一个TabPage进行隐藏或者显示时就很麻烦，通常的方法是</p>
<p>VB.NET Code</p>
<blockquote><p>tp=TabControl1.TabPages(i)</p>
<p>TabControl1.TabPages.Remove(tp)</p></blockquote>
<p>i是TabPage的索引号，如果知道TabPage的Name，似乎不管用，需要转化成TabPage的索引号才有用</p>
<blockquote><p>TabControl1.TabPages.Add(2,TabPageName)</p></blockquote>
<p>2是要显示的位置的索引，TabPageName是Tabpage的Name，这一点似乎与上面隐藏时不太对应</p>

---

[📚 返回目录](/needisme-mu-lu/)
