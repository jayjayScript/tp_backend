import { Request, Response } from "express";
import { getUserByEmail, getUserById } from "../models/usersModel";
import { watchlistSchema } from "../middlewares/validator";


export const getWallet = async (req: Request, res: Response) => {
  const { email } = req.user
  try {
    const existingUser: any = await getUserByEmail(email);
    if (!existingUser) {
      res.status(401).json({ success: false, message: 'User does not exists!' })
      return
    }
    res.status(200).send({ success: true, wallet: existingUser.wallet })
  } catch (e: any) {
    console.log(e)
    res.status(500).send(e.message)
  }
}

export const addToWatchlist = async (req: Request, res: Response) => {
  const { watchlist } = req.body
  const { email } = req.user
  try {
    const { error, value } = watchlistSchema.validate({ watchlist })
    if (error) {
      res.status(404).json({ success: false, message: "From Validator: "+error.details[0].message })
      return
    }
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      res.status(401).json({ success: false, message: 'User does not exists!' })
      return
    }
    const itemsToAdd = Array.isArray(watchlist) ? watchlist : [watchlist];
    existingUser.wallet?.watchList.push(...itemsToAdd);

    await existingUser.save().then(() => {
      res.status(200).send({ success: true, watchlist: existingUser.wallet?.watchList})
      return
    }).catch((e:any) => {
      res.status(500).send({ success: false, message: `failed to save user's watchlist data, Error: ${e.message}` })
      return
    })
  } catch (e:any) {
    console.log(e)
    res.status(500).send(e.message)
    return
  }
}