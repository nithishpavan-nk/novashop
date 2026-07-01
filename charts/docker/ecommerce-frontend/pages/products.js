import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import ProductCard from '../components/ProductCard';

const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Home', 'Sports', 'Books', 'Beauty', 'Toys'];
const SORT_OPTIONS = [
  { label: 'Newest',       value: 'newest' },
  { label: 'Price: Low → High', value: 'price_asc' },
  { label: 'Price: High → Low', value: 'price_desc' },
  { label: 'Name A → Z',  value: 'name_asc' },
];

export default function Products() {
  const router  = useRouter();
  const [products, setProducts] = useState([]);
  const [status, setStatus]     = useState('loading');
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort]         = useState('newest');

  // Sync category from URL query param
  useEffect(() => {
    if (router.query.category) setCategory(router.query.category);
  }, [router.query.category]);

  const fetchProducts = useCallback(() => {
    setStatus('loading');
    const base = typeof window !== 'undefined'
      ? `http://${window.location.hostname}:5001`
      : 'http://backend:5000';

    const params = new URLSearchParams();
    if (search)              params.set('search', search);
    if (category !== 'All')  params.set('category', category);
    params.set('sort', sort);

    fetch(`${base}/products?${params}`)
      .then(r => r.json())
      .then(data => { setProducts(data); setStatus('ok'); })
      .catch(() => setStatus('error'));
  }, [search, category, sort]);

  useEffect(() => {
    const timer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  return (
    <main className="products-page">
      <div className="page-header">
        <div className="container">
          <h1>All Products</h1>
          <p>{status === 'ok' ? `${products.length} products found` : ' '}</p>
        </div>
      </div>

      <div className="container">
        {/* CONTROLS */}
        <div className="controls">
          <div className="search-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="clear-btn" onClick={() => setSearch('')} aria-label="Clear search">✕</button>
            )}
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)}>
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {/* CATEGORY PILLS */}
        <div className="cat-pills" role="group" aria-label="Filter by category">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`pill ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PRODUCT GRID */}
        {status === 'loading' && (
          <div className="skeleton-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-img" />
                <div className="skeleton-body">
                  <div className="skeleton-line short" />
                  <div className="skeleton-line" />
                  <div className="skeleton-line medium" />
                </div>
              </div>
            ))}
          </div>
        )}

        {status === 'error' && (
          <div className="state-box">
            <span>⚠️</span>
            <h3>Could not load products</h3>
            <p>Make sure the backend is running and reachable.</p>
            <button className="btn-primary" onClick={fetchProducts}>Retry</button>
          </div>
        )}

        {status === 'ok' && products.length === 0 && (
          <div className="state-box">
            <span>🔍</span>
            <h3>No products found</h3>
            <p>Try a different search term or category.</p>
            <button className="btn-primary" onClick={() => { setSearch(''); setCategory('All'); }}>
              Clear filters
            </button>
          </div>
        )}

        {status === 'ok' && products.length > 0 && (
          <div className="product-grid">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>

      <style jsx>{`
        .products-page { min-height: 80vh; padding-bottom: 80px; }
        .page-header {
          background: var(--void-soft);
          border-bottom: 1px solid var(--border);
          padding: 40px 0;
          margin-bottom: 40px;
        }
        .page-header h1 { font-size: 36px; font-weight: 700; margin-bottom: 6px; }
        .page-header p  { color: var(--muted); font-size: 14px; }
        .container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
        .controls {
          display: flex;
          gap: 14px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .search-wrap {
          flex: 1;
          min-width: 200px;
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-wrap svg {
          position: absolute;
          left: 14px;
          color: var(--muted);
          pointer-events: none;
        }
        .search-wrap input {
          width: 100%;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--white);
          font-size: 14px;
          padding: 11px 40px 11px 40px;
          transition: var(--transition);
          font-family: var(--font-body);
        }
        .search-wrap input:focus {
          outline: none;
          border-color: var(--violet);
          box-shadow: 0 0 0 3px var(--violet-glow);
        }
        .search-wrap input::placeholder { color: var(--muted); }
        .clear-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: var(--muted);
          font-size: 13px;
          padding: 4px;
          transition: var(--transition);
        }
        .clear-btn:hover { color: var(--white); }
        select {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--white);
          font-size: 14px;
          padding: 11px 16px;
          transition: var(--transition);
          font-family: var(--font-body);
          cursor: pointer;
        }
        select:focus { outline: none; border-color: var(--violet); }
        .cat-pills {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .pill {
          padding: 8px 18px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--muted);
          font-size: 13px;
          font-weight: 500;
          transition: var(--transition);
        }
        .pill:hover { border-color: var(--violet); color: var(--white); }
        .pill.active { background: var(--violet); border-color: var(--violet); color: white; }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 24px;
        }
        /* SKELETON */
        .skeleton-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 24px;
        }
        .skeleton-card {
          background: var(--card-bg);
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .skeleton-img {
          height: 200px;
          background: linear-gradient(90deg, #1A1A2E 25%, #22223A 50%, #1A1A2E 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
        }
        .skeleton-body { padding: 18px; display: flex; flex-direction: column; gap: 10px; }
        .skeleton-line {
          height: 12px;
          border-radius: 6px;
          background: linear-gradient(90deg, #1A1A2E 25%, #22223A 50%, #1A1A2E 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
          animation-delay: 0.15s;
        }
        .skeleton-line.short  { width: 40%; }
        .skeleton-line.medium { width: 65%; }
        /* STATE BOX */
        .state-box {
          text-align: center;
          padding: 80px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .state-box span { font-size: 48px; }
        .state-box h3   { font-size: 22px; }
        .state-box p    { color: var(--muted); margin-bottom: 12px; }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          background: var(--violet);
          color: white;
          font-weight: 600;
          font-size: 15px;
          padding: 12px 24px;
          border-radius: var(--radius-sm);
          transition: var(--transition);
          border: none;
          text-decoration: none;
        }
        .btn-primary:hover { background: var(--violet-dark); transform: translateY(-2px); }
        @media (max-width: 600px) {
          .controls { flex-direction: column; }
        }
      `}</style>
    </main>
  );
}
