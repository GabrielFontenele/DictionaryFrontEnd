import { HeaderContainer, Nav, NavLinkLeft, NavLinkRight } from './styles'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { WordsContext } from '../../contexts/WordsContext'

export function Header() {
  const { bearerToken, signout } = useContext(WordsContext)

  const navigate = useNavigate()

  function handleSignout() {
    signout()
    navigate('/signin')
  }

  if (bearerToken) {
    return (
      <HeaderContainer>
        <Nav variant="space">
          <NavLinkLeft to="" title="Home">
            Home
          </NavLinkLeft>
          <a onClick={handleSignout}>Sign out</a>
        </Nav>
      </HeaderContainer>
    )
  } else {
    return (
      <HeaderContainer>
        <Nav variant="right">
          <NavLink to="/signin" title="Signin">
            Sign in
          </NavLink>
          <NavLink to="/signup" title="Signup">
            Sign up
          </NavLink>
        </Nav>
      </HeaderContainer>
    )
  }
}
