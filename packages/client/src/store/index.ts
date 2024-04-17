import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userState'
import { User } from '../api/type'
import { UserState } from '../types'
export interface IUserServise {
  getCurrentUser(): Promise<User>
}
export interface IStoreState {
  userState: UserState
}

const createStore = (service: IUserServise, initialState?: IStoreState) => {
  return configureStore({
    reducer: {
      userState: userReducer,
    },
    preloadedState: initialState,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: service,
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
    APP_INITIAL_STATE: RootState
  }
}
