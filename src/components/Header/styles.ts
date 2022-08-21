import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const HeaderContainer = styled.header`
  display: flex;
  background: ${(props) => props.theme['blue-300']};
`
interface NavProps {
  variant: 'space' | 'right'
}

export const Nav = styled.nav<NavProps>`
  width: 100%;
  align-items: center;
  justify-content: ${(props) =>
    props.variant === 'space' ? 'space-between' : 'flex-end'};
  display: flex;
  gap: 0.5rem;
  padding-left: 3rem;
  padding-right: 3rem;

  a {
    text-decoration: none;
    width: 3.7rem;
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
  }
`

export const NavLinkLeft = styled(NavLink)`
  margin-right: auto;
`

export const NavLinkRight = styled(NavLink)`
  margin-left: auto;
`

export const SignOut = styled.a`
  margin-left: auto;
`
