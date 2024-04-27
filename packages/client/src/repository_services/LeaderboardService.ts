import { TLeaderboardData } from '../models/TAddUserToLeaderboard'

export interface LeaderboardRepository {
  getCurrentLeaderboard(): Promise<TLeaderboardData>
}

// TODO: найти подходящее место
export class LeaderboardService {
  constructor(private _repo: LeaderboardRepository) {}
  getCurrentLeaderboard() {
    return this._repo.getCurrentLeaderboard()
  }
}
