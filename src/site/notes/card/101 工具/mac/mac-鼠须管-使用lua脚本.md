---
{"dg-publish":true,"permalink":"/card/101 工具/mac/mac-鼠须管-使用lua脚本/","tags":["输入法"],"noteIcon":"2","created":"2021-12-26T00:31:15+08:00","updated":"2024-09-26T15:32:50+08:00"}
---


# mac-鼠须管-使用lua脚本

1. 在 `lua` 目录中，添加脚本，以 `date` 日期文件为例：

```lua
--[[
date_translator: 将 `date` 翻译为当前日期

translator 的功能是将分好段的输入串翻译为一系列候选项。

欲定义的 translator 包含三个输入参数：
 - input: 待翻译的字符串
 - seg: 包含 `start` 和 `_end` 两个属性，分别表示当前串在输入框中的起始和结束位置
 - env: 可选参数，表示 translator 所处的环境（本例没有体现）

translator 的输出是若干候选项。
与通常的函数使用 `return` 返回不同，translator 要求您使用 `yield` 产生候选项。

`yield` 每次只能产生一个候选项。有多个候选时，可以多次使用 `yield` 。

请看如下示例：
--]]

local function translator(input, seg)
   -- 如果输入串为 `date` 则翻译
   if (input == "date" or input == "shijian") then
      --[[ 用 `yield` 产生一个候选项
           候选项的构造函数是 `Candidate`，它有五个参数：
            - type: 字符串，表示候选项的类型
            - start: 候选项对应的输入串的起始位置
            - _end:  候选项对应的输入串的结束位置
            - text:  候选项的文本
            - comment: 候选项的注释
       --]]
      yield(Candidate("date", seg.start, seg._end, os.date("%Y年%m月%d日"), "日期"))
      --[[ 用 `yield` 再产生一个候选项
           最终的效果是输入法候选框中出现两个格式不同的当前日期的候选项。
      --]]
      yield(Candidate("date", seg.start, seg._end, os.date("%Y-%m-%d"), "日期"))
      yield(Candidate("date", seg.start, seg._end, os.date("%Y-%m-%d %H:%M:%S"), "日期时间"))
   end
end

-- 将上述定义导出
return translator

```

1. `rime.lua` 中引入此脚本:

```lua
-- date_translator: 将 `date` 翻译为当前日期
-- 详见 `lua/date.lua`:
date_translator = require("date")
```

1. 在 `double_pinyin.custom.yaml` 或 `double_pinyin.schema.yaml` 中配置上此处理程序

```yml
  engine/translators:
    - lua_translator@date_translator
    - lua_translator@week_translator
    - lua_translator@time_translator
    - lua_translator@number_translator
    - lua_translator@reverse_lookup_filter
```

# 最终效果

## 1 date

![鼠须管-date效果 20211226003919.png](/img/user/attachs/%E9%BC%A0%E9%A1%BB%E7%AE%A1-date%E6%95%88%E6%9E%9C%2020211226003919.png)

## 2 time

![鼠须管-time效果 20211226004010.png](/img/user/attachs/%E9%BC%A0%E9%A1%BB%E7%AE%A1-time%E6%95%88%E6%9E%9C%2020211226004010.png)

## 3 number

输入 `/` ，然后输入数字 `1`，会显示大写数字
![鼠须管-数字展示效果 20211226012849.png](/img/user/attachs/%E9%BC%A0%E9%A1%BB%E7%AE%A1-%E6%95%B0%E5%AD%97%E5%B1%95%E7%A4%BA%E6%95%88%E6%9E%9C%2020211226012849.png)

# 参考

https://github.com/hchunhui/librime-lua
