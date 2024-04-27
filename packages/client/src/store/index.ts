import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userState'
import leaderboardReducer from './leaderboardState'
import { UserState } from '../types'
import { LeaderboardState } from './leaderboardState'
import { TServices } from '../repository_services'

export interface IStoreState {
  userState: UserState
  leaderboardState: LeaderboardState
}

const createStore = (services: TServices, initialState?: IStoreState) => {
  return configureStore({
    reducer: {
      userState: userReducer,
      leaderboardState: leaderboardReducer,
    },
    preloadedState: initialState,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: services,
        },
      })
    },
  })
}

export default createStore

export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>
export type AppDispatch = ReturnType<typeof createStore>['dispatch']

declare global {
  interface Window {
    APP_INITIAL_STATE?: RootState
  }
}
