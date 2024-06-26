import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import { HelmetData } from 'react-helmet'
import express, { Request as ExpressRequest } from 'express'
import path from 'path'

import fs from 'fs/promises'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import serialize from 'serialize-javascript'
import cookieParser from 'cookie-parser'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { SsrYandexAPIUserRepository } from './repository/SsrYandexAPIUserRepository'
import { SsrYandexAPILeaderboardRepository } from './repository/SsrYandexAPILeaderboardRepository'

const port = process.env.PORT || 3000
const clientPath = path.join(__dirname, '..')
const isDev = process.env.NODE_ENV === 'development'

async function createServer() {
  const app = express()
  app.use(cors())

  // ***************************************************************************
  // Temporary solution to simulate the backend of the forum
  // Do not change order with next app.use
  // TODO remove or refactor when real backend will be implemented
  app.use(
    '/api/v2/forum',
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '',
      },
      target: 'http://localhost:3001/api/v2/forum',
    })
  )
  // ***************************************************************************

  app.use(
    '/api/v2',
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '',
      },
      target: 'https://ya-praktikum.tech/api/v2',
    })
  )

  app.use('*', cookieParser())
  let vite: ViteDevServer | undefined
  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  } else {
    app.use(
      express.static(path.join(clientPath, 'dist/client'), { index: false })
    )
  }

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      // Получаем файл client/index.html который мы правили ранее
      // Создаём переменные
      let render: (
        req: ExpressRequest,
        repository
      ) => Promise<{ html: string; initialState: unknown; helmet: HelmetData }>
      let template: string
      if (vite) {
        template = await fs.readFile(
          path.resolve(clientPath, 'index.html'),
          'utf-8'
        )

        // Применяем встроенные HTML-преобразования vite и плагинов
        template = await vite.transformIndexHtml(url, template)

        // Загружаем модуль клиента, который писали выше,
        // он будет рендерить HTML-код
        render = (
          await vite.ssrLoadModule(
            path.join(clientPath, 'src/entry-server.tsx')
          )
        ).render
      } else {
        template = await fs.readFile(
          path.join(clientPath, 'dist/client/index.html'),
          'utf-8'
        )

        // Получаем путь до сбилдженого модуля клиента, чтобы не тащить средства сборки клиента на сервер
        const pathToServer = path.join(
          clientPath,
          'dist/server/entry-server.js'
        )

        // Импортируем этот модуль и вызываем с инишл стейтом
        render = (await import(pathToServer)).render
      }

      // Получаем HTML-строку из JSX
      const repositories = {
        userRepository: new SsrYandexAPIUserRepository(req.headers['cookie']),
        leaderboardRepository: new SsrYandexAPILeaderboardRepository(
          req.headers['cookie']
        ),
      }

      const {
        html: appHtml,
        initialState,
        helmet,
      } = await render(req, repositories)

      const html = template
        .replace(
          `<!--ssr-helmet-->`,
          `${helmet.meta.toString()} ${helmet.title.toString()} ${helmet.link.toString()}`
        )
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(
          `<!--ssr-initial-state-->`,
          `<script>window.APP_INITIAL_STATE = ${serialize(initialState, {
            isJSON: true,
          })}</script>`
        )

      // Завершаем запрос и отдаём HTML-страницу
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e as Error)
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`Client is listening on port!: ${port}`)
  })
}

createServer()
