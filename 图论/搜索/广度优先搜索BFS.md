# 广度优先搜索BFS

 [POJ2312 Battle City(优先队列+广搜BFS)](https://blog.csdn.net/riba2534/article/details/53504168)

```cpp
//注意 Y代表起点，T代表终点。B、E可以走，S、R不可以走，B的时间花费为2，E为1.  
#include <stdio.h>  
#include <queue>  
#include <string.h>  
#include <algorithm>  
#define mem(a,b) memset(a,b,sizeof(a))  
using namespace std;  
int go[4][2]= {{1,0},{-1,0},{0,1},{0,-1}};  
int m,n;  
char map[301][301];  
int vis[301][301];  
int x1,x2,y1,y2;  
struct node  
{  
    int x,y,s;  
    friend bool operator < (node a,node b)  
    {  
        return a.s>b.s;//重载运算符，步数从小到大排列  
    }  
};  
int bfs(int x,int y)  
{  
    node now,to;  
    now.x=x,now.y=y,now.s=0;  
    priority_queue<node>q;  
    q.push(now);  
    vis[x][y]=1;  
    while(!q.empty())  
    {  
        now=q.top();  
        if(map[now.x][now.y]=='T') return now.s;//满足条件，返回步数   
        q.pop();  
        for(int i=0; i<4; i++)  
        {  
            int xx=now.x+go[i][0];  
            int yy=now.y+go[i][1];  
            if(xx>=0&&xx<m&&yy>=0&&yy<n&&map[xx][yy]!='R'&&map[xx][yy]!='S'&&vis[xx][yy]==0)//判断是否越界  
            {  
                to.x=xx;  
                to.y=yy;  
                to.s=now.s+1;  
                if(map[to.x][to.y]=='B')  
                    to.s++;  
                vis[to.x][to.y]=1;  
                q.push(to);  
            }  
        }  
    }  
    return 0;  
}  
int main()  
{  
    while(~scanf("%d%d",&m,&n)&&m&&n)  
    {  
        for(int i=0; i<m; i++)  
        {  
            scanf("%s",map[i]);  
            for(int j=0; j<n; j++)  
            {  
                if(map[i][j]=='Y')  
                {  
                    x1=i;  
                    y1=j;  
                }  
            }  
        }  
        mem(vis,0);  
        int aa=bfs(x1,y1);  
        if(aa)  
            printf("%d\n",aa);  
        else  
            printf("-1\n");  
    }  
    return 0;  
}  
```

