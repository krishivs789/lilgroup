import type { NextApiRequest, NextApiResponse } from 'next'
import { signAdmin } from '../../../lib/auth'
import { serialize } from 'cookie'

export default function handler(req: NextApiRequest, res: NextApiResponse){
  if (req.method !== 'POST') return res.status(405).end()
  const { password } = req.body
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme'
  if (password !== ADMIN_PASSWORD) return res.status(401).json({ error: 'invalid' })
  const token = signAdmin()
  res.setHeader('Set-Cookie', serialize('token', token, { httpOnly: true, path: '/', maxAge: 60*60*4 }))
  res.status(200).json({ ok: true })
}
