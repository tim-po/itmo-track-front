import React, {useContext, useState} from "react";
import './index.scss'
import {KeywordType} from "../../types";

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

type KeywordPropType = {
  // You should declare props like this, delete this if you don't need props
  deletable: boolean
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
    }, 300);
  }

  return (
    <span
      className={`KeywordsModalKeywords ${isDeleted ? 'deleted' : ''}`}
      key={keyword.text}
      onClick={onSelectSelf}
      style={{background: bgColor}}
    >
         {keyword.text}
      {deletable &&
        <button
          className="border-0 pr-0 py-0 DeletedButton"
          onClick={deleteSelf}
        />
      }
  </span>
  )
};

export default Keyword