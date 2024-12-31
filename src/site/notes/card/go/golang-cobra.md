---
{"dg-publish":true,"permalink":"/card/go/golang-cobra/","tags":["Go"],"noteIcon":"2","created":"2024-12-20T14:31:47+08:00","updated":"2024-12-31T10:27:43+08:00"}
---


# golang-cobra

## 简介

cobra 可以帮助快速构建命令行程序

## 用法

### 快速搭建脚手架

安装`cobra-cli`

```bash
go install github.com/spf13/cobra-cli@latest
```

在一个已有的代码库中，使用 `cobra-cli init` 可以初始化一个代码库，然后执行 `go run main.go` 会展示出当前支持的命令
初始化之后的目录结构如下所示：

```bash
  ▾ app/
    ▾ cmd/
        root.go
      main.go
```

### 新增命令

```bash
cobra-cli add serve
cobra-cli add config
cobra-cli add create -p 'configCmd'
```

细节安装后查看

### 命令代码编写

以我的一个代码上传开发机的小程序为例： https://github.com/wudanyang6/simple-file-sync.git
我增加了两个命令，一个是`client`一个是`server`

拿简单点的 server 来看：

```go
var serverCmd = &cobra.Command{  
    Use:   "server --port",  
    Short: "server for simple file sync",  
    Long:  `A server for simple file sync. For example: simple-file-sync server `,  
    Run: func(cmd *cobra.Command, args []string) {  
       server.NewServer(ServerPort, ServerToken, ServerLimitDir).Start()  
    },  
}
```

- `Use` 这里代表应该在主命令后面写什么才能运行子命令
- `Short` & `Long` 代表子命令的描述
- `Run` 是真正的代码逻辑，我一般习惯将逻辑写在其他包里面，这里只做命令初始化

#### 参数传递

参数传递非常方便，并且使用 spf13 大神的 pflag 包，长短命令形式都支持

```go
serverCmd.Flags().IntVar(&ServerPort, "port", 8120, "port to listen on")  
serverCmd.Flags().StringVar(&ServerToken, "token", serverToken, "token for authentication")
```

## 效果

-h 命令

```bash
$ simple-file-sync server -h
A server for simple file sync. For example: simple-file-sync server

Usage:
  simple-file-sync server --port [flags]

Flags:
  -h, --help               help for server
      --limit-dir string   You can’t upload to anything other than the limit-dir folder, default is your home directory (default "/your/homeDir")
      --port int           port to listen on (default 8120)
      --token string       token for authentication (default "kfcvme50")
```

执行效果：

```go
$ simple-file-sync server   
2024/12/31 10:26:34 Starting server at port 8120...
2024/12/31 10:26:34 Limit directory:  /Users/wudanyang
2024/12/31 10:26:34 Token:  kfcvme50
```

## 参考

官方库：[spf13/cobra: A Commander for modern Go CLI interactions](https://github.com/spf13/cobra)
cobra 库介绍：[Go 每日一库之 cobra - 大俊的博客](https://darjun.github.io/2020/01/17/godailylib/cobra/)
[cobra-cli/README.md at main · spf13/cobra-cli](https://github.com/spf13/cobra-cli/blob/main/README.md)
