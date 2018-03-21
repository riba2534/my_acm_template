# 单调递增子序列LIS

给定一整型数列{a1,a2...,an}（0<n<=100000），找出单调递增最长子序列，并求出其长度。

如：1 9 10 5 11 2 13的最长单调递增子序列是1 9 10 11 13，长度为5。

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

