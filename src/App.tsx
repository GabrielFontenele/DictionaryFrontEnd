import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { WordsProvider } from './contexts/WordsContext'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <WordsProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </WordsProvider>
    </ThemeProvider>
  )
}
