# Trie树

又称**单词查找树**，**Trie树**，是一种树形结构，是一种哈希树的变种。典型应用是用于统计，排序和保存大量的字符串（但不仅限于字符串），所以经常被搜索引擎系统用于文本词频统计。它的优点是：利用字符串的公共前缀来节约存储空间，最大限度地减少无谓的字符串比较，查询效率比哈希表高。

字典树与字典很相似,当你要查一个单词是不是在字典树中,首先看单词的第一个字母是不是在字典的第一层,如果不在,说明字典树里没有该单词,如果在就在该字母的孩子节点里找是不是有单词的第二个字母,没有说明没有该单词,有的话用同样的方法继续查找.字典树不仅可以用来储存字母,也可以储存数字等其它数据。

模板：

 [NYOJ286&&290 动物统计(Trie树)](http://blog.csdn.net/riba2534/article/details/78266426)

统计字符串出现次数

```cpp
#include <bits/stdc++.h>
using namespace std;
#define mem(a,b) memset(a,b,sizeof(a))
typedef long long ll;
const int N=1000+10;
struct dicTree
{
    struct Node
    {
        int sum;
        int next[26];
    } Tree[200000];
    int sz,root;
    int newnode()
    {
        for(int i=0; i<26; i++)
            Tree[sz].next[i]=-1;
        Tree[sz++].sum=0;
        return sz-1;
    }
    void init()
    {
        sz=0;
        root=newnode();
    }
    void insert(string s,int len)
    {
        int now=root;
        for(int i=0; i<len; i++)
        {
            int to=(int)(s[i]-'a');
            if(Tree[now].next[to]==-1)
                Tree[now].next[to]=newnode();
            now=Tree[now].next[to];
        }
        Tree[now].sum++;
    }
    int find(string s,int len)
    {
        int now=root;
        for(int i=0; i<len; i++)
        {
            int to=(int)(s[i]-'a');
            if(Tree[now].next[to]==-1)
                return 0;
            now=Tree[now].next[to];
        }
        return Tree[now].sum;
    }

};
dicTree dic;
int main()
{
    int t;
    string s,str;
    dic.init();
    cin>>t;
    int maxx=0;
    while(t--)
    {
        cin>>s;
        dic.insert(s,s.length());
        int num=dic.find(s,s.length());
        if(num>maxx)
        {
            maxx=num;
            str=s;
        }
    }
    cout<<str<<" "<<maxx<<endl;
    return 0;
}

```

二进制版：

[HDU5536 Chip Factory(Trie树，二进制)](http://blog.csdn.net/riba2534/article/details/78332968)

先说题意，给出一堆数，然后从这些数中找出两个数，求和，然后求出这个和异或另一个数的最大值，假设把这些数存在了数组a中，那么需要求出： 

$$max\{(a[i]+a[j])\oplus a[k]\}(i\neq j\neq k)$$

的值，把每个数转换成二进制方式插入字典树，根据异或的特性，努力向相反的方向找，最后找到$$O(n^2)$$就可以了

```cpp
#include <bits/stdc++.h>
using namespace std;
#define inf 0x3f3f3f3f
const int N=1000+10;
int a[N];
struct dicTree
{
    struct node
    {
        int op;
        int next[2];
    } Tree[N*32];
    int root,sz;
    int newnode()
    {
        Tree[sz].next[0]=Tree[sz].next[1]=-1;
        Tree[sz++].op=0;
        return sz-1;
    }
    void init()
    {
        sz=0;
        root=newnode();
    }
    void insert(int x)
    {
        int now=root;
        for(int i=31; i>=0; i--)
        {
            int to=(x>>i)&1;
            if(Tree[now].next[to]==-1)
                Tree[now].next[to]=newnode();
            now=Tree[now].next[to];
            Tree[now].op++;
        }
    }
    void del(int x)
    {
        int now=root;
        for(int i=31; i>=0; i--)
        {
            int to=(x>>i)&1;
            now=Tree[now].next[to];
            Tree[now].op--;
        }
    }
    int find(int a,int b)
    {
        del(a);
        del(b);
        int x=a+b;
        int now=root;
        int ans=0;
        for(int i=31; i>=0; i--)
        {
            int to=(x>>i)&1;
            if(Tree[now].next[to^1]!=-1&&Tree[Tree[now].next[to^1]].op)
                to^=1;
            if(to)
                ans|=(1<<i);
            now=Tree[now].next[to];
        }
        insert(a);
        insert(b);
        return ans^x;
    }

} ac;
int main()
{
    int t,n;
    scanf("%d",&t);
    while(t--)
    {
        ac.init();
        scanf("%d",&n);
        for(int i=0; i<n; i++)
        {
            scanf("%d",&a[i]);
            ac.insert(a[i]);
        }
        int maxx=-inf;
        for(int i=0; i<n; i++)
            for(int j=i+1; j<n; j++)
                maxx=max(maxx,ac.find(a[i],a[j]));
        printf("%d\n",maxx);
    }
    return 0;
}
```

