import type { FurnitureInstance, ProductSKU, Quotation, QuotationRoom, QuotationItem, QuotationSummary } from '@/types';

/**
 * 计算报价
 * 按房间分组家具，匹配 SKU 价格，计算各项费用
 */
export function calculateQuotation(
  furniture: FurnitureInstance[],
  productCatalog: ProductSKU[],
  floorPlanRooms: { id: string; name: string }[],
  laborRate: number = 0.15,
  managementFeeRate: number = 0.08,
  designFeeRate: number = 0.05,
): Quotation {
  // 1. 构建 SKU 查找表
  const skuMap = new Map<string, ProductSKU>(productCatalog.map((s) => [s.id, s]));

  // 2. 构建房间名称查找表
  const roomNameMap = new Map<string, string>(floorPlanRooms.map((r) => [r.id, r.name]));

  // 3. 按房间分组
  const roomsMap = new Map<string, FurnitureInstance[]>();
  for (const f of furniture) {
    if (!roomsMap.has(f.roomId)) roomsMap.set(f.roomId, []);
    roomsMap.get(f.roomId)!.push(f);
  }

  // 4. 计算每个房间
  const rooms: QuotationRoom[] = [];
  let materialTotal = 0;

  for (const [roomId, items] of roomsMap) {
    const quotationItems: QuotationItem[] = items.map((f) => {
      const sku = skuMap.get(f.skuId);
      const unitPrice = sku ? sku.price : 0;
      return {
        furnitureId: f.id,
        skuId: f.skuId,
        name: f.name,
        quantity: 1,
        unitPrice,
        subtotal: unitPrice,
      };
    });
    const roomSubtotal = quotationItems.reduce((s, i) => s + i.subtotal, 0);
    materialTotal += roomSubtotal;
    rooms.push({
      roomId,
      roomName: roomNameMap.get(roomId) || roomId,
      items: quotationItems,
      roomSubtotal,
    });
  }

  // 5. 计算汇总
  const laborFee = Math.round(materialTotal * laborRate);
  const managementFee = Math.round(materialTotal * managementFeeRate);
  const designFee = Math.round(materialTotal * designFeeRate);
  const grandTotal = materialTotal + laborFee + managementFee + designFee;

  const summary: QuotationSummary = {
    materialTotal,
    laborFee,
    managementFee,
    designFee,
    grandTotal,
  };

  return {
    id: `quotation_${Date.now()}`,
    name: '全屋报价单',
    layoutSchemeId: '',
    createdAt: new Date().toISOString(),
    laborRate,
    managementFeeRate,
    designFeeRate,
    rooms,
    summary,
  };
}
