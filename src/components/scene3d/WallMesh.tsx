import React from 'react';
import type { Wall as WallType } from '@/types';

interface WallMeshProps {
  wall: WallType;
}

/**
 * 墙体 3D 网格
 * 根据墙体起点/终点计算位置和尺寸，使用 BoxGeometry 渲染
 * 户型 JSON (x, y) → Three.js (x, 0, y)
 */
const WallMesh: React.FC<WallMeshProps> = ({ wall }) => {
  const { start, end, thickness, height } = wall;

  // 计算墙体中心点
  const centerX = (start.x + end.x) / 2;
  const centerZ = (start.y + end.y) / 2;

  // 计算墙体长度
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.sqrt(dx * dx + dy * dy);

  // 计算墙体旋转角度（绕 Y 轴）
  const angle = Math.atan2(dy, dx);

  return (
    <group position={[centerX, height / 2, centerZ]} rotation={[0, -angle, 0]}>
      <mesh>
        <boxGeometry args={[length, height, thickness]} />
        <meshStandardMaterial color="#e0dcd5" />
      </mesh>
    </group>
  );
};

export default WallMesh;
