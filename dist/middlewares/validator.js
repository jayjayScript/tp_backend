"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchlistSchema = exports.changePasswordSchema = exports.acceptCodeSchema = exports.signinSchema = exports.signupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signupSchema = joi_1.default.object({
    firstName: joi_1.default.string().min(2).max(20).required(),
    lastName: joi_1.default.string().min(2).max(20).required(),
    email: joi_1.default.string().min(6).max(60).required().email({
        tlds: { allow: ['com', 'net'] }
    }),
    password: joi_1.default.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'))
});
exports.signinSchema = joi_1.default.object({
    email: joi_1.default.string().min(6).max(60).required().email({
        tlds: { allow: ['com', 'net'] }
    }),
    password: joi_1.default.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'))
});
exports.acceptCodeSchema = joi_1.default.object({
    providedCode: joi_1.default.number().required()
});
exports.changePasswordSchema = joi_1.default.object({
    newPassword: joi_1.default.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')),
    oldPassword: joi_1.default.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'))
});
exports.watchlistSchema = joi_1.default.object({
    watchlist: joi_1.default.alternatives().try(joi_1.default.array().items(joi_1.default.string()).required(), joi_1.default.string().required())
});
