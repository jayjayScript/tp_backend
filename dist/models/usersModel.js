"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUserByEmail = exports.getUsers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    firstName: { type: String, require: [true, 'first name is required!'] },
    lastName: { type: String, require: [true, 'last name is required!'] },
    email: { type: String, require: [true, 'email field is required!'], lowercase: true, unique: true },
    password: { type: String, require: [true, 'password is required!'], select: false, trim: true },
    verified: { type: Boolean, default: false },
    verificationCode: { type: String, select: false },
    verificationCodeValidation: { type: String, select: false },
    forgotPasswordCode: { type: String, select: false },
    forgotPasswordCodeValidation: { type: String, select: false },
    wallet: {
        balance: { type: Number, required: true, default: 0 },
        assetValue: { type: Number, required: true, default: 0 },
        watchList: { type: [String], required: true, default: [] }
    },
}, {
    timestamps: true,
});
const UserModel = mongoose_1.default.model('user', UserSchema);
exports.default = UserModel;
const getUsers = () => UserModel.find();
exports.getUsers = getUsers;
const getUserByEmail = (email) => UserModel.findOne({ email });
exports.getUserByEmail = getUserByEmail;
const getUserById = (id) => UserModel.findById(id);
exports.getUserById = getUserById;
