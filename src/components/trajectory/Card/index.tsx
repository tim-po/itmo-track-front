import React, {useContext, useState} from "react";
import './index.scss'
import {ClassType, CourseType, DisciplineType} from "../../../types";
import {colors} from "../../../constants";
import TrajectoryDisciplineModal from "../../Modals/TrajectoryDisciplineModal";
import ModalContext from "../../../Context/Modal";
import { isMobile } from "react-device-detect";

// CONSTANTS

// DEFAULT FUNCTIONS

type CardPropType = {
  selectedSphere: string | undefined,
  sphere: ClassType,
  selectSelf: () => void
}

const CardDefaultProps = {}

const Card = (props: CardPropType) => {

  const {displayModal} = useContext(ModalContext)

  const {selectSelf, selectedSphere, sphere} = props;
  const getArrowDisciplineNames = (sphere: ClassType) => {
    const disciplinesWithArrows: string[] = []
    sphere['first_semesters_disciplines'].forEach((discipline) => {
      if (discipline.next_disciplines.length > 0) {
        disciplinesWithArrows.push(discipline.name)
      }
    })
    return disciplinesWithArrows
  }
  const [activeSemesterIndex, setActiveSemesterIndex] = useState('first_semesters_disciplines');
  const getDisciplines = (sphere: ClassType, index: 'first_semesters_disciplines' | 'second_semesters_disciplines') => {
    const disciplines = [...sphere[index]].sort((dis1, dis2) => {
      const discsWithArrows = getArrowDisciplineNames(sphere)
      const dis1InclusionNumber = discsWithArrows.includes(dis1.name) ? 1 : -1
      const dis2InclusionNumber = discsWithArrows.includes(dis2.name) ? 1 : -1
      return ((dis2InclusionNumber - dis1InclusionNumber) * 10 + (dis2.name > dis1.name ? 1 : -1))
    })
    return disciplines
  }

  const switchSemesters = () => {
    if (activeSemesterIndex === 'second_semesters_disciplines') {
      setActiveSemesterIndex('first_semesters_disciplines')
    } else if (activeSemesterIndex === 'first_semesters_disciplines') {
      setActiveSemesterIndex('second_semesters_disciplines')
    }
  }

  return (
    <div
      className={`ClassCard ${selectedSphere === sphere.name ? 'open' : ''}`}
      key="sphere.name"
      style={{background: colors[sphere.name]}}
    >
      <div className="ClassHeader" onClick={selectSelf}>
        <div className="ClassHeaderText">{sphere.name}</div>
        <button className="ClassOpenButton">
          <img
            src="/static/arrowDown.svg"
            className={`Arrow ${selectedSphere === sphere.name ? 'open' : ''}`}
          />
        </button>
      </div>
      <div className="bodyCard">
      <div className="Semester">
        <p className="TrajectorySmallHeader">Осень</p>
        <p className="TrajectorySmallHeader">Весна</p>
      </div>
      <div className="SemestersRow">
        {[
          'first_semesters_disciplines',
          'second_semesters_disciplines',
        ].map((index) => {
          return (
            <div
              className={`SemesterCol ${((index === activeSemesterIndex) ? 'On' : 'Off')}  ${index}`}
              key={index}
              // id="getTooltipId(sphere, index)"
            >
              <div className="SemesterSeparator"/>
              <button
                className={`BottomDisclosure ${(index === activeSemesterIndex) ? 'On' : 'Off'}`}
                onClick={(index === activeSemesterIndex) ? () => {
                } : switchSemesters}
              >
                {/*@ts-ignore*/}
                {getDisciplines(sphere, index).map(discipline => {
                  return (
                    <div
                      className="ModalCardButton"
                      key={discipline.id}
                    >
                      <div
                        className="DisciplineCardWrapper"
                        onClick={(index === activeSemesterIndex || !(isMobile)) ? () => displayModal(<TrajectoryDisciplineModal id={discipline.id} />):  () =>{}}
                      >
                        <div className="DisciplineCard">
                          <div className="flex-row flex-block justify-content-between">
                            <div
                              className={`DisciplineCardType ${discipline.necessity === 'chosen' ? 'optional' : ''}`}
                            >
                              <span> {
                                discipline.necessity === "necessary"
                                  ? "Обязательная" :
                                  "По выбору"
                              }</span>
                            </div>
                            <div className="ChangeType">
                              {
                                discipline.control_type === "Дифференцированный зачет"
                                  ? "Диф. зачет" :
                                  discipline.control_type
                              }
                            </div>
                          </div>
                          <div
                            className={`discipline-card-name ${discipline.necessity === 'chosen' ? 'optional' : ''}`}
                          >
                            <span>{discipline.name}</span>
                          </div>
                        </div>
                      </div>
                      {getArrowDisciplineNames(sphere).includes(discipline.name) && index === 'first_semesters_disciplines' &&
                        <div
                          className="discipline-arrow">
                          <img className="DisciplineArrowPointer" src="/static/discArrow.svg"/>
                        </div>
                      }
                    </div>
                  )
                })}
              </button>
            </div>
          )
        })}
      </div>
      </div>
    </div>
  )
};

Card.defaultProps = CardDefaultProps

export default Card
