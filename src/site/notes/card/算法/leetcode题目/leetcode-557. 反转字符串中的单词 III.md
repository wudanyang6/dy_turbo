---
{"dg-publish":true,"permalink":"/card/算法/leetcode题目/leetcode-557. 反转字符串中的单词 III/","tags":["leetcode"],"noteIcon":"2","created":"2023-02-26T18:03:27+08:00","updated":"2024-10-21T12:41:35+08:00"}
---


# leetcode-557. 反转字符串中的单词 III

[557. 反转字符串中的单词 III - 力扣（Leetcode）](https://leetcode.cn/problems/reverse-words-in-a-string-iii/description/)

与代码 [[card/算法/leetcode题目/leetcode-541. 反转字符串 II\|leetcode-541. 反转字符串 II]] 相关联，`swapStrBytes` 函数，使用了上次的代码

```Go
func reverseWords(s string) string {
    sBytes := []byte(s)
    
    for left, right := 0, 0; right < len(sBytes);  right++ {
        if sBytes[right] == ' ' {
            swapStrBytes(sBytes, left, right-1)
            left = right+1
        }
        if right == len(sBytes) - 1 {
            swapStrBytes(sBytes, left, right)
        }
    }

    return string(sBytes)
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
