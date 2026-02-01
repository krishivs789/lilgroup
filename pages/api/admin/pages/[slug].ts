import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import { verifyToken } from '../../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { slug } = req.query
  // auth check
  const cookie = req.headers.cookie || ''
  const tokenMatch = cookie.split(';').map((c:any)=>c.trim()).find((c:any)=>c.startsWith('token='))
  if (!tokenMatch) return res.status(401).json({ error: 'not-authenticated' })
  const token = tokenMatch.split('=')[1]
  const data = verifyToken(token)
  if (!data) return res.status(401).json({ error: 'invalid-token' })

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const file = path.join(process.cwd(), 'data', 'pages.json')
  try{
    const raw = await fs.promises.readFile(file, 'utf-8')
    const pages = JSON.parse(raw)
    const body = req.body
    // body expected: { title?: string, content?: string, images?: string[] }
    let idx = pages.findIndex((p:any)=>p.slug === slug)
    if (idx === -1){
      // create
      const newPage = { slug, title: body.title || '', content: body.content || '', images: body.images || [] }
      pages.push(newPage)
      await fs.promises.writeFile(file, JSON.stringify(pages, null, 2), 'utf-8')
      return res.status(200).json(newPage)
    }

    const page = pages[idx]
    page.title = body.title ?? page.title
    page.content = body.content ?? page.content
    page.images = body.images ?? page.images

    pages[idx] = page
    await fs.promises.writeFile(file, JSON.stringify(pages, null, 2), 'utf-8')
    return res.status(200).json(page)
  }catch(e){
    console.error('Save error:', e)
    return res.status(500).json({ error: 'write error', details: e instanceof Error ? e.message : 'Unknown error' })
  }
}
