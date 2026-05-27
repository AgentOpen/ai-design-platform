import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@/styles/theme';
import AppShell from '@/components/layout/AppShell';
import Step1FloorPlan from '@/pages/Step1FloorPlan';
import Step2Modeling3D from '@/pages/Step2Modeling3D';
import Step3AILayout from '@/pages/Step3AILayout';
import Step4Edit from '@/pages/Step4Edit';
import Step5AIRender from '@/pages/Step5AIRender';
import Step6Replace from '@/pages/Step6Replace';
import Step7Quotation from '@/pages/Step7Quotation';
import useAppStore from '@/store/useAppStore';

/** 根据 currentStep 渲染对应 Step 页面 */
const StepRenderer: React.FC = () => {
  const currentStep = useAppStore((s) => s.currentStep);

  switch (currentStep) {
    case 1:
      return <Step1FloorPlan />;
    case 2:
      return <Step2Modeling3D />;
    case 3:
      return <Step3AILayout />;
    case 4:
      return <Step4Edit />;
    case 5:
      return <Step5AIRender />;
    case 6:
      return <Step6Replace />;
    case 7:
      return <Step7Quotation />;
    default:
      return <Step1FloorPlan />;
  }
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppShell>
        <StepRenderer />
      </AppShell>
    </ThemeProvider>
  );
}

export default App;
