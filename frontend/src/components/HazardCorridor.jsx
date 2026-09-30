import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function HazardCorridor({ data }) {
  return (
    <div style={{ width: '100%', height: 300, marginTop: '1rem' }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[0, 1]} hide />
          <YAxis dataKey="depth" type="category" reversed tick={{ fontSize: 12 }} width={80} />
          <Tooltip contentStyle={{ borderRadius: '8px' }} />
          
          <Area type="monotone" dataKey="stuck_pipe" stackId="1" stroke="var(--amber)" fill="var(--amber)" fillOpacity={0.6} />
          <Area type="monotone" dataKey="lost_circulation" stackId="2" stroke="var(--teal)" fill="var(--teal)" fillOpacity={0.6} />
          <Area type="monotone" dataKey="gas_kick" stackId="3" stroke="var(--red)" fill="var(--red)" fillOpacity={0.6} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
