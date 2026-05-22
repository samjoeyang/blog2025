---
title: "【刷机模式介绍】Android Recovery模式！！"
date: 2009-11-19 16:45:00
categories: NeedIsMe
tags: ["Android", "Google", "PHP"]
---

<p>Recovery简介<br />
Android利用Recovery模式，进行恢复出厂设置，OTA升级，patch升级及firmware升级。<br />
升级一般通过运行升级包中的META-INF/com/google/android/update-script脚本来执行自定义升级，脚本中是一组recovery系统能识别的UI控制，文件系统操作命令，例如write_raw_image（写FLASH分区），copy_dir（复制目录）。该包一般被下载至SDCARD和CACHE分区下。如果对该包内容感兴趣，可以从<a href="http://forum.xda-developers.com/showthread.php?t=442480">http://forum.xda-developers.com/showthread.php?t=442480</a>下载JF升级包来看看。<br />
升级中还涉及到包的数字签名，签名方式和普通JAR文件签名差不错。公钥会被硬编译入recovery，编译时生成在：out/target/product/XX/obj/PACKAGING/ota_keys_inc_intermediates/keys.inc<br />
G1中的三种启动模式MAGIC KEY:<br />
camera + power：bootloader模式，ADP里则可以使用fastboot模式<br />
home + power：recovery模式<br />
正常启动<br />
Bootloader正常启动，又有三种方式，按照BCB（Bootloader Control Block, 下节介绍）中的command分类：<br />
command == 'boot-recovery' &rarr; 启动recovery.img。recovery模式<br />
command == 'update-radio/hboot' &rarr; 更新firmware（bootloader)<br />
其他 &rarr; 启动boot.img<br />
Recovery涉及到的其他系统及文件<br />
CACHE分区文件<br />
Recovery 工具通过NAND<br />
cache分区上的三个文件和主系统打交道。主系统（包括恢复出厂设置和OTA升级）可以写入recovery所需的命令，读出recovery过程中的LOG和intent。<br />
/cache/recovery/command： recovery命令，由主系统写入。所有命令如下：<br />
--send_intent=anystring - write the text out to recovery.intent<br />
--update_package=root:path - verify install an OTA package file<br />
--wipe_data - erase user data (and cache), then reboot<br />
--wipe_cache - wipe cache (but not user data), then reboot<br />
/cache/recovery/log：recovery过程日志，由主系统读出<br />
/cache/recovery/intent：recovery输出的intent<br />
MISC分区内容Bootloader Control Block (BCB) 存放recovery bootloader message。结构如下：<br />
struct bootloader_message {<br />
char command[32];<br />
char status[32]; // 未知用途<br />
char recovery[1024];<br />
};<br />
command可以有以下两个值<br />
"boot-recovery"：标示recovery正在进行，或指示bootloader应该进入recovery mode<br />
"update-hboot/radio"：指示bootloader更新firmware<br />
recovery内容<br />
"recovery\n<br />
<recovery command>\n<br />
<recovery command>"<br />
其中recovery command为CACHE:/recovery/command命令</p>
<p>两种Recovery Case<br />
FACTORY RESET（恢复出厂设置）<br />
用户选择"恢复出厂设置"<br />
设置系统将"--wipe_data"命令写入/cache/recovery/command<br />
系统重启，并进入recover模式（/sbin/recovery）<br />
get_args() 将 "boot-recovery"和"--wipe_data"写入BCB<br />
erase_root() 格式化（擦除）DATA分区<br />
erase_root() 格式化（擦除）CACHE分区<br />
finish_recovery() 擦除BCB<br />
重启系统</p>
<p>OTA INSTALL（OTA升级）<br />
升级系统下载 OTA包到/cache/some-filename.zip<br />
升级系统写入recovery命令"--update_package=CACHE:some-filename.zip"<br />
重启，并进入recovery模式<br />
get_args() 将"boot-recovery" 和 "--update_package=..." 写入BCB<br />
install_package() 作升级<br />
finish_recovery() 擦除 BCB<br />
** 如果安装包失败 ** prompt_and_wait() 等待用户操作，选择ALT+S或ALT+W 升级或恢复出厂设置<br />
main() 调用 maybe_install_firmware_update()<br />
如果包里有hboot/radio的firmware则继续，否则返回<br />
将 "boot-recovery" 和 "--wipe_cache" 写入BCB<br />
将 firmware image写入cache分区<br />
将 "update-radio/hboot" 和 "--wipe_cache" 写入BCB<br />
重启系统<br />
bootloader自身更新firmware<br />
bootloader 将 "boot-recovery" 写入BCB<br />
erase_root() 擦除CACHE分区<br />
清除 BCB<br />
main() 调用 reboot() 重启系统</p>
<p>Recovery模式流程<br />
/init &rarr; init.rc &rarr; /sbin/recovery &rarr;<br />
main():recovery.c</p>
<p>ui_init():ui.c ［UI initialize］<br />
gr_init():minui/graphics.c ［set tty0 to graphic mode, open fb0]<br />
ev_init():minui/events.c [open /dev/input/event*]<br />
res_create_surface:minui/resource.c [create surfaces for all bitmaps<br />
used later, include icons, bmps]<br />
create 2 threads: progress/input_thread [create progress show and<br />
input event handler thread]<br />
get_args():recovery.c<br />
get_bootloader_message():bootloader.c [read mtdblock0(misc partition)<br />
2nd page for commandline]<br />
check if nand misc partition has boot message. If yes, fill argc/argv.<br />
If no, get arguments from /cache/recovery/command, and fill argc/argv.<br />
set_bootloader_message():bootloader.c [set bootloader message back to mtdblock0]<br />
Parser argv[] filled above<br />
register_update_commands():commands.c [ register all commands with<br />
name and hook function ]<br />
registerCommand():commands.c<br />
Register command with name, hook, type, cookie.<br />
Commands, e.g: assert, delete, copy_dir, symlink, write_raw_image.<br />
registerFunction():commands.c<br />
Register function with name, hook, cookie.<br />
Function, e.g: get_mark, matches, getprop, file_contains<br />
install_package():<br />
translate_root_path():roots.c [ "SYSTEM:lib" and turns it into a<br />
string like "/system/lib", translate the updater.zip path ]<br />
mzOpenZipArchive():zip.c [ open updater.zip file (uncompass) ]<br />
handle_update_package():install.c<br />
verify_jar_signature():verifier.c [ verify signature with keys.inc<br />
key; verify manifest and zip package archive ]<br />
verifySignature() [ verify the signature file: CERT.sf/rsa. ]<br />
digestEntry():verifier.c [ get SHA-1 digest of CERT.sf file ]<br />
RSA_verify(public key:keys.inc, signature:CERT.rsa, CERT.sf's<br />
digest):libc/rsa.c [ Verify a 2048 bit RSA PKCS1.5 signature against<br />
an expected SHA-1 hash. Use public key to decrypt the CERT.rsa to get<br />
original SHA digest, then compare to digest of CERT.sf ]<br />
verifyManifest() [ Get manifest SHA1-Digest from CERT.sf. Then do<br />
digest to MANIFEST.MF. Compare them ]<br />
verifyArchive() [ verify all the files in update.zip with digest<br />
listed in MANIFEST.MF ]<br />
find_update_script():install.c [ find<br />
META-INF/com/google/android/update-script updater script ]<br />
handle_update_script():install.c [ read cmds from script file, and do<br />
parser, exec ]<br />
parseAmendScript():amend.c [ call yyparse() to parse to command ]<br />
exeCommandList():install.c<br />
exeCommand():execute.c [ call command hook function ]<br />
erase DATA/CACHE partition<br />
prompt_and_wait():recovery.c [ wait for user input: 1) reboot 2)<br />
update.zip 3) wipe data ]<br />
ui_key_xxx get ALT+x keys<br />
1) do nothing<br />
2) install_package('SDCARD:update.zip')<br />
3) erase_root() &rarr; format_root_device() DATA/CACHE<br />
may_install_firmware_update():firmware.c [ remember_firmware_update()<br />
is called by write_hboot/radio_image command, it stores the bootloader<br />
image to CACHE partition, and write update-hboot/radio command to MISC<br />
partition for bootloader message to let bootloader update itself after<br />
reboot ]<br />
set_bootloader_message()<br />
write_update_for_bootloader():bootloader.c [ write firmware image into<br />
CACHE partition with update_header, busyimage and failimage ]<br />
finish_recovery():recovery.c [ clear the recovery command and prepare<br />
to boot a (hopefully working) system, copy our log file to cache as<br />
well (for the system to read), and record any intent we were asked to<br />
communicate back to the system. ]<br />
reboot()</p>
<p>Recovery模式流程图以下流程图绘制了系统从启动加载bootloader后的行为流程。</p>

---

[📚 返回目录](/needisme-mu-lu/)
