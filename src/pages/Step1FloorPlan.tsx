import React, { useEffect } from 'react';
import { Box, Button, Typography, Snackbar, Alert } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useAppStore from '@/store/useAppStore';
import FloorPlan2D from '@/components/floorplan/FloorPlan2D';
import defaultFloorPlanData from '@/mock/defaultFloorPlan.json';
import type { FloorPlan } from '@/types';

const Step1FloorPlan: React.FC = () => {
  const floorPlan = useAppStore((s) => s.floorPlan);
  const setFloorPlan = useAppStore((s) => s.setFloorPlan);
  const setCurrentStep = useAppStore((s) => s.setCurrentStep);
  const [toastOpen, setToastOpen] = React.useState(false);

  useEffect(() => {
    if (!floorPlan) {
      setFloorPlan(defaultFloorPlanData as FloorPlan);
    }
  }, [floorPlan, setFloorPlan]);

  const handleUpload = () => {
    setToastOpen(true);
  };

  const handleNext = () => {
    setCurrentStep(2);
  };

  return (
    <Box className="flex flex-col items-center gap-6 p-6 h-full">
      <Typography variant="h5" fontWeight="bold">
        Step 1 · 户型识别
      </Typography>
      <Typography variant="body1" color="text.secondary">
        系统已自动加载默认户型，您也可以上传户型图进行识别
      </Typography>

      {floorPlan && (
        <Box className="flex flex-col items-center gap-4">
          <FloorPlan2D floorPlan={floorPlan} width={600} height={500} />
          <Box className="flex gap-4 items-center">
            <Typography variant="body2" color="text.secondary">
              {floorPlan.name} · {floorPlan.totalArea}㎡ · 层高{floorPlan.ceilingHeight}m
            </Typography>
          </Box>
        </Box>
      )}

      <Box className="flex gap-4 mt-4">
        <Button
          variant="outlined"
          startIcon={<UploadFileIcon />}
          onClick={handleUpload}
        >
          上传户型图
        </Button>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={handleNext}
        >
          下一步
        </Button>
      </Box>

      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="info" onClose={() => setToastOpen(false)}>
          Demo 版本暂不支持上传户型图
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Step1FloorPlan;
