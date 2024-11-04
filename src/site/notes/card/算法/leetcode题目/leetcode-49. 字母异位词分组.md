---
{"dg-publish":true,"permalink":"/card/算法/leetcode题目/leetcode-49. 字母异位词分组/","tags":["leetcode"],"noteIcon":"2","created":"2023-02-26T18:03:28+08:00","updated":"2024-10-26T16:58:07+08:00"}
---


# leetcode-49. 字母异位词分组

[49. 字母异位词分组 - 力扣（Leetcode）](https://leetcode.cn/problems/group-anagrams/description/)

两种方法，都是把 key 聚合起来

```Go
func groupAnagrams(strs []string) [][]string {
    mp := make(map[[26]int][]string)

    for _, str := range strs {
        var cCnt [26]int

        for _, b := range str {
            cCnt[b-'a'] ++
        }

        mp[cCnt] = append(mp[cCnt], str)
    }

    var ret [][]string

    for _, m := range mp {
        ret = append(ret, m)
    }

    return ret
}
```

## 2024-10-26 16:44

```go
func groupAnagrams(strs []string) [][]string {
    retMap := map[[26]byte][]string{}

    for _, s := range strs {
        var key [26]byte
        for _, b := range []byte(s) {
            key[b-97] ++
        }

        retMap[key] = append(retMap[key], s)
    }

    ret := [][]string{}
    for _, r := range retMap {
        ret = append(ret, r)
    }

    return ret
}
```

这两个版本的 `groupAnagrams` 函数基本实现相同，都是通过构造字母计数数组 `key` 来对字母异位词进行分组，但有一些细节上的优化空间：

1. **变量类型优化**：
   - 第二个版本使用 `[26]byte` 而不是 `[26]int` 作为 `key` 的类型。`byte` 是 `uint8` 的别名，占用更小的内存，在这种场景下是合理的选择，因为字母计数不会超过 `255`。
   - 在性能上，`byte` 数组的哈希处理可能稍微快一点，因为它是更小的数值类型。

2. **字符索引转换**：
   - 第一版使用 `cCnt[b-'a']`，而第二版使用 `key[b-97]`。两者在功能上是一样的，只是 `97` 是 `'a'` 的 ASCII 值，显式的 `97` 有助于代码执行更直接的索引定位。
   - 为了提升可读性，使用 `'a'` 可以更直观地说明这个值是为了计算字母位置。

3. **初始化变量的方式**：
   - 第二个版本直接使用 `map[...][]string{}` 作为 `retMap` 的初始化方式，写法上更简洁，减少了 `make` 的调用。

4. **结构一致性**：
   - `retMap` 和 `ret` 在两版代码中分别表示分组字典和结果容器。虽然功能一致，但如果你更喜欢语义化的命名，可以考虑更贴近业务逻辑的命名。

总的来说，这些修改带来了代码的更紧凑写法和微小的内存性能优化。

后面写的这一版明显比之前的要好很多了，而且写得很快
