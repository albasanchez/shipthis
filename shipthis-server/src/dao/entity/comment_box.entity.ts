import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript';
import { OrderSheet } from './order_sheet.entity';
import { Place } from './place.entity';

@Table({tableName:'CommentBox',  timestamps: false})
export class CommentBox extends Model<CommentBox> {
   
    @Column({ type: DataType.INTEGER, primaryKey: true, allowNull:false})
    comment_id;

    @Column({ type: "TIMESTAMP" })
    time_mark;

    @Column({ type: DataType.STRING(500), allowNull:false})
    comment_message;
   
}