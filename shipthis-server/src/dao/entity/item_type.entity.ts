import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript';
import { Category } from './category.entity';
import { ItemPriceHist } from './item_price_hist.entity';
@Table({tableName:'ItemType',  timestamps: false})
export class ItemType extends Model<ItemType> {
       
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    item_type_id;

    @Column({type:DataType.STRING(100), allowNull:false})
    item_name;

    @Column({type:DataType.INTEGER, allowNull:false})
    max_weight;

    @Column({type:DataType.INTEGER, allowNull:false})
    max_volume;

    @Column({type:DataType.STRING(50), allowNull:false})
    item_type_status;

    @ForeignKey(() => Category)
    @Column
    category_fk: number;

    @BelongsTo(() => Category)
    category: Category;

    @HasMany(() => ItemPriceHist)
    itemPriceHist: ItemPriceHist[];
   
}