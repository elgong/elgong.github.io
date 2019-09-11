---
layout: w
title: pandas-2索引和选择数据
mathjax: true
date: 2019-07-25 07:01:01
categories: pandas系列教程
tags: pandas
---
# pandas -2 索引和选择数据

> 对于一种数据结构,最基本的操作就应该是增删改查了。

## 1. 行列选择
行选择和列选择有许多方法，很容易记混，常用的要记住。
主要方法有三种： `iloc`, `loc`, `[]`

### 行选择

- 切片 
```
    // 切片
    df[a:b]
    
    // 隔1行选择
    df[::2]
```

- 指定位置

  ` df.iloc[1, 1]`
  
  ` df.iloc[1:10, 2:3]`

  ` df.iloc[1:10]['Price']`
  
- 指定索引

  `df.loc["index1", "index2"]`
- 按照条件查找

  ` df[( df["row2"] == 1) & (df["row2"] == "null")]`
  
  ` df.loc[( df["row2"] == 1) & (df["row2"] == "null")]`

  
### 列选择

- 通过列标签选择单列

    `df["price"]`
  
- 通过列标签选择多列

   `df[["price", "time"]]`
   
- 通过列索引,选择前3列

  `df.iloc[:, :3]` 

### 行列选择

  `df.loc[:,  ["price"]]`

  
  `df.iloc[a:b]['Price']`
  
### 随机采样行或者列

```
    s.sample(frac=0.5)
    // 参数
    // 默认选择行，n = 行数，  frac = 比例
    // replace: 默认False 无放回采样
    // weights: 样本采样权重
    // axis:  默认=0 行,  =1 列
    // random_state=2
    
    
```
  
  
## 2. 行的增删改查

### 增加

> 单列

```
// 末尾增加
   df["new col"] = None
   
// 指定位置增加，在2列后
   df.insert(2,'city') 
```
   
> 多列

   ` pd.concat([df, pd.DataFrame(columns=["C","D"])])`
   
> 单行（待验证）

```
// loc 添加
  df.loc[‘5‘] = [3, 3, 3, 3]
    
// set_value 添加
  df.set_value(‘5‘, df.columns, [3,3,3,3], takeable=False) 
```
> 多行

多行相当于合并两张表了,可以参考(merge,concat)[方法](https://note.youdao.com/)。


### 删除

> 列

```
// del 方法
   def df["col_name"]

//根据列名 drop 方法
   df.drop(["b", "c"], axis=1,inplace = True)
axis = 1 列
axis = 0 行

// 根据列号 drop 方法
   df.drop(df.columns[[1,2]], axis=1, inplace=True)
```

> 行

```
// 根据索引 删除行
   df = df.drop([1, 2])

// 根据value 删除行
   df = df[~df["col"].isin(5,9)
    
```

### 修改与查找

> 单值修改和查找时, 参考选择行列方法。

> 多值查找时，

#### 按条件查找

 ` df_train[( df_train["row"] == 1) &( == "null")]`
 
#### query 查找

 `df.query('(a < b) & (b < c)')`
 
#### 替换

> 单个替换，inplace = True 覆盖源文件

  `df.replace(to_replace, value, inplace = True)`
  
> 多值替换---字典

  `df.replace({"A":"B",  29:100})`
  
> 按条件替换

  `df.where(df > 0, -df, inplace=True)`
  
#### 交换两列的位置

```
    df[['B', 'A']] = df[['A', 'B']]

```







