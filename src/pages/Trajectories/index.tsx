import React, {useContext, useEffect, useState} from "react";
import BgContext from "../../Context/Background";
import BackButtonContext from "../../Context/BackButton";
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import * as Scroll from "react-scroll";
import {CourseType, TrajectoryType} from "../../types";
import PercentProgress from "../../components/PercentProgress";
import ControlTypeTile from "../../components/ControlTypeTile";
import './index.scss'
import {allControllTypes, BASE_URL} from "../../constants";
import Close from "../../images/icons/close";
import {LocalStorageInteraction, withLocalStorage} from "../../utils/general";
import Chevron, {Turn} from "../../images/icons/chevron";

// CONSTANTS

const randomFeedback = {
  firstOptionSelectButton: ['Ничего не подошло 🥲️', 'Странные теги 🤔', 'Мало информации  🤨', 'Отлично 👌'],
  secondOptionSelectButton: ['Выбор траектории 🥲️', 'Как перейти дальше 🤔', 'Слишком много информации  🤯', 'Все понятно 👌']
}

// DEFAULT FUNCTIONS


const Trajectories = () => {
  const [width, setWidth] = useState(0);
  const [trajectories, setTrajectories] = useState([]);
  const [trajectoriesIds, setTrajectoriesIds] = useState([]);
  const {setBg} = useContext(BgContext)
  const {setNewBackButtonProps} = useContext(BackButtonContext)
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    setBg('#F1F2F8')

    const professionId = withLocalStorage({professionId: null}, LocalStorageInteraction.load).professionId
    setNewBackButtonProps("Выбор ключевых слов и пресетов", `/professionDetails?view=main&id=${professionId}`)
    if (trajectories.length === 0) {
      const trajectoryIds = JSON.parse(searchParams.get('ids') || '[]')
      setTrajectoriesIds(trajectoryIds)
      axios.get(`${BASE_URL}trajectories/?ids=${trajectoryIds[0]},${trajectoryIds[1]},${trajectoryIds[2]}`).then(res => {
        setTrajectories(res.data)
      })
    }
    let scroll = Scroll.animateScroll
    scroll.scrollToTop();

  }, [])

  const shouldDrawScrollButton = (event: any) => {
    const element = event.target
    if (!element) {
      element.classList.remove('Hidden')
      element.classList.remove('HiddenLeft')
      return
    }

    if (element.scrollLeft + element.clientWidth >= element.scrollWidth - 10) {
      element.classList.add('Hidden')
      return
    }

    if (element.scrollLeft <= 10) {
      element.classList.add('HiddenLeft')
      return
    }

    element.classList.remove('HiddenLeft')
    element.classList.remove('Hidden')
  }
  const trajectoryChosen = (trajectory: TrajectoryType, course = 1) => {
    withLocalStorage({chosenTrajectoriesIds: searchParams.get('ids')}, LocalStorageInteraction.save)
    navigate(`/trajectory?id=${trajectory.id}&course=${course}`)
  }
  const scrollToRight = (event: any) => {
    event.preventDefault()
    event.target.parentNode.scrollLeft += Math.min(event.target.parentNode.clientWidth, 460)
  }
  const scrollToLeft = (event: any) => {
    event.preventDefault()
    event.target.parentNode.scrollLeft -= Math.min(event.target.parentNode.clientWidth, 460)
  }
  const getControlTypesCount = (course: CourseType) => {
    const controlTypes: { [key: string]: number } = {"exam": 0, "credit": 0, "diffCredit": 0, "coursework": 0}
    const nameToKey: { [key: string]: string } = {
      "Экзамен": "exam",
      "Зачет": "credit",
      "Дифференцированный зачет": "diffCredit",
      "Курсовая работа": "coursework"
    }
    course.control_types_count.forEach(type => {
      controlTypes[nameToKey[type.name]] = type.count
    })
    return controlTypes
  }

  return (
    <div className="TrajectoryChoicePageContainer pb-3">
      <h1 className="TrajectoryChoiceHeader">
        Готовые траектории
      </h1>
      <div className="TrajectoriesInfoCard d-flex align-items-center">
        <button
          className="border-0 pr-0 py-0 hideButton"
          onClick={(e) => {
            // @ts-ignore
            e.target.parentElement.classList.add('Hidden')
          }}

        >
          <Close width={10} height={10}/>
        </button>
        <PercentProgress percent={0.8}/>
        <div className="mr-2"/>
        Мы собрали подходяшие для тебя образовательные программы.
        <br/>
        Индикатор – процентное совпадение с твоими интересами.
      </div>
      {trajectories.map((trajectory: TrajectoryType) => {
        return (
          <div
            className="TrajectoriesCard mb-3"
            key={trajectory.id}
          >
            <div className="TrajectoriesCardHeader">
              <h5 className="trajectoryHeader mb-0">
                {trajectory.educational_plan}
                <span className={'eduDirectionCode'}>{trajectory.code.replace(/\.$/, "")}</span>
              </h5>
              <div className="d-flex align-items-center TrajectoriesCardProgress">
                <PercentProgress percent={trajectory.coverage}/>
                <span className="ml-2">
                    {Math.round(trajectory.coverage * 100)}% совпадений
                  </span>
              </div>
            </div>
            <div style={{position: "relative"}}>
            <div className="mt-3 trajectoryCardWrapper HiddenLeft" onLoad={shouldDrawScrollButton}
                 onScroll={shouldDrawScrollButton}>
              <button className="ScrollBtn Right" onClick={scrollToRight}>
                <Chevron/>
              </button>
              <button className="ScrollBtn Left" onClick={scrollToLeft}>
                <Chevron turn={Turn.left}/>
              </button>
              {trajectory.courses.map((course, index) => {
                return (
                  <div
                    className={`CourseCard trajectories-bg-${index}`}
                    key="index"
                    onClick={() => trajectoryChosen(trajectory, index + 1)}
                  >
                    <div className="CourseCardHeader">{index + 1} курс</div>
                    <div>
                    <div className="mt-2 smallTitle">Ты изучишь</div>
                    <div className="mt-2 keywordsWrapper row no-gutters">
                      {course.main_keywords.slice(0, 5).map((keyword, index) => {
                        return (
                          <span
                            key={keyword}
                            className="keywordWrapper mr-2 mb-2"
                          >
                            {keyword}
                          </span>
                        )
                      })}
                    </div>
                    </div>
                    <div>
                    <div className="mt-3 smallTitle">Ты сдашь</div>
                    <div className="ControlCardContainer">
                      {allControllTypes.map((controlTypeName) => {
                        return (
                          <ControlTypeTile
                            controlType={
                              course.control_types_count.find((controlType) => controlType.name === controlTypeName) ||
                              {name: controlTypeName, count: 0}
                            }
                          />
                        )
                      })}
                    </div>
                    </div>
                  </div>
                )
              })}
            </div>
            </div>
            <div className="mt-3 justify-content-between">
              <div className="TrajectoriesCardFooter">
                <button
                  onClick={() => trajectoryChosen(trajectory)}
                  className="ButtonTrajectory MainButton mr-2"
                >
                  Смотреть траекторию
                </button>
                <a
                  href={`https://abit.itmo.ru/en/programs/bachelor?title=${trajectory?.educational_plan.replace('', '+')}`}
                  target="_blank"
                  className="ButtonAbit"
                >
                  Читать больше на abit.itmo.ru
                </a>
              </div>
            </div>
          </div>
        )
      })}
      {/*<Random display-for-group="1" button=randomFeedback.firstOptionSelectButton*/}
      {/*                title="Как тебе предложенные программы? "/>*/}
      {/*<RandomFeedback display-for-group="2" button=randomFeedback.secondOptionSelectButton*/}
      {/*                title="Что-то на этой странице вызвало трудности? "/>*/}
    </div>
  )
};

export default Trajectories

