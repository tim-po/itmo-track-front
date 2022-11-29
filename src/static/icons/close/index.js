import React from "react";


export default (props) => {
  const {width, height, color} = props
  return (
    <svg width={width? width: '14'} height={height? height: '14'} viewBox="0 0 14 14" fill={color ? color : "#1F1F22"}
         xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.59094 7.00018L13.0441 2.54706C13.2554 2.33608 13.3743 2.0498 13.3745 1.75118C13.3748 1.45255 13.2564 1.16606 13.0455 0.954713C12.8345 0.743368 12.5482 0.624488 12.2496 0.624225C11.951 0.623961 11.6645 0.742335 11.4531 0.953306L7 5.40643L2.54687 0.953306C2.33553 0.741962 2.04888 0.62323 1.75 0.62323C1.45111 0.62323 1.16447 0.741962 0.953123 0.953306C0.741779 1.16465 0.623047 1.4513 0.623047 1.75018C0.623047 2.04907 0.741779 2.33571 0.953123 2.54706L5.40625 7.00018L0.953123 11.4533C0.741779 11.6646 0.623047 11.9513 0.623047 12.2502C0.623047 12.5491 0.741779 12.8357 0.953123 13.0471C1.16447 13.2584 1.45111 13.3771 1.75 13.3771C2.04888 13.3771 2.33553 13.2584 2.54687 13.0471L7 8.59393L11.4531 13.0471C11.6645 13.2584 11.9511 13.3771 12.25 13.3771C12.5489 13.3771 12.8355 13.2584 13.0469 13.0471C13.2582 12.8357 13.3769 12.5491 13.3769 12.2502C13.3769 11.9513 13.2582 11.6646 13.0469 11.4533L8.59094 7.00018Z"
        fill={color ? color : "#1F1F22"} />
    </svg>
  );
};
