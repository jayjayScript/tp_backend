import { Router } from 'express'
import { identifer } from '../middlewares/identification'
import { getTransactionHistory } from '../controllers/transactionController'

const transactionRouter = Router()

transactionRouter.get('/getTransactions',identifer,getTransactionHistory)

export default transactionRouter