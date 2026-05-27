import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import WallMesh from './WallMesh';
import DoorMesh from './DoorMesh';
import WindowMesh from './WindowMesh';
import FloorMesh from './FloorMesh';
import CeilingMesh from './CeilingMesh';
import FurnitureMesh from './FurnitureMesh';
import useAppStore from '@/store/useAppStore';
import type { FloorPlan, FurnitureInstance } from '@/types';

interface Scene3DProps {
  floorPlan: FloorPlan;
  furniture?: FurnitureInstance[];
  interactive?: boolean;
  onFurnitureClick?: (id: string) => void;
}

const Scene3D: React.FC<Scene3DProps> = ({
  floorPlan,
  furniture = [],
  interactive = false,
  onFurnitureClick,
}) => {
  const showCeiling = useAppStore((s) => s.showCeiling);
  const selectedFurnitureId = useAppStore((s) => s.selectedFurnitureId);

  return (
    <Canvas
      camera={{ position: [10, 12, 10], fov: 50, near: 0.1, far: 100 }}
      style={{ background: '#e8e8e8' }}
      onPointerMissed={() => {
        if (interactive) {
          useAppStore.getState().setSelectedFurnitureId(null);
        }
      }}
    >
      {/* 灯光 */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 15, 10]} intensity={0.8} castShadow />
      <directionalLight position={[-5, 10, -5]} intensity={0.3} />

      {/* 相机控制 */}
      <OrbitControls
        makeDefault
        maxPolarAngle={Math.PI / 2}
        minDistance={2}
        maxDistance={30}
      />

      {/* 网格辅助线 */}
      <gridHelper args={[20, 20, '#cccccc', '#e0e0e0']} position={[5, 0, 4.3]} />

      {/* 墙体 */}
      {floorPlan.walls.map((wall) => (
        <WallMesh key={wall.id} wall={wall} />
      ))}

      {/* 门 */}
      {floorPlan.doors.map((door) => (
        <DoorMesh key={door.id} door={door} walls={floorPlan.walls} />
      ))}

      {/* 窗户 */}
      {floorPlan.windows.map((win) => (
        <WindowMesh key={win.id} window={win} walls={floorPlan.walls} />
      ))}

      {/* 地面 */}
      {floorPlan.rooms.map((room) => (
        <FloorMesh key={room.id} room={room} />
      ))}

      {/* 天花板 */}
      {showCeiling &&
        floorPlan.rooms.map((room) => (
          <CeilingMesh key={`ceiling_${room.id}`} room={room} ceilingHeight={floorPlan.ceilingHeight} />
        ))}

      {/* 家具 */}
      {furniture.map((furn) => (
        <FurnitureMesh
          key={furn.id}
          furniture={furn}
          isSelected={furn.id === selectedFurnitureId}
          interactive={interactive}
          onClick={onFurnitureClick}
        />
      ))}
    </Canvas>
  );
};

export default Scene3D;
