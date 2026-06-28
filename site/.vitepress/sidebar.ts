// 本文件由原 SUMMARY 结构 + 各文档 H1 标题生成，保持原模板的分类与教学顺序。
// 链接路径对应 site/ 下由 scripts/build.mjs 复制进来的内容目录。
export const sidebar = [
  { text: '常用技巧', collapsed: false, items: [
      { text: '输入输出加速', link: '/常用技巧/输入输出加速' },
      { text: '常用STL及用法', link: '/常用技巧/常用STL及用法' },
      { text: 'pb_ds库用法', link: '/常用技巧/pb_ds库用法' },
      { text: '库函数', link: '/常用技巧/库函数' },
      { text: '小技巧', link: '/常用技巧/小技巧' },
      { text: '位运算', link: '/常用技巧/位运算' }
    ] },
  { text: '数论', collapsed: true, items: [
      { text: '欧拉函数总结', link: '/数论/欧拉函数' },
      { text: '快速幂/矩阵快速幂', link: '/数论/快速幂' },
      { text: '康托展开', link: '/数论/康托展开' },
      { text: '欧几里得/扩展欧几里得算法', link: '/数论/欧几里得算法' },
      { text: '求逆元', link: '/数论/求逆元' },
      { text: '自适应辛普森积分', link: '/数论/自适应辛普森积分' },
      { text: '素数相关/线性筛法', link: '/数论/素数' },
      { text: '博弈论', link: '/数论/博弈论', items: [
          { text: '巴什博弈', link: '/数论/博弈论/巴什博弈' },
          { text: '威佐夫博弈', link: '/数论/博弈论/威佐夫博弈' },
          { text: '尼姆博弈', link: '/数论/博弈论/尼姆博弈' },
          { text: 'SG函数', link: '/数论/博弈论/SG函数' }
        ] }
    ] },
  { text: '高精度运算', collapsed: true, items: [
      { text: '大数的加减乘除', link: '/高精度运算/大数的加减乘除' }
    ] },
  { text: '组合数学', collapsed: true, items: [
      { text: '母函数总结', link: '/组合数学/母函数' },
      { text: 'BM线性递推', link: '/组合数学/BM线性递推' },
      { text: '容斥原理总结', link: '/组合数学/容斥原理' },
      { text: '组合数', link: '/组合数学/组合数' },
      { text: '卢卡斯定理', link: '/组合数学/卢卡斯定理' }
    ] },
  { text: '图论', collapsed: true, items: [
      { text: '欧拉路 / 一笔画', link: '/图论/欧拉回路' },
      { text: 'Havel-Hakimi定理', link: '/图论/Havel-Hakimi定理' },
      { text: '最小生成树', link: '/图论/最小生成树', items: [
          { text: 'Kruskal算法', link: '/图论/最小生成树/Kruskal算法' },
          { text: 'Prim 算法', link: '/图论/最小生成树/Prim算法' }
        ] },
      { text: '最短路', link: '/图论/最短路', items: [
          { text: 'Dijkstra算法', link: '/图论/最短路/Dijkstra算法' },
          { text: 'Floyd算法', link: '/图论/最短路/floyd算法' },
          { text: 'Bellman-Ford算法以及队列优化SPFA', link: '/图论/最短路/Bellman-Ford算法' },
          { text: '第k短路', link: '/图论/最短路/第k短路' }
        ] },
      { text: '二分图匹配', link: '/图论/二分图匹配', items: [
          { text: '匈牙利算法', link: '/图论/二分图匹配/匈牙利算法' },
          { text: '二分图染色法', link: '/图论/二分图匹配/二分图染色法' },
          { text: '最大完备匹配-KM算法', link: '/图论/二分图匹配/最大完备匹配-KM算法' },
          { text: '多重匹配', link: '/图论/二分图匹配/多重匹配' },
          { text: '最小路径覆盖', link: '/图论/二分图匹配/最小路径覆盖' },
          { text: '最小点集覆盖-König定理', link: '/图论/二分图匹配/最小点集覆盖-König定理' }
        ] },
      { text: '网络流', link: '/图论/网络流', items: [
          { text: '最大流-EK算法', link: '/图论/网络流/最大流-EK算法' },
          { text: '最大流-ISAP算法', link: '/图论/网络流/最大流-ISAP算法' },
          { text: '最大流-Dinic算法', link: '/图论/网络流/最大流-Dinic算法' },
          { text: '最小费用最大流-最小费用路算法', link: '/图论/网络流/最小费用最大流' }
        ] },
      { text: '图的连通-Tarjan算法', link: '/图论/图连通' },
      { text: '树的直径', link: '/图论/树的直径' },
      { text: '点分治', link: '/图论/点分治' },
      { text: '最近公共祖先LCA', link: '/图论/最近公共祖先', items: [
          { text: '离线Tarjan算法', link: '/图论/最近公共祖先/离线Tarjan算法' },
          { text: '在线倍增算法', link: '/图论/最近公共祖先/在线倍增算法' },
          { text: '树剖求LCA', link: '/图论/最近公共祖先/树剖求lca' }
        ] },
      { text: '拓扑排序', link: '/图论/拓扑排序' },
      { text: '搜索', link: '/图论/搜索' }
    ] },
  { text: '字符串', collapsed: true, items: [
      { text: 'KMP算法', link: '/字符串/KMP算法' },
      { text: '扩展KMP算法', link: '/字符串/扩展KMP算法' },
      { text: 'AC自动机算法', link: '/字符串/AC自动机算法' },
      { text: '字符串最大最小表示法', link: '/字符串/字符串最大最小表示法' },
      { text: 'Manacher算法', link: '/字符串/Manacher算法' },
      { text: '后缀数组', link: '/字符串/后缀数组' },
      { text: '后缀自动机SAM', link: '/字符串/后缀自动机SAM' }
    ] },
  { text: '数据结构', collapsed: true, items: [
      { text: '线段树', link: '/数据结构/线段树', items: [
          { text: '线段树--单点更新-区间求和', link: '/数据结构/线段树/单点更新-区间求和' },
          { text: '单点更新-区间求最值', link: '/数据结构/线段树/单点更新-区间求最值' },
          { text: '线段树---区间更新', link: '/数据结构/线段树/区间更新' },
          { text: '线段树+离散化', link: '/数据结构/线段树/线段树+离散化' },
          { text: '扫描线-离散化-矩形面积并', link: '/数据结构/线段树/扫描线-离散化-矩形面积并' },
          { text: '扫描线-离散化-矩形面积交', link: '/数据结构/线段树/扫描线-离散化-矩形面积交' },
          { text: '值域线段树求第k小', link: '/数据结构/线段树/值域线段树' }
        ] },
      { text: 'RMQ算法/ST表', link: '/数据结构/RMQ算法' },
      { text: '树状数组', link: '/数据结构/树状数组' },
      { text: '树链剖分', link: '/数据结构/树链剖分' },
      { text: '主席树', link: '/数据结构/主席树' },
      { text: '莫队算法', link: '/数据结构/莫队算法' },
      { text: '区间不同元素个数', link: '/数据结构/区间不同元素个数' },
      { text: '单调栈-单调队列', link: '/数据结构/单调栈-单调队列' },
      { text: 'Trie树', link: '/数据结构/Trie树' },
      { text: '线性基', link: '/数据结构/线性基' },
      { text: '使序列有序的最少交换次数', link: '/数据结构/使序列有序的最少交换次数' }
    ] },
  { text: '动态规划', collapsed: true, items: [
      { text: '区间dp', link: '/动态规划/区间dp-状压dp' },
      { text: '最长公共子序列LCS', link: '/动态规划/最长公共子序列LCS' },
      { text: '单调递增子序列LIS', link: '/动态规划/单调递增子序列LIS' },
      { text: '编辑距离', link: '/动态规划/编辑距离' },
      { text: '背包类问题', link: '/动态规划/背包类问题' },
      { text: '树形dp', link: '/动态规划/树形dp' },
      { text: '数位dp', link: '/动态规划/数位dp' },
      { text: '状压dp', link: '/动态规划/状压dp' }
    ] },
  { text: '其他', collapsed: true, items: [
      { text: '表达式求值', link: '/其他/表达式求值' },
      { text: '归并排序', link: '/其他/归并排序' },
      { text: '计算几何合集', link: '/其他/计算几何合集' },
      { text: '模拟退火', link: '/其他/模拟退火' },
      { text: '二分查找', link: '/其他/二分查找' },
      { text: '各种公式', link: '/其他/各种公式' },
      { text: 'java和python', link: '/其他/java和python' },
      { text: 'vim配置', link: '/其他/vim配置' }
    ] }
]
