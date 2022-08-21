import {
  ErrorMessage,
  SignupButton,
  SignupContainer,
  BaseInput,
} from './styles'
import * as zod from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { WordsContext } from '../../contexts/WordsContext'

const newSignupFormValidationSchema = zod.object({
  name: zod.string().min(3, 'Precisa de no mínimo 3 caracteres'),
  email: zod
    .string()
    .email('Email invalido')
    .min(3, 'Precisa de no mínimo 3 caracteres'),
  password: zod.string().min(3, 'Precisa de no mínimo 3 caracteres'),
})

type NewSignupFormData = zod.infer<typeof newSignupFormValidationSchema>

export function Signup() {
  const { signup, bearerToken } = useContext(WordsContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (bearerToken) {
      navigate('/')
    }
  })

  const newSignupForm = useForm<NewSignupFormData>({
    resolver: zodResolver(newSignupFormValidationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = newSignupForm

  async function handleSignup(data: NewSignupFormData) {
    const logged = await signup(data)

    if (logged) {
      navigate('/')
    } else {
      setError('email', { type: 'custom', message: 'Email ja cadastrado' })
    }
  }

  return (
    <SignupContainer>
      <form onSubmit={handleSubmit(handleSignup)} action="">
        <FormProvider {...newSignupForm}>
          <label htmlFor="name">Name</label>
          <BaseInput
            id="name"
            type="text"
            placeholder="exemplo"
            {...register('name')}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          <label htmlFor="email">Email</label>
          <BaseInput
            id="email"
            type="text"
            placeholder="exemplo@email.com"
            {...register('email')}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          <label htmlFor="password">Senha</label>
          <BaseInput
            {...register('password', { required: true, minLength: 6 })}
            name="password"
            id="password"
            type="password"
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}

          <SignupButton type="submit">Signup</SignupButton>
        </FormProvider>
      </form>
    </SignupContainer>
  )
}
