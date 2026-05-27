import React, { useRef } from 'react';
import * as THREE from 'three';
import { ThreeEvent } from '@react-three/fiber';
import useAppStore from '@/store/useAppStore';
import type { FurnitureInstance, ProductSKU } from '@/types';

interface FurnitureMeshProps {
  furniture: FurnitureInstance;
  isSelected: boolean;
  interactive?: boolean;
  onClick?: (id: string) => void;
}

/**
 * 家具 3D 网格
 * 使用 BoxGeometry + modelColor 渲染家具
 * 户型 JSON (x, y, z) → Three.js (x, z, y)
 * 其中 furniture.position.y 对应 3D 的 Z 轴，furniture.size.height 对应 3D 的 Y 轴
 */
const FurnitureMesh: React.FC<FurnitureMeshProps> = ({
  furniture,
  isSelected,
  interactive = false,
  onClick,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);  const productCatalog = useAppStore((s) => s.productCatalog);

  // 查找对应的 SKU 以获取 modelColor
  const sku: ProductSKU | undefined = productCatalog.find((p) => p.id === furniture.skuId);
  const modelColor = sku?.modelColor || '#8B8682';

  // 3D 坐标映射：
  // position.x → 3D x
  // position.y → 3D z (户型 JSON 的 y 对应 3D 的 z)
  // position.z → 3D y (高度，但家具在地面上，所以 size.height/2 作为 3D y)
  const posX = furniture.position.x;
  const posY = furniture.size.height / 2 + furniture.position.z; // 高度偏移
  const posZ = furniture.position.y;
  const rotY = (furniture.rotation.y * Math.PI) / 180;

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    if (interactive && onClick) {
      e.stopPropagation();
      onClick(furniture.id);
    }
  };

  return (
    <group position={[posX, posY, posZ]} rotation={[0, rotY, 0]}>
      {/* 家具主体 */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => {
          if (interactive) {
            document.body.style.cursor = 'pointer';
          }
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
        castShadow
      >
        <boxGeometry args={[furniture.size.width, furniture.size.height, furniture.size.depth]} />
        <meshStandardMaterial
          color={modelColor}
          opacity={0.9}
          transparent
        />
      </mesh>
      {/* 选中高亮边框 */}
      {isSelected && (
        <mesh>
          <boxGeometry
            args={[
              furniture.size.width + 0.05,
              furniture.size.height + 0.05,
              furniture.size.depth + 0.05,
            ]}
          />
          <meshBasicMaterial color="#ff9800" wireframe opacity={0.8} transparent />
        </mesh>
      )}
    </group>
  );
};

export default FurnitureMesh;
