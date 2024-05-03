import {
  AllowNull,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript'
import { IUser } from '../types'

@Table({
  timestamps: false,
  tableName: 'Users',
})
export class Users extends Model<IUser> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  @AllowNull(false)
  userId!: number

  @Column(DataType.STRING())
  @AllowNull(false)
  first_name!: string

  @Column(DataType.STRING())
  @AllowNull(false)
  second_name!: string

  @Column(DataType.STRING())
  display_name!: string

  @Column(DataType.STRING())
  @AllowNull(false)
  phone!: string

  @Column(DataType.STRING())
  @AllowNull(false)
  login!: string

  @Column(DataType.STRING())
  avatar!: string

  @Column(DataType.STRING())
  @AllowNull(false)
  email!: string
}
