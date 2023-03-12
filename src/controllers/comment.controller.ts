import { Request, Response } from 'express';

import db from '@/models';
import { response } from '@/utils/response.util';
const { Comment, Product } = db;
//products/:id/comments
class CommentController {
  public commentForProduct = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { text } = req.body;
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return response(res, 404);
      }
      const comment = await Comment.create({ text, product_id: product.id });
      response(res, 200, comment, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };
}

export { CommentController };
