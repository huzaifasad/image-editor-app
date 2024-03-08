import React, { useEffect } from 'react';
import '../App.css';
import undrawSVG from './undraw_learning_sketching_nd4f.svg';
import backgroundImg from './scattered-forcefields.png';
import undraw from './undraw_newsletter_re_wrob.svg'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
   <div className='landing-container'>
     <div id="home"  className='landing-section mb-20 '>
      <div className="h-screen mb-10">
      <div className="absolute inset-0 bg-cover m-0 p-0" style={{ backgroundImage: `url(${backgroundImg})` }}>
        <div className="flex h-full ">
          {/* Left Section (60%) */}
          <div className="w-3/5 flex-none bg-gray-200 flex items-center px-8">
            <div className="p-8 transform hover:scale-105" data-aos="fade-right">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                <span className="inline-block">Turn Images into Sketches</span>
              </h1>
              <p className="text-base md:text-lg mb-8 leading-relaxed text-gray-800">
                Transform any image into a beautiful sketch using our AI-powered editor.
              </p>
              <p className="text-base md:text-lg mb-8 leading-relaxed text-gray-800">
                Whether it's a personal photo, a landscape, or any other image, our advanced AI technology can convert it into a stunning sketch in just a few clicks.
              </p>
              <Link to={`/drawpage`}><button className='mttop custom-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110'>
                Get Started
              </button></Link>
            </div>
          </div>

          {/* Right Section (40%) */}
          <div className="w-2/5 flex-none displaynone" data-aos="fade-left">
            <div className="flex justify-center items-center h-full">
              {/* Placeholder for App Screen Showcase */}
              <div className="rounded-lg overflow-hidden   shadow-xs">
                {/* Insert your app screen showcase image here */}
                <img
                  src={undrawSVG}
                  alt="App Screen Showcase"
                  className="max-h-full max-w-full w-auto h-auto"
                  style={{ maxWidth: '70%', maxHeight: '70%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     </div>
     <div id="contact" className='p-1 padingcheck'>
      <div className="">
      <div className=" inset-0 bg-cover m-0 p-0" style={{ backgroundImage: `url(${backgroundImg})` }}>
        <div className="flex h-full ">
          {/* Right Section (40%) */}
          <div className="w-2/5 flex-none displaynone" data-aos="fade-left">
            <div className="flex justify-center items-center h-full">
              {/* Placeholder for App Screen Showcase */}
              <div className="rounded-lg overflow-hidden   shadow-xs">
                {/* Insert your app screen showcase image here */}
                <img
                  src={undraw}
                  alt="App Screen Showcase"
                  className="max-h-full max-w-full w-auto h-auto transform rotate-90"
                  style={{ maxWidth: '60%', maxHeight: '70%' }}
                />
              </div>
            </div>
          </div>

          {/* Left Section (60%) */}
          <div className="w-3/5 flex-none bg-gray-200 flex items-center px-8 mt-8 padingleft" data-aos="fade-right">
            <div className="p-8 transform hover:scale-105 mt-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                <span className="inline-block mt-5">Contact Us</span>
              </h1>
              <form class="newsletter-form mttop">
  <div class="newsletter-overlay"></div>
  <div class="newsletter-content">
    <h2 class="font-bold text-xl text-purple-600">Get more updates...</h2>
    <p class="text-neutral-700">Sign up for our newsletter and you'll be the first to find out about new features</p>
  </div>
  <div class="flex flex-col sm:flex-row gap-1">
    <div class="input-container">
      <input placeholder="Mail..." class="input-field" type="text" />
    </div>
    <button class="subscribe-button">Subscribe</button>
  </div>
</form>



            </div>
          </div>
        </div>
      </div>
    </div>
     </div>
   </div>
  );
};

export default LandingPage;
