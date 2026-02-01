import { usePageData } from '../hooks/usePageData'
import ContentPage from '@/components/ContentPage'

export default function About() {
  const { page, loading } = usePageData('about')
  return <ContentPage page={page} loading={loading} />
}