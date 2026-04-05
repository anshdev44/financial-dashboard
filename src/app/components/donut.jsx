"use client";
import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";

const BRAND = {
  lime: "#CFF008",
  white: "#FFFFFF",
  grey: "#8F8F8F",
  darkGrey: "#333333",
  bg: "#131313"
};

const mainData = [
  { name: "Food", value: 8000, color: BRAND.lime },
  { name: "Rent", value: 15000, color: BRAND.white },
  { name: "Travel", value: 4000, color: BRAND.grey },
  { name: "Shopping", value: 3000, color: BRAND.darkGrey },
];

const subData = [
  { name: "Groceries", value: 3000, color: "#D9FF66" },
  { name: "Restaurants", value: 5000, color: "#B8E600" },
  { name: "Rent", value: 15000, color: "#E5E5E5" },
  { name: "Fuel", value: 2000, color: "#A3A3A3" },
  { name: "Cab", value: 2000, color: "#737373" },
  { name: "Clothes", value: 1500, color: "#525252" },
  { name: "Electronics", value: 1500, color: "#404040" },
];

const RenderCustomLabel = () => {
  return (
    <div className="text-center mt-2">
      <span className="text-[#8F8F8F] text-[10px] font-bold uppercase tracking-[0.3em]">
        Expense Distribution • March 2026
      </span>
    </div>
  );
};

export default function NestedDonut() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-full h-[390px] bg-[#131313]  rounded-3xl border border-white/5 shadow-xl flex flex-col items-center"></div>;
  }

  return (
    <div className="w-full h-[390px] bg-[#131313]  rounded-3xl border border-white/5 shadow-xl flex flex-col items-center">
      <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
        <PieChart margin={{ bottom: 25 }}>
          <Pie
            data={mainData}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={95}
            stroke={BRAND.bg}
            strokeWidth={4}
          >
            {mainData.map((entry, index) => (
              <Cell key={`main-${index}`} fill={entry.color} />
            ))}
          </Pie>

          <Pie
            data={subData}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={105}
            outerRadius={135}
            stroke={BRAND.bg}
            strokeWidth={2}
            paddingAngle={2}
          >
            {subData.map((entry, index) => (
              <Cell key={`sub-${index}`} fill={entry.color} />
            ))}
          </Pie>

          <Tooltip 
            formatter={(value) => `₹${value.toLocaleString()}`}
            contentStyle={{ 
              backgroundColor: "#1A1A1A", 
              border: "1px solid #333", 
              borderRadius: "12px",
              color: "#FFF",
              fontSize: "13px"
            }}
          />

          <Legend 
            verticalAlign="bottom" 
            align="center" 
            content={<RenderCustomLabel />} 
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}