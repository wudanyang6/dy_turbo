---
{"tags":["树莓派"],"date created":"2021-07-15T10:52:00+08:00","date modified":"2024-02-02T16:15:46+08:00","dg-publish":true,"permalink":"/100 Programmer/linux/linux-树莓派无法上网排查/","dgPassFrontmatter":true,"noteIcon":"2","created":"2021-07-15T10:52:00+08:00","updated":"2024-02-02T16:15:46+08:00"}
---


# linux-树莓派无法上网排查

- wget -v baidu.com
    - 会有输出：
    - 如何处理呢

```bash
--2021-07-15 10:52:24--  http://baidu.com/
Resolving baidu.com (baidu.com)... 39.156.69.79, 220.181.38.148
Connecting to baidu.com (baidu.com)|39.156.69.79|:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 81 [text/html]
Saving to: ‘index.html’
```

上次我就卡在了 解析 baidu.com 域名这个地方

- 通过 [[100 Programmer/linux/linux-nslookup\|linux-nslookup]] 命令查看路由解析
    - 发现解析不通
    - 查看 `/etc/resolv.conf` 将 `nameserver` 改成： `114.114.114.114`
    - 再次查看路由解析，发现已经 OK 了


- 如何修改 `/etc/resolv.conf` ，重启机器之后会发现文件又被改回去了，导致无法联网，正确的做法
	- `sudo vi /etc/systemd/resolved.conf`
	- 重启网络服务 `sudo service networking restart`

[树莓派4B】三、笔记本给树莓派Ubuntu 18.04提供网络|为什么Ubuntu18.04更改/etc/resolv.conf修改nameserver重启网络被重置](https://blog.csdn.net/qq_42820594/article/details/107325437)