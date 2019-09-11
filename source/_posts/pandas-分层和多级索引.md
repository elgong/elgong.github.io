---
title: pandas-8分层和多级索引
mathjax: true
date: 2019-08-13 10:54:12
categories: pandas系列教程
tags: pandas-MultiIndex
---

# pandas -8 分层和多级索引

> Multi-level indexing. 在 “[pandas -2 索引和选择数据](http://www.elgong.top/2019/07/25/pandas-%E7%B4%A2%E5%BC%95%E5%92%8C%E9%80%89%E6%8B%A9%E6%95%B0%E6%8D%AE/)” 一节中, 已经提到了如何选择行列元素, 而Series 和 Dataframe 是低维度的数据结构，对于更高维度的数据，可以通过分层和多级索引来实现。

## 分层索引的创建

> 创建分层索引的方式有很多, 这里直接摘抄自官方的文档，可以通过元组，列表，Dataframe, arrays 等方式生成分层索引。

> 同时要知道，通过 groupby 分组操作之后得到的也是这种分层结构。

```
    //  1. 元组
In: 

    arrays = [['bar', 'bar', 'baz', 'baz', 'foo', 'foo','qux', 'qux'], ['one', 'two', 'one', 'two', 'one', 'two', 'one', 'two']]
    tuples = list(zip(*arrays))
Out: 
    [('bar', 'one'),
     ('bar', 'two'),
     ('baz', 'one'),
     ('baz', 'two'),
     ('foo', 'one'),
     ('foo', 'two'),
     ('qux', 'one'),
     ('qux', 'two')]

In:
    index = pd.MultiIndex.from_tuples(tuples, names=['first', 'second'])
    df = pd.Series(np.random.randn(8), index=index)
    
Out:
    first  second
    bar    one       0.469112
           two      -0.282863
    baz    one      -1.509059
           two      -1.135632
    foo    one       1.212112
           two      -0.173215
    qux    one       0.119209
           two      -1.044236
    dtype: float64
    
    
    // 2. dataftame
    
    index = pd.MultiIndex.from_frame(df)
    
    
    // 3. arrays
    
In: 
    arrays = [np.array(['bar', 'bar', 'baz', 'baz', 'foo', 'foo', 'qux', 'qux']),
              np.array(['one', 'two', 'one', 'two', 'one', 'two', 'one', 'two'])]


     s = pd.Series(np.random.randn(8), index=arrays)


```
## 从DataFrame 产生 MultiIndex

```
    df = df.set_index(['col1','col2'])
```

## MultiIndex 转化成 列

```
    df = df.reset_index()
```
## 选择不同层

> 查看不同层的索引值。

```
In:
    index.get_level_values(0)
    
    index.get_level_values("name")
    
Out:
    Index(['bar', 'bar', 'baz', 'baz', 'foo', 'foo', 'qux', 'qux'], dtype='object', name='first')

```

> 根据不同层索引

```
    df["bar"]
    df["one"]
    df["bar"]["one"]
    
    // 元组
    df.loc[('bar', 'two')]

```

<font color=0xff111>  注意, 切片时不会改变 多层索引。 </font>
