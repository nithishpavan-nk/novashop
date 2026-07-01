import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';

const CATEGORY_EMOJIS = {
  Electronics:'💻', Fashion:'👗', Home:'🏠', Sports:'⚽',
  Books:'📚', Beauty:'✨', Toys:'🎮', Default:'📦',
};

export default function ProductDetail() {
  const router = useRouter();
  const { id }  = router.query;
  const { addItem, items } = useCart();
  const [product, setProduct] = useState(null);
  const [status, setStatus]   = useState('loading');
  const [qty, setQty]         = useState(1);
  const [added, setAdded]     = useState(false);

  useEffect(() => {
    if (!id) return;
    const base = `http://${window.location.hostname}:5000`;
    fetch(`${base}/products/${id}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => { setProduct(data); setStatus('ok'); })
      .catch(() => setStatus('error'));
  }, [id]);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const inCart = items.find(i => i.id === product?.id)?.quantity || 0;
  const emoji  = product ? (CATEGORY_EMOJIS[product.category] || CATEGORY_EMOJIS.Default) : '📦';
  const isOnSale = product?.original_price && product.original_price > product.price;
  const discount = isOnSale ? Math.round((1 - product.price / product.original_price) * 100) : null;

  if (status === 'loading') return (
    <div className="loading-page">
      <div className="spinner" />
      <style jsx>{`
        .loading-page { min-height: 60vh; display: flex; align-items: center; justify-content: center; }
        .spinner {
          width: 40px; height: 40px;
          border: 3px solid var(--border);
          border-top-color: var(--violet);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );

  if (status === 'error') return (
    <div className="error-page">
      <span>⚠️</span>
      <h2>Product not found</h2>
      <Link href="/products">← Back to products</Link>
      <style jsx>{`
        .error-page { min-height: 60vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; text-align: center; }
        span { font-size: 48px; }
        h2   { font-size: 24px; }
        a    { color: var(--violet); font-weight: 600; }
      `}</style>
    </div>
  );

  return (
    <main className="detail-page">
      <div className="container">
        <Link href="/products" className="back-link">← All Products</Link>
        <div className="detail-grid">
          {/* IMAGE */}
          <div className="detail-image">
            <div className="image-box">
              <span className="big-emoji">{emoji}</span>
            </div>
            {isOnSale && <span className="badge-sale">-{discount}% OFF</span>}
          </div>

          {/* INFO */}
          <div className="detail-info">
            <span className="cat-tag">{product.category}</span>
            <h1>{product.name}</h1>

            <div className="price-row">
              <span className="price">₹{Number(product.price).toLocaleString('en-IN')}</span>
              {isOnSale && (
                <span className="orig-price">₹{Number(product.original_price).toLocaleString('en-IN')}</span>
              )}
              {isOnSale && <span className="discount-badge">Save {discount}%</span>}
            </div>

            {product.description && (
              <p className="description">{product.description}</p>
            )}

            <div className="meta-grid">
              <div className="meta-item"><span>Category</span><strong>{product.category}</strong></div>
              <div className="meta-item"><span>Availability</span>
                <strong className={product.stock > 0 ? 'in-stock' : 'out-stock'}>
                  {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
                </strong>
              </div>
              {product.brand && <div className="meta-item"><span>Brand</span><strong>{product.brand}</strong></div>}
              {product.sku   && <div className="meta-item"><span>SKU</span><strong>{product.sku}</strong></div>}
            </div>

            <div className="actions">
              <div className="qty-control">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <button
                className={`add-to-cart ${added ? 'added' : ''}`}
                onClick={handleAdd}
                disabled={product.stock === 0}
              >
                {added ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
              <Link href="/cart" className="view-cart-btn">
                View Cart {inCart > 0 && `(${inCart})`}
              </Link>
            </div>

            <div className="trust-badges">
              <span>🔒 Secure checkout</span>
              <span>🚀 Fast delivery</span>
              <span>↩️ 30-day returns</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .detail-page { padding: 40px 0 80px; min-height: 80vh; }
        .container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
        .back-link {
          display: inline-flex;
          align-items: center;
          color: var(--muted);
          font-size: 14px;
          margin-bottom: 32px;
          transition: var(--transition);
        }
        .back-link:hover { color: var(--violet); }
        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
        }
        .detail-image { position: relative; }
        .image-box {
          background: linear-gradient(135deg, #12122A 0%, #1E1E3A 100%);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .big-emoji {
          font-size: 140px;
          filter: drop-shadow(0 8px 32px rgba(108,99,255,0.5));
          animation: float 4s ease-in-out infinite;
          display: inline-block;
        }
        .badge-sale {
          position: absolute;
          top: 20px; left: 20px;
          background: var(--sale-red);
          color: white;
          font-size: 13px;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .cat-tag {
          display: inline-block;
          font-size: 12px;
          font-weight: 600;
          color: var(--violet);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 12px;
        }
        .detail-info h1 {
          font-size: 34px;
          font-weight: 700;
          margin-bottom: 20px;
          line-height: 1.2;
        }
        .price-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .price { font-size: 36px; font-weight: 700; font-family: var(--font-display); }
        .orig-price { font-size: 20px; color: var(--muted); text-decoration: line-through; }
        .discount-badge {
          background: rgba(255, 79, 94, 0.15);
          color: var(--sale-red);
          font-size: 13px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid rgba(255,79,94,0.3);
        }
        .description {
          color: var(--muted);
          line-height: 1.75;
          margin-bottom: 28px;
          font-size: 15px;
        }
        .meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          padding: 20px;
          background: var(--card-bg);
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          margin-bottom: 28px;
        }
        .meta-item { display: flex; flex-direction: column; gap: 3px; }
        .meta-item span { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px; }
        .meta-item strong { font-size: 14px; color: var(--white); }
        .in-stock  { color: var(--success) !important; }
        .out-stock { color: var(--sale-red) !important; }
        .actions { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; margin-bottom: 24px; }
        .qty-control {
          display: flex;
          align-items: center;
          gap: 0;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          overflow: hidden;
        }
        .qty-control button {
          width: 40px; height: 48px;
          background: none;
          border: none;
          color: var(--white);
          font-size: 20px;
          transition: var(--transition);
        }
        .qty-control button:hover { background: var(--border); }
        .qty-control span {
          width: 48px;
          text-align: center;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 16px;
          border-left: 1px solid var(--border);
          border-right: 1px solid var(--border);
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .add-to-cart {
          flex: 1;
          height: 48px;
          background: var(--violet);
          color: white;
          border: none;
          border-radius: var(--radius-sm);
          font-size: 15px;
          font-weight: 600;
          transition: var(--transition);
          min-width: 160px;
        }
        .add-to-cart:hover:not(:disabled) { background: var(--violet-dark); transform: translateY(-2px); box-shadow: var(--shadow-glow); }
        .add-to-cart.added { background: var(--success); }
        .add-to-cart:disabled { opacity: 0.5; cursor: not-allowed; }
        .view-cart-btn {
          height: 48px;
          padding: 0 20px;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--white);
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          transition: var(--transition);
          white-space: nowrap;
        }
        .view-cart-btn:hover { border-color: var(--violet); color: var(--violet); }
        .trust-badges {
          display: flex;
          gap: 20px;
          font-size: 13px;
          color: var(--muted);
          flex-wrap: wrap;
        }
        @media (max-width: 768px) {
          .detail-grid { grid-template-columns: 1fr; gap: 32px; }
          .image-box   { height: 280px; }
          .big-emoji   { font-size: 90px; }
          .meta-grid   { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
