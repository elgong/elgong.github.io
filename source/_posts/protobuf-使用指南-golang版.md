---
title: protobuf 使用指南-golang版
date: 2020-06-22 22:24:57
categories: 序列化
tags: protobuf 
---

# protobuf 使用指南-golang版本
protobuf 是谷歌开源的序列化框架，广泛应用于各种rpc，微服务等等场景。

- [英文手册](https://developers.google.com/protocol-buffers/docs/proto3?hl=zh-cn#generating)

- [中文翻译](https://colobu.com/2017/03/16/Protobuf3-language-guide/)
- [其他参考](https://segmentfault.com/a/1190000020338411)

[TOC]

## 安装环境
[发布地址](https://github.com/protocolbuffers/protobuf/releases)

**0. 需要提前安装好go**

**1. 下载并编译源码包**
```shell
// 下载包
wget https://github.com/protocolbuffers/protobuf/releases/download/v3.12.3/protobuf-all-3.12.3.tar.gz

// 解压
tar -zxvf protobuf-all-3.12.3.tar.gz

cd protobuf-3.12.3/

./autogen.sh

// 指定安装的位置
./configure --prefix=/usr/local/protobuf

// -j8 多核心加速编译
make -j8 && make install

// 如果权限不够，则
// sudo make -j8 && sudo make install

ldconfig

```
**2. 执行完以上步骤，protoc可执行脚本在 /usr/local/protobuf 中, 可以创建软连接，这样也可以同时解决多版本的protobuf 共存问题**

```
// 明确一下：
//    新安装的protobuf 可执行脚本目录在protobuf-3.12.3/bin/protoc
//    而我们需要在 /usr/local/bin 创建它的一个软连接
// 格式：  ln -s  源脚本  新创建的软连接名字

sudo ln -s /usr/local/protobuf/bin/protoc     protoc3.12

```

**3. 安装go插件**

```
// 先指定GOPATH
// 设置wei当前路径
export GOPATH=`pwd`

// 下载安装go 插件
go get github.com/golang/protobuf/protoc-gen-go
```

**4. 创建工程**

**工程结构**：
- bin
- pkg
- src
    - myproto
        - data.pb.go
    - main.go
- data.proto
**具体步骤**
```
// 1. 创建工程文件夹
mkdir  protobuf_learn

// 2. 初始化模块
go mod init protobuf_learn

// 3. 创建 main.go
...

// 4. 执行 go build
go build

// 5. 创建自定义包 myproto
mkdir  -p src/myproto

```

## 定义消息类型
**创建data.proto文件**
```
syntax = "proto3";

message SearchRequest {
  string query = 1;
  int32 page_number = 2;
  int32 result_per_page = 3;
}

```
## 生成访问类

**执行命令**

**格式**：
protoc  --proto_path=【.proto文件】 --java_out=【java输出路径】 --go_path=【go输出路径】
```
// 提前创建好myproto
protoc3.12  data.proto --go_out=./src/myproto
```

## 使用访问类
```
import "github.com/golang/protobuf/proto"

// 编码 不是 Marshaler
proto.Marshal(obj)

// 解码
proto.Unmarshal(data, raw)
```

### 序列化

```
obj := &myproto.SearchRequest{
	Query: "name",
	PageNumber:1,
	ResultPerPage: 2,
}
fmt.Println("protobuf 编码")
data, err := proto.Marshal(obj)

if err != nil {
	fmt.Printf("err")
	return
}

fmt.Println(data)
```

### 反序列化

```
fmt.Println("protobuf 解码")

raw := &myproto.SearchRequest{}

err = proto.Unmarshal(data, raw)

if err != nil {
	fmt.Printf("err")
	return
}

fmt.Println(raw)
```