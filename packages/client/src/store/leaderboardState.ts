import { TLeaderboardData } from '../models/TAddUserToLeaderboard'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoadStatus } from '../types'
import { TServices } from '../repository_services'

export type LeaderboardState = {
  items: TLeaderboardData | undefined
  loadStatus: LoadStatus
  isLoading: boolean
}

const initialState: LeaderboardState = {
  items: undefined,
  loadStatus: 'noloaded',
  isLoading: false,
}

const leaderboardSlice = createSlice({
  name: 'leaderboardState',
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
    setLeaderboardState(state, action: PayloadAction<TLeaderboardData>) {
      state.items = action.payload
    },
    addNewLeaders(state, action: PayloadAction<TLeaderboardData>) {
      state.items = state.items
        ? [...state.items, ...action.payload]
        : action.payload
    },
    resetLeaderboardState(state) {
      state.isLoading = false
      state.items = undefined
      state.loadStatus = 'noloaded'
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchLeaderboardData.pending, state => {
      state.loadStatus = 'loading'
    })

    builder.addCase(fetchLeaderboardData.rejected, state => {
      state.loadStatus = 'failed'
    })

    builder.addCase(fetchLeaderboardData.fulfilled, (state, action) => {
      if (action.payload) {
        state.items = action.payload
        state.loadStatus = 'success'
      }
    })
  },
})

export const {
  setLeaderboardState,
  addNewLeaders,
  loadSuccess,
  loadFailed,
  loadPending,
  resetLeaderboardState,
} = leaderboardSlice.actions

export const fetchLeaderboardData = createAsyncThunk(
  'leaderboardState/fetchStatus',
  async (_req, { fulfillWithValue, rejectWithValue, extra }) => {
    const services: TServices = extra as TServices
    return services.leaderboardService
      .getCurrentLeaderboard()
      .then(leaderboardData => fulfillWithValue(leaderboardData))
      .catch(err => rejectWithValue(err.message))
  }
)

export default leaderboardSlice.reducer
