import Head from 'next/head'
import { PageData } from '@/lib/pagesStore'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'

function Hero({ title, image }: { title: string; image?: string }) {
  if (!image) {
    return (
      <div className="my-12">
        <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
      </div>
    )
  }

  return (
    <div className="relative mb-12 h-96 w-full overflow-hidden rounded-lg">
      <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative flex h-full items-center justify-center">
        <h1 className="text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
      </div>
    </div>
  )
}

export default function ContentPage({ page, loading }: { page: PageData | null; loading: boolean }) {
  if (loading) {
    return (
      <>
        <Head>
          <title>Loading... — lil group</title>
        </Head>
        <div className="space-y-8">
          <Skeleton className="h-96 w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-32 w-full" />
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
        <title>{page.title ? `${page.title} — lil group` : 'lil group'}</title>
      </Head>
      
      <Hero title={page.title || 'lil group'} image={page.images?.[0]} />

      <div className="prose prose-lg mx-auto max-w-none dark:prose-invert">
        <Card>
          <CardContent className="mt-6">
            <div dangerouslySetInnerHTML={{ __html: page.content || '<p>Loading...</p>' }} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
