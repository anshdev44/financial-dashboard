"use client";
import Image from "next/image";
import React from "react";
import Navbar from "./components/navbar";
import Card from "./components/card";
import LineChartExample from "./components/line";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Donut,
  User,
  ArrowRightLeft,
  FileText,
  Target,
  Settings,
} from "lucide-react";
import NestedDonut from "./components/donut";
import Transaction from "./components/transactions";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="hidden lg:flex w-[15%] bg-[#131313] h-[100vh] flex-col py-8 px-4 border-r border-white/5  left-0 top-0">
        <div className="mb-10 px-3">
          <h1 className="text-white font-extrabold text-2xl tracking-tighter italic">
            Finance Tracker
          </h1>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <>
          <button className="cursor-pointer flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#00E0FF]/10 text-[#00E0FF] font-semibold text-sm transition-all border-l-2 border-[#00E0FF] shadow-[inset_0_0_10px_rgba(0,224,255,0.05)]">
            <User size={18} /> Account
          </button>
          </>
         
          <Link href={"/transactions"}>
          <button className="cursor-pointer flex items-center gap-3 px-4 py-3 rounded-2xl text-[#8F8F8F] hover:bg-white/5 hover:text-white font-semibold text-sm transition-all group">
            <ArrowRightLeft
              size={18}
              className="group-hover:text-[#00E0FF] transition-colors"
            />{" "}
            Transactions
          </button>
          </Link>
        </nav>
      </div>
      {/* left wala */}
      <div className="w-full lg:w-[85%]">
        <div className="ml-auto flex justify-center">
          <Navbar />
        </div>

        <div className="ml-0 lg:ml-2 flex flex-col xl:flex-row justify-center mt-8 gap-7 px-4 lg:px-0">
          {/* 3 boxes */}
          <div className="flex w-full xl:w-[60%] flex-col gap-6">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 ">
              <Card
                title="Balance"
                amount="₹1,20,500"
                change="+5.4%"
                subtitle="This Month"
                type="balance"
                icon={<Wallet className="text-white w-5 h-5" />}
              />
              <Card
                title="Income"
                amount="₹45,000"
                change="+12.3%"
                subtitle="This Month"
                type="income"
                icon={<ArrowUpRight className="text-green-400 w-5 h-5" />}
              />
              <Card
                title="Expenses"
                amount="₹28,500"
                change="-8.5%"
                subtitle="This Month"
                type="expense"
                icon={<ArrowDownRight className="text-red-400 w-5 h-5" />}
              />
            </div>
            <Transaction />
          </div>
          {/* graphs top of each other */}
          <div className="w-full xl:w-[35%] flex flex-col gap-5 mr-0 lg:mr-5 mb-10 lg:mb-0">
            <LineChartExample />
            <div className="flex justify-center flex-col items-center">
              <NestedDonut />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
