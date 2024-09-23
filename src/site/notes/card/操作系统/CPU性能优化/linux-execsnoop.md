---
{"dg-publish":true,"permalink":"/card/操作系统/CPU性能优化/linux-execsnoop/","tags":["linux命令"],"noteIcon":"2","created":"2024-09-20T16:00:50+08:00","updated":"2024-09-20T21:18:39+08:00"}
---


# linux-execsnoop

> [!NOTE]
>  execsnoop - Trace new processes via exec() syscalls. Uses Linux eBPF/bcc.

适合查看系统中突发进程比较多的情况

```Shell
wudanyang@dy-turbo-vm:~$ sudo execsnoop
[sudo] password for wudanyang:
PCOMM            PID    PPID   RET ARGS
stress           17095  1351     0 /usr/bin/stress
stress           17097  1351     0 /usr/bin/stress
stress           17099  1351     0 /usr/bin/stress -t 1 -d
stress           17101  1351     0 /usr/bin/stress
stress           17103  1351     0
stress           17105  1351     0 /usr/bin/stress -t
stress           17107  1351     0 /usr/bin/stress -t
stress           17109  1351     0 /usr/bin/stress -t
stress           17111  1351     0 /usr/bin/stress -t 1 -d
stress           17113  1351     0 /usr/bin/stress
stress           17115  1351     0
stress           17117  1351     0 /usr/bin/stress -t 1
stress           17119  1351     0 /usr/bin/stress -t 1 -d 1
stress           17121  1351     0 /usr/bin/stress
stress           17123  1351     0 /usr/bin/stress -t 1 -d
stress           17125  1351     0 /usr/bin/stress -t
stress           17127  1351     0
stress           17129  1351     0 /usr/bin/stress -t 1
stress           17131  1351     0 /usr/bin/stress -t 1 -d 1
stress           17133  1351     0 /usr/bin/stress
stress           17135  1351     0 /usr/bin/stress
stress           17137  1351     0 /usr/bin/stress
```
