---
title: 集成学习-Adaboost
date: 2019-06-25 18:57:01
tags: 集成学习
categories: 机器学习方法
top: True
---
# Adaboost 算法原理及推导

> Adaboost 是Boosting算法的代表。Boosting可将许多弱学习器组合达到强学习器的效果。

> Adaboost 是通过提升错分数据的权重值来改善模型的不足。
其主要的流程是：

> 1. 先训练一个基学习器；
> 2. 根据基学习器的表现，改变样本的分布，使得错误分类的样本得到更多的关注；
> 3. 改变分布后的样本再训练新的基学习器，如此迭代；
> 4. 加权组合这些基学习器。

## 一、Adaboost算法原理

> "Adaptive Boosting"（自适应增强）

Adaboost算法中，每个样本有对应的权重D,每个基分类器也有对应的权重α，然后是下边的三步骤：

    Step1：初始化训练集的权重；
> 如果有N个样本，则每一个训练样本最开始时都被赋予相同的权重：1/N。

    迭代：Step2： 改变样本分布，训练基学习器；
> 错分的样本权重D会增加；准确率高的分类器的权重α会更大；

    Step3: 加权组合弱学习器。
    
## 二、Adaboost算法推导

给定训练集
$$
T=\{(x 1, y 1),(x 2, y 2) \ldots(\mathrm{xN}, y \mathrm{N})\}
$$
其中，
$$
y_{i} \in\{-1,1\}
$$

步骤1：初始化训练集的权重D。每个训练样本的初始权重w相同，均为1/N,

$$
D_{1}=\left(w_{11}, w_{12} \cdots w_{1 i} \cdots, w_{1 N}\right)
$$

$$
w_{1 i}=\frac{1}{N}, i=1,2, \cdots, N
$$

步骤2：训练基学习器，改变训练样本分布，迭代训练新的学习器。
用m=1,2...M 代表迭代的轮数，每轮产生的学习器为 $$h_{m}(x)$$

- 计算学习器 $$h_{m}(x)$$ 在训练数据集上的分类错误率 $$E_{t}$$ (误差的权值和):


 $$E_{t}=P\left(G_{m}(x) \neq y_{i}\right)$$


 $$=\sum_{i=1}^{N} w_{m i} I\left(G_{m}\left(x_{i}\right) \neq y_{i}\right)$$


- 计算学习器 $$h_{m}(x)$$ 的权重α：

 $$\alpha_{m}=\frac{1}{2} \ln \frac{\left(1-E_{m}\right)}{E_{m}}$$

- 更新训练集样本权重。

$$D_{m+1}=\left(w_{m+1,1}, w_{m+1,2} \cdots w_{m+1, i} \cdots, w_{m+1, N}\right)$$

$$w_{m+1, i}=\frac{w_{m i}}{Z_{m}} \exp \left(-\alpha_{m} y_{i} G_{m}\left(x_{i}\right)\right), i=1,2, \cdots, N$$

这里的 $$Z_{m}$$ 时规范化因子:

$$Z_{m}=\sum_{i=1}^{N} w_{m i} \exp \left(-\alpha_{m} y_{i} G_{m}\left(x_{i}\right)\right)$$

- 迭代训练学习器

步骤3：加权组合弱学习器。

$$f(x)=\sum_{m=1}^{M} \alpha_{m} h_{m}(x)$$

$$H(x)=\operatorname{sign}(f(x))=\operatorname{sign}\left(\sum_{m=1}^{M} \alpha_{m} h_{m}(x)\right)$$


