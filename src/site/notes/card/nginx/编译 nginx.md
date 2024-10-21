---
{"dg-publish":true,"permalink":"/card/nginx/编译 nginx/","noteIcon":"2","created":"2021-03-04T20:59:44+08:00","updated":"2024-10-21T19:13:29+08:00"}
---


# 编译 nginx

## 1 在 mac 上面编译

```bash
./configure --with-debug --with-cc=/usr/bin/cc --with-cc-opt='-O0 -g' --prefix="/Users/wudanyang/workspace/reading-code-of-nginx-1.9.2/nginx-compile" --with-stream

```

在 vagrant 上面编译

```bash
在 vagrant 上面安装
./configure \
--with-debug \
--with-cc=/usr/bin/cc \
--with-cc-opt='-O0 -g' \
--prefix="/vagrant/reading-code-of-nginx-1.9.2/nginx-compile/" \
--with-stream \
--with-file-aio

./configure \
--with-debug \
--with-cc=/usr/bin/cc \
--with-cc-opt='-O0 -g' \
--prefix="/mnt/mydisk/var/nginx" \
--with-stream \
--with-file-aio
```

安装 pcre 库，http rewrite module 需要使用

`sudo apt-get install libpcre3 libpcre3-dev`


make

make install

## 2 树莓派上面编译

```sh
auto/configure --prefix=/home/ubuntu/mydisk/var/nginx-debug-1 --with-http_v2_module --with-http_ssl_module
```

### 2.1 编译时遇到的报错

#### 2.1.1 implicit fallthrough error

[linux下编译nginx1.0.15报错：Implicit fallthrough error](https://blog.csdn.net/jaybill/article/details/80164370)
![这里写图片描述](https://img-blog.csdn.net/2018050211282675?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2pheWJpbGw=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
CFLAGS表示编译的可选参数，我们只需要在后面加上**\-Wno-implicit-fallthrough**，即可忽略gcc7编译时switch-case中缺少break的错误。

#### 2.1.2 'struct crypt\_data' has no member named 'current\_salt'

[编译nginx时struct crypt\_data’没有名为‘current\_salt’的成员：cd.current\_salt\[0\] = ~salt\[0\]；的解决方案](https://www.cnblogs.com/hxlinux/p/12900503.html)
在源码中注释掉那行代码

#### 2.1.3 cast between incompatible function types

cast function type
https://github.com/SELinuxProject/setools/issues/2
`-Wno-cast-function-type`
