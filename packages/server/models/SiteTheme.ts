import { Optional } from 'sequelize'
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Index,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript'
import { IThemes } from './types'

type TThemesCreateAttributies = Optional<IThemes, 'id'>

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'site_theme',
})
export class SiteTheme extends Model<IThemes, TThemesCreateAttributies> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id!: number

  @Index
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  theme!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  description!: string
}
