import useAppStore from '@/store/useAppStore';
import layoutSchemeAData from '@/mock/layoutSchemeA.json';
import layoutSchemeBData from '@/mock/layoutSchemeB.json';
import renderImagesData from '@/mock/renderImages.json';
import type { LayoutScheme, RenderStyle } from '@/types';

/**
 * 延迟工具函数
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 非线性进度模拟：ease-in-out 曲线
 * @param from 起始进度
 * @param to 目标进度
 * @param duration 总时长(ms)
 */
export async function simulateProgress(
  from: number,
  to: number,
  duration: number
): Promise<void> {
  const steps = 20;
  const stepDuration = duration / steps;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // ease-in-out 二次曲线
    const eased = t < 0.5
      ? 2 * t * t
      : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const progress = from + (to - from) * eased;
    useAppStore.getState().setLoadingProgress(Math.round(progress));
    await sleep(stepDuration);
  }
}

/**
 * 模拟 AI 布局
 */
export async function simulateAILayout(style: string): Promise<LayoutScheme> {
  const store = useAppStore.getState();

  // 1. 开始加载
  store.setLoading(true);
  store.setLoadingProgress(0);
  store.setLoadingText('分析户型...');

  // 2. 模拟延迟 + 进度推进
  await simulateProgress(0, 30, 1000);
  store.setLoadingText('规划空间...');
  await simulateProgress(30, 70, 1500);
  store.setLoadingText('摆放家具...');
  await simulateProgress(70, 95, 800);
  store.setLoadingText('优化布局...');
  await simulateProgress(95, 100, 500);

  // 3. 加载预设结果
  const schemeData = style === 'modern_minimalist' ? layoutSchemeAData : layoutSchemeBData;
  const scheme = schemeData as LayoutScheme;

  store.setCurrentLayout(scheme);
  store.setFurniture(scheme.furniture);
  store.setLoading(false);

  // 4. 逐个家具出现动画（每件 200ms）
  for (let i = 0; i < scheme.furniture.length; i++) {
    await sleep(200);
  }

  return scheme;
}

/**
 * 模拟 AI 渲染
 */
export async function simulateAIRender(style: string): Promise<string> {
  const store = useAppStore.getState();

  // 1. 开始加载
  store.setLoading(true);
  store.setLoadingProgress(0);
  store.setLoadingText('构建3D场景...');

  // 2. 模拟延迟
  await simulateProgress(0, 20, 600);
  store.setLoadingText('AI 正在生成渲染图...');
  await simulateProgress(20, 80, 2500);
  store.setLoadingText('优化画质...');
  await simulateProgress(80, 100, 900);

  // 3. 返回预设图片 URL
  const renderImages = renderImagesData as Record<string, string>;
  const imageUrl = renderImages[style] || renderImages['modern_minimalist'];

  store.setRenderImageUrl(imageUrl);
  store.setLoading(false);

  return imageUrl;
}
