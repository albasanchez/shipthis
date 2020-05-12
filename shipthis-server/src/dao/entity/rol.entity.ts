import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { UserData } from './user_data.entity';

@Table({tableName:'Rol', timestamps: false})
export class Rol extends Model<Rol> {

  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
  rol_id: number;

  @Column({type:DataType.STRING})
  rol_name: string;

  @HasMany(() => UserData)
  userData: UserData[];

}