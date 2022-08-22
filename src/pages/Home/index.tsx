import { HomeContainer, WordContent, WordText, Navigation } from './styles'
import { WordList } from './components/WordList'
import { Star } from 'phosphor-react'
import { useContext, useEffect, useState } from 'react'
import { WordsContext } from '../../contexts/WordsContext'
import { useNavigate } from 'react-router-dom'
import ReactAudioPlayer from 'react-audio-player'

export function Home() {
  const { bearerToken, wordDefinition, saveFavorite } = useContext(WordsContext)
  const [meaningPosition, setMeaningPosition] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    if (!bearerToken) {
      navigate('/signin')
    }
  })

  useEffect(() => {
    setMeaningPosition(0)
  }, [wordDefinition])

  function handleMeaningPositionNext() {
    const meaningPositionNext = meaningPosition + 1
    if (wordDefinition?.meaning[meaningPositionNext])
      setMeaningPosition(meaningPositionNext)
  }

  function handleMeaningPositionPrevious() {
    const meaningPositionPrevious = meaningPosition - 1
    if (wordDefinition?.meaning[meaningPositionPrevious])
      setMeaningPosition(meaningPositionPrevious)
  }

  function handleSaveFavorite() {
    saveFavorite()
  }

  return (
    <HomeContainer>
      <WordContent>
        {wordDefinition && wordDefinition?.favorite ? (
          <Star
            onClick={handleSaveFavorite}
            size={35}
            color="#a87010"
            weight="fill"
          />
        ) : (
          <Star onClick={handleSaveFavorite} size={35} />
        )}

        <WordText>
          <span>{wordDefinition?.word}</span>
          <span>{wordDefinition?.phonetic}</span>
        </WordText>

        <ReactAudioPlayer src={wordDefinition?.audioUrl} autoPlay controls />

        <h2>Meanings</h2>
        <p>{wordDefinition?.meaning[meaningPosition]}</p>

        <Navigation>
          <button onClick={handleMeaningPositionPrevious}>Voltar</button>
          <button onClick={handleMeaningPositionNext}>Próximo</button>
        </Navigation>
      </WordContent>
      <WordList />
    </HomeContainer>
  )
}
