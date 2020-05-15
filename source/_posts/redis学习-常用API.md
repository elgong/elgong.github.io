---
title: redis学习-常用API
date: 2020-05-16 00:15:05
categories: 缓存中间件
tags: redis
---

[toc]

> 本系列文章整理摘抄自<Redis 开发与运维>
# 全局命令

## 1. 查看所有键 **keys**

遍历所有的键，时间复杂度O(n), 线上禁止使用。
```
keys *
```

## 2. 键总数 **dbsize**
该指令直接获取Redis 内置的键总数变量， 时间复杂度 O(1)
```
dbsize
```

## 3. 键是否存在 **exist**

存在返回1， 不存在返回0
```
exist key
```
## 4. 删除键 **del**

```
del key1  key2  key3
```

## 5. 设置键过期 **expire**

成功返回1
```
// expire key seconds
set key helloword
expire key 10
```

## 6. 查询键过期 **ttl**
- 返回 >0 : 剩余的过期时间
- 返回 -1 : 键没设置过期时间
- 返回 -2 ：键不存在
```
ttl key
```

## 7. 键的类型  **type**
若键不存在，返回 none
```
type key
```

# 5种常用的数据类型
Redis 是字典服务器，其中键都是字符串类型，并且数据结构也都是在字符串类型上构建的。

而字符串类型的底层实现值可以为字符串，整数，浮点数，二进制。

字符串类型最大不能超过 512MB.


## 字符串

### 常用命令

#### 1. 设置值 set、setex、setnx、set .. xx

==set 命令的参数：==
- ex seconds: 秒过期
- px milliseconds ： 毫秒过期
- nx ：键必须不存在 （失败返回 0）
- xx ：键必须存在
```
// set key value [ex seconds] [px milliseconds] [nx | xx]

set hello world ex 60 

```

==设置时间:==

```
setex key seconds value
```

==设置不存在的key==

<font color=red size=5>setnx 可以作为分布式锁的一种实现方案</font>

- 失败： 返回 0
- 成功： 返回 1
```
setnx key value
```

==设置存在的key==
- 失败： 返回 nil
- 成功： 返回 ok
```
set key value xx
```

#### 2. 获取值 get

==获取键值==
- 不存在： 返回 nil
- 存在：   返回值
```
get key
```

#### 3. 批量设置值 mset

<font color=red size=3>批量操作可以减少网络资源的浪费</font>
```
mset key1 value1   key2 value2    key3 value3
```

#### 4. 批量获取值 mget

如果有空的， 该空值返回 nil
```
mget key1  key2  key3
```

#### 5. 计数操作 incr、decr、incrby(自增指定值)、decrby(自减指定值)

<font color=red size=3>redis 的计数不是cas, 因为是单线程，不会出现冲突</font>
- 不存在：  自动创建并返回1
- 存在：    返回增后的值

```
// 自增
//incr key

```

### 不常用命令

#### 1. 追加值 append 
<font color=red size=3>可以对incr 的整数或者其他类型追加，因为它们都是string类型</font>

```
// append key  value
```

#### 2. 字符串的长度 strlen

- 不存在：   返回 0 
- 存在：     返回字符串长度
```
// strlen key
```

#### 3. 设置并且返回原值  getset

```
// getset key value
```

#### 4. 设置指定位置的字符

```
// setrange key offset value

```

#### 5. 获取部分字符串
```
// getrange key start end
```

### 内部编码

字符串类型内部有3 种编码，

- int :    8字节
- embstr ：<= 39 字节的字符串
- raw ：   > 39 字节的字符串

查看类型的方法

```
object  encoding key1
```
### 应用场景

#### 1. 缓存
<font color=red size=3>加速读写并减轻后端数据库的压力</font>

推荐的key 定义规则：

```
// 业务名：对象名：id：[属性]

miaosha:item:itemId:price
```

#### 2. 计数

实现业务上的快速技术、查询缓存，能够异步的写入数据库，减少数据库的访问压力。

#### 3. session 共享

web 服务通常由多台服务器协同提供用户访问的服务，而用户登陆后的登陆信息如何保存？

借助 Redis 缓存将 用户session 集中管理，当用户登陆和查询时，在 Redis 服务器更新或者查询即可。

#### 4. 限速

比如限制单位时间内验证码的次数。

## 哈希

### 常用命令

#### 1. 设置值 hset & hsetnx (不存在才设置)

**hset:**
- 成功： 返回 1
- 失败： 返回 0 

**hsetnx**
- 成功：
- 失败：
<font color=red size=3> 待验证</font>
```
// hashkey : value
hset key hashKey value
```

#### 2. 获取值 hget

不存在： 返回nil
```
hget key 
```

#### 3. 删除值 hdel key field

- 删除成功：返回 1
- 删除失败：返回 0

```
// hset  mykey key1 value1
// hset  mykey key2 value2

hdel  mykey  key1
// 删除后再查询会返回 nil
```

#### 4. 计算field 个数 hlen

```
hlen mykey 

```

#### 5. 批量设置或者获取 hmset & hmget

**hmset** 
- 成功返回 OK

```
hmset  mykey key3 value3  key4 value 4

// 批量获取返回
1) "value1"
2) "value2"
```

#### 6. 判断field 是否存在 hexists
- 存在： 返回 1
- 不存在： 返回 0
```
hexists  mykey key3
```

#### 7. 获取所有的field, hkeys

```
hkeys mykey

// 返回

1) "key2"
2) "key1"
3) "key3"
4) "key4"
5) "key5"
```

#### 8. 获取所有的value， hvals mykey

#### 9. 获取 k - v ： hgetall mykey

<font color=red size=3>值太多时，会引起阻塞，线上可以 hscan  和 hmget</font>

#### 10. values 的自增  hincrby hincrbyfloat
```
hincrby
```

#### 11. 计算value的字符串长度（需要Redis3.2以上） hstrlen

```
hstrlen mykey key1
```

### 内部编码

哈希类型内部编码主要有两种：
- ziplist （更省内存）（数量小于512且value 小于64字节时，默认使用）
- hashtable  读写时间复杂度 O(1)


### 应用场景

#### 利用 hash 存储 数据库中的整行字段 


## 列表

- 列表用来储存多个有序的字符串。
- 可以当队列和堆栈使用

### 主要的操作：
- 添加 `rpush & lpush`,  `linsert`
- 删除 `lpop & rpop`, `lrem`, `ltrim`
- 查找 `lrange`,   `lindex`, `llen`
- 修改  `lset`
- 阻塞 `blpop & brpop`


#### 1. 添加 lpush & rpush, linsert
```
// 左，右插入
lpush elgong.list  1

rpush elgong.lsit  2

// 指定位置插入
linsert  elgong.list  after| before  location  value
```

#### 2. 删除 rpop & lpop, lrem

**lrem** 删除指定元素
`lrem elgong.list  count  value`

- value 为被删除的值
- count > 0:  从左往右删除 count 个
- count = 0:  全部删除
- count < 0： 从右往左删除 count 个

```
rpop elgong.list
lpop elgong.list

// 删除指定的元素


```

#### 3. 查找 lrange ， lindex， llen
```
// 获取从左到右 所有元素
lrange elgong.list 0  -1

// 指定范围查找
lrange elgong.list  start  end

// 获取指定下标的元素, 索引为2
lindex  elgong.list 2

```

#### 4. 修改 lset
```
lset key index newValue
```

#### 5. 阻塞 blpop & brpop

有参数 timeout，

如果timeout = 0， 一直阻塞
```
// 等到list有值时再返回
blpop elgong.list  0

// 阻塞最长3s
blpop elgong.list  3
```

### 内部编码

- ziplist （长度小于512， 单值 小于64 字节时默认采用）
- linkedlist

### 应用场景

#### 1. 消息队列

通过阻塞可以实现生产者消费者模式。

## 集合



### 内部编码

### 应用场景

## 有序集合


### 常用命令

### 不常用命令

### 内部编码

### 应用场景

# 键的管理
常用的指令入 del, exists, expire, type, object.

## 6. 键的重命名 rename

```
rename elgong.list  newlist
```

## 7. 随机返回一个键 randomKey

```
randomKey
```

## 8. 键过期时间


## 9. 键的遍历
```
// 匹配
keys [j,r]edis
// 输出： jedis 和 redis 中存在的
```