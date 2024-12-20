import {Router} from 'express';
import authRouter from './authRouter'
import transactionRouter from './transactionRouter'
import walletRouter from "./walletRouter";


const router = Router()

router.use('/auth', authRouter)
router.use('/user',transactionRouter)
router.use('/user', walletRouter)

export default router