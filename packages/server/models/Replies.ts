import { AllowNull, Column, DataType, Model, Table } from 'sequelize-typescript'
import { IReplies } from './types'
import { Optional } from 'sequelize'

type TRepliesCreateAttributies = Optional<
  IReplies,
  'id' | 'CreatedAt' | 'UpdatedAt'
>

@Table({
  tableName: 'Replies',
})
export class Replies extends Model<IReplies, TRepliesCreateAttributies> {
  @AllowNull(false)
  @Column(DataType.STRING())
  content!: string
}
