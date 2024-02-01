---
{"dg-publish":true,"permalink":"/card/PHP生成zip压缩包/","noteIcon":"","created":"2021-11-23T14:16:24+08:00","updated":"2024-02-02T00:04:25+08:00"}
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