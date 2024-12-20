import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken';

export const identifer = (req: Request, res: Response, next: NextFunction) => {
    let token;
    if(req.headers.client === 'not-browser'){
        token = req.headers.authorization
    }else{
        token = req.cookies['Authorization']
    }
    if(!token){
        res.status(403).send({ success: false, message: 'unauthorized' })
        return
    }
    try {
        const authorization = token.split(' ')[1]
        const jwtVerified: any = jwt.verify(authorization, process.env.TOKEN_SECRET || '');
        if(jwtVerified){
            req.user = jwtVerified
            next()
        }else{
            throw new Error('error in the token') 
        }
    } catch (error:any) {
        res.status(403).send({ success: false, message: error.message})
        return
    }
}