import React from "react";
import './index.scss'
import styled, {css} from "styled-components";

type ButtonPropType = {
  buttonStyle: 'secondary' | 'main',
  onClick: () => void,
  children: React.ReactNode,
  isDisabled: boolean,
  classNames?: string[]
}

const StyledButton = styled.button<{ buttonStyle: 'secondary' | 'main', isDisabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 12px;
  width: max-content;
  height: 40px;
  background: ${p => p.isDisabled ? '#C198FF' : '#8533FF'};
  border-radius: 8px;
  cursor: pointer;
  outline: none !important;
  border: none;
  font-family: 'Inter';
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #FFFFFF;
  transition: all .3s;

  ${({buttonStyle, isDisabled}) => buttonStyle === 'secondary' && css`
    background: #fff;
    border: 1px solid ${isDisabled ? '#C198FF' : '#8533FF'};
    color: ${isDisabled ? '#C198FF' : '#8533FF'}
  `};

  ${({isDisabled}) => isDisabled && css`
    pointer-events: none;
  `};

  &:hover {
    transition: all .3s;
    background: ${p => p.buttonStyle === 'main' ? '#AE78FE' : '#F3F3FE'}
  }
`

const Button = (props: ButtonPropType) => {
  const {buttonStyle, children, onClick, isDisabled, classNames} = props
  return (
    <StyledButton onClick={onClick} buttonStyle={buttonStyle} isDisabled={isDisabled} className={classNames?.join(' ')}>
      {children}
    </StyledButton>
  )
}

export default Button