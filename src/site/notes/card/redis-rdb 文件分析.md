---
{"dg-publish":true,"permalink":"/card/redis-rdb 文件分析/","tags":["redis","rdb"],"noteIcon":"2","created":"2020-11-09T21:44:35+08:00","updated":"2024-10-07T12:15:55+08:00"}
---


[[card/redis/202011281031 - 安装 rdbtools 工具\|202011281031 - 安装 rdbtools 工具]]

# redis-rdb 文件分析

## 命令行工具使用，先看 `--help`

``` shell
usage: usage: rdb [options] /path/to/dump.rdb

Example : rdb --command json -k "user.*" /var/redis/6379/dump.rdb

positional arguments:
  dump_file             RDB Dump file to process

optional arguments:
  -h, --help            show this help message and exit
  -c CMD, --command CMD     
                        Command to execute. Valid commands are json, diff,
                        justkeys, justkeyvals, memory and protocol
  -f FILE, --file FILE  Output file
  -n DBS, --db DBS      Database Number. Multiple databases can be provided.
                        If not specified, all databases will be included.
  -k KEYS, --key KEYS   Keys to export. This can be a regular expression
  -o NOT_KEYS, --not-key NOT_KEYS
                        Keys Not to export. This can be a regular expression
  -t TYPES, --type TYPES
                        Data types to include. Possible values are string,
                        hash, set, sortedset, list. Multiple typees can be
                        provided. If not specified, all data types will be
                        returned
  -b BYTES, --bytes BYTES
                        Limit memory output to keys greater to or equal to
                        this value (in bytes)
  -l LARGEST, --largest LARGEST
                        Limit memory output to only the top N keys (by size)
  -e {raw,print,utf8,base64}, --escape {raw,print,utf8,base64}
                        Escape strings to encoding: raw (default), print,
                        utf8, or base64.
  -x, --no-expire       With protocol command, remove expiry from all keys
  -a N, --amend-expire N
                        With protocol command, add N seconds to key expiry
                        time
```

参数解析
1. -c 执行命令 输出不同格式的数据
	1. json; 输出 json 格式的字符串  如： `[{"int":"1"}]`
	2. diff; 导出可供 diff 、kdiff 、 vimdiff  比较的数据
	3. justkeys; 只输出 key
	4. justkeyvals; 只输出键值对，以空格分隔
	5. memory; 输出内存分布状态
	6. protocol; 输出原始的 RESP 协议
2. -f 指定输出到文件
3. -n 指定输出的 db
4. -k 指定输出哪些 key; 可以使用正则表达式， 如： `'^users_\d+$'`
5. -o 排除哪些 key; 可以使用正则表达式
6. -t 指定输出 value 的类型
7. -b 指定大于此字节数的 key 输出
8. -l 输出最大的多少个 key
9. -e 转义字符串到其他格式
	1. raw 原始字符串
	2. print
	3. utf8 输出原始 utf8 格式字符串
	4. base64 对于二进制数据来说，可以先 base64 存储到文件，然后在程序中 decode 出来
10. -x 在导出 RESP 协议内容时，去掉过期时间
11. -a 导出 RESP 协议内容时，给有过期时间的 key 加上几秒钟过期时间

下面看一下一些常见用法：

## 生成内存报告

```bash
rdb --command memory dump.rdb > memory.csv
```

生成 CSV 格式的内存报告。包含的列有：
数据库 ID，数据类型，key，内存使用量(byte)，编码。内存使用量包含 key、value 和其他值，结果：

``` csv
database,type,key,size_in_bytes,encoding,num_elements,len_largest_element,expiry
0,set,fruit,252,hashtable,2,6,
0,hash,webset,81,ziplist,1,13,
0,string,baiduyun,64,string,5,5,
0,list,languages,161,quicklist,2,6,
0,sortedset,page_rank,80,ziplist,1,9
```

## 使用参数过滤想要的数据

``` shell
# 使用这个命令会将存储的 int 值显示为 json 的字符串
> rdb -c json --db 2 --type hash --key "a.*" /var/redis/6379/dump.rdb

[{},{
"aroma":{"pungent":"vinegar","putrid":"rotten eggs","floral":"roses"}}]

```

## 比较两个 rdb 文件

```bash
> rdb --command diff /var/redis/6379/dump1.rdb | sort > dump1.txt
> rdb --command diff /var/redis/6379/dump2.rdb | sort > dump2.txt

# 使用 diff 软件查看 diff
> kdiff3 dump1.txt dump2.txt
```

## 查看一个 key 的内存使用情况

```bash
> redis-memory-for-key person:1

> redis-memory-for-key -s localhost -p 6379 -a mypassword person:1

Key 			person:1
Bytes				111
Type				hash
Encoding			ziplist
Number of Elements		2
Length of Largest Element	8          # hash 中占用内存最大的那个 value 的占用字节数
```

# 常见问题 FAQ

- 内存报告的精确度如何？

	答：最多有 10% 的误差

- 存储了一个二进制 binary 数据，但是输出的时候是乱码，不可读，怎么处理？

	答：可以使用 -e 命令先输出 base64 编码的字符串，然后程序中解码之后使用
	
- 这个工具能解析哪个版本的 rdb 文件？
	
	答：2~6 版本
	
- 我不想用 python，有其他的解析方案吗？
	
	答：
	1.  [redis-rdb](https://github.com/nrk/redis-rdb) is written in Ruby
	2.  [rdbhs](https://github.com/esmooov/rdbhs) is written in Haskell
	3.  [rdb-parser](https://github.com/pconstr/rdb-parser) is written in Node.js
	4.  [rdb](https://github.com/titanous/rdb) is written in Go
	5.  [rdb-rs](https://github.com/badboy/rdb-rs) is written in Rust
	6.  参阅 [rdb 文件格式](https://github.com/sripathikrishnan/redis-rdb-tools/wiki/Redis-RDB-Dump-File-Format) 自己写一个解析

# 参考

https://github.com/sripathikrishnan/redis-rdb-tools
