// 构建前置脚本：把仓库根目录的内容分类目录（Markdown + 同目录图片）复制进 site/，
// 供 VitePress 构建。内容源只有一份（仓库根），site/ 下的副本是生成物，已被 .gitignore 忽略。
// 这样只看 GitHub 的读者可直接在根目录浏览 Markdown，网站构建则使用复制进来的副本。
// 幂等：每次先清理上次生成的副本再全量复制。零第三方依赖，纯 Node fs/path。
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SITE_ROOT = path.resolve(__dirname, '..') // site/
const REPO_ROOT = path.resolve(SITE_ROOT, '..') // 仓库根

// 需要复制进站点的内容分类目录（与仓库根目录下的中文分类目录一致）
const CONTENT_DIRS = [
  '常用技巧',
  '数论',
  '高精度运算',
  '组合数学',
  '图论',
  '字符串',
  '数据结构',
  '动态规划',
  '其他',
]

function rmrf(p) {
  fs.rmSync(p, { recursive: true, force: true })
}

// 步骤 A：清理上次复制进来的分类目录
function clean() {
  for (const d of CONTENT_DIRS) rmrf(path.join(SITE_ROOT, d))
}

// 步骤 B：把每个分类目录整体复制到 site/（md 与图片一起，保持相对结构）
function copyContent() {
  let dirs = 0
  let files = 0
  for (const d of CONTENT_DIRS) {
    const src = path.join(REPO_ROOT, d)
    if (!fs.existsSync(src)) {
      console.warn(`[warn] 内容目录不存在: ${d}`)
      continue
    }
    const dst = path.join(SITE_ROOT, d)
    fs.cpSync(src, dst, { recursive: true })
    dirs++
    for (const _ of walk(dst)) files++
  }
  return { dirs, files }
}

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

console.log('▶ 清理上次生成的内容副本...')
clean()
console.log('▶ 复制内容分类目录...')
const { dirs, files } = copyContent()
console.log(`✓ 完成：${dirs} 个分类目录，共 ${files} 个文件`)
