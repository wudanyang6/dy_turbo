---
{"dg-publish":true,"permalink":"/card/操作系统/CPU性能优化/CPU 使用率/","noteIcon":"2","created":"2024-09-12T21:08:10+08:00","updated":"2024-09-25T18:51:53+08:00"}
---


# CPU 使用率

CPU 使用率（CPU Utilization）是指在一段时间内，处理器用于执行任务的时间占总时间的比例。它反映了 CPU 的繁忙程度，通常以百分比表示。

## 1 **基本概念**：

1. **用户态（User Mode）CPU 使用率**：
   - CPU 在用户态（用户空间）运行用户应用程序的时间。
   - 例如，当你运行一个程序（如文本编辑器、浏览器等）时，CPU 会在用户态处理这些任务。

2. **系统态（System Mode）CPU 使用率**：
   - CPU 在内核态（内核空间）执行系统调用、驱动程序等操作的时间。
   - 例如，文件读写操作、网络请求处理等属于内核态。

3. **空闲态（Idle）CPU 使用率**：
   - CPU 处于空闲状态，没有任务要执行的时间。
   - 这个数值越大，表示 CPU 越空闲。

4. **等待 I/O（I/O Wait）**：
   - CPU 等待输入输出（如硬盘、网络）的时间。这种情况下，CPU 可能是空闲的，但由于等待 I/O 完成而无法进行其他任务。

5. **中断时间（IRQ & SoftIRQ）**：
   - CPU 处理硬件中断（IRQ）和软件中断（SoftIRQ）的时间。

**高 CPU 使用率的含义**：
- 高 CPU 使用率意味着系统在执行大量的计算任务，可能是正常现象（例如运行密集型计算任务），也可能是系统负载过高。
- 低 CPU 使用率则表明系统相对空闲，CPU 大部分时间处于空闲状态。

**如何查看 CPU 使用率**：

- 使用 `top` 或 `htop` 等工具可以实时监控 CPU 的使用情况。
- 使用 `mpstat` 可以更详细地查看每个 CPU 核心的使用率。

## 2 如何查看CPU时间

`cat /proc/stat` 查看开机以来的系统CPU时间 [/proc/stat](https://man7.org/linux/man-pages/man5/proc_stat.5.html)

> The amount of time, measured in units of USER_HZ
                     (1/100ths of a second on most architectures, use
                     _sysconf(_SC_CLK_TCK)_ to obtain the right value),
                     that the system ("cpu" line) or the specific CPU
                     ("cpu_N_" line) spent in various states

单位为时间数量，一般是 1/100 秒，具体值根据 USER_HZ 确定。

## 3 CPU 使用率的计算方法

总CPU使用率（开机以来）

$$
\text{CPU 使用率} = 1 - \frac{\text{空闲时间}}{\text{总 CPU 时间}}
$$

一段时间内的平均CPU使用率

$$
\text{平均 CPU 使用率} = 1 - \frac{\text{空闲时间}_{\text{new}} - \text{空闲时间}_{\text{old}}}{\text{总 CPU 时间}_{\text{new}} - \text{总 CPU 时间}_{\text{old}}}
$$

## 4 获得CPU使用率的几种方法

1. `top`命令![Pasted image 20240919184300.png|600](/img/user/attachs/Pasted%20image%2020240919184300.png)
   按`1`可以看每个CPU单独的数据 [[card/linux-top\|linux-top]]
2. `htop` 命令 ![Pasted image 20240919184348.png|600](/img/user/attachs/Pasted%20image%2020240919184348.png)
   优势：可以响应鼠标点击事件，滚动查看，查看进程树
3. `vmstat 1`  每秒输出一次 `vmstat reports information about processes, memory, paging, block IO, traps, disks and cpu activity`
4. `mpstat` 或者 `mpstat -u 1 10` 获取一段时间内的CPU使用率 
<div class="transclusion internal-embed is-loaded"><a class="markdown-embed-link" href="/card/mpstat/" aria-label="Open link"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg></a><div class="markdown-embed">





# mpstat命令输出

```Shell
Linux 6.8.0-44-generic (dy-turbo-vm) 	09/19/2024 	_aarch64_	(8 CPU)

10:52:27 AM  CPU    %usr   %nice    %sys %iowait    %irq   %soft  %steal  %guest  %gnice   %idle
10:52:27 AM  all    0.02    0.00    0.05    0.01    0.00    0.00    0.00    0.00    0.00   99.91
```


</div></div>
  
5. `sar 1 5` 此命令每秒采集一次数据，连续采集 5 次。 
<div class="transclusion internal-embed is-loaded"><a class="markdown-embed-link" href="/card/sar/" aria-label="Open link"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg></a><div class="markdown-embed">





# sar命令输出

```Shell
Linux 6.8.0-44-generic (dy-turbo-vm) 	09/19/2024 	_aarch64_	(8 CPU)

10:54:49 AM     CPU     %user     %nice   %system   %iowait    %steal     %idle
10:54:50 AM     all      0.12      0.00      0.12      0.00      0.00     99.75
10:54:51 AM     all      0.00      0.00      0.25      0.00      0.00     99.75
10:54:52 AM     all      0.00      0.00      0.12      0.00      0.00     99.88
10:54:53 AM     all      0.00      0.00      0.12      0.00      0.00     99.88
10:54:54 AM     all      0.00      0.00      0.00      0.00      0.00    100.00
Average:        all      0.03      0.00      0.13      0.00      0.00     99.85
```


</div></div>

6. `ps`： `ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%cpu | head`
7. `cat /proc/stat` 通过读取CPU时间，自行计算CPU使用率
8. 查看指定进程的CPU使用情况： [[card/linux-pidstat\|linux-pidstat]]
