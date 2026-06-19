import { useState, useEffect } from 'react';
import SectionCard from '../../components/SectionCard';
import apiClient from '../../services/apiClient';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import ErrorBoundary from '../../components/common/ErrorBoundary';

function AdminDashboardContent() {
  const [metrics, setMetrics] = useState({ revenue: 0, totalOrders: 0, totalCustomers: 0, totalProducts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await apiClient.get('/admin/dashboard');
        setMetrics(response.data.metrics);
      } catch (error) {
        console.error('Failed to fetch metrics', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  const cards = [
    { key: 'revenue', title: 'Revenue', value: `$${metrics.revenue.toLocaleString()}` },
    { key: 'orders', title: 'Orders', value: metrics.totalOrders },
    { key: 'customers', title: 'Customers', value: metrics.totalCustomers },
    { key: 'products', title: 'Products', value: metrics.totalProducts }
  ];

  return (
    <div className='space-y-6'>
      <div className='grid gap-4 md:grid-cols-4'>
        {cards.map((card) => (
          <SectionCard key={card.key} title={card.title}>
            {loading ? (
              <SkeletonLoader type="text" className="h-8 w-24" />
            ) : (
              <p className='text-3xl font-bold'>{card.value}</p>
            )}
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
  );
}

function AdminDashboardPage() {
  return (
    <ErrorBoundary>
      <AdminDashboardContent />
    </ErrorBoundary>
  );
}

export default AdminDashboardPage;
