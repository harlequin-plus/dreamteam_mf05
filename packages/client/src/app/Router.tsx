import React from 'react'
import { Routes, Route } from 'react-router-dom'
import IndexPage from '../pages/IndexPage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import Profile from '../pages/Profile'

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/auth" element={<LoginPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter
