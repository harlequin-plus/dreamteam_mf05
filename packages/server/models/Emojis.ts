import { DataType, Model, Table, Column } from 'sequelize-typescript'
import { IEmoji } from './types'

@Table({
  timestamps: false,
  tableName: 'Emoji',
})
export class Emojis extends Model<IEmoji> {
  @Column(DataType.TEXT)
  unicode!: string
}
