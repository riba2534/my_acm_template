# 数位dp

[HDU2089 不要62(数位dp,3种写法)](https://blog.csdn.net/riba2534/article/details/80150736)

这道题是一个数位dp,给了一个区间`[l,r]`求出这个区间内不包含`4`和`62`的数的个数。

关于数位dp,我们一般是这样算的，首先我们知道一个数`a`小于另一个数`b`，那么`a`的某一位一定小于`b`的某一位，数位dp正是利用了这种思想来解决问题的：

比如求出从`[1,456]`中满足某个条件的数的个数，先把这个数拆成每个位置:

| 位置     | 4    | 5    | 6    |
| -------- | ---- | ---- | ---- |
| 取值范围 | 4    | 5    | 0~6  |
| 取值范围 | 4    | 0~4  | 0~9  |
| 取值范围 | 0~3  | 0~9  | 0~9  |

对于这道题，网上有三种做法.

方法1：

和上面那个讲解的`ppt`里面的方法一样
我们定义:

`dp[i][j]` :表示`i`位数，首位是`j`的数字有多少符合要求的。

对于一个数,例如`335`，对应`dp[3][3]`,但是满足要求的数有336,358……这些数超过了335……

所以通过`dp[3][0]`,`dp[3][1]`,`dp[3][2]`求得首位数字小于3的满足条件的三位数，`dp[3][0]`求得的数是001,052,093...也就是所有满足条件的一位或两位数……我们求得所有的2xx,1xx,0xx.

接下来要求的是如334,327这类首位是3满足条件的数字，既然首位只能是3，也就是第一位已经选完了，那么我们只要选择满足小于35的数字就可以了。和上面同理，我们只要求出`dp[2][0]`,`dp[2][1]`,`dp[2][2]`,`dp[2][3]`,`dp[2][4]`就可以求出首位小于3的两位数。这时求得的是32x,31x,30x。

然后我们求所有小于5的数字就ok。小于5也就是`dp[0]`，`dp[1]`，`dp[2]`，`dp[3]`，`dp[4]`。这时求得的是53x.

到此，所有小于335且满足的数全部求出。

代码:

```cpp
#define mem(a,b) memset(a,b,sizeof(a))
#define lson l,m,rt<<1
#define rson m+1,r,rt<<1|1
typedef long long ll;
const int N=40+10;
const int M=N*N;
int dp[10][10];
void init()
{
    mem(dp,0);
    dp[0][0]=1;
    for(int i=1; i<=7; i++) //枚举位数
        for(int j=0; j<=9; j++) //枚举第i位
            for(int k=0; k<=9; k++) //枚举第i-1位
                if(j!=4&&!(j==6&&k==2))
                    dp[i][j]+=dp[i-1][k];
}
int pos[10];
int solve(int n)
{
    int ans=0,len=0;
    while(n)
    {
        pos[++len]=n%10;
        n/=10;
    }
    pos[len+1]=0;
    for(int i=len; i>=1; i--)
    {
        for(int j=0; j<pos[i]; j++)
            if(j!=4&&!(pos[i+1]==6&&j==2))
                ans+=dp[i][j];
        if(pos[i]==4||(pos[i+1]==6&&pos[i]==2))
            break;
    }
    return ans;
}
int main()
{
    int n,m;
    init();
    while(scanf("%d%d",&n,&m)&&(n||m))
        printf("%d\n",solve(m+1)-solve(n));
    return 0;
}

```

方法2：

这是`kuangbin`的做法：

定义:

	dp[i][0]:长度为i,吉利数字的个数
	dp[i][1]:长度为i,最高位为2的吉利数字个数
	dp[i][2]:长度为i，不吉利数字的个数

先对于这道题的6位数，预处理出来这些`dp[i][0~3]`的值，然后再计算的时候先计算出这个区间内不吉利数字的个数再减去吉利数字的个数，就是答案，具体看注释吧：

代码：
```cpp
#include <bits/stdc++.h>
using namespace std;
#define mem(a,b) memset(a,b,sizeof(a))
int dp[10][3];
/*
dp[i][0]:长度为i,吉利数字的个数
dp[i][1]:长度为i,最高位为2的吉利数字个数
dp[i][2]:长度为i，不吉利数字的个数
*/
void init()
{
    dp[0][0]=1;
    dp[0][1]=0;
    dp[0][2]=0;
    for(int i=1;i<=6;i++)//最高6位数
    {
        dp[i][0]=dp[i-1][0]*9-dp[i-1][1];//在最高位加上除4之外的9个数字,和2之前的6
        dp[i][1]=dp[i-1][0];//在i-1的最高位加上2
        dp[i][2]=dp[i-1][2]*10+dp[i-1][0]+dp[i-1][1];
        //在已有不吉利数字前加任意数字，或者无不吉利数字的最高位加4，或者在2前面加6
    }
}
int bit[10];
int solve(int n)
{
    int len=0,tmp=n;
    while(n)
    {
        bit[++len]=n%10;
        n/=10;
    }
    bit[len+1]=0;
    int ans=0,flag=0;//ans记录不吉利数字个数
    //flag不吉利数字是否出现过
    for(int i=len;i>=1;i--)
    {
        ans+=dp[i-1][2]*bit[i];//每一个不吉利数字加上之后还是不吉利
        if(flag)//高位出现4或62
            ans+=dp[i-1][0]*bit[i];//前一位的吉利数字的个数加上0~bit[i]-1个数字
        else
        {
            if(bit[i]>4) ans+=dp[i-1][0];//当前选择范围是0~bit[i],必然包含4,所以加上4
            if(bit[i]>6) ans+=dp[i-1][1];//当前选择范围是0~bit[i],必然包含6,所以加上6
            if(bit[i+1]==6&&bit[i]>2) ans+=dp[i][1];//当前位置大于2且前一位是6,所以加上以2开头的
            if(bit[i]==4||(bit[i+1]==6&&bit[i]==2)) flag=1;
        }
    }
    if(flag) ans++;
    return tmp-ans;
}
int main()
{
    //freopen("in.txt","r",stdin);
    int n,m;
    init();
    while(scanf("%d%d",&n,&m)&&(n||m))
    {
        printf("%d\n",solve(m)-solve(n-1));
    }
    return 0;
}
```

方法3：

- `dp[pos][0]`表示当前枚举到第`pos`位前一位不为6的状态数
- `dp[pos][1]`表示当前枚举到第`pos`位前一位为6的状态数

因为在判断是否为4的时候只牵扯到一位很好判断，但是在判断62的状态时要考虑前一位是否为6的状态

```cpp
#define mem(a,b) memset(a,b,sizeof(a))
#define lson l,m,rt<<1
#define rson m+1,r,rt<<1|1
#define inf 0x3f3f3f3f
typedef long long ll;
int dp[10][2],bit[10];
//dfs的参数分别代表当前位数，上一个位置是否是6，当前的位置有没有枚举限制
int dfs(int pos,int six,int flag)
{
    if(pos==0) return 1;
    if(!flag&&dp[pos][six]!=-1)
        return dp[pos][six];
    int len=flag?bit[pos]:9;
    int res=0;
    for(int i=0; i<=len; i++)
    {
        if(i==4||six&&i==2) continue;
        res+=dfs(pos-1,i==6,flag&&i==len);
    }
    if(!flag) dp[pos][six]=res;
    return res;
}
int solve(int n)
{
    int ans=0,len=0;
    while(n)
    {
        bit[++len]=n%10;
        n/=10;
    }
    mem(dp,-1);
    return dfs(len,false,true);
}
int main()
{
    int n,m;
    while(~scanf("%d%d",&n,&m)&&(n||m))
    {
        printf("%d\n",solve(m)-solve(n-1));
    }
    return 0;
}

```

[ HDU3555 Bomb(数位dp)](https://blog.csdn.net/riba2534/article/details/80161815)

题目是让求`1~n`中包含数字`49`的数的个数,我们可以先求出包含`49`的数的个数，然后再用总的数量减去它。
定义:dp[i][j]为有`i`位以数字`j`开头的不包含数字`49`的数的个数。
先预处理出来20之内的所有dp[i][j]，最后再分解出数字的每一位，按照转移方程加上去就好了

```cpp
#define mem(a,b) memset(a,b,sizeof(a))
#define lson l,m,rt<<1
#define rson m+1,r,rt<<1|1
#define inf 0x3f3f3f3f
typedef long long ll;
ll dp[25][25];
void init()
{
    mem(dp,0);
    dp[0][0]=1;
    for(ll i=1; i<=20; i++)
        for(ll j=0; j<=9; j++)//枚举第i位
            for(ll k=0; k<=9; k++)//枚举第i-1位
                if(!(j==4&&k==9))
                    dp[i][j]+=dp[i-1][k];
}
ll bit[25];
ll solve(ll n)
{
    ll ans=0,len=0;
    while(n)
    {
        bit[++len]=n%10;
        n/=10;
    }
    bit[len+1]=0;
    for(ll i=len; i>=1; i--)
    {
        for(ll j=0; j<bit[i]; j++)
            if(!(j==9&&bit[i+1]==4))
                ans+=dp[i][j];
        if(bit[i+1]==4&&bit[i]==9)
            break;
    }
    return ans;
}
int main()
{
    ll t,n;
    init();
    scanf("%lld",&t);
    while(t--)
    {
        scanf("%lld",&n);
        printf("%lld\n",n+1-solve(n+1));
    }
    return 0;
}

```

方法2：

和[HDU2089 不要62(数位dp,3种写法)](https://blog.csdn.net/riba2534/article/details/80150736)这道题一样，也可以使用记忆化搜索，这里的dp[pos][num]表示枚举到第pos为的前一个位置是否为4的状态

```cpp
#define mem(a,b) memset(a,b,sizeof(a))
#define lson l,m,rt<<1
#define rson m+1,r,rt<<1|1
#define inf 0x3f3f3f3f
typedef long long ll;
const ll N=25;
ll dp[N][2],bit[N];
ll dfs(ll pos,bool num,bool flag)
{
    if(pos==0) return 1;
    if(!flag&&dp[pos][num]!=-1)
        return dp[pos][num];
    ll len=flag?bit[pos]:9;
    ll res=0;
    for(ll i=0; i<=len; i++)
    {
        if(num&&i==9)continue;
        res+=dfs(pos-1,i==4,flag&&i==len);
    }
    if(!flag) dp[pos][num]=res;
    return res;
}
ll solve(ll n)
{
    ll len=0;
    while(n)
    {
        bit[++len]=n%10;
        n/=10;
    }
    mem(dp,-1);
    return dfs(len,false,true);
}
int main()
{
    ll t,n;
    scanf("%lld",&t);
    while(t--)
    {
        scanf("%lld",&n);
        printf("%lld\n",n+1-solve(n));
    }
    return 0;
}
```