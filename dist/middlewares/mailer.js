"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCode = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mail_1 = __importDefault(require("../helpers/mail"));
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const transport = nodemailer_1.default.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    port: 587,
    tls: {
        rejectUnauthorized: false, // This is necessary in some environments (e.g., local testing)
    },
    auth: {
        user: process.env.NODE_MAIL_ADDRESS,
        pass: process.env.NODE_MAIL_PASSWORD,
    }
});
const sendCode = async (to, code, firstName) => {
    const htmlContent = server_1.default.renderToStaticMarkup(react_1.default.createElement(mail_1.default, { firstName, code }));
    const sendMail = await transport.sendMail({
        from: process.env.NODE_MAIL_ADDRESS,
        to: to,
        subject: 'TradePhere: Verification Code',
        html: htmlContent,
        // html: '<h1>Your Verification code: '+code+'</h1>'
    });
    return sendMail.accepted[0] === to;
};
exports.sendCode = sendCode;
