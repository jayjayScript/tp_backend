import { signup, signin, signout, sendVerificationCode, verifyCode } from '../controllers/authController'
import express from 'express'

const authRouter = express.Router()

authRouter.post('/signup', signup)
authRouter.post('/signin', signin)
authRouter.post('/signout', signout)
authRouter.get('/verification-code', sendVerificationCode)
authRouter.get('/verify-code', verifyCode)

export default authRouter 