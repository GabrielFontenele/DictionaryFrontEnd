import {
  EmailInput,
  PasswordInput,
  SignupButton,
  SignupContainer,
} from './styles'
import * as zod from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const newSignupFormValidationSchema = zod.object({
  name: zod.string().min(3),
  email: zod.string().email('Email invalido').min(3),
  password: zod.string().min(6),
})

type NewSignupFormData = zod.infer<typeof newSignupFormValidationSchema>

export function Signup() {
  const newSignupForm = useForm<NewSignupFormData>({
    resolver: zodResolver(newSignupFormValidationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })
  function handleLogin(data: NewSignupFormData) {
    // login(data)
    console.log(data)
    reset()
  }

  const { handleSubmit, watch, reset, register } = newSignupForm

  return (
    <SignupContainer>
      <form onSubmit={handleSubmit(handleLogin)} action="">
        <FormProvider {...newSignupForm}>
          <label htmlFor="name">Name</label>
          <EmailInput
            id="name"
            type="text"
            placeholder="exemplo"
            {...register('name')}
          />
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

          <SignupButton type="submit">Signup</SignupButton>
        </FormProvider>
      </form>
    </SignupContainer>
  )
}
