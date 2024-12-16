import { Request, Response } from "express"
import { signinSchema, signupSchema } from "../middlewares/validator"
import UserModel, { getUserByEmail } from "../models/usersModel"
import doHash, { hmacProcess, validateHash } from "../helpers/hashing"
import jwt from 'jsonwebtoken';
import { sendCode } from "../middlewares/mailer"

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const { error, value } = signupSchema.validate(req.body);
    if (error) {
      res.status(401).json({ success: false, message: error.details[0].message })
      return
    }

    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      res.status(401).json({ success: false, message: 'User already exists!' })
      return
    }

    const hashedPassword = doHash(password, 12)

    const newUser:any = new UserModel({
      ...value,
      password: (await hashedPassword).toString()
    })
    console.log(newUser)
    newUser.save().then(() => {
      console.log(`user: ${email} is saved`)
      const token = jwt.sign({
        userId: newUser.id,
        email: newUser.email,
        verified: newUser.verfied
      },
        process.env.TOKEN_SECRET || '',
        {
          expiresIn: '3d'
        }
      );
      const Days =  (3 * (24 * 3600000));     // 3 Days
      res.cookie('Authorization', 'Bearer ' + token, { expires: new Date(Date.now() + Days), httpOnly: process.env.NODE_ENV === 'production', secure: process.env.NODE_ENV === 'production'}).send({
        success: true,
        token,
        message: 'Logged In successfully'
      })
      res.status(200).send({ success: true, message: 'Your Account has been created successfully', newUser })
    }).catch((e) => {
      console.log(e)
      res.status(401).send({ success: false, message: e.message })
    })
  } catch (e) {
    console.log(e)
  }
}

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const { error, value } = signinSchema.validate(req.body)
    if (error) {
      res.status(401).json({ success: false, message: error.details[0].message })
      return
    }
    const existingUser: any = await getUserByEmail(email).select('+password')
    if (!existingUser) {
      res.status(401).json({ success: false, message: 'User does not exists!' })
      return
    }
    const result = validateHash(password, existingUser.password)
    if (!result) {
      res.status(401).json({ success: false, message: 'Invalid Credentials!' })
      return
    }
    const token = jwt.sign({
      userId: existingUser.id,
      email: existingUser.email,
      verified: existingUser.verfied
    },
      process.env.TOKEN_SECRET || '',
      {
        expiresIn: '3d'
      }
    );
    const Days =  (3 * (24 * 3600000));     // 3 Days
    res.cookie('Authorization', 'Bearer ' + token, { expires: new Date(Date.now() + Days), httpOnly: process.env.NODE_ENV === 'production', secure: process.env.NODE_ENV === 'production'}).send({
      success: true,
      token,
      message: 'Logged In successfully'
    })
  } catch (e) {
    console.log(e)
  }
}

export const signout = async (req:Request, res:Response) => {
  res.clearCookie('Authorization').status(200).send({success: true, message: 'Logged Out Successfully'})
}


export const sendVerificationCode = async (req:Request, res:Response) => {
  const token = req.cookies['Authorization'].split(' ')[1]
  const user:any = jwt.verify(token, process.env.TOKEN_SECRET || '');
  const { email } = user
  try{
    const existingUser:any = await getUserByEmail(email);
    if (!existingUser) {
      res.status(401).json({ success: false, message: 'User does not exists!' })
      return
    }
    if(existingUser.verified){
      res.status(400).json({ success: false, message: 'You are Already Verified!' })
      return
    }
    const codeValue = Math.floor(Math.random() * 1000000).toString();
    const info = await sendCode(email, codeValue, existingUser.firstName)
    if(info === true){
      const hashedCodeValue = hmacProcess(codeValue, process.env.HMAC_VERIFICATION_CODE_SECRET);
      existingUser.verificationCode = hashedCodeValue
      await existingUser.save()
      res.status(200).send({success: true, message: 'Code Sent!'})
      return
    }
    res.status(400).send({success: false, message: 'Code Sent Failed!'})
  }catch (e) {
    console.log(e)
  }
}

export const verifyCode = async (req:Request, res:Response) => {
  const { providedCode } = req.body
  const token = req.cookies['Authorization'].split(' ')[1]
  const user:any = jwt.verify(token, process.env.TOKEN_SECRET || '');
  const { email } = user
  try{
    const existingUser:any = await getUserByEmail(email);
    if (!existingUser) {
      res.status(401).json({ success: false, message: 'User does not exists!' })
      return
    }
    
  }catch (e){}
}
