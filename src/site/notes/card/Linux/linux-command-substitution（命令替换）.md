---
{"dg-publish":true,"permalink":"/card/Linux/linux-command-substitution（命令替换）/","tags":["linux","shell"],"noteIcon":"2","created":"2021-05-10T14:50:41+08:00","updated":"2024-10-19T13:52:06+08:00"}
---


# linux-command-substitution（命令替换）

## 1 什么是命令替换

在有一下情况的时候，会发生命令替换：

```bash
$(command)

或者是反引号
`command`
```

这个命令会在子shell中执行，使用标准输出替换掉上面的命令文本。并且在管道关闭或者子进程终止前，shell会一直等待。

## 2 命令替换时为什么把换行变成了空格

shell读取的输出会以空格作为分隔符进行解析。
不过你可以通过从新设定 _IFS_ 字段来重新指定分隔符。

比如说现在有一个文本文件：

```bash
wudanyang@dy-turbo-vm:~/workspace$ cat links.txt
123
456
789
```

把文件内容实用命令替换成一个变量之后，文本输出是以空格分隔的，换行符被替换掉了

```bash
wudanyang@dy-turbo-vm:~/workspace$ a=$(cat links.txt)
wudanyang@dy-turbo-vm:~/workspace$ echo $a
123 456 789
```

但是如果在输出的时候使用双引号括起来，那么换行符就会被保留下来：

```bash
wudanyang@dy-turbo-vm:~/workspace$ a=$(cat links.txt)
wudanyang@dy-turbo-vm:~/workspace$ echo "$a"
123
456
789
```

## 3 读取文件的时候空格被当成了分隔符

当有这样一个文件：

```bash
$ cat links.txt
hello world
today is weekend
so happy
```

直接输出是这样的：

```bash
wudanyang@dy-turbo-vm:~/workspace$ a=$(cat links.txt)
wudanyang@dy-turbo-vm:~/workspace$ echo $a
hello world today is weekend so happy
```

如果直接读取的话，因为默认空格是分隔符，所以会认为这是很多行

```bash
$ for i in $(cat links.txt); do echo $i; done
hello
world
today
is
weekend
so
happy
```

### 3.1 使用双引号解决

使用双引号可以解决这个问题，不实用shell的字符处理，而是使用双引号的字符处理逻辑：

```bash
for i in "$(cat links.txt)"; do echo "$i"; done
hello world
today is weekend
so happy
```

### 3.2 使用 IFS 修改默认分隔符

当然也可以使用 IFS，**把默认的分隔符修改掉，但是记得要还原回来**， 不然可能执行别的程序会有问题

```bash
oriIFS=$IFS;IFS=

### 3.3 使用管道+read指令

> The _read_ utility shall read a single logical line from standard input into one or more shell variables.

```bash
cat links.txt | while read i; do echo $i; done
hello world
today is weekend
so happy
```

## 4 小结

可以看到命令替换的字符串还是有一些弯弯绕绕的，所以，一般情况下，就不要使用命令替换，而是直接使用管道，或者就不使用shell了

## 5 参考

命令替换 2.6.3 Command Substitution ： [Shell Command Language](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/V3_chap02.html#tag_18_06_03)
[shell - 为什么使用命令替换时换行符会丢失？ - Unix 和 Linux 堆栈交换 --- shell - Why do newline characters get lost when using command substitution? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/164508/why-do-newline-characters-get-lost-when-using-command-substitution)

[阅读(1p) - Linux 手册页 --- read(1p) - Linux manual page](https://man7.org/linux/man-pages/man1/read.1p.html)
\n'; for i in $(cat links.txt); do echo $i; done;IFS=$oriIFS;
hello world
today is weekend
so happy
```

### 3.3 使用管道+read指令

> The _read_ utility shall read a single logical line from standard input into one or more shell variables.

{{CODE_BLOCK_9}}

## 4 小结

可以看到命令替换的字符串还是有一些弯弯绕绕的，所以，一般情况下，就不要使用命令替换，而是直接使用管道，或者就不使用shell了

## 5 参考

命令替换 2.6.3 Command Substitution ： [Shell Command Language](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/V3_chap02.html#tag_18_06_03)
[shell - 为什么使用命令替换时换行符会丢失？ - Unix 和 Linux 堆栈交换 --- shell - Why do newline characters get lost when using command substitution? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/164508/why-do-newline-characters-get-lost-when-using-command-substitution)

[阅读(1p) - Linux 手册页 --- read(1p) - Linux manual page](https://man7.org/linux/man-pages/man1/read.1p.html)
