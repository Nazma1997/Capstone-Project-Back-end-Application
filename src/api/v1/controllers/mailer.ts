import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { HTTP_STATUS } from '../../../constants/httpConstants';
import { EmailRequest } from '../models/mailer';



export const sendEmail = async (req: Request<{}, {}, EmailRequest>, res: Response) => {
    try {
      
        if (!req.body || !req.body.email || !req.body.subject || !req.body.text) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Missing required fields: email, subject, text' });
        }
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        
        const mailOptions = {
            from: process.env.EMAIL_USERNAME, 
            to: req.body.email,
            subject: req.body.subject,
            text: req.body.text
        };

       
        const info = await transporter.sendMail(mailOptions);
        return res.status(HTTP_STATUS.OK).json({ message: 'Email sent successfully', info });
        
    } catch (error) {
       
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Failed to send email' });
    }
};