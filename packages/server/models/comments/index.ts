import { Users } from '../users'
import { IComments } from '../types'
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import { Topics } from '../topics'

@Table({
  timestamps: false,
  tableName: 'Comments',
})
export class Comments extends Model<IComments> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  commentId!: number

  @Column(DataType.TEXT)
  @AllowNull(false)
  content!: string

  @Column(DataType.NOW)
  @AllowNull(false)
  date!: string

  @BelongsTo(() => Users)
  author!: number

  @BelongsTo(() => Topics, {
    onDelete: 'CASCADE',
  })
  topic!: number
}
