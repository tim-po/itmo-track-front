import React, {useEffect, useRef, useState} from "react";
import './index.scss'
import {KeywordType} from "../../types";
import Keyword from "../Keyword";
import {debounce} from "lodash";
import axios from "axios";
import Spinner from "../Spinner";
import {BASE_URL} from "../../constants";
import useOnClickOutside from "../../utils/useClickOutside";
import keywords from "../Keywords";
import SearchInput from "../../images/icons/magnifyingGlass";

// CONSTANTS

// DEFAULT FUNCTIONS

type KeywordsSearchPropType = {
  keywords: { addBulk: (keywords: KeywordType[]) => void, remove: (keyword: KeywordType) => void, allIds: string[] }
}

const KeywordsSearch = (props: KeywordsSearchPropType) => {
  const {keywords} = props
  const searchRef = React.createRef<HTMLDivElement>()
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [keywordsToAdd, setKeywordsToAdd] = useState<KeywordType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchUnsuccessful, setIsSearchUnsuccessful] = useState(false);
  const [isBadWord, setIsBadWord] = useState(false);
  const [queryKeywords, setQueryKeywords] = useState<KeywordType[]>([]);

  const searching = () => {
    if(!isSearching && searchQuery.length > 0) {
      searchKeywords()
    }
    setIsSearching(true);
  }
  const notSearching = () => {
    setIsSearching(false);
  }

  const clicKOutside = () => {
    addKeywords()
    notSearching()
  }

  useOnClickOutside(searchRef, clicKOutside)

  const addKeywords = () => {
    keywords.addBulk(keywordsToAdd)
    setKeywordsToAdd([])
    // setSearchQuery('')
    notSearching()
    // setSearchQuery('')
    setQueryKeywords([])
  }
  const searchKeywords = debounce( async () => {
    if (searchQuery === 'пизда' || searchQuery === 'хуй') {
      setIsBadWord(true)
      return
    }
    setIsSearching(true)
    await getKeywords(searchQuery)
  }, 500)

  const getKeywords = async (query: string) => {
    if (query === '') {
      setQueryKeywords([])
    } else {
      setIsLoading(true)
      try {
        const response = await axios.get(`${BASE_URL}keywords/?text_like=${query}`)
        setIsLoading(false)
        if(response.data.length === 0){
          setIsSearchUnsuccessful(true)
        }
        setQueryKeywords(response.data.filter((keyword: KeywordType) => !keywords.allIds.includes(keyword.id)))
      } catch {
        console.log('Error in keywoards search' + query)
      }
    }
  }

  useEffect(() => {
    if(searchQuery.length > 1) {
      searchKeywords()
    }else{
      setQueryKeywords([])
    }
    }, [searchQuery]);


  const selectKeyword = (keyword: KeywordType) => {
    if (keywordsToAdd.includes(keyword)) {
      setKeywordsToAdd([...keywordsToAdd.filter(keywordToAdd => keywordToAdd.id !== keyword.id)])
    } else {
      setKeywordsToAdd([...keywordsToAdd, keyword])
    }
  }

  return (
    <div className="searchFieldContainer">
      <div ref={searchRef}>
      <div className="inputContainer">
        <input
          className="keywordsInput"
          placeholder="Введи ключевое слово"
          value={searchQuery}
          onFocus={searching}
          onChange={(e) => {
            setIsSearchUnsuccessful(false)
            setIsBadWord(false)
            setSearchQuery(e.target.value)
          }}
        />
        <div className="searchInput">
          <SearchInput/>
        </div>
      </div>
      <div
        className={`addKeywordsSearch ${isSearching && searchQuery != '' ? 'extended' : ''}`}
      >
        {isLoading &&
          <Spinner
            width="40"
          />
        }
          {isSearchUnsuccessful && !isBadWord &&
            <span className="unsuccessfulMessage">
            По вашему запросу <strong>{searchQuery}</strong> ничего не нашлось
                    </span>
          }
          {queryKeywords.slice(0, 100).map((keyword) => {
            return (
              <Keyword
                // class="{
                //      'keywords__modal-keywords_selected': keywordInArray(keyword, keywordsToAdd),
                // }"
                selected={keywordsToAdd.map(word => word.id).includes(keyword.id)}
                key={keyword.id}
                onSelectSelf={() => selectKeyword(keyword)}
                keyword={keyword}
              />
            )
          })}

          <div className={`badWord-container ${isBadWord ? 'visible' : ''}`}>
            <img src="/static/bigBoss.png" alt="big_boss"/>
            <div>Не ругайся... Не поступишь</div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default KeywordsSearch
