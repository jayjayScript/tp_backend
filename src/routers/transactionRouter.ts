import { Router } from 'express'
import { identifer } from '../middlewares/identification'
import { btcListen, ethListen, getTransactionHistory, usdtListen, withdraw } from '../controllers/transactionController'

const transactionRouter = Router()

transactionRouter.post('/ethListen', identifer, ethListen)
transactionRouter.post('/btcListen', identifer, btcListen)
transactionRouter.post('/usdtListen', identifer, usdtListen)
transactionRouter.get('/getTransactions',identifer,getTransactionHistory)

transactionRouter.post('/withdraw', identifer, withdraw)

export default transactionRouter