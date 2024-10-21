---
{"dg-publish":true,"permalink":"/card/Linux/shell/shell-生成随机数/","tags":["aigc-kimi"],"noteIcon":"2","created":"2021-08-05T14:07:06+08:00","updated":"2024-10-20T23:57:33+08:00"}
---


# shell-生成随机数

变量范围是：`[0, 32767]`  `echo $RANDOM`

> [!NOTE]
> **RANDOM** Each time this parameter is referenced, it expands to a
>               random integer between 0 and 32767.  Assigning a value to
>               **RANDOM** initializes (seeds) the sequence of random numbers.
>               If **RANDOM** is unset, it loses its special properties, even
>               if it is subsequently reset.

在 Linux 的 Bash 脚本中，`$RANDOM` 是一个特殊的变量，它用于生成一个随机整数。每次引用 `$RANDOM` 时，它都会返回一个介于 0 到 32767 之间的随机数。这个变量是由 Bash 内置的，不需要任何外部程序或模块支持。

以下是一些使用 `$RANDOM` 的常见方式：

1. **生成随机数**：

   ```bash
   echo $RANDOM
   ```

   这将输出一个 0 到 32767 之间的随机整数。

2. **生成特定范围内的随机数**：
   如果你想要生成一个在特定范围内的随机数，可以使用算术扩展。例如，生成一个 1 到 10 之间的随机数：

   ```bash
   echo $((RANDOM % 10 + 1))
   ```

   这里，`%` 是取模运算符，用于得到除法的余数，`+ 1` 是为了将范围从 0 到 9 调整为 1 到 10。

3. **在循环中使用**：
   你可以在循环中使用 `$RANDOM` 来生成一系列随机数：

   ```bash
   for i in {1..5}
   do
       echo $((RANDOM % 100))
   done
   ```

   这将输出 5 个 0 到 99 之间的随机数。

4. **生成随机选择**：
   你可以通过比较 `$RANDOM` 和一个上限值来随机选择一个选项：

   ```bash
   choice=$((RANDOM % 2))
   if [ $choice -eq 0 ]; then
       echo "Heads"
   else
       echo "Tails"
   fi
   ```

   这将随机输出 "Heads" 或 "Tails"。

请注意，虽然 `$RANDOM` 可以用于简单的随机数生成需求，但它并不适用于需要高质量随机性的场景，比如密码生成或加密应用。对于这些场景，你可能需要使用更专业的随机数生成器，如 `/dev/urandom` 或 `/dev/random` 设备，或者使用其他编程语言提供的加密安全的随机数生成函数。


[bash(1) - Linux manual page](https://www.man7.org/linux/man-pages/man1/bash.1.html)
