# 常用STL及用法

以下整理一下常用的`STL`的常用用法.

 ## STL中的二分查找算法

-   binary_search：查找某个元素是否出现。
-   lower_bound：查找第一个大于或等于某个元素的位置。
-   upper_bound：查找第一个大于某个元素的位置。
-   equal_range：查找某个元素出现的起止位置。注意，终止位置为最后一次出现的位置加一。

1.  `binary_search`试图在已排序的[first, last)中寻找元素value。如果[first, last)内有等价于value的元素，它会返回true，否则返回false，它不返回查找位置。

2.  `lower_bound`它试图在已排序的[first,last)中寻找元素value。如果[first, last)具有等价于value的元素，lower_bound返回一个iterator指向其中第一个元素。如果没有这样的元素存在，它便返回假设这样的元素存在的话，会出现的位置。即指向第一个不小于value的元素。如果value大于[first, last)的任何一个元素，则返回last。

    >   STL 中的 lower_bound()，
    >   函数lower_bound()在first和last中的前闭后开区间进行二分查找，返回大于或等于val的第一个元素位置。如果所有元素都小于val，则返回last的位置
    >   举例如下：
    >   一个数组number序列为：4,10,11,30,69,70,96,100.设要插入数字3,9,111.pos为要插入的位置的下标
    >   则
    >   pos = lower_bound( number, number + 8, 3) - number，pos = 0.即number数组的下标为0的位置。
    >   pos = lower_bound( number, number + 8, 9) - number， pos = 1，即number数组的下标为1的位置（即10所在的位置）。
    >   pos = lower_bound( number, number + 8, 111) - number， pos = 8，即number数组的下标为8的位置（但下标上限为7，所以返回最后一个元素的下一个元素）。
    >   所以，要记住：函数lower_bound()在first和last中的前闭后开区间进行二分查找，返回大于或等于val的第一个元素位置。如果所有元素都小于val，则返回last的位置，且last的位置是越界的！！~

    例子:

    ```cpp
    int main()  
    {  
        int point[10] = {1,3,7,7,9};  
        int tmp = upper_bound(point, point + 5, 7)- point;//按从小到大，7最多能插入数组point的哪个位置  
        printf("%d\n",tmp);  
        tmp = lower_bound(point, point + 5, 7) - point;////按从小到大，7最少能插入数组point的哪个位置  
        printf("%d\n",tmp);  
        return 0;  
    }  
    ```

3.  `upper_bound`它试图在已排序的[first,last)中寻找value，返回可安插value的最后一个合适的位置。如果value存在，lower_bound 返回的是指向该元素的iterator。相较之下upper_bound并不这么做，它返回value可被安插的最后一个合适位置。如果value存在，那么它返回的iterator将指向value的下一个位置，而非value自身。

4.  `equal_range`的返回值本质上结合了lower_bound和upper_bound两者的返回值。其返回值是一对iterator i 和 j ， 其中i是value可安插的第一个位置，j则是value可安插的最后一个位置。可以推演出：[i，j)中的每个元素都等价于value，而且[i, j)是[first, last)之中符合上述性质的一个最大子区间。  算法lower_bound返回该range的第一个iterator， 算法upper_bound返回该range的past-the-end iterator，算法equal_range则是以pair的形式将两者都返回。

---

## unique去重

```cpp
int m=unique(X,X+num)-X;
```

上面的函数可以对一个数组进行去重，前提是数组已经有序，去重后返回最后一个元素的位置，其实并没有去，只是把重复的放在了后面

## String类的一些用法

1.  `replace`的用法

    ```cpp
    /*用法一：  
     *用str替换指定字符串从起始位置pos开始长度为len的字符  
     *string& replace (size_t pos, size_t len, const string& str);  
     */    
    int main()    
    {    
        string line = "this@ is@ a test string!";    
        line = line.replace(line.find("@"), 1, ""); //从第一个@位置替换第一个@为空    
        cout << line << endl;       
        return 0;    
    }    

    /*用法二：  
     *用str替换 迭代器起始位置 和 结束位置 的字符  
     *string& replace (const_iterator i1, const_iterator i2, const string& str);  
     */    
    int main()    
    {    
        string line = "this@ is@ a test string!";    
        line = line.replace(line.begin(), line.begin()+6, "");  //用str替换从begin位置开始的6个字符    
        cout << line << endl;       
        return 0;    
    } 
    /*用法三：  
     *用substr的指定子串（给定起始位置和长度）替换从指定位置上的字符串  
     *string& replace (size_t pos, size_t len, const string& str, size_t subpos, size_t sublen);  
     */    
    int main()    
    {    
        string line = "this@ is@ a test string!";    
        string substr = "12345";    
        line = line.replace(0, 5, substr, substr.find("1"), 3); //用substr的指定子串（从1位置数共3个字符）替换从0到5位置上的line    
        cout << line << endl;       
        return 0;    
    } 
    ```

2. 常用方法
```cpp
a) =,assign()     //赋以新值  
b) swap()     //交换两个字符串的内容  
c) +=,append(),push_back() //在尾部添加字符  
d) insert() //插入字符  
e) erase() //删除字符  
f) clear() //删除全部字符  
g) replace() //替换字符  
h) + //串联字符串  
i) ==,!=,<,<=,>,>=,compare()    //比较字符串  
j) size(),length()    //返回字符数量  
k) max_size() //返回字符的可能最大个数  
l) empty()    //判断字符串是否为空  
m) capacity() //返回重新分配之前的字符容量  
n) reserve() //保留一定量内存以容纳一定数量的字符  
o) [ ], at() //存取单一字符  
p) >>,getline() //从stream读取某值  
q) <<    //将谋值写入stream  
r) copy() //将某值赋值为一个C_string  
s) c_str() //将内容以C_string返回  
t) data() //将内容以字符数组形式返回  
u) substr() //返回某个子字符串  
v)查找函数  
w)begin() end() //提供类似STL的迭代器支持  
x) rbegin() rend() //逆向迭代器  
y) get_allocator() //返回配置器  
```



## Set容器

```cpp
begin() 返回指向第一个元素的迭代器  
clear() 清除所有元素  
count() 返回某个值元素的个数  
empty() 如果集合为空，返回true(真）  
end() 返回指向最后一个元素之后的迭代器，不是最后一个元素  
equal_range() 返回集合中与给定值相等的上下限的两个迭代器  
erase() 删除集合中的元素  
find() 返回一个指向被查找到元素的迭代器  
get_allocator() 返回集合的分配器  
insert() 在集合中插入元素  
lower_bound() 返回指向大于（或等于）某值的第一个元素的迭代器  
key_comp() 返回一个用于元素间值比较的函数  
max_size() 返回集合能容纳的元素的最大限值  
rbegin() 返回指向集合中最后一个元素的反向迭代器  
rend() 返回指向集合中第一个元素的反向迭代器  
size() 集合中元素的数目  
swap() 交换两个集合变量  
upper_bound() 返回大于某个值元素的迭代器  
value_comp() 返回一个用于比较元素间的值的函数  
```



## 优先队列

>   普通的队列是一种先进先出的数据结构，元素在队列尾追加，而从队列头删除。在优先队列中，元素被赋予优先级。当访问元素时，具有最高优先级的元素最先删除。优先队列具有最高级先出 （first in, largest out）的行为特征。

```cpp
priority_queue<int,vector<int>,less<int>>s;//定义优先级队列s，less表示按照递减(从大到小)的顺序插入元素  
priority_queue<int,vector<int>,greater<int>>s;//定义优先级队列s，greater表示按照递增（从小到大）的顺序插入元素
//基本操作
empty(); 队列为空返回1  
pop();   出队  
push();  入队  
top();   返回队列中优先级最高的元素  
size();  返回队列中元素的个数  
//运算符重载
struct point{      
    int x;      
    int y;      
    int times;      
    friend bool operator < (point a, point b)      
    {      
        return a.times > b.times;    //重载小于号使得小的先出队列      
    }      
};   
```



## Vector容器

```cpp
//常用的vector方法：
1.push_back   在数组的最后添加一个数据  
2.pop_back    去掉数组的最后一个数据   
3.at                得到编号位置的数据  
4.begin           得到数组头的指针  
5.end             得到数组的最后一个单元+1的指针  
6．front        得到数组头的引用  
7.back            得到数组的最后一个单元的引用  
8.max_size     得到vector最大可以是多大  
9.capacity       当前vector分配的大小  
10.size           当前使用数据的大小  
11.resize         改变当前使用数据的大小，如果它比当前使用的大，者填充默认值  
12.reserve      改变当前vecotr所分配空间的大小  
13.erase         删除指针指向的数据项  
14.clear          清空当前的vector  
15.rbegin        将vector反转后的开始指针返回(其实就是原来的end-1)  
16.rend          将vector反转构的结束指针返回(其实就是原来的begin-1)  
17.empty        判断vector是否为空  
18.swap         与另一个vector交换数据  
---
c.clear()         移除容器中所有数据。  
c.empty()         判断容器是否为空。  
c.erase(pos)        删除pos位置的数据  
c.erase(beg,end) 删除[beg,end)区间的数据  
c.front()         传回第一个数据。  
c.insert(pos,elem)  在pos位置插入一个elem拷贝  
c.pop_back()     删除最后一个数据。  
c.push_back(elem) 在尾部加入一个数据。  
c.resize(num)     重新设置该容器的大小  
c.size()         回容器中实际数据的个数。  
c.begin()           返回指向容器第一个元素的迭代器  
c.end()             返回指向容器最后一个元素的迭代器  

```



## Pair容器

类模板：`template <class T1, class T2> struct pair`

参数：T1是第一个值的数据类型，T2是第二个值的数据类型。

功能：pair将一对值组合成一个值，这一对值可以具有不同的数据类型（T1和T2），两个值可以分别用pair的两个公有函数first和second访问。

具体用法：

```cpp
//1.定义（构造）：
pair<int, double> p1;  //使用默认构造函数  
pair<int, double> p2(1, 2.4);  //用给定值初始化  
pair<int, double> p3(p2);  //拷贝构造函数  
//2.访问两个元素（通过first和second）：
pair<int, double> p1;  //使用默认构造函数  
p1.first = 1;  
p1.second = 2.5;  
cout << p1.first << ' ' << p1.second << endl;  
//3.赋值operator = ：
//（1）利用make_pair：
pair<int, double> p1;  
p1 = make_pair(1, 1.2);  
//（2）变量间赋值：
pair<int, double> p1(1, 1.2);  
pair<int, double> p2 = p1;  
```

