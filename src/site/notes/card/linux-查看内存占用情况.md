---
{"tags":null,"date created":"2023-01-04T15:23:34+08:00","date modified":"2024-02-02T12:07:52+08:00","dg-publish":true,"aliases":[],"permalink":"/card/linux-查看内存占用情况/","dgPassFrontmatter":true,"noteIcon":"2","created":"2023-01-04T15:23:34+08:00","updated":"2024-02-02T12:07:52+08:00"}
---


# linux-查看内存占用情况

```Shell
ps --no-headers -o "rss,cmd" -A | awk '{print $1/1024"M","\t",$0}' | sort -n -k1
```
