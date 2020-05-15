---
title: Bloom Filter 布隆过滤器
date: 2020-05-16 00:12:25
categories: 算法与数据结构
tags: 布隆过滤器
---

[toc] 

[toc]

[谷歌开源的Guava的布隆过滤器](https://github.com/google/guava)

# 布隆过滤器是什么？

布隆过滤器由很长的**二进制向量**和一系列**随机映射函数**组成。

布隆过滤器可以用于检索一个元素是否在一个集合中。

它能给出的答案是： ==**一定不存在 /可能存在**==

# 布隆过滤器的应用场景？
- **提升磁盘查询未命中的效率**
    - 通过bloom filter 过滤掉一定不存在的数据查询，减少访问磁盘和网络的次数。
- **redis限流-缓存击穿问题**
    - redis 缓存前加一层布隆过滤器，应对缓存击穿问题 
- **海量网页黑名单**
- **爬虫网址判重系统**

# 布隆过滤器的优缺点?

- **优点**：
    - 布隆过滤器存储空间和插入/查询时间都是常数 O（k）
    - 随机映射函数间独立，可以并行计算
- **缺点**：
    - 随着存入的元素数量增加，误算率随之增加。
    - 无法删除，因为不能确定元素是否真的在bitmap中。

# 实现原理
布隆过滤器是一个很长的二进制向量，配合K 个随机映射函数，主要的操作是两个：
**插入**和**查找**

**插入时**： 元素通过k 个随机映射函数，得到 k 个索引， 将二进制向量中的对应位置 置1

**查找时**： 元素通过k 个随机映射函数，得到 k 个索引，查看对应位置是否全为1， 如果有0则一定不存在。

## 怎么选择 参数？

假设输入元素的个数为 n，二进制向量的长度为m（也就是布隆过滤器大小），所容忍的误判率p和随机映射函数的个数k。计算公式如下：（小数向上取整）

![image](F6AD6F9EB403400A8E5208E3422A2EBF)

# 实现代码

```
import java.util.BitSet;

public class MyBloomFilter {
    //2<<25表示32亿个比特位
    private static final int DEFAULT_SIZE= 2<< 25;
    private  static  final int[] seeds=new int[]{3,5,7,11,13,19,23,37};
   
    //这么大存储在BitSet
    private BitSet bits=new BitSet(DEFAULT_SIZE);
    private SimpleHash[] func=new SimpleHash[seeds.length];

    public static void main(String[] args) {
       
        //可疑网站
        String value="www.baidu.com";
        MyBloomFilter filter=new MyBloomFilter();
      
        //加入之前判断一下
        System.out.println(filter.contains(value));
        filter.add(value);
      
        //加入之后判断一下
        System.out.println(filter.contains(value));
    }

    //构造函数
    public MyBloomFilter(){
        for(int i=0;i<seeds.length;i++){
            func[i]=new SimpleHash(DEFAULT_SIZE,seeds[i]);
        }
    }

    //添加网站
    public void add(String value){
        for (SimpleHash f : func) {
            bits.set(f.hash(value),true);
        }
    }

    //判断可疑网站是否存在
    public boolean contains(String value){
        if(value==null){
            return false;
        }
        boolean ret=true;
        for (SimpleHash f : func) {
            ret=ret&&bits.get(f.hash(value));
        }
        return ret;
    }

    public static class SimpleHash {
        private int cap;
        private int seed;
        public SimpleHash(int cap,int seed){
            this.cap=cap;
            this.seed=seed;
        }
        public int hash(String value){
            int result=0;
            int len=value.length();
            for(int i=0;i<len;i++){
                result=seed*result+value.charAt(i);
            }
            return (cap-1)&result;
        }
    }
}
```