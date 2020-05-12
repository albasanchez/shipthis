import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript';
import { ItemType } from './item_type.entity';
import { OrderType } from './order_type.entity'
import { OrderSheet } from './order_sheet.entity';
import { ItemPriceHist } from './item_price_hist.entity';

@Table({tableName:'Item',  timestamps: false})
export class Item extends Model<Item> {
    
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    item_id;

    @Column({type:DataType.INTEGER})
    item_weight;

    @Column({type:DataType.BOOLEAN})
    is_insured = false;

    @Column({type:DataType.BOOLEAN})
    is_fragile = false;

    @Column({type:DataType.DATE})
    facturation_date;

    @Column({type:DataType.INTEGER})
    facturation_amount;

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

    @ForeignKey(() => ItemPriceHist)
    @Column
    item_type_fk: number;

    @ForeignKey(() => ItemPriceHist)
    @Column
    item_price_date_fk: number;

    @BelongsTo(() => OrderSheet)
    orderSheet: OrderSheet;

    @BelongsTo(() => ItemPriceHist)
    itemPriceHist: ItemPriceHist;

}