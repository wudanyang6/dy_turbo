---
{"dg-publish":true,"permalink":"/100 Programmer/nginx/nginx 进程模型-整体架构/","title":"Nginx 进程模型-整体架构","tags":["nginx"],"noteIcon":"2","created":"2021-04-14T13:14:29+08:00","updated":"2024-01-31T13:28:34+08:00"}
---


# nginx 进程模型-整体架构

![713751-20221106220927618-2090658482.png](/img/user/100%20Programmer/nginx/713751-20221106220927618-2090658482.png)


从网上找了一个非常好的图片，从图中可以看到很多东西

1. `Nginx` 会生成多个进程
2. `worker` 使用了 `io` 多路复用的事件驱动框架
3. `worker` 内部有很多模块
4. `worker` 处理磁盘 `I/O` 时，使用了标准 `I/O` ， `sendfile` ， `AIO` ，`mmap` 等 `I/O` 技术
5. `Cache loader` 和 `Cache manager` 操作 proxy cache
6. 后端支持多种基于 `tcp` 的网络协议