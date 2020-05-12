import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript';
import { ItemType } from './item_type.entity';
import { Item } from './item.entity';
@Table({tableName:'ItemPriceHist',  timestamps: false})
export class ItemPriceHist extends Model<ItemPriceHist> {
   
    @Column({ type: DataType.DATE, primaryKey: true, allowNull:false})
    starting_date;

    @Column({type:DataType.STRING(200), allowNull:false})
    categoty_name;

    @Column({type:DataType.DATE})
    ending_date;

    @Column({type:DataType.INTEGER, allowNull:false})
    base_price;

    @Column({type:DataType.INTEGER, allowNull:false})
    price_km;

    @Column({type:DataType.INTEGER, allowNull:false})
    ensurance_tax;

    @Column({type:DataType.INTEGER, allowNull:false})
    fragily_tax;

    @Column({ type: DataType.INTEGER, primaryKey: true, allowNull:false})
    @ForeignKey(() => ItemType)
    @Column
    item_type_fk: number;

    @BelongsTo(() => ItemType)
    itemType: ItemType;

    @HasMany(() => Item)
    item: Item[];
   
   
}