import React, {useContext, useState} from "react";
import './index.scss'
import {CountType} from "types";
import PromptImg from "../../../images/icons/questionСircle";

type ControlTypeModalPropType = {
  controlType: (CountType & { disciplines?: CountType[] | string[] })
}

const ControlTypeModalDefaultProps = {}

const ControlTypeModal = (props: ControlTypeModalPropType) => {
  const {controlType} = props;
  const [isTooltipActive, setIsTooltipActive] = useState(false)

  const getTooltipMessage = (name: string) => {
    if (name === "Экзамен" || name === "Экзамены") {
      return 'Проверка знаний по выбранному билету. Ставится оценка'
    } else if (name === "Факультатив" || name === "Факультативы") {
      return 'Дополнительные учебные предметы на твой выбор'
    } else if (name === "Зачет" || name === "Зачеты") {
      return 'Проверка готовности к экзамену по всей программе. Оценка не ставится'
    } else if (name === "Курсовые" || name === "Курсовая") {
      return 'Учебная работа с элементами научных исследований'
    } else if (name === "Диф.зачеты" || name === "Диф.зачет") {
      return 'Проверка знаний по всей программе. Ставится оценка'
    } else if (name === "chosen") {
      return 'Учебные предметы на твой выбор'
    } else if (name === "necessary") {
      return 'Учебные предметы обязательные для изучения'
    } else {
      return 'Ждем текст от ДСК'
    }
  }

  const getModalTitle = (name: string) => {
    if (name === 'necessary') {
      return 'Обязательные'
    } else if (name === 'chosen') {
      return 'По выбору'
    } else {
      return name
    }
  }


  return (
    <div className="disciplineModalContainer">
      <div className="ContainerNameButton">
        <h1 className="KeywordsModalHeader">
          {getModalTitle(controlType.name)}
        </h1>
        <div className="VectorStroke" onMouseEnter={() => setIsTooltipActive(true)} onMouseLeave={() => setIsTooltipActive(false)}>
        <PromptImg color={isTooltipActive ? "#8533FF" : "#B7B6BC"} />
          {isTooltipActive &&
            <div className="Prompt">
              {getTooltipMessage(controlType.name)}
            </div>
          }
        {/*</PromptImg>*/}
        </div>
      </div>
      <div className="ExamModalContainer">
        <div className="KeywordsModalContent">
          {controlType.disciplines && controlType.disciplines.map(discipline => (
            <div className="ListExamModal">
              {typeof discipline !== "string" && discipline.name || (discipline as unknown as string)}
              <hr/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

ControlTypeModal.defaultProps = ControlTypeModalDefaultProps

export default ControlTypeModal
