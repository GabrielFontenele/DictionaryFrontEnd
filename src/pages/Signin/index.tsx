import {
  EmailInput,
  ErrorMessage,
  PasswordInput,
  SigninButton,
  SigninContainer,
} from './styles'
import * as zod from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { WordsContext } from '../../contexts/WordsContext'
import { useNavigate } from 'react-router-dom'

const newSigninFormValidationSchema = zod.object({
  email: zod.string().email('Email invalido').min(3),
  password: zod.string().min(3),
})

type NewSigninFormData = zod.infer<typeof newSigninFormValidationSchema>

export function Signin() {
  const { signin } = useContext(WordsContext)
  const navigate = useNavigate()

  const newSigninForm = useForm<NewSigninFormData>({
    resolver: zodResolver(newSigninFormValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = newSigninForm

  async function handleLogin(data: NewSigninFormData) {
    const logged = await signin(data)

    if (logged) {
      navigate('/')
    } else {
      setError('email', { type: 'custom', message: 'Email ou senha invalido' })
    }
  }

  return (
    <SigninContainer>
      <form onSubmit={handleSubmit(handleLogin)} action="">
        <FormProvider {...newSigninForm}>
          <label htmlFor="email">Email</label>
          <EmailInput
            id="email"
            type="text"
            placeholder="exemplo@email.com"
            {...register('email')}
          />
          <label htmlFor="password">Senha</label>
          <PasswordInput
            {...register('password', { required: true, minLength: 6 })}
            name="password"
            id="password"
            type="password"
          />

          <SigninButton type="submit">Signin</SigninButton>
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FormProvider>
      </form>
    </SigninContainer>
  )
}
