---
{"tags":null,"date created":"2021-05-24T14:05:00+08:00","date modified":"2024-02-01T13:02:45+08:00","dg-publish":true,"permalink":"/card/网络-最多有多少个a类、b类和c类网络号/","dgPassFrontmatter":true,"noteIcon":"2","created":"2021-05-24T14:05:00+08:00","updated":"2024-02-01T13:02:45+08:00"}
---


在IPv4地址体系中，网络被分为4个等级，分别是A，B，C和D类。对于A、B、C类，其数量如下：

- A类：128个（范围是0.0.0.0到127.255.255.255，但0.0.0.0和127.0.0.0通常分别用作默认路由和本地回环地址，所以不包括在内。）
- B类：16,384个（范围是 128.0.0.0 到 191.255.255.255）
- C类：2,097,152个（范围是 192.0.0.0 到 223.255.255.255）

请注意，上述分类是根据原始的IPv4地址分类来计算的。然而，由于IP地址的枯竭，现在的实际网络环境中，通常在IP地址分配上使用了子网划分，CIDR，私有地址等现代网络技术，因此实际的可用网络数量会因子网划分、私有地址使用等因素而有所变化。

D类 IP 地址是多播（Multicast）地址，其范围是 224.0.0.0 到 239.255.255.255。

所以，D类网络（多播地址）总共有 (239-224+1) x (2^24) = 268,435,456 个。

但是，有些特定的地址在D类中是已经被保留或特殊用途的，例如 224.0.0.0 - 224.0.0.255 是被保留的用于本地网络的多播地址。

# 参考

https://blog.csdn.net/a5534789/article/details/50118857#:~:text=%E2%80%9C0%E2%80%9D%E5%81%9A%E4%B8%BA%E7%BD%91%E7%BB%9C%E5%8F%B7,%E7%BD%91%E6%AE%B5%E4%B8%BA1%E2%80%94126.&text=224%3D412%3D166%3D2563,%E6%95%B0%E5%BA%94%E8%AF%A5%E6%98%AF16777214%E4%B8%AA%E3%80%82