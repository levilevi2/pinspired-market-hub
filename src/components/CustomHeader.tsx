
import React from "react";
import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";

const CustomHeader: React.FC = () => {
  return (
    <header className="bg-blue-800/40 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to="/" className="font-bold text-xl text-white">
          אקדמיית הטיסה
        </Link>
        
        <div className="flex items-center space-x-4">
          <CartIcon />
          
          <div className="flex items-center">
            <Link
              to="/login"
              className="text-white hover:text-pinterest-purple transition-colors duration-200"
            >
              התחבר
            </Link>
            <span className="text-white mx-2">/</span>
            <Link
              to="/signup"
              className="text-white hover:text-pinterest-purple transition-colors duration-200"
            >
              הירשם
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CustomHeader;
