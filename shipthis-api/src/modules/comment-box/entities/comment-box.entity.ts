import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('comment_box')
export class CommentBox extends BaseEntity {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @Column({ type: 'date', nullable: false, name: 'time_mark' })
  time_mark: Date;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
    name: 'comment_message',
  })
  comment_message: string;

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
    name: 'reviewed',
  })
  reviewed: boolean;

  @Column({ type: 'varchar', nullable: false, name: 'language' })
  language: string;
}
