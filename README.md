# AlgoSoft 官网

AlgoSoft 官方产品家族官网，现已迁移为 Vite + Vue + TypeScript 7 项目，支持中文 / 与英文 /en/ 两个静态入口。

## 技术栈

- Vite 8.2.1
- Vue 3.5.41
- TypeScript 7.0.2
- ES2024
- Element Plus 2.14.4
- markdown-it 15.0.0
- highlight.js 11.12.0
- Mermaid 11.16.1
- yaml 2.9.0
- TypeScript path aliases（@/、@components/、@composables/、@data/、@styles/）

## 本地开发

    pnpm install
    pnpm dev

## 校验与构建

    pnpm typecheck
    pnpm build
    pnpm preview

pnpm build 会生成包含首页和产品文档入口的 dist/ 静态站点：

- `/` 与 `/en/`
- `/docs/` 与 `/en/docs/`（产品文档首页）
- `/docs/algocode/` 与 `/en/docs/algocode/`
- `/docs/algoterm/` 与 `/en/docs/algoterm/`
- `/docs/augur-git/` 与 `/en/docs/augur-git/`
- `/augur-git/` 与 `/en/augur-git/`

## 目录结构

    src/
      components/    页面组件
      composables/   Vue composables
      data/          中英文内容数据
      docs/          按语言保存的 Markdown 产品文档
      styles/        全局样式
      types/         TypeScript 类型
    public/assets/   logo、favicon 等静态资源
    public/robots.txt
    public/sitemap.xml
    legacy/          迁移前的静态资源与辅助脚本归档

站点部署在 algosoft.cc 时，需要将 dist/ 内容作为静态文件根目录，并确保 /en/ 映射到 dist/en/index.html。SEO 文件位于 public/，构建后会复制到 dist/ 根目录。

## GitHub Pages 部署

GitHub Actions 工作流位于 `.github/workflows/deploy-pages.yml`。将代码合并到 `publish` 分支后会自动执行 `pnpm install --frozen-lockfile`、类型检查、构建并部署 `dist/` 到 GitHub Pages，也可以从 Actions 页面手动触发。工作流会读取 GitHub Pages 的 `base_path`，因此同时支持项目站点路径（例如 `/algosoft-website/`）和自定义域名根路径。

在仓库设置中将 Pages 的构建来源设置为 GitHub Actions；如果继续使用 `algosoft.cc`，还需要在 Pages 设置中配置自定义域名和 DNS。

## 网站统计

网站使用内置的第一方统计模块记录匿名 `page_view` 和 `download` 事件，不使用
Cookie 或持久化用户 ID。生产构建通过 `VITE_ANALYTICS_ENDPOINT` 指向统计服务，当前
Pages 工作流使用 `https://stats.algosoft.cc/v1/events`。统计接口不可用时不会阻止页面
导航或文件下载。

网站隐私说明位于 `/privacy/` 和 `/en/privacy/`。

## 添加产品文档

为新产品分别添加中英文 Markdown 文件：

    src/docs/zh-CN/<product>.md
    src/docs/en/<product>.md

文档支持 YAML frontmatter、代码块、语法高亮和 Mermaid 图表。为产品增加新的静态入口后，Vite 会将其输出到对应的 `/docs/<product>/` 和 `/en/docs/<product>/` 路径。
