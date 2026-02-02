import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Page slug is required' })
  }

  // Set headers to prevent caching, ensuring fresh data is always served.
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  const pagesPath = path.join(process.cwd(), 'data', 'pages.json')

  try {
    const fileContent = await fs.promises.readFile(pagesPath, 'utf-8')
    const pagesArray = JSON.parse(fileContent)

    const page = pagesArray.find((p: any) => p.slug === slug)

    if (!page) {
      return res.status(404).json({ error: `Page with slug '${slug}' not found` })
    }

    return res.status(200).json(page)
  } catch (error) {
    console.error(`Failed to read page data for slug '${slug}':`, error)
    // If the file doesn't exist, it's a 404, but for other errors it's a 500
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return res.status(404).json({ error: `Page data source not found.` });
    }
    return res.status(500).json({ error: 'Failed to read page data' })
  }
}