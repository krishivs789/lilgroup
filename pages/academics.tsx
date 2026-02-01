import { usePageData } from '../hooks/usePageData'
import ContentPage from '@/components/ContentPage'

export default function Academics() {
  const { page, loading } = usePageData('academics')
  return <ContentPage page={page} loading={loading} />
}