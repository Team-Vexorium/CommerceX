import { Link, NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

function AppLayout() {
  const cartItems = useSelector((state) => state.cart.items)

  return (
    <div className='min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white'>
      <header className='sticky top-0 z-50 border-b border-zinc-800/70 bg-black/70 backdrop-blur'>
        <nav className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
          <Link to='/' className='text-xl font-bold tracking-wider'>CommerceX</Link>
          <div className='flex items-center gap-6 text-sm'>
            <NavLink to='/shop'>Shop</NavLink>
            <NavLink to='/dashboard'>Dashboard</NavLink>
            <NavLink to='/admin'>Admin</NavLink>
            <NavLink to='/checkout'>Checkout</NavLink>
            <span>Cart ({cartItems.length})</span>
          </div>
        </nav>
      </header>
      <main className='mx-auto max-w-7xl px-6 py-8'>
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
