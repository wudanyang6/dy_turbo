---
{"dg-publish":true,"permalink":"/300 Code/300 Leetcode/具体题目/leetcode-1137. 第 N 个泰波那契数/","noteIcon":"","updated":"2024-01-29T23:18:56.408+08:00"}
---


#leetcode

# 题目

[1137. 第 N 个泰波那契数](https://leetcode-cn.com/problems/n-th-tribonacci-number/)
这个跟斐波那契好像是一样的，一模一样

# 解法

跟斐波纳契数列一样的解法

``` php
class Solution {

    /**
     * @param Integer $n
     * @return Integer
     */
    function tribonacci($n) {
        if ($n <= 0) {
            return 0;
        }
        
        $retArr = [0,1,1];
        for ($i = 3; $i <= $n; $i++) {
            $retArr[$i] = $retArr[$i-1] + $retArr[$i-2] + $retArr[$i-3];
        }

        return $retArr[$n];
    }
}
```

# 参考