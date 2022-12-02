import React, { useEffect, useState } from "react";
import "./index.scss";

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

type PercentProgressPropType = {
  // You should declare props like this, delete this if you don't need props
  percent: number
}

const PercentProgress = (props: PercentProgressPropType) => {
  const { percent } = props;
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount(percent);
    }, 200)
  }, [percent]);

  return (
    // {31 * percent + 2}
    <svg className={'percentProgress'} width="48" height="36" viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="7" y="8" width="33" height="20" fill="#D2D2D4" />
      <rect className={"progressBar"} x="7" y="8" width={31 * count + 2} height="20" fill="#8533FF" />
      <path
        d="M0 8C0 3.58172 3.58172 0 8 0H14.5H40C44.4183 0 48 3.58172 48 8V18H40V10C40 8.89543 39.1046 8 38 8H37C35.8954 8 35 8.89543 35 10V18H33V10C33 8.89543 32.1046 8 31 8H30C28.8954 8 28 8.89543 28 10V18H26V10C26 8.89543 25.1046 8 24 8H23C21.8954 8 21 8.89543 21 10V18H19V10C19 8.89543 18.1046 8 17 8H16C14.8954 8 14 8.89543 14 10V18H12V10C12 8.89543 11.1046 8 10 8H9C7.89543 8 7 8.89543 7 10V26C7 27.1046 7.89543 28 9 28H10C11.1046 28 12 27.1046 12 26V18H14V26C14 27.1046 14.8954 28 16 28H17C18.1046 28 19 27.1046 19 26V18H21V26C21 27.1046 21.8954 28 23 28H24C25.1046 28 26 27.1046 26 26V18H28V26C28 27.1046 28.8954 28 30 28H31C32.1046 28 33 27.1046 33 26V18H35V26C35 27.1046 35.8954 28 37 28H38C39.1046 28 40 27.1046 40 26V18H48V28C48 32.4183 44.4183 36 40 36H8C3.58172 36 0 32.4183 0 28V8Z"
        fill="#F3F3F4" />
    </svg>
  );
};

export default PercentProgress;
