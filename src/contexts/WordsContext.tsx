import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { WordResponse } from './WordResponseInterface'

interface SigninInput {
  email: string
  password: string
}

interface SignupInput {
  name: string
  email: string
  password: string
}

interface WordDefinition {
  word: string
  phonetic: string
  meaning: string[]
  audioUrl: string
  favorite: boolean
}

interface Pagination {
  words: string[]
  length: number
  page: number
  hasMore: true
  query?: string
}

interface WordContextType {
  signin: (data: SigninInput) => Promise<boolean>
  signup: (data: SignupInput) => Promise<boolean>
  signout: () => void
  searchWords: (query: string, refresh: boolean) => Promise<void>
  fetchMoreWords: () => void
  fetchHistory: (refresh: boolean) => Promise<void>
  fetchFavorites: (refresh: boolean) => Promise<void>
  fetchWord: (query: string) => Promise<void>
  saveFavorite: () => Promise<void>
  bearerToken: string | null
  words: Pagination | null
  favorites: Pagination | null
  historic: Pagination | null
  wordDefinition: WordDefinition | null
}

interface WordsProviderProps {
  children: ReactNode
}

export const WordsContext = createContext({} as WordContextType)

export function WordsProvider({ children }: WordsProviderProps) {
  const [bearerToken, setBearerToken] = useState<string | null>(null)

  const [wordDefinition, setWordDefinition] = useState<WordDefinition | null>(
    null,
  )

  const [words, setWords] = useState<Pagination | null>(null)
  const [favorites, setFavorites] = useState<Pagination | null>(null)
  const [historic, setHistoric] = useState<Pagination | null>(null)

  useEffect(() => {
    const token = localStorage.getItem(
      '@ignite-timer:dictionary-front-end-1.0.0',
    )
    if (token) {
      setBearerToken(token)
    }
  }, [])

  function saveToken(token: string) {
    localStorage.setItem('@ignite-timer:dictionary-front-end-1.0.0', token)
    setBearerToken(token)
  }

  function signout() {
    setBearerToken(null)
  }

  async function signin(data: SigninInput) {
    const { email, password } = data

    const response = await api
      .post('/auth/signin', {
        email,
        password,
      })
      .catch((error) => {
        console.log(error.toJSON())
      })
      .then((data) => {
        return data
      })

    if (response && response.data.token) {
      saveToken(response.data.token)
      return true
    } else {
      return false
    }
  }

  async function signup(data: SignupInput) {
    const { email, password, name } = data

    const response = await api
      .post('/auth/signup', {
        email,
        password,
        name,
      })
      .catch((error) => {
        console.log(error.toJSON())
      })
      .then((data) => {
        return data
      })

    if (response && response.data.token) {
      saveToken(response.data.token)
      return true
    } else {
      return false
    }
  }

  async function searchWords(query: string, refresh: boolean) {
    const page = !refresh && words ? words.page + 1 : 1

    api
      .get('/entries/en/', {
        params: { search: query, limit: 100, page },
        headers: { Authorization: `bearer ${bearerToken}` },
      })
      .then((res) => {
        setWords((state) => {
          const newWords =
            !refresh && state
              ? state.words.concat(res.data.results)
              : res.data.results
          return {
            words: newWords,
            length: newWords.length,
            page: res.data.page,
            hasMore: res.data.hasNext,
            query,
          }
        })
      })
  }

  function fetchMoreWords() {
    if (words?.query) searchWords(words.query, false)
  }

  async function fetchHistory(refresh: boolean) {
    const page = !refresh && historic ? historic.page + 1 : 1
    api
      .get('/user/me/history', {
        params: { page },
        headers: { Authorization: `bearer ${bearerToken}` },
      })
      .then((res) => {
        const newHistory = res.data.results.map((item: any) => item.word)

        setHistoric((state) => {
          const newWords =
            !refresh && state ? state.words.concat(newHistory) : newHistory
          return {
            words: newWords,
            length: newWords.length,
            page: res.data.page,
            hasMore: res.data.hasNext,
          }
        })
      })
  }

  async function fetchFavorites(refresh: boolean) {
    const page = !refresh && favorites ? favorites.page + 1 : 1
    api
      .get('/user/me/favorites', {
        params: { page },
        headers: { Authorization: `bearer ${bearerToken}` },
      })
      .then((res) => {
        const newFavorites = res.data.results.map((item: any) => item.word)

        setFavorites((state) => {
          const newWords =
            !refresh && state ? state.words.concat(newFavorites) : newFavorites
          return {
            words: newWords,
            length: newWords.length,
            page: res.data.page,
            hasMore: res.data.hasNext,
          }
        })
      })
  }

  async function fetchWord(query: string) {
    api
      .get('entries/en/' + query, {
        headers: { Authorization: `bearer ${bearerToken}` },
      })
      .then((res) => {
        const wordResponse = res.data[0] as WordResponse

        const wordDefinition: WordDefinition = {
          word: wordResponse.word,
          phonetic: '',
          meaning: [],
          audioUrl: '',
          favorite: false,
        }

        wordResponse.phonetics?.forEach((phonetic) => {
          if (phonetic.audio) wordDefinition.audioUrl = phonetic.audio
          if (phonetic.text) wordDefinition.phonetic = phonetic.text
        })

        wordResponse.meanings?.forEach((meaning) => {
          meaning.definitions.forEach((definition) => {
            wordDefinition.meaning.push(
              `${meaning.partOfSpeech} - ${definition.definition}`,
            )
          })
        })

        favorites?.words.forEach((favorite) => {
          if (wordResponse.word === favorite) wordDefinition.favorite = true
        })

        setWordDefinition(wordDefinition)
      })
  }

  async function saveFavorite() {
    if (wordDefinition) {
      const word = wordDefinition.word
      if (wordDefinition.favorite) {
        api
          .delete(`entries/en/${word}/unfavorite`, {
            headers: { Authorization: `bearer ${bearerToken}` },
          })
          .then((res) => {
            setWordDefinition((state) => {
              if (state) {
                return { ...state, favorite: false }
              }
              return null
            })
            fetchFavorites(true)
          })
      } else {
        api
          .post(
            `entries/en/${word}/favorite`,
            {},
            {
              headers: { Authorization: `bearer ${bearerToken}` },
            },
          )
          .then((res) => {
            setWordDefinition((state) => {
              if (state) {
                return { ...state, favorite: true }
              }
              return null
            })
            fetchFavorites(true)
          })
      }
    }
  }

  return (
    <WordsContext.Provider
      value={{
        signin,
        signup,
        signout,
        searchWords,
        fetchMoreWords,
        fetchHistory,
        fetchFavorites,
        fetchWord,
        saveFavorite,
        bearerToken,
        words,
        favorites,
        historic,
        wordDefinition,
      }}
    >
      {children}
    </WordsContext.Provider>
  )
}
