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

