import React from "react";
import Cross, {CrossStyle} from "../cross";


export default ({color="#1F1F22"}) => {
  return (
    <Cross color={color} state={CrossStyle.plus} width={10} height={10}/>
  );
};
