import nodemailer from 'nodemailer';

class EmailService {
  public transporter: any;
  private static instance: EmailService;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  public async sendEmail(recipient, subject, message) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: recipient,
        subject,
        html: message,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Email sent: ${info.messageId}`);
    } catch (error) {
      console.error(`Error sending email: ${error}`);
    }
  }
  // Hàm gửi email với attachment
  public sendMailWithAttachment = async (
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
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Email sent: ${info.messageId}`);
    } catch (error) {
      console.error(`Error sending email: ${error}`);
    }
  };

  // Hàm gửi email đơn giản chỉ có text
  public sendTextMail = async (to: any, subject: any, text: any) => {
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to,
      subject,
      text,
    };
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Email sent: ${info.messageId}`);
    } catch (error) {
      console.error(`Error sending email: ${error}`);
    }
  };
}

export { EmailService };
