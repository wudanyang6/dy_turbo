---
{"dg-publish":true,"permalink":"/card/算法/leetcode题目/leetcode-303. 区域和检索 - 数组不可变/","tags":["leetcode","前缀和"],"noteIcon":"2","created":"2024-07-02T23:39:04+08:00","updated":"2024-10-30T23:25:41+08:00"}
---


# leetcode-303. 区域和检索 - 数组不可变

[303. 区域和检索 - 数组不可变 - 力扣（LeetCode）](https://leetcode.cn/problems/range-sum-query-immutable/description/)
 ![Pasted image 20201123234844.png](/img/user/attachs/Pasted%20image%2020201123234844.png)
 

# 解法

## 直接遍历，也能通过

``` php
    function sumRangeV1($i, $j) {
        $ret = 0;
        for (; $i <= $j; $i++) {
            $ret += $this->nums[$i];
        }
        return $ret;
    }
```

![Pasted image 20201123234958.png](/img/user/attachs/Pasted%20image%2020201123234958.png)

~~## 分析下面数组能不能拆分~~

~~[-2, 0, 3, -5, 2, -1]~~

~~1. 拆分成多个数组~~

~~2. 只有 $i >= $left && $j <= $right  才行~~
[1, 2]

```c++

感受一下这个版本,代码即注释，就是把前面的和给减掉就行了，也算是一个 dp 

class NumArray {
private:
    int* sum;
public:
    NumArray(vector<int>& nums) {
        //sum[i] 为 nums[0 : i-1]的和
        sum = new int[nums.size() + 1];
        sum[0] = 0;
        for(int i = 1; i <= nums.size(); i++)
            sum[i] = sum[i - 1] + nums[i - 1];
    }
    ~NumArray(){
        delete[] sum;
    }
    int sumRange(int i, int j) {
        return sum[j + 1] - sum[i];
    }
};


作者：realzzg-2
链接：https://leetcode-cn.com/problems/range-sum-query-immutable/solution/qian-zhui-he-ji-hu-shuang-bai-by-realzzg-2/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

## 2024-10-30

使用前缀和，轻松拿捏

```go
type NumArray struct {
    preSum []int
}


func Constructor(nums []int) NumArray {
    numArray := NumArray{
        preSum: make([]int, len(nums)+1),
    }
    for i := range nums {
        numArray.preSum[i+1] = numArray.preSum[i]+nums[i]
    }

    return numArray
}


func (this *NumArray) SumRange(left int, right int) int {
    return this.preSum[right+1] - this.preSum[left]
}
```
