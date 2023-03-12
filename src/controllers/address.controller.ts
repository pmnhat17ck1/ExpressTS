import { Request, Response } from 'express';

import { response } from '@/utils/response.util';
import { AddressI } from '@/interfaces/address.interface';
import {
  CreateAddressDTO,
  UpdateAddressDTO,
  DeleteAddressDTO,
} from '@/dtos/address.dto';

import db from '@/models';
const { Address } = db;
//products/:id/ratings
class AddressController {
  public getAllAddressByAccount = async (
    req: any,
    res: Response
  ): Promise<void> => {
    try {
      const address: AddressI = await Address.findAll({
        where: { account_id: req.account.id },
      });
      if (!address) {
        return response(res, 404);
      }
      response(res, 200, address, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };
  public createAddressByAccount = async (
    req: any,
    res: Response
  ): Promise<void> => {
    try {
      const { street, city, state, zipCode, isDefault }: CreateAddressDTO =
        req.body;

      const address = await Address.create({
        street,
        city,
        state,
        zipCode,
        isDefault,
        account_id: req.account.id,
      });
      response(res, 200, address, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };
  public updateAddressByAccount = async (
    req: any,
    res: Response
  ): Promise<void> => {
    try {
      const {
        street,
        city,
        state,
        zipCode,
        isDefault,
        address_id,
      }: UpdateAddressDTO = req.body;

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
      response(res, 200, address, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };
  public deleteAddressByAccount = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { address_id }: DeleteAddressDTO = req.body;
      const addressFound = await Address.findByPk(address_id);
      if (!addressFound) {
        return response(res, 404);
      }
      await addressFound.destroy();
      response(res, 200, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };
}
export { AddressController };
