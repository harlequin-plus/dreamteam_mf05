import React from 'react'
import { Routes, Route } from 'react-router-dom'
import IndexPage from '../pages/IndexPage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import Profile from '../pages/Profile'
import LeaderboardPage from '../pages/LeaderboardPage'
import MainPage from '../pages/MainPage'
import Forum from '../pages/Forum'
import { Protected } from '../utils/Protected'

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/auth" element={<LoginPage />} />
      <Route
        path="/profile"
        element={
          <Protected redirect="/auth">
            <Profile />
          </Protected>
        }
      />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/mainpage" element={<MainPage />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter
