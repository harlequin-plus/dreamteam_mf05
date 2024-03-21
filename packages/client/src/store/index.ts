import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'

export const store = configureStore({
  reducer: {
    setUser: userReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispath = typeof store.dispatch
