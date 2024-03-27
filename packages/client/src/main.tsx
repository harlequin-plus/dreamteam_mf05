import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorHandler } from './components/ErrorHandler'
import './index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorHandler}>
      <App />
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
