import axios from 'axios'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/axios'

interface SigninInput {
  email: string
  password: string
}

interface SignupInput {
  name: string
  email: string
  password: string
}

interface WordContextType {
  signin: (data: SigninInput) => Promise<boolean>
  signup: (data: SignupInput) => Promise<boolean>
  signout: () => void
  searchWords: (query: string, page: number) => Promise<void>
  fetchHistory: (page: number) => Promise<void>
  fetchFavorites: (page: number) => Promise<void>
  bearerToken: string | null
  words: string[]
  favorites: string[]
  historic: string[]
}

interface WordsProviderProps {
  children: ReactNode
}

export const WordsContext = createContext({} as WordContextType)

export function WordsProvider({ children }: WordsProviderProps) {
  const [bearerToken, setBearerToken] = useState<string | null>(null)
  const [words, setWords] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [historic, setHistoric] = useState<string[]>([])

  useEffect(() => {
    const token = localStorage.getItem(
      '@ignite-timer:dictionary-front-end-1.0.0',
    )
    console.log(token)
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

  async function searchWords(query: string, page: number) {
    api
      .get('/entries/en/', {
        params: { search: query, limit: 100, page },
        headers: { Authorization: `bearer ${bearerToken}` },
      })
      .then((res) => {
        console.log(res.data)
        setWords(res.data.results)
      })
  }

  async function fetchHistory(page: number) {
    api
      .get('/user/me/history', {
        params: { page },
        headers: { Authorization: `bearer ${bearerToken}` },
      })
      .then((res) => {
        const history = res.data.results.map((item: any) => item.word)
        setHistoric(history)
      })
  }

  async function fetchFavorites(page: number) {
    api
      .get('/user/me/favorites', {
        params: { page },
        headers: { Authorization: `bearer ${bearerToken}` },
      })
      .then((res) => {
        const favorites = res.data.results.map((item: any) => item.word)
        setFavorites(res.data.results)
      })
  }

  return (
    <WordsContext.Provider
      value={{
        signin,
        signup,
        searchWords,
        bearerToken,
        signout,
        words,
        favorites,
        historic,
        fetchHistory,
        fetchFavorites,
      }}
    >
      {children}
    </WordsContext.Provider>
  )
}
