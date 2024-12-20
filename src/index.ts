import express from 'express';
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors';
import cookieParser from 'cookie-parser'
import http from 'http';
import mongoose from 'mongoose';
import router from './routers';

dotenv.config()
const app = express()
const PORT = process.env.PORT
const MONGO_URI: string = process.env.MONGO_URI || ''
const BASE_URL = process.env.BASE_URL || ''

app.use(cors({
  credentials: true,
  origin: '*'
}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api', router)



const server = http.createServer(app)
mongoose.Promise = Promise
mongoose.connect(MONGO_URI).then(() => {
  console.log('Database is connected')
  server.listen(PORT, () => {
    console.log(`server listening from http://localhost:${PORT}/`)
  })
}).catch(e => console.warn('connection error'))


