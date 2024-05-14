import express from 'express'
import {
  getUserThemeByUserId,
  deleteUserThemeByUserId,
  updateUserThemeByUserId,
  createSiteTheme,
  getSiteThemeById,
  deleteSiteThemeById,
  updateSiteThemeById,
} from '../services/thems/index'
import { getUserIdFromApi } from '../api/auth'

const ThemeRouter = express.Router()

ThemeRouter.get('/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId)
  if (!userId || isNaN(userId)) {
    res.status(400).send({ reason: 'Invalid user ID' })
    return
  }
  const userTheme = await getUserThemeByUserId(userId)
  if (!userTheme) {
    res.status(404).send({ reason: 'User theme not found' })
    return
  }
  res.status(200).send(userTheme)
})

ThemeRouter.delete('/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId)
  if (!userId || isNaN(userId)) {
    res.status(400).send({ reason: 'Invalid user ID' })
    return
  }
  const deleted = await deleteUserThemeByUserId(userId)
  if (!deleted) {
    res.status(404).send({ reason: 'User theme not found' })
    return
  }
  res.sendStatus(200)
})

ThemeRouter.put('/update', async (req, res) => {
  const userId = await getUserIdFromApi(req)
  const { themeId } = req.body
  if (!themeId || typeof themeId !== 'number') {
    res.status(400).send({ reason: 'Invalid theme ID' })
    return
  }
  await updateUserThemeByUserId({
    id: 0,
    themeId: themeId.toString(),
    device: 'default',
    ownerId: userId.toString(),
  })
  res.sendStatus(200)
})

ThemeRouter.post('/create', async (req, res) => {
  const { id, description, theme } = req.body
  if (!id || !description || !theme) {
    res.status(400).send({ reason: 'Missing required fields' })
    return
  }
  const siteThemeId = await createSiteTheme({ id, description, theme })
  res.status(200).send({ id: siteThemeId })
})

ThemeRouter.get('/site/:themeId', async (req, res) => {
  const themeId = parseInt(req.params.themeId)
  if (!themeId || isNaN(themeId)) {
    res.status(400).send({ reason: 'Invalid theme ID' })
    return
  }
  const siteTheme = await getSiteThemeById(themeId)
  if (!siteTheme) {
    res.status(404).send({ reason: 'Site theme not found' })
    return
  }
  res.status(200).send(siteTheme)
})

ThemeRouter.delete('/site/:themeId', async (req, res) => {
  const themeId = parseInt(req.params.themeId)
  if (!themeId || isNaN(themeId)) {
    res.status(400).send({ reason: 'Invalid theme ID' })
    return
  }
  const deleted = await deleteSiteThemeById(themeId)
  if (!deleted) {
    res.status(404).send({ reason: 'Site theme not found' })
    return
  }
  res.sendStatus(200)
})

ThemeRouter.put('/site/update', async (req, res) => {
  const { id, description, theme } = req.body
  if (!id || !description || !theme) {
    res.status(400).send({ reason: 'Missing required fields' })
    return
  }
  await updateSiteThemeById({ id, description, theme })
  res.sendStatus(200)
})

export default ThemeRouter
