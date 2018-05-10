# Dijkstra算法

一种单源最短路径算法，已知顶点和边，然后可以求出图中一点和另一点之间的最短距离。思想是:利用一个dis[i]数组来记录，从顶点1到其他各个点的最短距离，刚开始的时候全部初始化为INF，从顶点1开始找他的出边里面最小的，然后把这个顶点标记，然后松弛dis数组，之后找出这个点的所有出边里面最小的，然后标记，更新，一直到最后,时间复杂度是$$O(n^2)$$

和prim算法的思想差不多，都是松弛，找到第一个点，然后进行对于dis的松弛，一般有**邻接矩阵**和**邻接表**两种写法

邻接表写法：

```cpp
#define mem(a,b) memset(a,b,sizeof(a))
#define inf 0x3f3f3f3f
typedef long long ll;
typedef pair<int,int> pir;
const int N=1e5+10;
const int M=1e6+10;
int n,m;
int first[N],tot;
int dis[N],vis[N];
struct edge
{
    int v,w,next;
} e[M];
void add_edge(int u,int v,int w)
{
    e[tot].v=v;
    e[tot].w=w;
    e[tot].next=first[u];
    first[u]=tot++;
}
void init()
{
    mem(first,-1);
    tot=0;
}
void dijkstra(int st)
{
    for(int i=1; i<=n; i++)
    {
        dis[i]=inf;
        vis[i]=0;
    }
    dis[st]=0;
    for(int i=1; i<=n; i++)
    {
        int minn=inf,k=0;
        for(int j=1; j<=n; j++)
            if(!vis[j]&&dis[j]<minn)
            {
                minn=dis[j];
                k=j;
            }
        vis[k]=1;
        for(int j=first[k]; ~j; j=e[j].next)
            if(!vis[e[j].v]&&dis[k]+e[j].w<dis[e[j].v])
                dis[e[j].v]=dis[k]+e[j].w;
    }
}
int main()
{
    int st,ed,u,v,w;
    scanf("%d%d%d%d",&n,&m,&st,&ed);
    init();
    for(int i=1; i<=m; i++)
    {
        scanf("%d%d%d",&u,&v,&w);
        add_edge(u,v,w);
        add_edge(v,u,w);
    }
    dijkstra(st);
    printf("%d\n",dis[ed]);
    return 0;
}
```

堆优化的迪杰斯特拉:

```cpp
#include <bits/stdc++.h>
using namespace std;
#define mem(a,b) memset(a,b,sizeof(a))
#define inf 2147483647
const int N=10000+20;
const int M=500000+20;
int n,m;
int first[N],tot,dis[N],vis[N];
struct edge
{
    int u,v,w,next;
} e[M];
void add_edge(int u,int v,int w)
{
    e[tot].v=v,e[tot].w=w;
    e[tot].next=first[u];
    first[u]=tot++;
}
struct node
{
    int id,now;
    node() {}
    node(int _id,int _now)
    {
        id=_id;
        now=_now;
    }
    bool friend operator < (node a,node b)
    {
        return a.now>b.now;
    }
};
void dijkstra(int st)
{
    for(int i=1; i<=n; i++)
    {
        dis[i]=inf;
        vis[i]=0;
    }
    dis[st]=0;
    priority_queue<node>q;
    q.push(node(st,0));
    while(!q.empty())
    {
        node u=q.top();
        q.pop();
        if(!vis[u.id])
        {
            vis[u.id]=1;
            for(int i=first[u.id]; ~i; i=e[i].next)
            {
                int v=e[i].v,w=e[i].w;
                if(dis[u.id]+w<dis[v])
                {
                    dis[v]=dis[u.id]+w;
                    q.push(node(v,dis[v]));
                }
            }
        }
    }
}
void init()
{
    mem(first,-1);
    tot=0;
}
int main()
{
    int u,v,w,st;
    init();
    scanf("%d%d%d",&n,&m,&st);
    for(int i=1; i<=m; i++)
    {
        scanf("%d%d%d",&u,&v,&w);
        add_edge(u,v,w);
    }
    dijkstra(st);
    for(int i=1; i<=n; i++)
        printf("%d ",dis[i]);
    puts("");
    return 0;
}
```



邻接矩阵写法:

```cpp
const int inf=0x3f3f3f3f;  
int map[1010][1010];//map[i][j]表示从i-->j的距离    
int dis[1010];//dis[i]从v1到i的距离    
int vis[1010];//标记有没有被访问过    
void dijkstra(int n)  
{  
    int k,min;  
    for(int i=1; i<=n; i++)  
    {  
        dis[i]=map[1][i];  
        vis[i]=0;  
    }  
    for(int i=1; i<=n; i++)//遍历顶点    
    {  
        k=0;  
        min=inf;  
        for(int j=1; j<=n; j++)  
            if(vis[j]==0&&dis[j]<min)  
            {  
                min=dis[j];  
                k=j;  
            }  
        vis[k]=1;  
        for(int j=1; j<=n; j++)  
            if(vis[j]==0&&dis[k]+map[k][j]<dis[j])  
                dis[j]=dis[k]+map[k][j];//如果找到了通路就加上   
    }  
    return;  
}  
int main()  
{  
    int t,n,a,b,w;  
    while(~scanf("%d%d",&t,&n))  
    {  
        mem(map,0);  
        mem(vis,0);  
        mem(dis,0);  
        for(int i=1; i<=n; i++)  
            for(int j=1; j<=n; j++)  
                map[i][j]=inf;//初始化为无穷大    
        for(int i=1; i<=t; i++)  
        {  
            scanf("%d%d%d",&a,&b,&w);  
            if(w<map[a][b])  
            {  
                map[a][b]=w;  
                map[b][a]=map[a][b];//建立无向图  
            }//这里是判断是否有重边，应为两点之间的路，未必只有一条。  
        }  
        dijkstra(n);  
        printf("%d\n",dis[n]);  
    }  
    return 0;  
}  
```