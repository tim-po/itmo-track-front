import React, {useContext, useEffect} from "react";
import * as Scroll from 'react-scroll';
import {Link} from "react-router-dom";
import './index.scss'
import BgContext from "../../Context/Background";
import ImgMainLetterB from "images/icons/Static/imgMainLetterB";
import ImgMainLetterA from "../../images/icons/Static/imgMainLetterA";
import ImgMainLetterC from "images/icons/Static/imgMainLetterC";
import Stars from "../../images/icons/Static/stars";
import Wave from "images/icons/Static/wave";
import ManOnHomepage from "../../images/icons/manOnHomepage";
import Close from "../../images/icons/close";
import Chevron from "../../images/icons/chevron";

// CONSTANTS

// DEFAULT FUNCTIONS

const Start = () => {
  const {setBg} = useContext(BgContext);

  const scrollToBottom = () => {
    let scroller = Scroll.scroller
    scroller.scrollTo('scrollToAbout', {
      duration: 1500,
      delay: 100,
      smooth: true,
      containerId: 'scroll-container',
      offset: 50, // Scrolls to element + 50 pixels down the page
    })
  }

  useEffect(() => {
    setBg('#F1F2F8')
  }, [])

  return (
    <div className="ContainerLanding">
      <div className="Landing pb-5">
        <section className="LandingCard">
          <div className="LandingCardFlex FirstBlock">
            <div className="d-flex flex-column Desires">
              <h1 className="MainTitle">
                Переведем твои цели на язык дисциплин
              </h1>
              <div className="d-flex flex-column justify-content-center ImgMain StarsMobil">
                <ManOnHomepage/>
              </div>
              <div className="FlexButton">
                <Link to="/professions" className="LinkProfession MainButton mr-4">
                  Поехали!
                </Link>
                <button onClick={scrollToBottom} className="SecondaryButton">Это как?</button>
              </div>
            </div>
            <div className="d-flex flex-column justify-content-center ImgMain Stars">
              <ManOnHomepage/>
            </div>
          </div>
          <span className="HeaderSubtext">
        ITMO.TRACK – Персональные образовательные траектории
      </span>
        </section>
        <section className="info LandingCardFlex" id="scrollToAbout">
          <div className="HelloCard mr-3">
            <div className="TextCenter">
              <div className="hand-icon"><Wave/></div>
            </div>
            <p className="HelloText">
              Мы понимаем, как сложно бывает выбрать образовательную программу.
              Здесь мы поможем тебе построить свой образовательный путь в ИТМО.
            </p>
          </div>
          <div className="InfoCard flex-grow-1">
            <div className="InfoTitle">Попадая к нам в университет, ты вправе сам выбрать,
              что изучать. Мы собрали набор навыков под запросы популярных профессий. Для того чтобы
              сформировать перечень курсов и дисциплин, ты можешь:
            </div>
            <div className="point-wrapper">
              <div className='letter-icon'><ImgMainLetterA/></div>
                <p className="InfoText">
                  Выбрать уже готовый набор ключевых слов
                  (список навыков и умений)
                </p>
            </div>
            <div className="point-wrapper">
              <div className="letter-icon"><ImgMainLetterB/></div>
                <p className="InfoText">
                  Изменить набор: убрать лишние или добавить важные
                  навыки и знания
                </p>
            </div>
            <div className="point-wrapper">
              <div className="letter-icon"><ImgMainLetterC/></div>
                <p className="InfoText">
                  Пройти тест на определение близких тебе профессий и записаться на консультацию
                </p>
            </div>
          </div>
        </section>
        <div className="FinalCard mt-3 d-flex">
          <div className='Stars'><Stars/></div>
            <div className="mobilStar">
              <div className="FinalCardTitle">
                На основе твоего выбора мы подберем учебную программу
              </div>
              <div className="FlexEducationalTrajectory">
                <div className="StarsMobil"><Stars/></div>
              </div>
            </div>
        </div>
      </div>
    </div>

)
};

export default Start

