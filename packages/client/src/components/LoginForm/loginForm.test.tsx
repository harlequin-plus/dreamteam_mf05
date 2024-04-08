import { render, fireEvent, screen } from '@testing-library/react'
import { LoginForm } from './index'
import { Provider } from 'react-redux'
import store from '../../store'
import { BrowserRouter } from 'react-router-dom'

describe('LoginForm', () => {
  const mockHandler = jest.fn()
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm toggleShow={mockHandler} />
        </BrowserRouter>
      </Provider>
    )
  })

  it('должен быть заголовок "Вход"', () => {
    const span = screen.getByText('Вход')
    expect(span).toBeDefined()
  })

  it('должно быть поле для ввода логина', () => {
    const inputLogin = screen.getByLabelText('Логин')
    expect(inputLogin).toBeDefined()
  })

  it('должно быть поле для ввода пароля', () => {
    const inputPassword = screen.getByLabelText('Пароль')
    expect(inputPassword).toBeDefined()
  })

  it('должна быть кнопка "Войти"', () => {
    const button = screen.getByRole('button', { name: 'Войти' })
    expect(button).toBeDefined()
  })

  it('должнен быть вызван submit при нажатии на кнопку "Войти"', () => {
    const form = document.querySelector('form')
    expect(form).toBeDefined()
    const handleSubmit = jest.fn()
    if (form) {
      form.onsubmit = handleSubmit
    }
    const button = screen.getByRole('button', { name: 'Войти' })
    fireEvent.click(button)
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })

  it('должна быть кнопка "Зарегистрироваться" c обработчиком для перехода на форму "Регистрация"', () => {
    const button = screen.getByRole('button', { name: 'Зарегистрироваться' })
    expect(button).toBeDefined()
    fireEvent.click(button)
    expect(mockHandler).toHaveBeenCalledTimes(1)
  })
})
