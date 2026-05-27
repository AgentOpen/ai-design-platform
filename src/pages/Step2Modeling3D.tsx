import React from 'react';
import { Box, Button, Typography, ToggleButtonGroup, ToggleButton, Switch, FormControlLabel } from '@mui/material';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import GridViewIcon from '@mui/icons-material/GridView';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useAppStore from '@/store/useAppStore';
import Scene3D from '@/components/scene3d/Scene3D';
import FloorPlan2D from '@/components/floorplan/FloorPlan2D';

const Step2Modeling3D: React.FC = () => {
  const floorPlan = useAppStore((s) => s.floorPlan);
  const viewMode = useAppStore((s) => s.viewMode);
  const showCeiling = useAppStore((s) => s.showCeiling);
  const setViewMode = useAppStore((s) => s.setViewMode);
  const setShowCeiling = useAppStore((s) => s.setShowCeiling);
  const setCurrentStep = useAppStore((s) => s.setCurrentStep);

  const handleNext = () => {
    setCurrentStep(3);
  };

  if (!floorPlan) {
    return (
      <Box className="flex items-center justify-center h-full">
        <Typography color="text.secondary">请先完成户型识别步骤</Typography>
      </Box>
    );
  }

  return (
    <Box className="flex flex-col h-full">
      {/* 顶部工具栏 */}
      <Box className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
        <Typography variant="h6" fontWeight="bold">
          Step 2 · 3D 建模
        </Typography>
        <Box className="flex items-center gap-4">
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, v) => { if (v) setViewMode(v as '2d' | '3d'); }}
            size="small"
          >
            <ToggleButton value="2d">
              <GridViewIcon fontSize="small" sx={{ mr: 0.5 }} />
              2D
            </ToggleButton>
            <ToggleButton value="3d">
              <ViewInArIcon fontSize="small" sx={{ mr: 0.5 }} />
              3D
            </ToggleButton>
          </ToggleButtonGroup>
          <FormControlLabel
            control={
              <Switch
                checked={showCeiling}
                onChange={(e) => setShowCeiling(e.target.checked)}
                size="small"
              />
            }
            label="天花板"
          />
        </Box>
        <Button variant="contained" endIcon={<ArrowForwardIcon />} onClick={handleNext}>
          下一步
        </Button>
      </Box>

      {/* 3D / 2D 场景 */}
      <Box className="flex-1 relative">
        {viewMode === '3d' ? (
          <Scene3D floorPlan={floorPlan} furniture={[]} />
        ) : (
          <Box className="flex items-center justify-center h-full bg-white">
            <FloorPlan2D floorPlan={floorPlan} width={700} height={550} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Step2Modeling3D;
