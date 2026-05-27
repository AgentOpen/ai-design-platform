import React, { useState } from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import InfoIcon from '@mui/icons-material/Info';
import useAppStore from '@/store/useAppStore';

interface SceneContextMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  furnitureId: string | null;
  onDelete?: (id: string) => void;
  onReplace?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

/**
 * 3D 场景右键菜单
 * 提供删除/替换/查看详情操作
 */
const SceneContextMenu: React.FC<SceneContextMenuProps> = ({
  anchorEl,
  open,
  onClose,
  furnitureId,
  onDelete,
  onReplace,
  onViewDetails,
}) => {
  const removeFurniture = useAppStore((s) => s.removeFurniture);
  const setSelectedFurnitureId = useAppStore((s) => s.setSelectedFurnitureId);

  const handleDelete = () => {
    if (furnitureId) {
      removeFurniture(furnitureId);
      onDelete?.(furnitureId);
    }
    onClose();
  };

  const handleReplace = () => {
    if (furnitureId) {
      onReplace?.(furnitureId);
    }
    onClose();
  };

  const handleViewDetails = () => {
    if (furnitureId) {
      setSelectedFurnitureId(furnitureId);
      onViewDetails?.(furnitureId);
    }
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
    >
      <MenuItem onClick={handleDelete}>
        <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
        <ListItemText>删除</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleReplace}>
        <ListItemIcon><SwapHorizIcon fontSize="small" /></ListItemIcon>
        <ListItemText>替换</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleViewDetails}>
        <ListItemIcon><InfoIcon fontSize="small" /></ListItemIcon>
        <ListItemText>查看详情</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default SceneContextMenu;
