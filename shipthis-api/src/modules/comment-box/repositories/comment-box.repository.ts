import { Repository, EntityRepository, Timestamp } from 'typeorm';
import { CommentBox } from '../entities/comment-box.entity';

@EntityRepository(CommentBox)
export class CommentBoxRepository extends Repository<CommentBox> {
  async saveComment(comment: string, lang: string): Promise<any> {
    await this.save(this.createComment(comment, lang));
  }

  private createComment(comment: string, lang: string): CommentBox {
    const cm: CommentBox = new CommentBox();
    cm.comment_message = comment;
    cm.language = lang;
    cm.reviewed = false;
    cm.time_mark = new Date();
    return cm;
  }

  async updateReviewed(comment: CommentBox, rewiew: boolean): Promise<any> {
    comment.reviewed = rewiew;
    this.save(comment);

    return { response: 'Reviewed changed successfully' }
  }
}
