/* eslint-disable no-console */
import nodemailer from 'nodemailer';

// Khởi tạo transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Hàm gửi email
const sendMail = async (to: any, subject: any, body: any) => {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to,
    subject,
    html: body,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
  }
};

// Hàm gửi email với attachment
const sendMailWithAttachment = async (
  to: any,
  subject: any,
  body: any,
  attachment: { name: any; content: any }
) => {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to,
    subject,
    html: body,
    attachments: [{ filename: attachment.name, content: attachment.content }],
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
  }
};

// Hàm gửi email đơn giản chỉ có text
const sendTextMail = async (to: any, subject: any, text: any) => {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to,
    subject,
    text,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
  }
};

// Xuất các hàm để sử dụng trong ứng dụng của bạn
export { sendMail, sendMailWithAttachment, sendTextMail };
