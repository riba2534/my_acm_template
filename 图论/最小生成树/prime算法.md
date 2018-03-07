# prime算法

与**克鲁斯卡尔算法**不同的是,**普里姆算法(prim)**用了另一种是思路解决这个问题，我们要尽量少的选取边使得花费的权值最小，那么最终肯定是要包含所有的点，那么我们的思路就可以变成：把顶点分成两类：**树顶点(已经选入生成树的点)**和**非树顶点(还没有被选入生成树的点)**,从任意一个点开始选择，找出这个点连接的所有的边，然后找出最短的，选中这条边加入到生成树中，枚举每一个树顶点到每一个费数顶点的所有的边，然后找最短的边加入到生成树，一直加边**n-1次**,直到所有的顶点都被加入到生成树中。

在实现的过程中，枚举树顶点和非树顶点的边的时候，利用一个**dis[]数组来记录各个点到生成树的最短距离**,然后找到dis的值最小的点加入到生成树,然后通过这个点更新一下其他点到生成树的dis的值。

[HDU1233 还是畅通工程(最小生成树模板题，Prime,kruskal算法)](http://blog.csdn.net/riba2534/article/details/60318424)

```cpp
#include <bits/stdc++.h>
using namespace std;
#define mem(a,b) memset(a,b,sizeof(a))
#define inf 0x3f3f3f3f
const int N=100+10;
const int M=10000+20;
int n,m;
int vis[N],e[N][N],dis[N];
void init()
{
    for(int i=1; i<=n; i++)
        for(int j=1; j<=n; j++)
            e[i][j]=(i==j)?0:inf;
}
void prim()
{
    for(int i=1; i<=n; i++)
    {
        dis[i]=e[1][i];
        vis[i]=0;
    }
    vis[1]=1;
    int sum=0;
    for(int i=1; i<=n-1; i++)
    {
        int minn=inf,k=1;
        for(int j=1; j<=n; j++)
        {
            if(!vis[j]&&dis[j]<minn)
            {
                minn=dis[j];
                k=j;
            }
        }
        vis[k]=1;
        sum+=dis[k];
        for(int j=1; j<=n; j++)
        {
            if(!vis[j]&&e[k][j]<dis[j])
                dis[j]=e[k][j];
        }
    }
    printf("%d\n",sum);
}
int main()
{
    int u,v,w;
    while(~scanf("%d",&n)&&n)
    {
        m=(n*n-n)/2;
        init();
        for(int i=1; i<=m; i++)
        {
            scanf("%d%d%d",&u,&v,&w);
            e[u][v]=e[v][u]=w;
        }
        prim();
    }
    return 0;
}

```

