import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import BgContext from "../../Context/Background";
import {BASE_URL} from "../../constants";
import axios from "axios";
import BackButtonContext from "../../Context/BackButton";
import Keyword from "../../components/Keyword";
import {LocalStorageInteraction, makeEmptyList, withLocalStorage} from "../../utils/general";
import './index.scss'
import SelectedPresets from "../../components/SelectedPresets";
import {useProfession} from "../../Models/useProfession";
import Keywords from "../../components/Keywords";
import SkillSets from "../../components/SkillSets";
import LoadingScreen from "../../components/LoadingScreen";
import MagicWand from "../../images/icons/MagicWand";
import FingerLike from "images/icons/Static/fingerLike";
import ProfessionLamsIcon from "images/icons/Static/lightBulbs";

import KeywordsModal from "../../components/Modals/KeywordsModal";
import ModalsContext from "../../Context/Modal";
// CONSTANTS

// DEFAULT FUNCTIONS

const ProfessionDetails = () => {

  const navigate = useNavigate()
  const {setBg} = useContext(BgContext)
  const {setNewBackButtonProps} = useContext(BackButtonContext)
  const {displayModal} = useContext(ModalsContext)
  // const {setKeywordsForModal} = useContext(ModalsContext)
  const [searchParams] = useSearchParams()
  const {profession, presets, keywords} = useProfession(searchParams.get('id') || '')

  const [isLoading, setIsLoading] = useState(false);
  const [requiredWordsLimit, setRequiredWordsLimit] = useState(0);

  useEffect(() => {
    setBg('white');

    if (searchParams.get('view') === 'main') {
      setNewBackButtonProps('Все профессии', '/professions')
    }
  }, [])

  useEffect(() => {
    if (searchParams.get('view') !== 'main' && profession) {
      setNewBackButtonProps(`${profession?.name}: описание`, `/professionDetails?view=main&id=${searchParams.get('id')}`)
    }else{
      setNewBackButtonProps('Все профессии', '/professions')
    }
    }, [searchParams.get('view'), profession])

  useEffect(() => {
    calculateRequiredLimit()
  }, [profession])

  const openTrajectoryChoice = async () => {
    if (!profession) {
      return
    }
    withLocalStorage({professionId: profession.id}, LocalStorageInteraction.save)
    setIsLoading(true)

    const response = await axios.post(`${BASE_URL}trajectories/?top_n=3`, {'keywords': keywords.allIds})

    let ids: string[] = []
    response.data.forEach((el: any) => ids.push(el.id))
    navigate(`/trajectories?ids=${JSON.stringify(ids)}`)
  }

  const saveChoice = () => {
    navigate(`professionDetails?id=${profession?.id}&view=main`)
  }

  const editKeywords = () => {
    navigate(`professionDetails?id=${profession?.id}&view=keywords`)
    setNewBackButtonProps(`${profession?.name}: описание`, `/professionDetails?view=main&id=${searchParams.get('id')}`)
  }

  const editSkillSets = () => {
    navigate(`professionDetails?id=${profession?.id}&view=skills`)
    setNewBackButtonProps(`${profession?.name}: описание`, `/professionDetails?view=main&id=${searchParams.get('id')}`)
  }

  const openKeywordsModal = () => {
    displayModal(<KeywordsModal keywords={keywords.display} />)
  }

  const clearChoice = () => {
    switch (searchParams.get('view')) {
      case 'keywords':
        keywords.clear()
        break;
      case 'skills':
        presets.clear()
        break;
      default:
        break;
    }
  }

  const currentHeader = () => {
    switch (searchParams.get('view')) {
      case 'keywords':
        return 'Ключевые слова'
      case 'skills':
        return 'Наборы навыков'
      case 'main':
        return profession ? profession.name : ''
      default:
        return ''
    }
  }

  const calculateRequiredLimit = () => {
    if (profession) {
      setRequiredWordsLimit(Math.ceil(profession.related_keywords.length * 0.8))
    }
  }

  const isClearButtonDisabled = () => {
    if (searchParams.get('view') === 'keywords' && keywords.added.length < 1) {
      return true
    }
    return searchParams.get('view') === 'skills' && presets.selected.length < 1;
  }

  return (
    <div className="professionDetails">
      <div className="headerFlex">
        <h4 className="currentHeader fontWeightBold" id="scrollToTop"> {currentHeader()}</h4>
        {searchParams.get('view') !== 'main' &&
          <div className="bottomLeftContainer">
            <button
              className={`clear ${isClearButtonDisabled() ? 'disabled' : ''}`}
              onClick={clearChoice}
            >
              Очистить выбор
            </button>
            <button className="save" onClick={saveChoice}>Сохранить</button>
          </div>
        }
      </div>
      {searchParams.get('view') === 'main' &&
        <div className="keywordsCustomisationFlex">
          <div className="professionContainer">
            <div className="professionDescription">
              <p className="subheader subheader-mobile">Описание</p>
              <div className="keywords__card">
                <div className="profession-data">
                  {!profession &&
                    <>
                      {makeEmptyList(40).map(index => {
                        return (
                          <div
                            key="n"
                            className="skeleton"
                            style={{'width': Math.floor(Math.random() * (100 - 30 + 1)) + 30 + 'px', 'height': '12px'}}
                          />
                        )
                      })}
                    </>
                  }
                  {profession &&
                    <p className="mb-0">
                      {profession ? profession.description : ""}
                    </p>
                  }
                </div>
              </div>
              <div className="blockDescription">
                <div className="professionDescriptionText">
                  {presets.selected.length === 0 &&
                    <span className="build-trajectory-text">
                      Мы уже собрали для тебя готовый набор ключевых слов. Этого будет достаточно чтобы построить траекторию
                      <br/>
                      Ты можешь продолжить без изменений или добавить то, что хочешь изучить дополнительно.
                    </span>
                  }
                  {presets.selected.length > 0 &&
                    <span>
                    Вау, ты добавил новые навыки! Теперь можно строить траекторию
                   </span>
                  }
                  <div className="blockDescriptionMobil">
                    <button className="button-primary" onClick={openTrajectoryChoice}>
                      {presets.selected.length ? 'Мне все нравится' : 'Построить'}
                    </button>
                  </div>
                </div>
                {presets.selected.length === 0 &&
                  <div className="lamp-icon">
                    <ProfessionLamsIcon/>
                  </div>
                }
                {presets.selected.length > 0 &&
                  <div className="like"><FingerLike/></div>
                }
              </div>
              {/*<div*/}
              {/*  className="keywords__warning mb-2"*/}
              {/*  v-if="(keywords && keywords.length > 0) ? (keywords.length <= requiredWordsLimit)  false"*/}
              {/*>*/}
              {/*    <div className="d-flex">*/}
              {/*        <img src="/images/exclamationMarkInOutline.svg" alt="" className="mr-2"/>*/}
              {/*        Ты можешь удалить не более 30% набора ключевых слов своей профессии*/}
              {/*    </div>*/}
              {/*</div>*/}
            </div>
          </div>
          <div className="right-flex">
            <div className="containerPresets">
              <div className="blockFlex">
                <div id="blob-1-top-left" className="subheader">
                  <span className="subheader-title">Наборы навыков</span>
                  {presets.selected.length > 0 &&
                    <div className="subheader-counter">+{
                      presets.selected.length
                    }</div>
                  }
                </div>
                {presets.selected.length > 0 &&
                  <div onClick={editSkillSets} className="edit-button">
                    <div className="edit-button-icon"> <MagicWand width={14} height={14}/></div>
                    <span className="edit-button-text">Редактировать</span>
                  </div>
                }
              </div>
              <LoadingScreen header="Подбираем траектории" isLoading={isLoading}/>
              <SelectedPresets isHidden={false} selectedPresets={presets.selected}/>
            </div>
            <div className="containerBlockFlex">
              <div className="blockFlex">
                <div id="blob-0-top-left" className="subheader">
                  <span className="subheader-title">Ключевые слова</span>
                  {keywords.added.length > 0 &&
                    <div className="subheader-counter">+{
                      keywords.added.length
                    }</div>
                  }
                </div>
                <div onClick={editKeywords} className="edit-button">
                  <div className="edit-button-icon"> <MagicWand width={14} height={14}/></div>
                  <span className="edit-button-text">Редактировать</span>
                </div>
              </div>
              <div className="keywordsRequired" id="blob-0-bottom-right">
                {(!profession || !profession.related_keywords.length) &&
                  <>
                    {makeEmptyList(20).map(index => {
                      return (
                        <div
                          key={index}
                          className="skeleton"
                          style={{width: Math.floor(Math.random() * (300 - 41 + 1)) + 41 + 'px'}}
                        />
                      )
                    })}
                  </>
                }

                {profession &&
                  <>
                    {keywords.added.slice(0, 25).map(keyword => {
                      return (
                        <Keyword
                          deletable={false}
                          key={keyword.text}
                          keyword={keyword}
                          bg-color="'var(--color-secondary)'"
                          // onDeleteSelf={()=>deleteKeyword(keyword)}
                        />
                      )
                    })}
                    {keywords.display.slice(0, 25).map(keyword => {
                      return (
                        <Keyword
                          deletable={false}
                          key={keyword.text}
                          keyword={keyword}
                          bg-color="'var(--color-secondary)'"
                          // onDeleteSelf={()=>deleteKeyword(keyword)}
                        />
                      )
                    })}
                  </>
                }
                {profession && profession.related_keywords.length > 25 &&
                  <button className="modalKeywords" onClick={openKeywordsModal}>
                    +{profession.related_keywords.length - 25}
                  </button>
                }
              </div>

            </div>
          </div>
        </div>
      }
      <div className="blockDescriptionMobil bottom">
        <button className="button-primary" onClick={openTrajectoryChoice}>
          {presets.selected.length ? 'Мне все нравится' : 'Построить'}
        </button>
      </div>
      {profession && searchParams.get('view') === 'keywords' &&
        <Keywords keywords={keywords} />
      }
      {searchParams.get('view') === 'skills' &&
        <SkillSets presets={presets}/>
      }
    </div>
  )
}

export default ProfessionDetails

