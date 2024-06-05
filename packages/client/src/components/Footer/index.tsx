import { Link } from 'react-router-dom'
import FooterLogo from '../../assets/footer_logo.svg'
import './style.scss'

export function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <nav className="footer__menu">
          <div className="footer__logo">
            <Link to="/">
              <img src={FooterLogo} alt="2048 логотип" />
            </Link>
          </div>
          <ul className="footer-list">
            <li className="footer-list__item">
              <Link to="/profile">Профиль</Link>
            </li>
            <li className="footer-list__item">
              <Link to="/leaderboard">Страница таблицы лидеров</Link>
            </li>
            <li className="footer-list__item">
              <Link to="/community">Сообщество</Link>
            </li>
            <li className="footer-list__item">
              <Link to="/game">Играть</Link>
            </li>
          </ul>
          <span className="footer__copyright">© 2024</span>
        </nav>
      </div>
    </div>
  )
}

export default Footer
