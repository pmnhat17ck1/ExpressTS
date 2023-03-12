import { Response } from 'express';

import { ProfileI } from '@/interfaces/profile.interface';
import { CreateProfileDTO } from '@/dtos/profile.dto';
import { response } from '@/utils/response.util';
import db from '@/models';
const { Profile } = db;
//products/:id/ratings
class ProfileController {
  public getAllProfile = async (req: any, res: Response): Promise<void> => {
    try {
      const profiles: ProfileI = await Profile.findAll({
        where: {},
      });
      response(res, 200, profiles, 'successfully');
    } catch (error) {
      response(res, 500);
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
      response(res, 200, profiles, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };

  public updateProfileByAccount = async (
    req: any,
    res: Response
  ): Promise<void> => {
    try {
      const { fullName, dateOfBirth, avatar }: CreateProfileDTO = req.body;

      const profile = await Profile.update(
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
      response(res, 200, profile, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };
}
export { ProfileController };
