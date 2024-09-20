---
{"dg-publish":true,"permalink":"/card/linux-pidstat/","noteIcon":"2","created":"2021-05-07T20:33:25+08:00","updated":"2024-09-20T21:16:25+08:00"}
---


# linux-pidstat

```Shell
$pidstat 1 5                                                                                                                                                         11:46
Linux 5.4.0-1034-raspi (wdy-ubuntu) 	05/20/21 	_aarch64_	(4 CPU)

11:46:13      UID       PID    %usr %system  %guest   %wait    %CPU   CPU  Command
11:46:14        0      1871    0.00    0.97    0.00    0.00    0.97     3  phtunnel
11:46:14     1000      4506    0.97    0.00    0.00    0.00    0.97     0  gsd-xsettings
11:46:14     1000    115573    0.97    2.91    0.00    0.00    3.88     1  pidstat

11:46:14      UID       PID    %usr %system  %guest   %wait    %CPU   CPU  Command
11:46:15     1000    115573    0.00    4.00    0.00    0.00    4.00     1  pidstat

11:46:15      UID       PID    %usr %system  %guest   %wait    %CPU   CPU  Command
11:46:16     1000      4747    1.00    0.00    0.00    0.00    1.00     2  gnome-software
11:46:16        0    115462    0.00    1.00    0.00    0.00    1.00     2  kworker/2:1-events
11:46:16     1000    115573    1.00    3.00    0.00    0.00    4.00     1  pidstat

11:46:16      UID       PID    %usr %system  %guest   %wait    %CPU   CPU  Command
11:46:17        0     93708    0.00    1.00    0.00    0.00    1.00     2  containerd
11:46:17     1000    115573    1.00    3.00    0.00    0.00    4.00     1  pidstat

11:46:17      UID       PID    %usr %system  %guest   %wait    %CPU   CPU  Command
11:46:18     1000    115573    1.00    2.00    0.00    0.00    3.00     1  pidstat

Average:      UID       PID    %usr %system  %guest   %wait    %CPU   CPU  Command
Average:        0      1871    0.00    0.20    0.00    0.00    0.20     -  phtunnel
Average:     1000      4506    0.20    0.00    0.00    0.00    0.20     -  gsd-xsettings
Average:     1000      4747    0.20    0.00    0.00    0.00    0.20     -  gnome-software
Average:        0     93708    0.00    0.20    0.00    0.00    0.20     -  containerd
Average:        0    115462    0.00    0.20    0.00    0.00    0.20     -  kworker/2:1-events
Average:     1000    115573    0.80    2.98    0.00    0.00    3.78     -  pidstat
```


`pidstat` 是 `sysstat` 工具包的一部分，可以用来监控特定进程的 CPU、内存、I/O 等使用情况。与其他命令不同，`pidstat` 提供了针对单个进程级别的统计信息，非常适合分析某个进程的性能表现。

## 1 **安装 `pidstat`**

`pidstat` 属于 `sysstat` 工具包。如果尚未安装，可以使用以下命令进行安装：

```bash
sudo apt-get install sysstat  # 对于 Debian/Ubuntu
sudo yum install sysstat      # 对于 CentOS/RHEL
```

## 2 **使用 `pidstat` 查看 CPU 使用情况**

要查看所有进程的 CPU 使用情况，可以使用：

```bash
pidstat 1
```

其中，`1` 表示每秒刷新一次 CPU 使用情况。输出示例：

```Go
Linux 4.15.0-20-generic (hostname)   09/19/2024  _x86_64_  (4 CPU)

09:26:35      PID    %usr %system  %guest   %CPU   CPU  Command
09:26:36     1023    0.00    0.50    0.00    0.50     1  apache2
09:26:36     1234    0.20    0.30    0.00    0.50     0  chrome
```

输出中的各列解释：
- `%usr`：用户态 CPU 使用率。
- `%system`：系统态 CPU 使用率。
- `%CPU`：总 CPU 使用率。
- `PID`：进程 ID。
- `Command`：进程名称。

## 3 **查看特定进程的 CPU 使用情况**

如果想监控某个特定进程，比如 `PID` 为 1234 的进程，可以使用：

```bash
pidstat -p 1234 1
```

## 4 **查看线程级别的 CPU 使用情况**

要查看进程中的每个线程的 CPU 使用情况，可以使用 `-t` 参数：

```bash
pidstat -t 1
```

这样可以分析多线程程序的性能表现。

## 5 **查看内存和 I/O 使用情况**

`pidstat` 还可以查看进程的内存和 I/O 使用情况：
- 查看内存使用情况：

```bash
pidstat -r 1
```

- 查看 I/O 使用情况：

```bash
pidstat -d 1
```

`pidstat` 是一个强大的工具，适合监控和分析单个进程的资源使用情况。

# 参考

https://time.geekbang.org/column/article/70476
