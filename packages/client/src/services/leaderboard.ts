import LeaderboardApi from '../api/leaderboard'
import { responseHasError } from '../utils/api.utils'
import {
  TLeaderboardData,
  TLeader,
  TLeaderboardRequest,
} from '../models/TAddUserToLeaderboard'
import { getUserByID } from './user'

const leaderboardApi = new LeaderboardApi()

const addUserToLeaderboard = async (data: TLeader) => {
  const response = await leaderboardApi.addUserToLeaderboard(data)
  if (responseHasError(response)) {
    throw Error(response.data.reason)
  }
}

const getLeaderboard = async (data: TLeaderboardRequest) => {
  const response = await leaderboardApi.getLeaderboard(data)
  if (responseHasError(response)) {
    throw Error(response.data.reason)
  }

  const list = response.data as TLeaderboardData

  // if user was removed, don't include him into detailedList
  const detailedList: TLeaderboardData = []

  await Promise.all(
    list.map(async (leader: { data: TLeader }) => {
      try {
        const user = await getUserByID(leader.data.userId)
        leader.data.included = {
          user,
        }
        detailedList.push(leader)
      } catch (error) {
        /* empty */
      }
    })
  )

  return detailedList
}

export { leaderboardApi, addUserToLeaderboard, getLeaderboard }
