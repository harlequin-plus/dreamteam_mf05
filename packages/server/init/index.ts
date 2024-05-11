import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { Topics } from '../models/Topics'
import { Users } from '../models/Users'
import { Comments } from '../models/Comments'
import { Replies } from '../models/Replies'

const sequelizeOptions: SequelizeOptions = {
  //т.к. переменные окружения не сделаны(задание из другой задачи) захордкодил данные бд
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
}

// Создаем инстанс Sequelize
export const sequelize = new Sequelize(sequelizeOptions)

// Инициализируем модели
sequelize.addModels([Users, Topics, Comments, Replies])

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

export async function dbConnect() {
  try {
    await sequelize.authenticate() // Проверка аутентификации в БД
    await sequelize.sync() // Синхронизация базы данных
    console.log('  ➜ 🎸 Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
