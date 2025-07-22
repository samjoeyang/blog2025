---
title: 超详细教程：Django 实时通知系统全栈集成方案
date: 2025-07-22 09:42:03
tags: [Django, 实时通知, WebSocket, Channels, Mailgun, Celery, 全栈开发, Python, Web开发, 教程]
---


在现代 Web 应用中，实时通知系统是提升用户体验的关键功能。本文将带你一步步实现一个完整的 Django 实时通知系统，涵盖站内通知、邮件推送、WebSocket 实时消息等多种通知方式，通过 `channels`、`django-notifications-hq`、`django-anymail` 和 Mailgun 的深度集成，构建一个高性能、可扩展的通知解决方案。


## 一、系统架构概述

我们将构建的通知系统包含以下核心组件：

- **Django**：作为主框架，处理业务逻辑和数据存储。
- **channels**：提供 WebSocket 支持，实现实时消息推送。
- **django-notifications-hq**：管理站内通知，存储通知数据并提供查询接口。
- **django-anymail + Mailgun**：实现邮件通知，确保高送达率。
- **Redis**：作为 channels 的消息队列和缓存，支持多服务器部署。

系统工作流程：
1. 用户触发通知事件（如评论、点赞）。
2. `django-notifications-hq` 将通知存储到数据库。
3. 通过 channels 的 WebSocket 实时推送给在线用户。
4. 同时通过 `django-anymail` 和 Mailgun 发送邮件通知。


## 二、环境准备与安装

### 1. 安装必要的 Python 包
```bash
pip install channels django-notifications-hq django-anymail redis websockets
```

### 2. 安装并启动 Redis 服务
```bash
# Ubuntu/Debian
sudo apt-get install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server  # 设置开机自启

# macOS (通过 Homebrew)
brew install redis
brew services start redis
```

### 3. 注册 Mailgun 账号
1. 访问 [Mailgun 官网](https://www.mailgun.com/) 注册账号。
2. 添加并验证发件域名（如 `mg.yourdomain.com`），配置 DNS 记录。
3. 获取 API 密钥（`key-xxxxxxxxxxxx`）和 SMTP 凭据。


## 三、Django 项目配置

### 1. 修改 settings.py

```python
# settings.py

# 添加应用
INSTALLED_APPS = [
    # ... 现有应用
    'channels',  # 添加 channels
    'notifications',  # 添加 django-notifications-hq
    'anymail',  # 添加 django-anymail
    'your_app',  # 你的应用
]

# 配置 channels
ASGI_APPLICATION = 'your_project.asgi.application'  # 指定 ASGI 应用

# 配置 Redis 作为 channels 的通道层
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("127.0.0.1", 6379)],  # Redis 地址和端口
        },
    },
}

# 配置 Mailgun 邮件服务
ANYMAIL = {
    "MAILGUN_API_KEY": "your-mailgun-api-key",  # Mailgun API 密钥
    "MAILGUN_SENDER_DOMAIN": "mg.yourdomain.com",  # 发件域名
}
EMAIL_BACKEND = "anymail.backends.mailgun.EmailBackend"
DEFAULT_FROM_EMAIL = "通知系统 <notifications@mg.yourdomain.com"

# 配置 django-notifications-hq
NOTIFICATIONS_BACKENDS = [
    'notifications.backends.db.DatabaseBackend',  # 存储通知到数据库
    'your_app.backends.EmailNotificationBackend',  # 自定义邮件后端（稍后创建）
]
```

### 2. 创建 ASGI 应用
在项目根目录创建 `asgi.py`：

```python
# asgi.py
import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": # 稍后添加 WebSocket 路由配置
})
```


## 四、配置 django-notifications-hq

### 1. 创建自定义邮件后端
在你的应用目录下创建 `backends.py`：

```python
# your_app/backends.py
from django.core.mail import send_mail
from notifications.backends.base import BaseBackend

class EmailNotificationBackend(BaseBackend):
    def send(self, notification, *args, **kwargs):
        recipient = notification.recipient
        subject = f"【新通知】{notification.verb}"
        message = (
            f"你好，{recipient.username}！\n\n"
            f"{notification.description}\n\n"
            f"点击查看：https://yourdomain.com/notifications/"
        )
        
        # 异步发送邮件（使用 Celery 更佳，这里简化处理）
        send_mail(
            subject=subject,
            message=message,
            from_email=None,
            recipient_list=[recipient.email],
            fail_silently=False,
        )
```

### 2. 执行数据库迁移
```bash
python manage.py migrate
```


## 五、配置 channels 实现实时通知

### 1. 创建 WebSocket 消费者
在你的应用目录下创建 `consumers.py`：

```python
# your_app/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from django.contrib.auth.models import User

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # 验证用户身份
        user = self.scope["user"]
        if user.is_anonymous:
            await self.close()
            return
            
        # 为每个用户创建独立的组
        self.group_name = f"user_{user.id}_notifications"
        
        # 将用户添加到组
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        
        await self.accept()
        
        # 发送用户的未读通知数量
        unread_count = await self.get_unread_count(user)
        await self.send(text_data=json.dumps({
            "type": "unread_count",
            "count": unread_count
        }))
    
    async def disconnect(self, close_code):
        # 从组中移除用户
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )
    
    # 接收来自组的消息
    async def notify_message(self, event):
        message = event["message"]
        await self.send(text_data=json.dumps({
            "type": "notification",
            "data": message
        }))
    
    # 同步方法转异步
    @sync_to_async
    def get_unread_count(self, user):
        return user.notifications.unread().count()
```

### 2. 配置 WebSocket 路由
在你的应用目录下创建 `routing.py`：

```python
# your_app/routing.py
from django.urls import re_path
from .consumers import NotificationConsumer

websocket_urlpatterns = [
    re_path(r'ws/notifications/$', NotificationConsumer.as_asgi()),
]
```

### 3. 更新 ASGI 应用配置
修改项目根目录的 `asgi.py`：

```python
# asgi.py
import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import your_app.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            your_app.routing.websocket_urlpatterns
        )
    ),
})
```


## 六、实现通知触发机制

### 1. 创建信号处理
在你的应用目录下创建 `signals.py`：

```python
# your_app/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from notifications.models import Notification
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

@receiver(post_save, sender=Notification)
def send_notification_to_websocket(sender, instance, created, **kwargs):
    if created:  # 只处理新创建的通知
        recipient = instance.recipient
        channel_layer = get_channel_layer()
        
        # 构建通知数据
        notification_data = {
            "id": instance.id,
            "verb": instance.verb,
            "description": instance.description,
            "timestamp": instance.timestamp.isoformat(),
            "unread": instance.unread,
        }
        
        # 异步发送到 WebSocket 组
        async_to_sync(channel_layer.group_send)(
            f"user_{recipient.id}_notifications",
            {
                "type": "notify_message",
                "message": notification_data
            }
        )
```

### 2. 注册信号
在你的应用的 `apps.py` 中注册信号：

```python
# your_app/apps.py
from django.apps import AppConfig

class YourAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'your_app'
    
    def ready(self):
        import your_app.signals  # 导入信号处理
```


## 七、前端实现

### 1. 连接 WebSocket
在前端模板中添加 WebSocket 连接代码：

```javascript
// templates/base.html 或其他模板
<script>
document.addEventListener('DOMContentLoaded', function() {
    // 检查用户是否已登录
    if (window.user_id) {
        // 建立 WebSocket 连接
        const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${wsProtocol}//${window.location.host}/ws/notifications/`;
        const socket = new WebSocket(wsUrl);
        
        // 连接成功
        socket.onopen = function(e) {
            console.log('WebSocket 连接成功');
        };
        
        // 接收消息
        socket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            if (data.type === 'unread_count') {
                updateNotificationCount(data.count);
            } else if (data.type === 'notification') {
                addNewNotification(data.data);
                updateNotificationCount(data.count);
            }
        };
        
        // 连接关闭
        socket.onclose = function(e) {
            console.log('WebSocket 连接关闭，尝试重连...');
            setTimeout(() => {
                document.addEventListener('DOMContentLoaded', function() {});
            }, 3000);
        };
    }
    
    // 更新通知计数
    function updateNotificationCount(count) {
        const countElement = document.getElementById('notification-count');
        if (countElement) {
            countElement.textContent = count;
            if (count > 0) {
                countElement.classList.remove('hidden');
            } else {
                countElement.classList.add('hidden');
            }
        }
    }
    
    // 添加新通知到列表
    function addNewNotification(notification) {
        const notificationsList = document.getElementById('notifications-list');
        if (notificationsList) {
            // 创建新通知元素并添加到列表
            const notificationElement = document.createElement('div');
            notificationElement.className = 'notification-item unread';
            notificationElement.innerHTML = `
                <a href="${notification.url}">
                    <span>${notification.verb}</span>
                    <span class="timestamp">${notification.timestamp}</span>
                </a>
            `;
            notificationsList.prepend(notificationElement);
        }
    }
});
</script>
```

### 2. 在模板中显示通知
```html
<!-- 通知图标和计数 -->
<div class="notification-icon">
    <i class="fa fa-bell"></i>
    <span id="notification-count" class="hidden">0</span>
</div>

<!-- 通知下拉列表 -->
<div id="notifications-list">
    <!-- 通知将通过 JavaScript 动态添加 -->
</div>
```


## 八、测试与验证

### 1. 启动开发服务器和 channels worker
```bash
# 启动 Django 开发服务器
python manage.py runserver

# 启动 channels worker（处理异步任务）
python manage.py runworker
```

### 2. 发送测试通知
在视图或 shell 中测试通知发送：

```python
# 在 Django shell 中测试
from django.contrib.auth.models import User
from notifications import notify

sender = User.objects.get(username='admin')
recipient = User.objects.get(username='test_user')

notify.send(
    sender=sender,
    recipient=recipient,
    verb='发送了一条消息给你',
    description='请查看消息详情'
)
```

### 3. 验证结果
1. **数据库**：检查 `notifications_notification` 表是否有新记录。
2. **WebSocket**：打开浏览器控制台，查看是否收到实时通知。
3. **邮件**：检查收件箱是否收到通知邮件。


## 九、性能优化与扩展

### 1. 使用 Celery 处理异步任务
将邮件发送和 WebSocket 推送改为异步任务：

```bash
pip install celery redis
```

配置 Celery：

```python
# your_project/celery.py
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project.settings')

app = Celery('your_project')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
```

修改信号处理：

```python
# your_app/signals.py
from .tasks import send_notification_to_websocket

@receiver(post_save, sender=Notification)
def trigger_notification_tasks(sender, instance, created, **kwargs):
    if created:
        send_notification_to_websocket.delay(instance.id)
```

创建异步任务：

```python
# your_app/tasks.py
from celery import shared_task
from notifications.models import Notification
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

@shared_task
def send_notification_to_websocket(notification_id):
    try:
        notification = Notification.objects.get(id=notification_id)
        recipient = notification.recipient
        channel_layer = get_channel_layer()
        
        # 发送到 WebSocket
        async_to_sync(channel_layer.group_send)(
            f"user_{recipient.id}_notifications",
            {
                "type": "notify_message",
                "message": {
                    "id": notification.id,
                    "verb": notification.verb,
                    "description": notification.description,
                    "timestamp": notification.timestamp.isoformat(),
                }
            }
        )
    except Notification.DoesNotExist:
        pass
```

### 2. 配置邮件模板
创建 HTML 邮件模板：

```html
<!-- templates/email_notification.html -->
<!DOCTYPE html>
<html>
<head>
    <style>
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f5f5f5; padding: 15px; text-align: center; }
        .content { padding: 20px; border: 1px solid #eee; }
        .footer { margin-top: 20px; text-align: center; color: #888; }
        .btn { display: inline-block; background: #007bff; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>新通知</h2>
        </div>
        <div class="content">
            <p>你好，{{ user.username }}！</p>
            <p>{{ description }}</p>
            <p><a href="{{ url }}" class="btn">查看详情</a></p>
        </div>
        <div class="footer">
            <p>你可以在设置中调整通知偏好</p>
        </div>
    </div>
</body>
</html>
```

修改邮件后端：

```python
# your_app/backends.py
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

class EmailNotificationBackend(BaseBackend):
    def send(self, notification, *args, **kwargs):
        recipient = notification.recipient
        subject = f"【新通知】{notification.verb}"
        
        # 渲染 HTML 模板
        html_content = render_to_string('email_notification.html', {
            'user': recipient,
            'description': notification.description,
            'url': f'https://yourdomain.com/notifications/{notification.id}/'
        })
        
        # 发送邮件
        msg = EmailMultiAlternatives(
            subject=subject,
            body=notification.description,  # 纯文本备用
            to=[recipient.email]
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send()
```


## 十、常见问题排查

### 1. WebSocket 连接失败
- 检查 Redis 服务是否正常运行：`redis-cli ping` 应返回 `PONG`。
- 确认 `CHANNEL_LAYERS` 配置正确，Redis 地址和端口无误。
- 检查浏览器控制台错误信息，可能是跨域问题或路径错误。

### 2. 邮件发送失败
- 验证 Mailgun API 密钥和发件域名是否正确。
- 检查 Mailgun 控制台的日志，查看具体错误原因。
- 确认接收者邮箱地址有效，无拼写错误。

### 3. 通知未触发
- 检查信号处理是否正确注册，`apps.py` 中的 `ready()` 方法是否导入信号模块。
- 验证 `NOTIFICATIONS_BACKENDS` 配置是否包含你的自定义后端。


## 总结

通过本文的完整方案，你已成功构建了一个功能全面的 Django 实时通知系统，包括：

1. **站内通知**：使用 `django-notifications-hq` 存储和管理通知。
2. **实时推送**：通过 `channels` 和 WebSocket 实现即时消息推送。
3. **邮件通知**：集成 `django-anymail` 和 Mailgun 确保高送达率。
4. **异步处理**：利用 Redis 和 Celery 提升系统性能。

这个系统具有良好的扩展性，你可以根据需求添加更多通知渠道（如短信、APP 推送），或定制更复杂的通知规则和用户偏好设置。
希望本文能帮助你快速上手 Django 实时通知系统的开发。如果你有任何问题或建议，欢迎在评论区交流讨论！
