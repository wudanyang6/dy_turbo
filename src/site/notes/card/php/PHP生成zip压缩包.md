---
{"dg-publish":true,"permalink":"/card/php/PHP生成zip压缩包/","tags":["php","压缩"],"noteIcon":"2","created":"2021-11-23T14:16:24+08:00","updated":"2024-10-20T17:53:15+08:00"}
---


# PHP生成zip压缩包

## 1 将文件压缩成zip格式

``` php
<?php
$path = "file.txt";
$filename = "file.zip";

$zip = new ZipArchive();
$zip->open($filename, ZipArchive::CREATE); //打开压缩包
$zip->addFile($path, basename($path)); //向压缩包中添加文件
$zip->close(); //关闭压缩包
```
