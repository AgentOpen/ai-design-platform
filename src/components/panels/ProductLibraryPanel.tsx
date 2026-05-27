import React, { useState, useMemo } from 'react';
import { Box, Typography, TextField, List, ListItem, ListItemText, ListItemAvatar, Avatar, Chip, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import useAppStore from '@/store/useAppStore';
import type { ProductSKU, FurnitureInstance } from '@/types';

/**
 * 产品库面板
 * 分类筛选 + 搜索 + 产品列表，点击添加到场景
 */
const ProductLibraryPanel: React.FC = () => {
  const productCatalog = useAppStore((s) => s.productCatalog);
  const addFurniture = useAppStore((s) => s.addFurniture);
  const furniture = useAppStore((s) => s.furniture);
  const floorPlan = useAppStore((s) => s.floorPlan);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // 提取所有分类
  const categories = useMemo(() => {
    const cats = new Set<string>();
    productCatalog.forEach((p) => cats.add(p.category));
    return ['all', ...Array.from(cats)];
  }, [productCatalog]);

  // 分类中文名映射
  const categoryLabels: Record<string, string> = {
    all: '全部',
    sofa: '沙发',
    bed: '床',
    tv_stand: '电视柜',
    coffee_table: '茶几',
    nightstand: '床头柜',
    wardrobe: '衣柜',
    desk: '书桌',
    chair: '椅子',
    dining_table: '餐桌',
    dining_chair: '餐椅',
    bookshelf: '书架',
    kitchen_cabinet: '橱柜',
    appliance: '家电',
    bathroom: '卫浴',
    lighting: '灯具',
    dresser: '梳妆台',
    rug: '地毯',
    side_table: '边几',
    cabinet: '柜子',
    curtain: '窗帘',
    mattress: '床垫',
    kitchen: '厨房用品',
  };

  // 筛选产品
  const filteredProducts = useMemo(() => {
    let result = productCatalog;
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (search.trim()) {
      const lower = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.brand.toLowerCase().includes(lower)
      );
    }
    return result;
  }, [productCatalog, selectedCategory, search]);

  const handleAddProduct = (sku: ProductSKU) => {
    const newFurniture: FurnitureInstance = {
      id: `furn_new_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      roomId: floorPlan?.rooms[0]?.id || 'room_living',
      skuId: sku.id,
      name: sku.name,
      position: { x: 2, y: 2, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      size: { ...sku.size },
    };
    addFurniture(newFurniture);
  };

  return (
    <Box className="h-full flex flex-col bg-panel-bg" sx={{ width: 280 }}>
      {/* 搜索框 */}
      <Box sx={{ p: 2 }}>
        <TextField
          size="small"
          fullWidth
          placeholder="搜索产品..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* 分类筛选 */}
      <Box sx={{ px: 2, pb: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {categories.map((cat) => (
          <Chip
            key={cat}
            label={categoryLabels[cat] || cat}
            size="small"
            color={selectedCategory === cat ? 'primary' : 'default'}
            onClick={() => setSelectedCategory(cat)}
            variant={selectedCategory === cat ? 'filled' : 'outlined'}
          />
        ))}
      </Box>

      {/* 产品列表 */}
      <List sx={{ flex: 1, overflow: 'auto', px: 1 }}>
        {filteredProducts.map((sku) => (
          <ListItem
            key={sku.id}
            secondaryAction={
              <AddCircleIcon
                color="primary"
                sx={{ cursor: 'pointer' }}
                onClick={() => handleAddProduct(sku)}
              />
            }
            sx={{ px: 1, py: 0.5 }}
          >
            <ListItemAvatar>
              <Avatar
                src={sku.imageUrl}
                variant="rounded"
                sx={{ width: 36, height: 36 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={sku.name}
              secondary={`¥${sku.price}`}
              primaryTypographyProps={{ fontSize: 12 }}
              secondaryTypographyProps={{ fontSize: 11, color: '#1976d2' }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ProductLibraryPanel;
