import React, {useEffect, useState} from "react";
import './index.scss';
import { isMobile } from "react-device-detect";
import ModalStick from "../../../static/ModalStick";

type SwapModalPropType = {
  children: React.ReactNode | React.ReactNode[]
  modalHeight: number
  classes?: string[],
  elementRef: any
}

const SwapModal = (props: SwapModalPropType) => {
  const {children, modalHeight, elementRef, classes} = props

  const [cardHeight, setCardHeight] = useState<number>(0);
  const [deltaY, setDeltaY] = useState(0);
  const [prevMovementY, setPrevMovementY] = useState(0);
  const [isTouched, setIsTouched] = useState(false);

  const touchStart = (e: any) => {
    if (!isTouched) {
      // @ts-ignore
      setCardHeight(elementRef?.current?.offsetHeight);
      setIsTouched(true);
      setPrevMovementY(e.touches[0].clientY);
    }
  };

  const touchMove = (e: any) => {
    if (isTouched) {
      const deltaY = prevMovementY - e.touches[0].clientY;
      setDeltaY(deltaY);

      setCardHeight(cardHeight + deltaY);

      if (deltaY >= 150) {
        setCardHeight(250);
        setIsTouched(false);
      }

      if (deltaY <= -150) {
        setCardHeight(30);
        setIsTouched(false);
      }

      setPrevMovementY(e.touches[0].clientY);
    }
  };

  const touchEnd = () => {
    if (isTouched) {
      setIsTouched(false);
      setPrevMovementY(0);

      if (deltaY > 0) {
        setCardHeight(250);
      }

      if (deltaY < 0) {
        setCardHeight(30);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setCardHeight(modalHeight)
    }, 500)
  }, [])

  return (
    <div
      className={`swap-modal-wrapper ${classes?.join(' ')}`}
      onTouchStart={touchStart}
      onTouchMove={touchMove}
      onTouchEnd={touchEnd}
      ref={elementRef}
      style={{ height: `${isMobile ? `${cardHeight}px` : ``}`}}
    >
      <div className='modal-stick-wrapper'>
        <ModalStick />
      </div>
      {children}
    </div>
  )
};

export default SwapModal