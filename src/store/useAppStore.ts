import { create } from 'zustand';
import type { AppState, StepNumber, FloorPlan, LayoutScheme, FurnitureInstance, ProductSKU, Point3D, Quotation, ViewMode } from '@/types';
import productCatalogData from '@/mock/productCatalog.json';

const useAppStore = create<AppState>((set) => ({
  // 步骤控制
  currentStep: 1 as StepNumber,

  // 户型数据
  floorPlan: null,

  // 布局数据
  currentLayout: null,
  furniture: [],
  selectedFurnitureId: null,

  // 产品库
  productCatalog: productCatalogData as ProductSKU[],

  // 3D 场景控制
  showCeiling: false,
  viewMode: '3d' as ViewMode,

  // 报价
  quotation: null,

  // AI 渲染
  renderStyles: [
    { id: 'modern_minimalist', name: '现代简约', imageUrl: 'https://picsum.photos/seed/style_modern/300/200' },
    { id: 'nordic', name: '北欧风格', imageUrl: 'https://picsum.photos/seed/style_nordic/300/200' },
    { id: 'industrial', name: '工业风格', imageUrl: 'https://picsum.photos/seed/style_industrial/300/200' },
  ],
  selectedRenderStyle: 'modern_minimalist',
  renderImageUrl: null,

  // 加载状态
  isLoading: false,
  loadingProgress: 0,
  loadingText: '',

  // Actions
  setCurrentStep: (step: StepNumber) => set({ currentStep: step }),

  setFloorPlan: (plan: FloorPlan) => set({ floorPlan: plan }),

  setCurrentLayout: (layout: LayoutScheme) => set({ currentLayout: layout }),

  setFurniture: (furniture: FurnitureInstance[]) => set({ furniture }),

  addFurniture: (item: FurnitureInstance) => set((state) => ({
    furniture: [...state.furniture, item],
  })),

  updateFurniturePosition: (id: string, position: Point3D) => set((state) => ({
    furniture: state.furniture.map((f) =>
      f.id === id ? { ...f, position } : f
    ),
  })),

  updateFurnitureRotation: (id: string, rotation: Point3D) => set((state) => ({
    furniture: state.furniture.map((f) =>
      f.id === id ? { ...f, rotation } : f
    ),
  })),

  removeFurniture: (id: string) => set((state) => ({
    furniture: state.furniture.filter((f) => f.id !== id),
    selectedFurnitureId: state.selectedFurnitureId === id ? null : state.selectedFurnitureId,
  })),

  replaceFurniture: (id: string, newSku: ProductSKU) => set((state) => ({
    furniture: state.furniture.map((f) =>
      f.id === id
        ? {
            ...f,
            skuId: newSku.id,
            name: newSku.name,
            size: newSku.size,
          }
        : f
    ),
  })),

  setSelectedFurnitureId: (id: string | null) => set({ selectedFurnitureId: id }),

  setShowCeiling: (show: boolean) => set({ showCeiling: show }),

  setViewMode: (mode: ViewMode) => set({ viewMode: mode }),

  setQuotation: (q: Quotation) => set({ quotation: q }),

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  setLoadingProgress: (progress: number) => set({ loadingProgress: progress }),

  setLoadingText: (text: string) => set({ loadingText: text }),

  setRenderImageUrl: (url: string | null) => set({ renderImageUrl: url }),

  setSelectedRenderStyle: (style: string) => set({ selectedRenderStyle: style }),
}));

export default useAppStore;
