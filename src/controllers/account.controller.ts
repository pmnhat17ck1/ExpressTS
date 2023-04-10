import { Request, Response } from 'express';

import { CreateAccountDTO, UpdateAccountDTO } from '@/dtos/account.dto';
import { AccountI } from '@/interfaces/account.interface';
import { response } from '@/utils/response.util';
import accountService from '@/services/apis/account.service';

//products/:id/ratings
class AccountController {
  public accountService = new accountService();
  // admin
  public getAllAccount = async (req: any, res: Response): Promise<void> => {
    try {
      const accounts: AccountI = await this.accountService.getAllAccount();
      response(res, 200, accounts, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };
  // guest
  public getAccountById = async (req: any, res: Response): Promise<void> => {
    try {
      const account_id = req.params.account_id;
      const account: AccountI = await this.accountService.getAccountById(
        account_id
      );
      response(res, 200, account, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };
  public createAccount = async (req: any, res: Response): Promise<void> => {
    try {
      const accountData: CreateAccountDTO = req.body;
      const account: AccountI = await this.accountService.createAccount(
        accountData
      );
      response(res, 200, account, 'create_success');
    } catch (error) {
      response(res, 500);
    }
  };
  public updateAccount = async (req: any, res: Response): Promise<void> => {
    try {
      const accountData: UpdateAccountDTO = req.body;
      const account_id = req.params.account_id;
      const account: AccountI = await this.accountService.updateAccount({
        ...accountData,
        account_id,
      });
      response(res, 200, account, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };
  public deleteAccount = async (req: Request, res: Response): Promise<void> => {
    try {
      const account_id = req.params.account_id;
      await this.accountService.deleteAccount(account_id);
      response(res, 200, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };
}
export { AccountController };
