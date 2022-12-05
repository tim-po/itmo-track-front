import React, {useEffect, useState} from "react";
import './index.scss';
import axios from "axios";
import {BASE_URL, colors} from "../../../constants";
import {TrajectoryDisciplineType} from 'types'
import {useSearchParams} from "react-router-dom";

type TrajectoryDisciplineModalPropType = {
  id: number
}

enum DisciplineMovement {
  left = 'left',
  right = 'right',
  none = 'none'
}

const TrajectoryDisciplineModal = (props: TrajectoryDisciplineModalPropType) => {

  const {id} = props
  const [searchParams] = useSearchParams()
  const [trajectoryDisciplineData, setTrajectoryDisciplineData] = useState<TrajectoryDisciplineType | undefined>(undefined)
  const [sortedPrevDisciplines, setSortedPrevDisciplines] = useState<{ id: number, name: string, semester:number }[]>([])
  const [sortedNextDisciplines, setSortedNextDisciplines] = useState<{ id: number, name: string, semester: number }[]>([])
  const [replacementOptions, setReplacementOptions] = useState<{ id: number, name: string }[]>([]);
  const [filteredReplacementOptions, setFilteredReplacementOptions] = useState<{ id: number, name: string }[]>([]);
  const [isOtherReplacementOptionsOpen, setIsOtherReplacementOptionsOpen] = useState<boolean>(false)
  const [movement, setMovement] = useState<DisciplineMovement>(DisciplineMovement.none)

  const [initialDisciplineId, setInitialDisciplineId] = useState<number>(0)


  const getDisciplineData = async (disciplineId?: number) => {
    try {
      const response = await axios.get(`${BASE_URL}trajectory_disciplines/${disciplineId ? disciplineId : id}/`)
      setTrajectoryDisciplineData(response.data)
      setMovement(DisciplineMovement.none)
    } catch (e) {
      console.log(e)
    }
  }

  const sortPrevDisciplines = () => {
    if (!trajectoryDisciplineData || !trajectoryDisciplineData.prev_disciplines) {
      return []
    }

    const result = trajectoryDisciplineData.prev_disciplines.sort(itemInner => Math.abs(itemInner.semester - trajectoryDisciplineData.semester)).reverse()

    if(result[0]){
      setSortedPrevDisciplines([result[0]])
    }else{
      setSortedPrevDisciplines([])
    }
  }

  const sortNextDisciplines = () => {
    if (!trajectoryDisciplineData || !trajectoryDisciplineData.next_disciplines) {
      return []
    }

    console.log(trajectoryDisciplineData.next_disciplines)

    const result = trajectoryDisciplineData.next_disciplines.sort(itemInner => Math.abs(trajectoryDisciplineData.semester - itemInner.semester)).reverse()
    if(result[0]){
      setSortedNextDisciplines([result[0]])
    }else{
      setSortedNextDisciplines([])
    }
  }

  const toggleReplacementOptions = () => {
    setIsOtherReplacementOptionsOpen(!isOtherReplacementOptionsOpen)
  }

  useEffect(() => {
    getDisciplineData()
  }, [])

  useEffect(() => {
    if(initialDisciplineId === 0 && trajectoryDisciplineData){
      setInitialDisciplineId(trajectoryDisciplineData.id)
    }
  }, [trajectoryDisciplineData])

  useEffect(() => {
    sortPrevDisciplines()
    sortNextDisciplines()
    if(trajectoryDisciplineData && trajectoryDisciplineData.replacement_options){
      setReplacementOptions([{id: trajectoryDisciplineData.id, name:trajectoryDisciplineData.name}, ...trajectoryDisciplineData.replacement_options])
    }
  }, [trajectoryDisciplineData])

  useEffect(() => {
    if (trajectoryDisciplineData) {
      setFilteredReplacementOptions(replacementOptions.filter(item => item.id != trajectoryDisciplineData.id))
    }
  }, [replacementOptions, trajectoryDisciplineData])

  return (
    <div className={`containerDiscipline move-${movement}`}>
      {trajectoryDisciplineData &&
        <>
          <div
            className="disciplineImage"
            style={{background: `${colors[trajectoryDisciplineData.class]}`}}
          >
            <h3 className={'ModalClassHeaderText'}>
              {trajectoryDisciplineData.class}
            </h3>
            <div className="subjectsFlex">
              {trajectoryDisciplineData.prev_disciplines?.length ?
                <p className="TextCenter modalColHeader">
                  Сначала изучить
                </p>
                :
                ''
              }
              <div style={{position: 'relative'}}>
                {sortedPrevDisciplines.map(sortedDiscipline => (
                  <button
                    key={sortedDiscipline.semester}
                    className="disciplineCardModal mx-auto"
                    onClick={() => {
                      getDisciplineData(sortedDiscipline.id)
                    }}
                  >
                    {sortedDiscipline.name}
                  </button>
                ))}
              </div>
            </div>
            <div
              className="subjectsFlex"
            >
              <p
                className="TextCenter modalColHeader">
                {trajectoryDisciplineData.semester} семестр
              </p>
              <div>
                <button
                  key={trajectoryDisciplineData.semester}
                  className="disciplineCardModal mx-auto"
                  onClick={toggleReplacementOptions}
                >
                  {trajectoryDisciplineData.name}
                  {filteredReplacementOptions.length ?
                    <img
                      src="/static/arrowBottom.svg"
                      alt="arrow"
                      className={`Arrow ${isOtherReplacementOptionsOpen ? 'open' : 'close'}`}
                    />
                    :
                    ''
                  }
                </button>
                {filteredReplacementOptions.length ?
                  <div
                    className={`disciplineCardModal fallingDiscipline mx-auto mt-3 replacement_options ${isOtherReplacementOptionsOpen ? 'open' : 'close'}`}
                  >
                    {filteredReplacementOptions.map(replacementOption => (
                      <button
                        className={`discipline ${initialDisciplineId === replacementOption.id ? 'selected': ''}`}
                        onClick={() => {
                          toggleReplacementOptions()
                          getDisciplineData(replacementOption.id)
                        }}
                      >
                        {replacementOption.name}
                      </button>
                    ))}
                  </div>
                  :
                  ''
                }
              </div>
            </div>
            <div className="subjectsFlex">
              {sortedNextDisciplines.length ?
                <p
                  className={`TextCenter modalColHeader`}>
                  Где пригодится
                </p>
                :
                ''
              }
              {sortedNextDisciplines.length ?
                <div>
                  {sortedNextDisciplines.map(nextDiscipline => (
                    <button
                      key={nextDiscipline.semester}
                      className="disciplineCardModal mx-auto"
                      onClick={() => {
                        getDisciplineData(nextDiscipline.id)
                      }}
                    >
                      {nextDiscipline.name}
                    </button>
                  ))}
                </div>
                :
                ''
              }
              <div>

                <div
                  // v-for="disc in sort(discipline.next_disciplines)"
                  // className="disc ? furtherUse= true  ''"
                  // className="disciplineCardModal mb-2 mx-auto"
                >
                  {/*{{disc}}*/}
                </div>
              </div>
            </div>
          </div>
          <div className="disciplineModalContent">
            <div
              className="justify-content-between align-items-center mb-4 containerName">
              <h5
                className="discModalHeader mb-0"
                style={{maxWidth: '700px'}}
              >
                {trajectoryDisciplineData.name}
              </h5>
              <div className="tags">
              <span
                className={`disciplineDetail ${trajectoryDisciplineData.necessity && 'discipline-detail-pink'} ${!trajectoryDisciplineData.necessity && 'discipline-detail-green'}`}
              >
                {
                  trajectoryDisciplineData.necessity ?
                    "Обязательный предмет"
                    :
                    "Предмет по выбору"
                }
              </span>
                <span className="disciplineDetail disciplineDetailYellow">
                  {trajectoryDisciplineData.control}
                </span>
              </div>
            </div>
            <p className="modalKeywordsHeader">
              Полученные знания и навыки -
              <span
                className="modalKeywordsCoverage"
                style={{color: `${colors[trajectoryDisciplineData.class]}`}}
              >
                {` Пересечение с ключевыми словами ${Math.round(trajectoryDisciplineData.keywords_coverage * 100)}%`}
              </span>
            </p>
            <div className={'aligned-keywords-wrapper'}>
              {trajectoryDisciplineData.keywords_aligned_with_user.map(keyword => (
                <div
                  className="modalKeyword mr-2 mb-2"
                  style={{background: `${colors[trajectoryDisciplineData.class]}60`}}
                >
                  {keyword}
                </div>
              ))}
              {trajectoryDisciplineData.keywords.filter(word => !trajectoryDisciplineData.keywords_aligned_with_user.includes(word) && word !== '').map(keyword => (
                <div
                  style={{background: `${colors[trajectoryDisciplineData.class]}20`}}
                  className="mr-2 mb-2 modalKeyword"
                >
                  {keyword}
                </div>
              ))}
            </div>
          </div>
        </>
      }
    </div>
  )
};

export default TrajectoryDisciplineModal;