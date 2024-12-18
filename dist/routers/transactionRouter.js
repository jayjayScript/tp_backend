"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const identification_1 = require("../middlewares/identification");
const transactionController_1 = require("../controllers/transactionController");
const transactionRouter = (0, express_1.Router)();
transactionRouter.get('/getTransactions', identification_1.identifer, transactionController_1.getTransactionHistory);
exports.default = transactionRouter;
