// ==================== 基础类型 ====================

export interface Point2D {
  x: number;
  y: number;
}

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface Size3D {
  width: number;  // 沿 X 轴
  depth: number;  // 沿 Y 轴（映射到 3D 的 Z 轴）
  height: number; // 沿 Z 轴（竖直向上，映射到 3D 的 Y 轴）
}

// ==================== 户型相关 ====================

export interface Wall {
  id: string;
  start: Point2D;
  end: Point2D;
  thickness: number;
  height: number;
}

export interface Door {
  id: string;
  wallId: string;
  position: number; // 0-1, 门在墙体上的位置比例
  width: number;
  height: number;
  type: 'swing' | 'sliding' | 'pocket';
  direction: 'inward' | 'outward';
}

export interface Window {
  id: string;
  wallId: string;
  position: number; // 0-1
  width: number;
  height: number;
  sillHeight: number;
}

export interface Room {
  id: string;
  name: string;
  type: 'living_room' | 'master_bedroom' | 'second_bedroom' | 'kitchen' | 'bathroom' | 'balcony';
  floorPolygon: Point2D[];
  area: number;
  floorMaterial: string;
}

export interface FloorPlan {
  id: string;
  name: string;
  totalArea: number;
  ceilingHeight: number;
  unit: string;
  origin: Point2D;
  walls: Wall[];
  doors: Door[];
  windows: Window[];
  rooms: Room[];
}

// ==================== 家具与布局 ====================

export interface FurnitureInstance {
  id: string;
  roomId: string;
  skuId: string;
  name: string;
  position: Point3D;
  rotation: Point3D;
  size: Size3D;
}

export interface LayoutScheme {
  id: string;
  name: string;
  style: string;
  floorPlanId: string;
  furniture: FurnitureInstance[];
}

// ==================== 产品库 ====================

export interface ProductSKU {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  brand: string;
  style: string[];
  size: Size3D;
  color: string;
  material: string;
  price: number;
  unit: string;
  imageUrl: string;
  modelColor: string;
}

// ==================== 报价 ====================

export interface QuotationItem {
  furnitureId: string;
  skuId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface QuotationRoom {
  roomId: string;
  roomName: string;
  items: QuotationItem[];
  roomSubtotal: number;
}

export interface QuotationSummary {
  materialTotal: number;
  laborFee: number;
  managementFee: number;
  designFee: number;
  grandTotal: number;
}

export interface Quotation {
  id: string;
  name: string;
  layoutSchemeId: string;
  createdAt: string;
  laborRate: number;
  managementFeeRate: number;
  designFeeRate: number;
  rooms: QuotationRoom[];
  summary: QuotationSummary;
}

// ==================== 渲染 ====================

export interface RenderStyle {
  id: string;
  name: string;
  imageUrl: string;
}

// ==================== 碰撞检测 ====================

export interface AABB {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export interface CollisionResult {
  isColliding: boolean;
  collidingWith: string[]; // furniture IDs
}

// ==================== App 状态 ====================

export type ViewMode = '2d' | '3d';
export type StepNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface AppState {
  // 步骤控制
  currentStep: StepNumber;

  // 户型数据
  floorPlan: FloorPlan | null;

  // 布局数据
  currentLayout: LayoutScheme | null;
  furniture: FurnitureInstance[];
  selectedFurnitureId: string | null;

  // 产品库
  productCatalog: ProductSKU[];

  // 3D 场景控制
  showCeiling: boolean;
  viewMode: ViewMode;

  // 报价
  quotation: Quotation | null;

  // AI 渲染
  renderStyles: RenderStyle[];
  selectedRenderStyle: string;
  renderImageUrl: string | null;

  // 加载状态
  isLoading: boolean;
  loadingProgress: number;
  loadingText: string;

  // Actions
  setCurrentStep: (step: StepNumber) => void;
  setFloorPlan: (plan: FloorPlan) => void;
  setCurrentLayout: (layout: LayoutScheme) => void;
  setFurniture: (furniture: FurnitureInstance[]) => void;
  addFurniture: (item: FurnitureInstance) => void;
  updateFurniturePosition: (id: string, position: Point3D) => void;
  updateFurnitureRotation: (id: string, rotation: Point3D) => void;
  removeFurniture: (id: string) => void;
  replaceFurniture: (id: string, newSku: ProductSKU) => void;
  setSelectedFurnitureId: (id: string | null) => void;
  setShowCeiling: (show: boolean) => void;
  setViewMode: (mode: ViewMode) => void;
  setQuotation: (q: Quotation) => void;
  setLoading: (loading: boolean) => void;
  setLoadingProgress: (progress: number) => void;
  setLoadingText: (text: string) => void;
  setRenderImageUrl: (url: string | null) => void;
  setSelectedRenderStyle: (style: string) => void;
}
