import { Request, Response } from 'express';

import { CountryI } from '@/interfaces/country.interface';
import {
  CreateCountryDTO,
  UpdateCountryDTO,
  DeleteCountryDTO,
} from '@/dtos/country.dto';
import { response } from '@/utils/response.util';
import db from '@/models';
const { Country } = db;
//products/:id/ratings
class CountryController {
  public getAllCountry = async (req: any, res: Response): Promise<void> => {
    try {
      const countries: CountryI = await Country.findAll({
        where: {},
      });
      response(res, 200, countries, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };

  public createAccountByAccount = async (
    req: any,
    res: Response
  ): Promise<void> => {
    try {
      const { name, code }: CreateCountryDTO = req.body;
      const country: CountryI = await Country.create({
        name,
        code,
      });
      response(res, 200, country, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };
  public updateCountryByAccount = async (
    req: any,
    res: Response
  ): Promise<void> => {
    try {
      const { name, code, country_id }: UpdateCountryDTO = req.body;

      const country = await Country.update(
        {
          name,
          code,
        },
        {
          where: {
            id: country_id,
          },
        }
      );
      response(res, 200, country, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };
  public deleteCountryByAccount = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { country_id }: DeleteCountryDTO = req.body;
      const country = await Country.findByPk(country_id);
      if (!country) {
        return response(res, 404);
      }
      await country.destroy();
      response(res, 200, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };
}
export { CountryController };
