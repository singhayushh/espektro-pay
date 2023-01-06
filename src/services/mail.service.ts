import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: String(process.env.SENDER_MAIL),
        pass: String(process.env.SENDER_PASSWORD),
    }
});

export const sendMail = async (mailBody: string, mailSubject: string, receiverMail: string) => {
    try {
        let mailOptions = {
            from: process.env.SENDER_MAIL,
            to: receiverMail,
            subject: mailSubject,
            html: mailBody
        };
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        return true;
    } catch (error: any) {
        console.log("Error sending email:", error)
        return false;
    }
};