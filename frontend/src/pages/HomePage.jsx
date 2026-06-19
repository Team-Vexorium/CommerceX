import SectionCard from '../components/SectionCard'

const productBlocks = ['Featured Products', 'Trending Products', 'New Arrivals', 'Flash Sales']

function HomePage() {
  return (
    <div className='space-y-6'>
      <section className='rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 p-10'>
        <p className='text-xs uppercase tracking-[0.35em] text-zinc-400'>Luxury Commerce Experience</p>
        <h1 className='mt-4 text-4xl font-bold leading-tight md:text-6xl'>Build your premium storefront with CommerceX</h1>
        <p className='mt-4 max-w-2xl text-zinc-300'>
          SaaS-level e-commerce platform with enterprise architecture, secure checkout, analytics, and immersive UX.
        </p>
      </section>

      {productBlocks.map((item) => (
        <SectionCard key={item} title={item} description='Optimized merchandising modules with animation-ready cards and conversion-first content.'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            {[1, 2, 3].map((slot) => (
              <article key={slot} className='rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 transition hover:-translate-y-1 hover:border-zinc-500'>
                <p className='text-sm text-zinc-400'>Product {slot}</p>
                <p className='mt-2 text-lg font-medium'>Premium Collection {slot}</p>
                <p className='mt-1 text-zinc-500'>$ {(slot * 129).toFixed(2)}</p>
              </article>
            ))}
          </div>
        </SectionCard>
      ))}

      <SectionCard title='Testimonials & Brand Partners' description='Social proof sections designed for trust and conversion.'>
        <div className='flex flex-wrap items-center gap-3 text-sm text-zinc-300'>
          <span className='rounded-full border border-zinc-700 px-3 py-1'>Nike-style UX</span>
          <span className='rounded-full border border-zinc-700 px-3 py-1'>Apple-level polish</span>
          <span className='rounded-full border border-zinc-700 px-3 py-1'>Shopify-scale architecture</span>
        </div>
      </SectionCard>
    </div>
  )
}

export default HomePage
