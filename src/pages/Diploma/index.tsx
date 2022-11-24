import React, {useContext, useEffect, useRef, useState} from "react";
import './index.scss';
import Description from "components/DiplomaGeneral/Description";
import Keywords from "components/DiplomaGeneral/Keywords";
import BgContext from "Context/Background";
import axios from "axios";
import {BASE_URL, colors} from "../../constants";
import {makeKeywordsArray} from "utils/makeKeywordsArray";
import {KeywordType} from "types";
import ModalsContext from "Context/Modal";
import Card from "components/DiplomaGeneral/Card";
import GenericModal from "components/GenericModal";
import ShareModal from "components/Modals/ShareModal";

import Button from "components/Button";
import {useSearchParams} from "react-router-dom";
import SwapModal from "components/Modals/SwapModal";
import KeywordsModal from "components/Modals/KeywordsModal";


type DiplomaPropType = {}

const DiplomaDefaultProps = {}

const Diploma = (props: DiplomaPropType) => {
  const {setBg} = useContext(BgContext)
  const {displayModal} = useContext(ModalsContext)

  const cardRef = useRef();

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
      <div className="diploma-container">
        <div className="tiles-wrapper">
          <div className="left-tiles">
            <Description iconUrl={'/static/star.svg'} title={'Высшее образование'}/>
            <Keywords
              keywords={keywords}
              keywordsCount={keywords?.length}
              isKeywordsButtonHidden
            />
            <SwapModal
              modalHeight={250}
              elementRef={cardRef}
              classes={[
                'white-tile-wrapper'
              ]}
            >
              <h6 className="marginText">
                Это твоя траектория в университете ИТМО!
                <br/>
                Поступай к нам чтобы изучать то, что нравится.
              </h6>
              <div className="buttons-wrapper">
                <Button
                  buttonStyle={'main'}
                  isDisabled={false}
                  onClick={() => window.open(`https://abit.itmo.ru/en/programs/bachelor?title=${diplomaData?.educational_plan.replace('', '+')}`, '_blank')}
                  classNames={['mobile-button']}
                >
                  <span className={'button-text'}>Поступить в ИТМО</span>
                </Button>
                <Button
                  buttonStyle={'secondary'}
                  onClick={() => displayModal(<ShareModal />)}
                  isDisabled={false}
                  classNames={['mobile-button']}
                >
                  <div className="share-button-content">
                    <span className={'button-text'}>Поделиться</span>
                    <img
                      src="/static/share.svg"
                      alt="share"
                      className={'share-icon'}
                    />
                  </div>
                </Button>
              </div>
            </SwapModal>
          </div>
          <div className="right-tiles">
            <div className="white-tile-wrapper disciplines-tile">
              <h6 className="tileHeader">Изучу {diplomaData?.total_disciplines} дисциплины</h6>
              <div className="disciplines-wrapper">
                {diplomaData?.classes_count.map((classItem: any) => (
                  <Card
                    name={classItem.name}
                    title={classItem.count}
                    subtitle={classItem.name}
                    isDiplomaCard
                    classNames={['mobile-card']}
                  />
                ))}
              </div>
            </div>
            <div className="white-tile-wrapper control-types-tile">
              <h6 className="tileHeader">Сдам</h6>
              <div className="control-types-wrapper">
                {diplomaData?.control_types_count.map((controlType: any) => (
                  <Card
                    name={controlType.name}
                    title={controlType.count}
                    subtitle={controlType.name}
                    isDiplomaCard
                    isControlTypeCard
                    classNames={[
                      'mobile-card',
                      'control-type-card-mobile'
                    ]}
                  />
                ))}
              </div>
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
        <ShareModal/>
      </GenericModal>
    </>
  )
};

Diploma.defaultProps = DiplomaDefaultProps

export default Diploma
