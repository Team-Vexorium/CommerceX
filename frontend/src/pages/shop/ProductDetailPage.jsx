import SectionCard from '../../components/SectionCard'

function ProductDetailPage() {
  return (
    <div className='space-y-6'>
      <SectionCard title='Product Detail' description='Gallery, zoom, specs, ratings, reviews, wishlist, and sharing actions.'>
        <div className='grid gap-6 md:grid-cols-2'>
          <div className='min-h-64 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6'>Gallery / Zoom</div>
          <div className='space-y-3'>
            <h3 className='text-2xl font-semibold'>Flagship Product</h3>
            <p className='text-zinc-400'>Professional-grade product page structure for conversion.</p>
            <button className='rounded-xl bg-white px-4 py-2 text-black transition hover:bg-zinc-200'>Add to Cart</button>
          </div>
        </div>
      </SectionCard>
    </div>
  )
}

export default ProductDetailPage
