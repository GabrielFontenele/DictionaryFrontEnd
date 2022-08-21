import axios from 'axios'
import { createContext, ReactNode, useState } from 'react'
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
  bearerToken: string | null
}

interface WordsProviderProps {
  children: ReactNode
}

export const WordsContext = createContext({} as WordContextType)

export function WordsProvider({ children }: WordsProviderProps) {
  const [bearerToken, setBearerToken] = useState<string | null>(null)

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
      setBearerToken(response.data.token)
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
      setBearerToken(response.data.token)
      return true
    } else {
      return false
    }
  }

  return (
    <WordsContext.Provider
      value={{
        signin,
        signup,
        bearerToken,
        signout,
      }}
    >
      {children}
    </WordsContext.Provider>
  )
}
