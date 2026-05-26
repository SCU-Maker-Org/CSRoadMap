# CS Roadmap

给计算机新生使用的可视化学习路线图 MVP。

本项目的 UI 设计受 Minecraft 模组 **[FTB Quests](https://github.com/FTBTeam/FTB-Quests)** 启发，使用深色 Minecraft 风格主题与六边形任务节点布局。

## 功能

- 首页和 Roadmap 页面
- 6 条计算机方向路线（通用基础 / 前端 / 后端 / AI / 网络安全 / 算法竞赛）
- React Flow 六边形节点图谱
- 点击节点查看详情（任务描述、阶段、状态标记）
- 手动切换节点状态（未开始 / 学习中 / 已掌握）
- 使用 localStorage 保存进度，刷新后保留

## 快速开始

```bash
npm install
npm run dev
```

浏览器访问 `http://localhost:5173` 即可。

## 构建

```bash
npm run build
```

产物输出到 `dist/` 目录。

## 技术栈

| 技术 | 用途 |
|------|------|
| React 18 + TypeScript | UI 框架 |
| Vite 5 | 开发 & 构建 |
| Tailwind CSS 3 | 原子化样式 |
| @xyflow/react (React Flow) | 节点图谱渲染 |
| localStorage | 客户端进度持久化 |

## UI 设计说明

整体视觉风格以深色 Minecraft 为主题，参考了 FTB Quests 模组的交互布局：

- **左侧面板** — 路线选择器（仿 Chapter Panel 设计）
- **中央画布** — 六边形节点 + 有向边（仿 Quest Grid 设计）
- **底部状态栏** — 进度统计 + 重置按钮
- **模态详情面板** — 居中弹窗显示任务详情、状态标记（仿 ViewQuestPanel 设计）
- **状态颜色** — 金（学习中）/ 绿（已完成）/ 灰（未开始）

## 项目结构

```
src/
  main.tsx                # 入口
  App.tsx                 # 路由 & 页面切换
  index.css               # 全局样式 & Minecraft 主题变量
  types/roadmap.ts        # 类型定义
  data/roadmaps.ts        # 路线数据（6条）
  hooks/useProgress.ts    # 进度管理 hook
  pages/
    HomePage.tsx          # 首页
    RoadmapPage.tsx       # 路线总览页
  components/
    Header.tsx            # 顶部导航栏
    RoadmapSelector.tsx   # 路线选择（左侧面板）
    RoadmapView.tsx       # 节点图谱渲染
    SkillDetailPanel.tsx  # 技能详情弹窗
    ProgressSummary.tsx   # 底部进度条
```

## 添加新路线

编辑 `src/data/roadmaps.ts`，按以下格式添加：

```typescript
{
  id: "my-roadmap",
  title: "我的路线",
  description: "路线说明",
  nodes: [
    {
      id: "my-node-1",
      title: "节点名称",
      description: "节点描述",
      stage: "阶段名称",
      x: 0, y: 100,
    },
  ],
  edges: [
    { source: "my-node-1", target: "my-node-2" },
  ],
}
```

节点自动按 3 列网格布局（每列间距 200px，每行间距 180px）。

## 修改主题颜色

编辑 `src/index.css` 中的 `:root` 变量：

```css
:root {
  --mc-bg: #0d0d0d;         /* 背景色 */
  --mc-panel: #1e1e1e;      /* 面板色 */
  --mc-gold: #c8a84e;       /* 进行中（金色） */
  --mc-green: #4a8c3f;      /* 已完成（绿色） */
  --mc-gray: #5a5a5a;       /* 未开始（灰色） */
  --mc-accent: #e8903c;     /* 强调色（选中高亮） */
}
```

## 致谢

本项目的 UI 设计深受 [FTB Quests](https://github.com/FTBTeam/FTB-Quests) 启发。FTB Quests 是由 FTB Team 开发的 Minecraft 模组，提供高度可定制的任务系统和简洁易用的界面。感谢 FTB Team 的开源贡献。
