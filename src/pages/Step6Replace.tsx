import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useAppStore from '@/store/useAppStore';
import Scene3D from '@/components/scene3d/Scene3D';
import ReplaceProductPanel from '@/components/panels/ReplaceProductPanel';
import { calculateQuotation } from '@/services/quotationService';

const Step6Replace: React.FC = () => {
  const floorPlan = useAppStore((s) => s.floorPlan);
  const furniture = useAppStore((s) => s.furniture);
  const selectedFurnitureId = useAppStore((s) => s.selectedFurnitureId);
  const setSelectedFurnitureId = useAppStore((s) => s.setSelectedFurnitureId);
  const productCatalog = useAppStore((s) => s.productCatalog);
  const setQuotation = useAppStore((s) => s.setQuotation);
  const setCurrentStep = useAppStore((s) => s.setCurrentStep);

  const handleFurnitureClick = (id: string) => {
    setSelectedFurnitureId(id);
  };

  const handleViewQuotation = () => {
    // 计算报价
    if (floorPlan) {
      const quotation = calculateQuotation(
        furniture,
        productCatalog,
        floorPlan.rooms.map((r) => ({ id: r.id, name: r.name }))
      );
      setQuotation(quotation);
    }
    setCurrentStep(7);
  };

  if (!floorPlan) {
    return (
      <Box className="flex items-center justify-center h-full">
        <Typography color="text.secondary">请先完成前序步骤</Typography>
      </Box>
    );
  }

  return (
    <Box className="flex flex-col h-full">
      {/* 顶部工具栏 */}
      <Box className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
        <Typography variant="h6" fontWeight="bold">
          Step 6 · 换品
        </Typography>
        <Button variant="contained" endIcon={<ArrowForwardIcon />} onClick={handleViewQuotation}>
          查看报价
        </Button>
      </Box>

      {/* 内容区 */}
      <Box className="flex-1 flex">
        {/* 中间 3D 场景 */}
        <Box className="flex-1">
          <Scene3D
            floorPlan={floorPlan}
            furniture={furniture}
            interactive
            onFurnitureClick={handleFurnitureClick}
          />
        </Box>

        {/* 右侧换品面板 */}
        <ReplaceProductPanel furnitureId={selectedFurnitureId} />
      </Box>
    </Box>
  );
};

export default Step6Replace;
