import { useState, useEffect } from "react";

const Loading = ({ onFinish }) => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    // Small delay to ensure component is mounted before starting animation
    const animateTimer = setTimeout(() => {
      setAnimate(true);
    }, 100);
    
    const finishTimer = setTimeout(() => {
      onFinish();
    }, 2500);
    
    return () => {
      clearTimeout(animateTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className="intro-screen">
      <div className={`logo ${animate ? "animate" : ""}`}>
        <span className="d">D</span>
        <span className="rest">UMMY</span>
      </div>
    </div>
  );
};

export default Loading;