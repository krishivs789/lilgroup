import { usePageData } from '../hooks/usePageData'
import ContentPage from '@/components/ContentPage'

export default function Admissions() {
  const { page, loading } = usePageData('admissions')
  return <ContentPage page={page} loading={loading} />
}