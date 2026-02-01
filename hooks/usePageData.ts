import { useState, useEffect } from 'react'
import { getLivePagesData, PageData } from '../lib/pagesStore'

// Simplified direct data hook using live data
export function usePageData(slug: string) {
  const [page, setPage] = useState<PageData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // Get live data from shared store
    const livePages = getLivePagesData()
    const pageData = livePages[slug]

    // Simulate brief loading for UX
    const timer = setTimeout(() => {
      setPage(pageData || {
        slug: slug,
        title: `lil group - ${slug}`,
        content: `<p>Welcome to the ${slug} page at lil group. Content for this section is coming soon.</p><p>In the meantime, explore our reading lists and learning resources available throughout the site.</p>`,
        images: ['https://picsum.photos/seed/default/1200/600']
      })
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [slug])

  return { page, loading }
}