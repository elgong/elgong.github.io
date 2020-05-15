---
title: Java 向上转型&向下转型
date: 2020-04-22 11:53:28
categories: Java多态
tags: 向上转型&向下转型
---



# 向上转型和向下转型

- **向上转型：**  父类引用 指向子类对象
	- 调用效果： 父类的属性  +    <font color="red"><big>父类的方法（未被子类重写）+ 子类的方法 （重写了父类）</big></font>
-	**向下转型：**
	- 调用效果：子类的属性  +  子类的方法 



例子如下：

```java
package top.elgong.cast;

/* Father.java */
public class Father {

    /* 静态类变量 */
    public static int staticInt = 1;
    public static String staticStr = "father static str";

    /* 实例变量 */
    public int Int = 2;
    public  String Str = "father str";

    /*  会被子类覆盖的方法  */
    public void say(){
        System.out.println("被子类覆盖的方法 :say ");
    }


    /*  不被子类覆盖的方法 */
    public void sayOnlyFather(){
        System.out.println("未被子类覆盖的方法 : sayOnlyFather");
    }


    /* 私有方法默认为  fianl， 不可被继承， 也不参与转型 */
    private void sleep(){
        System.out.println(" father sleep");
    }

}

```


```java
package top.elgong.cast;

/* Son.java */
public class Son extends Father {

    /* 子类的 变量区 */
    /* 静态变量 */
    public static int staticInt = 111;
    public static String staticStr = "son static str";

    /* 实例变量 */
    public int Int = 222;
    public  String Str = "son  str";

    /* 子类独有的变量 */
    public String strOnlySon = "str Only Son";


    @Override
    public void say() {
        System.out.println("子类重写的方法：say");
    }

    public void sleep(){
        System.out.println("子类独有的方法： son sleep : ");
    }

}

```


```java
package top.elgong.cast;

public class Test {

    public static void main(String[] args) {
        System.out.println(" 向上转型：  ");
        /* 向上转型 */
        Father f = new Son();

        System.out.println(f.Int);  // 打印 2
        System.out.println(f.Str);  // 打印 father  str


        f.say();  // 打印 son say :
        f.sayOnlyFather();  // 打印   father say 2

        /* 向下转型 */
        System.out.println(" 向下转型：  ");
        Son s = (Son)f;

        System.out.println(s.Int);  // 打印   222
        System.out.println(s.Str);  // 打印   son  str
        System.out.println(s.strOnlySon);   // 打印   strOnlySon

        s.say();  // 打印  son say : 

    }
}

```

