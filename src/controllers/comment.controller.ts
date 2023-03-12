import { Request, Response } from 'express';

import { response } from '@/utils/response.util';
import { CommentI } from '@/interfaces/comment.interface';
import { ProductI } from '@/interfaces/product.interface';
import { CreateCommentDTO } from '@/dtos/comment.dto';

import db from '@/models';
const { Comment, Product } = db;
//products/:id/comments
class CommentController {
  public commentForProduct = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { content }: CreateCommentDTO = req.body;
      const product: ProductI = await Product.findByPk(req.params.id);
      if (!product) {
        return response(res, 404);
      }
      const comment: CommentI = await Comment.create({
        content,
        product_id: product.id,
      });
      response(res, 200, comment, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };
}

export { CommentController };
