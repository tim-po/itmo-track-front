import React, {useContext, useEffect} from "react";
import {COLORS_BY_CATEGORY} from "../../constants";
import {Profession} from "../../types";
import './index.scss'

// CONSTANTS

// DEFAULT FUNCTIONS

type ProfessionCardPropType = {
  profession: Profession
}

const ProfessionCard = (props: ProfessionCardPropType) => {
  const {profession} = props;

  const animateSvg = (svg: Element) => {
    let style = document.getElementById('svgAnimeStyles')
    if (!style) {
      style = document.createElement('style');
      style.setAttribute('type', 'text/css')
      style.setAttribute('id', 'svgAnimeStyles')
    }

    svg.querySelectorAll('.svgAnime').forEach((animatedChild, index) => {
      const classList = animatedChild.classList
      animatedChild.classList.add(`n${index}`)
      const transforms = classList[1].split('+')
      let cssTransform = 'transform: '
      transforms.forEach(transform => {
        cssTransform += transform
      })
      cssTransform += ';'

      const css = `.ProfessionCardButton:hover .icon-wrapper-${profession.id} .n${index}{${cssTransform}}`

      // @ts-ignore
      style.appendChild(document.createTextNode(css));
    })
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  useEffect(() => {
    if (profession.id) {
      const div = document.getElementsByClassName(`icon-wrapper-${profession.id}`)[0]
      div.innerHTML = profession.svg
      animateSvg(div)
      // div.innerHTML = this.profession.svg
      // this.animateSvg(div)
      // fetch(`/api/professions/${this.profession.id}/svg/`)
      //   .then(res => res.json())
      //   .then(res => {
      //     const div = document.getElementsByClassName(`icon-wrapper-${this.profession.id}`)[0]
      //     div.innerHTML = this.profession.svg
      //     this.animateSvg(div)
      //   })
    }
  })

  return (
    <div className="professionCard">
      <div className="cardData">
        <h4 className="professionCardTitle">{profession.name}</h4>
        <div className="professionCardKeywords">
          {profession.visible_keywords.sort((word1, word2) => {
            return (word1.text.length - word2.text.length)
          }).map((keyword, index) => {
            return (
              <div
                key={keyword.id}
                className="professionCardKeyword" style={{background: COLORS_BY_CATEGORY[profession.category]}}
              >
                {keyword.text}
              </div>
            )
          })}
        </div>
        <div className="professionCardCategory">{profession.category}</div>
      </div>
      <div className={`icon-wrapper-${profession.id}`}/>
    </div>
  )
};

export default ProfessionCard

