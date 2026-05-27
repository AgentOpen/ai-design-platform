import React from 'react';
import type { Window as WindowType, Wall as WallType } from '@/types';

interface WindowMeshProps {
  window: WindowType;
  walls: WallType[];
}

/**
 * 窗户 3D 网格
 * 在墙体上用半透明材质标识窗户位置
 * 户型 JSON (x, y) → Three.js (x, 0, y)
 */
const WindowMesh: React.FC<WindowMeshProps> = ({ window: win, walls }) => {
  const wall = walls.find((w) => w.id === win.wallId);
  if (!wall) return null;

  const { start, end } = wall;

  // 墙体方向
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const angle = Math.atan2(dy, dx);

  // 窗户在墙体上的位置
  const winCenterX = start.x + dx * win.position;
  const winCenterZ = start.y + dy * win.position;
  const winY = win.sillHeight + win.height / 2;

  return (
    <group position={[winCenterX, winY, winCenterZ]} rotation={[0, -angle, 0]}>
      <mesh>
        <boxGeometry args={[win.width, win.height, wall.thickness + 0.03]} />
        <meshStandardMaterial
          color="#87CEEB"
          opacity={0.4}
          transparent
        />
      </mesh>
    </group>
  );
};

export default WindowMesh;
