# 快速傅里叶变换FFT

大数乘法模板:

```cpp
#include<cstdio>
#include<cmath>
#include<algorithm>
#include<cstring>
#define MAXN 300004
using namespace std;
int logn,DP[MAXN],ttt;
const double PI=4*atan(1.0);
int n;
struct C
{
    double R,I;
    C(double _R=0,double _I=0):
        R(_R),I(_I) {}
    C operator + (C x)
    {
        return C(R+x.R,I+x.I);
    }
    C operator - (C x)
    {
        return C(R-x.R,I-x.I);
    }
    C operator * (C x)
    {
        return C(R*x.R-I*x.I,R*x.I+I*x.R);
    }
};
struct BIGNUM
{
    C num[MAXN];
    int len;
    BIGNUM()
    {
        int i;
        for(i=0; i<(MAXN-10); i++)
            num[i]=C(0,0);
        len=0;
    }
};
void DEBUG(const BIGNUM &x)
{
    int i;
    printf("len : %d\n",x.len);
    for(i=x.len-1; i>=0; i--)
        printf("%d",(int)(x.num[i].R));
}
void SWAP(C &x,C &y)
{
    C t=x;
    x=y;
    y=t;
}
void FFT(C *A,int type)
{
    int i,j,k;
    for(i=0; i<ttt; i++)
        if(i<DP[i])
            SWAP(A[i],A[DP[i]]);
    for(i=1; i<ttt; i<<=1)
    {
        C Wn(cos(PI/i),type*sin(PI/i));
        int P=i<<1;
        for(j=0; j<ttt; j+=P)
        {
            C Wk(1,0);
            for(k=0; k<i; k++,Wk=Wk*Wn)
            {
                C x=A[j+k],y=Wk*A[j+i+k];
                A[j+k]=x+y;
                A[j+i+k]=x-y;
            }
        }
    }
    if(type==-1)
        for(i=0; i<ttt; i++)
            A[i].R/=ttt;
}
BIGNUM a,b;
char tmp[MAXN];
BIGNUM Read()
{
    BIGNUM re;
    scanf("%s",tmp+1);
    int len=strlen(tmp+1);
    int i;
    re.len=n+1;
    int tot=0;
    for(i=n; i>=1; i--)
        re.num[tot++].R=tmp[i]-'0';
    for(; re.num[re.len-1].R==0; re.len--);
    return re;
}
void PRE()
{
    int n=a.len+b.len-2;
    int i;
    for(ttt=1; ttt<n; ttt<<=1)
        logn++;
    for(i=1; i<=ttt; i++)
        DP[i]=((DP[i>>1]>>1)|((i&1)<<(logn-1)));
}
BIGNUM mul(BIGNUM x,BIGNUM y)
{
    FFT(x.num,1);
    FFT(y.num,1);
    int i;
    BIGNUM Re;
    for(i=0; i<=ttt; i++)
    {
        Re.num[i]=x.num[i]*y.num[i];
    }
    FFT(Re.num,-1);
    for(i=0; i<=MAXN-20; i++)
    {
        Re.num[i+1].R+=(int)(Re.num[i].R+0.5)/10;
        Re.num[i].R=(int)(Re.num[i].R+0.5)%10;
    }
    int pos;
    for(i=MAXN-20; i>=0; i--)
    {
        if(Re.num[i].R!=0)
        {
            pos=i;
            break;
        }
    }
    Re.len=pos+1;
    if(i==0)
        Re.len=1;
    return Re;
}
void PRINT(const BIGNUM &x)
{
    int i;
    for(i=x.len-1; i>=0; i--)
        printf("%c",(int)(x.num[i].R)+'0');
    printf("\n");
}
int main()
{
    scanf("%d",&n);
    a=Read();
    b=Read();
    PRE();
    BIGNUM ans=mul(a,b);
    PRINT(ans);
    return 0;
}
```

