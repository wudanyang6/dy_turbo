---
{"dg-publish":true,"permalink":"/card/Linux/linux-top/","noteIcon":"2","created":"2021-05-08T16:27:43+08:00","updated":"2025-01-27T00:00:18+08:00"}
---


# linux-top

```Go
Help for Interactive Commands - procps-ng UNKNOWN
Window 1:Def: Cumulative mode Off.  System: Delay 3.0 secs; Secure mode Off.

  Z,B,E,e   Global: 'Z' colors; 'B' bold; 'E'/'e' summary/task memory scale
  l,t,m     Toggle Summary: 'l' load avg; 't' task/cpu stats; 'm' memory info
  0,1,2,3,I Toggle: '0' zeros; '1/2/3' cpus or numa node views; 'I' Irix mode
  f,F,X     Fields: 'f'/'F' add/remove/order/sort; 'X' increase fixed-width

  L,&,<,> . Locate: 'L'/'&' find/again; Move sort column: '<'/'>' left/right
  R,H,J,C . Toggle: 'R' Sort; 'H' Threads; 'J' Num justify; 'C' Coordinates
  c,i,S,j . Toggle: 'c' Cmd name/line; 'i' Idle; 'S' Time; 'j' Str justify
  x,y     . Toggle highlights: 'x' sort field; 'y' running tasks
  z,b     . Toggle: 'z' color/mono; 'b' bold/reverse (only if 'x' or 'y')
  u,U,o,O . Filter by: 'u'/'U' effective/any user; 'o'/'O' other criteria
  n,#,^O  . Set: 'n'/'#' max tasks displayed; Show: Ctrl+'O' other filter(s)
  V,v     . Toggle: 'V' forest view; 'v' hide/show forest view children

  k,r       Manipulate tasks: 'k' kill; 'r' renice
  d or s    Set update interval
  W,Y       Write configuration file 'W'; Inspect other output 'Y'
  q         Quit
          ( commands shown with '.' require a visible task display window )
Press 'h' or '?' for help with Windows,
Type 'q' or <Esc> to continue
```

# 常用指令

m 显示内存信息，可以显示成内存条

x：高亮显示排序字段

z：彩色显示各个区域

R：反向排序

<：排序字段 左移

\>：排序字段 右移


zx 打开高亮显示排序字段

可以看到，默认是按照 cpu 使用率排序的

`>` 可以移到内存使用率排序

# 存储到文件

```shell
top -c -b -n 10000 -d 3 >>top.txt
```

# 字段含义

top 字段的含义
https://www.cnblogs.com/zhoug2020/p/6336453.html
