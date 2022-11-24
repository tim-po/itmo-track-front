import React, {useContext} from "react";
import './index.scss'
import styled from "styled-components";
import Keyword from "components/Keyword";
import {DiplomaTileWrapper, DiplomaTitle} from "../DiplomaGeneralStyles";
import {KeywordType} from "types";
import ModalContext from "Context/Modal";

type KeywordsPropType = {
  keywords: KeywordType[];
  keywordsCount: number;
  isKeywordsButtonHidden: boolean;
}

const KeywordsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;
`

const ShowMoreKeywordsButton = styled.button`
  background: #EBEBFF;
  border: none;
  color: #8533FF;
  border-radius: 8px;
  padding: 8px 12px;
  margin-right: 8px;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 12px;
  opacity: 1;
  line-height: 15px;
  outline: none;
  cursor: pointer;

  &:active,
  &:focus {
    outline: none;
  }
`

const Keywords = (props: KeywordsPropType) => {
  const {keywords, keywordsCount, isKeywordsButtonHidden} = props

  const {displayModal} = useContext(ModalContext)

  return (
    <DiplomaTileWrapper>
      <DiplomaTitle>Освою ключевые навыки</DiplomaTitle>
      <KeywordsWrapper>
        {keywords.map((keyword: KeywordType) => (
          <Keyword
            key={keyword.id}
            deletable={false}
            keyword={keyword}
            bg-color="#EBEBFF"
          />
        ))}
        {!isKeywordsButtonHidden &&
          <ShowMoreKeywordsButton>
            {`+${keywordsCount - 10}`}
          </ShowMoreKeywordsButton>
        }
      </KeywordsWrapper>
    </DiplomaTileWrapper>
  )
}

export default Keywords