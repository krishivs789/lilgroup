import { usePageData } from '../hooks/usePageData'
import ContentPage from '@/components/ContentPage'

export default function Resources() {
  const { page, loading } = usePageData('resources')
  return <ContentPage page={page} loading={loading} />
}