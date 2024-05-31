import { Optional } from 'sequelize'
import { AllowNull, Column, DataType, Model, Table } from 'sequelize-typescript'
import { ITopic } from './types'

type TTopicsCreateAttributies = Optional<
  ITopic,
  'id' | 'CreatedAt' | 'UpdatedAt'
>

@Table({
  tableName: 'Topics',
})
export class Topics extends Model<ITopic, TTopicsCreateAttributies> {
  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string
}
