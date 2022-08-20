import styled from 'styled-components'

export const HomeContainer = styled.div`
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

export const WordContent = styled.div`
  /* border: 1px solid black; */
  height: 25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;

  h2 {
    margin-right: auto;
    margin-left: 0.75rem;
  }
  p {
    margin-right: auto;
    margin-left: 0.75rem;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`

export const WordText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.pink};
  flex-direction: column;
  height: 10rem;
  width: 100%;
  border: 1px solid black;
  gap: 1rem;
`

export const Navigation = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0 0.5rem;

  button {
    width: 100%;
    background: transparent;
    font-size: 1.15rem;

    padding: 0.2rem 2rem;

    &:hover {
      background: ${(props) => props.theme['gray-100']};
    }

    &[aria-selected='true'] {
      background: transparent;
      text-decoration: underline;
    }
  }
`
