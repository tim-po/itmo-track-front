import React, { useContext, useState } from "react";
import './index.scss'
import axios from "axios";
import Heart from "../../../../images/icons/Static/heart";

const FeedbackStatic = () => {
  const [checkSubmit, setCheckSubmit] = useState(false)
  const [user, setUser] = useState({email:'', text:'', feedback_type:'profession'})
  const [email, setEmail] = useState("")
  const [text, setText] = useState("")
  const [values, setValues] = useState("");
  const [validationForm, setValidationForm] = useState<Boolean>(true)

  function handleClick() {
    if (!text) {
      setValues('Это поле должно быть заполнено');
      setValidationForm(false)
      return
    }
    setCheckSubmit(true)
    setUser( {email: email, text: text, feedback_type: 'profession'})
    console.log(user)
    axios.post(`/feedback/`, user, {
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err.response);
    })

  }
  return (
    <div className="container-form">
      { !checkSubmit ?
      <div className="form">
        <span className="title">Расскажи, какой профессии тебе не хватает?</span>
        <div className="containerText">
          <textarea  value={text} onChange={(e) => setText(e.target.value)} placeholder="Комментарий"
                    className={`${validationForm? '':'validation'} first-form`} />
          <span className="prompt">{values ? values : ''}</span>
        </div>
        <div className="containerEmail">
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email"
                 className="secondary-form" />
          <span></span>
        </div>
        <div className="containerButton">
          <button className="cancellation ">Отмена</button>
          <button className="submit" onClick={handleClick}>Отправить</button>
        </div>
      </div>
      :
        <div className="RequestSent">
          <div className="heartImg">
            <Heart/>
          </div>
          <div className="title">Ответ отправлен!</div>
          <div className="gratitude">Каждый ответ помогает сделать наш сервис еще удобнее. Спасибо! </div>
          <div className="containerButton">
            <button className="closeModal">Круто</button>
          </div>
        </div>
      }
    </div>

  );
};

export default FeedbackStatic;
