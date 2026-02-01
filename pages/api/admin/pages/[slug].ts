import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import { verifyToken } from '../../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method not allowed')
  }

  // Auth check
  const cookie = req.headers.cookie || ''
  const tokenMatch = cookie.split(';').map(c => c.trim()).find(c => c.startsWith('token='))
  if (!tokenMatch) {
    return res.status(401).json({ error: 'Not authenticated' })
  }
  const token = tokenMatch.split('=')[1]
  const authData = verifyToken(token)
  if (!authData) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }

  const { slug } = req.query
  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Page slug is required' })
  }

  const pagesPath = path.join(process.cwd(), 'data', 'pages.json')
  
  try {
    const fileContent = await fs.promises.readFile(pagesPath, 'utf-8')
    let pagesArray = JSON.parse(fileContent)

    const updatedPageData = req.body

    let pageFound = false
    pagesArray = pagesArray.map((page: any) => {
      if (page.slug === slug) {
        pageFound = true
        return { ...page, ...updatedPageData }
      }
      return page
    })

    if (!pageFound) {
      return res.status(404).json({ error: `Page with slug '${slug}' not found` })
    }

    await fs.promises.writeFile(pagesPath, JSON.stringify(pagesArray, null, 2))

    // If the updated page is the gallery, trigger an on-demand revalidation
    if (slug === 'gallery' && process.env.NEXT_PUBLIC_VERCEL_REVALIDATE_SECRET) {
      try {
        await res.revalidate(`/gallery`);
        console.log(`Revalidated /gallery`)
      } catch (err) {
        console.error('Error revalidating /gallery:', err);
      }
    }
    
    return res.status(200).json({ message: 'Page data updated successfully' })
  } catch (error) {
    console.error(`Failed to update page data for slug '${slug}':`, error)
    return res.status(500).json({ error: 'Failed to update page data' })
  }
}