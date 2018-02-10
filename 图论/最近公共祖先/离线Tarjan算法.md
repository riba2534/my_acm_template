# 离线Tarjan算法

## 离线Tarjan算法

讲解可以看这个文章:[最近公共祖先（LCA）算法实现过程 【Tarjan离线+倍增在线+RMQ】](http://blog.csdn.net/my_sunshine26/article/details/72717112)，下面是我的模板:

```cpp
#include <cstdio>
#include <cstring>
#include <cctype>
#include <stdlib.h>
#include <string>
#include <map>
#include <iostream>
#include <stack>
#include <cmath>
#include <queue>
#include <vector>
#include <algorithm>
using namespace std;
typedef long long ll;
#define inf 1000000
#define mem(a,b) memset(a,b,sizeof(a))
const int N=500000+7;
int pre[N],first[N],first2[N],tot,tot2;
bool vis[N];//标记有没有询问
int n;
struct edge
{
    int v,next;
} e[2*N];
struct Query
{
    int v,w,next;
} query[2*N];

void add_edge(int u,int v)
{
    e[tot].v=v;
    e[tot].next=first[u];
    first[u]=tot++;
}

void add_query(int u,int v)
{
    query[tot2].v=v;
    query[tot2].w=-1;
    query[tot2].next=first2[u];
    first2[u]=tot2++;
}

int find(int x)
{
    return x==pre[x]?x:pre[x]=find(pre[x]);
}

int lca(int u,int fa)
{
    for(int i=first[u]; ~i; i=e[i].next)
    {
        int v=e[i].v;
        if(v==fa) continue;
        lca(v,u);
        pre[v]=u;
    }
    vis[u]=1;
    for(int i=first2[u]; ~i; i=query[i].next)
    {
        int v=query[i].v;
        if(vis[v])
            query[i].w=find(v);
    }
}

void init()
{
    mem(first,-1);
    mem(first2,-1);
    mem(vis,0);
    tot=0;
    tot2=0;
    for(int i=1; i<=n; i++)
        pre[i]=i;
}

int main()
{
    int m,s,u,v;
    scanf("%d%d%d",&n,&m,&s);
    init();
    for(int i=1; i<n; i++)
    {
        scanf("%d%d",&u,&v);
        add_edge(u,v);
        add_edge(v,u);
    }
    for(int i=1; i<=m; i++)
    {
        scanf("%d%d",&u,&v);
        add_query(u,v);
        add_query(v,u);
    }
    lca(s,pre[s]);
    for(int i=0; i<tot2; i++)
        if(query[i].w!=-1)
            printf("%d\n",query[i].w);
    return 0;
}
```