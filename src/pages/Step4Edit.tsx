import React, { useState, useCallback } from 'react';
import { Box, Button, Typography, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import InfoIcon from '@mui/icons-material/Info';
import useAppStore from '@/store/useAppStore';
import Scene3D from '@/components/scene3d/Scene3D';
import ProductLibraryPanel from '@/components/panels/ProductLibraryPanel';
import FurniturePropertiesPanel from '@/components/panels/FurniturePropertiesPanel';

const Step4Edit: React.FC = () => {
  const floorPlan = useAppStore((s) => s.floorPlan);
  const furniture = useAppStore((s) => s.furniture);
  const selectedFurnitureId = useAppStore((s) => s.selectedFurnitureId);
  const setSelectedFurnitureId = useAppStore((s) => s.setSelectedFurnitureId);
  const removeFurniture = useAppStore((s) => s.removeFurniture);
  const updateFurnitureRotation = useAppStore((s) => s.updateFurnitureRotation);
  const setCurrentStep = useAppStore((s) => s.setCurrentStep);

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleFurnitureClick = useCallback(
    (id: string) => {
      setSelectedFurnitureId(id);
    },
    [setSelectedFurnitureId]
  );

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (selectedFurnitureId) {
        setContextMenu({ mouseX: e.clientX, mouseY: e.clientY });
      }
    },
    [selectedFurnitureId]
  );

  const handleRotate = useCallback(() => {
    if (selectedFurnitureId) {
      const item = furniture.find((f) => f.id === selectedFurnitureId);
      if (item) {
        updateFurnitureRotation(selectedFurnitureId, {
          x: item.rotation.x,
          y: (item.rotation.y + 90) % 360,
          z: item.rotation.z,
        });
      }
    }
  }, [selectedFurnitureId, furniture, updateFurnitureRotation]);

  const handleDelete = useCallback(
    (id: string) => {
      removeFurniture(id);
    },
    [removeFurniture]
  );

  const handleNext = () => {
    setCurrentStep(5);
  };

  if (!floorPlan) {
    return (
      <Box className="flex items-center justify-center h-full">
        <Typography color="text.secondary">请先完成前序步骤</Typography>
      </Box>
    );
  }

  return (
    <Box
      className="flex flex-col h-full"
      onContextMenu={handleContextMenu}
    >
      {/* 顶部工具栏 */}
      <Box className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
        <Typography variant="h6" fontWeight="bold">
          Step 4 · 半自动编辑
        </Typography>
        <Box className="flex items-center gap-4">
          <Button
            variant="outlined"
            size="small"
            onClick={handleRotate}
            disabled={!selectedFurnitureId}
          >
            旋转 (R)
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => {
              if (selectedFurnitureId) removeFurniture(selectedFurnitureId);
            }}
            disabled={!selectedFurnitureId}
          >
            删除
          </Button>
          <Button variant="contained" endIcon={<ArrowForwardIcon />} onClick={handleNext}>
            下一步
          </Button>
        </Box>
      </Box>

      {/* 内容区 */}
      <Box className="flex-1 flex">
        {/* 左侧产品库 */}
        <ProductLibraryPanel />

        {/* 中间 3D 场景 */}
        <Box className="flex-1">
          <Scene3D
            floorPlan={floorPlan}
            furniture={furniture}
            interactive
            onFurnitureClick={handleFurnitureClick}
          />
        </Box>

        {/* 右侧属性面板 */}
        <FurniturePropertiesPanel />
      </Box>

      {/* 右键菜单 - 使用虚拟 anchorEl 定位 */}
      <Menu
        open={Boolean(contextMenu)}
        onClose={() => setContextMenu(null)}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={() => { if (selectedFurnitureId) handleDelete(selectedFurnitureId); setContextMenu(null); }}>
          <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
          <ListItemText>删除</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setContextMenu(null)}>
          <ListItemIcon><SwapHorizIcon fontSize="small" /></ListItemIcon>
          <ListItemText>替换</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setContextMenu(null)}>
          <ListItemIcon><InfoIcon fontSize="small" /></ListItemIcon>
          <ListItemText>查看详情</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Step4Edit;
