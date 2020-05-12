import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript';
import { ItemType } from './item_type.entity';
import { Category } from './category.entity';
import { Place } from './place.entity';
import { Office } from './office.entity';
import { Person } from './person.entity';
import { UserData } from './user_data.entity';
import { OrderType } from './order_type.entity';
import { Item } from './item.entity';
import { Trajectory } from './trajectory.entity';
@Table({tableName:'OrderSheet',  timestamps: false})
export class OrderSheet extends Model<OrderSheet> {
   
    @Column({ type: DataType.INTEGER, primaryKey: true, allowNull:false})
    order_id;

    @Column({type:DataType.STRING(20), allowNull:false, unique: true})
    tracking_number;

    @Column({type:DataType.DATE, allowNull:false})
    creation_date

    @Column({type:DataType.STRING(20), allowNull:false})
    order_status;

    @Column({type:DataType.STRING(100), allowNull:false})
    rec_fullname;

    @Column({type:DataType.STRING(10)})
    rec_phone_code;

    @Column({type:DataType.STRING(10)})
    rec_phone_number;

    @Column({type:DataType.DATE})
    delivery_date;

    @Column({type:DataType.DATE})
    date_to_be_delivered;

    @Column({type:DataType.BOOLEAN})
    ignore_hollydays = false;

    @ForeignKey(() => Office)
    @Column
    destination_office_fk: number;

    @ForeignKey(() => Office)
    @Column
    destination_place_fk: number;
    
    @BelongsTo(() => Office)
    office: Office;  
    
    @Column({ type: DataType.INTEGER, primaryKey: true, allowNull:false})
    @ForeignKey(() => Person)
    @Column
    person_fk: number;
    
    @BelongsTo(() => Person)
    person: Person;  
    
    @Column({ type: DataType.INTEGER, primaryKey: true, allowNull:false})
    @ForeignKey(() => UserData)
    @Column
    user_fk: number;
    
    @BelongsTo(() => UserData)
    userData: UserData; 

    @ForeignKey(() => Office)
    @Column
    origin_office_fk: number;

    @ForeignKey(() => OrderType)
    @Column
    order_type_fk: number;
    
    @BelongsTo(() => OrderType)
    orderType: OrderType; 
    
    @ForeignKey(() => OrderType)
    @Column
    order_type_date_fk: Date;  
    
    @HasMany(() => Item)
    item: Item[];

    @HasMany(() => Trajectory)
    trayectory: Trajectory[];
   
}