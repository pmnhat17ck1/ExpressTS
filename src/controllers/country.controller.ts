import { Request, Response } from 'express';

import { CountryI } from '@/interfaces/country.interface';
import { response } from '@/utils/index';
import db from '@/models';
const { Country } = db;
//products/:id/ratings
class CountryController {
  public getAllCountry = async (req: any, res: Response): Promise<void> => {
    try {
      const countries: CountryI = await Country.findAll({
        where: {},
      });
      response.response(res, 200, { message: 'successfully', countries });
    } catch (error) {
      response.response(res, 500);
    }
  };

  public createAccountByAccount = async (
    req: any,
    res: Response
  ): Promise<void> => {
    try {
      const { name, code } = req.body;
      const country: CountryI = await Country.create({
        name,
        code,
      });

      response.response(res, 200, { message: 'successfully', country });
    } catch (error) {
      response.response(res, 500);
    }
  };
  public updateCountryByAccount = async (
    req: any,
    res: Response
  ): Promise<void> => {
    try {
      const { name, code, country_id } = req.body;

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
      response.response(res, 200, { message: 'successfully', country });
    } catch (error) {
      response.response(res, 500);
    }
  };
  public deleteCountryByAccount = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { country_id } = req.body;
      const country = await Country.findByPk(country_id);
      if (!country) {
        return response.response(res, 404, 'Country not found');
      }
      await country.destroy();
      response.response(res, 200, { message: 'successfully' });
    } catch (error) {
      response.response(res, 500);
    }
  };
}
export { CountryController };
