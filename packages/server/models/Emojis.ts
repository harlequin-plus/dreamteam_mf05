import {
  DataType,
  Model,
  Table,
  Column,
  //   BelongsTo,
  // ForeignKey,
} from 'sequelize-typescript'
import { IEmoji } from './types'
// import { Comments } from './Comments'
// import { Users } from './Users'

@Table({
  timestamps: false,
  tableName: 'Emoji',
})
export class Emojis extends Model<IEmoji> {
  // @ForeignKey(() => Comments)
  //   @BelongsTo(() => Comments, 'comment_ID')
  //   @Column(DataType.INTEGER)
  //   commentID!: number
  @Column(DataType.TEXT)
  unicod!: string
  //   @BelongsTo(() => Users, 'user_ID')
  //   @Column(DataType.INTEGER)
  //   userID!: number
}
