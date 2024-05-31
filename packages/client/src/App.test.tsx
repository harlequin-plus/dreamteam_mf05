import { Provider } from 'react-redux'
import App from './App'
import { render, screen } from '@testing-library/react'
import createStore from './store'
import { UserService } from './repository_services/UserService'
import { ClientYandexApiUserRepository } from './repository/ClientYandexApiUserRepository'
import { LeaderboardService } from './repository_services/LeaderboardService'
import { ClientYandexApiLeaderboardRepository } from './repository/ClientYandexApiLeaderboardRepository'

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
        {
          userService: new UserService(new ClientYandexApiUserRepository()),
          leaderboardService: new LeaderboardService(
            new ClientYandexApiLeaderboardRepository()
          ),
        },
        initialState
      )}>
      <App />
    </Provider>
  )
  expect(screen).toBeDefined()
})
