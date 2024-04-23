import { UserRepository } from '../repository_services/UserService'
import { LeaderboardRepository } from '../repository_services/LeaderboardService'

export type TRepositories = {
  userRepository: UserRepository
  leaderboardRepository: LeaderboardRepository
}
