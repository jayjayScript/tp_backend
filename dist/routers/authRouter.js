"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("../controllers/authController");
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
authRouter.post('/signup', authController_1.signup);
authRouter.post('/signin', authController_1.signin);
authRouter.post('/signout', authController_1.signout);
authRouter.get('/verification-code', authController_1.sendVerificationCode);
authRouter.get('/verify-code', authController_1.verifyCode);
exports.default = authRouter;
