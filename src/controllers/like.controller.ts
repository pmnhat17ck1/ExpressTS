import { Request, Response } from "express";

import db from "@/models";
import { response } from "@/utils/index";
const { Like, Product } = db;
//products/:id/likes
const likeForProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { like } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return response.response(res, 404, "Product not found");
    }
    const liked = await Like.create({ type: like, product_id: product.id });
    response.response(res, 200, { message: "successfully", data: liked });
  } catch (error) {}
  response.response(res, 500);
};

export { likeForProduct };
