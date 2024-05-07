import { Optional } from 'sequelize'
import {
  AllowNull,
  Column,
  DataType,
  Table,
  Model,
  PrimaryKey,
} from 'sequelize-typescript'
import { IUser } from './types'

type TUserCreateAttributies = Optional<IUser, 'id'>

@Table({
  timestamps: false,
  tableName: 'Users',
})
export class Users extends Model<IUser, TUserCreateAttributies> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id!: string

  @AllowNull(false)
  @Column(DataType.STRING())
  first_name!: string

  @AllowNull(false)
  @Column(DataType.STRING())
  second_name!: string

  @Column(DataType.STRING())
  display_name!: string

  @AllowNull(false)
  @Column(DataType.STRING())
  phone!: string

  @AllowNull(false)
  @Column(DataType.STRING())
  login!: string

  @Column(DataType.STRING())
  avatar!: string

  @AllowNull(false)
  @Column(DataType.STRING())
  email!: string
}
