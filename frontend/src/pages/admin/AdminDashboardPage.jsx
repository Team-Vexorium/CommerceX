import SectionCard from '../../components/SectionCard'

const cards = ['Revenue', 'Orders', 'Customers', 'Products']

function AdminDashboardPage() {
  return (
    <div className='space-y-6'>
      <div className='grid gap-4 md:grid-cols-4'>
        {cards.map((card) => (
          <SectionCard key={card} title={card}>
            <p className='text-3xl font-bold'>$0</p>
          </SectionCard>
        ))}
      </div>

      <SectionCard title='Admin Management Modules' description='Products, orders, users, coupons, analytics, and reporting workflows.'>
        <ul className='grid gap-2 md:grid-cols-2'>
          {['Product CRUD + bulk actions', 'Order status + refunds', 'User moderation', 'Coupon management', 'Revenue charts', 'Sales reports'].map((item) => (
            <li key={item} className='rounded-xl border border-zinc-800 bg-zinc-950/70 px-4 py-2 text-sm'>{item}</li>
          ))}
        </ul>
      </SectionCard>
    </div>
  )
}

export default AdminDashboardPage
