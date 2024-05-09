import { scoreVariableName } from '../constants'
import { TUser } from './TUser'

export type TLeader = {
  [scoreVariableName]: number
  userId: number
  secondsInGame: number

  included?: {
    user: TUser
  }
}

export type TLeaderboardRequest = {
  cursor: number
  limit: number
}

export type TLeaderboardData = Array<{ data: TLeader }>
