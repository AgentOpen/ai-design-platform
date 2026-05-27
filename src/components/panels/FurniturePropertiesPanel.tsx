import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import useAppStore from '@/store/useAppStore';

/**
 * 家具属性面板
 * 展示选中家具的名称、尺寸、价格等属性
 */
const FurniturePropertiesPanel: React.FC = () => {
  const selectedFurnitureId = useAppStore((s) => s.selectedFurnitureId);
  const furniture = useAppStore((s) => s.furniture);
  const productCatalog = useAppStore((s) => s.productCatalog);

  const selected = furniture.find((f) => f.id === selectedFurnitureId);
  if (!selected) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          请选择一个家具查看属性
        </Typography>
      </Box>
    );
  }

  const sku = productCatalog.find((p) => p.id === selected.skuId);

  return (
    <Box sx={{ p: 2, width: 240 }} className="bg-panel-bg">
      <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
        家具属性
      </Typography>
      <Divider sx={{ mb: 1 }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Typography variant="body2">
          <strong>名称：</strong>{selected.name}
        </Typography>
        {sku && (
          <>
            <Typography variant="body2">
              <strong>品牌：</strong>{sku.brand}
            </Typography>
            <Typography variant="body2">
              <strong>颜色：</strong>{sku.color}
            </Typography>
            <Typography variant="body2">
              <strong>材质：</strong>{sku.material}
            </Typography>
            <Typography variant="body2">
              <strong>价格：</strong>¥{sku.price}
            </Typography>
          </>
        )}
        <Divider sx={{ my: 0.5 }} />
        <Typography variant="body2">
          <strong>尺寸：</strong>
          {selected.size.width}×{selected.size.depth}×{selected.size.height}m
        </Typography>
        <Typography variant="body2">
          <strong>位置：</strong>
          ({selected.position.x.toFixed(1)}, {selected.position.y.toFixed(1)}, {selected.position.z.toFixed(1)})
        </Typography>
        <Typography variant="body2">
          <strong>旋转：</strong>{selected.rotation.y}°
        </Typography>
      </Box>
    </Box>
  );
};

export default FurniturePropertiesPanel;
