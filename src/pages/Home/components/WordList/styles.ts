import styled from 'styled-components'

export const WordListContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const TabContents = styled.div`
  border: 1px solid black;
  padding: 0.25rem;
  height: 25rem;
  overflow: scroll;
`

export const WordTableNav = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 1rem;
  button {
    background: ${(props) => props.theme['gray-300']};
    margin-right: 1rem;
    border: 1px solid black;
    border-width: 1px 1px 0 1px;
    padding: 0.25rem;

    &:hover {
      background: ${(props) => props.theme['gray-100']};
    }

    &[aria-selected='true'] {
      background: transparent;
      text-decoration: underline;
    }
  }
`

export const WordTable = styled.div`
  min-width: 25rem;
  max-width: 50rem;
  display: grid;
  grid-template-columns: repeat(4, minmax(min-content, 50px));
  border-top: 1px solid black;
  border-left: 1px solid black;

  span {
    cursor: pointer;
    padding: 5px;
    text-align: center;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    &:hover {
      background-color: ${(props) => props.theme['gray-100']};
    }
  }
`
