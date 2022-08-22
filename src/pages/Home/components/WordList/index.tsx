import {
  TabContents,
  WordListContainer,
  WordSpan,
  WordTable,
  WordTableNav,
} from './styles'
import * as Tabs from '@radix-ui/react-tabs'
import { Search } from '../Search'
import { WordsContext } from '../../../../contexts/WordsContext'
import InfiniteScroll, {
  Props as InfiniteScrollProps,
} from 'react-infinite-scroll-component'
import { useContext } from 'react'

export function WordList() {
  const {
    words,
    historic,
    favorites,
    fetchHistory,
    fetchFavorites,
    fetchWord,
    fetchMoreWords,
  } = useContext(WordsContext)

  function handleFavorites() {
    fetchFavorites(true)
  }
  function handleHistory() {
    fetchHistory(true)
  }

  function handleFetchMoreData() {
    fetchMoreWords()
  }

  function handleFetchMoreHistoric() {
    fetchHistory(false)
  }

  function handleFetchMoreFavorites() {
    fetchFavorites(false)
  }

  const scrollProps: InfiniteScrollProps = {
    style: {
      minWidth: '25rem',
      maxWidth: '20rem',
      display: 'flex',
      flexWrap: 'wrap',
      borderTop: '1px solid black',
      borderLeft: '1px solid black',
    },
    next: function () {
      throw new Error('Function not implemented.')
    },
    scrollableTarget: 'scrollableDiv',
    loader: <h4>Carregando...</h4>,
    hasMore: false,
    children: undefined,
    dataLength: 0,
  }

  return (
    <WordListContainer>
      <Search />
      <Tabs.Root defaultValue="tabWordList" orientation="vertical">
        <WordTableNav>
          <Tabs.List aria-label="tabs example">
            <Tabs.Trigger value="tabWordList">Word list</Tabs.Trigger>
            <Tabs.Trigger value="tabHistory" onClick={handleHistory}>
              History
            </Tabs.Trigger>
            <Tabs.Trigger value="tabFavorites" onClick={handleFavorites}>
              Favorites
            </Tabs.Trigger>
          </Tabs.List>
        </WordTableNav>
        <TabContents id="scrollableDiv">
          <Tabs.Content value="tabWordList">
            <InfiniteScroll
              {...scrollProps}
              dataLength={words?.words.length ?? 0} // This is important field to render the next data
              next={handleFetchMoreData}
              hasMore={words?.hasMore ?? false}
            >
              {words?.words.map((word, key) => {
                return (
                  <WordSpan key={key} onClick={() => fetchWord(word)}>
                    {word}
                  </WordSpan>
                )
              })}
            </InfiniteScroll>
          </Tabs.Content>
          <Tabs.Content value="tabHistory">
            <InfiniteScroll
              {...scrollProps}
              dataLength={historic?.words.length ?? 0} // This is important field to render the next data
              next={handleFetchMoreHistoric}
              hasMore={historic?.hasMore ?? false}
            >
              {historic?.words.map((word, key) => {
                return (
                  <WordSpan key={key} onClick={() => fetchWord(word)}>
                    {word}
                  </WordSpan>
                )
              })}
            </InfiniteScroll>
          </Tabs.Content>
          <Tabs.Content value="tabFavorites">
            <InfiniteScroll
              {...scrollProps}
              dataLength={favorites?.words.length ?? 0} // This is important field to render the next data
              next={handleFetchMoreFavorites}
              hasMore={favorites?.hasMore ?? false}
            >
              {favorites?.words.map((word, key) => {
                return (
                  <WordSpan key={key} onClick={() => fetchWord(word)}>
                    {word}
                  </WordSpan>
                )
              })}
            </InfiniteScroll>
          </Tabs.Content>
        </TabContents>
      </Tabs.Root>
    </WordListContainer>
  )
}
