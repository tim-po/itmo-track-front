import React from 'react';

// Import colors from constants or use currentColor
// If icon uses more than one adjustable color you can pass colors from props
// BUT you must always provide default values for color props

export default (width, height, animation) => {
  // const arrowAnimation = animation

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.5284 10.5303C16.8213 10.2374 16.8213 9.76256 16.5284 9.46967C16.2355 9.17678 15.7606 9.17678 15.4677 9.46967L11.998 12.9393L8.52838 9.46967C8.23548 9.17678 7.76061 9.17678 7.46772 9.46967C7.17482 9.76256 7.17482 10.2374 7.46772 10.5303L11.4677 14.5303C11.7606 14.8232 12.2355 14.8232 12.5284 14.5303L16.5284 10.5303Z" fill="#1F1F22"/>
    </svg>


    // TODO: replace return with your svg code
    // TODO: put your svg code in "preview.svg" so anyone can easily preview your icon
  );
};
