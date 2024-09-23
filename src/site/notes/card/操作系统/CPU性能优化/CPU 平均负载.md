---
{"dg-publish":true,"permalink":"/card/操作系统/CPU性能优化/CPU 平均负载/","noteIcon":"2","created":"2024-09-18T22:04:52+08:00","updated":"2024-09-20T21:16:05+08:00"}
---


# CPU 平均负载

## 1 什么是平均负载?

>  System load averages is the average number of processes that are
       either in a runnable or uninterruptable state.  A process in a
       runnable state is either using the CPU or waiting to use the CPU.
       A process in uninterruptable state is waiting for some I/O
       access, eg waiting for disk.  The averages are taken over the
       three time intervals.  Load averages are not normalized for the
       number of CPUs in a system, so a load average of 1 means a single
       CPU system is loaded all the time while on a 4 CPU system it
       means it was idle 75% of the time.
> https://man7.org/linux/man-pages/man1/uptime.1.html

简单来说，平均负载是指单位时间内，系统处于可运行状态和不可中断状态的平均进程数，也就是**平均活跃进程数**

## 2 如何查看linux平均负载

- top
- uptime
- w
- cat `/proc/loadavg`

```Shell
# CPU 平均负载
load average: 0.62, 0.72, 0.76
```

## 3 平均负载的高低判断标准

最理想的，就是每个 CPU 上都刚好运行着一个进程

所以说平均负载高不高，需要看你的 CPU 到底有几个

CPU个数查询： `cat /proc/cpuinfo`

## 4 参考

> CPU比喻成一辆地铁，正在使用CPU的进程就是在地铁上的人；等待CPU的进程就是在下一站等地铁来的人；等待I/O的进程就是在下一站要上车和下车的人，虽然现在对CPU没影响，可未来会影响，所以也要考虑到平均负载上。

- 02 | 基础篇：到底应该怎么理解“平均负载”？-Linux 性能优化实战-极客时间: https://time.geekbang.org/column/article/69618
