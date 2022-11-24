import React, {useContext, useEffect, useState} from "react";
import './index.scss';
import Description from "components/DiplomaGeneral/Description";
import Keywords from "components/DiplomaGeneral/Keywords";
import BgContext from "Context/Background";
import axios from "axios";
import {BASE_URL, colors} from "../../constants";
import {makeKeywordsArray} from "utils/makeKeywordsArray";
import {KeywordType} from "types";
import ModalsContext from "Context/KeywordsModal";
import Card from "components/DiplomaGeneral/Card";
import GenericModal from "components/GenericModal";
import ShareModal from "components/Modals/ShareModal";
import { useSearchParams } from "react-router-dom";


type DiplomaPropType = {}

const DiplomaDefaultProps = {}

const Diploma = (props: DiplomaPropType) => {
  const {setBg} = useContext(BgContext)
  const {setKeywordsForModal, setDisciplinesForModal} = useContext(ModalsContext)

  const [diplomaData, setDiplomaData] = useState<any>(undefined);
  const [keywords, setKeywords] = useState<KeywordType[]>([]);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const [searchParams] = useSearchParams()

  const getDiplomaData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}trajectories/${searchParams.get('id')}/diploma/`)
      setDiplomaData(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  const openDisciplinesModal = (course: any, headerBg: string, item: any, isControlTypesModal: boolean, typeOfControlType?: string) => {
    setDisciplinesForModal(course, headerBg, item, isControlTypesModal, typeOfControlType)
  }

  const openKeywordsModal = () => {
    setKeywordsForModal(keywords || [])
  }

  const closeShareModal = () => {
    setIsShareModalOpen(false)
  }

  useEffect(() => {
    setBg('#F1F2F8')
    getDiplomaData()
  }, []);

  useEffect(() => {
    if (diplomaData && diplomaData.main_keywords.length) {
      const keywordsArray = makeKeywordsArray(diplomaData.main_keywords)
      setKeywords(keywordsArray)
    }
  }, [diplomaData])

  return (
    <>
      <div className="diplomaContainer">
        <div className="leftTiles">
          <Description iconUrl={'/static/star.svg'} title={'Высшее образование'}/>
          <Keywords
            keywords={keywords}
            keywordsCount={keywords?.length}
            openKeywordsModal={openKeywordsModal}
            isKeywordsButtonHidden
          />
          <div className="MobilFix">
            <div className="DiplomaCard">
              <h6 className="marginText">
                Это твоя траектория в университете ИТМО!
                <br/>
                Поступай к нам чтобы изучать то, что нравится.
              </h6>
              <div className="d-flex">
                <a href="`https://abit.itmo.ru/en/programs/bachelor?title=${diploma.educational_plan.replace('', '+')}`"
                   target="_blank" className="MainButton mainButtonDiploma">
                  Поступай в ИТМО
                </a>
                <button
                  className="SecondaryButton secondary-button-diploma secondary-button-diploma-with-icon"
                  onClick={() => setIsShareModalOpen(true)}
                >
                  Поделиться
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="rightTiles">
          <div className="DiplomaCard">
            <h6 className="tileHeader">Изучу {diplomaData?.total_disciplines} дисциплины</h6>
            <div className="tilesFlex">
              {diplomaData?.classes_count.map((classItem: any) => (
                <Card
                  name={classItem.name}
                  title={classItem.count}
                  subtitle={classItem.name}
                  openDisciplinesModal={() => openDisciplinesModal(classItem.name, colors[classItem.name], classItem.disciplines, false)}
                  isDiplomaCard
                />
              ))}
            </div>
            <div className="mobi-opacity-block"/>
          </div>
          <div className="card DiplomaCard slider mt-4">
            <h6 className="tileHeader">Сдам</h6>
            <div className="tilesFlex rent">
              {diplomaData?.control_types_count.map((controlType: any) => (
                <Card
                  name={controlType.name}
                  title={controlType.count}
                  subtitle={controlType.name}
                  openDisciplinesModal={() => openDisciplinesModal('', colors[controlType.name], controlType.disciplines, true, controlType.name)}
                  isDiplomaCard
                />
              ))}
            </div>
          </div>
        </div>
        {/*<RandomFeedback display-for-group="5" button=buttonFeedback title="Что бы ты добавил в диплом?"/>*/}
        {/*<RandomFeedback display-for-group="6" button=buttonFeedbackTho title="Ты хотел бы сохранить результат?"/>*/}
        {/*<RandomFeedback display-for-group="7" isSecondary="true" button=buttonFeedbackTrack*/}
        {/*                title="Тебе понравилась составленная траектория?"/>*/}
        {/*<RandomFeedback display-for-group="7" button=buttonFeedbackTrack title="Тебе было удобно пользоваться сайтом?"/>*/}
      </div>
      <GenericModal
        modal={isShareModalOpen}
        colorCloseWhite={false}
        hideMobile={false}
        hideDesktop={false}
        onModalClose={closeShareModal}>
          <ShareModal />
      </GenericModal>
    </>
  )
};

Diploma.defaultProps = DiplomaDefaultProps

export default Diploma
