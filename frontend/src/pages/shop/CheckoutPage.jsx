import SectionCard from '../../components/SectionCard'

function CheckoutPage() {
  return (
    <SectionCard title='Multi-Step Checkout' description='Shipping, billing, order review, Stripe payment flow, and success/failure handling.'>
      <ol className='grid gap-3 text-sm text-zinc-300 md:grid-cols-4'>
        {['Shipping', 'Billing', 'Review', 'Payment'].map((step) => (
          <li key={step} className='rounded-xl border border-zinc-800 bg-zinc-950/70 px-4 py-3'>{step}</li>
        ))}
      </ol>
    </SectionCard>
  )
}

export default CheckoutPage
