"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const identification_1 = require("../middlewares/identification");
const authController_1 = require("../controllers/authController");
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
authRouter.post('/signup', authController_1.signup);
authRouter.post('/signin', authController_1.signin);
authRouter.post('/signout', identification_1.identifer, authController_1.signout);
authRouter.get('/verification-code', identification_1.identifer, authController_1.sendVerificationCode);
authRouter.post('/verify-code', identification_1.identifer, authController_1.verifyCode);
exports.default = authRouter;
