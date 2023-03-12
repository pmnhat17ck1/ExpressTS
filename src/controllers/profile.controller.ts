import { Response } from 'express';

import { ProfileI } from '@/interfaces/profile.interface';
import { response } from '@/utils/index';
import db from '@/models';
const { Profile } = db;
//products/:id/ratings
class ProfileController {
  public getAllProfile = async (req: any, res: Response): Promise<void> => {
    try {
      const profiles: ProfileI = await Profile.findAll({
        where: {},
      });
      response.response(res, 200, { message: 'successfully', profiles });
    } catch (error) {
      response.response(res, 500);
    }
  };

  public getProfileByAccount = async (
    req: any,
    res: Response
  ): Promise<void> => {
    try {
      const profiles: ProfileI = await Profile.find({
        where: {
          account_id: req.account.id,
        },
      });
      response.response(res, 200, { message: 'successfully', profiles });
    } catch (error) {
      response.response(res, 500);
    }
  };

  public updateProfileByAccount = async (
    req: any,
    res: Response
  ): Promise<void> => {
    try {
      const { fullName, dateOfBirth, avatar } = req.body;

      const country = await Profile.update(
        {
          fullName,
          dateOfBirth,
          avatar,
        },
        {
          where: {
            account_id: req.account.id,
          },
        }
      );
      response.response(res, 200, { message: 'successfully', country });
    } catch (error) {
      response.response(res, 500);
    }
  };
}
export { ProfileController };
