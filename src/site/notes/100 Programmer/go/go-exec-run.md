---
{"dg-publish":true,"permalink":"/100 Programmer/go/go-exec-run/","noteIcon":"2","created":"2024-03-13T15:51:45+08:00","updated":"2024-03-13T15:53:16+08:00"}
---


# go-exec-run

`Run` 和 `Wait` 都是 `os/exec` 包中 `Cmd` 结构体的方法，用于执行外部命令，但它们在执行方式上有一些关键的区别。

## Run 方法

`Run` 方法会启动外部命令，等待它完成，并返回一个错误值。如果命令成功执行（即退出状态为0），`Run` 返回 `nil`。如果命令执行失败（比如命令不存在，或者执行过程中出现了错误），则返回一个非 `nil` 的错误值。

`Run` 是一个阻塞调用，意味着它会阻塞当前的 Goroutine 直到外部命令执行完成。它实际上是 `Start` 和 `Wait` 方法的组合。首先，`Run` 调用 `Start` 方法来启动命令，然后立即调用 `Wait` 方法等待命令执行结束。

```go
cmd := exec.Command("echo", "Hello, World!")
err := cmd.Run()
if err != nil {
    log.Fatalf("cmd.Run() failed with %s\n", err)
}
```

## Wait 方法

`Wait` 方法会阻塞调用它的 Goroutine，直到 `Cmd` 表示的命令执行完成。它必须在 `Start` 方法之后调用。`Start` 方法启动命令但不等待它结束，这使得你可以在命令执行的同时做一些其他的事情（比如读取命令的输出）。一旦你准备好等待命令执行完成，就可以调用 `Wait` 方法。

如果命令成功执行，`Wait` 返回 `nil`。如果执行失败，则返回一个非 `nil` 的错误值。

使用 `Start` 和 `Wait` 的组合，你可以更灵活地控制命令的执行过程。

```go
cmd := exec.Command("echo", "Hello, World!")
err := cmd.Start()
if err != nil {
    log.Fatal(err)
}

err = cmd.Wait()
if err != nil {
    log.Fatal(err)
}
```

## 区别总结

- `Run` 是一个便利的方法，用于当你只需要简单地执行一个命令并等待它完成时。它是 `Start` 和 `Wait` 的组合。
- 使用 `Start` 和 `Wait` 可以让你在命令执行的同时做一些其他的处理，比如并发地处理命令的输出。这提供了更高的灵活性，但也需要你手动管理命令的启动和完成等待。

选择使用哪一个方法取决于你的具体需求和你想要的控制级别。对于大多数简单的用例，`Run` 方法可能就足够了。但如果你需要更细粒度的控制，比如并发处理命令的输出，那么使用 `Start` 和 `Wait` 的组合可能更合适。

# Reference
