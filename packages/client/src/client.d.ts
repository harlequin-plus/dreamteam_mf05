import { RootState } from './store'

declare const __SERVER_PORT__: number

declare global {
  interface Window {
    APP_INITIAL_STATE?: RootState
  }
}
