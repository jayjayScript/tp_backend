"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalance = void 0;
const usersModel_1 = require("../models/usersModel");
const getBalance = async (req, res) => {
    const { id, wallet } = req.user;
    try {
        const existingUser = await (0, usersModel_1.getUserById)(id);
        if (!existingUser) {
            res.status(401).json({ success: false, message: 'User does not exists!' });
            return;
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e.message);
    }
};
exports.getBalance = getBalance;
