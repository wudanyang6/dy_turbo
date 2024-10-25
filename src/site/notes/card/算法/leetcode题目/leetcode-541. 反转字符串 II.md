---
{"dg-publish":true,"permalink":"/card/算法/leetcode题目/leetcode-541. 反转字符串 II/","tags":["leetcode"],"noteIcon":"2","created":"2023-02-26T18:03:28+08:00","updated":"2024-10-25T13:20:08+08:00"}
---


# leetcode-541. 反转字符串 II

[541. 反转字符串 II - 力扣（Leetcode）](https://leetcode.cn/problems/reverse-string-ii/description/)

比较简单，想清楚边界条件，然后做一下字符的反转即可。go 可以将不能变动的字符串转换成可以变动的 `[]byte` 之后，修改完之后，再转成 string

```Go
func reverseStr(s string, k int) string {
	if len(s) <= 1 {
		return s
	}

	strBytes := []byte(s)

	var left, right int
	// abcdefg   2
	for ; right < len(strBytes); right++ {
		if (right-left) >= 2*k-1 || right == len(strBytes)-1 {
			if left+k-1 > len(strBytes)-1 {
				swapStrBytes(strBytes, left, len(strBytes)-1)
			} else {
				swapStrBytes(strBytes, left, left+k-1)
			}
			left = right + 1
		}
	}

	return string(strBytes)
}

func swapStrBytes(s []byte, left, right int) {
	if left >= right {
		return
	}

	for left < right {
		s[left], s[right] = s[right], s[left]
		left++
		right--
	}
}
```
