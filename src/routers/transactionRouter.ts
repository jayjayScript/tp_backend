import { Router } from 'express'
import { identifer } from '../middlewares/identification'
import { btcListen, ethListen, getTransactionHistory, usdtListen } from '../controllers/transactionController'

const transactionRouter = Router()

transactionRouter.post('/ethListen', identifer, ethListen)
transactionRouter.post('/btcListen', identifer, btcListen)
transactionRouter.post('/usdtListen', identifer, usdtListen)
transactionRouter.get('/getTransactions',identifer,getTransactionHistory)



export default transactionRouter