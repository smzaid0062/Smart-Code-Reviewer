import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="border-b border-gray-800 px-6 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* 🔷 Logo */}
        <Link to="/" >
          <div className="flex items-center">
          <img
            src="/Logo.png"
            alt="Logo"
            className="h-auto w-14"
          />
        </div>

        </Link>
        {/* 🔷 Button */}
        <div className='flex gap-2'>
          <a
            href="https://github.com/apps/z-codereview"
            target="_blank"
            rel="noreferrer"
            className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
          >
            Install on GitHub
          </a>
          <a
            href="https://thisiszaid.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 text-gray-300 text-sm px-4 py-2 rounded-full transition-all duration-300"
          >
            🧑‍💻Developer
          </a>
        </div>

      </div>
    </nav>
  )
}

export default Navbar