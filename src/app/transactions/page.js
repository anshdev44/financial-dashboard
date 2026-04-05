"use client";
import React, { useState, useEffect } from "react";
import {
  Search, Filter, Download, Plus, ArrowUpRight, ArrowDownLeft,
  MoreVertical, ShoppingBag, Coffee, Zap, CreditCard, Laptop,
  User, ArrowRightLeft, FileText, Target, Settings, Shield,
  Eye, Trash2, Pencil, X, ChevronDown,
} from "lucide-react";
import Link from "next/link";

const getIcon = (iconName) => {
  switch (iconName) {
    case "Laptop": return <Laptop size={18} />;
    case "ArrowUpRight": return <ArrowUpRight size={18} />;
    case "Coffee": return <Coffee size={18} />;
    case "Zap": return <Zap size={18} />;
    case "ShoppingBag": return <ShoppingBag size={18} />;
    default: return <CreditCard size={18} />;
  }
};

const initialData = [
  { id: 1, name: "Apple Store", cat: "Electronics", date: "04 Apr 2026", amt: 89900, type: "expense", status: "Completed", iconName: "Laptop" },
  { id: 2, name: "Salary Credit", cat: "Income", date: "01 Apr 2026", amt: 120000, type: "income", status: "Completed", iconName: "ArrowUpRight" },
  { id: 3, name: "Zomato", cat: "Food", date: "02 Apr 2026", amt: 850, type: "expense", status: "Completed", iconName: "Coffee" },
  { id: 4, name: "Electricity Bill", cat: "Utilities", date: "31 Mar 2026", amt: 4200, type: "expense", status: "Pending", iconName: "Zap" },
];

const Page = () => {
  const [mounted, setMounted] = useState(false);
  const [role, setRole] = useState("viewer");
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({ category: "all", status: "all", type: "all" });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", amt: "", type: "expense", cat: "Shopping", status: "Completed" });

  // 1. LOAD DATA ON MOUNT
  useEffect(() => {
    const savedData = localStorage.getItem("finance_tracker_data");
    if (savedData) {
      setTransactions(JSON.parse(savedData));
    } else {
      setTransactions(initialData);
    }
    setMounted(true);
  }, []);


  useEffect(() => {
    if (mounted) {
      localStorage.setItem("finance_tracker_data", JSON.stringify(transactions));
    }
  }, [transactions, mounted]);

  const filteredData = transactions.filter((tx) => {
    const searchMatch = tx.name.toLowerCase().includes(search.toLowerCase()) || tx.cat.toLowerCase().includes(search.toLowerCase());
    const categoryMatch = filters.category === "all" || tx.cat === filters.category;
    const statusMatch = filters.status === "all" || tx.status === filters.status;
    const typeMatch = filters.type === "all" || tx.type === filters.type;
    return searchMatch && categoryMatch && statusMatch && typeMatch;
  });

  const handleOpenModal = (tx = null) => {
    if (tx) {
      setEditingId(tx.id);
      setFormData({ name: tx.name, amt: tx.amt, type: tx.type, cat: tx.cat, status: tx.status });
    } else {
      setEditingId(null);
      setFormData({ name: "", amt: "", type: "expense", cat: "Shopping", status: "Completed" });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newTx = {
      id: editingId || Date.now(),
      ...formData,
      amt: Number(formData.amt),
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      iconName: formData.type === "income" ? "ArrowUpRight" : "ShoppingBag",
    };

    setTransactions(editingId ? transactions.map((t) => (t.id === editingId ? newTx : t)) : [newTx, ...transactions]);
    setIsModalOpen(false);
  };

  const exportJSON = () => {
    const json = JSON.stringify(filteredData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.json";
    link.click();
  };

 
  if (!mounted) return <div className="bg-[#0D0D0D] min-h-screen" />;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-[#0D0D0D]">
      <aside className="hidden lg:flex w-64 bg-[#131313] h-screen sticky top-0 flex-col py-8 px-4 border-r border-white/5 shrink-0">
        <div className="mb-10 px-3">
          <h1 className="text-white font-extrabold text-2xl italic tracking-tighter">Finance Tracker</h1>
        </div>
        <nav className="flex flex-col gap-2 flex-1">
          <Link href={"/"}>
          <button className="cursor-pointer flex items-center gap-3 px-4 py-3 rounded-2xl text-[#8F8F8F] font-semibold text-sm hover:bg-white/5 transition-all"><User size={18} /> Account</button>
          </Link>
          <button className="cursor-pointer flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#00E0FF]/10 text-[#00E0FF] font-semibold text-sm border-l-2 border-[#00E0FF]"><ArrowRightLeft size={18} /> Transactions</button>
        </nav>
      </aside>

      <main className="flex-1 p-4 sm:p-10 text-white w-full overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tighter">Transactions</h1>
            <p className="text-[#8F8F8F] text-sm mt-1">Viewing as <span className="text-[#CFF008] uppercase font-bold">{role}</span></p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex bg-[#1A1A1A] border border-white/10 rounded-2xl p-1.5">
              <button onClick={() => setRole("viewer")} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${role === "viewer" ? "bg-white/10 text-white" : "text-[#444]"}`}>Viewer</button>
              <button onClick={() => setRole("admin")} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${role === "admin" ? "bg-[#CFF008] text-black" : "text-[#444]"}`}>Admin</button>
            </div>
            {role === "admin" && (
              <button onClick={() => handleOpenModal()} className="flex items-center gap-2 bg-[#CFF008] text-black px-6 py-3 rounded-2xl font-bold text-sm hover:shadow-[0_0_20px_rgba(207,240,8,0.3)] transition-all active:scale-95"><Plus size={20} /> New Transaction</button>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 flex items-center bg-[#1A1A1A] border border-white/5 rounded-2xl px-5 py-3 focus-within:border-[#CFF008]/40 transition-all">
            <Search size={20} className="text-[#444]" />
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent outline-none ml-4 text-sm w-full" />
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center justify-center gap-2 px-6 py-3 sm:py-0 rounded-2xl font-bold text-sm transition-all border ${showFilters ? "bg-[#CFF008]/10 border-[#CFF008]/20 text-[#CFF008]" : "bg-[#1A1A1A] border-white/5 text-[#8F8F8F]"}`}><Filter size={18} /> Filters</button>
          <button onClick={exportJSON} className="flex items-center justify-center gap-2 bg-[#1A1A1A] border border-white/5 px-6 py-3 sm:py-0 rounded-2xl text-[#8F8F8F] font-bold text-sm hover:text-[#CFF008] transition-all"><Download size={18} /> Export</button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 animate-in fade-in slide-in-from-top-2">
            <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} className="bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-2.5 text-sm text-[#8F8F8F] focus:text-white"><option value="all">All Categories</option><option value="Electronics">Electronics</option><option value="Income">Income</option><option value="Food">Food</option><option value="Utilities">Utilities</option><option value="Shopping">Shopping</option></select>
            <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })} className="bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-2.5 text-sm text-[#8F8F8F] focus:text-white"><option value="all">All Status</option><option value="Completed">Completed</option><option value="Pending">Pending</option></select>
            <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })} className="bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-2.5 text-sm text-[#8F8F8F] focus:text-white"><option value="all">Income & Expense</option><option value="income">Credits Only</option><option value="expense">Debits Only</option></select>
          </div>
        )}

        <div className="bg-[#1A1A1A]/40 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl w-full">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="pl-10 py-6 text-[#8F8F8F] text-[10px] font-bold uppercase tracking-widest">Transaction Details</th>
                <th className="px-6 py-6 text-[#8F8F8F] text-[10px] font-bold uppercase tracking-widest text-right">Amount</th>
                <th className="px-6 py-6 text-[#8F8F8F] text-[10px] font-bold uppercase tracking-widest text-center">Status</th>
                <th className="pr-10 py-6 text-[#8F8F8F] text-[10px] font-bold uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredData.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/[0.03] transition-all group">
                  <td className="pl-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-[#131313] border border-white/10 flex items-center justify-center text-[#8F8F8F] group-hover:text-[#CFF008]">
                        {getIcon(tx.iconName)}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{tx.name}</p>
                        <p className="text-[10px] text-[#444] font-bold uppercase">{tx.cat} • {tx.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className={`px-6 py-6 text-right font-bold ${tx.type === "income" ? "text-[#CFF008]" : "text-white"}`}>
                    {tx.type === "income" ? "+" : "-"} ₹{tx.amt.toLocaleString()}
                  </td>
                  <td className="px-6 py-6 text-center">
                    <span className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-full ${tx.status === "Completed" ? "bg-[#CFF008]/10 text-[#CFF008]" : "bg-yellow-500/10 text-yellow-500"}`}>{tx.status}</span>
                  </td>
                  <td className="pr-10 py-6 text-right">
                    {role === "admin" ? (
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleOpenModal(tx)} className="p-2 bg-white/5 hover:bg-[#CFF008]/20 rounded-lg text-[#8F8F8F] hover:text-[#CFF008] transition-all"><Pencil size={16} /></button>
                        <button onClick={() => setTransactions(transactions.filter((t) => t.id !== tx.id))} className="p-2 bg-white/5 hover:bg-red-500/20 rounded-lg text-[#8F8F8F] hover:text-red-400 transition-all"><Trash2 size={16} /></button>
                      </div>
                    ) : <MoreVertical size={18} className="text-[#444] ml-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#131313] border border-white/10 w-full max-w-md rounded-[2.5rem] p-8 animate-in zoom-in-95">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{editingId ? "Edit" : "New"} Transaction</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-[#444] hover:text-white"><X size={24} /></button>
              </div>
              <form onSubmit={handleSave} className="flex flex-col gap-4">
                <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Vendor Name" className="bg-[#1A1A1A] border border-white/5 rounded-2xl px-5 py-3 outline-none focus:border-[#CFF008]/50" />
                <input required type="number" value={formData.amt} onChange={(e) => setFormData({ ...formData, amt: e.target.value })} placeholder="Amount (₹)" className="bg-[#1A1A1A] border border-white/5 rounded-2xl px-5 py-3 outline-none focus:border-[#CFF008]/50" />
                <select value={formData.cat} onChange={(e) => setFormData({ ...formData, cat: e.target.value })} className="bg-[#1A1A1A] border border-white/5 rounded-2xl px-5 py-3 outline-none text-[#8F8F8F]">
                  <option value="Electronics">Electronics</option>
                  <option value="Food">Food</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Utilities">Utilities</option>
                </select>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setFormData({ ...formData, type: "expense" })} className={`py-3 rounded-2xl font-bold border transition-all ${formData.type === "expense" ? "bg-white/10 border-white/20" : "border-transparent text-[#444]"}`}>Debit</button>
                  <button type="button" onClick={() => setFormData({ ...formData, type: "income" })} className={`py-3 rounded-2xl font-bold border transition-all ${formData.type === "income" ? "bg-[#CFF008]/10 border-[#CFF008]/40 text-[#CFF008]" : "border-transparent text-[#444]"}`}>Credit</button>
                </div>
                <button type="submit" className="bg-[#CFF008] text-black font-bold py-4 rounded-2xl mt-4 active:scale-95 transition-all">Save Changes</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Page;