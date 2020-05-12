import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Rol } from './rol.entity';
import { Person } from './person.entity'
import { OrderSheet } from './order_sheet.entity';

@Table({tableName:'UserData'})
export class UserData extends Model<UserData> {

    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    user_id: number;

    @Column({type:DataType.STRING(100), allowNull:false,primaryKey: true})
    user_email;

    @Column({type:DataType.STRING(100)})
    user_password;
    
    @Column({type:DataType.STRING(10)})
    user_status;

    @ForeignKey(() => Rol)
    @Column
    rol_id_fk: number;

    @BelongsTo(() => Rol)
    rol: Rol;

    @HasMany(() => Person)
    person: Person[];

    @HasMany(() => OrderSheet)
    orderSheet: OrderSheet[];

    
   

}