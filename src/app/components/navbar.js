"use client";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [greetings, setGreetings] = useState("");
  const [date, setDate] = useState("");

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  }

  useEffect(() => {
    setGreetings(getGreeting());
    setDate(getCurrentDate());
  }, []);

  return (
    <nav className="bg-[#131313] w-full h-[85px] rounded-[2rem] border border-white/5 mt-4 px-4 sm:px-8 flex items-center justify-between shadow-2xl">
      
     
      <div className="flex flex-col">
        <h1 className="text-white font-bold text-xl tracking-tight">
          {greetings}, Ansh
        </h1>
        <p className="text-[#8F8F8F] font-bold text-[10px] uppercase tracking-[0.25em] mt-0.5">
          {date}
        </p>
      </div>

      <div className="flex items-center gap-6">
        
        {/* Search Bar - Matching Chart Tooltips */}
        <div className="hidden md:flex items-center bg-[#1A1A1A] border border-white/5 rounded-2xl px-4 py-2.5 w-64 transition-all focus-within:border-[#CFF008]/40 group">
          <svg
            className="w-4 h-4 text-[#8F8F8F] group-focus-within:text-[#CFF008] transition-colors mr-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search account..."
            className="bg-transparent outline-none text-sm text-white placeholder:text-[#444] w-full font-medium"
          />
        </div>

       
        <button className="p-2.5 text-[#8F8F8F] hover:text-white hover:bg-white/5 rounded-xl transition-all relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
          </svg>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#CFF008] rounded-full border-2 border-[#131313]"></span>
        </button>

      
        <div className="w-10 h-10 rounded-full border border-white/10 p-0.5 cursor-pointer hover:border-[#CFF008] transition-all">
          <img 
            src="./profile_pic.avif" 
            alt="Ansh" 
            className="w-full h-full rounded-full object-cover" 
          />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;