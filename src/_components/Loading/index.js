import React, { useState, useEffect } from 'react';
import './style.css'
import AnimatedLogo from '../Logo/AnimatedLogo';


const LoadingAnimation = () => {
    const [dotCount, setDotCount] = useState(1);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setDotCount((prevCount) => (prevCount < 3 ? prevCount + 1 : 1));
      }, 500); // Adjust the interval time for the animation
  
      return () => clearInterval(interval);
    }, []);
  
    const renderDots = () => {
      const dots = [];
      for (let i = 1; i <= 3; i++) {
        dots.push(
          <div
            key={i}
            className={`dot ${dotCount === i ? 'pulse' : ''}`} 
          ></div>
        );
      }
      return dots;
    };
  
    return (  
      <div className="loading-container">
        <AnimatedLogo />
        <div className="loading-text">
          <span className='blinking-container'>Loading</span>
          <div className="dots-container">{renderDots()}</div>
        </div>
      </div>
    );
  };
  
  export default LoadingAnimation;
