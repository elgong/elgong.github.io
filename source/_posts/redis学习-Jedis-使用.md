---
title: redis学习-Jedis 使用
date: 2020-05-16 00:17:58
categories: 缓存中间件
tags: redis, jedis
---

[toc] 

[toc]
> 本系列文章整理摘抄自<Redis 开发与运维>

# 客户端怎么和 Redis 服务器连接？

客户端和 Redis 服务器的通信是 建立在 TCP 连接的基础上的。

并且 Redis 制定了 RESP 序列化协议，是一个简单地通信约定。

## Resp序列化协议

`*<参数数量>\r\n$<参数1的字节数量>\r\n<参数1>\r\n$<参数2的字节数量>\r\n<参数2>\r\n`

来给可视化一下：
```
*<参数数量>\r\n
$<参数1的字节数量>\r\n
<参数1>\r\n
$<参数2的字节数量>\r\n
<参数2>\r\n
```

其他可以参考该书章节。

# Jedis 连接池的使用

简单的API 介绍

**获取 jedis连接**
```
Jedis jedis = new Jedis("127.0.0.1", 6379);

Jedis jedis = null;
try {
    jedis = new Jedis("127.0.0.1", 6379);
    
} catch (Exception e) {
    logger.error(e.getMessage(),e);
} finally {
    if (jedis != null) {
        jedis.close();
    }
}
```


```
//  String
jedis.set("key", "value");
jedis.get("key")


//  hset -字典
jedis.set("hash", "key1", "value1");
jedis.set("hash", "key2", "value2");
jedis.get("key1")

//  list -列表
jedis.rpush("mylist", "1");


// set -集合
jedis.sadd("set", "aaa");

....


```

## springboot 环境下的使用

### 1. maven 依赖
```
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>3.1.0</version>
</dependency>


<dependency>
	<groupId>org.slf4j</groupId>
	<artifactId>slf4j-log4j12</artifactId>
	<version>1.4.2</version>
</dependency>

<dependency>
	<groupId>log4j</groupId>
	<artifactId>log4j</artifactId>
	<version>1.2.14</version>
</dependency>
```

### 2. 代码实现

**配置类 -> 从 application.preperties 读取配置项，并且配置**
```
@Component
@ConfigurationProperties(prefix = "redis")
public class RedisConfig {
  // 私有属性 
    
  // 配置项
  get... set...
}
```

**poolFactory 工厂类创建 pool**
```
@Component
public class RedisPoolFactory {

    // 注入配置项
    @Autowired
    RedisConfig redisConfig;

    // Bean注解 ： 根据方法创建对象，类型是JedisPool
    @Bean
    public JedisPool JedisPoolFactory(){

        JedisPoolConfig poolConfig = new JedisPoolConfig();
        
        // 各种配置
        poolConfig.setMaxIdle(redisConfig.getPoolMaxIdle());
        poolConfig.setMaxTotal(redisConfig.getPoolMaxTotal());
        poolConfig.setMaxWaitMillis(redisConfig.getPoolMaxTotal()*1000);

        JedisPool jedisPool = new JedisPool(poolConfig, redisConfig.getHost(),                                      redisConfig.getPort(),                                                  redisConfig.getTimeout()*1000,                                          redisConfig.getPassword(), 0);

        return jedisPool;
}
```


**Redis 服务类 开始封装各种服务**

当然，也要为服务模块化，比如 `RedisUserService`, `RedisMiaoshaService`

```
@Service
 public class RedisService {
    // 注入，@Bean 产生的jedisPool
    @Autowired
    JedisPool jedisPool;
    
    public <T> boolean set(IProfixForKey prefix, String key, T value){

        Jedis resource = null;
        try{
            // 拿到连接
            resource = jedisPool.getResource();
            
            // 封装一下key, 加上特点的头信息，例如： dbName:tableName:id
            String strValue = beanToString(value);
    
            // 生成key
            String realKey = prefix.getPrefix() + key;
    
            if (strValue == null || strValue.length() <= 0){
                return false;
            }
            
            // 设置
            resource.set(realKey, strValue);
    
            return true;
        }finally {
            returnToPool(resource);
        }

    }
 }
```


## 非 spring 环境下的使用

举个例子，不知道合不合适。

**单例模式 来创建 JedisPool**
```
public class JedisFactory {

    private volatile  static JedisPool jedisPool;

    private volatile static JedisPoolConfig poolConfig;
    private volatile static String ip;
    private volatile static int port;
    private volatile static int timeout;
    private volatile static String password;
    private volatile static int database;

    private JedisFactory() {

        //JedisPoolConfig poolConfig, String ip, int port, int timeout, String password, int database
        /* apache common-pool 工具
        *
        * JedisPoolConfig
        * */
        this.jedisPool = new JedisPool(poolConfig, ip, port, timeout , password, 0);
    }


    public static JedisPool getJedisPool(){

        if (jedisPool == null){

            synchronized (JedisFactory.class){

                if (jedisPool == null){
                    jedisPool = new JedisPool(JedisFactory.poolConfig, JedisFactory.ip, JedisFactory.port,
                                              JedisFactory.timeout,  JedisFactory.password, JedisFactory.database);
                }
            }
        }

        return jedisPool;
    }

    public static void setJedisPoolConfig(JedisPoolConfig poolConfig, String ip, int port, int timeout, String password, int database){

        System.out.println(" 配置jedis 参数...");
        JedisFactory.poolConfig = poolConfig;
        JedisFactory.ip = ip;
        JedisFactory.port = port;
        JedisFactory.timeout = timeout * 1000;
        JedisFactory.password = password;
        JedisFactory.database = database;

    }
}
```

**JedisService**

```

package top.elgong.jedis;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

/*
*
*   解决redis 用到的
* */
public class JedisService {

    /**
     *
     * @param key
     * @param value
     */
    public void set(String key, String value){
        Jedis resource = null;
        try{
            JedisPool jedisPool = JedisFactory.getJedisPool();

            resource = jedisPool.getResource();

            resource.set(key, value);

        }catch (Exception e){
            e.printStackTrace();
        }finally {

            // 送回连接池中
            if (resource != null){
                resource.close();  // close 就是送回池子
            }
        }
    }

    /*
    *
    * */
    public String get(String key){
        Jedis resource = null;
        String ret = null;
        try{
            JedisPool jedisPool = JedisFactory.getJedisPool();
            resource = jedisPool.getResource();

            ret = resource.get(key);


        }catch (Exception e){
            e.printStackTrace();
        }finally {
            // 送回连接池中
            if (resource != null){
                resource.close();  // close 就是送回池子
            }
        }

        return ret;
    }

}

```

**test**
```
package top.elgong.jedis;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPoolConfig;

import java.time.LocalDateTime;

public class Test {

    public static JedisService jedisService = new JedisService();
    public static void main(String[] args) {

        JedisPoolConfig poolConfig = new JedisPoolConfig();
        String ip = "121.41.111.45";
        int port = 6379;
        int timeout = 300;
        String password = "Gelqq666%";
        int database = 0;

        JedisFactory.setJedisPoolConfig(poolConfig, ip, port, timeout, password, database);

        jedisService.set("leetcode-java:jedis:test:key1", "haha-" + LocalDateTime.now().toString());

        String s = jedisService.get("leetcode-java:jedis:test:key1");

        System.out.println(s);
    }
}

```

# Jedis Pipline 的使用

```
Jedis jedis = new Jedis("127.0.0.1");

// 1)生成pipeline对象
Pipeline pipeline = jedis.pipelined();

// 2)pipeline执行命令， 注意此时命令并未真正执行
for (String key : keys) {
    pipeline.del(key);
}

// 3)执行命令
pipeline.sync();
```

# Jedis Lua 脚本

待补充。。