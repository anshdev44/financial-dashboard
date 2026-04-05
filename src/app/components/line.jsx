"use client";
import React from "react";
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, Legend } from 'recharts';

const data = [
  { name: 'Jan', income: 5200, expense: 3100 },
  { name: 'Feb', income: 6100, expense: 4200 },
  { name: 'Mar', income: 5800, expense: 3900 },
  { name: 'Apr', income: 7200, expense: 4500 },
  { name: 'May', income: 6800, expense: 4100 },
  { name: 'Jun', income: 7500, expense: 4800 },
  { name: 'Jul', income: 8000, expense: 5000 },
  { name: 'Aug', income: 7800, expense: 4700 },
  { name: 'Sep', income: 8200, expense: 5200 },
  { name: 'Oct', income: 8700, expense: 5600 },
  { name: 'Nov', income: 9200, expense: 6000 },
  { name: 'Dec', income: 10000, expense: 6500 },
];

const LineChartExample = ({ isAnimationActive = true }) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
     return <div className="w-full h-[380px] bg-[#131313] p-6 rounded-3xl border border-white/5 shadow-2xl flex flex-col"></div>;
  }

  return (
    <div className="w-full h-[380px] bg-[#131313] p-6 rounded-3xl border border-white/5 shadow-2xl flex flex-col">
      <div className="flex justify-between items-center mb-6 flex-shrink-0">
        <h2 className="text-white text-lg font-semibold">Financial Overview</h2>
        
    
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#CFF008]" />
            <span className="text-[#8F8F8F] text-[10px] font-bold uppercase tracking-wider">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#8F8F8F]" />
            <span className="text-[#8F8F8F] text-[10px] font-bold uppercase tracking-wider">Expenses</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 25 }}>
          <CartesianGrid strokeDasharray="0" vertical={false} stroke="#262626" />
          
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#8F8F8F', fontSize: 12 }} 
            dy={10}
          />
          
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#8F8F8F', fontSize: 12 }} 
          />

          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1A1A1A', 
              border: '1px solid #333', 
              borderRadius: '12px',
              fontSize: '14px'
            }}
            itemStyle={{ fontWeight: 'bold' }}
            cursor={{ stroke: '#333', strokeWidth: 2 }}
          />

          <Line 
            type="monotone" 
            dataKey="income" 
            stroke="#CFF008" 
            strokeWidth={3} 
            dot={false} 
            activeDot={{ r: 6, fill: '#CFF008', stroke: '#131313', strokeWidth: 2 }}
            isAnimationActive={isAnimationActive} 
          />

          <Line 
            type="monotone" 
            dataKey="expense" 
            stroke="#8F8F8F" 
            strokeWidth={2} 
            strokeDasharray="5 5"
            dot={false} 
            activeDot={{ r: 6, fill: '#8F8F8F', stroke: '#131313', strokeWidth: 2 }}
            isAnimationActive={isAnimationActive} 
          />

          
          <Legend 
            verticalAlign="bottom" 
            align="center" 
            content={() => (
              <div className="text-center pt-8">
                <span className="text-[#6c6a6a] text-[10px] font-bold uppercase tracking-[0.3em]">
                  Real-time Cashflow Analytics • FY 2025-2026
                </span>
              </div>
            )} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartExample;