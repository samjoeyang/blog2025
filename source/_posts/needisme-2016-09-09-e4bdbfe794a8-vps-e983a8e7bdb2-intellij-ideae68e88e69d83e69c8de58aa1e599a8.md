---
title: "使用 VPS 部署 IntelliJ IDEA授权服务器"
date: 2016-09-09 19:49:26
categories: NeedIsMe
tags: ["Nginx", "Linux", "Google"]
---

<h1 class="post-title">Step 1</h1>
<div class="post-content">
<p>下载用于授权的文件<a href="https://drive.google.com/file/d/0Bx7wGDIg2K-7MlA3RndvanJKaTQ/view?usp=sharing">https://drive.google.com/file/d/0Bx7wGDIg2K-7MlA3RndvanJKaTQ/view?usp=sharing</a></p>
<h3>Step 2</h3>
<p>找到自己操作系统的版本，我这里使用<code>IntelliJIDEALicenseServer_linux_amd64</code>，上传到 VPS（如 <code>/root</code> 路径下）</p>
<h3>Step 3</h3>
<p>运行 <code>nohup ./root/IntelliJIDEALicenseServer_linux_amd64 -p 1017 > /dev/null 2>&amp;1 &amp;</code>，即可后台启动认证程序。其中 <code>-p port</code> 命令用于设置监听的端口，激活时会用到。</p>
<h3>Step 4</h3>
<p>如果想要开机自动启动程序，在 <code>/etc/rc.local</code> 的 <code>exit 0</code> 前加入第3步的命令即可</p>
<h3>Step 5</h3>
<p>运行 IntelliJ IDEA, 在激活界面中选择 <code>License server</code>, <code>License server address</code> 中填入 <code>http://你的vpsip:端口</code>, 点击 OK 即可激活。</p>
<h3>Step 6</h3>
<p>如果有个人的域名绑定到 VPS 上，可以使用 Nginx 反向代理，这样可以省去 <code>License server address</code> 中的端口。Nginx 配置大致如下：</p>
<pre><code class="language-nginx">server{  
    listen 80;  
    server_name 你的域名;  

    location / {  
        proxy_set_header X-Real-IP $remote_addr;  
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  
        proxy_set_header Host $http_host;  
        proxy_set_header X-NginX-Proxy true;  
        proxy_pass http://127.0.0.1:端口/;  
        proxy_redirect off;  
    }
}
</code></pre>
<p>重启 Nginx，搞定！！！</p>
</div>

---

[📚 返回目录](/needisme-mu-lu/)
