import SectionCard from '../../components/SectionCard'

function ShopPage() {
  return (
    <SectionCard title='Product Listing' description='Search, filter, sort, pagination, inventory, variants, and responsive catalog layout.'>
      <div className='grid gap-4 md:grid-cols-4'>
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className='rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4'>
            <h3 className='font-medium'>Item #{idx + 1}</h3>
            <p className='text-sm text-zinc-400'>Category • Variant • In Stock</p>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

export default ShopPage
