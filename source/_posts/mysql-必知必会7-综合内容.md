---
`title: mysql-必知必会7-综合内容
date: 2020-04-11 11:35:36
categories: mysql
tags: mysql-必知必会系列
---

# **一、关系型数据库Mysql**

数据库（Database）是按照数据结构来组织、存储和管理数据的仓库。

- **数据库:** 数据库是一些关联表的集合。.
- **数据表:** 表是数据的矩阵。在一个数据库中的表看起来像一个简单的电子表格。
- **列:** 一列(数据元素) 包含了相同的数据, 例如邮政编码的数据。
- **行：**一行（=元组，或记录）是一组相关的数据，例如一条用户订阅的数据。
- **冗余**：存储两倍数据，冗余可以使系统速度更快。
- **主键**：主键是唯一的。一个数据表中只能包含一个主键。你可以使用主键来查询数据。
- **外键：**外键用于关联两个表。
- **复合键**：复合键（组合键）将多个列作为一个索引键，一般用于复合索引。
- **索引：**使用索引可快速访问数据库表中的特定信息。索引是对数据库表中一列或多列的值进行排序的一种结构。类似于书籍的目录。
- **参照完整性:** 参照的完整性要求关系中不允许引用不存在的实体。与实体完整性是关系模型必须满足的完整性约束条件，目的是保证数据的一致性

- **主键: 表示特定行.**
  - 主键不能重复
  - 每行必有主键,且不能为 NULL

- **外键:**  product 只存产品信息, 和供应商ID,  vendors 存供应商的信息(主键是ID),则vendors的主键就是product的外键.



MySQL支持大型数据库，支持5000万条记录的数据仓库，32位系统表文件最大可支持4GB，64位系统支持最大的表文件为8TB。



# **二、 安装与删**

- 删除mysql

  `sudo apt purge mysql-* sudo apt autoremove `

- 安装mysql

  ```shell
  sudo apt-get install mysql-server 
  sudo apt install mysql-client 
  sudo apt install libmysqlclient-dev `
  ```



**数据库规范：**

- 关键字大写，表名，列名小写
- 索引从1开始
- 每条命令用分号隔开
- 注释

- 单行注释   #
- 单行注释  -- 注释文
- 多行注释  /* */

<font color="red"><big>索引从1开始！</big></font>



# **三、常用命令** 

##   **指令执行顺序：**

**SELECT  FROM  WHERE   GROUP BY  HAVING  ORDER BY LIMIT.**

   <font color="red"><big>开始 **->** FROM子句 **->** WHERE子句 **->** GROUP BY子句 **->** HAVING子句 **->** ORDER BY子句 **->** SELECT子句 **->** LIMIT子句 **->** 最终结果 </big></font>    

<font color="red"><big>每个步骤都会为下一个步骤生成一个虚拟表</big></font>



## **1. 登陆系统, 选择数据库**

```mysql
mysql -u 用户名 -p 密码
mysql -h localhost -P 3306 -p

# 查看所有数据库列表
SHOW DATABSASES;
# 查看选择的数据库中的表的列表
SHOW TABLES;
# 查看表中的列有哪些
SHOW COLUMNS FROM 表名;  ||  DESCRIBE 表名;

# 选择库
USE 数据库的名字;

# 查看表结构
DESC 表名;
```



## **2 基础查询——检索 SELECT + DISTINCT**

SELECT 子句 固定的顺序:

**SELECT  FROM  WHERE （原始表有的字段）  GROUP BY  HAVING  （分组后有的字段）ORDER BY LIMIT.**

```mysql
# 选择多个字段 `着重号`当字段名与关键字冲突，用它可以避免冲突
SELECT id, `name`, price FROM 表名; 

# 起别名 AS, 可以省略SELECT salary "Month Salary" from employees;
SELECT salary AS "Month Salary" from employees;

# 字符串拼接 concat
# 特别注意+：  
# 1+9=10  两个数值型做加法
# '12'+ 3 = 15 字符转整数，再加 
# 'job'+2 = 2  转换失败，则字符串变0
# null+任何值 = null
SELECT concat('a', 'b', 'c') , price FROM 表名; 

# 检索所有字段
SELECT * FROM 表名;

# 字段去重  DISTINCT
SELECT DISTINCT id FROM 表名;   # 不能应用于多列

# 限制检索结果
 SELECT  id FROM 表名  LIMIT 5;  # 前5 
 SELECT  id FROM 表名  LIMIT 2,5;  #从 2+1 开始的  5个行
 SELECT id FROM 表名 LIMIT 5 OFFSET 3;  # 从行3取5
```



## **3. 排序检索 ORDER   BY (默认升序) + LIMIT,  OFFSET, DESC**

可以根据非 select 字段排序。

SELECT  查询列表

FROM  表

【where 筛选条件】

ORDER BY  排序列表  [asc |  desc]

```mysql
# 按照某列排序,  多条件排序
SELECT id FROM 表名 ORDER BY id ASC, age DESC;   # 可以根据其他列来排序

# 按照多个条件排序
SELECT id FROM 表名 ORDER BY age, size;   # 优先age, 重复时才根据size排序.

#  指定降序  DESC
SELECT id FROM 表名 ORDER BY age  DESC  size;  # DESC 只作用于在DESC 前面的, 所以 size仍然为升序

# 找到最********的id
SELECT id FROM 表名 ORDER BY age LIMIT 1;
# 第二最的*******id
SELECT id FROM 表名 ORDER BY age LIMIT 1 OFFSET 2;
```



## **4. 条件查询**

### **4.1  ——逻辑运算 WHERE + AND, OR,NOT** **IN 和EXISTS(看优化部分)**

**作用：**

连接条件表达式

<font color="red"><big>**如果计算次序不加括号时,  优先 AND**</big></font>

```mysql
#  =  !=  <  > >=    "BETWEEN 1 AND 2"在指定值之间,包含端点
# 不等于 ！=   或者  <>
SELECT id FROM 表名 WHERE age=12 ORDER BY size;

# 组合筛选  AND  OR
SELECT id FROM 表名 WHERE age=12 AND size < 10;

# 计算次序,  不加括号时,  优先 AND
# 解释: id>3且age>10,  或者 id=1
SELECT id FROM 表名 WHERE id=1 OR id=3 AND age > 10;   

# NOT  否定后跟的所有条件.
SELECT id FROM 表名 NOT WHERE id IN (1002, 1003)
```



![img](C:\Users\Misaya\AppData\Local\YNote\data\elgong@126.com\e87e0bbb47ff40228ca7b6dbebad7954\clipboard.png)

### **4.2  ——模糊查询  WHERE + LIKE, between and, in, is null**

- **like + 通配符：** 参考7.
- **between and ：** 包含临界值， 不可颠倒顺序
- **in：**

```mysql
# between and
SELECT  * FROM 表名  WHERE id BETWEEN 100 and 120;

# IN 取值必须在括号内
SELECT id FROM 表名 WHERE id IN (1002, 1003)

# IS NULL 筛选出空值  IS NOT NULL
SELECT id FROM 表名 WHERE age IS NULL;
```



**补. 空值处理 IFNULL(字段，空值时返回值)**

`SELECT IFNULL(price, 0) FROM 表名;  `



## **5. 通配符   LIKE + % , _   + 正则表达式** **REGEXP   都****不区分大小写**

1. 通配符速度慢, 不要放在搜索开始处

2. **LIKE 匹配整个串,  正则表达式可以匹配子串**

```mysql
#  通配符
#  % 匹配0,1,多个字符
SELECT id FROM 表名 WHERE string LIKE 's%';   # s开头   

# 下划线 _ , 匹配单个字符
# 需要匹配 _ 时， 用转义   \_
SELECT id FROM 表名 WHERE string LIKE 's_';  

------------------------------------------------------------------
#  正则表达式 REGEXP
# 标准表达
SELECT name FROM customers WHERE name REGEXP '1000';

'.'   # 任意一个字符
'A1'| 'B2'  # 匹配两个串之一
'[1-9]'     # 匹配 1~9 范围内的值
'[123]'     # 匹配1，2，3之一， 等价于【1 | 2 | 3】
'[^123]'    # 匹配非123的值
'\\.'       # 特殊字符转译   

# 匹配多个实例, 不能单独出现,必须是指定上边的某种字符的匹配
# 例如 '.*' 而不是'*'
'*'  # 0或多个匹配
'+'  # 1或多个匹配
'?'  # 0或者1个匹配
{n}  # 指定数目匹配
{n,}  # 不少于指定数目的匹配
{n,m}  # 数目范围,不超过255

#定位元字符
'^'   # 开始位置
'$'   # 结尾
'[[:<:]]'  # 词开始
'[[:<:]]'  # 词结尾

# 举例:
'^[1-9]'   
BINARY 'J 1000'     # 指定区分大小写

'[a-zA-Z0-9]'   # 匹配所有字符
```



## **6. 数据处理常用函数 (不区分大小写)**

- 字符函数
- 数学函数
- 日期函数
- 其他函数
- 流程函数

字符函数

```mysql
# 文本处理函数
# 1. 字符串字节个数,  汉字算三个字符
Length() 

# 2. 拼接
CONCAT(id, "_", name)

# 3. 大写 小写
Lower()  # 小写
Upper()  # 大写

# 4. 返回子串的字符, 数据库索引从1开始
SubStr(last_name, start) 
SubStr(last_name, start, length)   # 长度

# 5. 查找子串, 返回第一次出现的索引， 查不到返回0
INSTR("待查子串abcd", "a")

# 6. 去空格
Trim(), LTrim(), RTrim()  

# 7. 指定长度填充
LPAD(name, length, '*')
RPAD(name, length, '*')

# 8. 替换
REPLACE(原串, '被替换串', '新串')

# 9. 字符串字符长度, 汉字也算 1个字符
CHAR_LENGTH(s)  
Soundex()   # 返回串的SOUNDEX值

  
```



数学函数

```mysql
# 1. 四舍五入
ROUND(1.6);   # 2
ROUND(1.567, 2)  # 小数点保留两位

# 2. 上取整， >=该参数的最小整数
CEIL(1.00) 
# 下取整,   <=该参数的最大整数
FLOOR(-9.99)   # -10

# 3. 小数点直接截断
TRUNCATE(1.69999, 1)  # 1.6

# 4. 取余数
MOD(10, 3)  # 10%3

ABS(x)   # 绝对值
AVG(age)  # 某列的平均值 
EXP(x)
RAND()  # 0到1的随机数
```



日期函数

```mysql
NOW()   # 当前日期和时间
CURDATE() # 当前日期，不含时间
Date()  # 返回时间中的日期部分....
Day()   # 返回时间中的天数部分
Year(NOW())
Time()
Month()  
Hour()
DateDiff()  # 计算日期差

# 字符串转日期
STR_TO_DATE('02-19-2020', "%m-%d-%Y")

# 日期的格式化输出
DATE_FORMAT(NOW(), '%y年%m月%d日')
```



其他函数

`VERSION() `

## **7. 流程控制函数**

IF(逻辑判断， 成立执行， 不成立执行)

CASE:

```mysql
# IF
IF(10>5, '大', '小')
SELECT name IF(salary IS NULL, "没薪水", "有薪水")

# CASE 第一种使用
CASE '要判断的表达式'
WHEN '常量1' then 值(没有分号) / 表达式(有分号);
WHEN '常量2' then 值(没有分号) / 表达式(有分号);
WHEN '常量3' then 值(没有分号) / 表达式(有分号);
...
ELSE 值(没有分号) / 表达式(有分号);
END;

# CASE 第二种语句
CASE 
WHEN 表达式 then 值(没有分号) / 表达式(有分号);
WHEN 表达式 then 值(没有分号) / 表达式(有分号);
WHEN 表达式 then 值(没有分号) / 表达式(有分号);
...
ELSE 值(没有分号) / 表达式(有分号);
END;
```



## **8. 数据汇总-聚集函数  AVG, COUNT, MAX, MIN, SUM**

运行在行组, 计算和返回单个值的函数.

统计使用

```mysql
# AVG() 针对单列,  对多列需要使用多个
SELECT AVG(age) AS avg_age FROM 表名;   # 忽略 NULL

# COUNT() 函数
COUNT(1);   # 行数
COUNT(*);   # 表的行数, 含有 NULL的有数据行也可，但是不能全NULL
COUNT(column)  # 某列非NULL 的个数
COUNT(distinct 字段)  # 统计不重复的
# 效率对比：
MYISAM 储存引擎下， COUNT(*) 效率高
INNODB 存储引擎下，COUNT(*) 和COUNT(1) 差不多，比COUNT(字段高)

# 聚集不同的值 + DISTINCT
# 聚集函数默认ALL
SELECT AVG(DISTINCT age) FROM 表名;  # 对唯一值求均值
SELECT COUNt(DISTINCT age) FROM 表名;  # 对age列的唯一值统计个数
```



## **9. 数据分组查询 —— GROUP BY,   HAVING**

### **1. GROUP BY   分组字段**

​          <font color="red"><big>**如果分组列中具有 NULL,  则NULL 将作为一个分组返回.**</big></font>

### **2. HAVING 过滤条件  =====WHERE 条件**



### **3. 必加 ORDER BY,  因为G出来的结果不保证排序了.**



### **4. 能where 就不用having**

- **按字段分组**

- - GROUP BY id 

- **按表达式或者函数**

- - GROUP BY length(id)  AS  len   HAVING  len>3;

- **按多个字段分组**

```mysql
# 分组统计值
SELECT id, COUNT(*) AS num_ FROM 表名 GROUP BY id ORDER BY age;

# 分组过滤  大于2的值
SELECT age FROM 表名 GROUP BY  id  HAVING COUNT(*)>=2 ORDER BY age;
```



## **10. 子查询  IN + 括号**

- 查询的结果作为另一个查询的条件,然后多层嵌套.
- 内层查询**建立一个临时表**。费时间.
- 优化需要用join 联结表替代....

**where 和 having 后可放的子查询：**

- 子查询放在小括号内

- **标量子查询（单值）**，一般配合单行操作符使用：  >  <   >=  =  <>

- **列子查询（单列多行）**， 一般配合多行操作符使用：  

- - IN   列表中的一个
  - ANY/SOME   
  - ALL

**select 后可以放的子查询：**

**from 后可以放的子查询：**

- 必须起别名

- - FROM (子查询表)  newtable 

```mysql
# 标量子查询
# 1. 谁工资比  elgong 高
SELECT  * FROM employee 
WHERE salary>(select salary from emplot WHERE name = 'elgong');

# 查询超过平均工资的员工信息
select avg(sal) from emp;   /* avg(sal)=2000 */
select * from emp where sal >= 2000;
/* 子查询方法 */
select * from emp where sal >= (select avg(sal) from emp);
```



## **11. 连接查询——JOIN 联结表 ( INNER JOIN, LEFT JOIN, RIGHT JOIN)**

**注意判断驱动表是哪个？  查询计划  explain**

正常情况下，from 后的表是驱动表，但是当出现下面情况，驱动表变成了 class。

分析： 当 where 后的条件使得表之间数据多少不一样时，数据少的为主表

**小表驱动大表的原则**

`select * from student left join class on  class.classid = student.classid where class.classid = 2; `



**概念:    联结指两张表,或者多张表之间组合在一起进行查询, 是在运行时做的操作;**

- **left JOIN ** (左联结)保证读取主表的全部数据

- **right JOIN**  (右联结) 保证读取主表的全部数据

- **inner JOIN**  (内部联结,等值联结)  只读取共有的数据

- **自联结:  **常用来代替从同一个表检索数据的子查询.  FROM table1 AS t1, table2 AS t2, WHERE t1.col = t2.col;

- **自然联结: ** 联结有主副表之分,  在INNER JOIN 之前的是主表, 待查询的输出中,排前边的内容所在的表为主表.

左外联结可通过颠倒FROM 或者WHERE 子句中表的顺序转换成右外部联结

**连接的分类**

- SQL92语法

- - **等值连接**

  - - `FROM table1 AS t1, table2 AS t2, table3 AS t3  WHERE t1.col = t2.col  AND t2.c = t3.c ;`	

  - **自连接（单表）**

  - - 同表不同名
    - `FROM   employees   e1,  employees  e2  WHERE  e1.id = e2.iidd`

- SQL99语法

- - SELECT   查询列表
  - `FROM   表1  别名  [连接类型]   join        表2  别名   on          连接条件`

- - **内连接**  inner join

  - **外连接**  left， right

  - - 主表全部显示
    - 从表中没有与主表匹配的结果，显示NULL
    - 等价于==== 内连接结果 + 主表有而从表没有的记录
    - 左外和右外，交换表顺序可以等价效果

  - **全外连接**  full join

  - **交叉连接**   cross join

  - - 笛卡尔乘机

  - **非等值连接**

  - - FROM e  join g on e.salary  BETWEEN g.low AND g.upper

  - **自连接**

  - - 一样的join on   不同名的同一张表

```mysql
# 创建联结表的两种方式
# 1. 等值连接  WHERE 表1.id = 表2.id AND 表2.size = 表3.size
SELECT vendors.vendor_name, product.prod_name, product.prod_price 
FROM product,vendors 
WHERE vendors.vendor_id = product.vendor_id 
ORDER BY vendor_name;

# 2.内部联结(等值联结) 表的键数量相同  FROM 表1 INNER JOIN 表2 ON 表1.id = 表2.id
SELECT v.vendor_name, p.prod_name, p.prod_price 
FROM product AS p 
INNER JOIN vendors AS v 
ON v.vendor_id = p.vendor_id  
ORDER BY v.vendor_name;

# 
# 对联结的表使用聚合方法
待补充.....
```



![img](C:\Users\Misaya\AppData\Local\YNote\data\elgong@126.com\e6a36fe8659843b897ed6b6e6ee6977d\clipboard.png)



## **12. 分页查询**

  **LIMIT  行X(从0开始),  size;**

  **LIMIT  size OFFSET  size;**

**当要显示的数据，需要分页显示** 

- 从行0开始
- 从第四行开始，检索5行
- **LIMIT   3,  5**
- **LIMIT   5  OFFSET  3**

```mysql
#  查询前5条数据
SELECT  *  FROM employees LIMIT 0, 5;
	
# 查询11到25条数据
SELECT  *  FROM employees LIMIT 10, 25-11+1;

# 计算公式
LIMIT (page-1)*size,  size;
```



## **13. 联合查询  union  （自动去重，union all  不去重）**

将多条查询语句合并成一个结果

**特点：**

- 查询 **列数** 和 **列顺序** 必须一致
- 自动去重
- 不去重  union all

```mysql
SELECT   *   FROM    e1   WHERE   
UNION
SELECT   *   FROM    e1   WHERE 
```



## **14. 视图**

视图是虚拟的表, 是对其基表的封装.

使用的好处:

1. 重用 SQL 语句

2. 使用表的部分,即过滤掉部分数据

限制:

1. 图名唯一

2. 视图可以嵌套

3. 视图的ORDER BY  次于 从该视图检索数据的ORDER

4. 视图可以和表一起使用

```mysql
# 创建视图
CREATE VIEW  viewname AS
SELECT * FROM table WHERE id!=1;
```

