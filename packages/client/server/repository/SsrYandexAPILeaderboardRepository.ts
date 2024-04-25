import axios from 'axios'
const API_ROOT = 'https://ya-praktikum.tech/api/v2/'
const scoreVariableName = 'Dreamteam_score'

export type TLeader = {
  [scoreVariableName]: number
  userId: number
  secondsInGame: number

  included?: {
    user: object
  }
}

type TLeaderboardItem = {
  data: TLeader
}

export type TLeaderboardData = Array<TLeaderboardItem>

export class SsrYandexAPILeaderboardRepository {
  constructor(private _cookieHeader: string | undefined) {}

  async getCurrentLeaderboard(): Promise<TLeaderboardData> {
    const { data: leaders } = await axios.post<TLeaderboardData>(
      `${API_ROOT}/leaderboard/all`,
      {
        ratingFieldName: scoreVariableName,
        cursor: 0,
        limit: 30,
      },
      {
        headers: {
          cookie: this._cookieHeader,
        },
      }
    )

    // if user was removed, don't include him into detailedList
    const detailedLeaders: TLeaderboardData = []

    for (const leader of leaders) {
      const userId = leader.data.userId
      if (userId) {
        try {
          const { data } = await axios.get(`${API_ROOT}/user/${userId}`, {
            headers: {
              cookie: this._cookieHeader,
            },
          })
          leader.data.included = {
            user: data,
          }
          detailedLeaders.push(leader)
        } catch (error) {
          /* empty */
        }
      }
    }

    return detailedLeaders
  }
}
