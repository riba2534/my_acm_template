# 最长公共子序列LCS

$O(n\log n)$ 做法:

> ⚠️ 前提:本做法要求两个序列均由互不相同的元素构成(等价于同一集合的两个排列)。在此前提下,`b` 中每个元素在 `a` 中有且仅有一个下标,把 `b` 各元素替换为其在 `a` 中的下标后,所得序列的 LIS(最长上升子序列)长度即为 LCS 长度。若序列中存在重复元素,该转化不成立——下方代码用 `vis[a[i]]=i` 只保留每个值最后出现的下标,会丢失重复值的其他位置,导致结果错误(例如 `a=[1,1,0,2,1,2]`、`b=[1,2,1,1,2,0,0]` 本做法得 2,正确答案为 4)。带重复元素(任意字符串)的一般情形请改用下方的 $O(n^2)$ 做法。

思路是这样的，首先假设有两个串，为`a`和`b`，比如:

| a    | 1    | 2    | 3    | 5    | 4    |
| ---- | ---- | ---- | ---- | ---- | ---- |
| b    | 5    | 4    | 3    | 2    | 1    |
| 下标 | 1    | 2    | 3    | 4    | 5    |

我们找出`b`串中的每个数在`a`串中的下标。

5出现在4位置，4出现在5位置，3出现在3位置，2出现在2位置，1出现在1位置，那么就形成了一个新的串

	4 5 3 2 1

然后对新生成的串求出`LIS`长度就是答案

代码:

```cpp
map<int, int> vis;
int a[N], b[N], c[N];
int main()
{
    //freopen("in.txt", "r", stdin);
    int n, m;
    while (~scanf("%d%d", &n, &m))
    {
        vis.clear();
        for (int i = 0; i < n; i++)
        {
            scanf("%d", &a[i]);
            vis[a[i]] = i;
        }
        int nn = 0, x;
        for (int i = 0; i < m; i++)
        {
            scanf("%d", &x);
            if (vis.find(x) != vis.end())
                b[nn++] = vis[x];
        }
        int len = 0;
        for (int i = 0; i < nn; i++)
        {
            int p = lower_bound(c, c + len, b[i]) - c;
            c[p] = b[i];
            if (p == len)
                len++;
        }
        printf("%d\n", len);
    }
    return 0;
}
```

$O(n^2)$ 做法

```cpp
char a[2000],b[2000];  
int dp[2000][2000];//dp[i][j]表示匹配到a字符串的第i个字符和b字符串的第j个字符时的最大匹配数  
int main()  
{  
    while(~scanf("%s%s",a,b))  
    {  
        int lena=strlen(a);  
        int lenb=strlen(b);//计算长度  
        for(int i=0; i<=lena; i++)  
            dp[i][0]=0;//初始化边界  
        for(int i=0; i<=lenb; i++)  
            dp[0][i]=0;  
        for(int i=1; i<=lena; i++)  
        {  
             for(int j=1; j<=lenb; j++)  
             {  
                 if(a[i-1]==b[j-1])  
                    dp[i][j]=dp[i-1][j-1]+1;  
                else  
                    dp[i][j]=max(dp[i-1][j],dp[i][j-1]);  
             }  
        }  
        printf("%d\n",dp[lena][lenb]);  
    }  
    return 0;  
}  
```

求出具体的子序列:

```cpp
#include <bits/stdc++.h>
using namespace std;
#define mem(a,b) memset(a,b,sizeof(a))
#define inf 0x3f3f3f3f
const int N=1000+20;
int dp[N][N];
int get_num(string a,string b)
{
    a="0"+a;
    b="0"+b;
    int len1=a.size()-1;
    int len2=b.size()-1;
    for(int i=0; i<=len1; i++)
    {
        for(int j=0; j<=len2; j++)
        {
            if(i==0||j==0)
                dp[i][j]=0;
            else if(a[i]==b[j])
                dp[i][j]=dp[i-1][j-1]+1;
            else
                dp[i][j]=max(dp[i][j-1],dp[i-1][j]);
        }
    }
    return dp[len1][len2];
}
string get_lcs(string a,string b)
{
    a="0"+a;
    b="0"+b;
    int len1=a.size()-1;
    int len2=b.size()-1;
    for(int i=0; i<=len1; i++)
    {
        for(int j=0; j<=len2; j++)
        {
            if(i==0||j==0)
                dp[i][j]=0;
            else if(a[i]==b[j])
                dp[i][j]=dp[i-1][j-1]+1;
            else
                dp[i][j]=max(dp[i][j-1],dp[i-1][j]);
        }
    }
    string ans="";
    for(int i=len1,j=len2; i>=1&&j>=1;)
    {
        if(a[i]==b[j])
        {
            ans+=a[i];
            i--,j--;
        }
        else if(dp[i][j-1]>=dp[i-1][j])
            j--;
        else
            i--;
    }
    reverse(ans.begin(),ans.end());
    return ans;
}
int main()
{
    string a,b;
    cin>>a>>b;
    cout<<get_lcs(a,b)<<endl;
    return 0;
}

```

