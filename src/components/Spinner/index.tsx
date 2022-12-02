import React, {useContext} from "react";
import './index.scss'
import Spinners from "../../images/icons/spinners";

// CONSTANTS

// DEFAULT FUNCTIONS

type SpinnerPropType = {
    width: string
    spinnerStyle?: any
}

const Spinner = (props: SpinnerPropType) => {
    const {width, spinnerStyle} = props;

    return (
      <div
        className="spinner-container"
      >

        <div className="spinner" style={{...spinnerStyle}}><Spinners width={Number(width)}/></div>
      </div>
    )
};

export default Spinner
