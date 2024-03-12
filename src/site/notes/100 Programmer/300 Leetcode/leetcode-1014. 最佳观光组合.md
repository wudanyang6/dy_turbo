---
{"dg-publish":true,"permalink":"/100 Programmer/300 Leetcode/leetcode-1014. 最佳观光组合/","noteIcon":"","created":"2023-02-26T18:03:28+08:00","updated":"2024-02-28T22:24:03+08:00"}
---


#leetcode

# 题目

 [1014. 最佳观光组合](https://leetcode-cn.com/problems/best-sightseeing-pair/)

# 解法

转换一下公式

vn 代表 i 与 j 的值
fn 为最大值

因为 `values[j] - j` 是固定的，所以，只需要求 `values[i] + i` 的最大值就可以了

$$
\begin{array}{l}
v_{n}=\text { values }[i]+i+\text { values }[j]-j \\
f_{n}=\max (\text { values }[i]+i +\text { values }[j]-j
\end{array}
$$

``` php
class Solution {
    
    /**
     * @param Integer[] $values
     * @return Integer
     */
    function maxScoreSightseeingPair($values) {
        $len = count($values);
        $max = $maxI = 0;
        for ($i = 0; $i < $len; $i++) {
            $max = max($max, $maxI + $values[$i] - $i);
            $maxI = max($values[$i], $maxI);
        }
        
        return $max;
    }
}

```

# 参考

 [官方题解](https://leetcode-cn.com/problems/best-sightseeing-pair/solution/zui-jia-guan-guang-zu-he-by-leetcode-solution/)
