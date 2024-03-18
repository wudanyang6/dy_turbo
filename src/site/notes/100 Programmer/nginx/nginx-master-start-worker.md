---
{"dg-publish":true,"permalink":"/100 Programmer/nginx/nginx-master-start-worker/","title":"Nginx Master 启动 worker 进程的流程","tags":["nginx","Process","source-code"],"noteIcon":"2","created":"2021-04-16T19:04:00+08:00","updated":"2024-02-22T15:57:08+08:00"}
---


# Nginx Master 进程启动子进程的流程

## 入口

启动子进程的流程在`ngx_start_worker_processes`函数中，具体代码如下：

```c
static void
ngx_start_worker_processes(ngx_cycle_t *cycle, ngx_int_t n, ngx_int_t type)
{
    ngx_int_t  i;

    ngx_log_error(NGX_LOG_NOTICE, cycle->log, 0, "start worker processes");

    for (i = 0; i < n; i++) {

        ngx_spawn_process(cycle, ngx_worker_process_cycle,
                          (void *) (intptr_t) i, "worker process", type);

        ngx_pass_open_channel(cycle);
    }
}


```

## 创建子进程

其中创建子进程的函数为 `ngx_spawn_process`，主要就是封装了 `fork` 函数。

```c
ngx_pid_t
ngx_spawn_process(ngx_cycle_t *cycle, ngx_spawn_proc_pt proc, void *data,
    char *name, ngx_int_t respawn)
{
    // ...
    pid = fork();

    switch (pid) {

    case -1:
        ngx_log_error(NGX_LOG_ALERT, cycle->log, ngx_errno,
                      "fork() failed while spawning \"%s\"", name);
        ngx_close_channel(ngx_processes[s].channel, cycle->log);
        return NGX_INVALID_PID;

    case 0:
        ngx_parent = ngx_pid;
        ngx_pid = ngx_getpid();
        proc(cycle, data);
        break;

    default:
        break;
    }

    ngx_log_error(NGX_LOG_NOTICE, cycle->log, 0, "start %s %P", name, pid);

    ngx_processes[s].pid = pid;
    ngx_processes[s].exited = 0;

  // ...
}
```

`fork` 函数的返回值：

>   子进程返回0，父进程返回子进程id，若出错，返回 -1

子进程在 `case 0` 中执行 `proc` 函数，`proc` 函数是 `ngx_start_worker_processes` 函数中传进来的第二个参数 `ngx_worker_process_cycle`。

`ngx_worker_process_cycle` 函数，就是 worker 进程的主要流程，以后会继续分析。

## 最大子进程数量

```c
if (s == NGX_MAX_PROCESSES) {
    ngx_log_error(NGX_LOG_ALERT, cycle->log, 0,
                    "no more than %d processes can be spawned",
                    NGX_MAX_PROCESSES);
    return NGX_INVALID_PID;
}
```

```c
#define NGX_MAX_PROCESSES         1024
```

最大子进程数量定义成了 `NGX_MAX_PROCESSES` 也就是 1024，如果超过了 1024个进程，就会报错

## `respawn` 参数的意义

### `respawn` 大于等于0时

`respawn` 大于等于0时，代表重启子进程，respawn 代表给 `ngx_processes` 数组的下标

```c
if (respawn >= 0) {
    s = respawn;
} else {
    ...
}
```

### `respawn` 小于0时

`respawn` 小于0时，代表启动的子进程的属性，子进程的几种属性：

```c
#define NGX_PROCESS_NORESPAWN     -1
#define NGX_PROCESS_JUST_SPAWN    -2
#define NGX_PROCESS_RESPAWN       -3
#define NGX_PROCESS_JUST_RESPAWN  -4
#define NGX_PROCESS_DETACHED      -5
```

那么 `respawn` 小于0时，子进程在 `ngx_processes`数组中的下标是多少呢？

看下面这段代码：

```c
for (s = 0; s < ngx_last_process; s++) {
    if (ngx_processes[s].pid == -1) {
        break;
    }
}

if (s == NGX_MAX_PROCESSES) {
    ngx_log_error(NGX_LOG_ALERT, cycle->log, 0,
                  "no more than %d processes can be spawned",
                  NGX_MAX_PROCESSES);
    return NGX_INVALID_PID;
}
```

实际上就是在找 `ngx_processes` 数组中未使用的最小下标。

# 参考

《UNIX 环境高级编程》

[os/unix/ngx_process.c源代码分析](https://ivanzz1001.github.io/records/post/nginx/2017/12/02/nginx-source_part15_2)