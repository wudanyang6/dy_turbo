---
{"tags":null,"date created":"2024-02-04T16:28:43+08:00","date modified":"2024-04-09T11:12:08+08:00","view-date":"2024-03-18","view-count":5,"dg-publish":true,"permalink":"/100 Programmer/300 Leetcode/leetcode 编码技巧/","dgPassFrontmatter":true,"noteIcon":"2","created":"2024-02-04T16:28:43+08:00","updated":"2024-04-09T11:12:08+08:00"}
---


# leetcode 

编码技巧

## 数字

### 快速上取整

正整数的情况下， `a/b`  上取整可以使用 : 
`(a+b-1)/b`  快速计算，适用于强类型语言

### 取中间数

强类型语言：`(left+right)/2` 。此方式在 `left+right` 时有可能会出现溢出，可以使用 `left-(left-right)/2` 计算

## 二进制

### 最低位1变0

```go
num1 &= num1 - 1  // 最低的 1 变成 0
```

### 最低位0变1

```go
num1 |= num1 + 1 // 最低的 0 变成 1
```

### 判断是否是2的整数次

```Go
if (num & (num - 1)) == 0 {
	return true
}
```

### 0和1取反

```go
x ^= 1
```

```go
func flip(a int) int {
	if a == 0 {
		return 1
	}

	return 0
}
```

```go
x = 1 - x
```

## 数组

### 双指针

[1. 两数之和 - 力扣（LeetCode）](https://leetcode.cn/problems/two-sum/?envType=featured-list&envId=2cktkvj?envType=featured-list&envId=2cktkvj)
[[100 Programmer/300 Leetcode/具体题目/leetcode-42. 接雨水\|leetcode-42. 接雨水]]
对向双指针 [[100 Programmer/300 Leetcode/具体题目/leetcode-11. 盛最多水的容器\|leetcode-11. 盛最多水的容器]]

### 前缀和

```Go
pre := []int{}

for i := range nums {
	if i == 0 {
		pre[i] = 0
		continue
	}

	pre[i] = pre[i-1] + nums[i-1]
}
```

#### 从前缀和中获取后缀和

```go
// 小技巧，前缀和也能得出后缀和
if i == 0 {
    postfixSum = prefixSum[len(prefixSum)-1]
} else {
    postfixSum = prefixSum[len(prefixSum)-1] - prefixSum[i-1]
}
```

## 深度搜索

### 方向

在做深度搜索题时，经常用到方向，可以用下面的代码判断方向

```go
var (
    dx = []int{1, 0, 0, -1}
    dy = []int{0, 1, -1, 0}
)

// 四个方向
for j := 0; j < 4; j++ {
    mx, my := cell[0] + dx[j], cell[1] + dy[j]
    // 查看每个方向有没有超出边界，如果没有超出边界则进行处理
    if mx >= 0 && mx < n && my >= 0 && my < m && image[mx][my] == currColor {
        queue = append(queue, []int{mx, my})
        image[mx][my] = color
    }
}
```

## 字符串

### 字符在数组中的偏移位置

```go
widths[c-'a']
```

## 矩阵

[[100 Programmer/300 Leetcode/技巧/判断点在对角线上\|判断点在对角线上]]

## Reference
