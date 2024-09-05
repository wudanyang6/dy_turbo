---
{"dg-publish":true,"permalink":"/card/go-exec/","tags":["Go"],"noteIcon":"2","created":"2024-03-13T15:43:24+08:00","updated":"2024-03-13T15:53:18+08:00"}
---


# go-exec

在Go语言中，`exec` 包提供了执行外部命令的功能。这个包是标准库的一部分，允许你从Go程序中运行外部的系统命令和程序。使用这个包，你可以执行Shell命令，处理命令的输入输出，以及访问命令的返回状态。

下面是如何使用 `exec` 包执行Shell命令的一些基本步骤和示例。

## 1. 导入exec包

在你的Go文件中，首先需要导入`os/exec`包。

```go
import "os/exec"
```

## 2. 创建命令

使用`exec.Command`函数创建一个新的`*exec.Cmd`对象，该对象用于执行外部命令。这个函数的第一个参数是命令名称，后续参数是命令需要的参数。

```go
cmd := exec.Command("echo", "Hello, World!")
```

如果你需要执行的命令需要Shell特性（比如管道、文件重定向等），你可以通过在Shell中执行命令来实现。例如，在Unix系统中，可以使用`bash`的`-c`选项。

```go
cmd := exec.Command("bash", "-c", "ls -l | grep .go")
```

## 3. 运行命令

有几种方法可以用来运行命令并获取输出。

[[card/go-exec-run\|go-exec-run]]

- **Run**：运行命令，并等待命令完成。

```go
err := cmd.Run()
if err != nil {
    log.Fatalf("cmd.Run() failed with %s\n", err)
}
```

- **Output**：运行命令，并收集命令的标准输出。

```go
out, err := cmd.Output()
if err != nil {
    log.Fatal(err)
}
fmt.Printf("The output is %s\n", out)
```

- **CombinedOutput**：运行命令，并收集标准输出和标准错误。

```go
out, err := cmd.CombinedOutput()
if err != nil {
    log.Fatal(err)
}
fmt.Printf("The combined output is %s\n", out)
```

- **Start** 和 **Wait**：`Start` 开始执行命令但不等待它完成，`Wait` 等待命令完成。

```go
err := cmd.Start()
if err != nil {
    log.Fatal(err)
}

err = cmd.Wait()
if err != nil {
    log.Fatal(err)
}
```

## 4. 处理命令的输入输出

你可以通过设置`Cmd`结构体的`Stdin`、`Stdout`、`Stderr`属性来处理命令的输入输出。

```go
cmd.Stdin = strings.NewReader("some input")
var out bytes.Buffer
cmd.Stdout = &out
err := cmd.Run()
if err != nil {
    log.Fatal(err)
}
fmt.Printf("The output is %s\n", out.String())
```

## 5. 获取命令的返回状态

命令的返回状态可以通过检查`Run`、`Output`或`CombinedOutput`方法返回的错误来获取。如果命令以非零状态退出，这些方法会返回一个`*exec.ExitError`类型的错误。

```go
if exitErr, ok := err.(*exec.ExitError); ok {
    // 这里可以获取到非零退出状态和更多信息
    fmt.Printf("Command exited with status %d\n", exitErr.ExitCode())
}
```

## 总结

通过Go的`exec`包，你可以方便地执行外部命令和处理Shell命令。这对于需要与系统层面交互的程序来说非常有用。记得总是仔细处理命令的输出和错误，以及考虑安全性，避免执行不受信任的命令。

# Reference
