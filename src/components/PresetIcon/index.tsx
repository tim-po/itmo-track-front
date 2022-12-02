import React, {useContext} from "react";
import './index.scss'
// @ts-ignore
import biz from '../../images/icons/Static/biz.svg'
// @ts-ignore
import optic from '../../images/icons/Static/optic.svg'
// @ts-ignore
import bio from '../../images/icons/Static/bio.svg'
// @ts-ignore
import art from '../../images/icons/Static/art.svg'
// @ts-ignore
import dev from '../../images/icons/Static/dev.svg'
// @ts-ignore
import science from '../../images/icons/Static/science.svg'

// CONSTANTS

const classes: {[key: string]: any} = {
    "Бизнес": {icon: biz, color: 'var(--color-2)'},
    "Soft Skills": {icon: biz, color: 'var(--color-2)'},
    "Оптика": {icon: optic, color: 'var(--color-1)'},
    "Разработка": {icon: dev, color: 'var(--color-8)'},
    "Наука": {icon: science, color: 'var(--color-7)'},
    "Art & Science": {icon: art, color: 'var(--color-4)'},
    "Биотехнологии": {icon: bio, color: 'var(--color-3)'}
}

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

type PresetIconPropType = {
    // You should declare props like this, delete this if you don't need props
    presetClass: string
}


export const PresetIcon = (props: PresetIconPropType) => {
    const {presetClass} = props;
    const currentClass = {...classes[presetClass], name: presetClass}
    return (
      <div className="presetIcon" style={{background: currentClass.color}}>
          <img src={currentClass.icon} alt="currentClass.name"/>
      </div>
    )
};


export default PresetIcon
