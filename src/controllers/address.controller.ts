import { Request, Response } from 'express';

import db from '@/models';
import { response } from '@/utils/index';
const { Address } = db;
//products/:id/ratings
class AddressController {
  public getAllAddressOfAccount = async (
    req: any,
    res: Response
  ): Promise<void> => {
    try {
      const address = await Address.findAll({
        where: { account_id: req.account.id },
      });
      if (!address) {
        return response.response(res, 404, 'Address not found');
      }
      response.response(res, 200, { message: 'successfully', address });
    } catch (error) {
      response.response(res, 500);
    }
  };
  public createAddressOfAccount = async (
    req: any,
    res: Response
  ): Promise<void> => {
    try {
      const { street, city, state, zipCode, isDefault } = req.body;

      const address = await Address.create({
        street,
        city,
        state,
        zipCode,
        isDefault,
        account_id: req.account.id,
      });
      response.response(res, 200, { message: 'successfully', address });
    } catch (error) {
      response.response(res, 500);
    }
  };
  public updateAddressOfAccount = async (
    req: any,
    res: Response
  ): Promise<void> => {
    try {
      const { street, city, state, zipCode, isDefault, address_id } = req.body;

      const address = await Address.update(
        {
          street,
          city,
          state,
          zipCode,
          isDefault,
        },
        {
          where: {
            id: address_id,
          },
        }
      );
      response.response(res, 200, { message: 'successfully', address });
    } catch (error) {
      response.response(res, 500);
    }
  };
  public deleteAddressOfAccount = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { address_id } = req.body;
      const addressFound = await Address.findByPk(address_id);
      if (!addressFound) {
        return response.response(res, 404, 'Address not found');
      }
      await addressFound.destroy();
      response.response(res, 200, { message: 'successfully' });
    } catch (error) {
      response.response(res, 500);
    }
  };
}
export { AddressController };
