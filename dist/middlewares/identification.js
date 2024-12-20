"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.identifer = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const identifer = (req, res, next) => {
    let token;
    if (req.headers.client === 'not-browser') {
        token = req.headers.authorization;
    }
    else {
        token = req.cookies['Authorization'];
    }
    if (!token) {
        res.status(403).send({ success: false, message: 'unauthorized' });
        return;
    }
    try {
        const authorization = token.split(' ')[1];
        const jwtVerified = jsonwebtoken_1.default.verify(authorization, process.env.TOKEN_SECRET || '');
        if (jwtVerified) {
            req.user = jwtVerified;
            next();
        }
        else {
            throw new Error('error in the token');
        }
    }
    catch (error) {
        res.status(403).send({ success: false, message: error.message });
        return;
    }
};
exports.identifer = identifer;
