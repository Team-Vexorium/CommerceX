import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import HomePage from './pages/HomePage'
import ShopPage from './pages/shop/ShopPage'
import ProductDetailPage from './pages/shop/ProductDetailPage'
import CheckoutPage from './pages/shop/CheckoutPage'
import DashboardPage from './pages/user/DashboardPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/shop/:slug' element={<ProductDetailPage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/admin' element={<AdminDashboardPage />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    </Routes>
  )
}

export default App
