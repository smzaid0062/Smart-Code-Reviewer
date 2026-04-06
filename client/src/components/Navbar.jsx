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


        <a
          href="https://thisiszaid.netlify.app/"
          target="_blank"
          rel="noreferrer"
          className="bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 text-gray-300 text-sm px-4 py-2 rounded-full transition-all duration-300"
        >
          🧑‍💻Developer
        </a>


      </div>
    </nav>
  )
}

export default Navbar