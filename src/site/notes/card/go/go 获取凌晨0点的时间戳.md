---
{"dg-publish":true,"permalink":"/card/go/go 获取凌晨0点的时间戳/","tags":["Go"],"noteIcon":"2","created":"2023-10-21T12:23:57+08:00","updated":"2025-02-18T20:15:16+08:00"}
---


# go 获取凌晨0点的时间戳

```GO
ti := time.Now()  
yy, mm, dd := ti.AddDate(0, 0, 1).Date() // 可选的 
ti = time.Date(yy, mm, dd, 0, 0, 0, 0, ti.Location())
fmt.Println(ti.Unix())
```

使用 carbon 库

```go
package main

import (
	"fmt"
	"time"

	"github.com/uniplaces/carbon"
)

func main() {
	// 获取当前时间的carbon对象
	now := carbon.Now()

	// 找到今天凌晨0点的时间
	startOfDay := now.StartOfDay()

	// 输出凌晨0点的时间戳
	fmt.Println("Midnight Timestamp:", startOfDay.Unix())
}
```
