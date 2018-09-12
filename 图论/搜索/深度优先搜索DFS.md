# 深度优先搜索DFS

[NYOJ1058+NYOJ1282 部分和问题(深度优先搜索DFS入门题)](https://blog.csdn.net/riba2534/article/details/53338951)

```cpp
int n,i,m,j,k;  
int a[50];  
bool dfs(int i,int sum)  
{  
    if(i==n)return sum==k;//返回条件      
    if(dfs(i+1,sum))return true;//不加a[i]的情况  
    if(dfs(i+1,sum+a[i]))return true;//加上a[i]的情况  
    return false;//不论有没有返回a[i],没有凑成k就返回false  
}  
int main()  
{  
    while(~scanf("%d %d",&n,&k))  
    {  
        for(int i=0; i<n; i++)  
            scanf("%d",&a[i]);  
        printf("%s\n",dfs(0,0)?"YES":"NO");  
    }  
    return 0;  
}  
```

```cpp
int n,i,m,j,k;  
int a[50];  
stack<int>p;  
bool dfs(int i,int sum)  
{  
    if(i==n)return sum==k?1:0;//停止条件,如果前n项都计算过了，则返回sum与k的值是否相等  
    if(dfs(i+1,sum))return true;//返回不加a[i]的情况  
    if(dfs(i+1,sum+a[i]))//加a[i]的情况  
    {  
        p.push(a[i]);  
        return true;  
    }  
    return false;//不论加不加a[i]都凑不成k就返回false  
}  
int main()  
{  
    while(~scanf("%d %d",&n,&k))  
    {  
        for(i=0; i<n; i++)  
            scanf("%d",&a[i]);  
        if(dfs(0,0))  
        {  
            printf("YES\n");  
            while(!p.empty())//栈为非空  
            {  
                int x=p.top();  
                printf("%d ",x);  
                p.pop();  
            }  
            printf("\n");  
        }  
        else  
            printf("NO\n");  
    }  
    return 0;  
}  
```

[HDU1426 Sudoku Killer(深搜DFS)(很坑的一道题，解数独)](https://blog.csdn.net/riba2534/article/details/53526709)

```cpp
int map[10][10];  
int num;//记录有多少个数需要填  
struct zb//用来存储坐标  
{  
    int x,y;  
} a[100];  
int jc(int k,int step)//判断能否深搜的条件  
{  
    int x,y;  
    for(int i=0; i<9; i++)  
        if(map[a[step].x][i]==k||map[i][a[step].y]==k)//判断这个数所处的行和列有没有出现重复的数  
            return 0;  
    //这个很重要，想一想为什么这么做  
    x=(a[step].x/3)*3;  
    y=(a[step].y/3)*3;  
    //printf("a[step(%d)].x=%d,/3=%d  ",step,a[step].x,(a[step].x/3)*3);  
    //printf("a[step(%d)].y=%d,/3=%d\n",step,a[step].y,(a[step].y/3)*3);  
    for(int i=x; i<x+3; i++)//判断这个数所处的的那个小九宫格里面有没有重复的数  
        for(int j=y; j<y+3; j++)  
            if(map[i][j]==k)  
                return 0;  
    return 1;  
}  
void dfs(int step)  
{  
    if(step==num)//如果搜到了  
    {  
        for(int i=0; i<9; i++)  
        {  
            for(int j=0; j<8; j++)  
                cout<<map[i][j]<<" ";  
            cout<<map[i][8]<<endl;//直接在这里输出结果，要不然会发生可怕的事~  
        }  
        return;  
    }  
    for(int i=1; i<=9; i++)//试这9个数  
    {  
        if(jc(i,step))//判断能否填数  
        {  
            map[a[step].x][a[step].y]=i;//如果满足条件就填数  
            dfs(step+1);//搜索下一个数的填法  
            map[a[step].x][a[step].y]=0;//还原地图  
        }  
    }  
    return;  
}  
int main()  
{  
    int q=0;  
    char s;  
    while(cin>>s)//输入字符  
    {  
        num=0;  
        if(s=='?')//对第一个字符进行特判  
        {  
            a[num].x=0;  
            a[num].y=0;  
            num++;  
            map[0][0]=0;  
        }  
        else  
            map[0][0]=s-'0';  
        for(int i=0; i<9; i++)//输入后面的数，并把他们转换成整型,没走过的用0代替  
        {  
            for(int j=0; j<9; j++)  
            {  
                if(i==0&&j==0)continue;  
                cin>>s;  
                if(s=='?')  
                {  
                    a[num].x=i;  
                    a[num].y=j;  
                    num++;  
                    map[i][j]=0;  
                }  
                else  
                    map[i][j]=s-'0';  
            }  
        }  
        if(q++)//用来换行  
            cout<<endl;  
        dfs(0);//从0开始  
    }  
    return 0;  
}  
```