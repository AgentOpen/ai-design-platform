# AI 全自动室内设计平台 — Demo 版本增量 PRD

> 基于完整 PRD 的 Demo 版本增量定义，供架构师和工程师直接使用。

---

## 1. Demo 功能边界

### Step1 户型识别

| 能力 | 完整版 | Demo 版 |
|------|--------|---------|
| 上传户型图图片 | ✅ YOLOv8 识别墙体/门窗 | ❌ 不实现 |
| 从图片提取户型 | ✅ 真实 AI 推理 | ❌ 不实现 |
| 手动绘制户型 | ✅ 墙体/门窗绘制工具 | ⚠️ 简化版：仅支持拖拽预设墙体模板 |
| 加载默认户型 | ✅ | ✅ **主入口**，内置默认两室一厅 JSON |
| 户型数据导出 | ✅ JSON/IFC | ⚠️ 仅 JSON |

**Demo 策略**：跳过图片上传识别，默认加载内置户型数据。提供"重新绘制"入口但仅做前端 UI 展示（点击后弹出 toast："Demo 版本暂不支持手动绘制"）。

### Step2 3D 建模

| 能力 | 完整版 | Demo 版 |
|------|--------|---------|
| 户型 JSON → 3D 场景 | ✅ 自动生成 | ✅ 真实 Three.js 实现 |
| 墙体渲染 | ✅ | ✅ |
| 门窗渲染 | ✅ | ✅ |
| 地面渲染 | ✅ | ✅ |
| 材质贴图 | ✅ PBR 材质库 | ⚠️ 使用基础颜色材质，无贴图 |
| 天花板 | ✅ | ⚠️ 可切换显示/隐藏 |

**Demo 策略**：3D 建模是真实实现，但材质简化为基础颜色。

### Step3 AI 布局

| 能力 | 完整版 | Demo 版 |
|------|--------|---------|
| AI 自动布局 | ✅ RL + 规则引擎 | ⚠️ 使用预设布局结果模拟 |
| 布局动画展示 | ✅ 家具逐步出现 | ✅ 模拟延迟 + 进度条 + 逐步出现动画 |
| 多方案选择 | ✅ 生成 3 套方案 | ⚠️ 提供 2 套预设方案 |
| 布局风格选择 | ✅ 现代简约/北欧/日式等 | ⚠️ 仅"现代简约"风格 |

**Demo 策略**：点击"AI 布局"后，播放 2-3 秒进度动画，然后从预设数据加载布局结果，家具以动画方式逐个出现。

### Step4 半自动编辑

| 能力 | 完整版 | Demo 版 |
|------|--------|---------|
| 家具拖拽移动 | ✅ | ✅ 真实 Three.js 拖拽 |
| 碰撞检测 | ✅ | ✅ 真实前端碰撞检测 |
| 家具旋转 | ✅ | ✅ |
| 家具删除 | ✅ | ✅ |
| 从产品库添加家具 | ✅ | ✅ 真实产品库面板 |
| 智能对齐/吸附 | ✅ | ⚠️ 简化版网格吸附 |
| 撤销/重做 | ✅ | ❌ 不实现 |
| 批量操作 | ✅ | ❌ 不实现 |

**Demo 策略**：核心拖拽编辑功能真实实现，撤销重做和批量操作不实现。

### Step5 AI 渲染

| 能力 | 完整版 | Demo 版 |
|------|--------|---------|
| AI 渲染生图 | ✅ SDXL 推理 | ❌ 使用预设渲染图片 |
| 风格选择 | ✅ 多种渲染风格 | ⚠️ 3 种预设风格（现代简约/北欧/工业风） |
| 视角选择 | ✅ | ⚠️ 仅客厅主视角 |
| 渲染进度 | ✅ 真实推理进度 | ⚠️ 模拟进度条（3-5秒） |

**Demo 策略**：选择风格后播放进度动画，然后展示预设的渲染效果图（使用 picsum.photos 占位图）。

### Step6 换品

| 能力 | 完整版 | Demo 版 |
|------|--------|---------|
| 点击家具换品 | ✅ | ✅ 从产品库筛选同类产品替换 |
| 相似品推荐 | ✅ AI 推荐 | ⚠️ 按同类目随机推荐 |
| 换品后自动适配 | ✅ 尺寸自适应 | ⚠️ 简化：替换后保持位置，仅更新模型和尺寸 |
| 批量换品 | ✅ | ❌ |

**Demo 策略**：点击 3D 场景中的家具弹出同类产品列表，选择后替换。不做 AI 推荐和批量换品。

### Step7 报价

| 能力 | 完整版 | Demo 版 |
|------|--------|---------|
| BOM 自动生成 | ✅ | ✅ 真实计算逻辑 |
| 按房间分类 | ✅ | ✅ |
| 按品类分类 | ✅ | ✅ |
| 价格汇总 | ✅ | ✅ |
| 报价导出 | ✅ PDF/Excel | ⚠️ 仅页面展示，不做导出 |
| 人工费估算 | ✅ | ⚠️ 简化系数计算 |

**Demo 策略**：BOM 引擎和报价算法是真实代码，数据来自 Step3-6 的家具选择和产品库价格。

---

## 2. Mock 数据策略

### 2.1 需要 Mock 的数据

| 数据类别 | Mock 方式 | 说明 |
|----------|----------|------|
| 户型数据 | 内置 JSON | 默认两室一厅 |
| AI 布局结果 | 内置 JSON | 2 套预设方案 |
| 产品库 SKU | 内置 JSON 数组 | ~50 个 SKU |
| 渲染效果图 | picsum.photos URL | 按风格预设 3 张图 |
| AI 推理延迟 | setTimeout 模拟 | 2-5 秒延迟 + 进度动画 |
| AI 推理进度 | 前端定时器模拟 | 0%→100% 进度条 |

### 2.2 不 Mock 的部分（真实实现）

- Three.js 3D 场景构建
- 家具拖拽交互
- 碰撞检测算法
- BOM 计算引擎
- 报价计算逻辑
- 产品库筛选/搜索

### 2.3 Mock 数据文件结构

```
src/
  mock/
    defaultFloorPlan.json      # 默认户型数据
    layoutSchemeA.json         # AI 布局方案 A
    layoutSchemeB.json         # AI 布局方案 B
    productCatalog.json        # 产品库 SKU
    renderImages.json           # 渲染效果图 URL 映射
    quotationTemplate.json     # 报价模板
```

---

## 3. AI 模拟策略

### 3.1 通用模拟模式

每个 AI 步骤遵循统一模拟流程：

```
用户触发 AI 操作
  → 显示加载遮罩 + 进度条
  → 模拟延迟（2-5秒，按步骤不同）
  → 进度条从 0% 推进到 100%（非线性，模拟真实推理节奏）
  → 加载预设结果数据
  → 以动画方式展示结果
  → 关闭遮罩
```

### 3.2 各步骤模拟细节

#### Step3 AI 布局模拟

```typescript
async function simulateAILayout(roomId: string, style: string): Promise<LayoutResult> {
  // 1. 显示进度弹窗 "AI 正在分析户型..."
  showProgressOverlay("AI 正在分析户型...", 0);

  // 2. 模拟延迟 + 进度推进
  await simulateProgress(0, 30, 1000);   // 0-30%: 分析户型
  updateProgressText("AI 正在规划空间...");
  await simulateProgress(30, 70, 1500);  // 30-70%: 规划布局
  updateProgressText("AI 正在摆放家具...");
  await simulateProgress(70, 95, 800);   // 70-95%: 摆放家具
  updateProgressText("正在优化布局...");
  await simulateProgress(95, 100, 500);  // 95-100%: 优化

  // 3. 加载预设结果
  const result = style === 'modern' ? layoutSchemeA : layoutSchemeB;

  // 4. 动画展示：家具逐个出现（每件 200ms）
  for (const item of result.furniture) {
    await animateFurnitureAppear(item, 200);
  }

  return result;
}
```

- 总耗时：约 3.8 秒
- 进度文本分 4 个阶段
- 结果家具逐个动画出现

#### Step5 AI 渲染模拟

```typescript
async function simulateAIRender(viewAngle: string, style: string): Promise<RenderResult> {
  showProgressOverlay("正在构建 3D 场景...", 0);
  await simulateProgress(0, 20, 600);
  updateProgressText("AI 正在生成渲染图...");
  await simulateProgress(20, 80, 2500);
  updateProgressText("正在优化画质...");
  await simulateProgress(80, 100, 900);

  // 返回预设图片 URL
  return { imageUrl: renderImages[style] };
}
```

- 总耗时：约 4 秒
- 渲染图使用 picsum.photos 占位

### 3.3 进度模拟工具函数

```typescript
// 非线性进度模拟：快-慢-快 的节奏
async function simulateProgress(
  from: number, to: number, duration: number
): Promise<void> {
  const steps = 20;
  const stepDuration = duration / steps;
  for (let i = 0; i <= steps; i++) {
    // 使用 ease-in-out 曲线
    const t = i / steps;
    const eased = t < 0.5
      ? 2 * t * t
      : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const progress = from + (to - from) * eased;
    updateProgressBar(progress);
    await sleep(stepDuration);
  }
}
```

---

## 4. 默认户型数据

### 4.1 户型概述

- 名称：两室一厅（现代简约）
- 总面积：约 89㎡
- 房间：客厅、主卧、次卧、厨房、卫生间、阳台
- 层高：2.8m

### 4.2 户型 JSON 数据

```json
{
  "id": "floorplan_default_001",
  "name": "两室一厅 · 现代简约",
  "totalArea": 89,
  "ceilingHeight": 2.8,
  "unit": "m",
  "origin": { "x": 0, "y": 0 },
  "walls": [
    { "id": "w01", "start": {"x":0,"y":0}, "end": {"x":10,"y":0}, "thickness": 0.24, "height": 2.8 },
    { "id": "w02", "start": {"x":10,"y":0}, "end": {"x":10,"y":3.6}, "thickness": 0.24, "height": 2.8 },
    { "id": "w03", "start": {"x":10,"y":3.6}, "end": {"x":6,"y":3.6}, "thickness": 0.24, "height": 2.8 },
    { "id": "w04", "start": {"x":6,"y":3.6}, "end": {"x":6,"y":8.6}, "thickness": 0.24, "height": 2.8 },
    { "id": "w05", "start": {"x":6,"y":8.6}, "end": {"x":0,"y":8.6}, "thickness": 0.24, "height": 2.8 },
    { "id": "w06", "start": {"x":0,"y":8.6}, "end": {"x":0,"y":0}, "thickness": 0.24, "height": 2.8 },
    { "id": "w07", "start": {"x":0,"y":3.6}, "end": {"x":4,"y":3.6}, "thickness": 0.12, "height": 2.8 },
    { "id": "w08", "start": {"x":4,"y":3.6}, "end": {"x":4,"y":8.6}, "thickness": 0.12, "height": 2.8 },
    { "id": "w09", "start": {"x":4,"y":6.4}, "end": {"x":6,"y":6.4}, "thickness": 0.12, "height": 2.8 },
    { "id": "w10", "start": {"x":0,"y":6.4}, "end": {"x":4,"y":6.4}, "thickness": 0.12, "height": 2.8 }
  ],
  "doors": [
    { "id": "d01", "wallId": "w07", "position": 0.5, "width": 0.9, "height": 2.1, "type": "swing", "direction": "inward" },
    { "id": "d02", "wallId": "w09", "position": 0.3, "width": 0.8, "height": 2.1, "type": "swing", "direction": "inward" },
    { "id": "d03", "wallId": "w10", "position": 0.6, "width": 0.7, "height": 2.1, "type": "swing", "direction": "inward" },
    { "id": "d04", "wallId": "w02", "position": 0.5, "width": 0.9, "height": 2.1, "type": "swing", "direction": "inward" }
  ],
  "windows": [
    { "id": "win01", "wallId": "w01", "position": 0.3, "width": 1.5, "height": 1.5, "sillHeight": 0.9 },
    { "id": "win02", "wallId": "w01", "position": 0.7, "width": 1.5, "height": 1.5, "sillHeight": 0.9 },
    { "id": "win03", "wallId": "w05", "position": 0.3, "width": 1.2, "height": 1.5, "sillHeight": 0.9 },
    { "id": "win04", "wallId": "w05", "position": 0.7, "width": 1.2, "height": 1.5, "sillHeight": 0.9 }
  ],
  "rooms": [
    {
      "id": "room_living",
      "name": "客厅",
      "type": "living_room",
      "floorPolygon": [
        {"x":0,"y":0}, {"x":6,"y":0}, {"x":6,"y":3.6}, {"x":0,"y":3.6}
      ],
      "area": 21.6,
      "floorMaterial": "wood_light"
    },
    {
      "id": "room_master",
      "name": "主卧",
      "type": "master_bedroom",
      "floorPolygon": [
        {"x":0,"y":3.6}, {"x":4,"y":3.6}, {"x":4,"y":6.4}, {"x":0,"y":6.4}
      ],
      "area": 11.2,
      "floorMaterial": "wood_light"
    },
    {
      "id": "room_second",
      "name": "次卧",
      "type": "second_bedroom",
      "floorPolygon": [
        {"x":0,"y":6.4}, {"x":4,"y":6.4}, {"x":4,"y":8.6}, {"x":0,"y":8.6}
      ],
      "area": 8.8,
      "floorMaterial": "wood_light"
    },
    {
      "id": "room_kitchen",
      "name": "厨房",
      "type": "kitchen",
      "floorPolygon": [
        {"x":4,"y":3.6}, {"x":6,"y":3.6}, {"x":6,"y":6.4}, {"x":4,"y":6.4}
      ],
      "area": 5.6,
      "floorMaterial": "tile_white"
    },
    {
      "id": "room_bathroom",
      "name": "卫生间",
      "type": "bathroom",
      "floorPolygon": [
        {"x":4,"y":6.4}, {"x":6,"y":6.4}, {"x":6,"y":8.6}, {"x":4,"y":8.6}
      ],
      "area": 4.4,
      "floorMaterial": "tile_white"
    },
    {
      "id": "room_balcony",
      "name": "阳台",
      "type": "balcony",
      "floorPolygon": [
        {"x":6,"y":0}, {"x":10,"y":0}, {"x":10,"y":3.6}, {"x":6,"y":3.6}
      ],
      "area": 14.4,
      "floorMaterial": "tile_wood"
    }
  ]
}
```

---

## 5. 默认家具布局数据

### 5.1 布局方案 A（现代简约 — 默认推荐）

```json
{
  "id": "layout_scheme_a",
  "name": "方案 A · 现代简约",
  "style": "modern_minimalist",
  "floorPlanId": "floorplan_default_001",
  "furniture": [
    {
      "id": "furn_a_01",
      "roomId": "room_living",
      "skuId": "sku_sofa_001",
      "name": "三人位布艺沙发",
      "position": { "x": 1.5, "y": 0.8, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 2.2, "depth": 0.9, "height": 0.85 }
    },
    {
      "id": "furn_a_02",
      "roomId": "room_living",
      "skuId": "sku_tvstand_001",
      "name": "现代电视柜",
      "position": { "x": 3.0, "y": 3.2, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 1.8, "depth": 0.4, "height": 0.5 }
    },
    {
      "id": "furn_a_03",
      "roomId": "room_living",
      "skuId": "sku_coffeetable_001",
      "name": "简约茶几",
      "position": { "x": 3.0, "y": 1.8, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 1.2, "depth": 0.6, "height": 0.45 }
    },
    {
      "id": "furn_a_04",
      "roomId": "room_living",
      "skuId": "rug_001",
      "name": "几何图案地毯",
      "position": { "x": 3.0, "y": 1.5, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 2.0, "depth": 1.4, "height": 0.02 }
    },
    {
      "id": "furn_a_05",
      "roomId": "room_living",
      "skuId": "sku_floorlamp_001",
      "name": "落地灯",
      "position": { "x": 0.5, "y": 0.8, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 0.35, "depth": 0.35, "height": 1.6 }
    },
    {
      "id": "furn_a_06",
      "roomId": "room_living",
      "skuId": "sku_bookshelf_001",
      "name": "开放式书架",
      "position": { "x": 5.5, "y": 1.0, "z": 0 },
      "rotation": { "x": 0, "y": 90, "z": 0 },
      "size": { "width": 0.35, "depth": 1.2, "height": 1.8 }
    },
    {
      "id": "furn_a_07",
      "roomId": "room_master",
      "skuId": "sku_bed_double_001",
      "name": "1.8m 双人床",
      "position": { "x": 2.0, "y": 5.0, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 2.0, "depth": 1.8, "height": 0.45 }
    },
    {
      "id": "furn_a_08",
      "roomId": "room_master",
      "skuId": "sku_nightstand_001",
      "name": "床头柜",
      "position": { "x": 3.4, "y": 5.0, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 0.45, "depth": 0.4, "height": 0.5 }
    },
    {
      "id": "furn_a_09",
      "roomId": "room_master",
      "skuId": "sku_wardrobe_001",
      "name": "推拉门衣柜",
      "position": { "x": 0.5, "y": 4.0, "z": 0 },
      "rotation": { "x": 0, "y": 90, "z": 0 },
      "size": { "width": 0.6, "depth": 1.8, "height": 2.2 }
    },
    {
      "id": "furn_a_10",
      "roomId": "room_master",
      "skuId": "sku_desklamp_001",
      "name": "台灯",
      "position": { "x": 3.5, "y": 5.1, "z": 0.5 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 0.2, "depth": 0.2, "height": 0.45 }
    },
    {
      "id": "furn_a_11",
      "roomId": "room_second",
      "skuId": "sku_bed_single_001",
      "name": "1.5m 单人床",
      "position": { "x": 2.0, "y": 7.5, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 1.5, "depth": 2.0, "height": 0.45 }
    },
    {
      "id": "furn_a_12",
      "roomId": "room_second",
      "skuId": "sku_desk_001",
      "name": "书桌",
      "position": { "x": 3.2, "y": 7.0, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 1.0, "depth": 0.5, "height": 0.75 }
    },
    {
      "id": "furn_a_13",
      "roomId": "room_second",
      "skuId": "sku_chair_001",
      "name": "人体工学椅",
      "position": { "x": 3.2, "y": 7.7, "z": 0 },
      "rotation": { "x": 0, "y": 180, "z": 0 },
      "size": { "width": 0.55, "depth": 0.55, "height": 1.1 }
    },
    {
      "id": "furn_a_14",
      "roomId": "room_second",
      "skuId": "sku_wardrobe_002",
      "name": "双门衣柜",
      "position": { "x": 0.5, "y": 6.8, "z": 0 },
      "rotation": { "x": 0, "y": 90, "z": 0 },
      "size": { "width": 0.55, "depth": 1.2, "height": 2.0 }
    },
    {
      "id": "furn_a_15",
      "roomId": "room_kitchen",
      "skuId": "sku_cabinet_001",
      "name": "L型橱柜",
      "position": { "x": 4.2, "y": 3.8, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 1.8, "depth": 0.6, "height": 0.85 }
    },
    {
      "id": "furn_a_16",
      "roomId": "room_kitchen",
      "skuId": "sku_fridge_001",
      "name": "双门冰箱",
      "position": { "x": 5.5, "y": 3.8, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 0.65, "depth": 0.65, "height": 1.8 }
    },
    {
      "id": "furn_a_17",
      "roomId": "room_bathroom",
      "skuId": "sku_toilet_001",
      "name": "智能马桶",
      "position": { "x": 4.5, "y": 7.8, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 0.4, "depth": 0.7, "height": 0.4 }
    },
    {
      "id": "furn_a_18",
      "roomId": "room_bathroom",
      "skuId": "sku_washbasin_001",
      "name": "浴室柜",
      "position": { "x": 5.4, "y": 6.6, "z": 0 },
      "rotation": { "x": 0, "y": 90, "z": 0 },
      "size": { "width": 0.5, "depth": 0.8, "height": 0.85 }
    },
    {
      "id": "furn_a_19",
      "roomId": "room_bathroom",
      "skuId": "sku_shower_001",
      "name": "淋浴房",
      "position": { "x": 4.5, "y": 6.6, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 0.9, "depth": 0.9, "height": 2.0 }
    },
    {
      "id": "furn_a_20",
      "roomId": "room_balcony",
      "skuId": "sku_washing_001",
      "name": "滚筒洗衣机",
      "position": { "x": 6.3, "y": 0.5, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 0.6, "depth": 0.6, "height": 0.85 }
    },
    {
      "id": "furn_a_21",
      "roomId": "room_balcony",
      "skuId": "sku_balconychair_001",
      "name": "休闲椅",
      "position": { "x": 8.5, "y": 1.5, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 0.7, "depth": 0.7, "height": 0.8 }
    },
    {
      "id": "furn_a_22",
      "roomId": "room_balcony",
      "skuId": "sku_balconytable_001",
      "name": "小圆桌",
      "position": { "x": 8.5, "y": 2.5, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 0.6, "depth": 0.6, "height": 0.7 }
    }
  ]
}
```

### 5.2 布局方案 B（紧凑实用）

```json
{
  "id": "layout_scheme_b",
  "name": "方案 B · 紧凑实用",
  "style": "modern_practical",
  "floorPlanId": "floorplan_default_001",
  "furniture": [
    {
      "id": "furn_b_01",
      "roomId": "room_living",
      "skuId": "sku_sofa_002",
      "name": "L型转角沙发",
      "position": { "x": 0.8, "y": 0.5, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 2.6, "depth": 1.6, "height": 0.85 }
    },
    {
      "id": "furn_b_02",
      "roomId": "room_living",
      "skuId": "sku_tvstand_002",
      "name": "悬挂式电视柜",
      "position": { "x": 3.0, "y": 3.3, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 2.0, "depth": 0.35, "height": 0.35 }
    },
    {
      "id": "furn_b_03",
      "roomId": "room_living",
      "skuId": "sku_coffeetable_002",
      "name": "升降茶几",
      "position": { "x": 2.5, "y": 1.8, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 1.1, "depth": 0.65, "height": 0.5 }
    },
    {
      "id": "furn_b_04",
      "roomId": "room_living",
      "skuId": "sku_diningtable_001",
      "name": "4人餐桌",
      "position": { "x": 4.5, "y": 1.8, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 1.2, "depth": 0.8, "height": 0.75 }
    },
    {
      "id": "furn_b_05",
      "roomId": "room_living",
      "skuId": "sku_diningchair_001",
      "name": "餐椅×4",
      "position": { "x": 4.5, "y": 1.2, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 0.45, "depth": 0.45, "height": 0.85 }
    },
    {
      "id": "furn_b_06",
      "roomId": "room_master",
      "skuId": "sku_bed_double_002",
      "name": "1.8m 储物床",
      "position": { "x": 2.0, "y": 5.0, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 2.1, "depth": 1.9, "height": 0.4 }
    },
    {
      "id": "furn_b_07",
      "roomId": "room_master",
      "skuId": "sku_nightstand_002",
      "name": "床头柜×2",
      "position": { "x": 0.5, "y": 5.0, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 0.4, "depth": 0.35, "height": 0.5 }
    },
    {
      "id": "furn_b_08",
      "roomId": "room_master",
      "skuId": "sku_dresser_001",
      "name": "梳妆台",
      "position": { "x": 3.5, "y": 4.0, "z": 0 },
      "rotation": { "x": 0, "y": 90, "z": 0 },
      "size": { "width": 0.8, "depth": 0.4, "height": 0.75 }
    },
    {
      "id": "furn_b_09",
      "roomId": "room_master",
      "skuId": "sku_wardrobe_001",
      "name": "推拉门衣柜",
      "position": { "x": 0.5, "y": 4.0, "z": 0 },
      "rotation": { "x": 0, "y": 90, "z": 0 },
      "size": { "width": 0.6, "depth": 1.8, "height": 2.2 }
    },
    {
      "id": "furn_b_10",
      "roomId": "room_second",
      "skuId": "sku_bed_single_002",
      "name": "1.2m 单人床",
      "position": { "x": 0.8, "y": 7.5, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 1.2, "depth": 2.0, "height": 0.45 }
    },
    {
      "id": "furn_b_11",
      "roomId": "room_second",
      "skuId": "sku_desk_002",
      "name": "升降书桌",
      "position": { "x": 3.2, "y": 7.0, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 1.0, "depth": 0.5, "height": 0.75 }
    },
    {
      "id": "furn_b_12",
      "roomId": "room_second",
      "skuId": "sku_wardrobe_003",
      "name": "三门衣柜",
      "position": { "x": 0.5, "y": 6.8, "z": 0 },
      "rotation": { "x": 0, "y": 90, "z": 0 },
      "size": { "width": 0.55, "depth": 1.5, "height": 2.0 }
    },
    {
      "id": "furn_b_13",
      "roomId": "room_kitchen",
      "skuId": "sku_cabinet_002",
      "name": "一字型橱柜",
      "position": { "x": 4.2, "y": 3.8, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 1.6, "depth": 0.6, "height": 0.85 }
    },
    {
      "id": "furn_b_14",
      "roomId": "room_bathroom",
      "skuId": "sku_toilet_002",
      "name": "普通马桶",
      "position": { "x": 4.5, "y": 7.8, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 0.38, "depth": 0.65, "height": 0.4 }
    },
    {
      "id": "furn_b_15",
      "roomId": "room_bathroom",
      "skuId": "sku_washbasin_002",
      "name": "立柱盆",
      "position": { "x": 5.4, "y": 6.6, "z": 0 },
      "rotation": { "x": 0, "y": 90, "z": 0 },
      "size": { "width": 0.45, "depth": 0.55, "height": 0.82 }
    },
    {
      "id": "furn_b_16",
      "roomId": "room_balcony",
      "skuId": "sku_washing_001",
      "name": "滚筒洗衣机",
      "position": { "x": 6.3, "y": 0.5, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "size": { "width": 0.6, "depth": 0.6, "height": 0.85 }
    }
  ]
}
```

---

## 6. 默认产品库 SKU 数据

```json
[
  { "id": "sku_sofa_001", "name": "三人位布艺沙发", "category": "sofa", "subCategory": "three_seater", "brand": "宜家代工", "style": ["modern_minimalist", "nordic"], "size": {"width":2.2,"depth":0.9,"height":0.85}, "color": "浅灰", "material": "棉麻布艺", "price": 3299, "unit": "件", "imageUrl": "https://picsum.photos/seed/sofa001/200/200", "modelColor": "#8B8682" },
  { "id": "sku_sofa_002", "name": "L型转角沙发", "category": "sofa", "subCategory": "l_shape", "brand": "顾家", "style": ["modern_minimalist"], "size": {"width":2.6,"depth":1.6,"height":0.85}, "color": "深灰", "material": "科技布", "price": 5999, "unit": "件", "imageUrl": "https://picsum.photos/seed/sofa002/200/200", "modelColor": "#696969" },
  { "id": "sku_sofa_003", "name": "双人位真皮沙发", "category": "sofa", "subCategory": "two_seater", "brand": "芝华仕", "style": ["modern_minimalist", "industrial"], "size": {"width":1.8,"depth":0.9,"height":0.82}, "color": "棕色", "material": "头层牛皮", "price": 7899, "unit": "件", "imageUrl": "https://picsum.photos/seed/sofa003/200/200", "modelColor": "#8B4513" },
  { "id": "sku_bed_double_001", "name": "1.8m 双人床", "category": "bed", "subCategory": "double", "brand": "林氏木业", "style": ["modern_minimalist", "nordic"], "size": {"width":2.0,"depth":1.8,"height":0.45}, "color": "原木色", "material": "橡木框架", "price": 2599, "unit": "件", "imageUrl": "https://picsum.photos/seed/bed001/200/200", "modelColor": "#DEB887" },
  { "id": "sku_bed_double_002", "name": "1.8m 储物床", "category": "bed", "subCategory": "double_storage", "brand": "全友", "style": ["modern_minimalist"], "size": {"width":2.1,"depth":1.9,"height":0.4}, "color": "白色", "material": "板材", "price": 3199, "unit": "件", "imageUrl": "https://picsum.photos/seed/bed002/200/200", "modelColor": "#F5F5F5" },
  { "id": "sku_bed_single_001", "name": "1.5m 单人床", "category": "bed", "subCategory": "single", "brand": "林氏木业", "style": ["modern_minimalist", "nordic"], "size": {"width":1.5,"depth":2.0,"height":0.45}, "color": "原木色", "material": "松木", "price": 1599, "unit": "件", "imageUrl": "https://picsum.photos/seed/bed003/200/200", "modelColor": "#D2B48C" },
  { "id": "sku_bed_single_002", "name": "1.2m 单人床", "category": "bed", "subCategory": "single", "brand": "全友", "style": ["modern_minimalist"], "size": {"width":1.2,"depth":2.0,"height":0.45}, "color": "白色", "material": "板材", "price": 1299, "unit": "件", "imageUrl": "https://picsum.photos/seed/bed004/200/200", "modelColor": "#FAF0E6" },
  { "id": "sku_tvstand_001", "name": "现代电视柜", "category": "tv_stand", "subCategory": "floor", "brand": "宜家代工", "style": ["modern_minimalist"], "size": {"width":1.8,"depth":0.4,"height":0.5}, "color": "白色+原木", "material": "板材", "price": 1299, "unit": "件", "imageUrl": "https://picsum.photos/seed/tv001/200/200", "modelColor": "#FAEBD7" },
  { "id": "sku_tvstand_002", "name": "悬挂式电视柜", "category": "tv_stand", "subCategory": "wall_mounted", "brand": "林氏木业", "style": ["modern_minimalist"], "size": {"width":2.0,"depth":0.35,"height":0.35}, "color": "黑色", "material": "板材", "price": 899, "unit": "件", "imageUrl": "https://picsum.photos/seed/tv002/200/200", "modelColor": "#333333" },
  { "id": "sku_coffeetable_001", "name": "简约茶几", "category": "coffee_table", "subCategory": "rectangle", "brand": "宜家代工", "style": ["modern_minimalist", "nordic"], "size": {"width":1.2,"depth":0.6,"height":0.45}, "color": "白色", "material": "钢化玻璃+不锈钢", "price": 699, "unit": "件", "imageUrl": "https://picsum.photos/seed/ct001/200/200", "modelColor": "#E8E8E8" },
  { "id": "sku_coffeetable_002", "name": "升降茶几", "category": "coffee_table", "subCategory": "lift_top", "brand": "全友", "style": ["modern_minimalist"], "size": {"width":1.1,"depth":0.65,"height":0.5}, "color": "原木色", "material": "橡木", "price": 1199, "unit": "件", "imageUrl": "https://picsum.photos/seed/ct002/200/200", "modelColor": "#C4A882" },
  { "id": "sku_nightstand_001", "name": "床头柜", "category": "nightstand", "subCategory": "single_drawer", "brand": "林氏木业", "style": ["modern_minimalist", "nordic"], "size": {"width":0.45,"depth":0.4,"height":0.5}, "color": "原木色", "material": "橡木", "price": 399, "unit": "件", "imageUrl": "https://picsum.photos/seed/ns001/200/200", "modelColor": "#DEB887" },
  { "id": "sku_nightstand_002", "name": "床头柜×2", "category": "nightstand", "subCategory": "set", "brand": "全友", "style": ["modern_minimalist"], "size": {"width":0.4,"depth":0.35,"height":0.5}, "color": "白色", "material": "板材", "price": 599, "unit": "套", "imageUrl": "https://picsum.photos/seed/ns002/200/200", "modelColor": "#F0F0F0" },
  { "id": "sku_wardrobe_001", "name": "推拉门衣柜", "category": "wardrobe", "subCategory": "sliding", "brand": "索菲亚", "style": ["modern_minimalist"], "size": {"width":0.6,"depth":1.8,"height":2.2}, "color": "白色", "material": "板材", "price": 4599, "unit": "件", "imageUrl": "https://picsum.photos/seed/wd001/200/200", "modelColor": "#F5F5F5" },
  { "id": "sku_wardrobe_002", "name": "双门衣柜", "category": "wardrobe", "subCategory": "hinged", "brand": "林氏木业", "style": ["modern_minimalist", "nordic"], "size": {"width":0.55,"depth":1.2,"height":2.0}, "color": "原木色", "material": "橡木", "price": 2899, "unit": "件", "imageUrl": "https://picsum.photos/seed/wd002/200/200", "modelColor": "#D2B48C" },
  { "id": "sku_wardrobe_003", "name": "三门衣柜", "category": "wardrobe", "subCategory": "hinged", "brand": "索菲亚", "style": ["modern_minimalist"], "size": {"width":0.55,"depth":1.5,"height":2.0}, "color": "白色", "material": "板材", "price": 3699, "unit": "件", "imageUrl": "https://picsum.photos/seed/wd003/200/200", "modelColor": "#EEEEEE" },
  { "id": "sku_desk_001", "name": "书桌", "category": "desk", "subCategory": "standard", "brand": "宜家代工", "style": ["modern_minimalist", "nordic"], "size": {"width":1.0,"depth":0.5,"height":0.75}, "color": "白色", "material": "板材+钢架", "price": 599, "unit": "件", "imageUrl": "https://picsum.photos/seed/dk001/200/200", "modelColor": "#F0F0F0" },
  { "id": "sku_desk_002", "name": "升降书桌", "category": "desk", "subCategory": "standing", "brand": "乐歌", "style": ["modern_minimalist"], "size": {"width":1.0,"depth":0.5,"height":0.75}, "color": "白色", "material": "板材+电机", "price": 1499, "unit": "件", "imageUrl": "https://picsum.photos/seed/dk002/200/200", "modelColor": "#E8E8E8" },
  { "id": "sku_chair_001", "name": "人体工学椅", "category": "chair", "subCategory": "ergonomic", "brand": "西昊", "style": ["modern_minimalist"], "size": {"width":0.55,"depth":0.55,"height":1.1}, "color": "黑色", "material": "网布", "price": 1899, "unit": "件", "imageUrl": "https://picsum.photos/seed/ch001/200/200", "modelColor": "#333333" },
  { "id": "sku_diningtable_001", "name": "4人餐桌", "category": "dining_table", "subCategory": "four_seater", "brand": "林氏木业", "style": ["modern_minimalist", "nordic"], "size": {"width":1.2,"depth":0.8,"height":0.75}, "color": "原木色", "material": "橡木", "price": 1599, "unit": "件", "imageUrl": "https://picsum.photos/seed/dt001/200/200", "modelColor": "#C4A882" },
  { "id": "sku_diningchair_001", "name": "餐椅×4", "category": "dining_chair", "subCategory": "set_of_4", "brand": "林氏木业", "style": ["modern_minimalist"], "size": {"width":0.45,"depth":0.45,"height":0.85}, "color": "白色", "material": "PP塑料", "price": 799, "unit": "套", "imageUrl": "https://picsum.photos/seed/dc001/200/200", "modelColor": "#F5F5F5" },
  { "id": "sku_bookshelf_001", "name": "开放式书架", "category": "bookshelf", "subCategory": "open", "brand": "宜家代工", "style": ["modern_minimalist", "nordic"], "size": {"width":0.35,"depth":1.2,"height":1.8}, "color": "白色", "material": "板材", "price": 899, "unit": "件", "imageUrl": "https://picsum.photos/seed/bs001/200/200", "modelColor": "#F0F0F0" },
  { "id": "sku_cabinet_001", "name": "L型橱柜", "category": "kitchen_cabinet", "subCategory": "l_shape", "brand": "欧派", "style": ["modern_minimalist"], "size": {"width":1.8,"depth":0.6,"height":0.85}, "color": "白色台面+木色柜体", "material": "石英石台面+板材", "price": 3999, "unit": "延米", "imageUrl": "https://picsum.photos/seed/kc001/200/200", "modelColor": "#F5DEB3" },
  { "id": "sku_cabinet_002", "name": "一字型橱柜", "category": "kitchen_cabinet", "subCategory": "straight", "brand": "欧派", "style": ["modern_minimalist"], "size": {"width":1.6,"depth":0.6,"height":0.85}, "color": "灰色台面+白色柜体", "material": "石英石台面+板材", "price": 2899, "unit": "延米", "imageUrl": "https://picsum.photos/seed/kc002/200/200", "modelColor": "#D3D3D3" },
  { "id": "sku_fridge_001", "name": "双门冰箱", "category": "appliance", "subCategory": "refrigerator", "brand": "海尔", "style": ["modern_minimalist"], "size": {"width":0.65,"depth":0.65,"height":1.8}, "color": "银色", "material": "不锈钢", "price": 3299, "unit": "台", "imageUrl": "https://picsum.photos/seed/fr001/200/200", "modelColor": "#C0C0C0" },
  { "id": "sku_washing_001", "name": "滚筒洗衣机", "category": "appliance", "subCategory": "washer", "brand": "小天鹅", "style": ["modern_minimalist"], "size": {"width":0.6,"depth":0.6,"height":0.85}, "color": "白色", "material": "钢板", "price": 2499, "unit": "台", "imageUrl": "https://picsum.photos/seed/ws001/200/200", "modelColor": "#F0F0F0" },
  { "id": "sku_toilet_001", "name": "智能马桶", "category": "bathroom", "subCategory": "smart_toilet", "brand": "TOTO", "style": ["modern_minimalist"], "size": {"width":0.4,"depth":0.7,"height":0.4}, "color": "白色", "material": "陶瓷", "price": 3999, "unit": "件", "imageUrl": "https://picsum.photos/seed/tl001/200/200", "modelColor": "#FFFFFF" },
  { "id": "sku_toilet_002", "name": "普通马桶", "category": "bathroom", "subCategory": "toilet", "brand": "箭牌", "style": ["modern_minimalist"], "size": {"width":0.38,"depth":0.65,"height":0.4}, "color": "白色", "material": "陶瓷", "price": 1299, "unit": "件", "imageUrl": "https://picsum.photos/seed/tl002/200/200", "modelColor": "#FAFAFA" },
  { "id": "sku_washbasin_001", "name": "浴室柜", "category": "bathroom", "subCategory": "vanity", "brand": "箭牌", "style": ["modern_minimalist"], "size": {"width":0.5,"depth":0.8,"height":0.85}, "color": "白色", "material": "陶瓷盆+板材柜", "price": 1899, "unit": "件", "imageUrl": "https://picsum.photos/seed/wb001/200/200", "modelColor": "#F8F8FF" },
  { "id": "sku_washbasin_002", "name": "立柱盆", "category": "bathroom", "subCategory": "pedestal", "brand": "九牧", "style": ["modern_minimalist"], "size": {"width":0.45,"depth":0.55,"height":0.82}, "color": "白色", "material": "陶瓷", "price": 699, "unit": "件", "imageUrl": "https://picsum.photos/seed/wb002/200/200", "modelColor": "#FFFFFF" },
  { "id": "sku_shower_001", "name": "淋浴房", "category": "bathroom", "subCategory": "shower_enclosure", "brand": "朗斯", "style": ["modern_minimalist"], "size": {"width":0.9,"depth":0.9,"height":2.0}, "color": "透明", "material": "钢化玻璃+铝合金", "price": 2599, "unit": "套", "imageUrl": "https://picsum.photos/seed/sh001/200/200", "modelColor": "#E0FFFF" },
  { "id": "sku_floorlamp_001", "name": "落地灯", "category": "lighting", "subCategory": "floor_lamp", "brand": "宜家代工", "style": ["modern_minimalist", "nordic"], "size": {"width":0.35,"depth":0.35,"height":1.6}, "color": "黑色+白灯罩", "material": "金属+布", "price": 499, "unit": "件", "imageUrl": "https://picsum.photos/seed/fl001/200/200", "modelColor": "#333333" },
  { "id": "sku_desklamp_001", "name": "台灯", "category": "lighting", "subCategory": "desk_lamp", "brand": "宜家代工", "style": ["modern_minimalist", "nordic"], "size": {"width":0.2,"depth":0.2,"height":0.45}, "color": "白色", "material": "金属", "price": 199, "unit": "件", "imageUrl": "https://picsum.photos/seed/dl001/200/200", "modelColor": "#F5F5F5" },
  { "id": "sku_ceilinglamp_001", "name": "客厅吸顶灯", "category": "lighting", "subCategory": "ceiling", "brand": "欧普", "style": ["modern_minimalist"], "size": {"width":0.8,"depth":0.8,"height":0.1}, "color": "白色", "material": "亚克力", "price": 599, "unit": "件", "imageUrl": "https://picsum.photos/seed/cl001/200/200", "modelColor": "#FFFACD" },
  { "id": "sku_pendantlamp_001", "name": "餐厅吊灯", "category": "lighting", "subCategory": "pendant", "brand": "欧普", "style": ["modern_minimalist", "nordic"], "size": {"width":0.4,"depth":0.4,"height":0.5}, "color": "黑色+金边", "material": "金属+玻璃", "price": 899, "unit": "件", "imageUrl": "https://picsum.photos/seed/pl001/200/200", "modelColor": "#2F4F4F" },
  { "id": "sku_dresser_001", "name": "梳妆台", "category": "dresser", "subCategory": "with_mirror", "brand": "林氏木业", "style": ["modern_minimalist", "nordic"], "size": {"width":0.8,"depth":0.4,"height":0.75}, "color": "白色", "material": "板材", "price": 899, "unit": "件", "imageUrl": "https://picsum.photos/seed/dr001/200/200", "modelColor": "#F0F0F0" },
  { "id": "rug_001", "name": "几何图案地毯", "category": "rug", "subCategory": "geometric", "brand": "宜家代工", "style": ["modern_minimalist"], "size": {"width":2.0,"depth":1.4,"height":0.02}, "color": "灰白几何", "material": "化纤", "price": 399, "unit": "件", "imageUrl": "https://picsum.photos/seed/rg001/200/200", "modelColor": "#B0B0B0" },
  { "id": "sku_balconychair_001", "name": "休闲椅", "category": "chair", "subCategory": "lounge", "brand": "宜家代工", "style": ["modern_minimalist", "nordic"], "size": {"width":0.7,"depth":0.7,"height":0.8}, "color": "深棕", "material": "藤编", "price": 699, "unit": "件", "imageUrl": "https://picsum.photos/seed/bc001/200/200", "modelColor": "#8B7355" },
  { "id": "sku_balconytable_001", "name": "小圆桌", "category": "side_table", "subCategory": "round", "brand": "宜家代工", "style": ["modern_minimalist", "nordic"], "size": {"width":0.6,"depth":0.6,"height":0.7}, "color": "白色", "material": "金属+石材台面", "price": 399, "unit": "件", "imageUrl": "https://picsum.photos/seed/bt001/200/200", "modelColor": "#F0F0F0" },
  { "id": "sku_shoecabinet_001", "name": "玄关鞋柜", "category": "cabinet", "subCategory": "shoe", "brand": "索菲亚", "style": ["modern_minimalist"], "size": {"width":0.35,"depth":1.0,"height":1.2}, "color": "白色", "material": "板材", "price": 1299, "unit": "件", "imageUrl": "https://picsum.photos/seed/sc001/200/200", "modelColor": "#F5F5F5" },
  { "id": "sku_sidetable_001", "name": "边几", "category": "side_table", "subCategory": "c_shape", "brand": "宜家代工", "style": ["modern_minimalist", "nordic"], "size": {"width":0.45,"depth":0.45,"height":0.55}, "color": "原木+白", "material": "橡木+钢架", "price": 299, "unit": "件", "imageUrl": "https://picsum.photos/seed/st001/200/200", "modelColor": "#DEB887" },
  { "id": "sku_curtain_001", "name": "遮光窗帘（客厅）", "category": "curtain", "subCategory": "blackout", "brand": "如鱼得水", "style": ["modern_minimalist"], "size": {"width":3.0,"depth":0.02,"height":2.7}, "color": "浅灰", "material": "涤纶", "price": 899, "unit": "套", "imageUrl": "https://picsum.photos/seed/cu001/200/200", "modelColor": "#A9A9A9" },
  { "id": "sku_curtain_002", "name": "纱帘（卧室）", "category": "curtain", "subCategory": "sheer", "brand": "如鱼得水", "style": ["modern_minimalist", "nordic"], "size": {"width":2.0,"depth":0.02,"height":2.7}, "color": "白色", "material": "纱", "price": 399, "unit": "套", "imageUrl": "https://picsum.photos/seed/cu002/200/200", "modelColor": "#FFFAF0" },
  { "id": "sku_mattress_001", "name": "1.8m 乳胶床垫", "category": "mattress", "subCategory": "latex", "brand": "喜临门", "style": ["modern_minimalist"], "size": {"width":1.8,"depth":2.0,"height":0.28}, "color": "白色", "material": "乳胶+弹簧", "price": 3299, "unit": "件", "imageUrl": "https://picsum.photos/seed/mt001/200/200", "modelColor": "#FFFAF0" },
  { "id": "sku_mattress_002", "name": "1.5m 记忆棉床垫", "category": "mattress", "subCategory": "memory_foam", "brand": "慕思", "style": ["modern_minimalist"], "size": {"width":1.5,"depth":2.0,"height":0.25}, "color": "白色", "material": "记忆棉", "price": 2599, "unit": "件", "imageUrl": "https://picsum.photos/seed/mt002/200/200", "modelColor": "#FFFFF0" },
  { "id": "sku_ac_001", "name": "1.5匹挂机空调", "category": "appliance", "subCategory": "ac_wall", "brand": "格力", "style": ["modern_minimalist"], "size": {"width":0.9,"depth":0.22,"height":0.3}, "color": "白色", "material": "塑料", "price": 2999, "unit": "台", "imageUrl": "https://picsum.photos/seed/ac001/200/200", "modelColor": "#F5F5F5" },
  { "id": "sku_heater_001", "name": "电热水器", "category": "appliance", "subCategory": "water_heater", "brand": "美的", "style": ["modern_minimalist"], "size": {"width":0.4,"depth":0.4,"height":0.6}, "color": "白色", "material": "钢板", "price": 1599, "unit": "台", "imageUrl": "https://picsum.photos/seed/ht001/200/200", "modelColor": "#F0F0F0" },
  { "id": "sku_towelrack_001", "name": "毛巾架", "category": "bathroom", "subCategory": "towel_rack", "brand": "九牧", "style": ["modern_minimalist"], "size": {"width":0.6,"depth":0.12,"height":0.8}, "color": "银色", "material": "不锈钢", "price": 299, "unit": "件", "imageUrl": "https://picsum.photos/seed/tr001/200/200", "modelColor": "#C0C0C0" },
  { "id": "sku_mirror_001", "name": "智能镜柜", "category": "bathroom", "subCategory": "mirror_cabinet", "brand": "九牧", "style": ["modern_minimalist"], "size": {"width":0.6,"depth":0.12,"height":0.8}, "color": "银色", "material": "铝框+镜面", "price": 1299, "unit": "件", "imageUrl": "https://picsum.photos/seed/mr001/200/200", "modelColor": "#E8E8E8" },
  { "id": "sku_kitchentray_001", "name": "厨房置物架", "category": "kitchen", "subCategory": "shelf", "brand": "宜家代工", "style": ["modern_minimalist"], "size": {"width":0.6,"depth":0.3,"height":1.2}, "color": "白色", "material": "碳钢", "price": 399, "unit": "件", "imageUrl": "https://picsum.photos/seed/kt001/200/200", "modelColor": "#F0F0F0" }
]
```

---

## 7. 默认报价数据

### 7.1 报价结构（基于方案 A）

```json
{
  "id": "quotation_default_a",
  "name": "全屋报价单 — 方案 A",
  "layoutSchemeId": "layout_scheme_a",
  "createdAt": "2025-01-15T10:00:00Z",
  "laborRate": 0.15,
  "managementFeeRate": 0.08,
  "designFeeRate": 0.05,
  "rooms": [
    {
      "roomId": "room_living",
      "roomName": "客厅",
      "items": [
        { "furnitureId": "furn_a_01", "skuId": "sku_sofa_001", "name": "三人位布艺沙发", "quantity": 1, "unitPrice": 3299, "subtotal": 3299 },
        { "furnitureId": "furn_a_02", "skuId": "sku_tvstand_001", "name": "现代电视柜", "quantity": 1, "unitPrice": 1299, "subtotal": 1299 },
        { "furnitureId": "furn_a_03", "skuId": "sku_coffeetable_001", "name": "简约茶几", "quantity": 1, "unitPrice": 699, "subtotal": 699 },
        { "furnitureId": "furn_a_04", "skuId": "rug_001", "name": "几何图案地毯", "quantity": 1, "unitPrice": 399, "subtotal": 399 },
        { "furnitureId": "furn_a_05", "skuId": "sku_floorlamp_001", "name": "落地灯", "quantity": 1, "unitPrice": 499, "subtotal": 499 },
        { "furnitureId": "furn_a_06", "skuId": "sku_bookshelf_001", "name": "开放式书架", "quantity": 1, "unitPrice": 899, "subtotal": 899 },
        { "furnitureId": "furn_a_07", "skuId": "sku_ceilinglamp_001", "name": "客厅吸顶灯", "quantity": 1, "unitPrice": 599, "subtotal": 599 },
        { "furnitureId": "furn_a_08", "skuId": "sku_curtain_001", "name": "遮光窗帘", "quantity": 1, "unitPrice": 899, "subtotal": 899 }
      ],
      "roomSubtotal": 8592
    },
    {
      "roomId": "room_master",
      "roomName": "主卧",
      "items": [
        { "furnitureId": "furn_a_07", "skuId": "sku_bed_double_001", "name": "1.8m 双人床", "quantity": 1, "unitPrice": 2599, "subtotal": 2599 },
        { "furnitureId": "furn_a_08", "skuId": "sku_nightstand_001", "name": "床头柜", "quantity": 1, "unitPrice": 399, "subtotal": 399 },
        { "furnitureId": "furn_a_09", "skuId": "sku_wardrobe_001", "name": "推拉门衣柜", "quantity": 1, "unitPrice": 4599, "subtotal": 4599 },
        { "furnitureId": "furn_a_10", "skuId": "sku_desklamp_001", "name": "台灯", "quantity": 1, "unitPrice": 199, "subtotal": 199 },
        { "furnitureId": "furn_a_11", "skuId": "sku_mattress_001", "name": "1.8m 乳胶床垫", "quantity": 1, "unitPrice": 3299, "subtotal": 3299 },
        { "furnitureId": "furn_a_12", "skuId": "sku_curtain_002", "name": "纱帘", "quantity": 1, "unitPrice": 399, "subtotal": 399 }
      ],
      "roomSubtotal": 11494
    },
    {
      "roomId": "room_second",
      "roomName": "次卧",
      "items": [
        { "furnitureId": "furn_a_11", "skuId": "sku_bed_single_001", "name": "1.5m 单人床", "quantity": 1, "unitPrice": 1599, "subtotal": 1599 },
        { "furnitureId": "furn_a_12", "skuId": "sku_desk_001", "name": "书桌", "quantity": 1, "unitPrice": 599, "subtotal": 599 },
        { "furnitureId": "furn_a_13", "skuId": "sku_chair_001", "name": "人体工学椅", "quantity": 1, "unitPrice": 1899, "subtotal": 1899 },
        { "furnitureId": "furn_a_14", "skuId": "sku_wardrobe_002", "name": "双门衣柜", "quantity": 1, "unitPrice": 2899, "subtotal": 2899 },
        { "furnitureId": "furn_a_15", "skuId": "sku_mattress_002", "name": "1.5m 记忆棉床垫", "quantity": 1, "unitPrice": 2599, "subtotal": 2599 }
      ],
      "roomSubtotal": 9595
    },
    {
      "roomId": "room_kitchen",
      "roomName": "厨房",
      "items": [
        { "furnitureId": "furn_a_15", "skuId": "sku_cabinet_001", "name": "L型橱柜", "quantity": 1, "unitPrice": 3999, "subtotal": 3999 },
        { "furnitureId": "furn_a_16", "skuId": "sku_fridge_001", "name": "双门冰箱", "quantity": 1, "unitPrice": 3299, "subtotal": 3299 },
        { "furnitureId": "furn_a_17", "skuId": "sku_kitchentray_001", "name": "厨房置物架", "quantity": 1, "unitPrice": 399, "subtotal": 399 }
      ],
      "roomSubtotal": 7697
    },
    {
      "roomId": "room_bathroom",
      "roomName": "卫生间",
      "items": [
        { "furnitureId": "furn_a_17", "skuId": "sku_toilet_001", "name": "智能马桶", "quantity": 1, "unitPrice": 3999, "subtotal": 3999 },
        { "furnitureId": "furn_a_18", "skuId": "sku_washbasin_001", "name": "浴室柜", "quantity": 1, "unitPrice": 1899, "subtotal": 1899 },
        { "furnitureId": "furn_a_19", "skuId": "sku_shower_001", "name": "淋浴房", "quantity": 1, "unitPrice": 2599, "subtotal": 2599 },
        { "furnitureId": "furn_a_20", "skuId": "sku_heater_001", "name": "电热水器", "quantity": 1, "unitPrice": 1599, "subtotal": 1599 },
        { "furnitureId": "furn_a_21", "skuId": "sku_towelrack_001", "name": "毛巾架", "quantity": 1, "unitPrice": 299, "subtotal": 299 },
        { "furnitureId": "furn_a_22", "skuId": "sku_mirror_001", "name": "智能镜柜", "quantity": 1, "unitPrice": 1299, "subtotal": 1299 }
      ],
      "roomSubtotal": 11694
    },
    {
      "roomId": "room_balcony",
      "roomName": "阳台",
      "items": [
        { "furnitureId": "furn_a_20", "skuId": "sku_washing_001", "name": "滚筒洗衣机", "quantity": 1, "unitPrice": 2499, "subtotal": 2499 },
        { "furnitureId": "furn_a_21", "skuId": "sku_balconychair_001", "name": "休闲椅", "quantity": 1, "unitPrice": 699, "subtotal": 699 },
        { "furnitureId": "furn_a_22", "skuId": "sku_balconytable_001", "name": "小圆桌", "quantity": 1, "unitPrice": 399, "subtotal": 399 }
      ],
      "roomSubtotal": 3597
    }
  ],
  "summary": {
    "materialTotal": 52669,
    "laborFee": 7900,
    "managementFee": 4214,
    "designFee": 2633,
    "grandTotal": 67416
  }
}
```

### 7.2 报价计算规则

```
材料总价 = sum(各房间 items.subtotal)
人工费 = 材料总价 × 15%（laborRate）
管理费 = 材料总价 × 8%（managementFeeRate）
设计费 = 材料总价 × 5%（designFeeRate）
总价 = 材料总价 + 人工费 + 管理费 + 设计费
```

---

## 8. 用户操作流程

### 8.1 完整 Demo 操作路径

```
[Landing Page]
  ↓ 点击「开始设计」

[Step1 · 户型识别]
  → 系统自动加载默认两室一厅户型
  → 2D 俯视图展示户型轮廓
  → 点击「下一步」
  注：上传户型图按钮显示但点击弹出 toast "Demo 版本暂不支持"

[Step2 · 3D 建模]
  → 自动将户型 JSON 转为 Three.js 3D 场景
  → 墙体/门窗/地面 3D 渲染
  → 可旋转/缩放查看
  → 切换 2D/3D 视图
  → 点击「下一步」

[Step3 · AI 布局]
  → 显示风格选择卡片：默认「现代简约」已选中
  → 点击「生成布局」
  → 出现加载遮罩 + 进度条（~4秒）
  → 进度文字依次变化：「分析户型」→「规划空间」→「摆放家具」→「优化布局」
  → 加载完成后，家具以逐个动画出现
  → 可切换「方案A/方案B」
  → 点击「下一步」

[Step4 · 半自动编辑]
  → 进入 3D 编辑模式
  → 鼠标悬浮家具高亮
  → 拖拽家具移动（带网格吸附）
  → 旋转家具（选中后拖旋转手柄或按 R 键）
  → 右键家具弹出菜单：删除 / 替换 / 查看详情
  → 左侧面板：产品库浏览器（按分类筛选、搜索）
  → 从产品库拖拽家具到场景
  → 碰撞检测：放置时如果碰撞则红色提示并回弹
  → 编辑完成后点击「下一步」

[Step5 · AI 渲染]
  → 选择渲染风格：现代简约 / 北欧 / 工业风
  → 选择视角：客厅主视角（默认唯一选项）
  → 点击「生成渲染图」
  → 模拟进度条（~4秒）
  → 展示渲染效果图（picsum.photos 占位图）
  → 可切换风格重新生成
  → 点击「下一步」

[Step6 · 换品]
  → 回到 3D 编辑视图
  → 点击任意家具 → 右侧弹出「同类产品」面板
  → 面板显示产品库中同 category 的 SKU 列表
  → 选择新产品 → 场景中家具替换（动画过渡）
  → 报价实时更新
  → 点击「查看报价」

[Step7 · 报价]
  → 显示报价汇总页面
  → 按房间分组的 BOM 清单
  → 每个房间：产品名称、数量、单价、小计
  → 底部汇总：材料总价、人工费、管理费、设计费、总计
  → 「返回编辑」按钮回到 Step4
  → 「重新开始」按钮回到 Step1
```

### 8.2 步骤导航规则

- 顶部显示 Step1-7 步骤条（Stepper），当前步骤高亮
- 只能前进，不能跳步（Step4 后可自由切换 Step4/5/6）
- Step7 为终态，可返回编辑或重新开始
- 每个步骤有默认数据，首次进入即展示

### 8.3 关键交互状态

| 状态 | 触发 | 表现 |
|------|------|------|
| AI 加载中 | Step3/Step5 的 AI 操作 | 全屏遮罩 + 进度条 + 文字 |
| 家具选中 | 点击 3D 场景家具 | 高亮边框 + 属性面板 + 操作菜单 |
| 拖拽中 | 按住家具移动 | 半透明跟随鼠标 + 目标位置吸附线 |
| 碰撞 | 放置时重叠 | 红色闪烁 + 弹回原位 |
| 换品中 | 选择替代产品 | 旧产品淡出 + 新产品淡入 |

---

## 9. Demo 不做的功能清单

### 9.1 AI 能力（全部用 Mock 替代）

| 完整版功能 | 说明 |
|-----------|------|
| YOLOv8 户型图识别 | 图片上传后识别墙体/门窗/房间 |
| SAM 分割 | 从图片分割墙体 |
| RL 自动布局 | 强化学习生成最优布局方案 |
| SDXL 渲染 | AI 生成真实感渲染图 |
| AI 换品推荐 | 基于风格和预算的智能推荐 |
| AI 风格匹配 | 图片到风格的自动分析 |

### 9.2 数据能力

| 完整版功能 | 说明 |
|-----------|------|
| 真实产品库 | 对接 ERP/PLM 系统的海量 SKU |
| 产品库搜索 | 语义搜索 + 图片搜索 |
| 价格实时同步 | 对接供应链价格系统 |
| 用户账号系统 | 登录/注册/项目保存 |
| 项目云存储 | 设计方案持久化 |

### 9.3 编辑能力

| 完整版功能 | 说明 |
|-----------|------|
| 撤销/重做 | Undo/Redo 栈 |
| 批量操作 | 多选家具批量移动/删除 |
| 智能对齐 | 参考线对齐 |
| 手动绘制户型 | 自由绘制墙体/门窗 |
| 材质编辑 | 更换墙面/地面材质 |
| 灯光调节 | 调整灯光参数 |
| 多层编辑 | 天花板/地面分层 |

### 9.4 输出能力

| 完整版功能 | 说明 |
|-----------|------|
| 报价导出 PDF | 生成 PDF 报价单 |
| 报价导出 Excel | 生成 Excel BOM 表 |
| 户型导出 IFC | BIM 格式导出 |
| VR 漫游 | WebXR 沉浸式浏览 |
| 分享链接 | 生成分享链接 |

### 9.5 渲染能力

| 完整版功能 | 说明 |
|-----------|------|
| 多视角渲染 | 任意视角生成渲染图 |
| 全景图 | 360° 全景渲染 |
| 夜景渲染 | 昼夜灯光切换 |
| 渲染图下载 | 高清图下载 |

---

## 10. 技术约束备忘

| 项目 | 约束 |
|------|------|
| 技术栈 | React 18 + Three.js + Vite + TypeScript |
| UI 库 | MUI v5 + Tailwind CSS |
| 状态管理 | Zustand |
| 3D 引擎 | Three.js + React Three Fiber |
| 数据 | 全部前端 mock，无后端 |
| 部署 | 静态部署（Vercel/GitHub Pages） |
| 浏览器 | Chrome 120+ / Edge 120+ |
| 分辨率 | 1920×1080 为主要适配 |
| 性能 | 3D 场景 FPS ≥ 30 |
