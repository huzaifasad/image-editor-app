import React, { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { Events, animateScroll as scroll, scrollSpy } from 'react-scroll';
import './../App.css'
const Footer = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Registering the 'begin' event and logging it to the console when triggered.
    Events.scrollEvent.register('begin', (to, element) => {
      console.log('begin', to, element);
    });

    // Registering the 'end' event and logging it to the console when triggered.
    Events.scrollEvent.register('end', (to, element) => {
      console.log('end', to, element);
    });

    // Updating scrollSpy when the component mounts.
    scrollSpy.update();

    // Returning a cleanup function to remove the registered events when the component unmounts.
    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);

  // Function to handle the activation of a link.
  const handleSetActive = (to) => {
    console.log(to);
  };

  return (
    <footer className="py-6 bg-gray-900 text-white w-screen h-40 ">
      <div className="h-16 mx-auto flex justify-center items-center">
        {/* Navigation Links */}
        <ul className="flex space-x-10">
          <li className="font-semibold">
            <Link
              to="/#home"
              className={`hover:text-gray-300 ${isScrolled ? 'text-white' : 'text-white'} border-b-2 border-transparent hover:border-gray-300`}
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
              className={`hover:text-gray-300 ${isScrolled ? 'text-white' : 'text-white'} border-b-2 border-transparent hover:border-gray-300`}
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
    </footer>
  );
};

export default Footer;
