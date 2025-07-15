import React, { useEffect } from "react";
import "./SplashScreen.css";

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof onFinish === "function") {
        onFinish();
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-screen">
      <div className="forksy-bounce">
        🍴 <span className="forksy-text1">Forksy</span>
      </div>
    </div>
  );
};

export default SplashScreen;
