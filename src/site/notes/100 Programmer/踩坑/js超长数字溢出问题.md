---
{"dg-publish":true,"permalink":"/100 Programmer/踩坑/js超长数字溢出问题/","noteIcon":"","created":"2022-02-26 21:02:00","updated":"2024-01-29 16:16:00"}
---


tags: #js #联调 #踩坑  #output 

https://www.cnblogs.com/wudanyang/p/15940613.html

# 现象

之前遇到过的一个问题
接口要返回给前端（js）一个比较长的数字：`759830849237899244`

看了接口返回是没问题的，但是前端拿着数字去取详情的时候，传过来的是另外一个数字：`759830849237899300`

一比较，看起来是数字被转换了

`759830849237899244` => `759830849237899300`

在前端控制台执行一下：
![Pasted image 20220226212150.png](/img/user/attachs/Pasted%20image%2020220226212150.png)
果然被转成了另外一个数字，而且看规律很像是后三位被上取整了

# 原理

后来了解到js会将数字按照下图方式切分后表示数字，以至于最高表示的数字只能到 `9007199254740991`  比这个数字更大的数字就会发生进位溢出
![Pasted image 20201109201831.png](/img/user/attachs/Pasted%20image%2020201109201831.png)

# 解决方案

解决方案很好办，那就是将数字转成字符串，只要前端不强转成数字，那就不会出问题
![iShot2022-02-26 21.46.09.jpg](/img/user/attachs/iShot2022-02-26%2021.46.09.jpg)

# 参考文档

[JSON Bigint 大数精度丢失的背后](https://cloud.tencent.com/developer/article/1477816)

[JSON.parse parses / converts big numbers incorrectly](https://stackoverflow.com/questions/10631494/json-parse-parses-converts-big-numbers-incorrectly)