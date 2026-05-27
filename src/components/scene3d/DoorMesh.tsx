import React from 'react';
import type { Door as DoorType, Wall as WallType } from '@/types';

interface DoorMeshProps {
  door: DoorType;
  walls: WallType[];
}

/**
 * 门 3D 网格
 * 在墙体上用不同颜色标识门的位置
 * 户型 JSON (x, y) → Three.js (x, 0, y)
 */
const DoorMesh: React.FC<DoorMeshProps> = ({ door, walls }) => {
  const wall = walls.find((w) => w.id === door.wallId);
  if (!wall) return null;

  const { start, end } = wall;

  // 墙体方向
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx);

  // 门在墙体上的位置
  const doorCenterX = start.x + dx * door.position;
  const doorCenterZ = start.y + dy * door.position;
  const doorY = door.height / 2;

  return (
    <group position={[doorCenterX, doorY, doorCenterZ]} rotation={[0, -angle, 0]}>
      <mesh>
        <boxGeometry args={[door.width, door.height, wall.thickness + 0.02]} />
        <meshStandardMaterial color="#8B6914" opacity={0.8} transparent />
      </mesh>
    </group>
  );
};

export default DoorMesh;
