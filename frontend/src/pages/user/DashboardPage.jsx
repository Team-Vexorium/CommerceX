import SectionCard from '../../components/SectionCard'

function DashboardPage() {
  return (
    <div className='grid gap-6 md:grid-cols-2'>
      <SectionCard title='Profile Management' description='Manage personal data, addresses, and saved payment methods.' />
      <SectionCard title='Wishlist & Notifications' description='Track saved products and notification center updates.' />
      <SectionCard title='Recent Orders' description='Order history, tracking, invoices, and status timeline.' />
      <SectionCard title='Account Security' description='Update credentials, sessions, and account protection settings.' />
    </div>
  )
}

export default DashboardPage
