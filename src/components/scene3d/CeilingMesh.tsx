import React, { useMemo } from 'react';
import * as THREE from 'three';
import type { Room as RoomType } from '@/types';

interface CeilingMeshProps {
  room: RoomType;
  ceilingHeight: number;
}

/**
 * 天花板 3D 网格
 * 根据 Room.floorPolygon 渲染天花板，位置在 ceilingHeight 高度
 * 户型 JSON (x, y) → Three.js (x, ceilingHeight, y)
 */
const CeilingMesh: React.FC<CeilingMeshProps> = ({ room, ceilingHeight }) => {
  const { floorPolygon } = room;

  const shape = useMemo(() => {
    const s = new THREE.Shape();
    if (floorPolygon.length === 0) return s;
    s.moveTo(floorPolygon[0].x, floorPolygon[0].y);
    for (let i = 1; i < floorPolygon.length; i++) {
      s.lineTo(floorPolygon[i].x, floorPolygon[i].y);
    }
    s.closePath();
    return s;
  }, [floorPolygon]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, ceilingHeight, 0]}>
      <shapeGeometry args={[shape]} />
      <meshStandardMaterial color="#FAFAFA" side={THREE.DoubleSide} opacity={0.7} transparent />
    </mesh>
  );
};

export default CeilingMesh;
