import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript';
import { ItemType } from './item_type.entity';
import { Category } from './category.entity';
import { OrderSheet } from './order_sheet.entity';
@Table({tableName:'OrderType',  timestamps: false})
export class OrderType extends Model<OrderType> {
   
    @Column({ type: DataType.INTEGER, primaryKey: true, allowNull:false})
    order_type_id;

    @Column({type:DataType.STRING(100), allowNull:false})
    order_name;

    @Column({type:DataType.INTEGER, allowNull:false})
    days_to_deliver;

    @Column({type:DataType.STRING(50), allowNull:false})
    order_type_status;

    @ForeignKey(() => Category)
    @Column
    category_fk: number;

    @BelongsTo(() => Category)
    category: Category;    

    @HasMany(() => OrderSheet)
    orderSheet: OrderSheet[];
   
   
}