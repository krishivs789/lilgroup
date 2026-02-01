import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import { verifyToken } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end('Method not allowed')
  }

  // Auth check
  const cookie = req.headers.cookie || ''
  const tokenMatch = cookie.split(';').map(c => c.trim()).find(c => c.startsWith('token='))
  if (!tokenMatch) {
    return res.status(401).json({ error: 'Not authenticated' })
  }
  const token = tokenMatch.split('=')[1]
  const data = verifyToken(token)
  if (!data) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }

  const pagesPath = path.join(process.cwd(), 'data', 'pages.json')
  const uploadsPath = path.join(process.cwd(), 'data', 'uploads.json')

  try {
    const pagesFile = await fs.promises.readFile(pagesPath, 'utf-8')
    const pagesArray = JSON.parse(pagesFile)

    const uploadsFile = await fs.promises.readFile(uploadsPath, 'utf-8')
    const uploads = JSON.parse(uploadsFile)

    // Convert pages array to an object keyed by slug and inject gallery images
    const pagesObject: { [key: string]: any } = {}
    pagesArray.forEach((page: any) => {
      pagesObject[page.slug] = { ...page }
      if (page.slug === 'gallery') {
        pagesObject[page.slug].images = uploads.map((upload: any) => upload.url)
      }
    })

    return res.status(200).json(pagesObject)
  } catch (error) {
    console.error('Failed to read pages or uploads data:', error)
    return res.status(500).json({ error: 'Failed to retrieve page data' })
  }
}
