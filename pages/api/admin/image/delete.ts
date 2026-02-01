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

  const { imageUrl } = req.body
  if (!imageUrl || typeof imageUrl !== 'string') {
    return res.status(400).json({ error: 'Image URL is required' })
  }

  const uploadsJsonPath = path.join(process.cwd(), 'data', 'uploads.json')
  const publicUploadsDir = path.join(process.cwd(), 'public', 'uploads')

  try {
    const fileContent = await fs.promises.readFile(uploadsJsonPath, 'utf-8')
    let uploads = JSON.parse(fileContent)

    const initialLength = uploads.length
    const updatedUploads = uploads.filter((upload: any) => upload.url !== imageUrl)

    if (updatedUploads.length === initialLength) {
      return res.status(404).json({ error: `Image with URL '${imageUrl}' not found in uploads.json` })
    }

    await fs.promises.writeFile(uploadsJsonPath, JSON.stringify(updatedUploads, null, 2))

    // Attempt to delete the physical file
    const filename = path.basename(imageUrl)
    const filePath = path.join(publicUploadsDir, filename)

    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath)
      console.log(`Deleted physical file: ${filePath}`)
    } else {
      console.warn(`Physical file not found for deletion: ${filePath}`)
    }

    // Trigger on-demand revalidation for the gallery page
    if (process.env.NEXT_PUBLIC_VERCEL_REVALIDATE_SECRET) {
      try {
        await res.revalidate(`/gallery`)
        console.log(`Revalidated /gallery after image deletion`)
      } catch (err) {
        console.error('Error revalidating /gallery after deletion:', err)
      }
    }
    
    return res.status(200).json({ message: 'Image deleted successfully' })
  } catch (error) {
    console.error(`Failed to delete image with URL '${imageUrl}':`, error)
    return res.status(500).json({ error: 'Failed to delete image' })
  }
}
