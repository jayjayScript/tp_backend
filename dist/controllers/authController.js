"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCode = exports.sendVerificationCode = exports.signout = exports.signin = exports.signup = void 0;
const validator_1 = require("../middlewares/validator");
const usersModel_1 = __importStar(require("../models/usersModel"));
const hashing_1 = __importStar(require("../helpers/hashing"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailer_1 = require("../middlewares/mailer");
const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { error, value } = validator_1.signupSchema.validate(req.body);
        if (error) {
            res.status(401).json({ success: false, message: error.details[0].message });
            return;
        }
        const existingUser = await (0, usersModel_1.getUserByEmail)(email);
        if (existingUser) {
            res.status(401).json({ success: false, message: 'User already exists!' });
            return;
        }
        const hashedPassword = (0, hashing_1.default)(password, 12);
        const newUser = new usersModel_1.default({
            ...value,
            password: (await hashedPassword).toString()
        });
        console.log(newUser);
        newUser.save().then(() => {
            console.log(`user: ${email} is saved`);
            const token = jsonwebtoken_1.default.sign({
                userId: newUser.id,
                email: newUser.email,
                verified: newUser.verfied
            }, process.env.TOKEN_SECRET || '', {
                expiresIn: '3d'
            });
            const Days = (3 * (24 * 3600000)); // 3 Days
            res.cookie('Authorization', 'Bearer ' + token, { expires: new Date(Date.now() + Days), httpOnly: process.env.NODE_ENV === 'production', secure: process.env.NODE_ENV === 'production' }).send({
                success: true,
                token,
                message: 'Logged In successfully'
            });
            res.status(200).send({ success: true, message: 'Your Account has been created successfully', newUser });
        }).catch((e) => {
            console.log(e);
            res.status(401).send({ success: false, message: e.message });
        });
    }
    catch (e) {
        console.log(e);
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { error, value } = validator_1.signinSchema.validate(req.body);
        if (error) {
            res.status(401).json({ success: false, message: error.details[0].message });
            return;
        }
        const existingUser = await (0, usersModel_1.getUserByEmail)(email).select('+password');
        if (!existingUser) {
            res.status(401).json({ success: false, message: 'User does not exists!' });
            return;
        }
        const result = (0, hashing_1.validateHash)(password, existingUser.password);
        if (!result) {
            res.status(401).json({ success: false, message: 'Invalid Credentials!' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            userId: existingUser.id,
            email: existingUser.email,
            verified: existingUser.verfied
        }, process.env.TOKEN_SECRET || '', {
            expiresIn: '3d'
        });
        const Days = (3 * (24 * 3600000)); // 3 Days
        res.cookie('Authorization', 'Bearer ' + token, { expires: new Date(Date.now() + Days), httpOnly: process.env.NODE_ENV === 'production', secure: process.env.NODE_ENV === 'production' }).send({
            success: true,
            token,
            message: 'Logged In successfully'
        });
    }
    catch (e) {
        console.log(e);
    }
};
exports.signin = signin;
const signout = async (req, res) => {
    res.clearCookie('Authorization').status(200).send({ success: true, message: 'Logged Out Successfully' });
};
exports.signout = signout;
const sendVerificationCode = async (req, res) => {
    const token = req.cookies['Authorization'].split(' ')[1];
    const user = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || '');
    const { email } = user;
    try {
        const existingUser = await (0, usersModel_1.getUserByEmail)(email);
        if (!existingUser) {
            res.status(401).json({ success: false, message: 'User does not exists!' });
            return;
        }
        if (existingUser.verified) {
            res.status(400).json({ success: false, message: 'You are Already Verified!' });
            return;
        }
        const codeValue = Math.floor(Math.random() * 1000000).toString();
        const info = await (0, mailer_1.sendCode)(email, codeValue, existingUser.firstName);
        if (info === true) {
            const hashedCodeValue = (0, hashing_1.hmacProcess)(codeValue, process.env.HMAC_VERIFICATION_CODE_SECRET);
            existingUser.verificationCode = hashedCodeValue;
            await existingUser.save();
            res.status(200).send({ success: true, message: 'Code Sent!' });
            return;
        }
        res.status(400).send({ success: false, message: 'Code Sent Failed!' });
    }
    catch (e) {
        console.log(e);
    }
};
exports.sendVerificationCode = sendVerificationCode;
const verifyCode = async (req, res) => {
    const { providedCode } = req.body;
    const token = req.cookies['Authorization'].split(' ')[1];
    const user = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || '');
    const { email } = user;
    try {
        const existingUser = await (0, usersModel_1.getUserByEmail)(email);
        if (!existingUser) {
            res.status(401).json({ success: false, message: 'User does not exists!' });
            return;
        }
    }
    catch (e) { }
};
exports.verifyCode = verifyCode;
