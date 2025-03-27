
import React from "react";

export const CustomerCounter = () => {
  return (
    <div className="mb-6 bg-[#8B5CF6]/10 rounded-xl p-4 shadow-sm border border-[#8B5CF6]/20 animate-fadeIn">
      <div className="flex items-center justify-center">
        <div className="flex -space-x-2 mr-3 overflow-hidden">
          <div className="inline-block h-7 w-7 rounded-full bg-white border-2 border-white overflow-hidden">
            <img src="/placeholder.svg" alt="Customer" className="w-full h-full object-cover" />
          </div>
          <div className="inline-block h-7 w-7 rounded-full bg-white border-2 border-white overflow-hidden">
            <img src="/placeholder.svg" alt="Customer" className="w-full h-full object-cover" />
          </div>
          <div className="inline-block h-7 w-7 rounded-full bg-white border-2 border-white flex items-center justify-center text-[10px] font-medium text-[#8B5CF6]">+</div>
        </div>
        <p className="text-sm text-gray-700 font-medium">
          <span className="font-bold text-elegant-brown">250+</span> Happy customers and counting 
          <span className="inline-flex items-center ml-1 space-x-1">
            <span title="United Arab Emirates">🇦🇪</span>
            <span title="Saudi Arabia">🇸🇦</span>
            <span title="Qatar">🇶🇦</span>
            <span title="Kuwait">🇰🇼</span>
            <span title="Oman">🇴🇲</span>
            <span title="Bahrain">🇧🇭</span>
            <span title="Iraq">🇮🇶</span>
          </span>
        </p>
      </div>
    </div>
  );
};
