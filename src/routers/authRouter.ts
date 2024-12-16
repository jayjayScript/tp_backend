import { identifer } from '../middlewares/identification'
import { signup, signin, signout, sendVerificationCode, verifyCode } from '../controllers/authController'
import express from 'express'

const authRouter = express.Router()

authRouter.post('/signup', signup)
authRouter.post('/signin', signin)
authRouter.post('/signout',identifer, signout)
authRouter.get('/verification-code', identifer, sendVerificationCode)
authRouter.post('/verify-code', identifer, verifyCode) 

export default authRouter 