import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../api/type'
import { getUser } from '../services/apiService'
import { AppDispath } from '.'

type LoadStatus = 'success' | 'pending' | 'failed' | 'noloaded'
type Nullable<T> = T | null

type UserState = {
  item: Nullable<User>
  loadStatus: LoadStatus
  isLoading: boolean
}

const initialState: UserState = {
  loadStatus: 'noloaded',
  item: null,
  isLoading: false,
}

const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    loadSuccess(state) {
      state.loadStatus = 'success'
      state.isLoading = false
    },
    loadFailed(state) {
      state.loadStatus = 'failed'
      state.isLoading = false
    },
    loadPending(state) {
      state.loadStatus = 'pending'
      state.isLoading = true
    },
    setUserState(state, action: PayloadAction<User>) {
      state.item = action.payload
    },
    resetUserState(state) {
      state.isLoading = false
      state.item = null
      state.loadStatus = 'noloaded'
    },
  },
})

export const { setUserState, loadSuccess, loadFailed, loadPending } =
  userSlice.actions

export const fetchUser = () => async (dispatch: AppDispath) => {
  try {
    dispatch(loadPending())
    const user = await getUser()
    if (user) {
      dispatch(loadSuccess())
      dispatch(setUserState(user))
      console.log('user added to store')
    }
  } catch (error) {
    dispatch(loadFailed())
    console.log(error)
  }
}
export default userSlice.reducer
