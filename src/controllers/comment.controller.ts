import { Request, Response } from 'express';

import db from '@/models';
import { response } from '@/utils/index';
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
        return response.response(res, 404, 'Product not found');
      }
      const comment = await Comment.create({ text, product_id: product.id });
      response.response(res, 200, { message: 'successfully', comment });
    } catch (error) {
      response.response(res, 500);
    }
  };
}

export { CommentController };
