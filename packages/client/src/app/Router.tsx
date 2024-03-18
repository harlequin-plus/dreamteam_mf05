import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import IndexPage from '../pages/IndexPage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import LeaderboardPage from '../pages/LeaderboardPage'
import { useGetUser } from '../services/apiService'

const AppRouter: React.FC = () => {
  const { isLoading, user, error } = useGetUser()
  const navigate = useNavigate()

  if (isLoading) return <div>...loading</div>
  if (error) navigate('/404')
  if (!user?.id) navigate('/auth')

  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/auth" element={<LoginPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter
