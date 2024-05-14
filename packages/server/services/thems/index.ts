import { UserTheme } from '../../models/UserTheme'
import { SiteTheme } from '../../models//SiteTheme'
import { ITheme, IThemes } from '../../models/types'

export const getUserThemeByUserId = async (id: number) => {
  const userTheme = await UserTheme.findOne({
    where: {
      id,
    },
    attributes: ['id', 'UserId', 'SiteThemeId'],
    include: [
      {
        model: SiteTheme,
        attributes: ['id', 'name', 'description', 'color'],
      },
    ],
  })
  return userTheme
}

export const deleteUserThemeByUserId = async (id: number) => {
  return await UserTheme.destroy({ where: { id } })
}

export const updateUserThemeByUserId = async ({
  ownerId,
  themeId,
}: Pick<ITheme, 'id' | 'themeId' | 'ownerId' | 'device'>) => {
  await UserTheme.update(
    {
      themeId,
    },
    {
      where: {
        ownerId,
      },
    }
  )
}

export const createSiteTheme = async ({
  id,
  description,
  theme,
}: Pick<IThemes, 'id' | 'description' | 'theme'>) => {
  const siteTheme = await SiteTheme.create({ id, description, theme })
  return siteTheme.id
}

export const getSiteThemeById = async (id: number) => {
  const siteTheme = await SiteTheme.findOne({
    where: {
      id,
    },
    attributes: ['id', 'name', 'description', 'color'],
  })
  return siteTheme
}

export const deleteSiteThemeById = async (id: number) => {
  return await SiteTheme.destroy({ where: { id } })
}

export const updateSiteThemeById = async ({
  id,
  theme,
  description,
}: Pick<IThemes, 'id' | 'theme' | 'description'>) => {
  await SiteTheme.update(
    {
      id,
      description,
      theme,
    },
    {
      where: {
        id,
      },
    }
  )
}
