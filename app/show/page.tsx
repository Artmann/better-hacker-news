import { ListingView } from '@/components/listing/listing-view'

export const revalidate = 60

export default function ShowPage() {
  return <ListingView kind="show" />
}
