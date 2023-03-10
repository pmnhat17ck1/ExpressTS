import { Request, Response } from 'express';

import db from '@/models';
import { response } from '@/utils/index';
const { Like, Product } = db;
//products/:id/likes

export const getAllLikeOfProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return response.response(res, 404, 'Product not found');
    }
    const likes = await Like.findAll({
      where: {
        product_id: product.id,
      },
    });
    response.response(res, 200, { message: 'successfully', likes });
  } catch (error) {
    response.response(res, 500);
  }
};

export const likeForProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { like } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return response.response(res, 404, 'Product not found');
    }
    const likeFound = await Like.fineOne({
      where: {
        product_id: product.id,
      },
    });
    if (!likeFound) {
      await likeFound.create({ type: like, product_id: product.id });
    } else {
      await likeFound.update({ type: like, where: { product_id: product.id } });
    }
    response.response(res, 200, { message: 'successfully' });
  } catch (error) {
    response.response(res, 500);
  }
};
