import { useState, useEffect } from 'react';
import SectionCard from '../../components/SectionCard';
import apiClient from '../../services/apiClient';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import ErrorBoundary from '../../components/common/ErrorBoundary';

function ShopContent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('desc');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (minPrice) params.append('minPrice', minPrice);
        if (maxPrice) params.append('maxPrice', maxPrice);
        if (sort) params.append('sort', sort);
        if (order) params.append('order', order);
        
        const response = await apiClient.get(`/products?${params.toString()}`);
        setProducts(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
      }
    };
    
    // Simple debounce
    const timeoutId = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timeoutId);
  }, [search, minPrice, maxPrice, sort, order]);

  return (
    <SectionCard title='Product Listing' description='Search, filter, and sort products.'>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
        <input 
          type="text" 
          placeholder="Search products..." 
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm focus:border-white focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          <input 
            type="number" 
            placeholder="Min Price" 
            className="w-24 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm focus:border-white focus:outline-none"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input 
            type="number" 
            placeholder="Max Price" 
            className="w-24 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm focus:border-white focus:outline-none"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <select 
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm focus:border-white focus:outline-none"
          value={`${sort}-${order}`}
          onChange={(e) => {
            const [s, o] = e.target.value.split('-');
            setSort(s);
            setOrder(o);
          }}
        >
          <option value="createdAt-desc">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <div className='grid gap-4 md:grid-cols-4'>
        {loading ? (
          Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className='rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4'>
               <SkeletonLoader type="text" className="mb-2 h-5 w-3/4" />
               <SkeletonLoader type="text" className="h-4 w-1/2" />
            </div>
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className='rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4'>
              <h3 className='font-medium'>{product.name}</h3>
              <p className='text-sm text-zinc-400'>${Number(product.price).toFixed(2)} • {product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-zinc-500">No products found.</p>
        )}
      </div>
    </SectionCard>
  );
}

function ShopPage() {
  return (
    <ErrorBoundary>
      <ShopContent />
    </ErrorBoundary>
  );
}

export default ShopPage;
