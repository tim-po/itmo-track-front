import React from 'react';

// Import colors from constants or use currentColor
// If icon uses more than one adjustable color you can pass colors from props
// BUT you must always provide default values for color props

export default (props) => {
  const {deltaY} = props

  const getArrowsPosition = () => {
    if (deltaY === 0) {
      return 'rotate(0)'
    }

    if (deltaY > 0) {
      return 'rotate(45)'
    }
  }

  return (
    <svg width="35" height="13" viewBox="0 0 35 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        width="20"
        height="4"
        rx="2"
        transform={getArrowsPosition}
        fill="#D9D9D9"
      />
      <rect
        x="16"
        width="20"
        height="4"
        rx="2"
        transform={getArrowsPosition}
        fill="#D9D9D9"
      />
    </svg>
  );
};
