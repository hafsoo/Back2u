import React from "react";

const StatsCard = ({ title, value, subtitle, icon, color }) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 p-6 flex items-start gap-4 border border-gray-100"
    >
      {/* Icon */}
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-xl ${color}`}
      >
        {icon}
      </div>

      {/* Content */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">{value}</h2>
        <p className="text-sm font-medium text-gray-700 mt-1">{title}</p>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
};

export default StatsCard;