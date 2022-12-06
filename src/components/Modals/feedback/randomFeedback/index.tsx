import React, { useContext, useState } from "react";
import "./index.scss";
import axios from "axios";
import Heart from "../../../../images/icons/Static/heart";
import { allControllTypes } from "../../../../constants";
import ControlTypeTile from "../../../ControlTypeTile";

const RandomFeedback = ({ displayForGroup = "", title = "", selectButtons = [""] }) => {
  const [checkSubmit, setCheckSubmit] = useState(false);
  const [user, setUser] = useState({ email: "", text: "", feedback_type: "profession" });
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [selectButton, setSelectButton] = useState(Number)

  function handleClick() {
    setCheckSubmit(true);
    setUser({ email: email, text: text, feedback_type: "profession" });
    console.log(user);
    axios.post(`/feedback/`, user, {}).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err.response);
    });

  }

  return (
    <div className="container-form-random-feedback">
      {!checkSubmit ?
        <div className="form">
          <span className="title">{title}</span>

            <div className="bottomFeedback">
            {selectButtons.map((controlTypeName,index) => {
            return(
              <button onClick={() =>setSelectButton(index)} className={`selectButton ${selectButton === index? 'active':''}`}>{controlTypeName}</button>
            );
            })}
            </div>

          <div className="containerText">
            <span className="descriptionСontainerText">Или расскажи подробнее </span>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Комментарий" className="first-form" />
          </div>
          <div className="containerButton">
            <button className="cancellation ">Отмена</button>
            <button className="submit" onClick={handleClick}>Отправить</button>
          </div>
        </div>
        :
        <div className="RequestSent">
          <div className="heartImg">
            <Heart />
          </div>
          <div className="title">Ответ отправлен!</div>
          <div className="gratitude">Каждый ответ помогает сделать наш сервис еще удобнее. Спасибо!</div>
          <div className="containerButton">
            <button className="closeModal">Круто</button>
          </div>
        </div>
      }
    </div>

  );
};

export default RandomFeedback;
