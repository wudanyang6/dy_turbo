---
{"dg-publish":true,"permalink":"/card/iso-日期表示法/","noteIcon":"","created":"2021-07-25T22:08:39+08:00","updated":"2024-02-01T13:03:10+08:00"}
---

**国际标准化组织的日期时间表示法**

# 日期时间点表示法

## 零时区

在最后加上大写 的 Z 
2004-05-03T17:30:08Z

## 其他时区

合并表示时，要在时间前面加一大写字母T，如要表示东八区时间2004年5月3日下午5点30分8秒，可以写成**2004-05-03T17:30:08+08:00**或**20040503T173008+08**。

# 时间点表示法

首字母为 P，其他字母为年月日时分秒，中间加上 T
**P1Y3M5DT6H7M30S**

# 时间间隔表示法

## 从一个时间开始，到另一个时间结束

*19850412/19860101*

## 从指定时间开始持续一段时间

*19850412/P6M*

# 循环时间表示法

> R【循环次数】【/开始时间】/时间间隔【/结束时间】


从2004年5月6日北京时间下午1点起时间间隔半年零5天3小时循环，且循环3次
**R3/20040506T130000+08/P0Y6M5DT3H0M0S**。

以1年2个月为循环间隔，无限次循环，最后循环终止于2025年1月1日
**R/P1Y2M/20250101**

# 参考

<div style="display: block; position: relative; width: 100%; height: 0px; --aspect-ratio:9/16; padding-bottom: calc(var(--aspect-ratio) * 100%);"><iframe src="https://zh.wikipedia.org/wiki/ISO_8601" allow="fullscreen" style="position: absolute; top: 0px; left: 0px; height: 100%; width: 100%;"></iframe></div>