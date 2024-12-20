import { identifer } from '../middlewares/identification'
import { signup, signin, signout, sendVerificationCode, verifyCode, changePassword, isVerified } from '../controllers/authController'
import { Router } from 'express'

const authRouter = Router()

authRouter.post('/signup', signup)
authRouter.post('/signin', signin)
authRouter.post('/signout',identifer, signout)
authRouter.get('/is-verified', identifer, isVerified)
authRouter.get('/verification-code', identifer, sendVerificationCode)
authRouter.post('/verify-code', identifer, verifyCode) 
authRouter.post('/changepassword', identifer, changePassword)

export default authRouter 