import React, { useMemo } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import useAppStore from '@/store/useAppStore';
import { calculateQuotation } from '@/services/quotationService';
import type { ProductSKU } from '@/types';

interface ReplaceProductPanelProps {
  furnitureId: string | null;
}

/**
 * 换品面板（Step6 专用）
 * 显示选中家具的同 category SKU 列表，选择替换
 */
const ReplaceProductPanel: React.FC<ReplaceProductPanelProps> = ({ furnitureId }) => {
  const furniture = useAppStore((s) => s.furniture);
  const productCatalog = useAppStore((s) => s.productCatalog);
  const replaceFurniture = useAppStore((s) => s.replaceFurniture);
  const setQuotation = useAppStore((s) => s.setQuotation);
  const floorPlan = useAppStore((s) => s.floorPlan);

  const selected = furniture.find((f) => f.id === furnitureId);
  const currentSku = productCatalog.find((p) => p.id === selected?.skuId);

  // 筛选同 category 的 SKU
  const sameCategoryProducts = useMemo(() => {
    if (!currentSku) return [];
    return productCatalog.filter(
      (p) => p.category === currentSku.category && p.id !== currentSku.id
    );
  }, [currentSku, productCatalog]);

  const handleReplace = (newSku: ProductSKU) => {
    if (!furnitureId) return;
    replaceFurniture(furnitureId, newSku);

    // 重新计算报价
    if (floorPlan) {
      const updatedFurniture = useAppStore.getState().furniture;
      const newQuotation = calculateQuotation(
        updatedFurniture,
        productCatalog,
        floorPlan.rooms.map((r) => ({ id: r.id, name: r.name }))
      );
      setQuotation(newQuotation);
    }
  };

  if (!selected || !currentSku) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }} className="bg-panel-bg h-full">
        <Typography variant="body2" color="text.secondary">
          请点击场景中的家具进行换品
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: 280 }} className="bg-panel-bg h-full flex flex-col">
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
          当前产品
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
          <Avatar src={currentSku.imageUrl} variant="rounded" sx={{ width: 48, height: 48 }} />
          <Box>
            <Typography variant="body2" fontWeight="bold">{currentSku.name}</Typography>
            <Typography variant="caption" color="primary">¥{currentSku.price}</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ px: 2, pb: 1 }}>
        <Typography variant="subtitle2" fontWeight="bold">
          同类替换
        </Typography>
      </Box>

      <List sx={{ flex: 1, overflow: 'auto', px: 1 }}>
        {sameCategoryProducts.length === 0 ? (
          <ListItem>
            <ListItemText
              primary="暂无同类产品"
              primaryTypographyProps={{ fontSize: 12, color: 'text.secondary' }}
            />
          </ListItem>
        ) : (
          sameCategoryProducts.map((sku) => (
            <ListItem
              key={sku.id}
              secondaryAction={
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<SwapHorizIcon />}
                  onClick={() => handleReplace(sku)}
                >
                  替换
                </Button>
              }
              sx={{ px: 1, py: 0.5 }}
            >
              <ListItemAvatar>
                <Avatar src={sku.imageUrl} variant="rounded" sx={{ width: 36, height: 36 }} />
              </ListItemAvatar>
              <ListItemText
                primary={sku.name}
                secondary={`¥${sku.price}`}
                primaryTypographyProps={{ fontSize: 12 }}
                secondaryTypographyProps={{ fontSize: 11, color: '#1976d2' }}
              />
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

export default ReplaceProductPanel;
