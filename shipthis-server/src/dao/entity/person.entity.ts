import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript';
import { UserData } from './user_data.entity';
import { OrderSheet } from './order_sheet.entity';
@Table({tableName:'Person',  timestamps: false})
export class Person extends Model<Person> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    person_id;

    @Column({type:DataType.STRING(100), allowNull:false})
    first_name;

    @Column({type:DataType.STRING(20)})
    middle_name;

    @Column({type:DataType.STRING(20), allowNull:false})
    last_name;

    @Column({type:DataType.STRING(20)})
    second_last_name;

    @Column({type:DataType.INTEGER})
    phone_code;

    @Column({type:DataType.INTEGER})
    phone_number;

    @Column({type:DataType.DATE, allowNull:false})
    date_of_birth;

    @Column({type:DataType.DATE})
    current_conn_date;

    @Column({type:DataType.DATE})
    previous_conn_date;

    @Column({type:DataType.STRING(20)})
    def_language;

    @Column({type:DataType.STRING(300)})
    profile_picture;

    @Column({type:DataType.BOOLEAN})
    receive_notifications = false;

    @ForeignKey(() => UserData)
    @Column
    user_fk: number;

    @BelongsTo(() => UserData)
    userData: UserData;

    @HasMany(() => OrderSheet)
    orderSheet: OrderSheet[];
   
}