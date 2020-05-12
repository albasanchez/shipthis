import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript';
import { ItemType } from './item_type.entity';
import { OrderType } from './order_type.entity'
@Table({tableName:'Category',  timestamps: false})
export class Category extends Model<Category> {
    
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    category_id;

    @Column({type:DataType.STRING(200), allowNull:false})
    categoty_name;
    
    @HasMany(() => ItemType)
    itemData: ItemType[];

    @HasMany(() => OrderType)
    orderType: OrderType[];
   
}