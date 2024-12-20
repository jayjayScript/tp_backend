import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
    balance: {type: Number, required: true, default: 0},
    assetValue: {type: Number, required: true, default: 0},
    watchList: {type: [String], required: true, default: []}
  },
},{
  timestamps: true,
})

const UserModel = mongoose.model('user', UserSchema)
export default UserModel

export const getUsers = () => UserModel.find()
export const getUserByEmail = (email: string) => UserModel.findOne({ email })
export const getUserById = ( id: string ) => UserModel.findById(id)