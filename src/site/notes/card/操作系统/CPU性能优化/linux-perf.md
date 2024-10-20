---
{"dg-publish":true,"permalink":"/card/操作系统/CPU性能优化/linux-perf/","noteIcon":"2","created":"2021-05-19T17:19:24+08:00","updated":"2024-10-21T21:32:00+08:00"}
---


# linux-perf

linux 下的性能分析工具

## 1 perf top

显示占用 cpu 时钟最多的函数或指令，可以用来查找热点函数
![Pasted image 20211224200819.png|800](/img/user/attachs/Pasted%20image%2020211224200819.png)

表头四个字段：
1. Overhead 百分比
2. Shared 该函数或指令所在的动态共享对象（dynamic Shared Object）
3. Object 动态对象类型，`[.]` 代表用户空间可执行程序、动态链接库，`[k]` 代表内核空间
4. Symbol 符号名，函数名。

## 2 常用命令

记录当前状态

```bash
perf record -a -g -- sleep 30
```

产出一份图标报告

```bash
perf report -g graph,0
```

## 3 参考

<https://time.geekbang.org/column/article/70476>
