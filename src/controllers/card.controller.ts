import { Response } from 'express';

import { AccountI } from '@/interfaces/account.interface';
import { WalletI } from '@/interfaces/wallet.interface';
import { CardI } from '@/interfaces/card.interface';
import { CreateCardDTO, UpdateCardDTO, DeleteCardDTO } from '@/dtos/card.dto';

import { response } from '@/utils/response.util';
import db from '@/models';
const { Card, Wallet } = db;
//products/:id/ratings
class CardController {
  public getAllCardByAccount = async (
    req: any,
    res: Response
  ): Promise<void> => {
    try {
      const cards: AccountI = await Card.findAll({
        where: { account_id: req.account.id },
      });
      response(res, 200, cards, 'successfully');
    } catch (error) {
      response(res, 500);
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

      const walletOfAccount: WalletI = await Wallet.findOne({
        where: {
          account_id: req.account.id,
        },
      });

      const card: CardI = await Card.create({
        cardNumber,
        expirationDate,
        cvv,
        payment_method_id,
        wallet_id: walletOfAccount.id,
      });
      response(res, 200, card, 'successfully');
    } catch (error) {
      response(res, 500);
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
      }: UpdateCardDTO = req.body;

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
      response(res, 200, card, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };
  public deleteCardByAccount = async (
    req: any,
    res: Response
  ): Promise<void> => {
    const { card_id }: DeleteCardDTO = req.body;
    try {
      const cardFound = await Card.findByPk(card_id);
      if (!cardFound) {
        return response(res, 404);
      }
      await cardFound.destroy();
      response(res, 200, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };
}
export { CardController };
