import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  background: ${(props) => props.theme['blue-300']};
  nav {
    width: 100%;
    align-items: center;
    justify-content: space-between;
    display: flex;
    gap: 0.5rem;
    padding-left: 3rem;
    padding-right: 3rem;

    a {
      text-decoration: none;
      width: 3rem;
      height: 3rem;

      display: flex;
      justify-content: center;
      align-items: center;

      color: ${(props) => props.theme['gray-900']};

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      &:hover {
        border-bottom: 3px solid ${(props) => props.theme['gray-900']};
      }

      &.active {
        text-decoration: underline;
        border-bottom: 3px solid ${(props) => props.theme['gray-900']};
      }

      &:first-child {
        margin-right: auto;
      }
    }
  }
`
