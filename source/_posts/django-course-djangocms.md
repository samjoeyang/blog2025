---
title: "DjangoCMS工具栏配置"
date: 2022-01-20 09:25:00
categories: Django实战教程
tags: ["DjangoCMS", "工具栏", "模板配置"]
---
{% raw %}
下面几个tags添加到模板中

`</head>`之前，引入css

```
{% render_block "css" %}
```

`<body>`后面第一行

```
{% cms_toolbar %}
```

`</body>`后面，引入js

```
{% render_block "js" %}
```
{% endraw %}

---

[📚 返回目录](/django-course-mu-lu/)
