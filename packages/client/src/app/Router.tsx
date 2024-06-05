import React from 'react'
import { Routes, Route } from 'react-router-dom'
import IndexPage from '../pages/IndexPage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import LeaderboardPage from '../pages/LeaderboardPage'
import MainPage from '../pages/MainPage'

import ForumPage from '../pages/ForumPage'
import ProfilePage from '../pages/ProfilePage'
import Topic from '../components/Topic'

import { Protected } from '../utils/Protected'
import { InternalServerError } from '../components/InternalServerError'

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/auth" element={<LoginPage />} />

      <Route element={<Protected redirect="/auth" />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/community" element={<ForumPage />} />
        <Route path="/community/:id" element={<Topic />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Route>

      <Route path="/game" element={<IndexPage />} />

      <Route path="*" element={<NotFoundPage />} />
      <Route path="/error/500" element={<InternalServerError />} />
    </Routes>
  )
}

export default AppRouter
