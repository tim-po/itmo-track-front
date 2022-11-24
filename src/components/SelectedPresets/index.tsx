import React, {useContext, useEffect, useState} from "react";
import './index.scss'
import {PresetType} from "../../types";
import * as Scroll from "react-scroll";
import {useNavigate, useSearchParams} from "react-router-dom";
import Preset from "../Preset";

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

type SelectedPresetsPropType = {
  // You should declare props like this, delete this if you don't need props
  selectedPresets: PresetType[]
  deletePreset?: (presetId: string) => void
  isHidden: boolean
}

const SelectedPresetsDefaultProps = {
  // You should declare default props like this, delete this if you don't need props
  somePropWithDefaultOption: 'default value'
}

const SelectedPresets = (props: SelectedPresetsPropType) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const {selectedPresets, deletePreset, isHidden} = props;
  const [leftScrollPosition, setLeftScrollPosition] = useState(0);
  const [isRightArrowHidden, setIsRightArrowHidden] = useState(false);

  useEffect(() => {
    const carousel = document.querySelector('.leftSlide');
    if (carousel) {
      const container = document.querySelector('.selectedPresetsContainer')
      let sumOfCarouselCards = 0;
      setTimeout(() => {
        carousel.querySelectorAll('.leftSlide > .flexPreset').forEach(elem => {
          // @ts-ignore
          sumOfCarouselCards = sumOfCarouselCards + elem.offsetWidth;
          // @ts-ignore
          setIsRightArrowHidden(sumOfCarouselCards > container.offsetWidth)
        });
      }, 200)
    }
  }, [selectedPresets])

  useEffect(() => {
    let scroll = Scroll.animateScroll
    scroll.scrollToTop();
  }, [])

  const shouldDrawScrollButton = (event: any) => {
    const element = event.target
    setLeftScrollPosition(element.scrollLeft)
    if (!element) {
      element.classList.remove('hidden-right')
      element.classList.remove('hidden-left')
      return
    }

    if (element.scrollLeft + element.clientWidth >= element.scrollWidth - 10) {
      element.classList.add('hidden-right')
      return
    }

    if (element.scrollLeft <= 10) {
      element.classList.add('hidden-left')
      return
    }

    element.classList.remove('hidden-left')
    element.classList.remove('hidden-right')
  }
  const scrollToRight = (event: any) => {
    event.preventDefault()
    event.target.parentNode.scrollLeft += Math.min(event.target.parentNode.clientWidth, 250)
  }
  const scrollToLeft = (event: any) => {
    event.preventDefault()
    event.target.parentNode.scrollLeft -= Math.min(event.target.parentNode.clientWidth, 250)
  }
  const editSkillSets = () => {
    navigate(`professionDetails?id=${searchParams.get('id')}&view=skills`)

  }
  return (
    <div className="selectedPresetsContainer">
      <div
        className={`leftSlide ${isHidden ? 'hidden' : ''}`}
        onLoad={(e) => shouldDrawScrollButton(e)}
        onScroll={(e) => shouldDrawScrollButton(e)}
      >
        {isRightArrowHidden &&
          <button
            className="scrollBtn right"
            onClick={scrollToRight}
          />
        }
        {selectedPresets.length > 0 &&
          <button
            className="scrollBtn left"
            style={{opacity: leftScrollPosition ? 1 : 0}}
            onClick={scrollToLeft}
          />
        }
        {selectedPresets.length === 0 && searchParams.get('view') !== 'main' &&
          <div className="blockMyPreset">
            <img src="/static/search.svg"/>
            <span>Ты не добавил ни одного набора навыков</span>
          </div>
        }
        {selectedPresets.length === 0 && searchParams.get('view') === 'main' &&
          <div className="blockMyPreset main">
            <div className="imgPresets">
              <img src="/static/Illustration.svg"/>
            </div>
            <div className="prompt">
              <span>
                Наборы навыков еще не добавлены.
                Начни добавлять их прямо сейчас
              </span>
              <button onClick={editSkillSets} className="add-button">
                Добавить
              </button>
            </div>
          </div>
        }
        {selectedPresets.map(preset => {
          return(
            <Preset
              displayAdd={deletePreset !== undefined}
              onClick={() => {
                if (deletePreset) {
                  deletePreset(preset.id)
                }
              }}
              preset={preset}
            />
          )
        })}
      </div>
    </div>
  )
};

SelectedPresets.defaultProps = SelectedPresetsDefaultProps

export default SelectedPresets