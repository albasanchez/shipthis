import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript';
import { ItemType } from './item_type.entity';
import { Category } from './category.entity';
import { Place } from './place.entity';
import { OrderSheet } from './order_sheet.entity';
@Table({tableName:'Office',  timestamps: false})
export class Office extends Model<Office> {
   
    @Column({ type: DataType.INTEGER, primaryKey: true, allowNull:false})
    office_id;

    @Column({type:DataType.STRING(100), allowNull:false})
    office_name;

    @Column({type:DataType.STRING(10), allowNull:false})
    phone_code;

    @Column({type:DataType.STRING(10), allowNull:false})
    phone_number;

    @Column({type:DataType.STRING(50), allowNull:false})
    office_status;

    @ForeignKey(() => Place)
    @Column
    place_fk: number;

    @BelongsTo(() => Place)
    place: Place;  
    
    @HasMany(() => OrderSheet)
    orderSheet: OrderSheet[];
   
}