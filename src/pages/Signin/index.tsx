import {
  EmailInput,
  PasswordInput,
  SigninButton,
  SigninContainer,
} from './styles'
import * as zod from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const newSigninFormValidationSchema = zod.object({
  email: zod.string().email('Email invalido').min(3),
  password: zod.string().min(6),
})

type NewSigninFormData = zod.infer<typeof newSigninFormValidationSchema>

export function Signin() {
  const newSigninForm = useForm<NewSigninFormData>({
    resolver: zodResolver(newSigninFormValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  function handleLogin(data: NewSigninFormData) {
    // login(data)
    console.log(data)
    reset()
  }

  const { handleSubmit, watch, reset, register } = newSigninForm

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
        </FormProvider>
      </form>
    </SigninContainer>
  )
}
