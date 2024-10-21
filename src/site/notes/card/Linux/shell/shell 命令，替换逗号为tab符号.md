---
{"dg-publish":true,"permalink":"/card/Linux/shell/shell 命令，替换逗号为tab符号/","noteIcon":"2","created":"2024-07-02T23:39:04+08:00","updated":"2024-10-21T16:59:49+08:00"}
---


# shell 命令，替换逗号为tab符号

#shell #linux

```shell
cat daily_pushed_data_ori  | grep -v error | sed 's/,/\t/g' > daily_pushed_data
```

参考：
[[card/Linux/shell/shell替换字符串\|shell替换字符串]]
