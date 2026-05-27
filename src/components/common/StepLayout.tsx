import React from 'react';
import { Box, Typography } from '@mui/material';

interface StepLayoutProps {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

/**
 * 统一页面布局模板
 * 标题 + 内容区 + 底部操作栏
 */
const StepLayout: React.FC<StepLayoutProps> = ({ title, children, actions }) => {
  return (
    <Box className="flex flex-col h-full">
      {/* 标题栏 */}
      <Box sx={{ px: 3, py: 2, borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
      </Box>

      {/* 内容区 */}
      <Box className="flex-1 overflow-auto">
        {children}
      </Box>

      {/* 底部操作栏 */}
      {actions && (
        <Box sx={{ px: 3, py: 2, borderTop: '1px solid #e0e0e0', display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          {actions}
        </Box>
      )}
    </Box>
  );
};

export default StepLayout;
