"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRouter_1 = __importDefault(require("./authRouter"));
const transactionRouter_1 = __importDefault(require("./transactionRouter"));
const walletRouter_1 = __importDefault(require("./walletRouter"));
const router = (0, express_1.Router)();
router.use('/api/auth', authRouter_1.default);
router.use('/api/user', transactionRouter_1.default);
router.use('/api/user', walletRouter_1.default);
exports.default = router;
