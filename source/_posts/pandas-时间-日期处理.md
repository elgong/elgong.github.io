---
title: pandas-时间&日期处理
mathjax: true
date: 2019-08-06 08:42:00
categories: pandas系列教程
tags: pandas
---

# pandas -5 时间&日期处理


## pandas 常出现的时间格式

- 字符串类型 `object`

> 一般是字符串类型，pandas 储存string时 使用 narray， 每一个object 是一个指针

- datetime 类型 `datetime64`


- timedelta 类型

> 表示时间差的数据类型

## 类型转换

1. ` object` 2 `datetime`

```
    // 方法1
    df[1] = pd.to_datetime(df[1], format='%d.%m.%Y')
    
    # 指定format，速度会加快很多。
    
    // 方法2
    dateStr = "2019-02-03"
    
    myDate = datetime.strptime(dateStr, ""%Y-%m-%d"")

```
2. `datetime` 2 `object`

```
    df["time_list"] = df["time_list"].strftime("%Y-%m-%d")
    
    // Y 2019
    // y  19
    
```

## datetime 相关操作

```
    // 查看列元素的年，月，日，星期（整数型）
    df["time"].dt.year
    df["time"].dt.month
    df["time"].dt.day
    df["time"].dt.weekday  # 星期一是0
    
    // 一年中的第几天,第几周
    df["time"].dt.dayofyear
    df["time"].dt.weekofyear
    // 查看列元素 某年的数据数量
    df[df["time"].dt.year == 2019].shape
    
    
```
## 时间运算

1. 计算时间差

```
    // 计算时间差， 结果为timedelta
    df["时间差"] = df["时间1"] - df["时间2"]
    
    // 转换成 天数差
    df["时间差"].days
```

2. 计算未来日期

```
    // N天后的日期
    // 天  days,   时 hours， 周 weeks
    df["时间"] = df["时间1"] - timedelta(days=10)
```




