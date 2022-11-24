import React, {useContext} from "react";
import './index.scss'

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
          <img
            className="spinner"
            alt="loading"
            width={width}
            height={width}
            style={{height: `${width}px`, width: `${width}px`, ...spinnerStyle}} src="/static/spinner.svg"
          />
      </div>
    )
};

export default Spinner