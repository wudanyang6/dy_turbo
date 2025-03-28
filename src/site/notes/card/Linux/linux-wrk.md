---
{"dg-publish":true,"permalink":"/card/Linux/linux-wrk/","tags":["压力测试"],"noteIcon":"2","created":"2021-08-16T13:37:20+08:00","updated":"2025-03-13T16:47:19+08:00"}
---


# linux-wrk

wrk 是一个压测工具，底层使用 epoll ，多线程执行，性能非常好

# 使用说明：

安装：

```bash 
git clone https://github.com/wg/wrk 

make
cp wrk /usr/local/bin
```

示例用法：

```shell
wrk -t12 -c400 -d30s http://127.0.0.1:8080/index.html
```

参数含义：

```shell
Usage: wrk <options> <url>
  Options:
    -c, --connections <N>  Connections to keep open
    -d, --duration    <T>  Duration of test
    -t, --threads     <N>  Number of threads to use

    -s, --script      <S>  Load Lua script file
    -H, --header      <H>  Add header to request
        --latency          Print latency statistics
        --timeout     <T>  Socket/request timeout
    -v, --version          Print version details

  Numeric arguments may include a SI unit (1k, 1M, 1G)
  Time arguments may include a time unit (2s, 2m, 2h)
```

示例 lua 脚本文件位置

`/workspace/wrk/scripts/*.lua`

![wrk-lua脚本.png](/img/user/attachs/wrk-lua%E8%84%9A%E6%9C%AC.png)

```lua
-- example HTTP POST script which demonstrates setting the
-- HTTP method, body, and adding a header

wrk.method = "POST"
wrk.body   = "foo=bar&baz=quux"
wrk.headers["Content-Type"] = "application/x-www-form-urlencoded"
```

wrk lua 函数的生命周期

![Pasted image 20220508214336.png](/img/user/attachs/Pasted%20image%2020220508214336.png)

# 参考

[http 性能测试 wrk使用教程](https://juejin.cn/post/6844903550288396296)

[性能测试神器 wrk 使用教程](https://segmentfault.com/a/1190000023212126)
