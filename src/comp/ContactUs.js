import React, { useEffect } from 'react';
import '../App.css';
import undrawSVG from './undraw_newsletter_re_wrob.svg';
import backgroundImg from './scattered-forcefields.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ContactUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
    <div className="h-screen">
      <div className="absolute inset-0 bg-cover m-0 p-0" style={{ backgroundImage: `url(${backgroundImg})` }}>
        <div className="flex h-full">
          {/* Right Section (40%) */}
          <div className="w-2/5 flex-none" data-aos="fade-left">
            <div className="flex justify-center items-center h-full">
              {/* Placeholder for App Screen Showcase */}
              <div className="rounded-lg overflow-hidden   shadow-xs">
                {/* Insert your app screen showcase image here */}
                <img
                  src={undrawSVG}
                  alt="App Screen Showcase"
                  className="max-h-full max-w-full w-auto h-auto transform rotate-180"
                  style={{ maxWidth: '70%', maxHeight: '70%' }}
                />
              </div>
            </div>
          </div>

          {/* Left Section (60%) */}
          <div className="w-3/5 flex-none bg-gray-200 flex items-center px-8 mt-8" data-aos="fade-right">
            <div className="p-8 transform hover:scale-105 mt-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                <span className="inline-block mt-5">Contact Us</span>
              </h1>
              <p className="text-base md:text-lg mb-8 leading-relaxed text-gray-800">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus risus non arcu convallis, in viverra elit ultrices.
              </p>
              <p className="text-base md:text-lg mb-8 leading-relaxed text-gray-800">
                Nulla nec convallis nisl, vel lobortis libero. Donec volutpat felis eu justo posuere tincidunt.
              </p>
              <button className='custom-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110'>
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactUs;
