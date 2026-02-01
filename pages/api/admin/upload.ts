import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm } from 'formidable'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

// Import the live data store
let updateLivePagesData: any;

try {
  const pagesStore = require('../../../lib/pagesStore')
  updateLivePagesData = pagesStore.updateLivePagesData
} catch (e) {
  console.warn('Could not load pagesStore:', e)
  updateLivePagesData = () => {
    console.warn('pagesStore not available, returning empty data')
    return { gallery: { images: [] } }
  }
}

export const config = { api: { bodyParser: false } }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed')
  
  // Simple auth check
  const cookie = req.headers.cookie || ''
  const tokenMatch = cookie.split(';').map(c=>c.trim()).find(c=>c.startsWith('token='))
  if (!tokenMatch) return res.status(401).end('Not authenticated')
  const token = tokenMatch.split('=')[1]
  
  const form = new IncomingForm()
  const [fields, files] = await form.parse(req as any)
  
  const file = (files.file as any)
  if (!file) return res.status(400).json({ ok: false, error: 'No file provided' })
  
  // Create uploads directory if it doesn't exist
  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })
  
  const ext = path.extname(file.originalFilename || file.filepath || 'file') || ''
  const id = uuidv4()
  const destName = `${id}${ext}`
  const dest = path.join(uploadDir, destName)
  
  // Save file
  try {
    await fs.promises.copyFile(file.filepath, dest)
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'File save failed' })
  }
  
  // For gallery uploads, update the gallery page's images
  if (fields.slug && fields.slug.toString() === 'gallery') {
    const liveData = updateLivePagesData()
    const galleryUrl = `/uploads/${destName}`
    
    if (liveData.gallery && liveData.gallery.images) {
      const newImages = [...liveData.gallery.images, galleryUrl]
      updateLivePagesData('gallery', { images: newImages })
    }
  }
  
  return res.status(200).json({ 
    ok: true, 
    entry: { 
      id, 
      url: `/uploads/${destName}`, 
      originalName: file.originalFilename || destName, 
      uploadedAt: new Date().toISOString() 
    }
  })
}