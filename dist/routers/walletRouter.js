"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const walletControlller_1 = require("../controllers/walletControlller");
const identification_1 = require("../middlewares/identification");
const express_1 = require("express");
const walletRouter = (0, express_1.Router)();
walletRouter.get('/getBalance', identification_1.identifer, walletControlller_1.getBalance);
exports.default = walletRouter;
