import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

// Simple cache to avoid repeated file reads
let galleryCache: any = null
let cacheTimestamp = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export default function handler(req: NextApiRequest, res: NextApiResponse){
  // Set cache headers
  res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=600')
  
  // Check cache
  if (galleryCache && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return res.status(200).json(galleryCache)
  }

  const file = path.join(process.cwd(), 'data', 'uploads.json')
  try{
    const content = fs.readFileSync(file, 'utf-8')
    const json = JSON.parse(content)
    
    // Cache the result
    galleryCache = json
    cacheTimestamp = Date.now()
    
    return res.status(200).json(json)
  }catch(err){
    return res.status(200).json([])
  }
}
