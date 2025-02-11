---
{"dg-publish":true,"permalink":"/000 inbox/python-为什么 {} 不能作为默认参数？/","noteIcon":"2","created":"2025-02-10T14:56:03+08:00","updated":"2025-02-11T22:48:01+08:00"}
---


# python-为什么 {} 不能作为默认参数？

![](/img/user/attachs/Pasted image 20250210145605.png)

这里会有个提示，但不是报错

**为什么 {} 不能作为默认参数？**

在 Python 中，**函数的默认参数只在函数定义时计算一次**，所以如果你使用 {} 作为默认值，它会在所有函数调用之间**共享**。这意味着：

- **多次调用 resp_success() 时，data 会共享同一个字典**

- **如果 data 在一个调用中被修改，后续调用也会受到影响**（因为所有调用都引用同一个 {}）

比如下面的代码：

```python
def add_item(item, items=[]):
    items.append(item)
    return items

# 第一次调用，期望返回 [1]
print(add_item(1))  # 输出 [1]

# 第二次调用，期望返回 [2]，但实际输出 [1, 2]
print(add_item(2))  # 输出 [1, 2]
```

解决方法，默认参数改成不可变的变量，或者 `None`

```python
def add_item_fixed(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

# 第一次调用返回 [1]
print(add_item_fixed(1))  # 输出 [1]

# 第二次调用返回 [2]
print(add_item_fixed(2))  # 输出 [2]
```
