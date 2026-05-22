---
title: "WordPress代码禁用谷歌字体服务"
date: 2016-01-08 11:14:52
categories: NeedIsMe
tags: ["WordPress", "PHP"]
---

<p>通过在函数文件functions.php文件中添加以下代码禁用谷歌字体：</p>
<p>&nbsp;</p>
<blockquote>
<pre>function coolwp_remove_open_sans_from_wp_core() {
 wp_deregister_style( 'open-sans' );
 wp_register_style( 'open-sans', false );
 wp_enqueue_style('open-sans','');
}
add_action( 'init', 'coolwp_remove_open_sans_from_wp_core' );

</pre>
</blockquote>
<p>另外：插件禁用谷歌字体服务；</p>
<p>插件名称：Remove Open Sans font Link from WP core</p>
<p>插件地址：http://wordpress.org/plugins/remove-open-sans-font-from-wp-core/</p>

---

[📚 返回目录](/needisme-mu-lu/)
