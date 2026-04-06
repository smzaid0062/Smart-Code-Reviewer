import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const features = [
  {
    icon: "🐛",
    title: "Bug Detection",
    description:
      "Automatically finds bugs, logic errors, and edge cases in your code.",
  },
  {
    icon: "🔒",
    title: "Security Analysis",
    description:
      "Detects security vulnerabilities like XSS, SQL injection, and exposed secrets.",
  },
  {
    icon: "✅",
    title: "Smart Suggestions",
    description:
      "Provides actionable improvement suggestions with code examples.",
  },
  {
    icon: "📊",
    title: "Quality Score",
    description: "Rates your code quality from 1-10 with detailed reasoning.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#050510] text-white overflow-x-hidden">

      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-violet-700 opacity-20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-indigo-600 opacity-20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[5%] left-[10%] w-[350px] h-[350px] bg-purple-700 opacity-15 rounded-full blur-[100px]" />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center">

        
        {/* Heading */}
        <h1 className="text-6xl font-bold leading-tight mb-6 tracking-tight">
          AI Code Reviews
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            on every Pull Request
          </span>
        </h1>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
          MergeX automatically reviews your GitHub Pull Requests using AI.
          Catch bugs, security issues, and bad practices before they hit
          production.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
          href="https://github.com/apps/MergeXel/installations/new"
          target="_blank"
          rel="noreferrer"
          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30 hover:scale-105"
          >
          Install on GitHub — It's Free
        </a>
        <Link
          to="/dashboard"
          className="bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 text-gray-300 font-semibold px-8 py-3.5 rounded-full transition-all duration-300"
        >
          View Dashboard
        </Link>
    </div>

  
      </section >

    {/* Features Section */ }
    < section className = "relative z-10 max-w-6xl mx-auto px-6 py-20" >
        <h2 className="text-3xl font-bold text-center mb-4">
          Everything you need in a code review
        </h2>
        <p className="text-gray-500 text-center mb-14">
          No configuration needed — just install and it works.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 hover:border-violet-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-violet-900/20 hover:-translate-y-1"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section >

    {/* How it works */ }
    < section className = "relative z-10 max-w-6xl mx-auto px-6 py-20" >
        <h2 className="text-3xl font-bold text-center mb-4">How it works</h2>
        <p className="text-gray-500 text-center mb-14">
          Up and running in under 2 minutes.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {[
            { step: "1", text: "Install Z-CodeReview on GitHub" },
            { step: "2", text: "Select repositories to review" },
            { step: "3", text: "Open a Pull Request" },
            { step: "4", text: "Get instant AI review" },
          ].map((item, index, arr) => (
            <div key={item.step} className="flex items-center gap-4">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center font-bold text-sm mb-3 shadow-lg shadow-violet-700/30">
                  {item.step}
                </div>
                <p className="text-gray-300 text-sm max-w-28">{item.text}</p>
              </div>
              {index < arr.length - 1 && (
                <div className="text-violet-700 text-2xl hidden md:block">→</div>
              )}
            </div>
          ))}
        </div>
      </section >

    {/* CTA Section */ }
    < section className = "relative z-10 max-w-3xl mx-auto px-6 py-20 text-center" >
      <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-12 shadow-2xl shadow-violet-900/20">
        <h2 className="text-3xl font-bold mb-4">
          Ready to ship better code?
        </h2>
        <p className="text-gray-400 mb-8">
          Install MergeXel for free and get AI reviews on every PR.
        </p>
        <a
          href="https://github.com/apps/MergeXel/installations/new"
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold px-10 py-3.5 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30 hover:scale-105"
        >
          Install on GitHub — It's Free
        </a>
      </div>
      </section >

    {/* Footer */ }
    < footer className = "relative z-10 border-t border-white/10 px-6 py-8 mt-8" >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
          <img 
            src="/Logo.png" 
            alt="Logo" 
            className="h-10 w-auto "
          />
        </div>
        </div>
        <span className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} MergeXel. All rights reserved.
        </span>
      </div>
      </footer >

    </div >
  );
}