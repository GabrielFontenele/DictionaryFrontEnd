import { FormProvider, useForm } from 'react-hook-form'
import { SearchContainer } from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useContext } from 'react'
import { WordsContext } from '../../../../contexts/WordsContext'

const newSearchFormValidationSchema = zod.object({
  query: zod.string(),
})

type NewSearchFormData = zod.infer<typeof newSearchFormValidationSchema>

export function Search() {
  const { searchWords } = useContext(WordsContext)

  const newSearchForm = useForm<NewSearchFormData>({
    resolver: zodResolver(newSearchFormValidationSchema),
    defaultValues: {
      query: '',
    },
  })

  const { handleSubmit, register } = newSearchForm

  async function handleSearch({ query }: NewSearchFormData) {
    await searchWords(query, true)
  }

  return (
    <SearchContainer>
      <form onSubmit={handleSubmit(handleSearch)} action="">
        <FormProvider {...newSearchForm}>
          <input
            type="text"
            placeholder="Buscar palavra"
            {...register('query')}
          />
          <button type="submit">Buscar</button>
        </FormProvider>
      </form>
    </SearchContainer>
  )
}
