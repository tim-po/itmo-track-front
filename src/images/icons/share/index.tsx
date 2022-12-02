import React from "react";

// Import colors from constants or use currentColor
// If icon uses more than one adjustable color you can pass colors from props
// BUT you must always provide default values for color props

export default ({color="#8533FF"}) => {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.76766 10.361L4.76761 10.361C3.33083 10.9128 2.29737 11.7374 1.22359 12.7584L1.22345 12.7585L1.05819 12.9158C0.942021 13.0263 0.75 12.9439 0.75 12.7836C0.75 10.3713 1.40077 8.50508 2.62872 7.17518C3.9727 5.71998 6.05526 4.83049 8.91186 4.58817C9.69131 4.52205 10.3345 3.8817 10.3345 3.0667V1.93503C10.3345 1.52912 10.7927 1.29237 11.1238 1.52717L18.3104 6.62339C18.5915 6.82268 18.5915 7.23982 18.3104 7.43911L11.1238 12.5353C10.7926 12.7701 10.3345 12.5334 10.3345 12.1275V11.0754C10.3345 10.2396 9.64273 9.54279 8.78185 9.59557C7.17076 9.69434 5.86401 9.94002 4.76766 10.361Z"
        fill="#8533FF" stroke={color} />
    </svg>


  );
};
