import React, {useContext, useEffect, useState} from "react";
import BgContext from "../../Context/Background";
import BackButtonContext from "../../Context/BackButton";
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import * as Scroll from "react-scroll";
import {CourseType, TrajectoryType} from "../../types";
import PercentProgress from "../../components/PercentProgress";

// CONSTANTS

const randomFeedback = {
      firstOptionSelectButton:['Ничего не подошло 🥲️', 'Странные теги 🤔','Мало информации  🤨','Отлично 👌'],
      secondOptionSelectButton:['Выбор траектории 🥲️', 'Как перейти дальше 🤔', 'Слишком много информации  🤯', 'Все понятно 👌']
  }

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make a new page

type TrajectoriesPropType = {
    someProp: any
    somePropWithDefaultOption?: string
}

const TrajectoriesDefaultProps = {
    somePropWithDefaultOption: 'default value'
}

const Trajectories = (props: TrajectoriesPropType) => {
    const [width, setWidth] = useState(0);
  const [trajectories, setTrajectories] = useState([]);
  const [trajectoriesIds, setTrajectoriesIds] = useState([]);
  const {setBg} = useContext(BgContext)
    const {setNewBackButtonProps} = useContext(BackButtonContext)
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

    useEffect(() => {
        setBg('#F1F2F8')

      setNewBackButtonProps("Выбор ключевых слов и пресетов", `/professionDetails?view=main&id=${localStorage.getItem('selectedProfession')}`)
        if (trajectories.length === 0) {
          const trajectoryIds = JSON.parse(searchParams.get('ids') || '[]')
          setTrajectoriesIds(trajectoryIds)
          axios.get(`/api/trajectories/?ids=${trajectoryIds[0]},${trajectoryIds[1]},${trajectoryIds[2]}`).then(res => {
            setTrajectories(res.data)
          })
        }
      let scroll = Scroll.animateScroll
      scroll.scrollToTop();

    }, [])

  const shouldDrawScrollButton = (event: any) => {
    const element = event.target
    if(!element){
      element.classList.remove('Hidden')
      element.classList.remove('HiddenLeft')
      return
    }

    if(element.scrollLeft + element.clientWidth >= element.scrollWidth -10){
      element.classList.add('Hidden')
      return
    }

    if(element.scrollLeft <= 10){
      element.classList.add('HiddenLeft')
      return
    }

    element.classList.remove('HiddenLeft')
    element.classList.remove('Hidden')
  }
  const trajectoryChosen = (trajectory: TrajectoryType, course = 1) => {
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
    const controlTypes: {[key: string]: number} = {"exam": 0, "credit": 0, "diffCredit": 0, "coursework": 0}
    const nameToKey: {[key: string]: string} = {"Экзамен": "exam", "Зачет": "credit", "Дифференцированный зачет": "diffCredit", "Курсовая работа": "coursework"}
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
              />
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
                </h5>
                <div className="d-flex align-items-center TrajectoriesCardProgress">
                  <PercentProgress percent={trajectory.coverage}/>
                  <span className="ml-2">
                    {Math.round(trajectory.coverage * 100)}% совпадений
                  </span>
                </div>
              </div>
              <div className="mt-3 trajectoryCardWrapper HiddenLeft" onLoad={shouldDrawScrollButton}
                   onScroll={shouldDrawScrollButton}>
                <button className="ScrollBtn Right" onClick={scrollToRight}/>
                <button className="ScrollBtn Left" onClick={scrollToLeft}/>
                {trajectory.courses.map((course, index) => {
                  return(
                    <div
                      className={`CourseCard mr-3 trajectories-bg-${index}`}
                      key="index"
                      onClick={() => trajectoryChosen(trajectory,index + 1 )}
                    >
                      <div className="CourseCardHeader">{index +1} курс</div>
                      <div className="mt-2 smallTitle">Ты изучишь</div>
                      <div
                        className="mt-2 keywordsWrapper row no-gutters"
                      >
                        {course.main_keywords.slice(0, 5).map((keyword, index) =>{
                          return(
                            <span
                              key={keyword}
                              className="keywordWrapper mr-2 mb-2"
                            >
                              {keyword}
                            </span>
                          )
                        })}
                      </div>
                      <div className="mt-3 smallTitle">Ты сдашь</div>
                      <div className="ControlCardContainer">
              {/*          <ControlTypeTile*/}

              {/*            class="listDisciplinesItem"*/}
              {/*            control-type="Экзамены"*/}
              {/*            count="getControlTypesCount(course).exam"*/}
              {/*          />*/}
              {/*          <ControlTypeTile*/}
              {/*            class="listDisciplinesItem"*/}
              {/*            control-type="Диф.зачет"*/}
              {/*            count="*/}
              {/*  getControlTypesCount(course).diffCredit*/}
              {/*"*/}
              {/*          />*/}
              {/*          <ControlTypeTile*/}
              {/*            class="listDisciplinesItem"*/}
              {/*            control-type="Зачеты"*/}
              {/*            count="getControlTypesCount(course).credit"*/}
              {/*          />*/}
              {/*          <ControlTypeTile*/}
              {/*            control-type="Курсовые"*/}
              {/*            count="getControlTypesCount(course).coursework"*/}
              {/*          />*/}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-3 justify-content-between">
                <div className="TrajectoriesCardFooter">
                  {trajectory.abit &&
                    <a href={trajectory.abit}>
                      <button className="ButtonAbit">Читать больше на abit.itmo.ru</button>
                    </a>
                  }
                  <button
                    onClick={() => trajectoryChosen(trajectory)}
                    className="ButtonTrajectory MainButton mr-2"
                  >
                    Смотреть траекторию
                  </button>
                </div>
              </div>
            </div>
          )
        })}
          {/*<RandomFeedback display-for-group="1" button=randomFeedback.firstOptionSelectButton*/}
          {/*                title="Как тебе предложенные программы? "/>*/}
          {/*<RandomFeedback display-for-group="2" button=randomFeedback.secondOptionSelectButton*/}
          {/*                title="Что-то на этой странице вызвало трудности? "/>*/}
      </div>
    )
};

Trajectories.defaultProps = TrajectoriesDefaultProps

export default Trajectories
