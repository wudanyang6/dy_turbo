---
{"dg-publish":true,"permalink":"/card/Linux/shell/shell-循环/","noteIcon":"2","created":"2022-07-16T19:20:45+08:00","updated":"2024-09-09T13:32:31+08:00"}
---


# shell-循环

## for

``` Shell

# 遍历数字
for i in {0..10}; do
    echo 133
done

# 遍历文件
for file in split_??????; do
    echo ${file}
done

# 数组：
arr=(list0 list1 list2 list3)

# 遍历数组
for list in ${arr[@]}; do
	echo ${list}
done
```

## while

```Shell
while read line; do
    echo $line
done < file.txt
```
