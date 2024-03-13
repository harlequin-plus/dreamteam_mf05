import { Link } from 'react-router-dom'

export function HeaderMenu() {
  return (
    <nav>
      <ul
        style={{
          listStyleType: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          gap: '20px',
        }}>
        <li>
          <Link to="/">Главная</Link>
        </li>
        <li>
          <Link to="/auth">Авторизация</Link>
        </li>
      </ul>
    </nav>
  )
}

export default HeaderMenu
