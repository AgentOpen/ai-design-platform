import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardMedia, CardContent, CardActionArea } from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useAppStore from '@/store/useAppStore';
import Scene3D from '@/components/scene3d/Scene3D';
import ProgressOverlay from '@/components/layout/ProgressOverlay';
import { simulateAIRender } from '@/services/simulationService';

const Step5AIRender: React.FC = () => {
  const floorPlan = useAppStore((s) => s.floorPlan);
  const furniture = useAppStore((s) => s.furniture);
  const isLoading = useAppStore((s) => s.isLoading);
  const loadingProgress = useAppStore((s) => s.loadingProgress);
  const loadingText = useAppStore((s) => s.loadingText);
  const renderImageUrl = useAppStore((s) => s.renderImageUrl);
  const selectedRenderStyle = useAppStore((s) => s.selectedRenderStyle);
  const setSelectedRenderStyle = useAppStore((s) => s.setSelectedRenderStyle);
  const setCurrentStep = useAppStore((s) => s.setCurrentStep);

  const renderStyles = [
    { id: 'modern_minimalist', name: '现代简约', imageUrl: 'https://picsum.photos/seed/style_modern/300/200' },
    { id: 'nordic', name: '北欧风格', imageUrl: 'https://picsum.photos/seed/style_nordic/300/200' },
    { id: 'industrial', name: '工业风格', imageUrl: 'https://picsum.photos/seed/style_industrial/300/200' },
  ];

  const handleGenerate = async () => {
    await simulateAIRender(selectedRenderStyle);
  };

  const handleNext = () => {
    setCurrentStep(6);
  };

  if (!floorPlan) {
    return (
      <Box className="flex items-center justify-center h-full">
        <Typography color="text.secondary">请先完成前序步骤</Typography>
      </Box>
    );
  }

  return (
    <Box className="flex flex-col h-full relative">
      {/* 顶部工具栏 */}
      <Box className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
        <Typography variant="h6" fontWeight="bold">
          Step 5 · AI 渲染
        </Typography>
        <Box className="flex items-center gap-4">
          <Button
            variant="contained"
            startIcon={<AutoFixHighIcon />}
            onClick={handleGenerate}
            disabled={isLoading}
          >
            生成渲染图
          </Button>
          <Button variant="contained" endIcon={<ArrowForwardIcon />} onClick={handleNext}>
            下一步
          </Button>
        </Box>
      </Box>

      {/* 内容区 */}
      <Box className="flex-1 flex">
        {/* 左侧风格选择 */}
        <Box className="w-64 p-4 border-r border-gray-200 bg-panel-bg overflow-auto">
          <Typography variant="subtitle2" gutterBottom>渲染风格</Typography>
          <Box className="flex flex-col gap-3">
            {renderStyles.map((style) => (
              <Card
                key={style.id}
                className={`cursor-pointer transition-all ${selectedRenderStyle === style.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedRenderStyle(style.id)}
              >
                <CardActionArea>
                  <CardMedia component="img" height="120" image={style.imageUrl} alt={style.name} />
                  <CardContent sx={{ py: 1 }}>
                    <Typography variant="body2" fontWeight="bold">{style.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>

        {/* 右侧：3D 场景 + 渲染图 */}
        <Box className="flex-1 flex flex-col">
          {renderImageUrl ? (
            <Box className="flex-1 flex items-center justify-center bg-gray-100 p-4">
              <Box className="max-w-2xl">
                <img
                  src={renderImageUrl}
                  alt="AI 渲染效果图"
                  style={{ width: '100%', borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
                  AI 生成渲染效果图（{renderStyles.find((s) => s.id === selectedRenderStyle)?.name}）
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box className="flex-1">
              <Scene3D floorPlan={floorPlan} furniture={furniture} />
            </Box>
          )}
        </Box>
      </Box>

      {/* 进度遮罩 */}
      {isLoading && <ProgressOverlay progress={loadingProgress} text={loadingText} />}
    </Box>
  );
};

export default Step5AIRender;
