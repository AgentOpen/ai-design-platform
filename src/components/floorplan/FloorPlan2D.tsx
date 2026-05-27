import React, { useRef, useEffect } from 'react';
import type { FloorPlan } from '@/types';

interface FloorPlan2DProps {
  floorPlan: FloorPlan;
  width?: number;
  height?: number;
}

/**
 * 2D 户型俯视图（Canvas 2D 绘制）
 * 绘制墙体、门、窗户、房间标注
 */
const FloorPlan2D: React.FC<FloorPlan2DProps> = ({
  floorPlan,
  width = 600,
  height = 500,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 清空画布
    ctx.clearRect(0, 0, width, height);

    // 计算缩放和偏移，使户型居中显示
    const scale = 50; // 1m = 50px
    const offsetX = 30;
    const offsetY = 30;

    // 绘制房间填充
    for (const room of floorPlan.rooms) {
      ctx.beginPath();
      const poly = room.floorPolygon;
      ctx.moveTo(poly[0].x * scale + offsetX, poly[0].y * scale + offsetY);
      for (let i = 1; i < poly.length; i++) {
        ctx.lineTo(poly[i].x * scale + offsetX, poly[i].y * scale + offsetY);
      }
      ctx.closePath();
      ctx.fillStyle = '#f0ebe3';
      ctx.fill();
      ctx.strokeStyle = '#ccc';
      ctx.stroke();

      // 房间名称
      const cx = poly.reduce((s, p) => s + p.x, 0) / poly.length;
      const cy = poly.reduce((s, p) => s + p.y, 0) / poly.length;
      ctx.fillStyle = '#666';
      ctx.font = '12px "Noto Sans SC", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(room.name, cx * scale + offsetX, cy * scale + offsetY + 4);
      ctx.fillStyle = '#999';
      ctx.font = '10px "Noto Sans SC", sans-serif';
      ctx.fillText(`${room.area}㎡`, cx * scale + offsetX, cy * scale + offsetY + 18);
    }

    // 绘制墙体
    for (const wall of floorPlan.walls) {
      ctx.beginPath();
      ctx.moveTo(wall.start.x * scale + offsetX, wall.start.y * scale + offsetY);
      ctx.lineTo(wall.end.x * scale + offsetX, wall.end.y * scale + offsetY);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = Math.max(wall.thickness * scale, 3);
      ctx.stroke();
    }

    // 绘制门（弧线标识）
    for (const door of floorPlan.doors) {
      const wall = floorPlan.walls.find((w) => w.id === door.wallId);
      if (!wall) continue;
      const dx = wall.end.x - wall.start.x;
      const dy = wall.end.y - wall.start.y;
      const doorX = wall.start.x + dx * door.position;
      const doorY = wall.start.y + dy * door.position;
      ctx.beginPath();
      ctx.arc(
        doorX * scale + offsetX,
        doorY * scale + offsetY,
        door.width * scale * 0.5,
        0,
        Math.PI / 2
      );
      ctx.strokeStyle = '#8B6914';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // 绘制窗户（双线标识）
    for (const win of floorPlan.windows) {
      const wall = floorPlan.walls.find((w) => w.id === win.wallId);
      if (!wall) continue;
      const dx = wall.end.x - wall.start.x;
      const dy = wall.end.y - wall.start.y;
      const winX = wall.start.x + dx * win.position;
      const winY = wall.start.y + dy * win.position;
      const perpX = -dy;
      const perpY = dx;
      const perpLen = Math.sqrt(perpX * perpX + perpY * perpY);
      const nx = perpX / perpLen;
      const ny = perpY / perpLen;
      const halfW = win.width * scale * 0.5;

      ctx.beginPath();
      ctx.moveTo(
        (winX + nx * 2 / scale) * scale + offsetX - (dx / perpLen) * halfW,
        (winY + ny * 2 / scale) * scale + offsetY - (dy / perpLen) * halfW
      );
      ctx.lineTo(
        (winX + nx * 2 / scale) * scale + offsetX + (dx / perpLen) * halfW,
        (winY + ny * 2 / scale) * scale + offsetY + (dy / perpLen) * halfW
      );
      ctx.strokeStyle = '#87CEEB';
      ctx.lineWidth = 4;
      ctx.stroke();
    }
  }, [floorPlan, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ border: '1px solid #ddd', borderRadius: 8, background: '#fff' }}
    />
  );
};

export default FloorPlan2D;
