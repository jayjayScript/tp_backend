import axios from "axios";
import Web3 from "web3";
import { TronWeb } from "tronweb";
import { Request, Response } from "express"
import TransactionModel, { getTransactionById } from "../models/transactionModel"
import getCryptoToUsdtRate from "../helpers/getCryptoToUsdtRate";
import { getUserById } from "../models/usersModel";

const INFURA_PROJECT_URL = `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`!
const BITCOIN_API_URL = "https://blockstream.info/api"!
const TRON_NODE_URL = "https://api.trongrid.io"

const RECIEVER_BTC_ADDRESS = '1NDHZtXsy1QPRt4sro23agUcFX1vqaWSGG'!
const RECIEVER_ETH_ADDRESS = '0xc92adc6fa9dc7d1aa8cbb10e2250f29f84669139'!.toString()
const RECIEVER_USDT_ADDRESS = 'TEZdBcxRZpMw4yJtA9RVTX8WyiCtXCzLzd'!


// Initialize blockchain libraries
const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_PROJECT_URL));
const tronWeb = new TronWeb({
    fullHost: TRON_NODE_URL,
    headers: { 'TRON-PRO-API-KEY': process.env.TRON_GRID },
});

// Endpoint for listening to Ethereum transactions
export const ethListen = async (req: Request, res: Response) => {
    const { id } = req.user
    try {
        const existingUser: any = await getUserById(id)
        if (!existingUser) {
            res.status(401).json({ success: false, message: 'User does not exists!' })
            return
        }

        const latestBlock = await web3.eth.getBlock("latest", true);
        const ethToUsdtRate = await getCryptoToUsdtRate("ethereum");
        const transactions = latestBlock.transactions.filter(
            (tx: any) => tx.to && tx.to.toLowerCase() === RECIEVER_ETH_ADDRESS.toLowerCase()
        ).map((tx: any) => {
            const ethValue = web3.utils.fromWei(tx.value, "ether");
            const usdtValue = parseFloat(ethValue) * ethToUsdtRate;
            return {
                hash: tx.hash,
                to: tx.to,
                ethValue,
                usdtValue: usdtValue.toFixed(2),
            };
        });

        if (transactions.length > 0) {
            const newTransaction = new TransactionModel({
                userId: id,
                amount: transactions[0].usdtValue,
                blockchain: 'USDT',
                type: 'credit',
                status: 'completed',
                description: ''
            })
            await existingUser.save().then(() => {
                newTransaction.save().then(() => {
                    res.status(200).json({ success: true, message: 'Deposit has been made successfully', newTransaction });
                    return
                }).catch((err: any) => {
                    res.status(500).send({ success: false, message: `failed to save user's Transaction data, but user's data was saved, Error: ${err}` })
                    return
                })
            }).catch((err: any) => {
                res.status(500).send({ success: false, message: `failed to save user's wallet data, Error: ${err}` })
                return
            })
            res.status(200).json({ success: true, transactions });
        } else {
            res.status(404).json({ success: false, message: "No transactions found for the Ethereum wallet." });
        }
    } catch (error) {
        console.error("Error fetching Ethereum transactions:", error);
        res.status(500).json({ success: false, message: "Failed to fetch Ethereum transactions." });
    }
}


// Endpoint for listening to Bitcoin transactions
export const btcListen = async (req: Request, res: Response) => {
    const { id } = req.user
    try {
        const existingUser: any = await getUserById(id)
        if (!existingUser) {
            res.status(401).json({ success: false, message: 'User does not exists!' })
            return
        }

        const btcToUsdtRate = await getCryptoToUsdtRate("bitcoin");
        const response = await axios.get(
            `${BITCOIN_API_URL}/address/${RECIEVER_BTC_ADDRESS}/txs`
        );
        const transactions = response.data.map((tx: any) => {
            const btcValue = tx.vout
                .filter((out: any) => out.addr === RECIEVER_BTC_ADDRESS)
                .reduce((sum: number, out: any) => sum + out.value, 0);

            const usdtValue = btcValue * btcToUsdtRate;

            return {
                txid: tx.txid,
                btcValue: btcValue.toFixed(8),
                usdtValue: usdtValue.toFixed(2),
            };
        });

        if (transactions.length > 0) {
            const newTransaction = new TransactionModel({
                userId: id,
                amount: transactions[0].usdtValue,
                blockchain: 'USDT',
                type: 'credit',
                status: 'completed',
                description: ''
            })
            await existingUser.save().then(() => {
                newTransaction.save().then(() => {
                    res.status(200).json({ success: true, message: 'Deposit has been made successfully', newTransaction });
                    return
                }).catch((err: any) => {
                    res.status(500).send({ success: false, message: `failed to save user's Transaction data, but user's data was saved, Error: ${err}` })
                    return
                })
            }).catch((err: any) => {
                res.status(500).send({ success: false, message: `failed to save user's wallet data, Error: ${err}` })
                return
            })
        } else {
            res.status(404).json({ success: false, message: "No transactions found for the Bitcoin wallet." });
        }
    } catch (error) {
        console.error("Error fetching Bitcoin transactions:", error);
        res.status(500).json({ success: false, message: "Failed to fetch Bitcoin transactions." });
    }
}


// Endpoint for listening to TRC20 transactions
export const usdtListen = async (req: Request, res: Response) => {
    const { id } = req.user
    try {
        const existingUser: any = await getUserById(id)
        if (!existingUser) {
            res.status(401).json({ success: false, message: 'User does not exists!' })
            return
        }

        const transactions: any = await tronWeb.trx.getTransactionsRelated(
            RECIEVER_USDT_ADDRESS,
            "to"
        );

        if (transactions.length > 0) {
            existingUser.wallet.balance += transactions[0].amount;


            const newTransaction = new TransactionModel({
                userId: id,
                amount: transactions[0].amount,
                blockchain: 'USDT',
                type: 'credit',
                status: 'completed',
                description: ''
            })
            await existingUser.save().then(() => {
                newTransaction.save().then(() => {
                    res.status(200).json({ success: true, message: 'Deposit has been made successfully', newTransaction });
                    return
                }).catch((err: any) => {
                    res.status(500).send({ success: false, message: `failed to save user's Transaction data, but user's data was saved, Error: ${err}` })
                    return
                })
            }).catch((err: any) => {
                res.status(500).send({ success: false, message: `failed to save user's wallet data, Error: ${err}` })
                return
            })
        } else {
            res.json({ success: false, message: "No transactions found for the TRC20 wallet." });
        }
    } catch (error) {
        console.error("Error fetching TRC20 transactions:", error);
        res.status(500).json({ success: false, message: "Failed to fetch TRC20 transactions." });
    }
}

export const getTransactionHistory = async (req: Request, res: Response) => {
    const { params, query } = req
    console.log(params, query)
    res.status(200).send({ success: true, message: 'transactions gotten' })
}