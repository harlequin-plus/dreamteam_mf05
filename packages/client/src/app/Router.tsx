import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import IndexPage from '../pages/IndexPage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import LeaderboardPage from '../pages/LeaderboardPage'
import useGetUser from '../api/useGetUser'
import MainPage from '../pages/MainPage'
import ForumPage from '../pages/ForumPage'
import ProfilePage from '../pages/ProfilePage'

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/auth" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/mainpage" element={<MainPage />} />
      <Route path="/forum" element={<ForumPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter
