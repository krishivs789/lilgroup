import * as React from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import fs from 'fs'
import path from 'path'

// Define the expected structure of a page's static content
interface PageContent {
  slug: string
  title: string
  content: string
  images: string[] // Now includes images from getStaticProps
}

// Define the expected structure of an uploaded item
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

export default function Gallery({ pageContent }: { pageContent: PageContent }) {
  if (!pageContent) {
    return <div>Page data could not be loaded.</div>
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

export const getStaticProps: GetStaticProps = async () => {
  const pagesPath = path.join(process.cwd(), 'data', 'pages.json');
  const uploadsPath = path.join(process.cwd(), 'data', 'uploads.json');

  const pagesFile = await fs.promises.readFile(pagesPath, 'utf-8');
  const pagesArray = JSON.parse(pagesFile);
  
  // Find the gallery page content by slug
  const staticPageContent = pagesArray.find((page: any) => page.slug === 'gallery');

  const uploadsFile = await fs.promises.readFile(uploadsPath, 'utf-8');
  const uploads: Upload[] = JSON.parse(uploadsFile);

  const images = uploads.map(upload => upload.url);

  // Combine static page content with dynamically loaded images
  const pageContent: PageContent = {
    ...staticPageContent,
    images: images,
  };

  return {
    props: { pageContent: pageContent || null },
    revalidate: 60, // Revalidate every 60 seconds
  }
}
