import { Request, Response } from "express";
import { getUserById } from "../models/usersModel";


export const getBalance = async (req:Request, res:Response) => {
  const { id, wallet } = req.user
  try{
    const existingUser: any = await getUserById(id);
    if (!existingUser) {
      res.status(401).json({ success: false, message: 'User does not exists!' })
      return
    }
  }catch (e:any) {
    console.log(e)
    res.status(500).send(e.message)
  }
}