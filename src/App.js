// App.js
import React, { useEffect,useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './comp/LandingPage';
import MyButton from './comp/MyButton';
import ContactUs from './comp/ContactUs';
import { TabsCustomAnimation } from './TabsCustomAnimation'; // Renamed the import
import Footer from './comp/Footer';
import Navbar from './comp/Navbar';
export default function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Adjust breakpoint as needed
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Call initially

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <BrowserRouter>
       {isSmallScreen ? (
        <Navbar /> 
      ) : (
        <MyButton /> 
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='drawpage' element={<TabsCustomAnimation/>}/>
       
      </Routes>
    </BrowserRouter>
  );
}
