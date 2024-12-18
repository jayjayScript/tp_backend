"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionHistory = void 0;
const ethers_1 = require("ethers");
const provider = new ethers_1.ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`);
const getTransactionHistory = async (req, res) => {
    const { params, query } = req;
    console.log(params, query);
    res.status(200).send({ success: true, message: 'transactions gotten' });
};
exports.getTransactionHistory = getTransactionHistory;
