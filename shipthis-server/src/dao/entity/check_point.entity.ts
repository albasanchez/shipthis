import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript';
import { OrderSheet } from './order_sheet.entity';
import { Place } from './place.entity';

@Table({tableName:'CheckPoint',  timestamps: false})
export class CheckPoint extends Model<CheckPoint> {
   
    @Column({ type: DataType.INTEGER, primaryKey: true, allowNull:false})
    trajectory_fk;

    @Column({ type: DataType.INTEGER, primaryKey: true, allowNull:false})
    check_point_order;

    @Column({type: "TIMESTAMP"})
    time_mark;

    @ForeignKey(() => Place)
    @Column
    place_fk: number;
    
    @BelongsTo(() => Place)
    palce: Place; 
   

   
}