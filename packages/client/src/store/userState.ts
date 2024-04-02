import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../api/type'
import { getUser } from '../services/apiService'
import { UserState } from '../types'

const defaultUser: User = {
  id: 0,
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
    setUserState(state, action: PayloadAction<User>) {
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

    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loadStatus = 'failed'
      console.log(action.payload)
    })

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.item = action.payload
        state.loadStatus = 'success'
      }
    })
  },
})

export const { setUserState, loadSuccess, loadFailed, loadPending } =
  userSlice.actions

export const fetchUser = createAsyncThunk(
  'userState/fetchStatus',
  async (_req, { rejectWithValue }) => {
    try {
      const user = await getUser()
      if (user) return user
      throw new Error('Failed to load user!') //т.к. getUser в случае ошибки ничего не возвращает и у user значение undefined, мы пробрасывам ошибку.
    } catch (err) {
      if (err instanceof Error) return rejectWithValue(err.message)
    }
  }
)

export default userSlice.reducer
