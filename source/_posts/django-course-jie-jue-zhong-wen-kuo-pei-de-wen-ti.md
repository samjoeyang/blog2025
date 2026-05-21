---
title: "中文适配的问题"
date: 2022-01-20 08:45:00
categories: Django实战教程
tags: ["中文配置", "Django本地化", "Django建议"]
---

Python2有UTF-8的问题，可以在文件开头首行加入`# -*- coding: UTF-8 -*-`即可 在项目的settings.py文件中加入

```
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
```

---

[📚 返回目录](/django-course-mu-lu/)
