import React, { useMemo } from 'react';
import * as THREE from 'three';
import type { Room as RoomType } from '@/types';

interface FloorMeshProps {
  room: RoomType;
}

/**
 * 地面 3D 网格
 * 根据 Room.floorPolygon 使用 ShapeGeometry 渲染地面
 * 户型 JSON (x, y) → Three.js (x, 0, y)
 */
const FloorMesh: React.FC<FloorMeshProps> = ({ room }) => {
  const { floorPolygon, floorMaterial } = room;

  const color = useMemo(() => {
    switch (floorMaterial) {
      case 'wood_light': return '#DEB887';
      case 'tile_white': return '#F5F5F5';
      case 'tile_wood': return '#C4A882';
      default: return '#D2B48C';
    }
  }, [floorMaterial]);

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
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]} receiveShadow>
      <shapeGeometry args={[shape]} />
      <meshStandardMaterial color={color} side={THREE.DoubleSide} />
    </mesh>
  );
};

export default FloorMesh;
