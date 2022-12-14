import React from "react";



export default ({color="#8533FF", width="20", height="20"}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd"
            d="M9.00001 6.25272C8.99746 5.69648 9.44875 5.25 9.99901 5.25C10.5503 5.25 11 5.69584 11 6.25C11 6.80221 10.5522 7.25 10 7.25C9.4487 7.25 9.00148 6.80368 9.00001 6.25272Z"
            fill={color} />
      <path fillRule="evenodd" clipRule="evenodd"
            d="M10 1.75C5.44321 1.75 1.75 5.44321 1.75 10C1.75 14.5568 5.44321 18.25 10 18.25C14.5568 18.25 18.25 14.5568 18.25 10C18.25 5.44321 14.5568 1.75 10 1.75ZM0.25 10C0.25 4.61479 4.61479 0.25 10 0.25C15.3852 0.25 19.75 4.61479 19.75 10C19.75 15.3852 15.3852 19.75 10 19.75C4.61479 19.75 0.25 15.3852 0.25 10Z"
            fill={color} />
      <path fillRule="evenodd" clipRule="evenodd"
            d="M10 9.25C10.4142 9.25 10.75 9.58579 10.75 10V15C10.75 15.4142 10.4142 15.75 10 15.75C9.58579 15.75 9.25 15.4142 9.25 15V10C9.25 9.58579 9.58579 9.25 10 9.25Z"
            fill={color} />
    </svg>


  );
};
