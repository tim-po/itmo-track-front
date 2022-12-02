import React, {useContext, useState} from "react";
import './index.scss'
import {KeywordType} from "../../types";
import Close from "../../images/icons/close";

// CONSTANTS

// DEFAULT FUNCTIONS

type KeywordPropType = {
  // You should declare props like this, delete this if you don't need props
  deletable?: boolean
  keyword: KeywordType
  bgColor?: string
  selected?: boolean
  onDeleteSelf?: (keyword: KeywordType) => void
  onSelectSelf?: () => void
}


const Keyword = (props: KeywordPropType) => {
  const {
    deletable,
    keyword,
    bgColor,
    selected,
    onDeleteSelf,
    onSelectSelf
  } = props

  const [isDeleted, setIsDeleted] = useState(false)

  const deleteSelf = () => {
    setIsDeleted(true)
    setTimeout(() => {
      if (onDeleteSelf) {
        onDeleteSelf(keyword);
      }
    }, 200);
  }

  return (
    <span
      className={`Keyword ${isDeleted ? 'deleted' : ''} ${selected ? 'selected' : ''} ${selected !== undefined ? 'selectable' : ''}`}
      key={keyword.text}
      onClick={onSelectSelf}
      style={{background: bgColor}}
    >
         {keyword.text}
      {deletable &&
        <button>
          <div className="deletedButton" onClick={deleteSelf}>
            <Close width={8.5} height={8.5}/>
          </div>
        </button>
        // />
      }
  </span>
  )
};

export default Keyword
