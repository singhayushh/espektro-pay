import { Request, Response } from "express";
import { paymentInitDto } from "../dtos/payment.dtos";
import { sendMail } from "../services/mail.service";
import { deletePaymentById, fetchPaymentById, fetchPayments, initiatePaymentContext, searchPayments, updateCashPayment, updateTransactionPayment } from "../services/payment.service";
import { generateOtp } from "../utils/helper";
import jwt from "jsonwebtoken";

export const RenderLandingPage = async (req: Request, res: Response) => {
    const { message } = req.query;
    res.render('index', { message });
}

export const RenderLogin = async (req: Request, res: Response) => {
    const { message } = req.query;
    res.render('login', { message });
}

export const RenderDashboard = async (req: Request, res: Response) => {
    try {
        const page: number = Number(req.query.page) || 0;
        const limit: number = Number(req.query.limit) || 10;
        const data = await fetchPayments(page, limit);
        res.render("dashboard", { page, data });
    } catch (error: any) {
        res.redirect("/?message=server error")
    }
}

export const LoginHandler = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (username == String(process.env.ADMIN_NAME) && password == String(process.env.ADMIN_PASS)) {
            const token = jwt.sign({ username }, String(process.env.JWT_SECRET));
            res.cookie("auth_token", token, {
                maxAge: 10 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: false,
            });
            res.redirect(`/dashboard`);
        } else {
            res.redirect("/login?message=Invalid credentials");    
        }
    } catch (error: any) {
        console.log(error)
        res.redirect("/?message=server error");
    }
};

export const LogoutHandler = async (req: Request, res: Response) => {
    await res.cookie("auth_token", null, {
        maxAge: 0,
        httpOnly: true,
        secure: false,
    });
    res.redirect("/login");
};

export const PaymentTypeHandler = async (req: Request, res: Response) => {
    try {
        let dto: paymentInitDto = { ...req.body };
        const otp: number = generateOtp();
        if (dto.paymentType == "Cash") {
            dto.transactionId = String(otp);
            const obj = await initiatePaymentContext(dto);
            let mailBody = `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                            <div style="margin:50px auto;width:70%;padding:20px 0">
                            <div style="border-bottom:1px solid #eee">
                                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Espektro 2023</a>
                            </div>
                            <p style="font-size:1.1em">Hi,</p>
                            <p>Hello admin. ${dto.name} - ${dto.email} has issued a cash based payment for Espektro. Use the following OTP to complete his registration procedures. OTP is valid for 5 minutes</p>
                            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
                            <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
                            <hr style="border:none;border-top:1px solid #eee" />
                            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                                <p>Your Brand Inc</p>
                                <p>1600 Amphitheatre Parkway</p>
                                <p>California</p>
                            </div>
                            </div>
                            </div>`;
            let mailSubject = 'OTP for espektro | Cash payment';
            const sent = await sendMail(mailBody, mailSubject, dto.email);
            if (sent) res.render("cash", { id: obj._id });
            else res.redirect("/?message=Email error");
        }
        else if (dto.paymentType == "Online") {
            const data = await initiatePaymentContext(dto);
            res.render("online", { id: data._id });
        }
        else {
            res.redirect("/?message=Invalid payment type");
        }
    } catch (error: any) {
        console.log(error)
        res.redirect("/?message=server error");
    }
};

export const OTPHandler = async (req: Request, res: Response) => {
    const { id, transactionId, date } = req.body;
    try {
        const pay = await fetchPaymentById(id);
        if (!pay || pay.transactionId != transactionId) {
            await deletePaymentById(id);
            res.redirect("/?message=Invalid otp");
        }
        const data = await updateCashPayment(id, transactionId, date);
        res.render("success", { id, mode: "cash", data })
    } catch (error: any) {
        await deletePaymentById(id);
        res.redirect("/?message=server error")
    }
};

export const TransactionHandler = async (req: Request, res: Response) => {
    const path = String(req.file?.path);
    const { id, transactionId, date } = req.body;
    try {
        const data = await updateTransactionPayment(id, transactionId, path, date)
        res.render("success", { id, mode: "online", data })
    } catch (error: any) {
        await deletePaymentById(id);
        res.redirect("/?message=server error")
    }
};

export const SearchHandler = async (req: Request, res: Response) => {
    const query = req.body.query;
    try {
        const data = await searchPayments(query);
        res.render("dashboard", { page: 1, data })
    } catch (error: any) {
        res.redirect("/?message=server error")
    }
};