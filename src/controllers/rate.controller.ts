import { Request, Response } from "express";

import db from "@/models";
import { response } from "@/utils/index";
const { Rate, Product } = db;
//products/:id/ratings

export const getAllRateOfProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return response.response(res, 404, "Product not found");
    }
    const rates = await Rate.findAll({
      where: {
        product_id: product.id,
      },
    });
    response.response(res, 200, { message: "successfully", rates });
  } catch (error) {}
  response.response(res, 500);
};

export const rateForProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { value, comment } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return response.response(res, 404, "Product not found");
    }
    const rate = await Rate.fineOne({
      where: {
        product_id: product.id,
      },
    });
    if (!rate) {
      await Rate.create({ value, comment, product_id: product.id });
    } else {
      await Rate.update({ value, comment, where: { product_id: product.id } });
    }
    response.response(res, 200, { message: "successfully" });
  } catch (error) {}
  response.response(res, 500);
};

export const deleteRateForProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return response.response(res, 404, "Product not found");
    }
    const rate = await Rate.fineOne({
      where: {
        product_id: product.id,
      },
    });
    if (!rate) {
      return response.response(res, 404, "Rate not found");
    }
    await rate.destroy();
    response.response(res, 204);
  } catch (error) {
    response.response(res, 500);
  }
};
