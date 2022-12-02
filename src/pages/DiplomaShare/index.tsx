import React, {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../constants";
import './index.scss';
import BgContext from "Context/Background";
import {KeywordType} from "types";
import ModalsContext from "Context/Modal";
import {useNavigate, useSearchParams} from "react-router-dom";
import Link from 'components/Link';
import Description from "components/DiplomaGeneral/Description";
import Keywords from "components/DiplomaGeneral/Keywords";
import {makeKeywordsArray} from "utils/makeKeywordsArray";
import Card from "components/DiplomaGeneral/Card";
import Button from "components/Button";
import SwapModal from "components/Modals/SwapModal";
import {DiplomaShareDataType} from "types"
import Like from "images/icons/Static/like";

type DiplomaSharePropType = {}

const DiplomaShareDefaultProps = {}

const DiplomaShare = () => {
  const {setBg} = useContext(BgContext)
  // const {setDisciplinesForModal, setKeywordsForModal} = useContext(ModalsContext)

  const cardRef = useRef();

  const [diplomaShareData, setDiplomaShareData] = useState<DiplomaShareDataType | undefined>(undefined);
  const [keywords, setKeywords] = useState<KeywordType[]>([]);

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const getDiplomaShareData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}trajectories/${searchParams.get('id')}/share/`)
      setDiplomaShareData(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  const getDeclension = (count: number) => {
    count %= 100;
    if (count >= 5 && count <= 20) {
      return "предметов";
    }
    count %= 10;
    if (count === 1) {
      return "предмет";
    }
    if (count >= 2 && count <= 4) {
      return "предмета";
    }
    return "предметов";
  }

  useEffect(() => {
    getDiplomaShareData()
    setBg('#F1F2F8')
  }, [])

  useEffect(() => {
    if (diplomaShareData && diplomaShareData.main_keywords.length) {
      const keywordsArray = makeKeywordsArray(diplomaShareData.main_keywords)
      setKeywords(keywordsArray)
    }
  }, [diplomaShareData])

  return (
    <div className="DiplomaPage">
      <div className="justify-content-between mb-0 align-items-center">
        <h5
          className="mb-0 titleShare">Траектория построена для {searchParams.get('name') ? searchParams.get('name') : 'анонимного будущего студента'}</h5>
        <div>
        </div>
      </div>
      <div className="DiplomaContainerShare">
        <div className="DiplomaCardShareLeft">
          <Description iconUrl={'/images/school.svg'} title={diplomaShareData ? diplomaShareData.educational_plan : ''}/>
          <Keywords
            keywords={keywords?.slice(0, 10)}
            keywordsCount={keywords?.length}
            isKeywordsButtonHidden={false}
          />
          <SwapModal
            modalHeight={250}
            elementRef={cardRef}
            classes={[
              'diplomaCardAbout',
            ]}
          >
            <div className="row">
              <div className="likes-icon">
                <Like/>
              </div>
              <div className="col">
                <div className="mb-2">
                  Этот образовательный маршрут построен с помощью <a href="/" className="TrackLink">ITMO.TRACK</a>.Ты
                  можешь создать свою траекторию вместе с нами!
                </div>
                <div className="buttons-wrapper">
                  <Button
                    buttonStyle={'secondary'}
                    onClick={() => navigate('/')}
                    isDisabled={false}
                    classNames={['mobile-button']}
                  >
                    <span>Хочу так же</span>
                  </Button>
                  <Link href={diplomaShareData ? diplomaShareData.educational_plan.replace('', '+') : ''}>Читать больше на abit.itmo.ru</Link>
                </div>
              </div>
            </div>
          </SwapModal>
        </div>
        <div className="MargTopMobil">
          <div className="DiplomaCard mb-4">
            <div className="d-flex flexColumn DiplomaDisciplinesCard">
              <div className="LineImg"/>
              {diplomaShareData?.courses.map((course: any) => (
                <div className="flex-grow-1 mr-3 blockShare" key={course.course}>
                  <p
                    className="TextCenter mobilNone diplomaDisciplinesCount">{course.disciplines_count} {getDeclension(course.disciplines_count)}</p>
                  <p className="CourseLabel">{course.course} курс</p>
                  <div className="d-flexMobil">
                    {course.classes.map((item: any) => (
                      <Card
                        onClick={() => {}}
                        isDiplomaCard={false}
                        name={item.name}
                        title={item.name}
                        subtitle={item.disciplines_count}
                        classNames={['mobile-card-share']}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

DiplomaShare.defaultProps = DiplomaShareDefaultProps

export default DiplomaShare

