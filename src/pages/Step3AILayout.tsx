import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardMedia, CardContent, CardActionArea, ToggleButtonGroup, ToggleButton } from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useAppStore from '@/store/useAppStore';
import Scene3D from '@/components/scene3d/Scene3D';
import ProgressOverlay from '@/components/layout/ProgressOverlay';
import { simulateAILayout } from '@/services/simulationService';

const Step3AILayout: React.FC = () => {
  const floorPlan = useAppStore((s) => s.floorPlan);
  const furniture = useAppStore((s) => s.furniture);
  const isLoading = useAppStore((s) => s.isLoading);
  const loadingProgress = useAppStore((s) => s.loadingProgress);
  const loadingText = useAppStore((s) => s.loadingText);
  const currentLayout = useAppStore((s) => s.currentLayout);
  const setCurrentStep = useAppStore((s) => s.setCurrentStep);
  const [selectedStyle, setSelectedStyle] = useState<string>('modern_minimalist');
  const [selectedScheme, setSelectedScheme] = useState<'A' | 'B'>('A');

  const handleGenerate = async () => {
    const style = selectedScheme === 'A' ? 'modern_minimalist' : 'modern_practical';
    await simulateAILayout(style);
  };

  const handleSwitchScheme = async (scheme: 'A' | 'B') => {
    setSelectedScheme(scheme);
    const style = scheme === 'A' ? 'modern_minimalist' : 'modern_practical';
    await simulateAILayout(style);
  };

  const handleNext = () => {
    setCurrentStep(4);
  };

  if (!floorPlan) {
    return (
      <Box className="flex items-center justify-center h-full">
        <Typography color="text.secondary">请先完成前序步骤</Typography>
      </Box>
    );
  }

  const styles = [
    { id: 'modern_minimalist', name: '现代简约', imageUrl: 'https://picsum.photos/seed/style_modern/300/200' },
    { id: 'modern_practical', name: '紧凑实用', imageUrl: 'https://picsum.photos/seed/style_practical/300/200' },
  ];

  return (
    <Box className="flex flex-col h-full relative">
      {/* 顶部工具栏 */}
      <Box className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
        <Typography variant="h6" fontWeight="bold">
          Step 3 · AI 布局
        </Typography>
        <Box className="flex items-center gap-4">
          <Button
            variant="contained"
            startIcon={<AutoFixHighIcon />}
            onClick={handleGenerate}
            disabled={isLoading}
          >
            生成布局
          </Button>
          {furniture.length > 0 && (
            <ToggleButtonGroup
              value={selectedScheme}
              exclusive
              onChange={(_, v) => { if (v) handleSwitchScheme(v); }}
              size="small"
            >
              <ToggleButton value="A">方案A</ToggleButton>
              <ToggleButton value="B">方案B</ToggleButton>
            </ToggleButtonGroup>
          )}
          <Button variant="contained" endIcon={<ArrowForwardIcon />} onClick={handleNext}>
            下一步
          </Button>
        </Box>
      </Box>

      {/* 内容区 */}
      <Box className="flex-1 flex">
        {/* 风格选择面板 */}
        <Box className="w-64 p-4 border-r border-gray-200 bg-panel-bg overflow-auto">
          <Typography variant="subtitle2" gutterBottom>选择风格</Typography>
          <Box className="flex flex-col gap-3">
            {styles.map((style) => (
              <Card
                key={style.id}
                className={`cursor-pointer transition-all ${selectedStyle === style.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedStyle(style.id)}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="120"
                    image={style.imageUrl}
                    alt={style.name}
                  />
                  <CardContent sx={{ py: 1 }}>
                    <Typography variant="body2" fontWeight="bold">{style.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>

        {/* 3D 场景 */}
        <Box className="flex-1">
          <Scene3D floorPlan={floorPlan} furniture={furniture} />
        </Box>
      </Box>

      {/* 进度遮罩 */}
      {isLoading && (
        <ProgressOverlay progress={loadingProgress} text={loadingText} />
      )}
    </Box>
  );
};

export default Step3AILayout;
