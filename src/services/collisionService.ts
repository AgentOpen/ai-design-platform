import type { FurnitureInstance, AABB, CollisionResult } from '@/types';

/**
 * 计算家具的 AABB 包围盒
 * 注意：FurnitureInstance.position.y 在户型 JSON 中对应 3D 空间的 Z 轴
 * AABB 的 minX/maxX 对应 3D X 轴，minY/maxY 对应 3D Z 轴（即 JSON 的 y）
 */
export function computeAABB(furniture: FurnitureInstance): AABB {
  const { position, size, rotation } = furniture;
  const rotY = rotation.y * (Math.PI / 180);

  // 旋转后的宽深
  const cosR = Math.abs(Math.cos(rotY));
  const sinR = Math.abs(Math.sin(rotY));
  const rotatedWidth = size.width * cosR + size.depth * sinR;
  const rotatedDepth = size.width * sinR + size.depth * cosR;

  return {
    minX: position.x - rotatedWidth / 2,
    maxX: position.x + rotatedWidth / 2,
    minY: position.y - rotatedDepth / 2,
    maxY: position.y + rotatedDepth / 2,
  };
}

/**
 * 检测两个 AABB 是否重叠
 */
export function checkAABBOverlap(a: AABB, b: AABB): boolean {
  return a.minX < b.maxX && a.maxX > b.minX &&
         a.minY < b.maxY && a.maxY > b.minY;
}

/**
 * 检测目标家具与所有其他家具的碰撞
 */
export function detectCollisions(
  targetId: string,
  allFurniture: FurnitureInstance[]
): CollisionResult {
  const target = allFurniture.find((f) => f.id === targetId);
  if (!target) return { isColliding: false, collidingWith: [] };

  const targetAABB = computeAABB(target);
  const collidingWith: string[] = [];

  for (const f of allFurniture) {
    if (f.id === targetId) continue;
    const fAABB = computeAABB(f);
    if (checkAABBOverlap(targetAABB, fAABB)) {
      collidingWith.push(f.id);
    }
  }

  return {
    isColliding: collidingWith.length > 0,
    collidingWith,
  };
}

/**
 * 网格吸附：将坐标吸附到 0.1m 网格
 */
export function snapToGrid(value: number, gridSize: number = 0.1): number {
  return Math.round(value / gridSize) * gridSize;
}
