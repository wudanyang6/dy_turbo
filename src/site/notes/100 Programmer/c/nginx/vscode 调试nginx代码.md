---
{"dg-publish":true,"permalink":"/100 Programmer/c/nginx/vscode 调试nginx代码/","noteIcon":"","created":"2021-03-25T19:13:29+08:00","updated":"2024-01-31T13:28:18+08:00"}
---


#output 

# 内容

## 修改 auto/cc/conf

ngx_compile_opt 中添加 -g
修改后如下：

``` shell
ngx_compile_opt="-c -g"
```

[[100 Programmer/c/nginx/vscode 调试nginx代码#gcc -g 的作用\|#gcc -g 的作用]]

## 编译 & 安装 & 运行

``` shell
# prefix 是想要安装到的目录
auto/configure --prefix=/home/ubuntu/mydisk/var/nginx-debug-1

# 编译安装
make
make install
```

### 修改配置

`vim /home/ubuntu/mydisk/var/nginx-debug-1/conf/nginx.conf`
将监听端口号改成 `8080`
`worker_processes` 改成 1 (方便调试)

### 启动 nginx

`/home/ubuntu/mydisk/var/nginx-debug-1/sbin/nginx`

nginx 的进程：

``` shell
ps aux | grep nginx
ubuntu     17093  0.0  0.0   4184   372 ?        Ss   Mar30   0:00 nginx: master process /home/ubuntu/mydisk/var/nginx-debug-1/sbin/nginx
ubuntu     17094  0.0  0.0   4620  2316 ?        S    Mar30   0:00 nginx: worker process
ubuntu     46072  0.0  0.0   7692   648 pts/0    S+   11:21   0:00 grep --color=auto nginx
```

## 配置 vscode 调试

``` json
{
    // 使用 IntelliSense 了解相关属性。 
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "debug master",
            "type": "cppdbg",
            "request": "launch",
            "program": "/home/ubuntu/mydisk/var/nginx-debug-1/sbin/nginx",
            "args": [],
            "stopAtEntry": true,
            "cwd": "${workspaceFolder}",
            "environment": [],
            "externalConsole": false,
            "MIMode": "gdb",
            "setupCommands": [
                {
                    "description": "为 gdb 启用整齐打印",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                }
            ]
        },
        {
            "name": "debug worker",
            "type": "cppdbg",
            "request": "attach",
            "program": "/home/ubuntu/mydisk/var/nginx-debug-1/sbin/nginx",
            "processId": 17094,
            "MIMode": "gdb",
            "setupCommands": [
                {
                    "description": "为 gdb 启用整齐打印",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                }
            ]
        }
    ]
}
```

在 worker 上调试需要改成 attach 的形式，并且使用了一次 attach 之后，就不能使用 strace -p 17094 查看系统调用了

然后就可以打断点，进行单步调试了

# 参考

[Mac上用Visual Studio Code调试Nginx](https://www.jianshu.com/p/51b726b56e2f)

## gcc -g 的作用

[GCC 参数详解-runoob](https://www.runoob.com/w3cnote/gcc-parameter-detail.html)
在编译的时候会产生调试信息

## kernel.yama.ptrace_scope

sysctl -a 查看内核参数
kernel.yama.ptrace_scope
https://www.kernel.org/doc/Documentation/security/Yama.txt

sudo vim /etc/sysctl.d/10-ptrace.conf

[VSCode调试出现无法打开glibc库的“raise.c“或“abort.c“等文件的错误](https://blog.csdn.net/yihuajack/article/details/107151801)

## sudo strace 报 操作不被允许

sudo strace -p 17094

```bash
strace: Could not attach to process. If your uid matches the uid of the target process, check the setting of /proc/sys/kernel/yama/ptrace_scope, or try again as the root user. For more details, see /etc/sysctl.d/10-ptrace.conf: Operation not permitted
strace: attach: ptrace(PTRACE_SEIZE, 17094): Operation not permitted
```

https://stackoverflow.com/questions/19215177/how-to-solve-ptrace-operation-not-permitted-when-trying-to-attach-gdb-to-a-pro
Maybe someone has attached this process with gdb.

-   ps -ef | grep gdb

**can't gdb attach the same process twice.**
将 vscode 中的 调试关掉，就可以使用 strace 了
如下图，可以看到，子进程停在了 epoll_pwait 系统调用上了
![attachs/Pasted image 20210330203413.png](/img/user/attachs/Pasted%20image%2020210330203413.png)
