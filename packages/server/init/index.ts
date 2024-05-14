import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { Topics } from '../models/Topics'
import { Users } from '../models/Users'
import { Comments } from '../models/Comments'
import { Replies } from '../models/Replies'
import { UserTheme } from '../models/UserTheme'
import { SiteTheme } from '../models/SiteTheme'

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  NODE_ENV,
  POSTGRES_SERVICE_NAME,
} = process.env

const hostname = NODE_ENV == 'production' ? POSTGRES_SERVICE_NAME : 'localhost'

const sequelizeOptions: SequelizeOptions = {
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  host: hostname,
  port: Number(POSTGRES_PORT),
  dialect: 'postgres',
}

// Создаем инстанс Sequelize
export const sequelize = new Sequelize(sequelizeOptions)

// Инициализируем модели
sequelize.addModels([Users, Topics, Comments, Replies, UserTheme, SiteTheme])

Users.hasMany(Topics)
Topics.belongsTo(Users)

Users.hasMany(Comments)
Comments.belongsTo(Users)

Topics.hasMany(Comments, {
  onDelete: 'CASCADE',
})
Comments.belongsTo(Topics)

Users.hasMany(Replies)
Replies.belongsTo(Users)

Comments.hasMany(Replies, {
  onDelete: 'CASCADE',
})
Replies.belongsTo(Comments)

Users.hasOne(UserTheme)
UserTheme.belongsTo(Users)

UserTheme.hasOne(SiteTheme)
UserTheme.belongsTo(SiteTheme)

export async function dbConnect() {
  try {
    await sequelize.authenticate() // Проверка аутентификации в БД
    await sequelize.sync() // Синхронизация базы данных
    console.log('  ➜ 🎸 Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
