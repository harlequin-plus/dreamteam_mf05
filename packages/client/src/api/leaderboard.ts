import { HTTPTransport } from '../utils/http'
import { baseURL, scoreVariableName, teamName } from '../constants'
import {
  TLeader,
  TLeaderboardData,
  TLeaderboardRequest,
} from '../models/TAddUserToLeaderboard'

const leaderboardApi = new HTTPTransport()

export default class LeaderboardApi {
  async addUserToLeaderboard(data: TLeader) {
    return leaderboardApi.post<void>(`${baseURL}/leaderboard`, undefined, {
      ratingFieldName: scoreVariableName,
      teamName,
      data,
    })
  }

  async getLeaderboard(data: TLeaderboardRequest) {
    return leaderboardApi.post<TLeaderboardData>(
      `${baseURL}/leaderboard/all`,
      undefined,
      {
        ...data,
        ratingFieldName: scoreVariableName,
      }
    )
  }
}
