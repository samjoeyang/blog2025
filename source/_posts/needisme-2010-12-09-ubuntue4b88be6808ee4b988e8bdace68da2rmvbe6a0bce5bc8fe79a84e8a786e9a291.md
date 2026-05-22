---
title: "Ubuntu下怎么转换RMVB格式的视频"
date: 2010-12-09 13:54:48
categories: NeedIsMe
tags: ["Ubuntu", "Linux"]
---

<div></div>
<p>1.安装转换软件<br />
代码:<br />
sudo apt-get install mencoder</p>
<p>2.进行转换<br />
代码:<br />
mencoder xxx.rmvb(输入视频) -ovc x264 -x264encopts bitrate=xxx(视频码率) -oac  mp3lame -lameopts abr:br=xx(音频码率) -vf  scale=xxx:-3(视频长度和视频宽度，-3表示视频宽度让程序自行调整) -o xxx.mp4(输出格式为MP4的视频)</p>
<p>3.想了解更多，自行搜索mencoder。</p>

---

[📚 返回目录](/needisme-mu-lu/)
