import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Office } from './office.entity';
@Table({tableName:'Place',  timestamps: false})
export class Place extends Model<Place> {
  
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    category_id;
  
    @Column({type:DataType.STRING, allowNull:false})
    categoty_name;

    @HasMany(() => Office)
    office: Office[];

}