---
{"dg-publish":true,"permalink":"/card/go/go- make 和 new 关键字的区别/","noteIcon":"2","created":"2024-06-24T17:08:16+08:00","updated":"2024-10-12T10:13:32+08:00"}
---


# go- make 和 new 关键字的区别

## 1 make 和 new 关键字的区别

### 1.1 new

Go语言中 new 和 make 是两个内置函数，主要用来创建并分配类型的内存。在我们定义变量的时候，可能会觉得有点迷惑，不知道应该使用哪个函数来声明变量，其实他们的规则很简单，new 只分配内存，而 make 只能用于 slice、map 和 channel 的初始化

```GO
// The new built-in function allocates memory. The first argument is a type,
// not a value, and the value returned is a pointer to a newly
// allocated zero value of that type.
func new(Type) *Type
```

new 关键字分配内存，返回指向此内存的指针，并且内存值为此类型的 [`零值`](card/go.md#零值)

这就是 new 函数，它返回的永远是类型的指针，指针指向分配类型的内存地址。

### 1.2 make

make 也是用于内存分配的，但是和 new 不同，它只用于 `chan`、`map` 以及 `slice` 的内存创建，而且它返回的类型就是这三个类型本身，而不是他们的指针类型，因为这三种类型就是引用类型，所以就没有必要返回他们的指针了。

Go语言中的 new 和 make 主要区别如下：

-   `make` 只能用来分配及初始化类型为 `slice`、`map`、`chan` 的数据。`new` 可以分配任意类型的数据；
-   new 分配返回的是指针，即类型 *Type。make 返回引用，即 Type；
-   new 分配的空间被清零。make 分配空间后，会进行初始化；
