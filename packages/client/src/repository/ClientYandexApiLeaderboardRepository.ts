import { LeaderboardRepository } from '../repository_services/LeaderboardService'
import { getLeaderboard } from '../services/leaderboard'
import { TLeaderboardData } from '../models/TAddUserToLeaderboard'

export class ClientYandexApiLeaderboardRepository
  implements LeaderboardRepository
{
  async getCurrentLeaderboard(): Promise<TLeaderboardData> {
    return getLeaderboard({
      cursor: 0,
      limit: 30,
    })
  }
}
