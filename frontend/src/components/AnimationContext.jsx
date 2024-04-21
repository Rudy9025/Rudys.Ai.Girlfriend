import React, { createContext, useState } from "react";

export const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const [currentAnimation, setCurrentAnimation] = useState(null);

  const playAnimation = (animationName) => {
    setCurrentAnimation(animationName);
  };

  return (
    <AnimationContext.Provider value={{ currentAnimation, playAnimation }}>
      {children}
    </AnimationContext.Provider>
  );
};
