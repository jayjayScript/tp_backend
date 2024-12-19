import { getBalance } from '../controllers/walletControlller'
import { identifer } from '../middlewares/identification'
import { Router } from 'express'

const walletRouter = Router()

walletRouter.get('/getBalance', identifer, getBalance)

export default walletRouter