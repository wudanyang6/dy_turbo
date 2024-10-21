---
{"dg-publish":true,"permalink":"/card/Linux/shell/shell替换字符串/","noteIcon":"2","created":"2022-09-13T13:16:17+08:00","updated":"2024-10-21T16:58:59+08:00"}
---


```shell
# shell替换字符串
${hellohe/he/ae}

# 全局替换，多了一个斜杠
${hellohe//he/ae}

# sed 命令， 后面修饰的 g 代表全局替换，否则只替换第一个
echo "hellohe" | sed 's/he/ae/g'

#  awk 的函数
echo "hellohe" | awk '{gsub(/he/, "ae"); print $0}'
```

# 参考

[linux shell 替换字符串的几种方法，变量替换${}，sed，awk_whatday的博客-CSDN博客_shell 字符串替换](https://blog.csdn.net/whatday/article/details/104963945)

# 替换文本

每一行最后添加一个逗号
`sed -e 's/$/,/'`
