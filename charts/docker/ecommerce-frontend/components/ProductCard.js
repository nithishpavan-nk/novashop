import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const CATEGORY_EMOJIS = {
  Electronics: '💻',
  Fashion: '👗',
  Home: '🏠',
  Sports: '⚽',
  Books: '📚',
  Beauty: '✨',
  Toys: '🎮',
  Default: '📦',
};

export default function ProductCard({ product }) {
  const { addItem, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const inCart = items.find(i => i.id === product.id)?.quantity || 0;
  const emoji = CATEGORY_EMOJIS[product.category] || CATEGORY_EMOJIS.Default;
  const isOnSale = product.original_price && product.original_price > product.price;
  const discount = isOnSale
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null;

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <>
      <Link href={`/product/${product.id}`} className="card">
        <div className="card-image">
          <div className="image-placeholder">
            <span className="emoji">{emoji}</span>
          </div>
          {isOnSale && <span className="badge-sale">-{discount}%</span>}
          {product.is_new && <span className="badge-new">New</span>}
          {inCart > 0 && Number.isFinite(inCart) && <span className="badge-cart">{inCart} in cart</span>}
        </div>
        <div className="card-body">
          <span className="category-tag">{product.category}</span>
          <h3 className="card-name">{product.name}</h3>
          {product.description && (
            <p className="card-desc">{product.description.slice(0, 72)}{product.description.length > 72 ? '…' : ''}</p>
          )}
          <div className="card-footer">
            <div className="price-group">
              <span className="price">₹{Number(product.price).toLocaleString('en-IN')}</span>
              {isOnSale && (
                <span className="original-price">₹{Number(product.original_price).toLocaleString('en-IN')}</span>
              )}
            </div>
            <button
              type="button"
              className={`add-btn ${justAdded ? 'added' : ''}`}
              onClick={handleAdd}
              aria-label={`Add ${product.name} to cart`}
            >
              {justAdded ? '✓' : '+'}
            </button>
          </div>
        </div>
      </Link>

      <style jsx>{`
        .card {
          display: flex;
          flex-direction: column;
          background: var(--card-bg);
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          overflow: hidden;
          transition: var(--transition);
          position: relative;
          animation: fadeUp 0.4s ease-out both;
        }
        .card:hover {
          transform: translateY(-6px);
          border-color: var(--violet);
          box-shadow: var(--shadow-glow);
        }
        .card-image {
          position: relative;
          height: 200px;
          background: linear-gradient(135deg, #12122A 0%, #1E1E3A 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .emoji {
          font-size: 72px;
          filter: drop-shadow(0 4px 16px rgba(108,99,255,0.4));
          animation: float 3s ease-in-out infinite;
        }
        .badge-sale, .badge-new, .badge-cart {
          position: absolute;
          top: 12px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .badge-sale { left: 12px; background: var(--sale-red); color: white; }
        .badge-new  { left: 12px; background: var(--violet); color: white; }
        .badge-cart { right: 12px; background: rgba(108,99,255,0.2); color: var(--violet); border: 1px solid var(--violet); }
        .card-body {
          padding: 18px;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 6px;
        }
        .category-tag {
          font-size: 11px;
          font-weight: 600;
          color: var(--violet);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .card-name {
          font-size: 16px;
          font-weight: 600;
          color: var(--white);
          line-height: 1.3;
        }
        .card-desc {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.5;
          flex: 1;
        }
        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;
        }
        .price-group { display: flex; align-items: baseline; gap: 8px; }
        .price {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 700;
          color: var(--white);
        }
        .original-price {
          font-size: 13px;
          color: var(--muted);
          text-decoration: line-through;
        }
        .add-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--violet);
          color: white;
          border: none;
          font-size: 20px;
          font-weight: 400;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
          flex-shrink: 0;
        }
        .add-btn:hover {
          background: var(--violet-dark);
          transform: scale(1.1);
        }
        .add-btn.added {
          background: var(--success);
          animation: pulse-ring 0.6s ease;
        }
      `}</style>
    </>
  );
}
