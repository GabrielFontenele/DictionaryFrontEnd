import styled from 'styled-components'
export const SignupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem;
  form {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    label {
      margin-top: 1rem;
    }
  }
`

export const BaseInput = styled.input`
  flex: 1;
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};

  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme['gray-700']};

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
  }

  &::placeholder {
    color: ${(props) => props.theme['gray-100']};
  }

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const SignupButton = styled.button`
  flex: 1;
  margin-top: 1rem;
`

export const ErrorMessage = styled.p`
  color: ${(props) => props.theme['red-500']};
  font-weight: bold;
`
