---
{"dg-publish":true,"permalink":"/card/Linux/使用shell脚本快速并行启动指定数量的进程/","tags":["shell"],"noteIcon":"2","created":"2023-12-11T23:46:07+08:00","updated":"2025-02-18T22:05:47+08:00"}
---


# 使用shell脚本快速并行启动指定数量的进程

shell 脚本提升速度

```bash
i=0
while true;do
    # 此文件里面可以放同时执行的数量
    mod=$(cat process_count.plain.txt)

    # 并行执行数量, 默认为3个进程执行
    if [ -z "$mod" ]; then
        mod=3
    fi

    if [ $((i % mod)) -eq "0" ]; then
        echo "running $i"
	    # 关键在这里，需要等待上一批脚本执行完成
        wait
    fi
    
    nohup sh your_script.sh >> your_script_${i}.log 2>&1 &

    ((i++))
done
```

[[card/Linux/linux-wait\|linux-wait]]
