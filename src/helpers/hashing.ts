import {hash, compare} from 'bcrypt'
import { createHmac } from 'crypto'

const doHash = (value:string | Buffer, saltValue: string | number) => hash(value, saltValue)
export const validateHash = (value:string | Buffer, hash:string) => compare(value, hash)
export const hmacProcess = (value: any, key: any) => createHmac('sha256',key).update(value).digest('hex')
export default doHash