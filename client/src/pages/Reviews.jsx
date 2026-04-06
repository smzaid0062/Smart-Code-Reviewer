import { Link } from "react-router-dom";

export default function Reviews() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      {/* Icon */}
      <div className="text-6xl mb-6">🔍</div>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-violet-950 border border-violet-800 text-violet-400 text-sm px-4 py-1.5 rounded-full mb-6">
        <span>🚀</span>
        <span>Coming Soon</span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-white mb-4">
        Review History
      </h1>

      {/* Description */}
      <p className="text-gray-400 text-lg max-w-lg mb-10">
        Soon you will be able to see all your AI code reviews in one place —
        with bugs, security issues, suggestions, and quality scores for every
        Pull Request.
      </p>

      {/* Preview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full mb-10 opacity-40 pointer-events-none select-none">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-left space-y-3"
          >
            <div className="h-3 bg-gray-700 rounded w-1/2" />
            <div className="h-3 bg-gray-700 rounded w-3/4" />
            <div className="h-3 bg-gray-700 rounded w-1/3" />
            <div className="flex gap-2 mt-2">
              <div className="h-6 bg-red-900 rounded w-16" />
              <div className="h-6 bg-yellow-900 rounded w-16" />
            </div>
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