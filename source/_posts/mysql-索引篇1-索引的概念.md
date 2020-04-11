---
title: mysql-索引篇1-索引的概念
date: 2019-08-11 10:46:16
categories: mysql
tags: 数据库索引
---

# **一、索引的概念**

## 1.1 索引的作用



## 1.2 索引的分类（还不清楚到底怎么归类）**

**查看有哪些索引：**   `SHOW   index;`



**聚簇索引（主键索引)**    **每张表只能有一个**，**数据和索引在同一个文件**

​        按照每张表的主键构造一颗B+树，同时叶子节点中存放的即为整张表的记录数据。

**辅助索引（二级索引）**: **叶子节点并不包含行记录的全部数据**

​       非主键索引，叶子节点=键值+书签（行的索引值）

**覆盖索引：** **（extra 提示using index）**

​       InnoDB存储引擎支持覆盖索引，即从**辅助索引中就可以得到查询的记录**，而不需要查询聚集索引中的记录了（不需要回表操作）。

​       覆盖索引并不适用于任意的索引类型，**索引必须存储列的值**，所以<font color="red"><big>**不需要回表操作。**</big></font>

MySQL只能使用B-树.

**联合索引：**

​        联合索引也是一棵**B+树，其键值数量大于等于2。键值都是排序的**，通过叶子节点可以逻辑上顺序的读出所有数据。

**单值索引：** 一个索引只包含单个列

**多值索引、复合索引**（**组合索引**）: 即一个索包含多个列

**复合索引**只会对与创建索引时的排序顺序完全相同或相反的 order by语句进行优化

**唯一索引**: 索引唯一，但可以null， 声明unique关键字时,会为其字段自动添加唯一索引


```
// 单值索引 
#外部创建 
CREATE INDEX [indexname]ON t1(colname); 

#创建表的时候创建 
CREATE TABLE mytable(   ID INT NOT NULL,    username VARCHAR(16) NOT NULL,   INDEX [indexName] (username(length))   );  

#alter语句添加 
ALTER table tableName ADD INDEX indexName(columnName)  

// 复合索引 
CREATE INDEX idx_c1_c2_c3ON tablename(c1,c2,c3)
```

![img](https://note.youdao.com/yws/public/resource/003c0cce526f2a71945614993d250377/xmlnote/35ED850E7CCF446C903DD2A0AED7AABE/18916)



## **1.3 创建**

![img](https://note.youdao.com/yws/public/resource/003c0cce526f2a71945614993d250377/xmlnote/5FAAFB8FB8BD43CC8F2CD5853ED88350/18908)



## **1.4 什么时候该创建索引？**

![img](https://note.youdao.com/yws/public/resource/003c0cce526f2a71945614993d250377/xmlnote/7C97A4A5F692496686ED1CB7890E0543/18901)

**不该创建？**

![img](https://note.youdao.com/yws/public/resource/003c0cce526f2a71945614993d250377/xmlnote/ADE489407E394B16856C9B839E2416DE/18902)

对于最长使用的查询，可以针对性的建立索引来优化速度。

join查询在有索引条件下

　　驱动表有索引不会使用到索引

　　被驱动表建立索引会使用到索引



# **二、性能分析和优化策略**

![img](https://note.youdao.com/yws/public/resource/003c0cce526f2a71945614993d250377/xmlnote/20D9F3FA33FF41E2AB5EAB6EA9D24A25/18895)

![img](https://note.youdao.com/yws/public/resource/003c0cce526f2a71945614993d250377/xmlnote/7AC131346BED4F13AA046DA87FEFC40C/18894)

![img](https://note.youdao.com/yws/public/resource/003c0cce526f2a71945614993d250377/xmlnote/61AED2EF4E4D4DEB8D33DEBCBFD93175/18857)


