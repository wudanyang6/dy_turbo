---
{"dg-publish":true,"permalink":"/card/Linux/linux-echo/","tags":["linux"],"noteIcon":"2","created":"2021-10-19T11:27:48+08:00","updated":"2024-10-20T23:59:24+08:00"}
---


# linux-echo

echo "hello"

echo -n "hello" # 这种会去掉换行

sh 不支持这个 -n 参数，很奇怪

```bash
$ echo -n "hello"
hello%
```

> 使用 -n 参数 zsh 后面会跟着一个百分号


<div class="transclusion internal-embed is-loaded"><div class="markdown-embed">

<div class="markdown-embed-title">

# Printf puts a percent sign after everything it prints

</div>


This is `zsh`'s way of telling you that the preceding command outputted a partial line and the shell terminated that line to give you a prompt on a new line. 

</div></div>

