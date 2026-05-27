import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import StepNavBar from './StepNavBar';
import useAppStore from '@/store/useAppStore';

interface AppShellProps {
  children: React.ReactNode;
}

/**
 * 应用外壳
 * 顶栏 + 步骤导航条 + 主内容区布局
 */
const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const currentStep = useAppStore((s) => s.currentStep);

  return (
    <div className="flex flex-col w-full h-full">
      {/* 顶部栏 */}
      <AppBar position="static" elevation={1} sx={{ zIndex: 100 }}>
        <Toolbar variant="dense" sx={{ minHeight: 48 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ flexGrow: 0, mr: 4 }}>
            AI 室内设计平台
          </Typography>
          <div style={{ flexGrow: 1 }}>
            <StepNavBar currentStep={currentStep as number} />
          </div>
        </Toolbar>
      </AppBar>

      {/* 主内容区 */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default AppShell;
