import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar'

export default defineConfig({
  lang: 'zh-CN',
  title: 'riba2534 ACM 模板',
  description: '一份持续打磨的 ACM/ICPC 算法竞赛模板：数论、图论、数据结构、动态规划、字符串、计算几何等全分类代码与讲解。',
  base: '/',
  cleanUrls: false,
  lastUpdated: true,
  ignoreDeadLinks: false,

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/icon-180.png' }],
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap', rel: 'stylesheet' }],
  ],

  markdown: {
    math: true,
    lineNumbers: true,
    theme: { light: 'github-light', dark: 'github-dark' },
  },

  themeConfig: {
    logo: '/touxiang.jpg',
    outline: { level: [2, 3], label: '本页目录' },
    sidebar,

    nav: [
      { text: '首页', link: '/' },
      { text: '常用技巧', link: '/常用技巧/输入输出加速' },
      { text: '数论', link: '/数论/欧拉函数' },
      { text: '图论', link: '/图论/欧拉回路' },
      { text: '数据结构', link: '/数据结构/线段树' },
      { text: '动态规划', link: '/动态规划/区间dp-状压dp' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/riba2534/my_acm_template' },
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '清除查询条件',
                backButtonTitle: '关闭搜索',
                noResultsText: '无法找到相关结果',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                },
              },
            },
          },
        },
      },
    },

    docFooter: { prev: '上一篇', next: '下一篇' },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    lastUpdated: {
      text: '最后更新于',
      formatOptions: { dateStyle: 'short', timeStyle: 'short' },
    },

    editLink: {
      pattern: 'https://github.com/riba2534/my_acm_template/edit/master/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    footer: {
      message: '基于 MIT 协议发布 · 使用 VitePress 构建',
      copyright: 'Copyright © 2018-present riba2534',
    },
  },
})
