import { Request, Response } from 'express';

import db from '@/models';
import { response } from '@/utils/response.util';
const { Like, Product } = db;
//products/:id/likes
class LikeController {
  public getAllLikeOfProduct = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return response(res, 404);
      }
      const likes = await Like.findAll({
        where: {
          product_id: product.id,
        },
      });
      response(res, 200, likes, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };

  public likeForProduct = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { like } = req.body;
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return response(res, 404);
      }
      const likeFound = await Like.fineOne({
        where: {
          product_id: product.id,
        },
      });
      if (!likeFound) {
        await likeFound.create({ type: like, product_id: product.id });
      } else {
        await likeFound.update({
          type: like,
          where: { product_id: product.id },
        });
      }
      response(res, 200, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };
}
export { LikeController };
