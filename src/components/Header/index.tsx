import { HeaderContainer } from './styles'
import { Timer, Scroll } from 'phosphor-react'

import logoJohn from '../../assets/icon-programmer.png'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoJohn} alt="" width={40} height={40} />
      <nav>
        <NavLink to="/" title="timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="history">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
