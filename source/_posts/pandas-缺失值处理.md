---
title: pandas-5缺失值处理
mathjax: true
date: 2019-08-09 09:33:30
categories: pandas系列教程
tags: pandas

---

# pandas -5 缺失值处理

> 统计数据中存在缺失值是十分常见的问题, 而对于缺失值的处理，是数据挖掘的一个重要环节。pandas 有一系列的方法处理缺失值。

## 缺失值的类型

判断方法只记住万能的 `pd.isnull` 即可。

> 数值


      pd.isna
      pd.isnull
      np.isnan

> 字符串


      pd.isna
      pd.isnull



> 时间

      pd.isna
      pd.isnull
      np.isnat


## 缺失值的统计


      df.isnull().sum()

## 丢掉缺失值


	  // 某列有缺失值, 删除
	  df[ pd.isnull(df["columns"])]
	  
	  // Series 
	  df.columns.dropna()
	  
	  // DataFrame
	  // axis: axis=0 （默认）表示操作行，axis=1 表示操作列;
	
	  // how : any 表示一行/列有任意元素为空时即丢弃，all 一行/列所有值都为空时才丢弃。
	
	  // subset: 参数表示删除时只考虑的索引或列名。
	
	  // thresh: 比如 thresh=3，会在一行/列中至少有 3 个非空值时将其保留。
	  df.dropna(axis=0, how="any", subset=["city", "sex"])



## 填充缺失值

> 数据量少的情况下，直接丢掉不可取，可以适当补充数据。



	   // 前值填充 ffill     后值填充  bfill
	   df.columns.fillna(method = "ffill")
	   
	   // 实值填充
	   df.fillna(0)
	   
	   // 均值填充
	   df["columns"].fillna(df["columns"].mean(), inplace=True)
	   
	   // 众数
	   mode()[0]
	   
	   // 中位数
	   median()



