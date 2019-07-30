---
title: XGBoost
mathjax: true
date: 2019-07-30 22:02:00
categories: XGBoost
tags: XGBoost
---

# xgboost 学习笔记

> 主要内容均来自官方文档，官方文档是英文版，所以简单的翻译了一下，方便日后查看。
[详细内容见官方手册](https://xgboost.readthedocs.io/en/latest/python/python_intro.html)
## 安装 XGBoost

```
ubuntu -python3:
    pip3 install xgboost
 
导入:
    import xgboost as xgb
    
```

## 数据接口

`XGBoost` 可以从以下结构中加载数据：
- LibSVM text format file
- CSV
- Numpy 2D array
- Scipy 2D sparse array
- Pandas
- XGBoost binary buffer file.

加载的数据都放在 `DMatrix`对象中，下面是具体加载的过程演示：

- LibSVM text format file
```python
    dtrain = xgb.DMatrix('train.svm.txt')
    dtest = xgb.DMatrix('test.svm.buffer')
```

- CSV
```python
    // 需要指定标签所在的列
    dtrain = xgb.DMatrix('train.csv?format=csv&label_column=0')
    dtest = xgb.DMatrix('test.csv?format=csv&label_column=0')
```
<font color="#FF0000"> 

 XGBoost 不支持种类特征，需要先加载为Numpy数组，然后进行 `one-hot` 编码;推荐使用pandas 加载数据.
</font> 

- Numpy
```python
    data = np.random.rand(5, 10)  # 5个样本，每个样本10个特征
    label = np.random.randint(2, size=5)  # 二值标签
    
    dtrain = xgb.DMatrix(data, label=label)
```

- Scipy
```python
    csr = scipy.sparse.csr_matrix((dat, (row, col)))
    dtrain = xgb.DMatrix(csr)
```

- Pandas
```python
    data = pandas.DataFrame(np.arange(12).reshape((4,3)), columns=['a', 'b', 'c'])
    label = pandas.DataFrame(np.random.randint(2, size=4))
    dtrain = xgb.DMatrix(data, label=label)
```

- 保存为 XGBoost 二进制文件
```python
    dtrain = xgb.DMatrix('train.svm.txt')
    dtrain.save_binary('train.buffer')

```
- 缺失值处理
```python
    dtrain = xgb.DMatrix(data, label=label, missing=-999.0)
```

- 样本权重
```
    w = np.random.rand(5, 1)
    dtrain = xgb.DMatrix(data, label=label, missing=-999.0, weight=w)
```

## 参数设置

> XGBoost 可以通过列表或者字典来设置参数，例如：

- Booster 参数
```python
    param = {'max_depth': 2, 'eta': 1, 'objective': 'binary:logistic'}
    param['nthread'] = 4
    param['eval_metric'] = 'auc'
```

- 指定多个评估指标
```python
    param['eval_metric'] = ['auc', 'ams@0']

```

- 指定验证集来监视性能
```python
    evallist = [(dtest, 'eval'), (dtrain, 'train')]
```

## 训练

- 模型训练
```
    num_round = 10
    bst = xgb.train(param, dtrain, num_round, evallist)
```

- 模型保存
```python
    bst.save_model('0001.model')
```

- 保存模型和特征
```python
    # dump model
    bst.dump_model('dump.raw.txt')
    # dump model with feature map
    bst.dump_model('dump.raw.txt', 'featmap.txt')
```

- 模型加载
```
    bst = xgb.Booster({'nthread': 4})  # init model
    bst.load_model('model.bin')  # load data
```


## 早停

> 如果你有验证集，则可以使用早停机制来寻找最佳的 `num_round`, 需要将 验证集传入 `evals`,如果传入多个，则使用最后一个。
```
    train(..., evals=evals, early_stopping_rounds=10)
```
如果模型在 `early_stopping_rounds`次，监控的参数 `param['eval_metric']` 都没有提升，则会停止训练，`train` 返回的是最后一次训练的模型，而不是最佳模型，最佳模型可以通过一下方式找到：

- `bst.best_score`
- `bst.best_iteration`
- `bst.best_ntree_limit`  # 使用最佳模型

同样的，监控多个参数时，最后一个参数起早停的作用。

## 预测

已经训练好的模型，或者已经加载的模型可以拿来预测新数据：
```
    data = np.random.rand(7, 10)
    dtest = xgb.DMatrix(data)
    ypred = bst.predict(dtest)
```

使用最佳的迭代次数的模型：
```
    ypred = bst.predict(dtest, ntree_limit=bst.best_ntree_limit)
```


## 绘制

你可以使用绘图模块来画出树结构：

- 绘制参数重要性

```
    xgb.plot_importance(bst)
```

- 绘制目标树

```
    xgb.plot_tree(bst, num_trees=2)
```

- Ipython 中绘制树

```
    xgb.to_graphviz(bst, num_trees=2)
```