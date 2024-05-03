import { Users } from '../users'
import { ITopic } from '../types'
import {
  AllowNull,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  BelongsTo,
  AutoIncrement,
} from 'sequelize-typescript'

@Table({
  timestamps: false,
  tableName: 'Topics',
})
export class Topics extends Model<ITopic> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  topicId!: number

  @Column(DataType.STRING)
  @AllowNull(false)
  title!: string

  @BelongsTo(() => Users)
  author!: number
}
