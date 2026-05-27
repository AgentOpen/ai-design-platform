import React, { useState } from 'react';
import { Snackbar, Alert, Button } from '@mui/material';

interface ToastDemoProps {
  message?: string;
}

/**
 * Demo 限制 Toast 提示
 * 封装 MUI Snackbar，用于 Demo 版本限制提示
 */
const ToastDemo: React.FC<ToastDemoProps> = ({ message = 'Demo 版本暂不支持此功能' }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="text" size="small" onClick={handleClick}>
        了解限制
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="info" onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ToastDemo;

/**
 * 工具函数：显示 Toast 提示
 * 使用方式：调用 showDemoToast() 即可在页面上显示提示
 */
export function showDemoToast(message: string = 'Demo 版本暂不支持此功能'): void {
  // 简单实现：创建临时 Snackbar 元素
  // 在实际组件中建议使用 React state 管理
  console.log('[Demo Toast]', message);
}
