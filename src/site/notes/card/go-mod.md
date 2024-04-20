---
{"info":true,"tags":null,"date created":"2021-07-17T23:33:45+08:00","date modified":"2024-04-20T22:38:10+08:00","dg-publish":true,"permalink":"/card/go-mod/","dgPassFrontmatter":true,"noteIcon":"2","created":"2021-07-17T23:33:45+08:00","updated":"2024-04-20T22:38:10+08:00"}
---


# go-mod

```go
module novel-spider  
  
go 1.16  
  
require (  
   github.com/antchfx/xpath latest  
)

replace (
    golang.org/x/crypto v0.0.0-20190313024323-a1f597ede03a => github.com/golang/crypto v0.0.0-20190313024323-a1f597ede03a
)

```

module 当前包的名字

require 指定依赖项， 跟  [[card/go-import\|go-import]] 很像

replace 无法自动获取的资源，可以使用 replace 来用本地资源替代

参考： https://www.jianshu.com/p/760c97ff644c


```Shell
go mod init [模块名]
go mod tidy
```
