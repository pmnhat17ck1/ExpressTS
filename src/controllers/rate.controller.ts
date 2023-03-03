import { Request, Response } from "express";

import db from "@/models";
import { response } from "@/utils/index";
const { Rate, Product } = db;
//products/:id/ratings
const rateForProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { value, comment } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return response.response(res, 404, "Product not found");
    }
    const rate = await Rate.create({ value, comment, product_id: product.id });
    response.response(res, 200, { message: "successfully", data: rate });
  } catch (error) {}
  response.response(res, 500);
};

export { rateForProduct };
