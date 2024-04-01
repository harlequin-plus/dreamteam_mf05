import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Link } from 'react-router-dom'
import './style.scss'

function HeaderMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className="BurgerWrapper">
      <Button
        className="BurgerButton"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        <div className="BurgerButton__item"></div>
        <div className="BurgerButton__item"></div>
        <div className="BurgerButton__item"></div>
      </Button>
      <Menu
        className="mobile-menu"
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem onClick={handleClose}>
          <Link to="/profile">Профиль</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/leaderboard">Страница таблицы лидеров</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/forum">Сообщество</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/mainpage">Лендинг презентация</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/auth">Авторизация</Link>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default HeaderMenu
