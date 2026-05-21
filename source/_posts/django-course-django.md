---
title: "Django 后台标题修改"
date: 2022-01-20 08:55:00
categories: Django实战教程
tags: ["DjangoAdmin", "后台自定义"]
---

在任何一个应用中的`admin.py`文件中添加以下内容

```
from django.contrib import admin
django.admin.site.site_title="自定义"
django.admin.site.site_header="自定义"
django.admin.site.index_title="自定义"
```

---

[📚 返回目录](/django-course-mu-lu/)
