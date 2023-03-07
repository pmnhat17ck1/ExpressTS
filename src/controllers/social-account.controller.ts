// // src/controllers/TodoController.ts

// import { Request, Response } from 'express';
// import SocialAccount from '@models/social-account.model';

// const socialLogin = async (req: Request, res: Response) => {
//     try {
//         const { provider, socialId, email, phoneNumber } = req.body;
//         // Xác thực user bằng SocialAccount và trả về dữ liệu tài khoản
//         const socialAccount = await SocialAccount.findOne({ where: { provider, socialId } });
//         if (!socialAccount) {
//           return res.status(400).json({ message: 'Social account not found' });
//         }
//         const account = await Account.findOne({ where: { [Op.or]: [{ email }, { phoneNumber }] } });
//         if (!account) {
//           // Nếu chưa có tài khoản bình thường, tạo mới và liên kết với SocialAccount
//           const newAccount = await Account.create({
//             email,
//             phoneNumber,
//             password: '',
//             isActive: true,
//             role: 'user'
//           });
//           await socialAccount.setAccount(newAccount);
//           const accessToken = generateAccessToken(newAccount);
//           const refreshToken = generateRefreshToken(newAccount);
//           return res.json({ accessToken, refreshToken, account: newAccount });
//         } else {
//           // Nếu có tài khoản bình thường, liên kết với SocialAccount
//           await socialAccount.setAccount(account);
//           const accessToken = generateAccessToken(account);
//           const refreshToken = generateRefreshToken(account);
//           return res.json({ accessToken, refreshToken, account });
//         }
//       } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal server error' });
//       }
// };

// const linkSocial = async (req: Request, res: Response) => {
//     try {
//         const user = req.user;
//         const { provider, socialId } = req.body;

//         if (!provider || !socialId) {
//           return res.status(400).send({ message: 'Provider and socialId are required' });
//         }

//         const socialAccount = await SocialAccount.findOne({ where: { provider, socialId } });
//         if (!socialAccount) {
//           return res.status(404).send({ message: 'Social account not found' });
//         }

//         const existingUser = await User.findOne({ where: { id: socialAccount.account_id } });
//         if (!existingUser) {
//           return res.status(404).send({ message: 'User not found' });
//         }

//         if (existingUser.id !== user.id) {
//           return res.status(403).send({ message: 'You can only link social account to your own account' });
//         }

//         const linkedSocialAccount = await SocialAccount.findOne({ where: { provider, account_id: user.id } });
//         if (linkedSocialAccount) {
//           return res.status(409).send({ message: 'Social account already linked' });
//         }

//         await socialAccount.update({ account_id: user.id });

//         return res.status(200).send({ message: 'Social account linked successfully' });
//       } catch (error) {
//         console.error(error);
//         return res.status(500).send({ message: 'Internal server error' });
//       }
// };

// const socialAccounts = async (req: Request, res: Response) => {
//     try {
//         try {
//             const socialAccounts = await SocialAccount.findAll();
//             res.json(socialAccounts);
//           } catch (err) {
//             console.error(err);
//             res.status(500).send('Internal server error');
//           }
// };

// export default {
//     socialLogin,
//     linkSocial,
//     socialAccounts,
// };
