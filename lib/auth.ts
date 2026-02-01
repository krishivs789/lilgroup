import jwt from 'jsonwebtoken'

const SECRET = process.env.ADMIN_JWT_SECRET || 'dev_secret'

export function signAdmin(){
  return jwt.sign({ role: 'admin' }, SECRET, { expiresIn: '4h' })
}

export function verifyToken(token:string){
  try{
    const data = jwt.verify(token, SECRET)
    return data
  }catch(e){
    return null
  }
}
