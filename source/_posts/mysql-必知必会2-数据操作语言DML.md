---
title: mysql-必知必会2-数据操作语言DML
date: 2020-04-11 11:24:42
categories: mysql
tags: mysql-必知必会系列
---



# **DML  数据操作语言**

- **插入  INSERT** 
- **更新  UPDATE**
- **删除  DELETE**

## **1.  插入**

**规则： 插入值的类型要一致**

- 语法1：

​		`INSERT   INTO   表名（列名） VALUES ( 值1...)`

- 语法2：

​		`INSERT   INTO   表名 SET  列名1=值1，列名2=值2`



```mysql
#  插入 INSERT
#  插入完整行,或者部分
INSERT INTO customers(
    cust_name,
    cust_address,
    cust_city,
    cust_state)
VALUES(
    'elgong',
    '1552460315',
    'hangzhou',
    '1'
);

#  插入多行
INSERT INTO customers(
    cust_name,
    cust_address,
    cust_city,
    cust_state)
VALUES(
    'elgong',
    '1552460315',
    'hangzhou',
    '1'
),
(
    'gel',
    '178905324',
    'hangzhou',
    '0'
);

```



## **2.  更新（**<font color="red"><big>缺了where 就全部更新啦，一定要注意</big></font>）

- 单表更新语法：

  ```mysql
  UPDATE   表名   SET  列名1=值 ...  WHERE  筛选条件;
  ```

  

- 多表更新语法：

  ```mysql
  UPDATE   表名  SET  列名1=值...   
  
  WHERE  连接条件 AND  筛选条件;
  ```

  

```mysql
#  更新 UPDATE  SET
#  更新某行的某些列值
UPDATE customers 
SET cust_email = "1552460315@qq.com",   #  列1
    cust_name = "ELGONG"
WHERE cust_id = 1;
```



**3.  删除**

**删除整行**

```mysql
#   删除
#  删除特定行
DELETE FROM customers WHERE cust_id=1;

#  删除所有行
DELETE FROM customers ;  
TRUNCATE TABLE;  
```