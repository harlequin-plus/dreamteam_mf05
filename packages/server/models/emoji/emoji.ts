import {
  DataType,
  Model,
  Table,
  Column,
  //   BelongsTo,
} from 'sequelize-typescript'

export interface IEmoji {
  messageID: number
  unicod: string
  userID: number
}

@Table({
  timestamps: false, // don't add 'created_at', 'updated_at'
  tableName: 'Emoji',
})
export class Emoji extends Model<IEmoji> {
  //   @BelongsTo(() => Message) таблица Message пока не сделана
  @Column(DataType.INTEGER)
  messageID!: number
  @Column(DataType.TEXT)
  unicod!: string
  //   @BelongsTo(() => User) таблица User пока не сделана
  @Column(DataType.INTEGER)
  userID!: number
}
