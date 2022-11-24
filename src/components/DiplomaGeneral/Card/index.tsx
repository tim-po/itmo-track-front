import React from "react";
import './index.scss'
import styled, {css} from "styled-components";
import {colors} from "../../../constants";

type CardPropType = {
  name: string
  title: string
  subtitle: string
  isDiplomaCard: boolean,
  isControlTypeCard?: boolean,
  classNames?: string[]
}

const StyledCard = styled.div<{ bgColor: string, isDiplomaCard: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: ${p => p.isDiplomaCard ? '20px' : '16px'};
  color: white;
  background: ${p => p.bgColor || '#78a3ec'};
  border: 1px solid ${p => p.bgColor || '#78a3ec'};
  padding: 20px;
  cursor: pointer;
  margin-bottom: ${p => p.isDiplomaCard ? '0px' : '12px'};

  ${({isDiplomaCard}) => isDiplomaCard && css`
    padding: 25px 20px;
    width: 180px;
    height: 135px;
  `};

  &:hover {
    box-shadow: inset 0 0 0 1px #ffffff;
    cursor: pointer;
  }

  @media screen and (max-width: 1280px) {
    min-width: 256px;

    ${({isDiplomaCard}) => isDiplomaCard && css`
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      height: max-content;
      min-height: 70px;
      padding: 16px;
    `};
  }
`

const CardTitle = styled.div<{ isDiplomaCard: boolean, isControlTypeCard?: boolean }>`
  font-weight: ${p => p.isDiplomaCard ? '700' : '500'};
  font-size: ${p => p.isDiplomaCard ? '32px' : '12px'};
  line-height: 16px;
  margin-bottom: 12px;
  order: 0;
  
  &::first-letter {
    text-transform: capitalize;
  }

  @media screen and (max-width: 1280px) {
    ${({isDiplomaCard}) => isDiplomaCard && css`
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 0;
      margin-right: 24px;
    `};
  }

  @media screen and (max-width: 750px) {
    ${({isControlTypeCard}) => isControlTypeCard && css`
      order: 1;
      font-weight: 600;
      font-size: 16px;
    `};
  }
`

const CardSubtitle = styled.div<{ isDiplomaCard: boolean, isControlTypeCard?: boolean }>`
  font-weight: ${p => p.isDiplomaCard ? '500' : '600'};
  font-size: ${p => p.isDiplomaCard ? '12px' : '16px'};
  line-height: 22px;
  margin-bottom: 0;
  order: 1;

  @media screen and (max-width: 1280px) {
    ${({isDiplomaCard}) => isDiplomaCard && css`
      font-weight: 500;
      font-size: 14px;
      text-align: left;
    `};
  }

  @media screen and (max-width: 750px) {
    ${({isControlTypeCard}) => isControlTypeCard && css`
      order: 0;
      font-weight: 400;
      font-size: 14px;
      margin-bottom: 8px;
    `};
  }
`

const Card = (props: CardPropType) => {
  const {name, subtitle, title, isDiplomaCard, classNames, isControlTypeCard} = props;
  return (
    <StyledCard
      bgColor={colors[name]}
      isDiplomaCard={isDiplomaCard}
      className={classNames?.join(' ')}
    >
      <CardTitle
        isDiplomaCard={isDiplomaCard}
        isControlTypeCard={isControlTypeCard}
      >
        {title}
      </CardTitle>
      <CardSubtitle
        isDiplomaCard={isDiplomaCard}
        isControlTypeCard={isControlTypeCard}
      >
        {subtitle}
      </CardSubtitle>
    </StyledCard>
  )
}

export default Card