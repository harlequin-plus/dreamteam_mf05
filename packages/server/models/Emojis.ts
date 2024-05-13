import { DataType, Model, Table, Column, BelongsTo } from 'sequelize-typescript'
import { IEmoji } from './types'
import { Comments } from './Comments'
import { Users } from './Users'

@Table({
  timestamps: false,
  tableName: 'Emoji',
})
export class Emojis extends Model<IEmoji> {
  @BelongsTo(() => Comments)
  @Column(DataType.INTEGER)
  CommentID!: number
  @Column(DataType.TEXT)
  unicod!: string
  @BelongsTo(() => Users)
  @Column(DataType.INTEGER)
  UserID!: number
}
