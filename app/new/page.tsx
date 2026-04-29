import { ListingView } from '@/components/listing/listing-view'

export const revalidate = 60

export default function NewPage() {
  return <ListingView kind="new" />
}
