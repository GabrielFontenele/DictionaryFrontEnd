import { HeaderContainer } from './styles'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <nav>
        <NavLink to="" title="Home">
          Home
        </NavLink>
        <NavLink to="/signin" title="Signin">
          Signin
        </NavLink>
        <NavLink to="/signup" title="Signup">
          Signup
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
