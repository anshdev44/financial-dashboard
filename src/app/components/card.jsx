"use client";
import React from "react";

const Card = ({ title, amount, change, subtitle, icon, type }) => {
  const isPositive = change?.includes("+");

 
  const colors = {
    balance: "border-[#CFF008] text-[#CFF008]",
    income: "border-emerald-500 text-emerald-400",
    expense: "border-rose-500 text-rose-400",
  };


  return (
    <div className="w-full bg-[#131313] border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col justify-between h-[180px]">
      
     
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[#8F8F8F] text-xs font-medium uppercase tracking-wider mb-1">
            {title}
          </p>
          <h2 className="text-white text-3xl font-bold">{amount}</h2>
        </div>
        
      
        <div className="bg-white/5 p-2.5 rounded-xl text-white">
          {icon}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-white/5 pt-4">
        <span className="text-[#8F8F8F] text-sm">{subtitle}</span>
        
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg bg-black/40 font-bold text-xs ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
          {change}
        </div>
      </div>

      
     
    </div>
  );
};

export default Card;