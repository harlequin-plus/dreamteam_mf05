import { Link } from 'react-router-dom'
import HeaderLogo from '../../assets/header_logo.svg'
import './style.scss'
import HeaderMenu from './HeaderMenu'

export function Header() {
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
          <Link className="header__auth" to="/auth">
            Авторизация
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default Header
