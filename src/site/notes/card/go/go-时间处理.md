---
{"dg-publish":true,"permalink":"/card/go/go-时间处理/","noteIcon":"2","created":"2023-11-29T20:06:36+08:00","updated":"2024-10-20T22:47:27+08:00"}
---


# go-时间处理

carbon 库

官网的示例也非常丰富

```Go
import "github.com/golang-module/carbon/v2"

func main() {
	cTime := carbon.SetTimezone(carbon.Shanghai)  
	// 获取明天凌晨0点的时间戳
	tomorrowUnixTime := cTime.Tomorrow().StartOfDay().Timestamp()  
	// 获取当前时间的时间戳
	currentUnixTime := cTime.Now().Timestamp()  
	fmt.Println(tomorrowUnixTime, currentUnixTime)
}
```

# Reference

- https://github.com/golang-module/carbon
