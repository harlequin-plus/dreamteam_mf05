import axios from 'axios'
const API_ROOT = 'https://ya-praktikum.tech/api/v2/'
const scoreVariableName = 'Dreamteam_score'

export class SsrYandexAPILeaderboardRepository {
  constructor(private _cookieHeader: string | undefined) {}

  async getCurrentLeaderboard(): Promise<any> {
    const { data } = await axios.post(
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

    const list = data as Array<object>

    // if user was removed, don't include him into detailedList
    const detailedList: Array<object> = []

    await Promise.all(
      list.map(async (leader: { data }) => {
        try {
          const { data } = await axios.get(
            `${API_ROOT}/user/${leader.data.userId}`,
            {
              headers: {
                cookie: this._cookieHeader,
              },
            }
          )
          leader.data.included = {
            user: data,
          }
          detailedList.push(leader)
        } catch (error) {
          /* empty */
        }
      })
    )

    return detailedList
  }
}
