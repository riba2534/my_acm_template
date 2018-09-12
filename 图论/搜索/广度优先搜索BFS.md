# 广度优先搜索BFS

 [POJ2312 Battle City(优先队列+广搜BFS)](https://blog.csdn.net/riba2534/article/details/53504168)

```cpp
//注意 Y代表起点，T代表终点。B、E可以走，S、R不可以走，B的时间花费为2，E为1.  
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

[HDU1043 Eight(八数码，BFS，康托展开，hash)](https://blog.csdn.net/riba2534/article/details/79971416)

这是一个八数码问题，关于这道题的题意，可以参考`Virtual Judge`上面的翻译，我们的思路是从初始状态开始搜索，然后搜索完所有的状态，每次搜索的时候记录路径，并且采用**康托展开**进行判重，因为我们已经预处理好了所有的状态。所以最后应对O(1)的查询就好了

```cpp
using namespace std;
#define mem(a,b) memset(a,b,sizeof(a))
const int N=4e5+10;
int fac[10]= {0,1,2,6,24,120,720,5040,40320,362880};
string path[N];
int vis[N];
int go[4][2]= {-1,0,1,0,0,-1,0,1}; //上下左右
char dir[]="durl";//和方向变量相反
struct node
{
    int s[9];//序列
    int zero_pos;//0的位置
    int hash;//哈希值
    string path;//路径
};
int cantor_hash(int s[])//康托展开判重
{
    int res=0;
    for(int i=0; i<9; i++)
    {
        int num=0;
        for(int j=i+1; j<9; j++)
            if(s[i]>s[j])
                num++;
        res+=(num*fac[9-i-1]);
    }
    return res;
}
void init()
{
    node now,to;
    mem(vis,0);
    for(int i=0; i<8; i++)
        now.s[i]=i+1;
    now.s[8]=0;
    now.zero_pos=8;
    now.hash=cantor_hash(now.s);
    path[now.hash]="";
    vis[now.hash]=1;
    queue<node>q;
    q.push(now);
    while(!q.empty())
    {
        now=q.front();
        q.pop();
        int x=now.zero_pos/3;
        int y=now.zero_pos%3;
        for(int i=0; i<4; i++)
        {
            int xx=x+go[i][0];
            int yy=y+go[i][1];
            if(xx>=0&&xx<3&&yy>=0&&yy<3)
            {
                to=now;
                to.zero_pos=xx*3+yy;
                to.s[now.zero_pos]=to.s[to.zero_pos];
                to.s[to.zero_pos]=0;
                to.hash=cantor_hash(to.s);
                if(!vis[to.hash])
                {
                    to.path=dir[i]+now.path;
                    path[to.hash]=to.path;
                    q.push(to);
                    vis[to.hash]=1;
                }
            }
        }
    }
}

int main()
{
    init();
    node ans;
    char s[5];
    while(~scanf("%s",s))
    {
        if(s[0]=='x')
        {
            ans.zero_pos=0;
            ans.s[0]=0;
        }
        else
            ans.s[0]=s[0]-'0';
        for(int i=1; i<9; i++)
        {
            scanf("%s",s);
            if(s[0]=='x')
            {
                ans.zero_pos=i;
                ans.s[i]=0;
            }
            else
                ans.s[i]=s[0]-'0';
        }
        ans.hash=cantor_hash(ans.s);
        if(vis[ans.hash])
            cout<<path[ans.hash]<<endl;
        else
            puts("unsolvable");
    }
    return 0;
}
```

