import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm } from 'formidable'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export const config = { api: { bodyParser: false } }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed')
  
  // Simple auth check
  const cookie = req.headers.cookie || ''
  const tokenMatch = cookie.split(';').map(c=>c.trim()).find(c=>c.startsWith('token='))
  if (!tokenMatch) return res.status(401).end('Not authenticated')
  
  const form = new IncomingForm()
  const [fields, files] = await form.parse(req)
  
  const file = files.file?.[0]
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
    // Use copy + unlink instead of rename to avoid cross-device errors
    await fs.promises.copyFile(file.filepath, dest)
    await fs.promises.unlink(file.filepath)
  } catch (e) {
    console.error('File save error:', e);
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';
    return res.status(500).json({ ok: false, error: 'File save failed', details: errorMessage })
  }
  
  const newEntry = { 
    id, 
    url: `/uploads/${destName}`, 
    originalName: file.originalFilename || destName, 
    uploadedAt: new Date().toISOString() 
  }

  // For gallery uploads, update the uploads.json file
  if (fields.slug && fields.slug.toString() === 'gallery') {
    const uploadsJsonPath = path.join(process.cwd(), 'data', 'uploads.json');
    try {
      let uploads: any[] = [];
      if (fs.existsSync(uploadsJsonPath)) {
        const fileContent = await fs.promises.readFile(uploadsJsonPath, 'utf-8');
        uploads = JSON.parse(fileContent);
      }
      uploads.unshift(newEntry); // Add new image to the beginning
      await fs.promises.writeFile(uploadsJsonPath, JSON.stringify(uploads, null, 2));
    } catch (e) {
      console.error('Failed to update uploads.json:', e);
      // Decide if you should fail the whole request
    }
  }
  
  return res.status(200).json({ 
    ok: true, 
    entry: newEntry
  })
}