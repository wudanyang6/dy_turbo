---
{"dg-publish":true,"permalink":"/card/Linux/linux-dnsmasq/","tags":["aigc"],"noteIcon":"2","created":"2021-08-15T12:01:14+08:00","updated":"2024-10-21T16:52:22+08:00"}
---


# linux-dnsmasq

```Go
whatis dnsmasq
dnsmasq (8)          - A lightweight DHCP and caching DNS server.
```

一个 `dns` 缓存

Dnsmasq是一个轻量级的、易于配置的DNS转发器和DHCP服务器。它适用于小型网络，可以提供DNS缓存和BOOTP/TFTP服务，以帮助网络引导基于网络的操作系统。

Dnsmasq具有以下主要作用：
1. **DNS 转发与缓存：** Dnsmasq可以接受DNS查询并将其转发至网络中配置的真实DNS服务器，同时将查询结果缓存起来，提高网络访问速度。
2. **DHCP 服务器：** Dnsmasq可以作为一个DHCP服务器，为网络设备分配IP地址。
3. **TFTP 服务器：** Dnsmasq还可以提供TFTP服务，为网络启动的设备提供所需文件。

Dnsmasq的主要应用场景是：
1. **小型网络和家庭网络：** 对于小型网络和家庭网络，通常无需专门的DNS和DHCP服务器，Dnsmasq就可以满足需求，省去配置和维护复杂设备的麻烦。
2. **虚拟化和容器环境：** 在虚拟机和容器这样的环境中，Dnsmasq可以提供DNS和DHCP服务，使得虚拟机和容器间的通信更容易。
3. **网络引导：** 对于依赖于网络引导的系统或者设备，例如网络启动的计算机，Dnsmasq的TFTP服务也非常有用。

[Dnsmasq 介绍与使用 | Enki's Notes](http://www.enkichen.com/2017/05/23/dnsmasq-introduce/)
