import { Provider } from 'react-redux'
import App from './App'
import { render, screen } from '@testing-library/react'
import createStore from './store'
import { UserService } from './api/UserService'
import { ClientYandexApiRepository } from './repository/ClientYandexApiRepository'

const initialState = window.APP_INITIAL_STATE
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  render(
    <Provider
      store={createStore(
        new UserService(new ClientYandexApiRepository()),
        initialState
      )}>
      <App />
    </Provider>
  )
  expect(screen).toBeDefined()
})
