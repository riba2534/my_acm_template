<div align="center">

# riba2534 ACM 模板

一份持续打磨的 ACM/ICPC 算法竞赛模板，收录竞赛常用算法的实现代码与讲解。

[![Website](https://img.shields.io/website?url=https%3A%2F%2Facm.riba2534.cn&label=%E5%9C%A8%E7%BA%BF%E9%98%85%E8%AF%BB)](https://acm.riba2534.cn)
[![Deploy](https://github.com/riba2534/my_acm_template/actions/workflows/deploy.yml/badge.svg)](https://github.com/riba2534/my_acm_template/actions/workflows/deploy.yml)
[![Built with VitePress](https://img.shields.io/badge/built%20with-VitePress-42b883)](https://vitepress.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**[📖 在线阅读 → acm.riba2534.cn](https://acm.riba2534.cn)**

</div>

## 简介

这是 [riba2534](https://github.com/riba2534) 在 ACM/ICPC 竞赛期间整理的算法模板，覆盖数论、图论、数据结构、动态规划、字符串、计算几何等常见专题，每个专题包含算法讲解与可直接使用的 C++ 代码，例题大多来源于作者的 [CSDN 博客](https://blog.csdn.net/riba2534)。

项目最初基于 GitBook 维护，现已迁移到 [VitePress](https://vitepress.dev) 文档站，支持全文搜索、数学公式渲染与深浅色主题，并对全部文档做了一次系统性校订。

## ✨ 特性

- 📚 **分类齐全** —— 9 大专题、90+ 篇模板，覆盖竞赛常见知识点
- 🔍 **全文搜索** —— 内置本地中文搜索，快速定位算法
- ➗ **公式渲染** —— 基于 MathJax，数学公式清晰可读
- 🌗 **深浅色主题** —— 适配不同阅读环境
- 🚀 **自动部署** —— push 到 `master` 即经 GitHub Actions 自动构建并发布到 Cloudflare Pages

## 📚 内容目录

| 专题 | 内容 |
| --- | --- |
| 常用技巧 | 输入输出加速、STL、pb_ds、库函数、位运算 |
| 数论 | 欧拉函数、快速幂、康托展开、欧几里得、逆元、辛普森积分、素数筛、博弈论 |
| 组合数学 | 母函数、BM 线性递推、容斥原理、组合数、卢卡斯定理 |
| 图论 | 最短路、最小生成树、网络流、二分图匹配、LCA、点分治、Tarjan、拓扑排序、欧拉回路 |
| 字符串 | KMP、扩展 KMP、AC 自动机、Manacher、后缀数组、后缀自动机 SAM |
| 数据结构 | 线段树、树状数组、主席树、树链剖分、莫队、Trie、线性基、单调栈/队列 |
| 动态规划 | 背包、LIS、LCS、编辑距离、区间 DP、树形 DP、数位 DP、状压 DP |
| 高精度运算 | 大数的加减乘除 |
| 其他 | 计算几何、表达式求值、归并排序、模拟退火、二分查找、各种公式 |

完整目录见 [在线文档](https://acm.riba2534.cn)。

## 🛠️ 本地开发

环境要求：[Node.js](https://nodejs.org) 18+。

```bash
# 克隆仓库
git clone https://github.com/riba2534/my_acm_template.git
cd my_acm_template

# 安装依赖
npm install

# 本地预览（默认 http://localhost:5173）
npm run dev

# 构建静态站点（输出到 docs/.vitepress/dist）
npm run build

# 预览构建产物
npm run preview
```

所有文档位于 `docs/` 目录，按专题分类组织；侧边栏配置见 `docs/.vitepress/sidebar.ts`。

## 🚀 部署

项目托管于 [Cloudflare Pages](https://pages.cloudflare.com)。每次推送到 `master` 分支，[GitHub Actions](.github/workflows/deploy.yml) 会自动完成构建与部署，无需手动操作。

## 🤝 贡献

欢迎通过 [Issue](https://github.com/riba2534/my_acm_template/issues) 反馈错误，或提交 [Pull Request](https://github.com/riba2534/my_acm_template/pulls) 改进内容。修改文档后请确保 `npm run build` 能正常通过。

## 📄 许可

本项目基于 [MIT](LICENSE) 协议开源。

---

<div align="center">

> 打 ACM 的时光可能是我大学最美好的时光，想念和队友并肩作战的日子，工作后再也没有这种感觉了，时光已逝，只有怀念。

</div>
