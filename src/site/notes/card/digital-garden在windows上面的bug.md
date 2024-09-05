---
{"dg-publish":true,"permalink":"/card/digital-garden在windows上面的bug/","noteIcon":"2","created":"2024-09-06T00:55:33+08:00","updated":"2024-09-06T00:57:14+08:00"}
---


# digital-garden在windows上面的bug

https://github.com/oleeskild/obsidian-digital-garden 
obsidian 插件 digital-garden 在windows上面有个 bug，会将我的 frontmatter 全部透传
推到代码库中是这样的： https://github.com/wudanyang6/dy_turbo/commit/7b66296c349fb067d3d62c43d5f04b6a784a2197

![Pasted image 20240906005252.png](/img/user/attachs/Pasted%20image%2020240906005252.png)

可以看到，格式完全变了

所以千万不要在 windows 上面使用，不过也可能是我的机器问题

从而导致的问题是，我的网站上面所有的文章全都使用新路径重新发布了一遍
