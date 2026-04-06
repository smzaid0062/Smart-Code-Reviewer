import React from 'react';

export default function StatsCard({ icon, label, value, change, positive }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-violet-800 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl">{icon}</span>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            positive
              ? "bg-green-950 text-green-400"
              : "bg-red-950 text-red-400"
          }`}
        >
          {change}
        </span>
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  );
}