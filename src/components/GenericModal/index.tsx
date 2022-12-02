import React, {useContext, useEffect, useState} from "react";
import './index.scss'
import Close from "../../images/icons/close";

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

type GenericModalPropType = {
  // You should declare props like this, delete this if you don't need props
  hideMobile: boolean
  hideDesktop: boolean
  maxHeight?: boolean
  onModalClose: () => void
  colorCloseWhite: boolean
  children: React.ReactNode | React.ReactNode[]
  modal: boolean
}

const GenericModal = (props: GenericModalPropType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [blockContent, setBlockContent] = useState(false);
  const {hideMobile, hideDesktop, maxHeight, onModalClose, colorCloseWhite, children, modal} = props;

  const modalClose = () => {
    setBlockContent(false)
    setTimeout(()=>{
      setIsOpen(false)
    }, 300)
    setTimeout(() => {
      onModalClose()
    }, 500)
  }

  useEffect(() => {
    setIsOpen(modal)
    setBlockContent(modal)
  }, [modal])

  return (
    <div
      className={`ModalContainer ${hideMobile ? 'hideMobile' : ''} ${hideDesktop ? 'hideDesktop' : ''} ${isOpen ? 'active' : ''} ${maxHeight ? 'maxHeight' : ''}`}
    >
      {isOpen &&
        <div className="ModalContainerShad deck" onClick={modalClose}/>
      }
      <div className="ModalTrack">
        {isOpen &&
          <div className="ModalContainerShad mobil" onClick={onModalClose}/>
        }
        <div className={`d-block TextCenter ${blockContent ? 'activ': ''}`}>
          <button className="ImgCloseBtn" onClick={onModalClose}>
            {colorCloseWhite ?  <Close width={8.5} height={8.5} color="white" /> : <Close width={8.5} height={8.5}  />}
          </button>
          {children}
        </div>
      </div>
    </div>
  )
}

export default GenericModal
