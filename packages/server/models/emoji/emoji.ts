import { DataType, Model, Table, Column } from 'sequelize-typescript'

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
  @Column(DataType.INTEGER)
  messageID!: number
  @Column(DataType.TEXT)
  unicod!: string
  @Column(DataType.INTEGER)
  userID!: number
}
