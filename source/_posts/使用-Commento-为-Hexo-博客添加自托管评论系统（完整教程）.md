---
title: 使用 Commento 为 Hexo 博客添加自托管评论系统（完整教程）
date: 2025-05-28 17:31:09
tags:
  - Hexo
  - Commento
  - 评论系统
  - Docker
  - 自托管
  - 教程
---

# 💬 使用 Commento 为 Hexo 博客添加自托管评论系统（完整教程）

> 本文将介绍如何使用 Docker Compose 部署 Commento 评论系统，并将其集成到 Hexo 静态博客中，实现可控、轻量、无追踪的评论功能。

---

## 📌 目录

1. [Commento 简介](#commento-简介)  
2. [为什么选择 Commento](#为什么选择-commento)  
3. [系统架构](#系统架构)  
4. [部署环境准备](#部署环境准备)  
5. [Docker Compose 部署 Commento + PostgreSQL + Caddy](#docker-compose-部署-commento--postgresql--caddy)  
6. [配置域名和 HTTPS](#配置域名和-https)  
7. [Hexo 集成 Commento](#hexo-集成-commento)  
8. [评论后台管理](#评论后台管理)  
9. [常见问题与建议](#常见问题与建议)  
10. [总结](#总结)

---

## Commento 简介

**Commento** 是一个开源的嵌入式评论系统，可用于替代如 Disqus 等第三方服务。支持 Markdown、隐私保护、反垃圾、多站点等特性。你可以选择自托管的方式完全控制数据。

---

## 为什么选择 Commento

| 特性 | 支持 | 描述 |
|------|------|------|
| 开源 | ✅ | 自由修改部署 |
| 自托管 | ✅ | 控制全部数据 |
| 无广告 | ✅ | 注重隐私，无第三方追踪 |
| 支持 Markdown | ✅ | 格式美观、方便书写 |
| 支持审核管理 | ✅ | 后台可屏蔽、删除、审批 |
| 邮件通知 | ✅ | 可配置 SMTP 发送通知 |
| 多站点支持 | ✅ | 一套服务，多站共用 |

---

## 系统架构

组件 | 功能
------|------
Commento | 评论服务核心，运行在端口 8080
PostgreSQL | 存储评论数据
Caddy | 反向代理并自动配置 HTTPS
Hexo | 生成静态页面的博客系统

---

## 部署环境准备

1. 一台云服务器（Ubuntu 20.04 或以上）  
2. 域名一枚（如 `comments.example.com`）并完成解析  
3. 安装 Docker 和 Docker Compose：

```bash
sudo apt update
sudo apt install docker docker-compose -y
```

## Docker Compose 部署 Commento + PostgreSQL + Caddy
1️⃣ 创建 docker-compose.yml

```yaml

version: '3.8'

services:
  postgres:
    image: postgres:13
    container_name: commento-postgres
    restart: always
    environment:
      POSTGRES_USER: commento
      POSTGRES_PASSWORD: strong_password_here
      POSTGRES_DB: commento
    volumes:
      - pgdata:/var/lib/postgresql/data

  commento:
    image: registry.gitlab.com/commento/commento
    container_name: commento
    restart: always
    environment:
      COMMENTO_ORIGIN: "https://comments.example.com"
      COMMENTO_PORT: 8080
      COMMENTO_POSTGRES: "postgres://commento:strong_password_here@postgres:5432/commento?sslmode=disable"
    depends_on:
      - postgres

  caddy:
    image: caddy:2
    container_name: commento-caddy
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
      - caddy_config:/config

volumes:
  pgdata:
  caddy_data:
  caddy_config:
```

2️⃣ 创建 Caddyfile

``` caddyfile
comments.example.com {
  reverse_proxy commento:8080

  encode gzip
  header {
    Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
    X-Content-Type-Options "nosniff"
    X-Frame-Options "DENY"
    X-XSS-Protection "1; mode=block"
  }
}
```
3️⃣ 启动服务
``` bash
docker compose up -d
```

## 配置域名和 HTTPS
将 comments.example.com 指向你的服务器 IP（A 记录）

确保服务器开放 80 和 443 端口：

```bash
sudo ufw allow 80
sudo ufw allow 443
Caddy 会自动申请并续签 HTTPS 证书
```
## Hexo 集成 Commento
在你的 Hexo 博客主题中找到 layout/post.ejs 或 post.html，在页面底部插入：

```html
<div id="commento"></div>
<script defer src="https://comments.example.com/js/commento.js"></script>
```
然后执行生成部署：

```bash
hexo clean && hexo g && hexo d
```
## 评论后台管理
访问你的 Commento 服务首页：
https://comments.example.com

* 注册账号
* 登录后创建站点（填写你博客的域名）
* 管理功能：
    * 评论审核与删除
    * 用户封禁
    * 多站点切换
    * SMTP 通知配置（可选）

## 常见问题与建议
| 问题 |	解决方案 |
|------|------|
| 域名访问不了 |	检查 DNS、端口、防火墙配置 |
| 评论不显示 |	检查域名与 COMMENTO_ORIGIN 是否一致 |
| 邮件通知失败 |	配置 SMTP，确保端口和账号正确 |
| 页面加载太慢 |	使用 CDN 加速博客主站，不影响评论 |

## 总结
| 项目 | 技术 |
|------|------|
| 评论系统 | Commento（自托管） |
| 部署方式 |	Docker Compose  |
| 评论数据存储 |	PostgreSQL |
| 反向代理与 | HTTPS	Caddy 自动化配置 |
| 博客平台 |	Hexo（静态） |
| 嵌入方法 |	HTML 标签与 JS 脚本 |

Commento 是一个优雅、注重隐私的评论解决方案，适合内容创作者、技术博客、文档站点等场景。结合 Hexo 可构建完全自控的内容平台。

