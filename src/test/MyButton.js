import React, { useState, useEffect } from 'react';
import { HashLink as Link} from 'react-router-hash-link';
import {  Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';


const MyButton = () => {
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

  // Defining functions to perform different types of scrolling.
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const scrollToBottom = () => {
    scroll.scrollToBottom();
  };

  const scrollTo = () => {
    scroll.scrollTo(100); // Scrolling to 100px from the top of the page.
  };

  const scrollMore = () => {
    scroll.scrollMore(100); // Scrolling an additional 100px from the current scroll position.
  };

  // Function to handle the activation of a link.
  const handleSetActive = (to) => {
    console.log(to);
  };
  return (
    <nav className={`py-4 fixed top-0 left-1/2 transform -translate-x-1/2 w-full flex justify-center z-10 transition-all duration-300 `}>
      <div className={`transition-all duration-300 ${isScrolled ? 'container' : ''} mx-auto flex justify-center items-center`}>
        {/* Navigation Links */}
        <ul className="flex space-x-10 ">
          <li className="font-semibold">
            <Link to="/#home" className={`hover:text-gray-300 ${isScrolled ? 'text-black' : 'text-black'} border-b-2 border-transparent hover:border-gray-300`}
             spy={true} 
             smooth={true} 
             offset={50} 
             duration={500} 
             >Home</Link>
          </li>
          <li className="font-semibold" style={{ marginLeft: '20rem' }}>
            <Link to="/#contact" className={`hover:text-gray-300 ${isScrolled ? 'text-black' : 'text-black'} border-b-2 border-transparent hover:border-gray-300`}
             spy={true} 
             smooth={true} 
             offset={50} 
             duration={500} 
            >Contact Us</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MyButton;
