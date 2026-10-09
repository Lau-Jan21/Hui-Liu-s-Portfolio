# 刘慧的个人主页：源码导出与 CloudBase 部署说明

导出时间：2026-10-09（北京时间）。原站：https://blue-echo-hui.lauhui0121.chatgpt.site

## 交付内容与边界

支持导出源码。本包包含可独立安装和构建的 Next.js 静态项目、现有公开页面的 HTML/CSS/JavaScript 构建产物、照片/证书/字体、完整文章及个人资料备份，以及原 Sites 项目源码。

- `cloudbase-static/`：在 VS Code 中打开这个目录。本地开发和 CloudBase 部署都用它。
- `cloudbase-static/out/`：已构建的网页，可直接上传静态托管。只上传这个目录中的文件。
- `original-sites-source.zip`：转换前完整 Git 源码（包含原在线编辑、API、数据库迁移等）。它依赖 Cloudflare Workers/D1/R2 和 Sites 登录，不能直接部署到 CloudBase。
- `private-backup/all-posts.json`：84 篇完整文章，包含 76 篇已发布、8 篇草稿。
- `private-backup/database-snapshot.json`：原数据库文章和个人资料快照，保留版本、日期、来源等字段。

已保留：现有首页及栏目/文章页设计、紫色主题、夜间模式、字体、照片、证书、响应式布局、悬停效果、滚动动画、知识沉淀与日常随笔搜索、学生工作时间轴。已发布内容全部生成独立详情页。没有把草稿变成公开网页。

本次转换为静态网站，**不包含可运行的线上内容管理后台**。原有 ChatGPT 登录、站主身份识别、D1 数据写入、R2 上传和即时发布依赖原平台；原代码完整保留，但需要改成 CloudBase 身份认证、数据库及云函数后才能恢复在线管理。当前更新方式是改本地 JSON → 构建 → 上传。不能将这份静态包称为后台已迁移的全栈版。

数据库中的文章正文已完整导出。原 R2 中上传时保存的 TXT/Markdown 原附件没有单独下载，正文、来源文件名和 source_key 在数据库备份中保留。所有公开正文引用的图片均为本地资源，已核对没有缺失。外部社交链接仍指向原平台。

## 本地运行（Windows / macOS）

安装 Node.js 22.13 或更新的 22.x 版本。解压 ZIP，用 VS Code 的“打开文件夹”打开 `cloudbase-static`，在该目录终端执行：

```sh
npm ci
npm run dev
```

浏览器访问 http://localhost:3000 。开发服务器启动后，改样式、组件会自动刷新。

生产构建和本地预览：

```sh
npm run build
npm start
```

`npm start` 预览 `out` 目录；改代码后需要重新 build。不要双击 HTML 使用 file:// 打开，因为静态资源采用网站根目录路径。

## 在 VS Code 中修改

- `app/globals.css`：全局字体、主题、间距、动画和卡片样式。
- `app/journal.tsx`：首页排版；`components/site-chrome.tsx`：导航与页脚。
- `app/collection/[slug]/view.tsx`：栏目布局、搜索与排序。
- `components/student-work-card.tsx`：学生工作时间轴。
- `components/award-card.tsx`：竞赛与志愿服务卡片。
- `components/markdown.tsx`、`app/posts/[id]/page.tsx`：文章详情。
- `data/posts.json`：76 篇公开文章；`data/profile.json`：个人介绍、技术栈、联系方式等。
- `public/`：照片、证书、图标与字体。

新增文章可以复制 posts.json 中一个对象，设置唯一 id、标题、正文、category、topic 和日期。tags 为数组，status 为 published。日期使用 ISO 格式；不要修改已有文章 id，否则旧链接会失效。正文使用原 Markdown 渲染器支持的语法。摘要保留正文开头提取逻辑；手工输入 excerpt 时优先显示该值。新增图片放在 public 下，正文使用 `![说明](/目录/图片.jpg)`。

要发布备份中的某篇草稿，把对应对象复制到 data/posts.json 并把 status 改为 published，再构建。不要把 private-backup 放入 public 或 out。

## CloudBase 静态托管部署（适合当前交付）

本项目是 Next.js 静态导出（output: export、trailingSlash: true）。无需 Node 运行服务、云函数或数据库即可展示。使用 CloudBase 的“静态网站托管”，不要把源代码当容器服务直接运行。

### 方式一：直接上传已经构建的网页

1. 登录腾讯云 CloudBase 控制台，选择或创建自己的环境，开通静态网站托管。
2. 在静态托管的部署/文件上传入口，上传 `cloudbase-static/out` **内部全部文件与文件夹**，保持目录结构；网站根目录应直接包含 index.html 与 _next，而不是多一层 out。
3. 使用托管提供的访问域名打开首页，再直接打开 `/about/`、`/collection/research/` 和任意 `/posts/文章id/` 检查刷新是否正常。
4. 保持目录默认首页为 index.html。本网站有真实的多页 HTML，避免把所有路径强制重写成首页的 SPA 规则。若深层链接 404，先检查对应目录/index.html 是否完整上传。

### 方式二：让 CloudBase 构建源码

如果控制台使用“上传代码包”或 Git 部署，上传 cloudbase-static 的源码；不要上传主交付 ZIP，也不要包含 private-backup 或 original-sites-source.zip。

| 配置 | 值 |
| --- | --- |
| 项目目录 | cloudbase-static（若单独打包它，则为根目录） |
| 框架 | Next.js / 自定义静态构建 |
| Node 版本 | 22 |
| 安装命令 | npm ci |
| 构建命令 | npm run build |
| 产物目录 | out |
| 部署路径 | / |
| 环境变量 | 不需要 |

### 方式三：命令行上传构建产物

```sh
npm install -g @cloudbase/cli
tcb login
npm run build
tcb hosting deploy ./out -e YOUR_ENV_ID
```

将 YOUR_ENV_ID 替换为控制台中的环境 ID；登录使用你自己的腾讯云账号。本包不含账号密钥，也未代你创建环境、购买服务或部署到腾讯云。具体界面、套餐与域名要求以控制台当时显示为准。

修改后再次构建并重新部署。删除文章时，若上传方式只覆盖而不删除旧文件，需要同时删除托管中的旧文章目录，避免旧链接继续可访问。

## 后台要保持原有体验，需要重新实现哪些部分

| 原功能 | 现有依赖 | CloudBase 迁移内容 |
| --- | --- | --- |
| 登录与仅站主可写 | Sites/ChatGPT 注入的身份头 | CloudBase 身份认证；服务端验证身份和站主授权，不接受客户端自报邮箱 |
| 文章、草稿、个人资料 | Cloudflare D1 SQL | CloudBase 数据库集合或合适的 SQL 服务，导入备份；保留 id、status、日期和 version |
| 保存、删除、发布、版本冲突提示 | Next Route Handlers + D1 | 云函数/云托管 API；保留版本条件更新、输入校验、来源/CSRF 检查 |
| TXT/Markdown 上传及原件保留 | R2 BUCKET | CloudBase 存储，权限受控；草稿原件不可公开读取 |
| 线上修改后即时可见 | 动态服务器渲染 | 全栈云托管或动态数据读取；或保存后触发静态重建发布 |

若选全栈方案，可使用 CloudBase 云托管承载标准 Next.js Node 容器，但仅增加 Dockerfile 不能替代上面的数据库、存储与身份迁移。原始源码保留了全部管理界面，可复用其 UI，不必重画页面。

## 验证记录

- 从锁文件执行干净 npm ci 后，独立项目 npm run build 成功。
- TypeScript 检查通过；生成首页、个人简介、4 个栏目、76 个已发布文章详情。
- 8 篇草稿没有生成公开详情页。
- 公开文章引用的图片路径全部存在；照片、证书与 8 个字体文件已复制。
- 本地静态服务的首页、个人简介及 4 个栏目返回 HTTP 200。
- 未在真实 CloudBase 环境部署；未执行浏览器逐页视觉/交互验收。

## 官方文档

- CloudBase 部署配置：https://docs.cloudbase.net/hosting/web-hosting-guide
- 静态项目上传：https://docs.cloudbase.net/hosting/web-hosting-static
- CLI 快速开始：https://docs.cloudbase.net/hosting/quick-start
- Next.js 全栈云托管：https://docs.cloudbase.net/recipes/deploy-nextjs-to-cloudbase-run
- Next.js 静态导出：https://nextjs.org/docs/app/guides/static-exports
