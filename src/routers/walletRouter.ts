import { addToWatchlist, getWallet } from '../controllers/walletControlller'
import { identifer } from '../middlewares/identification'
import { Router } from 'express'

const walletRouter = Router()

walletRouter.get('/getWallet', identifer, getWallet)
walletRouter.post('/addToWatchlist', identifer, addToWatchlist)

export default walletRouter