import {
  TabContents,
  WordListContainer,
  WordTable,
  WordTableNav,
} from './styles'
import * as Tabs from '@radix-ui/react-tabs'
import { Search } from '../Search'
import { WordsContext } from '../../../../contexts/WordsContext'
import { useContext } from 'react'

export function WordList() {
  const {
    words,
    historic,
    favorites,
    fetchHistory,
    fetchFavorites,
    fetchWord,
  } = useContext(WordsContext)

  function handleFavorites() {
    fetchFavorites(1)
  }
  function handleHistory() {
    fetchHistory(1)
  }

  return (
    <WordListContainer>
      <Search />
      <Tabs.Root defaultValue="tab1" orientation="vertical">
        <WordTableNav>
          <Tabs.List aria-label="tabs example">
            <Tabs.Trigger value="tab1">Word list</Tabs.Trigger>
            <Tabs.Trigger value="tab2" onClick={handleHistory}>
              History
            </Tabs.Trigger>
            <Tabs.Trigger value="tab3" onClick={handleFavorites}>
              Favorites
            </Tabs.Trigger>
          </Tabs.List>
        </WordTableNav>
        <TabContents>
          <Tabs.Content value="tab1">
            <WordTable>
              {words?.words.map((word, key) => {
                return (
                  <span key={key} onClick={() => fetchWord(word)}>
                    {word}
                  </span>
                )
              })}
            </WordTable>
          </Tabs.Content>
          <Tabs.Content value="tab2">
            <WordTable>
              {historic?.words.map((word, key) => {
                return (
                  <span key={key} onClick={() => fetchWord(word)}>
                    {word}
                  </span>
                )
              })}
            </WordTable>
          </Tabs.Content>
          <Tabs.Content value="tab3">
            <WordTable>
              {favorites?.words.map((word, key) => {
                return (
                  <span key={key} onClick={() => fetchWord(word)}>
                    {word}
                  </span>
                )
              })}
            </WordTable>
          </Tabs.Content>
        </TabContents>
      </Tabs.Root>
    </WordListContainer>
  )
}
