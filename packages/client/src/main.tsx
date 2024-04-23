import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorHandler } from './components/ErrorHandler'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import createStore from './store'
import { ClientYandexApiUserRepository } from './repository/ClientYandexApiUserRepository'
import { UserService } from './repository_services/UserService'
import { LeaderboardService } from './repository_services/LeaderboardService'
import { ClientYandexApiLeaderboardRepository } from './repository/ClientYandexApiLeaderboardRepository'

const initialState = window.APP_INITIAL_STATE

delete window.APP_INITIAL_STATE

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorHandler}>
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
    </ErrorBoundary>
  </React.StrictMode>
)

function startServiceWorker() {
  if (import.meta.env.MODE === 'development') {
    console.log('ServiceWorker не поддерживается в режиме разработчика')
    return
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then(registration => {
        const data = {
          type: 'CACHE_URLS',
          payload: [
            location.href,
            ...performance.getEntriesByType('resource').map(r => r.name),
          ],
        }
        if (registration.installing) {
          registration.installing.postMessage(data)
          return
        }
      })
      .catch(err => console.log('SW registration FAIL:', err))
  }
}
startServiceWorker()
