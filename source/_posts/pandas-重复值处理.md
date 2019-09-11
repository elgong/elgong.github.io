---
title: pandas-6重复值处理
mathjax: true
date: 2019-08-09 15:26:52
categories: pandas系列教程
tags: pandas
---

# pandas -6 重复值处理

> 如果你想找到或者删除 `DataFrame`中重复的行, 可以使用 `duplicated` 和 `drop_duplicates`

## 查找重复值

```
example:
        col1  col2     c
    0    one   x   -1.067137
    1    one   y    0.309500
    2    two   x   -0.211056
    3    two   y   -1.842023
    4    two   x   -0.390820
    5  three   x   -1.964475
    6   four   x    1.298329
In:
    // 单列
    df.duplicated("col1", keep="first")
    
    // 多列
    // df.duplicated(["col1", "col2"], keep="first")
    
Out:
    0    False
    1     True
    2    False
    3     True
    4     True
    5    False
    6    False
    dtype: bool
    
    // 默认 keep = "first",第一次出现的不算重复，返回False
    // keep = "last", 最后出现的不算重复
    // keep = False, 重复值均返回 True

```

## 删除重复值

```
In:
    df.drop_duplicates('col1')
    
Out:
        col1  col2    c
    0    one   x    -1.067137
    2    two   x    -0.211056
    5  three   x    -1.964475
    6   four   x     1.298329

```