---
{"dg-publish":true,"permalink":"/card/Linux/linux-wait/","tags":["linux"],"noteIcon":"2","created":"2023-12-11T23:48:10+08:00","updated":"2025-02-18T22:05:49+08:00"}
---


# linux-wait

```bash
for pid in $(jobs -p); do
    wait $pid
    status=$?
    if [ $status != 0 ]; then
        echo " $pid status is $status have some error!" >> your_log
    else
        echo "$pid status is $status success!" >> your_log
    fi
done
```

# Reference

[wait(1p) - Linux manual page](https://man7.org/linux/man-pages/man1/wait.1p.html)
