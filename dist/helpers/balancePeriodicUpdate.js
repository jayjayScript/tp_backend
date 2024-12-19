"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const getCryptoToUsdtRate_1 = __importDefault(require("./getCryptoToUsdtRate"));
node_cron_1.default.schedule("*/5 * * * *", async () => {
    console.log("Updating wallet balances with latest USDT rates...");
    try {
        const ethToUsdtRate = await (0, getCryptoToUsdtRate_1.default)("ethereum");
        const btcToUsdtRate = await (0, getCryptoToUsdtRate_1.default)("bitcoin");
        // Update Ethereum wallets
        const ethWallets = await Wallet.find({ blockchain: "Ethereum" });
        for (const wallet of ethWallets) {
            wallet.balanceInUsdt = wallet.balance * ethToUsdtRate;
            await wallet.save();
        }
        // Update Bitcoin wallets
        const btcWallets = await Wallet.find({ blockchain: "Bitcoin" });
        for (const wallet of btcWallets) {
            wallet.balanceInUsdt = wallet.balance * btcToUsdtRate;
            await wallet.save();
        }
        console.log("Wallet balances updated!");
    }
    catch (error) {
        console.error("Error updating wallet balances:", error);
    }
});
