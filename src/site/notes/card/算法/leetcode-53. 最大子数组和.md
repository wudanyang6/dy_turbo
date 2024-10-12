---
{"dg-publish":true,"permalink":"/card/算法/leetcode-53. 最大子数组和/","tags":["dp"],"noteIcon":"2","created":"2023-02-26T18:03:28+08:00","updated":"2024-04-19T14:09:50+08:00"}
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
