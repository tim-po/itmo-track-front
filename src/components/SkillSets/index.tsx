import React, {useContext, useEffect, useState} from "react";
import './index.scss'
import SelectedPresets from "../SelectedPresets";
import Preset from "components/Preset";
import {PresetType} from "../../types";
import * as Scroll from "react-scroll";

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

type SkillSetsPropType = {
  // You should declare props like this, delete this if you don't need props
  presets: {
    all: PresetType[],
    selected: PresetType[],
    display: PresetType[],
    select: (presetId: string) => void,
    deSelect: (presetId: string) => void,
  }
}

const SkillSets = (props: SkillSetsPropType) => {
  const {presets} = props;
  const [selectedPresetsHidden, setSelectedPresetsHidden] = useState(false);
  const [isTopHidden, setIsTopHidden] = useState(false);

  useEffect(() => {
    let scroll = Scroll.animateScroll
    scroll.scrollToTop();

    const scrollContainer = window.document.getElementById('scroll-container')
    if (!scrollContainer) {
      return;
    }
    scrollContainer.style.scrollSnapType = 'x mandatory'
    scrollContainer.addEventListener('scroll', handleScroll)

    return () => {
      const scrollContainer = window.document.getElementById('scroll-container')
      if (!scrollContainer) {
        return;
      }
      scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, []);

  const selectedPresetsTrueHidden = () => {
    if (selectedPresetsHidden) {
      return true
    } else return isTopHidden;
  }

  const handleScroll = (e: any) => {
    const bottomTarget = window.document.getElementById('hidePresetsBottomTarget')
    if (!bottomTarget) {
      return
    }
    // console.log(bottomTarget.offsetTop - 159 < e.target.scrollTop)
    // if (!isTopHidden && !selectedPresetsHidden && bottomTarget.offsetTop - e.target.scrollTop - bottomTarget.clientHeight - 69 < bottomTarget.scrollTop) {
    //   setSelectedPresetsHidden(true)
    //   console.log('set selectedPresetsHidden true')
    // }
    // if (isTopHidden && bottomTarget.offsetTop >= e.target.scrollTop) {
    //   setSelectedPresetsHidden(false)
    //   console.log('set selectedPresetsHidden false')
    // }
    console.log( bottomTarget.offsetTop - e.target.scrollTop - bottomTarget.clientHeight, e.target.scrollTop)
    console.log('setIsTopHidden', bottomTarget.offsetTop - e.target.scrollTop - bottomTarget.clientHeight <= e.target.scrollTop)
    setIsTopHidden(bottomTarget.offsetTop - e.target.scrollTop - bottomTarget.clientHeight <= e.target.scrollTop)
  }

  return (
    <div className="skillSets">
      <div className="professionsContainer">
        <div className="flex-block">
          <div className="minTitle top fullWidth">
            <div id="blob-1-top-left" className="subheader">
              <span className="subheader-title">Уже в наборе</span>
              {presets.selected.length > 0 &&
                <div className="subheader-counter">+{
                  presets.selected.length
                }</div>
              }
            </div>
            <button className="buttonArrow" onClick={() => setSelectedPresetsHidden(!selectedPresetsHidden)}>
              <img
                className={`mobil ${selectedPresetsHidden ? 'arrowUp' : 'arrowDown'}`}
                src="/static/arrowBottom.svg"
              />
              <span className="deck">{selectedPresetsHidden ? 'Показать' : 'Скрыть'}</span>
            </button>
          </div>
          <div className="borderBottom"/>
          <div
            className={`selectedSkillsBlock fullWidth ${selectedPresetsTrueHidden() ? '' : 'stickyPopup'} ${(selectedPresetsHidden && !isTopHidden) ? 'forceHidden' : ''}`}
          >
            <SelectedPresets isHidden={false} deletePreset={(presetId: string) => presets.deSelect(presetId)} selectedPresets={presets.selected}/>
          </div>
          <div className="shadowBottom fullWidth"/>
          <p
            className={`minTitle bottom fullWidth ${selectedPresetsTrueHidden() ? '' : 'stickyPopup'}`}
            id="hidePresetsBottomTarget"
          >
            Добавь то, что хочешь изучить
          </p>
          <div className="rightBlock">
            <div className="blockPreset">
              {presets.display.map(preset => {
                return (
                  <Preset
                    preset={preset}
                    displayAdd={true}
                    onClick={() => presets.select(preset.id)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SkillSets