---
title: Hexo 的安装与基础配置完整教程
date: 2025-05-25
---

下面是 Hexo 的安装与基础配置完整教程，适用于初学者快速上手。

---

## 🛠 Hexo 安装与配置指南

Hexo 是一个基于 Node.js 的静态博客框架，支持 Markdown 写作，适合程序员与技术写作者。

---

### ✅ 1. 安装 Hexo 所需环境

#### 系统要求：

* Node.js (建议使用 LTS 版本，如 `v18.x`)
* Git

#### 安装步骤：

##### a. 安装 Node.js 和 npm

从官网下载安装：[https://nodejs.org](https://nodejs.org)

安装完成后，验证：

```bash
node -v
npm -v
```

##### b. 安装 Git

官网地址：[https://git-scm.com/](https://git-scm.com/)

安装完成后验证：

```bash
git --version
```

---

### ✅ 2. 安装 Hexo CLI

```bash
npm install -g hexo-cli
```

验证是否安装成功：

```bash
hexo -v
```

---

### ✅ 3. 创建博客项目

```bash
hexo init my-blog
cd my-blog
npm install
```

这会创建一个新目录 `my-blog`，并生成初始的博客结构。

---

### ✅ 4. 启动本地预览服务器

```bash
hexo server
```

打开浏览器访问：
👉 [http://localhost:4000](http://localhost:4000)

---

### ✅ 5. 博客基本配置

编辑博客根目录下的 `_config.yml` 文件：

#### 主要配置项示例：

```yaml
title: My Blog
subtitle: 编程与思考
description: 这是我的技术博客
author: Samjoe
language: zh-CN
timezone: Asia/Shanghai
```

#### URL 配置：

```yaml
url: https://yourdomain.com  # 你的部署域名
root: /
permalink: :year/:month/:day/:title/
```

---

### ✅ 6. 创建文章

```bash
hexo new "Hello World"
```

默认文章路径是：`source/_posts/hello-world.md`，使用 Markdown 编辑。

---

### ✅ 7. 主题安装（推荐几款）

#### a. 安装主题

以 [hexo-theme-landscape](https://github.com/hexojs/hexo-theme-landscape) 为例（默认主题）：

如果你要更换主题，比如使用「Butterfly」：

```bash
cd my-blog/themes
git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git butterfly
```

然后在根目录 `_config.yml` 中修改：

```yaml
theme: butterfly
```

不同主题有自己的一套配置说明，请参考主题文档。

---

### ✅ 8. 生成与部署

#### 本地生成静态文件：

```bash
hexo clean
hexo generate
```

#### 上传到 GitHub Pages（常见部署方式）：

1. 安装部署插件：

```bash
npm install hexo-deployer-git --save
```

2. 修改 `_config.yml` 添加部署配置：

```yaml
deploy:
  type: git
  repo: https://github.com/yourusername/yourusername.github.io.git
  branch: main
```

3. 部署到 GitHub：

```bash
hexo deploy
```

---

### ✅ 9. 常见命令速查表

| 命令                         | 说明       |
| -------------------------- | -------- |
| `hexo init`                | 初始化博客    |
| `hexo new "title"`         | 新建文章     |
| `hexo g` 或 `hexo generate` | 生成静态文件   |
| `hexo s` 或 `hexo server`   | 本地预览     |
| `hexo d` 或 `hexo deploy`   | 部署到远程    |
| `hexo clean`               | 清除缓存和旧文件 |

---

### ✅ 10. 推荐插件（可选）

* 搜索功能：`hexo-generator-search`
* RSS 支持：`hexo-generator-feed`
* 站点地图：`hexo-generator-sitemap`
* 自动草稿管理：`hexo-auto-categorize`

---

如果你已经有特定目标（如语音朗读、评论系统、多语言支持等），我可以继续为你配置详细教程。是否要继续添加这些进阶功能？


Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).

## Quick Start

### Create a new post

``` bash
$ hexo new "My New Post"
```

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

``` bash
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

``` bash
$ hexo generate
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

``` bash
$ hexo deploy
```

你也可以使用一条命令完成清理、生成和部署：

``` bash
$ hexo clean && hexo generate && hexo deploy
```
More info: [Deployment](https://hexo.io/docs/one-command-deployment.html)
