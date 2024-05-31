import { TUser } from '../models/TUser'
import { TLeaderboardData } from '../models/TAddUserToLeaderboard'

export interface IUserService {
  getCurrentUser(): Promise<TUser>
}

export interface ILeaderboardService {
  getCurrentLeaderboard(): Promise<TLeaderboardData>
}

export type TServices = {
  userService: IUserService
  leaderboardService: ILeaderboardService
}
