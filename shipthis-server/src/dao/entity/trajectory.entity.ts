import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript';
import { OrderSheet } from './order_sheet.entity';

@Table({tableName:'Trajectory',  timestamps: false})
export class Trajectory extends Model<Trajectory> {
   
    @Column({ type: DataType.INTEGER, primaryKey: true, allowNull:false})
    trajectory_id;

    @Column({type:DataType.INTEGER})
    linear_distance;

    @Column({type:DataType.INTEGER})
    efective_distance;

    @ForeignKey(() => OrderSheet)
    @Column
    order_id_fk: number;

    @ForeignKey(() => OrderSheet)
    @Column
    order_person_fk: number;

    @ForeignKey(() => OrderSheet)
    @Column
    order_user_fk: number;

    @ForeignKey(() => OrderSheet)
    @Column
    office_fk: number;
    
    @BelongsTo(() => OrderSheet)
    orderSheet: OrderSheet; 
   
}