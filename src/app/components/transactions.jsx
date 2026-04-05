"use client";
import React from "react";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  User, 
  ArrowRightLeft, 
  FileText, 
  Target, 
  Settings 
} from "lucide-react";
import Link from "next/link";

const transactions = [
  { id: 1, title: "Groceries", date: "Apr 01, 2026", amount: 3000, type: "expense", category: "Food" },
  { id: 2, title: "Salary", date: "Apr 02, 2026", amount: 25000, type: "income", category: "Work" },
  { id: 3, title: "Fuel", date: "Apr 03, 2026", amount: 2000, type: "expense", category: "Transport" },
  { id: 4, title: "Freelance", date: "Apr 04, 2026", amount: 5000, type: "income", category: "Work" },
];

const Transaction = () => {
  return (
    <div className="flex h-full w-full mt-4">
      <div className="flex-1 w-full">
        <div className="bg-[#131313] rounded-3xl p-6 w-full border border-white/5 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-6 bg-[#CFF008] rounded-full" />
              <h2 className="text-white text-xl font-semibold tracking-tight">
                Recent Activity
              </h2>
            </div>
            <button className="text-[#8F8F8F] text-sm font-medium hover:text-[#CFF008] transition-colors bg-white/5 px-4 py-1.5 rounded-lg">
              View All
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {transactions.map((t) => (
              <div
                key={t.id}
                className="group flex justify-between items-center bg-[#1A1A1A] p-4 rounded-2xl border border-transparent hover:border-white/10 hover:bg-[#1f1f1f] transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl ${
                      t.type === "income"
                        ? "bg-[#CFF008]/10 text-[#CFF008]"
                        : "bg-white/5 text-[#8F8F8F]"
                    }`}
                  >
                    {t.type === "income" ? (
                      <ArrowUpRight size={20} />
                    ) : (
                      <ArrowDownLeft size={20} />
                    )}
                  </div>

                  <div className="flex flex-col">
                    <span className="text-white font-semibold text-base group-hover:text-[#CFF008] transition-colors">
                      {t.title}
                    </span>
                    <span className="text-[#8F8F8F] text-xs font-medium uppercase tracking-wider">
                      {t.category} • {t.date}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`text-lg font-bold ${
                      t.type === "income" ? "text-[#CFF008]" : "text-white"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"} ₹{t.amount.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-[#8F8F8F] font-bold uppercase tracking-widest opacity-60">
                    Completed
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;