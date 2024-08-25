// Button.jsx
import React, { useState } from 'react';

const Button = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const buttonStyle = {
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    backgroundColor: isHovered ? '#4caf50' : 'transparent',
    color: isHovered ? 'white' : 'black',
  };

  return (
    <button
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
      style={buttonStyle}
    >
      Submit
    </button>
  );
};

export default Button;
