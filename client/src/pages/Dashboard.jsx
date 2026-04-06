import React from 'react'
import { Link } from 'react-router-dom';
export default function Dashboard() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      {/* Icon */}
      <div className="text-6xl mb-6">🚧</div>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-yellow-950 border border-yellow-800 text-yellow-400 text-sm px-4 py-1.5 rounded-full mb-6">
        <span>⚡</span>
        <span>Under Development</span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-white mb-4">
        Dashboard Coming Soon
      </h1>

      {/* Description */}
      <p className="text-gray-400 text-lg max-w-lg mb-10">
        We are building a powerful dashboard to show your review history, bug
        stats, and code quality trends. Stay tuned!
      </p>

      {/* Features coming */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full mb-10">
        {[
          { icon: "📊", label: "Review Analytics" },
          { icon: "🐛", label: "Bug Tracking" },
          { icon: "🔒", label: "Security Reports" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col items-center gap-2"
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-gray-400 text-sm">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Back button */}
      
       <Link to="/"
        className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}