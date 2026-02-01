import { usePageData } from '../hooks/usePageData'
import ContentPage from '@/components/ContentPage'

export default function Contact() {
  const { page, loading } = usePageData('contact')
  return <ContentPage page={page} loading={loading} />
}