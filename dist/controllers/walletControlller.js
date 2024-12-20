"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToWatchlist = exports.getWallet = void 0;
const usersModel_1 = require("../models/usersModel");
const validator_1 = require("../middlewares/validator");
const getWallet = async (req, res) => {
    const { email } = req.user;
    try {
        const existingUser = await (0, usersModel_1.getUserByEmail)(email);
        if (!existingUser) {
            res.status(401).json({ success: false, message: 'User does not exists!' });
            return;
        }
        res.status(200).send({ success: true, wallet: existingUser.wallet });
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e.message);
    }
};
exports.getWallet = getWallet;
const addToWatchlist = async (req, res) => {
    const { watchlist } = req.body;
    const { email } = req.user;
    try {
        const { error, value } = validator_1.watchlistSchema.validate({ watchlist });
        if (error) {
            res.status(404).json({ success: false, message: "From Validator: " + error.details[0].message });
            return;
        }
        const existingUser = await (0, usersModel_1.getUserByEmail)(email);
        if (!existingUser) {
            res.status(401).json({ success: false, message: 'User does not exists!' });
            return;
        }
        const itemsToAdd = Array.isArray(watchlist) ? watchlist : [watchlist];
        existingUser.wallet?.watchList.push(...itemsToAdd);
        await existingUser.save().then(() => {
            res.status(200).send({ success: true, watchlist: existingUser.wallet?.watchList });
            return;
        }).catch((e) => {
            res.status(500).send({ success: false, message: `failed to save user's watchlist data, Error: ${e.message}` });
            return;
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e.message);
        return;
    }
};
exports.addToWatchlist = addToWatchlist;
