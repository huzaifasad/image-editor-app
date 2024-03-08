import React, { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false); // Added for responsiveness

  useEffect(() => {
    // Responsiveness check using a media query
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Adjust breakpoint as needed
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Call initially

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // ... other useEffect and function definitions

  return (
    <nav
      className={`
        py-4 fixed top-0 left-0 transform  w-full  z-10 transition-all duration-300
        ${isScrolled ? 'bg-white' : 'bg-transparent'} ${isSmallScreen ? '-translate-x-full' : ''}
      `}
    >
      <div
        className={`
          transition-all duration-300 ${isScrolled ? 'container' : ''} mx-auto flex justify-center items-center
          ${isSmallScreen ? 'translate-y-4 bg-white rounded-lg py-2 px-4 shadow-md' : ''}
        `}
      >
        {/* Navigation Links */}
        <ul className="flex space-x-4 md:space-x-10">
          <li className="font-semibold">
            <Link
              to="/#home"
              className={`hover:text-gray-300 ${isScrolled ? 'text-black' : 'text-black'} border-b-2 border-transparent hover:border-gray-300`}
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
            >
              Home
            </Link>
          </li>
          <li className="font-semibold">
            <Link
              to="/#contact"
              className={`hover:text-gray-300 ${isScrolled ? 'text-black' : 'text-black'} border-b-2 border-transparent hover:border-gray-300`}
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
