import {Router} from 'express';
import authRouter from './authRouter'
import transactionRouter from './transactionRouter'
import walletRouter from "./walletRouter";


const router = Router()

router.use('/api/auth', authRouter)
router.use('/api/user',transactionRouter)
router.use('/api/user', walletRouter)

export default router