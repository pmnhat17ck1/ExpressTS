import { Response } from 'express';

import { CreateCardDTO } from '@/dtos/card.dto';
import { AccountI } from '@/interfaces/account.interface';
import { response } from '@/utils/index';
import db from '@/models';
const { Card, Wallet } = db;
//products/:id/ratings
class CardController {
  public getAllCardByAccount = async (
    req: any,
    res: Response
  ): Promise<void> => {
    try {
      const accounts: AccountI = await Card.findAll({
        where: { account_id: req.account.id },
      });
      response.response(res, 200, { message: 'successfully', accounts });
    } catch (error) {
      response.response(res, 500);
    }
  };
  public createCardByAccount = async (
    req: any,
    res: Response
  ): Promise<void> => {
    try {
      const {
        cardNumber,
        expirationDate,
        cvv,
        payment_method_id,
      }: CreateCardDTO = req.body;

      const walletOfAccount = await Wallet.findOne({
        where: {
          account_id: req.account.id,
        },
      });

      const card = await Card.create({
        cardNumber,
        expirationDate,
        cvv,
        payment_method_id,
        wallet_id: walletOfAccount.id,
      });

      response.response(res, 200, { message: 'successfully', card });
    } catch (error) {
      response.response(res, 500);
    }
  };
  public updateCardByAccount = async (
    req: any,
    res: Response
  ): Promise<void> => {
    try {
      const {
        cardNumber,
        expirationDate,
        cvv,
        payment_method_id,
        card_id,
      }: CreateCardDTO = req.body;

      const card = await Card.update(
        {
          cardNumber,
          expirationDate,
          cvv,
          payment_method_id,
        },
        {
          where: {
            id: card_id,
          },
        }
      );
      response.response(res, 200, { message: 'successfully', card });
    } catch (error) {
      response.response(res, 500);
    }
  };
  public deleteCardByAccount = async (
    req: any,
    res: Response
  ): Promise<void> => {
    const { card_id }: CreateCardDTO = req.body;
    try {
      const cardFound = await Card.findByPk(card_id);
      if (!cardFound) {
        return response.response(res, 404, 'Card not found');
      }
      await cardFound.destroy();
      response.response(res, 200, { message: 'successfully' });
    } catch (error) {
      response.response(res, 500);
    }
  };
}
export { CardController };
