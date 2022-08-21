import { HomeContainer, WordContent, WordText, Navigation } from './styles'
import { WordList } from './components/WordList'
import { Star } from 'phosphor-react'
import { useContext, useEffect } from 'react'
import { WordsContext } from '../../contexts/WordsContext'
import { useNavigate } from 'react-router-dom'

export function Home() {
  const { bearerToken } = useContext(WordsContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!bearerToken) {
      navigate('/signin')
    }
  })

  return (
    <HomeContainer>
      <WordContent>
        <Star size={35} weight="light" />
        <WordText>
          <span>hello</span>
          <span>həˈloʊ</span>
        </WordText>

        <audio controls>
          <source
            src="https://api.dictionaryapi.dev/media/pronunciations/en/hello-uk.mp3"
            // type="audio/mpeg"
          />
        </audio>

        <h2>Meanings</h2>
        <p>verb - {`"Hello!" or an equivalent greeting.`}</p>

        <Navigation>
          <button>Voltar</button>
          <button>Próximo</button>
        </Navigation>
      </WordContent>
      <WordList />
    </HomeContainer>
  )
}
