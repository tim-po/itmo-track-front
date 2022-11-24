import React, {useContext} from "react";
import './index.scss'
import {PresetType} from "../../types";
import ModalsContext from "../../Context/Modal";
import PresetIcon from "../PresetIcon";

// CONSTANTS

// DEFAULT FUNCTIONS

type PresetPropType = {
  // You should declare props like this, delete this if you don't need props
  displayAdd?: boolean
  preset: PresetType
  onClick?: () => void
}

const PresetDefaultProps = {
  // You should declare default props like this, delete this if you don't need props
  somePropWithDefaultOption: 'default value'
}

const Preset = (props: PresetPropType) => {
  // const {setKeywordsForModal} = useContext(ModalsContext)

  const {displayAdd, preset, onClick} = props;

  const selectSelf = () => {
    if (displayAdd) {
      alert('Please select a preset')
    } else {
      alert('Please unselect a preset')
    }
  }
  const openKeywordsModal = () => {
    // setKeywordsForModal(preset.keywords)
  }
  if (!preset) {
    return null;
  }
  return (
    <div className={`flexPreset`}>
      <div className={'preset'}>
        <div className="presetTitleImg">
          <div className="presetFlex">
            <div
              className="presetIconFlex"
            >
              <PresetIcon presetClass={preset.category}/>
              {preset.category}
            </div>
            <div className="tag mobil">
              {preset.tag}
            </div>
          </div>
          <div>
            {displayAdd &&
              <button
                className="pluse deck activ"
                onClick={selectSelf}
              >
                <img src="/static/pluse.svg"/>
              </button>
            }
          </div>
        </div>
        <div className="presetTitle">
          {preset.title}
        </div>
        <div className="smallTitle">
          {preset.keywords.slice(0, 5).map(keyword => {
            return (
              <div className="keywordspreset">
                {keyword.text}
              </div>
            )
          })}
          {preset.keywords.length > 5 &&
            <button onClick={openKeywordsModal} className="modalKeywords">
              +{preset.keywords.length - 5}
            </button>
          }
        </div>
        <button className="clickArea" onClick={onClick}/>
      </div>
    </div>
  )
};

Preset.defaultProps = PresetDefaultProps

export default Preset