---
title: redis学习-复制
categories: 缓存中间件
tags: redis

---

[toc] 

# Redis6-复制（由主到从）

> 当存在主从多个节点时，才会出现复制，且复制的方向只能由主节点流向从节点

[toc]

## 一、 redis 集群的拓扑结构

### 主备结构-一主一从
- 可以只在从节点开启 AOF

### 读写分类结构-一主多从
> 慢查询可以 使用从节点，防止主节点的阻塞，提高并发性


### 解决网络负载过重-树状主从结构
> 一主多从，主节点的网络负载很大，利用多级结构可以减少主节点的网络负载

## 二、 复制涉及的环节

### 建立复制

**复制流的方向**：只能从主节点流向从节点

**配置**： 只能从节点配置！
- 配置文件中添加 `slaveof masterHost masterPort`
- redis 启动命令后加入 `--slaveof masterHost masterPort`
- 直接执行该命令

**查看复制的状态**：`info replication`
```
127.0.0.1:6379> info replication
    # Replication
    role:master
    connected_slaves:0
    master_replid:923b3aeddad7f8966ea67a788dd7098fe8e99fca
    master_replid2:0000000000000000000000000000000000000000
    master_repl_offset:14
    second_repl_offset:-1
    repl_backlog_active:1
    repl_backlog_size:1048576
    repl_backlog_first_byte_offset:1
    repl_backlog_histlen:14
```

### 断开复制

**直接断开复制关系，从节点自动升级为主节点**
`slaveof no one`


### 切换复制源
> 注意切换后，会先清空之前的缓存，然后重新复制
> ``slaveof masterHost masterPort``

### 复制的时间间隔粒度？

控制参数 `repl-disable-tcp-nodelay` 默认关闭

- 关闭时：主节点有新数据产生，会及时发送给从节点
- 开启时：固定时间间隔发送给从节点，linux一般默认40ms

## 三、复制的具体流程 (6步)

1. 从节点 执行 `slaveof host master` 
    - 指令后，从节点保存主节点的信息（ip + port）
    - 信息可以通过 `info replication` 获取
2. 从节点与主节点建立 socket 连接         
    - 从节点开启定时任务来维护复制的逻辑
    - 连接不上，会断开重新连接
3. 从节点 主动通信，发送 `ping`
4. 需要 权限验证， `auth password` 
    - requirepass是配置在主节点的，masterauth是配置在从节点
    - 具体在 redis.conf 中配置
5. 主从同步数据（全量复制和部分复制）
  
6. 修改命令的持续写入从节点

> 全量复制一般只在第一次复制，剩下的就是每次复制执行的命令


下面详细讲述全量复制的过程：

### psync指令 完成数据同步（包括全量和部分）

**格式**：
`psync {runId}{offset}`

**runId**:  主节点运行 id， 重启后会自动改变

**offset**: 从节点已经复试的数据偏移量，第一次默认为 -1

#### 全量复制的流程
1. 从节点发送 `psync` 进行同步， 无法得知主节点运行id，所以发送 `psync-1` 
2. 主节点 发现`psync-1`,判定需要全量复制，返回 运行id 和 offset
3. 从节点保存 运行id 和 offset
4. 主节点执行 `bgsave`, 将产生的 `RDB` 文件发送到从节点
5. 同时主节点仍在处理命令，将命令写入了 缓冲区，再次把缓冲区的命令发送给 从节点（注意可能出现的缓冲区溢出，当写入超过1mb）

#### 部分复制的流程
> 针对网络异常导致的命令丢失等，做出了优化，避免使用全量复制来解决少量数据的问题

1. 主从节点之间出现网络中断，并且超 `repl-timeout` 设定的时间，主节点可以得知断开了，写入命令都存在缓冲区
2. 当主从连接恢复，由于从节点保存了 主节点的id 和复制偏移值，直接作为 `psync`参数继续传递


## 四、心跳检测

> 主从节点连接后，会维护一个长连接，互相发送心跳命令

**主节点**：
- 每10s发送一次 `ping`, 来检测从节点的状态
- 参数 `repl-ping-slave-period` 可以设置时间间隔

**从节点**：
- 每1s 发送一次 `replconf ack{offset}`
- 上报自身已经复制到的偏移量