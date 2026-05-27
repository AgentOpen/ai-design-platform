import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

const stepLabels: string[] = [
  '户型识别',
  '3D 建模',
  'AI 布局',
  '半自动编辑',
  'AI 渲染',
  '换品',
  '报价',
];

interface StepNavBarProps {
  currentStep: number;
}

/**
 * 顶部步骤导航条
 * MUI Stepper，当前步骤高亮
 */
const StepNavBar: React.FC<StepNavBarProps> = ({ currentStep }) => {
  return (
    <div style={{ width: '100%' }}>
      <Stepper
        activeStep={currentStep - 1}
        alternativeLabel
      >
        {stepLabels.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default StepNavBar;
