import React, { useEffect } from 'react';
import {
  Box, Button, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import useAppStore from '@/store/useAppStore';
import { calculateQuotation } from '@/services/quotationService';

const Step7Quotation: React.FC = () => {
  const floorPlan = useAppStore((s) => s.floorPlan);
  const furniture = useAppStore((s) => s.furniture);
  const productCatalog = useAppStore((s) => s.productCatalog);
  const quotation = useAppStore((s) => s.quotation);
  const setQuotation = useAppStore((s) => s.setQuotation);
  const setCurrentStep = useAppStore((s) => s.setCurrentStep);

  // 进入页面时自动计算报价
  useEffect(() => {
    if (floorPlan && furniture.length > 0 && !quotation) {
      const q = calculateQuotation(
        furniture,
        productCatalog,
        floorPlan.rooms.map((r) => ({ id: r.id, name: r.name }))
      );
      setQuotation(q);
    }
  }, [floorPlan, furniture, productCatalog, quotation, setQuotation]);

  const handleBackToEdit = () => {
    setCurrentStep(4);
  };

  const handleRestart = () => {
    // 重置所有状态
    useAppStore.getState().setFloorPlan(null as any);
    useAppStore.getState().setCurrentLayout(null as any);
    useAppStore.getState().setFurniture([]);
    useAppStore.getState().setSelectedFurnitureId(null);
    useAppStore.getState().setQuotation(null as any);
    useAppStore.getState().setRenderImageUrl(null);
    useAppStore.getState().setCurrentStep(1);
  };

  if (!quotation) {
    return (
      <Box className="flex items-center justify-center h-full">
        <Typography color="text.secondary">正在计算报价...</Typography>
      </Box>
    );
  }

  return (
    <Box className="flex flex-col h-full overflow-auto p-6">
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Step 7 · 报价汇总
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {quotation.name} · 生成时间：{new Date(quotation.createdAt).toLocaleString('zh-CN')}
      </Typography>

      {/* 按房间分组的 BOM 表 */}
      {quotation.rooms.map((room) => (
        <Box key={room.roomId} sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
            {room.roomName}
            <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 2 }}>
              小计：¥{room.roomSubtotal.toLocaleString()}
            </Typography>
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>产品名称</TableCell>
                  <TableCell align="center">数量</TableCell>
                  <TableCell align="right">单价 (¥)</TableCell>
                  <TableCell align="right">小计 (¥)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {room.items.map((item) => (
                  <TableRow key={item.furnitureId}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="right">{item.unitPrice.toLocaleString()}</TableCell>
                    <TableCell align="right">{item.subtotal.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />

      {/* 汇总 */}
      <Box sx={{ maxWidth: 400, ml: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
          <Typography variant="body1">材料总价</Typography>
          <Typography variant="body1" fontWeight="bold">¥{quotation.summary.materialTotal.toLocaleString()}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
          <Typography variant="body1">人工费 (15%)</Typography>
          <Typography variant="body1">¥{quotation.summary.laborFee.toLocaleString()}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
          <Typography variant="body1">管理费 (8%)</Typography>
          <Typography variant="body1">¥{quotation.summary.managementFee.toLocaleString()}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
          <Typography variant="body1">设计费 (5%)</Typography>
          <Typography variant="body1">¥{quotation.summary.designFee.toLocaleString()}</Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
          <Typography variant="h6" fontWeight="bold">总计</Typography>
          <Typography variant="h6" fontWeight="bold" color="primary">
            ¥{quotation.summary.grandTotal.toLocaleString()}
          </Typography>
        </Box>
      </Box>

      {/* 操作按钮 */}
      <Box sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'center' }}>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={handleBackToEdit}
        >
          返回编辑
        </Button>
        <Button
          variant="contained"
          startIcon={<RestartAltIcon />}
          onClick={handleRestart}
        >
          重新开始
        </Button>
      </Box>
    </Box>
  );
};

export default Step7Quotation;
