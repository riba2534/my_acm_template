# 最长公共子序列LCS

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

