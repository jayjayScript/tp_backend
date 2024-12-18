import { ethers } from 'ethers'
import { Request, Response } from "express"
import TransactionModel, { getTransactionById } from "../models/transactionModel"

const provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`);

export const getTransactionHistory = async (req:Request, res:Response) => {
    const { params, query } = req
    console.log(params, query)
    res.status(200).send({success: true, message: 'transactions gotten'})
}