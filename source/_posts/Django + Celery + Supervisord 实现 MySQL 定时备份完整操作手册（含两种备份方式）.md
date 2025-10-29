---
title: Django + Celery + Supervisord 实现 MySQL 定时备份完整操作手册（含两种备份方式）
date: 2025-10-29 15:48:15
tags: [Django, Celery,Supervisord, MySQL, 定时,备份,]
---

# Django + Celery + Supervisord 实现 MySQL 定时备份完整操作手册（含两种备份方式）

本文档详细介绍如何通过 Django + Celery + Supervisord 实现 MySQL 数据库的定时备份、压缩、邮件发送全流程自动化，提供 **mysqldump 原生备份** 和 **Django dumpdata 备份** 两种方案，适配不同场景需求，并通过 Supervisord 实现服务后台稳定运行。

# 一、环境准备

## 1.1 系统基础依赖安装

适用于 Ubuntu/Debian 系统，其他系统（如 CentOS）可对应调整包管理命令。

```bash

# 更新系统包
sudo apt update && sudo apt upgrade -y

# 安装 Python 及工具
sudo apt install -y python3 python3-pip python3-venv

# 安装 Redis（作为 Celery 消息代理）
sudo apt install -y redis-server
sudo systemctl enable redis-server  # 开机自启
sudo systemctl start redis-server   # 启动服务
sudo systemctl status redis-server  # 验证启动状态

# 安装 MySQL 客户端（仅 mysqldump 方案需要）
sudo apt install -y mysql-client

# 安装 Supervisord（进程管理）
sudo apt install -y supervisor
sudo systemctl enable supervisor    # 开机自启
sudo systemctl start supervisor     # 启动服务
sudo systemctl status supervisor    # 验证启动状态
```

## 1.2 项目虚拟环境与依赖安装

```bash

# 进入 Django 项目根目录（示例路径，需替换为实际路径）
cd /path/to/your/django/project

# 创建并激活虚拟环境
python3 -m venv venv
source venv/bin/activate  # 激活虚拟环境（Windows 为：venv\Scripts\activate）

# 安装核心依赖
pip install django celery django-celery-beat redis
pip list  # 验证依赖安装成功
```

# 二、核心配置

## 2.1 Django 项目基础配置（settings.py）

需配置数据库、Celery 核心参数、邮件服务（用于发送备份附件）。

```python

import os

# --------------------------
# 1. 数据库配置（MySQL）
# --------------------------
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'your_db_name',          # 数据库名
        'USER': 'your_db_user',          # 数据库用户名
        'PASSWORD': 'your_db_password',  # 数据库密码
        'HOST': 'localhost',             # 数据库地址（本地为 localhost）
        'PORT': '3306',                  # 数据库端口（默认 3306）
    }
}

# --------------------------
# 2. Celery 配置（优化版）
# --------------------------
# Broker 配置（Redis，支持密码认证）
CELERY_BROKER_URL = (
    f"redis://:{os.environ.get('REDIS_PASSWORD', '')}@"
    f"{os.environ.get('REDIS_HOST', 'localhost')}:"
    f"{os.environ.get('REDIS_PORT', '6379')}/0"
)
# 结果存储（Django ORM，避免额外依赖）
CELERY_RESULT_BACKEND = 'django-db'
# 后端缓存（复用 Django 缓存配置）
CELERY_CACHE_BACKEND = 'django-cache'

# Worker 配置
CELERY_WORKER_CONCURRENCY = 5                # 并发数（默认 CPU 核心数，可调整）
CELERY_WORKER_MAX_TASKS_PER_CHILD = 200      # 每个 Worker 最大任务数（防止内存泄漏）
CELERY_WORKER_PREFETCH_MULTIPLIER = 1        # 预取倍数（I/O 密集型设为 1）

# 任务配置
CELERY_TASK_RESULT_EXPIRES = 60 * 60 * 24 * 7 # 结果保留 7 天
CELERY_TASK_TIME_LIMIT = 300                 # 任务硬超时（5 分钟，适配备份场景）
CELERY_TASK_SOFT_TIME_LIMIT = 240            # 任务软超时（4 分钟，提前清理）

# 序列化配置（统一 JSON，安全跨平台）
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'

# --------------------------
# 3. Celery Beat 定时任务配置
# --------------------------
CELERY_TIMEZONE = 'Asia/Shanghai'                        # 时区（与 Django 一致）
DJANGO_CELERY_BEAT_TZ_AWARE = True                       # 启用时区感知
CELERY_BEAT_SCHEDULER = 'django_celery_beat.schedulers:DatabaseScheduler' # 数据库调度

# --------------------------
# 4. 邮件服务配置（用于发送备份附件）
# --------------------------
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.qq.com'               # SMTP 服务器（QQ 邮箱示例，其他邮箱需调整）
EMAIL_PORT = 587                         # SMTP 端口（QQ 邮箱 587，阿里云 465 等）
EMAIL_USE_TLS = True                     # 启用 TLS 加密（对应 587 端口）
# EMAIL_USE_SSL = True                   # 启用 SSL 加密（对应 465 端口，二选一）
EMAIL_HOST_USER = 'your_email@qq.com'    # 发件人邮箱
EMAIL_HOST_PASSWORD = 'your_app_password'# 邮箱授权码（非登录密码，需在邮箱设置中获取）
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER     # 默认发件人

# 备份邮件接收者（可配置多个）
BACKUP_EMAIL_RECIPIENTS = ['recipient1@example.com', 'recipient2@example.com']

# --------------------------
# 5. 备份目录配置（可选，统一管理）
# --------------------------
BACKUP_DIR = '/path/to/your/backups'      # 备份文件存储目录（需手动创建并授权）
```

邮箱授权码获取：以 QQ 邮箱为例，登录后进入「设置 → 账户 → 开启 SMTP 服务」，按提示获取授权码；阿里云邮箱需在「工作台 → 安全设置」中开启 SMTP 并获取授权码。

## 2.2 Celery 实例初始化（celery.py）

在项目根目录（与 manage.py 同级）创建 celery.py，实现 Celery 初始化和任务调度。

```python

#!/usr/bin/env python3
# -*- coding:utf-8 -*-
from __future__ import absolute_import, unicode_literals

import os
import sys
from celery import Celery
from celery.schedules import crontab
from django.utils import timezone

# --------------------------
# 可靠的项目路径定位
# --------------------------
current_file_path = os.path.abspath(__file__)
project_root = os.path.dirname(current_file_path)
sys.path.append(project_root)
project_name = os.path.basename(project_root)
project_settings = f"{project_name}.settings"

# --------------------------
# 环境变量设置
# --------------------------
os.environ.setdefault(
    'DJANGO_SETTINGS_MODULE',
    os.environ.get('DJANGO_SETTINGS_MODULE', project_settings)
)

# --------------------------
# Celery 实例初始化
# --------------------------
app = Celery(project_name)
app.now = timezone.now
# 从 Django 配置加载 Celery 参数（前缀 CELERY_）
app.config_from_object('django.conf:settings', namespace='CELERY')
# 自动发现所有应用中的 tasks.py
app.autodiscover_tasks()

# --------------------------
# 定时任务配置（二选一，或按需配置）
# --------------------------
# 方案一：mysqldump 原生备份（每天凌晨 3 点执行）
app.conf.beat_schedule = {
    'daily-mysql-backup-mysqldump': {
        'task': 'myapp.tasks.backup_mysql_mysqldump',
        'schedule': crontab(hour=3, minute=0),
        'args': (os.environ.get('BACKUP_DIR', '/path/to/backups'),),
    },
}

# # 方案二：Django dumpdata 备份（每天凌晨 3 点 10 分执行）
# app.conf.beat_schedule = {
#     'daily-mysql-backup-dumpdata': {
#         'task': 'myapp.tasks.backup_mysql_dumpdata',
#         'schedule': crontab(hour=3, minute=10),
#         'args': (os.environ.get('BACKUP_DIR', '/path/to/backups'),),
#     },
# }

# --------------------------
# 调试任务（可选）
# --------------------------
@app.task(bind=True, ignore_result=True)
def debug_task(self):
    print(f"Task ID: {self.request.id}")
    print(f"Task Args: {self.request.args}")

# --------------------------
# 启动帮助信息
# --------------------------
def print_help():
    help_text = f"""
    Celery 服务启动命令参考:
    1. 启动 Worker（开发环境）:  celery -A {project_name} worker -l info
    2. 启动 Beat（定时任务调度器）:  celery -A {project_name} beat -l info
    3. 同时启动 Worker 和 Beat（开发环境）:  celery -A {project_name} worker -B -l info
    4. 守护进程启动（生产环境）:  celery multi start w1 -A {project_name} -l info
    5. 停止守护进程:  celery multi stop w1 -A {project_name}
    6. 重启守护进程:  celery multi restart w1 -A {project_name} -l info
    """
    print(help_text)

if __name__ == '__main__':
    print_help()
```

# 三、备份任务实现（tasks.py）

在 Django 应用（如 myapp）中创建 tasks.py，实现两种备份方案的核心逻辑，包含备份、压缩、邮件发送、旧文件清理。

## 3.1 方案一：mysqldump 原生备份（推荐生产环境）

基于 MySQL 原生工具 mysqldump，备份完整的数据库结构和数据，体积小、恢复效率高，适用于生产环境。

```python

import os
import subprocess
import gzip
import time
import glob
from datetime import datetime
from celery import shared_task
from django.conf import settings
from django.core.mail import EmailMessage

@shared_task(bind=True, max_retries=3)
def backup_mysql_mysqldump(self, backup_dir):
    """
    MySQL 备份流程：mysqldump 备份 → gzip 压缩 → 邮件发送 → 旧文件清理
    :param backup_dir: 备份文件存储目录
    """
    # 1. 初始化参数
    os.makedirs(backup_dir, exist_ok=True)
    db = settings.DATABASES['default']
    db_name = db['NAME']
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    sql_file = f"{backup_dir}/{db_name}_{timestamp}.sql"
    gz_file = f"{sql_file}.gz"  # 压缩后文件名

    try:
        # 2. mysqldump 备份数据库（环境变量传密码，避免明文暴露）
        env = os.environ.copy()
        env['MYSQL_PWD'] = db['PASSWORD']
        cmd = (
            f"mysqldump --host={db.get('HOST', 'localhost')} "
            f"--port={db.get('PORT', '3306')} --user={db['USER']} {db_name} "
            f"> {sql_file}"
        )
        subprocess.check_call(cmd, shell=True, env=env)
        print(f"mysqldump 备份完成：{sql_file}")

        # 3. gzip 压缩备份文件
        with open(sql_file, 'rb') as f_in, gzip.open(gz_file, 'wb') as f_out:
            f_out.writelines(f_in)
        os.remove(sql_file)  # 删除原始 SQL 文件，节省空间
        print(f"文件压缩完成：{gz_file}")

        # 4. 发送邮件（带压缩附件）
        subject = f"【MySQL 备份通知】{db_name}_{timestamp}"
        file_size = os.path.getsize(gz_file) / 1024 / 1024  # 转换为 MB
        body = f"""
        数据库备份已完成，详情如下：
        - 数据库名：{db_name}
        - 备份方式：mysqldump 原生备份
        - 备份时间：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        - 附件大小：{file_size:.2f} MB
        - 恢复命令：gunzip {os.path.basename(gz_file)} && mysql -u {db['USER']} -p {db_name} < {os.path.basename(sql_file)}
        """
        email = EmailMessage(
            subject=subject,
            body=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=settings.BACKUP_EMAIL_RECIPIENTS
        )
        with open(gz_file, 'rb') as f:
            email.attach(os.path.basename(gz_file), f.read(), 'application/gzip')
        email.send()
        print(f"备份邮件已发送至：{settings.BACKUP_EMAIL_RECIPIENTS}")

        # 5. 清理旧备份（保留最近 30 天，可调整）
        for old_file in glob.glob(f"{backup_dir}/*.sql.gz"):
            if os.path.getmtime(old_file) < time.time() - 30 * 24 * 3600:
                os.remove(old_file)
                print(f"已删除旧备份：{old_file}")

        return f"mysqldump 备份成功：{gz_file}"

    except subprocess.CalledProcessError as e:
        self.retry(exc=e, countdown=60)  # 命令执行失败，1 分钟后重试
    except Exception as e:
        self.retry(exc=e, countdown=60)  # 其他错误，1 分钟后重试
```

## 3.2 方案二：Django dumpdata 备份（推荐跨库迁移场景）

基于 Django 内置命令 dumpdata，备份 ORM 管理的模型数据（JSON 格式），跨数据库兼容，适用于开发测试环境或跨库迁移场景。

```python

import os
import subprocess
import gzip
import time
import glob
from datetime import datetime
from celery import shared_task
from django.conf import settings
from django.core.mail import EmailMessage

@shared_task(bind=True, max_retries=3)
def backup_mysql_dumpdata(self, backup_dir):
    """
    MySQL 备份流程：dumpdata 备份 → gzip 压缩 → 邮件发送 → 旧文件清理
    :param backup_dir: 备份文件存储目录
    """
    # 1. 初始化参数
    os.makedirs(backup_dir, exist_ok=True)
    db_name = settings.DATABASES['default']['NAME']
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    json_file = f"{backup_dir}/dump_{db_name}_{timestamp}.json"
    gz_file = f"{json_file}.gz"  # 压缩后文件名

    try:
        # 2. dumpdata 备份数据（排除系统模型，避免恢复冲突）
        exclude_models = [
            'contenttypes.contenttype',
            'auth.permission',
            'sessions.session',
            'admin.logentry',
            'django_celery_beat.periodictask'  # 排除定时任务配置
        ]
        exclude_args = ' '.join([f"--exclude {model}" for model in exclude_models])
        cmd = (
            f"python manage.py dumpdata {exclude_args} --indent 2 "
            f"> {json_file}"
        )
        subprocess.check_call(cmd, shell=True, cwd=settings.BASE_DIR)
        print(f"dumpdata 备份完成：{json_file}")

        # 3. gzip 压缩备份文件
        with open(json_file, 'rb') as f_in, gzip.open(gz_file, 'wb') as f_out:
            f_out.writelines(f_in)
        os.remove(json_file)  # 删除原始 JSON 文件
        print(f"文件压缩完成：{gz_file}")

        # 4. 发送邮件（带压缩附件）
        subject = f"【Django 数据备份通知】{db_name}_{timestamp}"
        file_size = os.path.getsize(gz_file) / 1024 / 1024  # 转换为 MB
        body = f"""
        数据备份已完成，详情如下：
        - 数据库名：{db_name}
        - 备份方式：Django dumpdata 备份
        - 备份时间：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        - 附件大小：{file_size:.2f} MB
        - 恢复命令：gunzip {os.path.basename(gz_file)} && python manage.py loaddata {os.path.basename(json_file)}
        """
        email = EmailMessage(
            subject=subject,
            body=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=settings.BACKUP_EMAIL_RECIPIENTS
        )
        with open(gz_file, 'rb') as f:
            email.attach(os.path.basename(gz_file), f.read(), 'application/gzip')
        email.send()
        print(f"备份邮件已发送至：{settings.BACKUP_EMAIL_RECIPIENTS}")

        # 5. 清理旧备份（保留最近 30 天，可调整）
        for old_file in glob.glob(f"{backup_dir}/*.json.gz"):
            if os.path.getmtime(old_file) < time.time() - 30 * 24 * 3600:
                os.remove(old_file)
                print(f"已删除旧备份：{old_file}")

        return f"dumpdata 备份成功：{gz_file}"

    except subprocess.CalledProcessError as e:
        self.retry(exc=e, countdown=60)  # 命令执行失败，1 分钟后重试
    except Exception as e:
        self.retry(exc=e, countdown=60)  # 其他错误，1 分钟后重试
```

# 四、Supervisord 配置（后台运行）

通过 Supervisord 托管 Celery Worker 和 Beat 进程，实现自动启动、崩溃重启、日志管理，确保服务稳定运行。

## 4.1 准备目录与权限

```bash

# 1. 创建 Celery 日志目录（存储 Worker 和 Beat 日志）
sudo mkdir -p /var/log/celery
sudo chown -R $USER:$USER /var/log/celery  # 授权当前用户

# 2. 创建备份目录（与 settings.py 中 BACKUP_DIR 一致）
sudo mkdir -p /path/to/your/backups
sudo chown -R $USER:$USER /path/to/your/backups
```

## 4.2 编写 Supervisord 配置文件

在 `/etc/supervisor/conf.d/` 目录下创建 `celery_django.conf`，内容如下：

```ini

[program:celery_worker]
# 环境变量（需替换为实际项目路径和虚拟环境路径）
environment=
    PATH="/path/to/your/django/project/venv/bin",
    DJANGO_SETTINGS_MODULE="your_project.settings",
    PYTHONPATH="/path/to/your/django/project",
    BACKUP_DIR="/path/to/your/backups",
    REDIS_HOST="localhost",
    REDIS_PORT="6379"
# 启动命令（虚拟环境路径需替换）
command=/path/to/your/django/project/venv/bin/celery -A your_project worker --loglevel=info
# 项目根目录
directory=/path/to/your/django/project
# 运行用户（建议非 root 用户，如 ubuntu）
user=your_username
# 进程管理配置
autostart=true          # 随 Supervisord 启动
autorestart=true        # 进程崩溃后自动重启
startretries=3          # 启动失败重试 3 次
redirect_stderr=true    # 错误日志重定向到 stdout
stdout_logfile=/var/log/celery/worker.log  # Worker 日志路径
stdout_logfile_maxbytes=10MB  # 单个日志文件大小限制
stdout_logfile_backups=10     # 日志备份数量

[program:celery_beat]
# 环境变量（与 Worker 一致）
environment=
    PATH="/path/to/your/django/project/venv/bin",
    DJANGO_SETTINGS_MODULE="your_project.settings",
    PYTHONPATH="/path/to/your/django/project",
    BACKUP_DIR="/path/to/your/backups",
    REDIS_HOST="localhost",
    REDIS_PORT="6379"
# 启动命令（虚拟环境路径需替换）
command=/path/to/your/django/project/venv/bin/celery -A your_project beat --loglevel=info
# 项目根目录
directory=/path/to/your/django/project
# 运行用户
user=your_username
# 进程管理配置
autostart=true
autorestart=true
startretries=3
redirect_stderr=true
stdout_logfile=/var/log/celery/beat.log   # Beat 日志路径
stdout_logfile_maxbytes=10MB
stdout_logfile_backups=10
```

替换说明：将配置中的 `your_project` 替换为实际项目名，`/path/to/your/django/project` 替换为项目根目录路径，`your_username` 替换为实际运行用户（如 ubuntu）。

## 4.3 启动与管理 Supervisord 服务

```bash

# 1. 重新加载 Supervisord 配置（新增/修改配置后必须执行）
sudo supervisorctl reread
sudo supervisorctl update

# 2. 查看进程状态（验证是否启动成功）
sudo supervisorctl status
# 成功状态示例：
# celery_worker                   RUNNING   pid 12345, uptime 0:01:23
# celery_beat                     RUNNING   pid 12346, uptime 0:01:23

# 3. 手动控制进程（启动/停止/重启）
sudo supervisorctl start celery_worker  # 启动 Worker
sudo supervisorctl stop celery_beat    # 停止 Beat
sudo supervisorctl restart celery_worker celery_beat  # 重启两者

# 4. 查看日志（排查问题时使用）
tail -f /var/log/celery/worker.log  # 实时查看 Worker 日志
tail -f /var/log/celery/beat.log   # 实时查看 Beat 日志

# 5. 重载 Supervisord 服务（配置文件修改后也可执行）
sudo supervisorctl reload
```

# 五、验证与测试

## 5.1 手动触发任务测试

在项目虚拟环境中通过 Django Shell 手动触发备份任务，验证流程是否正常。

```bash

# 进入项目根目录并激活虚拟环境
cd /path/to/your/django/project
source venv/bin/activate

# 进入 Django Shell
python manage.py shell

# 测试方案一：mysqldump 备份
>>> from myapp.tasks import backup_mysql_mysqldump
>>> result = backup_mysql_mysqldump.delay('/path/to/your/backups')
>>> result.status  # 查看任务状态，成功为 'SUCCESS'
>>> result.result  # 查看任务结果

# 测试方案二：dumpdata 备份
>>> from myapp.tasks import backup_mysql_dumpdata
>>> result = backup_mysql_dumpdata.delay('/path/to/your/backups')
>>> result.status
```

## 5.2 结果验证

1. **备份文件验证**：进入备份目录，查看是否生成 `.sql.gz`（mysqldump）或 `.json.gz`（dumpdata）文件。

2. **邮件验证**：查看收件邮箱，确认收到带附件的备份通知邮件，附件可正常解压。

3. **日志验证**：查看 Celery 日志，确认无错误信息。

## 5.3 恢复测试（重要）

定期进行恢复测试，确保备份文件可用。

### 5.3.1 mysqldump 备份恢复

```bash

# 1. 解压备份文件
gunzip your_db_name_20251029_030000.sql.gz

# 2. 导入数据库（需输入密码）
mysql -u your_db_user -p your_db_name < your_db_name_20251029_030000.sql
```

### 5.3.2 dumpdata 备份恢复

```bash

# 1. 解压备份文件
gunzip dump_your_db_name_20251029_031000.json.gz

# 2. 导入数据（Django 命令）
python manage.py loaddata dump_your_db_name_20251029_031000.json
```

# 六、两种备份方案对比与选型

|对比维度|mysqldump 原生备份|Django dumpdata 备份|
|---|---|---|
|备份内容|完整数据库（表结构、索引、数据、约束）|仅 ORM 模型数据（JSON 格式，无表结构）|
|兼容性|仅适用于 MySQL/MariaDB|跨数据库（支持 MySQL→PostgreSQL→SQLite 等）|
|文件体积|较小（原生 SQL 压缩率高）|较大（JSON 格式冗余）|
|恢复效率|高（原生 MySQL 导入）|中（Django ORM 逐行插入）|
|依赖|需安装 mysql-client|仅依赖 Django 环境|
|适用场景|生产环境完整备份、灾难恢复|开发/测试环境数据迁移、轻量备份|
选型建议：生产环境优先使用 **mysqldump 方案**，确保备份完整性和恢复效率；开发测试环境或需要跨数据库迁移时，使用 **dumpdata 方案**。

# 七、常见问题与排查

## 7.1 Celery 进程启动失败

- **问题现象**：`sudo supervisorctl status` 显示进程为 `FATAL` 或 `STOPPED`。

- **排查步骤**：
            查看日志：`tail -f /var/log/celery/worker.log`，定位错误信息。

- 检查虚拟环境路径：确保配置文件中 `command` 中的 Celery 路径正确。

- 检查 Redis 状态：确保 Redis 正常运行，可通过 `redis-cli ping` 验证。

- 检查权限：确保日志目录和备份目录有读写权限。

## 7.2 备份文件为空或大小异常

- **问题现象**：备份目录生成空文件，或文件大小远小于实际数据库大小。

- **排查步骤**：
            检查数据库账号权限：确保配置的数据库用户有 `SELECT` 和 `LOCK TABLES` 权限。

- 手动执行备份命令：在终端执行 tasks.py 中的备份命令，查看是否报错。

- 检查 mysqldump 路径：确保 `mysqldump` 命令可正常执行（`which mysqldump` 查看路径）。

## 7.3 邮件发送失败

- **问题现象**：备份文件生成成功，但未收到邮件。

- **排查步骤**：
            查看 Celery 日志：确认是否有邮件发送相关错误（如 SMTP 认证失败）。
> （注：文档部分内容可能由 AI 生成）