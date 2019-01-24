---
title: C++梳理笔记
date: 2019-01-20 20:30:39
categories: C++
tags: C++
copyright: 
password: 123456
top:
---

<font color="red"><big>测试内容</big></font>


~~删除线~~

[链接](http://zhuzhuyule.xyz)

![logo](图片测试！/test.jpg)

# C++学习笔记

## **类型转换：**

1. 隐式转换： 低类型转换为高类型

       浮点数（直接舍掉小数，不四舍五入） + 整数

2. 显式转换：

    	int **(**z**) = (**int**)** z **= static_cast\<**int**\> (**z**)**

。。。

### **数据的输入和输出：信息的流动**

 1. 输入：

 2. 输出：

 3. 流类库的操纵符：

### **程序控制：**

		if, while, for, do-while , break, continue, { switch,case,default } ;
1. do-while:

	    do 语句      // 先执行一次
	    while(表达式)；

2. for的范围，遍历容器：


### **自定义类型：**

* 类型别名： 


  1. typedef double Area, V;

  2. using Area = double




* 枚举类型： 有限的个数

　　　　不限定作用域： enum 类型名 { 变量值列表}

　　　　限定作用域：

　　　注：枚举元素是常量，不能赋值

　　　　　枚举元素有默认值，默认0,1,2,3,4，声明时可以另外指定

　　　　　可以进行关系运算

* auto类型 和decltyoe类型
		
		    decltype( float( i )) j = 2;   // j值是2，类型是float;
		
		    auto m = 2.5;  // m 为float;

* 结构体( C语言中的)： struct

			struct MyTimeStruct{   //定义 结构体类型
			    unsigned int year,mouth,day,hour,min,sec;
			};



## **函数： 可重用的功能模块（定义和调用）**

### **函数定义：**

　　形参不占用空间，调用时分配；

### **函数调用：**

　　调用前要函数声明： int sum**(** int a**,** int b**);**

　　1. 函数的嵌套调用：

　　2. 函数的递归调用： 直接或者间接调用自身

计算n!

		unsigned int fac( unsigned int n){
		    if (n == 0) return 1;
		    return fac( n - 1) * n;
		}

汉诺塔

		分析：
		1.	A 上的n-1个盘子移动到B上（借助C）;
		2.	A上剩下的盘子移动到C上；
		3.	B上的n-1个盘子移动到C上（借助A）
		void move(char src, char obj)
		{
		    cout << src << "--->>>" << obj << endl;
		}
		
		void hanoi(int n, char src, char medium, char obj)
		{
		    if(n == 1)
		        move(src, obj);
		    else{
		        hanoi(n-1, src, obj, medium);
		        move(src, obj);
		        hanoi(n-1, medium, src, obj);
		    }
		}


### **函数的参数：**

1. 形参不占用空间，调用时分配；

2. 计算结果返回多个（利用引用）

3. 多个参数时，从后开始传

### **引用类型（&）：** 必须初始化，该类型不可改变，是其他变量的别名
	
		int i, j;
		int & ri = i;  // 定义int引用类型变量 ri, 初始化为i的引用


### **含有可变参数的函数：（两种方法）**

1. 所有实参类型相同：`initializer_list<int> li; //类模板, 都是常量`

2. 具体看第九章

3. 类型不同：

### **内联函数（inline）： **用函数体内的语句，替换函数调用表达式，编译时完成，类似 #define

声明： `inline int calArea(int a){  }`

要求： 1. 不能有循环，switch语句 2. 定义在调用之前 3. 不能有异常接口声明

###  constexpr 函数：（常量表达式函数）


### **带默认参数的函数：**

		int getVa(int length, int weight = 2)

### **函数的重载：**（C++多态性的重要机制，编译过程中实现）

函数体同名，参数类型不同/参数个数不同

		int add(int x, int y);

		float add(float x, float y);

		float add(float x, float y, float z);


### **C++系统函数：**

		#include <cmath>
			|_
			|_
		#include <cstdlib>
			|_
			|_
		#include <cstdio>
			|_
			|_
		#include <ctime>
			|_
			|_



## **类和对象**

类：构建对象的蓝图，

对象：由类创建，含有数据和方法

封装：对数据和操作数据的方法的组合绑定

继承：在已有类基础上，形成新的类

多态：

构造函数：定义对象时，通过构造函数初始化

析构函数：删除对象时，通过析构函数释放资源

### ** 类和对象的定义：**

定义类：

		class {  //类名称 
		    public:
		        // 公有成员,外部接口
		    private:
		        // 私有成员
		    protected:
		        int hour = 0; // 类内初始化
		        // 保护型成员
		}


注意：不指定类型，默认为私有；

### **成员函数：**
		
		|_ 内联成员函数： 类内声明或者inline关键字

		|_类外实现：void 类名称::成员函数名称（）{ }

### **构造函数：**

-  在创建对象时，自动调用来初始化数据

-  与类名相同

-  构造函数有初始化列表

-  格式 类名（string s, lei i）：s(初始值)，i(初始值){ }；

### **委托构造函数：**一个构造函数 通过另一个构造函数 初始化

### **复制构造函数：**

用途：

-   用存在的对象 去初始化新对象 （通过引用旧的对象）

-   函数f的形参是类的对象，调用f时，将用实参对象初始化形参对象

-   函数g的返回值是类的对象，用return的对象来在主调函数中初始化一个无名对象

### **析构函数：**生存期结束，删除清理工作，不能有return，不能有参数

	    class 类名{

	    public:
	        类名（形参）； // 构造函数
	        类名（const 类名& 旧对象名）；  // 复制构造函数 =delete是不生成
			~ 类名（）；
	    }


>   注：未声明时，编译器自己生成一个默认的

### **前向引用声明：**两个类相互引用时，某个类在引用之前就声明

	    class A;  //前向引用声明，只是一个标识符，不是万能的
	    class B{
	    public:
	        void A(B b);
	    }

	    class A{
	    public：
	        void B（A a）;
	    }


### **结构体：**特殊的类，默认是公有的，可以有函数成员

	    //公有成员
	        int a;
	    protected:
	        int b;
	    private:
	        int c;
	    };


### **联合体：**

目的：存储空间的共用，成员不能同时有效，比如某人语文课成绩，只有一种可能；
		
		union Mark{ // 成绩的联合体， 只有一个成立
		    char grade;  //等级类的成绩
		    bool pass;  // 是否通过的成绩
		int percent;  //百分制成绩  }

### **枚举类：**

enum class 枚举类型名： 底层类型（int）**{** 枚举列表 **};**

    //默认 int

优势：

-   强制作用域 --必须在枚举类 枚举类型名：：枚举值，不同枚举类可以有同名值了

-   转换限制 --枚举对象不能与整型 隐式转换

-   底层类型 --可以指定


## **数据共享和保护：**

### **作用域分类：**

函数原型作用域：

- 形参的范围在（）内，所以不需要名字也行，int area( int );

局部作用域

- 函数{ }内

- if、for、while { }内

类作用域： 类外访问类的成员

- 静态成员：通过 对象名.成员名 访问

- 非静态成员：

- 文件作用域

- 命名空间作用域： 10章

### **对象的生存期：**

静态生存期： 整个程序结束后消失

- 函数内的静态对象， 用static ，全局寿命，只局部可见

动态生存期：

- 离开作用域后消失

- 下次进函数重新生成对象

### **类的静态数据成员：**

- static 声明

- 为该类所有对象共享，具有静态生存期

- 必须在类外定义和初始化，类内声明，用：：指明所属于的类

比如记录 类产生了多少对象；opencv中的Mat对象好像用到了？？？？

		class base{   
		    public :   
		           static   int   _num;//声明   
		};   
		int  base::_num=0;  //真正定义  


### **类的友元：**

- 破坏数据封装和数据隐藏的机制

- 尽量不用

### ** 友元函数：**

- 类声明中由关键字 friend 修饰说明的非成员函数

- 可以在其函数体内访问对象的private,protected成员

- 但必须通过对象名：：访问，函数参数为类的引用
-   
### ** 友元类：**

		class A{
		    friend B;
		  public:
		    void display(){
		        count << x << enld;
		    }
		  private:
		    int x;
		}
		
		class B{
		  public:
		    void set(int i);
		    void display();
		  private:
		    A a;
		}
		
		void B::set(int i){
		    a.x = i;   // B类中改变 A类私有值
		}
		void B::display(){
		    a.display()
		}


### **共享数据的保护：**

#**常类型：**const

常对象：必须初始化，不可更新

		class A{
		}
		A const a; // a是常对象


常成员：(不可以放在构造函数体内复制，可以在初始化列表中)

		A：：A(int i):a(i){ }

- 常数据成员：const修饰的

- 静态常数据成员： static const int b;

- 常函数成员（用来处理常对象的函数）

    - 不更新对象的数据成员

    - 声明和实现都带const


			class A{
			    void f（int a）const;
			}
			void A::f(int a) const{  
			}; // f是常对象函数, 处理常对象


- 常引用：不可更新

　　　引用是双向传递的，避免修改原值的方法就是常引用；

         const A& a;

- 常数组：

- 常指针：

### **多文件结构和预编译命令：**

- .h 系统使用

- .hpp 个人使用(类的声明,函数的声明)

- .cpp (类的实现，函数的实现)

   ![](media/f5d645ed218d5fa3e753f771b72310fc.png)

### **外部变量：**

文件作用域中定义的变量默认是外部变量，其他文件使用前，extern声明

将变量和函数限制在编译单元内：namespcae:

		namespace{ //匿名的命名空间，外部不可调用任何东西
		    int i;
		    void fun(){
		        i++;
		    }
		}


### **预编译命令：**

		#include< >  标准方式搜索，从系统目录include


		#include”” 先当前目录搜索，没有再标准搜索


		#define 


		#undef 删除有#define的宏

		#if 表达式  // 条件编译指令
		---
		#else
		---
		#endif 


		#ifndef 标识符
		---
		#else  
		---
		#endif



## **数组，指针与字符串：**

### **数组：**

定义： `int arr**[**m**][**n**]**…;`

　　注：二维数组中 arr[1] 第二行首地址

### **数组作为函数参数：**

　　数组名做参数： 形参，实参都是数组名，传入的是地址

### **对象数组：**

　　定义：类名 数组名[对象元素个数]

　　访问：数组名[下标].成员名

### **基于范围的for循环：**c++11,自动遍历整个容器

	  for( auto x : 容器){ } for( auto &x : 容器){ }

注意：

- auto &x是元素引用，auto x是元素的副本

- auto推导出的类型是容器中的值类型

- ：冒号后的表达式只执行一次

### **指针：**

### **定义：**

		static int i;
		
		static int * p = &I;

### **指针的初始化和赋值：**

### **指针的算术运算，关系运算：**

### **指针数组：**

        类名  *p[2];

### **指向数组的指针：**

        int **p; 指向二维数组的指针

### **指针与函数：**

- 指针做参数：大批量数据提高效率

- 指针类型的函数：返回类型是指针

		int * function(int i){return 全局或者静态的 }；// 不能返回非静态局部变量

-  指向函数的指针：实现函数回调的功能

>   定义： 数据类型 (\*f)(参数表);

>   数据类型：返回值

-   对象指针：

>   定义： 类名 \*对象指针名 = & 对象；

>   访问对象： 对象指针名-\>成员名

（\*对象指针名）.成员名

- this 指针：成员函数的一个隐士参数，初始化为对象的地址，不可改变

- 隐含于类的每个非静态成员函数中

- 指出成员函数所操作的当前的对象

- \*this 是当前对象地址

### **动态内存分配：**

new** 类型名 **(**初始化列表**) // 返回首字节地址

delete 指针p //p一直在，删除的只是p指向的对象申请的空间

动态数组：
new 类型名[数组长度]

delete[] 数组首地址p指针

### **智能指针：**C++11

### **内存管理**

-   unique_ptr:

    -   不允许多个指针共享资源，标准库中move可以转移指针，但原来指针会失效

-   shared_ptr:

    -   多指针共享

-   weak_ptr:

    -   可复制共享

>   Vector对象：类模板

优势：

-   封装任何形式的动态数组，自动创建，删除

-   下标越界检查

定义： vector <元素类型> object（长度）

- `object.begin()  object.end()  object.size()`

- auto 遍历vector `for(auto e: object);`

### **对象的复制和移动：**

-   浅层复制和深层复制：复制对象用到复制构造函数，默认的复制构造只传递了指针，两个变量指向同一块内存，释放其中一个，再释放第二个会出错；

    -   浅层：实现对象间数据一一对应的复制，但两个对象指向同一内存

    -   深层：当对象成员是指针类型，应该对指针所指对象进行复制。

>   类名**::**类名**(**const 类名**&** v**){**

>   size **=** v**.**size**;**

>   data_ptr **= new** Ponit**[**size**];**

>   **for(**int i**=**0**;** i **\<** size**; ++**i**){**

>   data_ptr**[**i**] =** v**.**data_ptr**[**i**];**

>   **}**

>   **}**

-   移动构造：C++11,省去了构造和删除临时对象的过程

    ![](media/8c3092d99bcdba78edeb2d8123270ffe.png)

>   class_name**(**class_name **&&**old**)::**xptr**(**old**.**xptr**){**

>   n**.**xptr **= NULL;** // 原来的指针清空

>   **}**

### **C风格字符串：**字符数组

### **string类：**

常用构造函数：

-   string(); //默认构造，长度为0

    -   string s1**;**

-   string(const char \*s) //指针s所指向的字符串常量初始化该对象
	
		string s2 = “abc”;
		
		string(const string &rhs) //复制构造函数
		
		string s3 = s2;

访问：下标访问

整行字符串的输入： cin 被空格隔开

getline(cin,s2); //包含\#include\<string\>

getline(cin,s2,’,’);


## **继承和派生：** 充分利用原有的

继承：保持已有类的特征来构造新类

派生：在已有类基础上新增自己的特性

基类：父类

派生类：子类

直接基类和间接基类

单继承：

	class 派生类名：继承方式 基类名{  //继承方式，
	    成员声明；//新增成员的声明
	}


多继承：

	class 派生类名：继承方式1 基类1，继承方式2 基类2{
    	成员声明；
	}


### **继承的方式：**

控制：派生类对基类成员的访问权限

-   公有继承 public

>   基类中的pubilc和protected访问属性在派生类中不变

>   基类的pravate不可被对象直接访问

-   私有继承 ：内部可以访问基类的公有和保护成员，但是其对象不再可以访问

-   保护继承 ：基类的公有和保护，到这都成了保护成员，类内可以访问，但对象不能

派生类的构成：

-   吸收基类成员

-   改造基类成员

    -   增加同名成员，基类成员被覆盖（重新定义继承的成员函数必须用虚函数）

-   添加新成员

### **类型转换：**

基类和派生类之间：
  
派生类的对象可以隐含转换为基类对象；

派生类的对象可以初始化基类的引用；

派生类的指针可以隐含转换为基类的指针；

### **派生类的构造函数：**

默认情况下，基类的构造函数不被继承，派生类需要自己构造

c++11，using语句继承基类构造函数

### **派生类的复制构造函数：**

### **派生类的析构函数：**

### **虚基类：**

## **多态性**

### **运算符重载：**

	//双目运算符
	函数类型 operator 运算符（参数）  
	{
	    // 参数个数 = 原操作数个数 - 1
	}
	//前置单目运算符，返回引用所以可以当左值
	函数类型 & operator ++（无参数）  
	{
	    return * this;
	}
	//后置单目运算符，
	函数类型 operator ++（参数为int类型）  
	{
	    old = *this;
	    ++(*this);  //调用的前置
	    return old;
	}


-   重载为非成员函数：

1.  列出所有操作数

2.  至少有一个自定义类型参数

3.  后置单目运算，参数要增加int,但不用写形参名

4.  要操作某类对象的私有成员，则可声明为该类的友元函数

### **虚函数：**virtual改造基类成员，实现动态绑定；必须是非静态成员

>   原理：编译时先不确定和哪个类的成员对应，在程序运行时刻，再对应；

	#include <iostream>
	using namespace std;
	class Base1{
	public:
	    virtual void display() const; //虚函数，不要用内联
	};

	void Base1::display() const{
	    cout << "Base1 " << endl;
	}
	
	class Base2:public Base1{
	public:
	    virtual void display() const;
	}
	void Base2::display() const{
	    cout << "Base2" << endl;
	}


### **虚析构函数：**打算通过基类指针调用某一个对象的析构函数（执行delete）

### **虚表和动态绑定：**

>   虚表：

-   每个多态类都有虚表；

-   存放各个数函数的入口地址；

-   每个对象有指向当前类的虚表的指针（虚指针vptr）；

>   动态绑定：

-   构造函数为对象的虚指针赋值

### **抽象类：**含有纯虚函数的类,不能直接定义对象

>   纯虚函数：

>   基类中声明的虚函数，在基类中没有定义具体的操作，要求在派生类中根据实际需求完

>   成自己的版本：

	virtual 函数类型 函数名**(**参数名**) =** 0**;**

### **override 和 final :**C++11

override声明的函数，必须在基类中找到原型；

final 不允许继承或者覆盖；


## **模板**

### **函数魔板：**整数和浮点数求绝对值，需要多次重载函数，但是用函数模板，只需要设计通用功能；

template\<模板参数表\> // 类型：class或者typename 常量：

函数定义

	template<typename T>
	T abs(T x){
	    return x<0?-x:x;
	}


### **类模板：**

	template<模板参数表>
	class 类名{
	    类成员声明;
	}

	//类成员定义
	template <模板参数表>
	类型名  类名<模板参数标识符列表> :: 函数名(参数表)
	{

	}


### **线性群体：**按位置顺序有序排列

直接访问：

数组类模板：

索引访问：

顺序访问：

链表类和结点类模板：

单链表：每个结点包括数据和指针，只有一个指向后续结点的称为单链表；

![](media/9167a427f849e864c5d630d0c0bc3163.png)

单链表结点类模板：

	template <class T>
	class Node{
		private:
	    	Node<T> *next;
		public:
	    	T data; 
	    	Node(const T&item,Node<T>* next = 0);  //构造函数
	    void insertAfter(Node<T> *p); //插入
	    Node<T> *deleteAfter();  //删除
	    Node<T> *nextNode() const; 
	}
	
	template <class T>
	void Node<T>::insertAfter(Node<T> *p){  // *p是要插入的结点
	// p节点的指针指向当前节点的后续结点
	    p->next = next; // next是原链表待插入位置的结点的指针
	    next = p;  
	}
	template <class T>
	Node<T> *deleteAfter(){
	    Node<T> * tempPtr = next;
	    if (next == NULL)  //判断是否是删除最后的元素
	        return 0;
	    next = tempPtr = next;
	    return tempPtr;
	}


>   插入：

![](media/85d072d9c8a8366378b00b9af8ca4920.png)

>   头插法：可以当队列

>   尾插法：栈

>   删除：

![](media/ffdd5c0226d2a3f9a7833379eb0ebf90.png)

待查询：

explicit关键字

构造函数 explicit可以抑制内置类型隐式转换


## **泛型设计**

基本概念：

编写不依赖具体数据类型的程序，通用的；

STL简介：(Standard Template Library)

C++ string类库入门：

    #include <iostream>

    #include <string>

    using namespace std;

    int main()
    {

        // 构造函数：
	    string str1 = "Yesterday";
	
	    string str2("Today");
	
	    string str3("Hello",2); //取c风格字符串 长度为 2 作为初值，即"He"
	
	    string str4(str1, 6); // 始于位置6开始的字符串，即"day"
	
	    string str5(str1,6,1); // 始于6，长度1，即"d"
	
		string str6(1,'a'); //6个'a'
		
		// 赋值，交换
		str1.assign("hahahaha"); //重新赋值
		
		swap(str1,str2); //交换两个字符串内容 str1="Today" str2="hahahaha"
		
		// 追加
		str1 += " we"; // += 可追加 string对象，字符串，字符
		
		str1.append(" ar"); // append 可追加 string对象，字符串
		
		str1.push_back('e'); //push_back 只能追加字符 str1 = "Today we are"

		// 插入
		str1.insert(0," family"); //str1 = "Today we are family"
		
		// 删除
		str1.erase(2,1); //第2个位置开始， len = 1 个字符

		str1.clear(); //删除全部
		
		// 访问字符串
		string s = "asdfgh";
		
		cout << s[1]; // 's'
		
		cout << s.at(2); // 'd'
		
		// 查找
		int position = s.find('f',0); // 从0开始查找第一次出现‘f’的坐标
		
		// 替换
		s.replace(s.find('f'),3,"ZZZ"); //替换find的位置处
		3个字符串为 “ZZZ”
		
		// 分割
		getchar();
		
		return 0;

	}
