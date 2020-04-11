---
title: mysql-必知必会1-数据定义语言DDL
date: 2020-04-11 11:15:23
categories: mysql
tags: mysql-必知必会系列

---

# **数据库和表的创建，修改，删除**

- 创建  create
- 修改  alter
- 删除  drop

```mysql
# ########  数据库相关
# 创建库
CREATE DATABASE 库名 IF NOT EXISTS;

# 修改库名
RENAME DATABASE  books  TO   新库名;

# 删除库
DROP DATABASE  IF EXISTS books;

# ######### 表相关
#  创建表
CREATE TABLE   IF NOT EXISTS customers
(
    cust_id    int    NOT NULL AUTO_INCREMENT,  #  自动增加
    cust_name  char(50) NOT NULL  DEFAULT GEL,  #  设默认值
    cust_address char(50) NULL,
   cust_city  char(50) NULL,
   cust_state  char(5) NULL,
   cust_email  char(255) NULL,
   PRIMARY KEY (cust_id)   #  指定主键
) ENGINE=InnoDB;


CREATE TABLE   IF NOT EXISTS student
(
    id    int    NOT NULL AUTO_INCREMENT,  
    name  char(50) NOT NULL,  
    address char(50) NULL,
    city  char(50) NULL,
    email  char(255) NULL,
   PRIMARY KEY (id) 
) ENGINE=InnoDB;


#  更新表
#  添加一列 ADD
ALTER TABLE customers ADD cust_phone CHAR(20);

#  删除表 
DROP TABLE customers
#  修改表名
RENAME TABLE customers TO customers222;  
#  修改列名
ALTER  TABLE book CHANGE COLUMN 旧名  新名  类型;

#  修改列名，约束
ALTER  TABLE book MODIFY COLUMN 列名  类型;

#  删除一列 DROP
ALTER TABLE customers DROP COLUMN cust_phone;

```

