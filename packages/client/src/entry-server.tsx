import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { Request as ExpressRequest } from 'express'
import { StaticRouter } from 'react-router-dom/server'

import AppRouter from './app/Router'
import Header from './components/Header'
import Footer from './components/Footer'
import { Helmet } from 'react-helmet'
import createStore from './store'
import { UserService } from './repository_services/UserService'
import { fetchUser } from './store/userState'
import { LeaderboardService } from './repository_services/LeaderboardService'
import { TRepositories } from './repository/Repositories'
import { fetchLeaderboardData } from './store/leaderboardState'
import { TServices } from './repository_services'

export const render = async (
  req: ExpressRequest,
  repositories: TRepositories
) => {
  const services: TServices = {
    userService: new UserService(repositories.userRepository),
    leaderboardService: new LeaderboardService(
      repositories.leaderboardRepository
    ),
  }

  const store = await createStore(services)
  await store.dispatch(fetchUser())
  await store.dispatch(fetchLeaderboardData())
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <Header />
        <AppRouter />
        <Footer />
      </StaticRouter>
    </Provider>
  )

  const helmet = Helmet.renderStatic()

  return {
    html,
    helmet,
    initialState: store.getState(),
  }
}
