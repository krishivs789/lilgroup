import { usePageData } from '../hooks/usePageData'
import ContentPage from '@/components/ContentPage'

export default function Home() {
  const { page, loading } = usePageData('home')
  return <ContentPage page={page} loading={loading} />
}
