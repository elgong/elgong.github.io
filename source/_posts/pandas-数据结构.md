---
title: pandas-数据结构
mathjax: true
date: 2019-07-22 09:01:01
categories: pandas系列教程
tags: pandas
---

# pandas 数据结构
> pandas 基本操作都很简单，只是在刚开始学习的过程中，容易忘掉一些API，导致完成一些操作时，总会想着翻翻手册，这一系列博客，是对这些方法进行了梳理，可作为入门学习的参考材料。平时经常翻阅。

“index” (axis=0, default), “columns” (axis=1)
## 1. Series

> Series 是一个带有 名称 和索引的一维数组。

### 创建seriex

```
// Series 数组生成，指定数据类型
In:   
    user_age = pd.Series(data=[18, 30, 25, 40], dtype=float)
    
Out:
        0    18
        1    30
        2    25
        3    40
        dtype: int64


// 增加索引 index
In:   
    user_age.index = ["Tom", "Bob", "Mary", "James"]
    
Out:
    Tom      18
    Bob      30
    Mary     25
    James    40
    dtype: int64
    
// 表头
In:
    user_age.index.name("name")
    
Out:
    name
    Tom      18
    Bob      30
    Mary     25
    James    40
    dtype: int64
    

```

### 像字典一样使用series

```
// index 当键值
In: 
    user_age["Tom"]
    user_age.get("Tom")

// 切片-列
In:
    user_age[2:3]
    
// 按条件查找
In:
    user_age[user_age > 30]
    
Out:
    name
    James    40.0
    Name: user_age_info, dtype: float64
    
```

### 像向量一样使用series

> 可以传递给np方法

```
// 整列加减
In:
    user_age + 1
    
Out:
    name
    Tom      19.0
    Bob      31.0
    Mary     26.0
    James    41.0
    Name: user_age_info, dtype: float64


```

## 2. DataFrame

> DataFrame 是一个带有 名称 和索引的二维数组，像一张Excel表格。

### 创建DataFrame

```

// DataFrame 根据字典生成

In:
    index = pd.Index(data=["Tom", "Bob", "Mary", "James"], name="name")
    
    data = {
        "age": [18, 30, 40],
        "city": ["BeiJing", "ShangHai", "HangZhou"]
    }
    
    user_info = pd.DataFrame(data=data, index=index)
    user_info

Out:
    
// DataFrame 根据二维列表生成
In:
    data = [[18, "BeiJing"], 
            [30, "ShangHai"], 
            [25, "GuangZhou"], 
            [40, "ShenZhen"]]
    columns = ["age", "city"]
    
    user_info = pd.DataFrame(data=data, index=index, columns=columns)
    user_info

```