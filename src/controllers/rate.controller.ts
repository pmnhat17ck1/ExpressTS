import { Request, Response } from 'express';

import db from '@/models';
import { response } from '@/utils/response.util';
const { Rate, Product } = db;
//products/:id/ratings
class RateController {
  public getAllRateOfProduct = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return response(res, 404);
      }
      const rates = await Rate.findAll({
        where: {
          product_id: product.id,
        },
      });
      response(res, 200, rates, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };
  public rateForProduct = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { value, comment } = req.body;
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return response(res, 404);
      }
      const rate = await Rate.fineOne({
        where: {
          product_id: product.id,
        },
      });
      if (!rate) {
        await Rate.create({ value, comment, product_id: product.id });
      } else {
        await Rate.update(
          { value, comment },
          { where: { product_id: product.id } }
        );
      }
      response(res, 200, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };
  public deleteRateForProduct = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return response(res, 404);
      }
      const rate = await Rate.fineOne({
        where: {
          product_id: product.id,
        },
      });
      if (!rate) {
        return response(res, 404);
      }
      await rate.destroy();
      response(res, 204);
    } catch (error) {
      response(res, 500);
    }
  };
}
export { RateController };
