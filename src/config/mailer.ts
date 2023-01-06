import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_MAIL,
        pass: process.env.SENDER_PASSWORD,
    }
});

export default transporter;