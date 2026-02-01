import * as React from 'react'
import { usePageData } from '../hooks/usePageData'
import Head from 'next/head'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

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

export default function Gallery() {
  const { page, loading } = usePageData('gallery')

  if (loading) {
    return (
      <>
        <Head>
          <title>Loading Gallery — lil group</title>
        </Head>
        <div className="space-y-8">
          <Skeleton className="h-12 w-1/3" />
          <Skeleton className="h-24 w-full" />
          <div className="columns-2 gap-4 sm:columns-3 md:columns-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="mb-4 h-64 w-full" />
            ))}
          </div>
        </div>
      </>
    )
  }
  
  if (!page) {
    return <div>Page data could not be loaded.</div>
  }

  return (
    <>
      <Head>
        <title>{page.title ? `${page.title} — lil group` : 'Gallery — lil group'}</title>
      </Head>
      
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{page.title || 'Gallery'}</h1>
        <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: page.content || '' }} />
      </div>
      
      <MasonryImageGrid images={page.images || []} />
    </>
  )
}
