import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

export default function RiskGauge({ value = 0, label, size = 100 }) {
  const getColor = (v) => {
    if (v < 0.3) return 'var(--green)';
    if (v < 0.7) return 'var(--amber)';
    return 'var(--red)';
  };

  const data = [
    { name: 'Risk', value: value },
    { name: 'Rest', value: 1 - value }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      <PieChart width={size} height={size}>
        <Pie
          data={data}
          cx={size/2}
          cy={size/2}
          innerRadius={size/2 - 10}
          outerRadius={size/2}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
          stroke="none"
          animationDuration={1000}
        >
          <Cell fill={getColor(value)} />
          <Cell fill="#e0e0e0" />
        </Pie>
      </PieChart>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: size/5 + 'px',
        fontWeight: 'bold',
        color: getColor(value)
      }}>
        {(value * 100).toFixed(0)}%
      </div>
      {label && <div style={{ marginTop: '8px', fontSize: '14px', fontWeight: '500' }}>{label}</div>}
    </div>
  );
}
