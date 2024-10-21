---
{"dg-publish":true,"permalink":"/card/算法/leetcode-401. 二进制手表/","tags":["leetcode"],"noteIcon":"2","created":"2023-02-26T18:03:27+08:00","updated":"2024-10-21T16:54:48+08:00"}
---


# leetcode-401. 二进制手表

[401. 二进制手表](https://leetcode-cn.com/problems/binary-watch/)

#算法/回溯算法

1,2,4,8
取 2 个

1，2 = 3
1，4 = 5
1，8 = 9
2，4 = 6
2，8 = 10
4，8 = 12

1，2，4 = 7
1，2，8 = 11
1，4，8 = 13
2，4，8 = 14

1，2，4，8


1,2,4,8,16,32

1,2 = 3
1,4 = 5
1,8 = 9
1,16 =17
1,32 = 33
2,4 = 6
2,8 = 10
2,16 = 18
2,32 = 34
4,8 = 12
4,16 = 20
4,32 = 36
8,16 = 24
8,32 = 40
16,32 = 48

1,2,4 = 7
1,2,8 = 11
1,2,16 = 19
1,2,32 = 35
1,4,8 = 13
1,4,16 = 21
1,4,32 = 37
1,8,16 = 25
1,8,32 = 41
1,16,32 = 49
2,4,8 = 14
2,4,16 = 22
2,4,32 = 38
4,8,16 = 28
4,8,32 = 44
8,16,32 = 56

1,2,4,8,16,32

1,2,4,8 = 15
1,2,4,16 = 23
1,2,4,32 = 39
1,4,8,16 = 29
1,4,8,32 = 45
1,8,16,32 = 57
2,4,8,16 = 30
2,4,8,32 = 46
4,8,16,32 = 60

1,2,4,8,16 = 31
1,2,4,8,32 = 47
2,4,8,16,32 = 62

1,2,4,8,16,32 = 


枚举出来所有的集合

```php
        $hourSet   = [
            0 => [0],
            1 => [1, 2, 4, 8],
            2 => [3, 5, 9, 6, 10],
            3 => [7, 11],
        ];
        $minuteSet = [
            0 => [0],
            1 => [1, 2, 4, 8, 16, 32],
            2 => [3, 5, 9, 17, 33, 6, 10, 18, 34, 12, 20, 36, 24, 40, 48],
            3 => [7, 11, 19, 35, 13, 21, 37, 25, 41, 49, 14, 22, 38, 28, 44, 56],
            4 => [15, 23, 39, 29, 45, 57, 30, 46],
            5 => [31, 47],
        ];
```

话不多说，上代码，差点栽在一个简单题手里，也是我没有想到的 

其实呢，我有两种思路
- 一种就是把小时和分钟的所有位表示的数字都枚举出来，然后最后处理一下最后的输出格式就行了，这个可行，但是废手，而且容易出错
- 另外一种就是利用递归的方式，计算出每一步的所有可能值

第二种方式：

```php
class Solution {
    
    /**
     * @param Integer $turnedOn
     * @return String[]
     */
    public function readBinaryWatch($turnedOn) {
        // 时针最多有 4 个
        // 分针最多亮 6 个
        
        $hour    = [1, 2, 4, 8];
        $minutes = [1, 2, 4, 8, 16, 32];
        
        $ret = [];
        for ($i = 0; $i <= $turnedOn && $i < 4; $i++) {
            $hourPossible   = $this->getSetPossible($hour, $i, 11);
            $minutePossible = $this->getSetPossible($minutes, $turnedOn - $i, 59);
            
            foreach ($hourPossible as $hItem) {
                foreach ($minutePossible as $mItem) {
                    if ($mItem < 10) {
                        $mItem = '0' . $mItem;
                    }
                    $ret[] = $hItem . ':' . $mItem;
                }
            }
        }
        

        
        return $ret;
    }
    
    /**
     * @param $set
     * @param $count
     * @param $maxValue
     * @return array
     */
    public function getSetPossible($set, $count, $maxValue) {
        if ($count == 0) {
            return [0];
        }
        if ($count == 1) {
            return $set;
        }
        
        $setLen = count($set);
        
        $ret = [];
        
        // 第一个值的取值范围
        $maxIndex = $setLen - $count;
        
        // 第一个值的取值范围如果超过,那么退出
        for ($i = 0; $i <= $maxIndex; $i++) {
            $possibleSet = $this->getSetPossible(array_slice($set, $i + 1), $count - 1, $maxValue);
            foreach ($possibleSet as $setItem) {
                if ($setItem + $set[$i] <= $maxValue) {
                    $ret[] = $set[$i] + $setItem;
                }
            }
        }
        
        return $ret;
    }
}
```
