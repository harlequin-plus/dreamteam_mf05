import { SyntheticEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HeaderLogo from '../../assets/header_logo.svg'
import './style.scss'
import HeaderMenu from './HeaderMenu'
import { logout } from '../../services/auth'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTsHook'
import { resetUserState } from '../../store/userState'

export function Header() {
  const user = useAppSelector(state => state.userState.item.id)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const hadleLogout = async (event: SyntheticEvent) => {
    event.preventDefault()
    logout()
      .then(() => {
        dispatch(resetUserState())
        navigate('/auth')
      })
      .catch(error => console.warn('logout error:', error))
  }
  return (
    <div className="header">
      <div className="container header__container">
        <nav className="header__menu">
          <div className="header__logo">
            <Link to="/">
              <img src={HeaderLogo} alt="2048 логотип" />
              <span>Игра 2048</span>
            </Link>
          </div>
          <ul className="header-list">
            <li className="header-list__item">
              <Link to="/profile">Профиль</Link>
            </li>
            <li className="header-list__item">
              <Link to="/leaderboard">Страница таблицы лидеров</Link>
            </li>
            <li className="header-list__item">
              <Link to="/forum">Сообщество</Link>
            </li>
            <li className="header-list__item">
              <Link to="/mainpage">Лендинг презентация</Link>
            </li>
          </ul>
          <HeaderMenu />
          {user == -1 ? (
            <Link className="header__auth" to="/auth">
              Авторизация
            </Link>
          ) : (
            <Link to="/auth" className="header__auth" onClick={hadleLogout}>
              Выйти
            </Link>
          )}
        </nav>
      </div>
    </div>
  )
}

export default Header
