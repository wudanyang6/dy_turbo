---
{"dg-publish":true,"permalink":"/card/算法/leetcode题目/leetcode-53. 最大子数组和/","tags":["dp"],"noteIcon":"2","created":"2023-02-26T18:03:28+08:00","updated":"2024-10-31T23:49:33+08:00"}
---


# leetcode-53. 最大子数组和

[53. 最大子数组和](https://leetcode-cn.com/problems/maximum-subarray/)

# 解法

1. 第一版写的时候，可以加一个 dp 数组，保存每个节点的最大值

`dp` 公式

$$
f_n=
\begin{cases}
max(nums[n]+f_{n-1}, nums[n]) & n>=1 \\
nums[n], & n=0
\end{cases}
$$

```php
class Solution {
    
    /**
     * @param Integer[] $nums
     * @return Integer
     */
    function maxSubArray($nums) {
        $len = count($nums);
        if ($len == 1) {
            return $nums[0];
        }
        
        $currentMaxSum = $nums[0];
        
        $max = $nums[0];
        for ($i=1; $i < $len; $i++) {
            $currentMaxSum = max($currentMaxSum + $nums[$i], $nums[$i]);
            $max = max($currentMaxSum, $max);
        }
        
        return $max;
    }
}

```

## 2024-10-31

使用go语言重新写一遍，仍然是dp思想

该算法的核心思想是求 “**以当前位置为结尾的最大子数组和**”

```go
func maxSubArray(nums []int) int {
    if len(nums) == 0 {
        return 0
    }

    winSum := 0
    mxSum := nums[0]

    for i := range nums {
	    winSum = max(nums[i], nums[i]+winSum)
        mxSum = max(mxSum, winSum)
    }

    return mxSum
}
```
