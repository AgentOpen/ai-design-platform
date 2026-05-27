import React from 'react';
import { Box, Typography, LinearProgress, Paper } from '@mui/material';

interface ProgressOverlayProps {
  progress: number;
  text: string;
}

/**
 * AI 进度遮罩层
 * 全屏半透明遮罩 + 居中进度条 + 文字描述
 */
const ProgressOverlay: React.FC<ProgressOverlayProps> = ({ progress, text }) => {
  return (
    <Box
      className="absolute inset-0 flex items-center justify-center z-50"
      sx={{ background: 'rgba(0,0,0,0.6)' }}
    >
      <Paper
        elevation={8}
        sx={{
          px: 6,
          py: 4,
          borderRadius: 3,
          minWidth: 360,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
          AI 正在工作...
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {text}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 8, borderRadius: 4, mb: 1 }}
        />
        <Typography variant="caption" color="text.secondary">
          {progress}%
        </Typography>
      </Paper>
    </Box>
  );
};

export default ProgressOverlay;
