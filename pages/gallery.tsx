import * as React from 'react'
import Head from 'next/head'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Skeleton } from '@/components/ui/skeleton'

// Define the expected structure of a page's content
interface PageContent {
  slug: string
  title: string
  content: string
  images: string[]
}

interface Upload {
  id: string
  url: string
  originalName: string
  uploadedAt: string
}

function MasonryImageGrid({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null)

  return (
    <Dialog>
      <div className="mt-8 columns-2 gap-4 sm:columns-3 md:columns-4">
        {images.map((url, index) => (
          <DialogTrigger asChild key={url}>
            <div className="mb-4 break-inside-avoid" onClick={() => setSelectedImage(url)}>
              <img
                src={url}
                alt={`Gallery image ${index + 1}`}
                className="w-full rounded-lg object-cover transition-transform duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
                loading="lazy"
              />
            </div>
          </DialogTrigger>
        ))}
      </div>
      {selectedImage && (
        <DialogContent className="max-w-4xl">
          <img src={selectedImage} alt="Selected gallery image" className="mx-auto max-h-[80vh] w-auto rounded-lg" />
        </DialogContent>
      )}
    </Dialog>
  )
}

function GallerySkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-1/2" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="mt-8 columns-2 gap-4 sm:columns-3 md:columns-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="mb-4 break-inside-avoid">
            <Skeleton className="h-40 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Gallery() {
  const [pageContent, setPageContent] = React.useState<PageContent | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        // Fetch page content and image list in parallel
        const [pageRes, imagesRes] = await Promise.all([
          fetch('/api/pages/gallery'),
          fetch('/api/gallery')
        ])

        if (!pageRes.ok || !imagesRes.ok) {
          throw new Error('Failed to fetch gallery data')
        }

        const pageData = await pageRes.json()
        const imagesData: Upload[] = await imagesRes.json()
        const images = imagesData.map(img => img.url)
        
        setPageContent({
          slug: pageData.slug || 'gallery',
          title: pageData.title || 'Gallery',
          content: pageData.content || '',
          images,
        })

      } catch (err) {
        console.error(err)
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])
  
  if (isLoading) {
    return <GallerySkeleton />
  }

  if (error || !pageContent) {
    return <div>Error: {error || 'Page data could not be loaded.'}</div>
  }

  return (
    <>
      <Head>
        <title>{pageContent.title ? `${pageContent.title} — lil group` : 'Gallery — lil group'}</title>
      </Head>
      
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{pageContent.title || 'Gallery'}</h1>
        <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: pageContent.content || '' }} />
      </div>
      
      {pageContent.images.length > 0 ? (
        <MasonryImageGrid images={pageContent.images} />
      ) : (
        <p>No images to display in the gallery.</p>
      )}
    </>
  )
}
