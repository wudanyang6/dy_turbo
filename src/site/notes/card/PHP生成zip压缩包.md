---
{"tags":["php","压缩"],"info":true,"date created":"2021-11-23T14:16:24+08:00","date modified":"2024-04-20T22:45:27+08:00","dg-publish":true,"permalink":"/card/PHP生成zip压缩包/","dgPassFrontmatter":true,"noteIcon":"2","created":"2021-11-23T14:16:24+08:00","updated":"2024-04-20T22:45:27+08:00"}
---


# PHP生成zip压缩包

## 将文件压缩成zip格式

``` php
<?php
$path = "file.txt";
$filename = "file.zip";

$zip = new ZipArchive();
$zip->open($filename, ZipArchive::CREATE); //打开压缩包
$zip->addFile($path, basename($path)); //向压缩包中添加文件
$zip->close(); //关闭压缩包
```
