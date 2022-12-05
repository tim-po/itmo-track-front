import React from 'react';

export enum Turn {
  left = -180,
  right = 0,
  up = -90,
  down = 90,
}

export default ({turn = Turn.right, width=Number(6), height=Number(12), color='#6E6D79'}) => {
  const divStyle = {
    transform: `rotate(${turn}deg)`,
  };
  console.log(divStyle);
  let viewBox = (width > 6 && height > 12 ) ? () => (`0 0 ${width} ${height}`) : () => (`0 0 6 12`);
  return (
    <svg width={width} height={height} style={divStyle} viewBox={viewBox()} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 11L5 6L1 1" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};
