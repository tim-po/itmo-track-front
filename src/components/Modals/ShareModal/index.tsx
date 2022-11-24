import React, {useContext, useState} from "react";
import './index.scss';
import copy from "copy-to-clipboard";
import {useSearchParams} from "react-router-dom";
import Button from "components/Button";

type ShareModalPropType = {}

const ShareModal = (props: ShareModalPropType) => {

  const [searchParams] = useSearchParams()

  const [isLinkWithNameCopied, setIsLinkWithNameCopied] = useState(false)
  const [isLinkWithoutNameCopied, setIsLinkWithoutNameCopied] = useState(false)
  const [name, setName] = useState('')

  const shareWithoutName = () => {
    setIsLinkWithoutNameCopied(true)
    copy(`${window.location.origin}/diplomaShare?id=${searchParams.get('id')}`)
    setTimeout(() => {
      window.open(`${window.location.origin}/diplomaShare?id=${searchParams.get('id')}`, '_blank');
    }, 1500)
  }

  const shareWithName = () => {
    setIsLinkWithNameCopied(true)
    copy(`${window.location.origin}/diplomaShare?id=${searchParams.get('id')}`)
    setTimeout(() => {
      window.open(`${window.location.origin}/diplomaShare?id=${searchParams.get('id')}&name=${name}`, '_blank');
    }, 1500)
  }

  return (
    <div className="shareModalContainer">
      <div className="shareModalHeaderContainer">
        <img src="../../../static/PicShareDeck.svg" className="shareModal-cover"/>
      </div>
      <div className="shareContent">
        <div className="shareContentHeader">Поделиться</div>
        <div className="shareForm">
          <div className="shareInputContainer">
            <label className="modalShareInputLabel">Мы можем подписать траекторию</label>
            <input
              className="keywordsInput"
              placeholder="Введи ключевое слово"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="shareBtnContainer">
            <Button
              buttonStyle={'secondary'}
              onClick={shareWithoutName}
              isDisabled={false}
              classNames={['share-button']}
            >
              {isLinkWithoutNameCopied ? 'Ссылка скопирована' : 'Продолжить без имени'}
            </Button>
            <Button
              buttonStyle={'main'}
              onClick={shareWithName}
              isDisabled={name === ''}
              classNames={['share-button']}
            >
              {isLinkWithNameCopied ? 'Ссылка скопирована' : 'Поделиться'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ShareModal