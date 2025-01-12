# 房产竞拍平台

一个基于 Vue 3 开发的房产竞拍平台演示项目，提供房产竞拍、提案管理等功能。

## 功能特性

### 买家端
- 房源浏览：查看可竞拍的房源列表
- 竞拍详情：查看房源详细信息、竞拍状态和出价记录
- 提案提交：提交竞拍提案，包含出价、付款方式等信息
- 保证金支付：模拟保证金支付流程
- 提案状态：实时查看提案的处理状态

### 卖家端
- 提案管理：查看、处理买家提交的竞拍提案
- 状态追踪：跟踪每个提案的状态变化
- 操作记录：记录所有操作的历史记录
- 数据统计：展示房源、竞拍、提案等相关统计数据

## 技术栈

- Vue 3
- Vue Router
- Ant Design Vue
- Tailwind CSS
- Vite

## 开发环境要求

- Node.js >= 16
- npm >= 8

## 安装和运行

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 构建生产版本：
```bash
npm run build
```

## 项目结构

```
src/
├── assets/         # 静态资源
├── components/     # 公共组件
├── layouts/        # 布局组件
├── router/         # 路由配置
├── views/          # 页面组件
│   ├── Home.vue           # 首页
│   ├── AuctionDetail.vue  # 竞拍详情页
│   ├── Proposal.vue       # 提案提交页
│   └── seller/            # 卖家管理相关页面
└── App.vue         # 根组件
```

## 主要路由

- `/` - 首页，展示房源列表
- `/auction/:id` - 竞拍详情页
- `/auction/:id/proposal` - 提案提交页
- `/seller/auctions/:id/proposals` - 卖家管理页面

## 开发规范

- 组件命名：使用 PascalCase
- 文件命名：使用 kebab-case
- CSS 类命名：使用 Tailwind CSS 工具类
- 代码格式化：使用 ESLint + Prettier

## 注意事项

- 本项目为演示项目，支付功能为模拟实现
- 数据为静态模拟数据，未连接实际后端服务
- 图片资源使用 Lorem Picsum 提供的占位图

## 贡献指南

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/xxx`
3. 提交改动：`git commit -m 'Add xxx feature'`
4. 推送分支：`git push origin feature/xxx`
5. 提交 Pull Request

## 许可证

MIT License 