import { Optional } from 'sequelize'
import { AllowNull, Column, DataType, Model, Table } from 'sequelize-typescript'
import { IComments } from './types'

type TCommentCreateAttributies = Optional<
  IComments,
  'id' | 'CreatedAt' | 'UpdatedAt'
>

@Table({
  tableName: 'Comments',
})
export class Comments extends Model<IComments, TCommentCreateAttributies> {
  @AllowNull(false)
  @Column(DataType.TEXT)
  content!: string
}
