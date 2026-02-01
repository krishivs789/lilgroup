import { usePageData } from '../hooks/usePageData'
import ContentPage from '@/components/ContentPage'

export default function Events() {
  const { page, loading } = usePageData('events')
  return <ContentPage page={page} loading={loading} />
}