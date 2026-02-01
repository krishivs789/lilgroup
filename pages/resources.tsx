import ContentPage from '@/components/ContentPage'
import { getLivePagesData, PageData } from '@/lib/pagesStore'
import { GetServerSideProps } from 'next'

export default function Resources({ page }: { page: PageData }) {
  return <ContentPage page={page} loading={false} />
}

export const getServerSideProps: GetServerSideProps = async () => {
  const pages = getLivePagesData()
  const page = pages['resources']
  return {
    props: { page },
  }
}