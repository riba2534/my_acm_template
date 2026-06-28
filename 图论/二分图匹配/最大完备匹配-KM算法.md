# 最大完备匹配-KM算法

[HDU2255 奔小康赚大钱(二分图的最大完备匹配，KM算法)](http://blog.csdn.net/riba2534/article/details/78570571)

原理请从上面的链接看

注意：

### KM 算法（求最大权完备匹配）时，一定要记得把【左侧顶点的顶标 cx】初始化为 `-inf`，再用与该点关联的最大边权去更新它（见代码 `cx[i]=-inf` 后紧跟的取 max）；如果要求最小权匹配，只需把所有边权取相反数跑一遍，再把结果取相反数即可。

> 注：本题读入的是完整的 `n×n` 权值矩阵；对于非完全二分图，可把不存在的边权设为 `-inf` 以禁止其被匹配。

> 时间复杂度：本实现为基于 `slack` 优化的 $O(n^3)$ 版本（$n$ 为左右两侧点数）。

```cpp
const int N=300+20;
int nx,ny;//两边的点数
int e[N][N];
int match[N],cx[N],cy[N];
int slack[N];
bool visx[N],visy[N];
bool dfs(int x)
{
    visx[x]=true;
    for(int y=0; y<ny; y++)
    {
        if(visy[y])continue;
        int tmp=cx[x]+cy[y]-e[x][y];
        if(tmp==0)
        {
            visy[y]=true;
            if(match[y]==-1||dfs(match[y]))
            {
                match[y]=x;
                return true;
            }
        }
        else if(slack[y]>tmp)
            slack[y]=tmp;
    }
    return false;
}
int KM()
{
    mem(match,-1);
    mem(cy,0);
    for(int i=0; i<nx; i++)
    {
        cx[i]=-inf;
        for(int j=0; j<ny; j++)
            if(e[i][j]>cx[i])
                cx[i]=e[i][j];
    }
    for(int x=0; x<nx; x++)
    {
        mem(slack,inf);
        while(true)
        {
            mem(visx,false);
            mem(visy,false);
            if(dfs(x))break;
            //不存在的时候就要开始加上边
            int d=inf;
            for(int i=0; i<ny; i++)
                if(!visy[i]&&d>slack[i])
                    d=slack[i];//找到最小的d
            for(int i=0; i<nx; i++)
                if(visx[i])
                    cx[i]-=d;
            for(int i=0; i<ny; i++)
            {
                if(visy[i]) cy[i]+=d;
                else slack[i]-=d;
            }
        }
    }
    int res=0;
    for(int i=0; i<ny; i++)
        if(match[i]!=-1)
            res+=e[match[i]][i];
    return res;
}
int main()
{
    int n;
    while(~scanf("%d",&n))
    {
        for(int i=0; i<n; i++)
            for(int j=0; j<n; j++)
                scanf("%d",&e[i][j]);
        nx=ny=n;
        printf("%d\n",KM());
    }
    return 0;
}
```

