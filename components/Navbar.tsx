import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-2xl font-bold">Resume Builder</div>
      <ul className="flex space-x-4">
        <li><Link to="/">Modèle de CV</Link></li>
        <li><Link to="/my-resume">Mon CV</Link></li>
        <li><Link to="/about">À propos de nous</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
