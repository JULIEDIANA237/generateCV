import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-2xl font-bold">Resume Builder</div>

        {/* Hamburger Button (visible on small screens) */}
        <button
          className="sm:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Navigation Links */}
        <ul
          className={`sm:flex space-x-4 absolute sm:relative bg-gray-800 sm:bg-transparent w-full sm:w-auto left-0 top-[60px] sm:top-auto p-4 sm:p-0 transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <li>
            <Link
              to="/modele"
              className="block sm:inline hover:text-blue-400 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Modèle de CV
            </Link>
          </li>
          <li>
            <Link
              to="/my-resume"
              className="block sm:inline hover:text-blue-400 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Mon CV
            </Link>
          </li>
           
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
