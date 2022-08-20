import styled from 'styled-components'
export const SigninContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 1rem;
  margin: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  svg {
    margin-left: auto;
  }
`
