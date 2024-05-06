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

const getLeaderboardLite = async (data: TLeaderboardRequest) => {
  const response = await leaderboardApi.getLeaderboard(data)
  if (responseHasError(response)) {
    throw Error(response.data.reason)
  }

  return response.data
}

const fillLeaderboardLite = async (leadersLite: TLeaderboardData) => {
  const detailedList: TLeaderboardData = []

  for (const leader of leadersLite) {
    const userId = leader.data.userId
    if (userId) {
      try {
        const user = await getUserByID(userId)
        leader.data.included = {
          user,
        }
        detailedList.push(leader)
      } catch (error) {
        /* empty */
      }
    }
  }

  return detailedList
}

const getLeaderboard = async (data: TLeaderboardRequest) => {
  return fillLeaderboardLite(await getLeaderboardLite(data))
}

export {
  leaderboardApi,
  addUserToLeaderboard,
  getLeaderboardLite,
  fillLeaderboardLite,
  getLeaderboard,
}
