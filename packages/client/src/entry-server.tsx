import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { Request as ExpressRequest } from 'express'
import { StaticRouter } from 'react-router-dom/server'

import { store } from './store'
import AppRouter from './app/Router'
import Header from './components/Header'
import Footer from './components/Footer'
import { Helmet } from 'react-helmet'

export const render = async (req: ExpressRequest) => {
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
