import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../api/type'

type LoadStatus = 'success' | 'pending' | 'failed' | 'noloaded'
type Nullable<T> = T | null

type UserState = {
  item: Nullable<User>
  status: LoadStatus
}

const initialState: UserState = {
  status: 'noloaded',
  item: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadSuccess(state) {
      state.status = 'success'
    },
    loadFailed(state) {
      state.status = 'failed'
    },
    loadPending(state) {
      state.status = 'pending'
    },
    setUser(state, action: PayloadAction<UserState>) {
      state.item = action.payload.item
    },
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
