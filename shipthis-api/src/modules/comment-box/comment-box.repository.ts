import { Repository, EntityRepository } from 'typeorm';
import { CommentBox } from './comment-box.entity';

@EntityRepository(CommentBox)
export class CommentBoxRepository extends Repository<CommentBox> {}
