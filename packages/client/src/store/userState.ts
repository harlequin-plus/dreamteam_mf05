import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserState } from '../types'
import { TUser } from '../models/TUser'
import { TServices } from '../repository_services'

const defaultUser: TUser = {
  id: -1,
  login: '',
  email: '',
  first_name: '',
  second_name: '',
  display_name: null,
  phone: '',
  avatar: null,
}

const initialState: UserState = {
  loadStatus: 'noloaded',
  item: defaultUser,
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
      state.loadStatus = 'loading'
      state.isLoading = true
    },
    setUserState(state, action: PayloadAction<TUser>) {
      state.item = action.payload
    },
    resetUserState(state) {
      state.isLoading = false
      state.item = defaultUser
      state.loadStatus = 'noloaded'
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, state => {
      state.loadStatus = 'loading'
    })

    builder.addCase(fetchUser.rejected, state => {
      state.loadStatus = 'failed'
    })

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.item = action.payload
        state.loadStatus = 'success'
      }
    })
  },
})

export const {
  setUserState,
  loadSuccess,
  loadFailed,
  loadPending,
  resetUserState,
} = userSlice.actions

export const fetchUser = createAsyncThunk(
  'userState/fetchStatus',
  async (_req, { fulfillWithValue, rejectWithValue, extra }) => {
    const services: TServices = extra as TServices
    return services.userService
      .getCurrentUser()
      .then(user => fulfillWithValue(user))
      .catch(err => rejectWithValue(err.message))
  }
)

export default userSlice.reducer
