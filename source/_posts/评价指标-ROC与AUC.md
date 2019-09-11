---
title: 评价指标 ROC与AUC
mathjax: true
date: 2019-07-20 15:10:00
categories: 机器学习方法
tags: ROC
top: True
---

## 非均衡分类问题

> 非均衡分类问题指的是每个类别的错误代价不同。

> 比如疾病检测中,有病患者诊断健康的代价，要比健康人诊断成有病（可能性）造成的影响更为严重。

> 对于常用的预测模型，通常是有预测的概率值，我们找到一个合适的截断点作为正负类别的界限。显然再不同的任务下，截断点选择是不同的。我们使用Precison 和Recall的新度量指标来针对特定任务下选择合适的截断值。


真实标签 | 预测为正 | 预测为反
---|---|---
正例 | TP | FN
反例 | FP | TN



- Precison(查准率)：

```
    P = TP/(TP+FP)
```

- Recall(召回率)：

```
    R = TP/(TP+FN)
```

> 当正负样本不不均衡,人为修改测试集中的正负比例时, P-R曲线波动很大，但是ROC曲线变化很小。

## ROC 曲线

> 可以研究学习器的泛化性能。
## 加图
- 横坐标：真阳率，正例被正确预测的概率

```
    FPR = FP/(TN+FP)
```
- 纵坐标：假阳率，负例被预测错误的概率
```
    TPR = TP/(TP+FN)
```
**==理解四点一线==**：
- (0, 0):  FP = TP = 0, 所有样本预测为负
- (1, 1):  FP = TP = 1, 所有样本预测为正
- (1, 0):  FP = 1, TP = 0, 所有正样本预测为负
- (0, 1):  FP = 0, TP = 1, 完美预测
- 对角线：随机猜测的值。


## AUC值

AUC(Area under Curve) 被定义为ROC曲线的下侧面积。一般在(0.5~1)之间。

### 计算方法

1. 几何角度
> 直接计算曲线下的面积，梯形

2. 概率角度
> 任取一对正负样本对，正样本score大于负样本score的概率


### python 实现



[链接](http://zhuzhuyule.xyz)

```
	import numpy as np
	from sklearn.metrics import roc_curve
	from sklearn.metrics import auc
	from time import time
	
	# y:     标签
	# pred： 预测值
	def myAUC(y, pred):
	
	    auc = 0.0
	    p_list = []  # 正负例的索引
	    n_list = []
	    for i, y_ in enumerate(y):
	        if y_ == 1:
	            p_list.append(i)
	        else:
	            n_list.append(i)
	    # 构成p-n对
	    p_n = [(i,j) for i in p_list for j in n_list]
	    
	    pn_len = len(p_n)
	    for tup in p_n:
	        if pred[tup[0]] > pred[tup[1]]:
	            auc += 1
	        elif pred[tup[0]] == pred[tup[1]]:
	            auc += 0.5
	    auc = auc/pn_len
	    return auc
	
	
	## 产生一组数据
	y = np.array([1,0,0,0,1,0,1,0,])
	pred = np.array([0.9, 0.8, 0.3, 0.1,0.4,0.9,0.66,0.7])
	
	## sklearn 结果
	fpr, tpr, thresholds = roc_curve(y, pred, pos_label=1)
	
	tim = time()
	print("sklearn AUC:",auc(fpr, tpr))
	print("sklearn AUC time:", time()-tim)
	
	
	## myAUC 结果
	tim = time()
	print("\nmyAUC:",myAUC(y,pred))
	print("myAUC time:", time()-tim)

```