import React, {useContext, useEffect, useState} from "react";
import './index.scss'
import {KeywordType} from "../../types";
import Keyword from "../Keyword";
import keyword from "../Keyword";
import {makeEmptyList} from "../../utils/general";
import BgContext from "../../Context/Background";
import * as Scroll from "react-scroll";
import KeywordsSearch from "../KeywordsSearch";
import Magnifier from "images/icons/magnifier";

// CONSTANTS
const randomFeedbackSelectOptions = [
  'Поиск ключевых слов 🔎️',
  'Добавление/ удаление слов 🗑',
  'Все сложно  🤯', 'Все понятно 👌'
]


// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

type KeywordsPropType = {
  // You should declare props like this, delete this if you don't need props
  keywords: {
    added: KeywordType[],
    display: KeywordType[],
    add: (keyword: KeywordType) => void,
    addBulk: (keywords: KeywordType[]) => void
    remove: (keyword: KeywordType) => void,
    allIds: string[]
  }
}

const Keywords = (props: KeywordsPropType) => {
  const {keywords} = props

  const {setBg} = useContext(BgContext)
  const [requiredWordsLimit, setRequiredWordsLimit] = useState(0);

  useEffect(() => {
    setBg('white')
    let scroll = Scroll.animateScroll
    scroll.scrollToTop();

    if (localStorage.getItem("Modal1") !== 'active') {
      localStorage.setItem("Modal1", 'active');
      setTimeout(() => {
        // this.isStatsTooltipVisible = true
      }, 1000)
    }
  }, [])

  const calculateRequiredLimit = () => {
    setRequiredWordsLimit(Math.ceil(keywords.display.length * 0.8))
  }

  useEffect(() => {
    calculateRequiredLimit();
  }, [keywords.display])

  return (
    <div className="keywords" id="box">
      <div>
        <div className="keywordsCustomisationFlex">
          <div className="leftBlock">
            <div className="search">
              {/*<h4 id='blob-1-top-left' className="subheader top deckHidden">Добавь то, что хочешь изучить</h4>*/}
              <div id="blob-1-top-left" className="subheader top">
                <h4 className="subheader-title">Добавь то, что хочешь изучить</h4>
                {keywords.added.length > 0 &&
                  <div className="subheader-counter">
                    +<span key={keywords.added.length} className="rollNumber">
                    {keywords.added.length}
                  </span>
                  </div>
                }
              </div>
              <KeywordsSearch keywords={keywords}/>
              <div className="keywordsSubtext" id='blob-1-bottom-right'>
                Например: python
              </div>
              {keywords.added.length === 0 &&
                <div
                  className="textCenter mt-4 magnifierTextContainer"
                >
                  <Magnifier width={94} height={139}/>
                  <span className="magnifier">
                  Ищи и добавляй навыки, которые хочешь получить в ИТМО
                  </span>
                </div>
              }
              <div className="keywordsAddedContainer">
                <div className="keywordsAdded">
                  {keywords.added.map(keyword => {
                    return (
                      <Keyword
                        v-for="keyword in addedKeywords"
                        key={keyword.id}
                        deletable={true}
                        keyword={keyword}
                        bg-color="'var(--color-secondary)'"
                        onDeleteSelf={() => keywords.remove(keyword)}
                      />
                    );

                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="searchBlock">
            <p className="subheader">
              Уже в наборе
            </p>
            <div className="keywordsPresets">
              {keywords.display.length < 1 &&
                <>
                  {makeEmptyList(100).map(index => {
                    return (
                      <div
                        key={index}
                        className="skeleton"
                        style={{'width': Math.floor(Math.random() * (390 - 41 + 1)) + 41 + 'px'}}
                      />
                    )
                  })}
                </>
              }
              {keywords.display.map((keyword) => {
                return (
                  <Keyword
                    key={keyword.id}
                    deletable={true}
                    keyword={keyword}
                    bg-color="'var(--color-secondary)'"
                    onDeleteSelf={() => keywords.remove(keyword)}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
      {/*<ModalTooltip*/}
      {/*  v-if="isTool"*/}
      {/*  handelClick="hideTooltip"*/}
      {/*  countOfElement="isEditing ? [0,1]  [0]"*/}
      {/*  position="!isEditing ? 'topRight'  'center01'"*/}
      {/*  text=" isEditing ? 'Теперь ты можешь удалять и добавлять навыки (ключевые слова)' */}
      {/*  `Мы подобрали навыки, необходимые для присета ${profession.name}`"*/}
      {/*/>*/}
      {/*<RandomFeedback display-for-group="8" button=buttonFeedback*/}
      {/*                title="Что-то на этой странице вызвало трудности? "/>*/}
    </div>
  )
};

export default Keywords
