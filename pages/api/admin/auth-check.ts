import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyToken } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end('Method not allowed')
  
  // Check authentication via token
  const cookie = req.headers.cookie || ''
  const tokenMatch = cookie.split(';').map(c=>c.trim()).find(c=>c.startsWith('token='))
  if (!tokenMatch) return res.status(401).json({ authenticated: false })
  
  const token = tokenMatch.split('=')[1]
  const data = verifyToken(token)
  
  return res.status(200).json({ 
    authenticated: !!data, 
    user: data ? 'admin' : null
  })
}