import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { Topics } from '../models/Topics'
import { Users } from '../models/Users'
import { Comments } from '../models/Comments'
import { Replies } from '../models/Replies'
import { UserTheme } from '../models/UserTheme'
import { SiteTheme } from '../models/SiteTheme'
import { Emojis } from '../models/Emojis'

//const {
//  POSTGRES_USER,
//  POSTGRES_PASSWORD,
//  POSTGRES_DB,
//  POSTGRES_PORT,
//  NODE_ENV,
//  POSTGRES_SERVICE_NAME,
//} = process.env

//const hostname = NODE_ENV == 'production' ? POSTGRES_SERVICE_NAME : 'localhost'

const sequelizeOptions: SequelizeOptions = {
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  host: 'postgres',
  port: Number('5432'),
  dialect: 'postgres',
}

// Создаем инстанс Sequelize
export const sequelize = new Sequelize(sequelizeOptions)

// Инициализируем модели
sequelize.addModels([
  Users,
  Topics,
  Comments,
  Replies,
  UserTheme,
  SiteTheme,
  Emojis,
])

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

Users.hasMany(Emojis)
Emojis.belongsTo(Users)
Comments.hasMany(Emojis)
Emojis.belongsTo(Comments)

export async function dbConnect() {
  try {
    await sequelize.authenticate() // Проверка аутентификации в БД
    await sequelize.sync() // Синхронизация базы данных
    console.log('  ➜ 🎸 Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
