import {
  TabContents,
  WordListContainer,
  WordTable,
  WordTableNav,
} from './styles'
import { NavLink } from 'react-router-dom'
import * as Tabs from '@radix-ui/react-tabs'

export function WordList() {
  return (
    <WordListContainer>
      <Tabs.Root defaultValue="tab1" orientation="vertical">
        <WordTableNav>
          <Tabs.List aria-label="tabs example">
            <Tabs.Trigger value="tab1">Word list</Tabs.Trigger>
            <Tabs.Trigger value="tab2">History</Tabs.Trigger>
            <Tabs.Trigger value="tab3">Favorites</Tabs.Trigger>
          </Tabs.List>
        </WordTableNav>
        <TabContents>
          <Tabs.Content value="tab1">
            <WordTable>
              <span>hello</span>
              <span>today</span>
              <span>great</span>
              <span>logic</span>
              <span>never</span>
              <span>peace</span>
              <span>peace</span>
              <span>peace</span>
              <span>peace</span>
              <span>peace</span>
              <span>peace</span>
              <span>peace</span>
              <span>peace</span>
            </WordTable>
          </Tabs.Content>
          <Tabs.Content value="tab2">
            <WordTable>
              <span>history</span>
              <span>today</span>
              <span>great</span>
              <span>logic</span>
              <span>never</span>
              <span>peace</span>
              <span>peace</span>
              <span>peace</span>
              <span>peace</span>
              <span>peace</span>
              <span>peace</span>
              <span>peace</span>
              <span>peace</span>
            </WordTable>
          </Tabs.Content>
          <Tabs.Content value="tab3">
            <WordTable>
              <span>tab3</span>
              <span>today</span>
              <span>great</span>
              <span>logic</span>
              <span>never</span>
              <span>peace</span>
              <span>peace</span>
              <span>peace</span>
              <span>peace</span>
              <span>peace</span>
              <span>peace</span>
              <span>peace</span>
              <span>peace</span>
            </WordTable>
          </Tabs.Content>
        </TabContents>
      </Tabs.Root>
    </WordListContainer>
  )
}
