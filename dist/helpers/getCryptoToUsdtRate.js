"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
// Function to get the current price of a cryptocurrency in USDT
const getCryptoToUsdtRate = async (crypto) => {
    try {
        const response = await axios_1.default.get(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usdt`);
        // Extract and return the USDT value
        return response.data[crypto]?.usdt || 0;
    }
    catch (error) {
        console.error(`Failed to fetch ${crypto} to USDT rate:`, error);
        return 0;
    }
};
exports.default = getCryptoToUsdtRate;
