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
import { UserRepository, UserService } from './api/UserService'
import { fetchUser } from './store/userState'

export const render = async (
  req: ExpressRequest,
  repository: UserRepository
) => {
  const store = await createStore(new UserService(repository))
  await store.dispatch(fetchUser())
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
