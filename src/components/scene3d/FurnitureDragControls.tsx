import React, { useRef, useCallback } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import useAppStore from '@/store/useAppStore';
import { detectCollisions, snapToGrid } from '@/services/collisionService';
import type { FurnitureInstance, Point3D } from '@/types';

interface FurnitureDragControlsProps {
  furniture: FurnitureInstance[];
  children: React.ReactNode;
}

/**
 * 家具拖拽控制组件
 * 实现：选中家具 → 拖拽移动 → 碰撞检测 → 网格吸附 → 更新 Store
 */
const FurnitureDragControls: React.FC<FurnitureDragControlsProps> = ({ children }) => {
  const draggingId = useRef<string | null>(null);
  const dragStartPos = useRef<Point3D | null>(null);

  const updateFurniturePosition = useAppStore((s) => s.updateFurniturePosition);
  const setSelectedFurnitureId = useAppStore((s) => s.setSelectedFurnitureId);
  const furniture = useAppStore((s) => s.furniture);

  const handlePointerDown = useCallback(
    (furnitureId: string) => {
      draggingId.current = furnitureId;
      setSelectedFurnitureId(furnitureId);

      const item = furniture.find((f) => f.id === furnitureId);
      if (item) {
        dragStartPos.current = { ...item.position };
      }
    },
    [furniture, setSelectedFurnitureId]
  );

  const handlePointerMove = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (!draggingId.current) return;

      // raycaster 与地面求交
      if (e.point) {
        const point = e.point;
        // 网格吸附
        const snappedX = snapToGrid(point.x);
        const snappedZ = snapToGrid(point.z);

        // 碰撞检测
        const allFurniture = useAppStore.getState().furniture;
        const current = allFurniture.find((f) => f.id === draggingId.current);
        if (!current) return;

        const movedFurniture: FurnitureInstance = {
          ...current,
          position: { x: snappedX, y: snappedZ, z: current.position.z },
        };

        const allWithMoved = allFurniture.map((f) =>
          f.id === draggingId.current ? movedFurniture : f
        );

        const collision = detectCollisions(draggingId.current, allWithMoved);
        if (!collision.isColliding) {
          updateFurniturePosition(draggingId.current, {
            x: snappedX,
            y: snappedZ,
            z: current.position.z,
          });
        }
      }
    },
    [updateFurniturePosition]
  );

  const handlePointerUp = useCallback(() => {
    draggingId.current = null;
    dragStartPos.current = null;
  }, []);

  return (
    <group
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {children}
    </group>
  );
};

export default FurnitureDragControls;
