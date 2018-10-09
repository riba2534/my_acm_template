# 单调递增子序列LIS

给定一整型数列{a1,a2...,an}（0<n<=100000），找出单调递增最长子序列，并求出其长度。

如：1 9 10 5 11 2 13的最长单调递增子序列是1 9 10 11 13，长度为5。

如果要求非递减则是:`upper_bound`

[NYOJ214 单调递增子序列(二)(LIS)](http://blog.csdn.net/riba2534/article/details/70239348)

$$O(nlogn)$$版:

```cpp
int a[N];
int b[N];
int main()
{
    int n;
    while(cin>>n)
    {
        int len=0;
        mem(a,0);
        mem(b,0);
        for(int i=0; i<n; i++)
            cin>>a[i];
        for(int i=0; i<n; i++)
        {
            int p=lower_bound(b,b+len,a[i])-b;//找到插入的位置
            b[p]=a[i];//插入
            if(p==len)len++;//记录位置
        }
        cout<<len<<endl;
    }
    return 0;
}

```

$$O(n^2)$$版：

```cpp
#include<stdio.h>
#include<string.h>
int dp[10010];
char a[10010];
int main()
{
    int t;
    scanf("%d",&t);
    while(t--)
    {
        memset(dp,0,sizeof(dp));
        int i,la,j,maxn=-1;
        scanf("%s",a+1);
        la=strlen(a+1);
        for(i=1; i<=la; i++)
        {
            for(j=i-1; j>=0; j--)
            {
                if(a[j]<a[i]&&dp[i]<dp[j]+1)//判断是否递增，并且判断当前元素所处递增序列的长度
                    dp[i]=dp[j]+1;//更新递增序列的最大长度
            }
            if(dp[i]>maxn)
                maxn=dp[i];
        }
        printf("%d\n",maxn);
    }
    return 0;
}
```



$$nlog(n)$$记录路径:

```cpp
const int N=5000;
int a[N],dp[N],pos[N],pre[N],n;
vector<int>v;
//dp[i]表示长度为i的子序列的可取最小末尾
//pos[i]表示长度为i的子序列的最小末尾的下标
int get_lis()
{
    mem(dp,inf);
    pos[0]=-1;
    for(int i=0; i<n; i++)
    {
        int p=lower_bound(dp,dp+n,a[i])-dp;
        dp[p]=a[i];
        pos[p]=i;
        pre[i]=(p?pos[p-1]:-1);
    }
    int ans=lower_bound(dp,dp+n,inf)-dp;
    return ans;
}
void print1(int pos)
{
    if (pre[pos] != -1)
    {
        print1(pre[pos]);
    }
    printf("%d ", a[pos]);
}
void print2(int ans)
{
    int i;
    for(i=pos[ans-1]; ~pre[i]; i=pre[i])
        v.push_back(a[i]);
    v.push_back(a[i]);
    for(int i=v.size()-1; i>=0; i--)
    {
        cout<<v[i]<<" ";
    }
    cout<<endl;
}
int main()
{
    scanf("%d",&n);
    for(int i=0; i<n; i++)
        scanf("%d",&a[i]);
    int ans=get_lis();
    cout<<"ans="<<ans<<endl;
    print1(pos[ans-1]);
    puts("");
    print2(ans);
    return 0;
}
/*
8
1 3 5 2 4 6 5 3
*/
```

