---
{"dg-publish":true,"permalink":"/card/101 Tools/obsidian/不打开obsidian的情况下记录当前事件/","noteIcon":"2","created":"2022-09-25T23:42:01+08:00","updated":"2024-05-14T14:24:58+08:00"}
---


# 不打开 obsidian 的情况下记录当前事件

将输入设置成你想附带的文本，传入内容改成“作为参数”

加上 `open --background "$1"` 即可实现在不将 `obsidian` 放到前台的情况下记录日志。



![Pasted image 20220925234214.png](/img/user/attachs/Pasted%20image%2020220925234214.png)


使用这种方法 obsidian 不会到前台占用注意力，不过仍然会将对应的操作完成

# 参考

[Leave Obsidian in background when making URI call? - Developers & API - Obsidian Forum](https://forum.obsidian.md/t/leave-obsidian-in-background-when-making-uri-call/34091)
