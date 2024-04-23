import { http, TResult } from '../utils/http'
import { TAPIError } from '../models/TAPIError'
import { baseURL, scoreVariableName, teamName } from '../constants'
import {
  TLeader,
  TLeaderboardData,
  TLeaderboardRequest,
} from '../models/TAddUserToLeaderboard'

export default class LeaderboardApi {
  async addUserToLeaderboard(
    data: TLeader
  ): Promise<TResult<void | TAPIError>> {
    return http.post<void>(`${baseURL}/leaderboard`, {
      ratingFieldName: scoreVariableName,
      teamName,
      data,
    })
  }

  async getLeaderboard(
    data: TLeaderboardRequest
  ): Promise<TResult<TLeaderboardData | TAPIError>> {
    return http.post<TLeaderboardData>(`${baseURL}/leaderboard/all`, {
      ...data,
      ratingFieldName: scoreVariableName,
    })
  }
}
