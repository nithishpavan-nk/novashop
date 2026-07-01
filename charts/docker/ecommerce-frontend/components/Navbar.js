import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function Navbar() {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="nav-inner">
          <Link href="/" className="logo">
            <span className="logo-icon">⬡</span>
            <span className="logo-text">NovaShop</span>
          </Link>

          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/products" onClick={() => setMenuOpen(false)}>Products</Link>
            <Link href="/products?category=Electronics" onClick={() => setMenuOpen(false)}>Electronics</Link>
            <Link href="/products?category=Fashion" onClick={() => setMenuOpen(false)}>Fashion</Link>
          </div>

          <div className="nav-actions">
            <Link href="/cart" className="cart-btn" aria-label={`Cart, ${itemCount} items`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
            </Link>

            <button
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(10, 10, 15, 0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }
        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 20px;
          flex-shrink: 0;
        }
        .logo-icon {
          font-size: 24px;
          color: var(--violet);
          animation: float 3s ease-in-out infinite;
          display: inline-block;
        }
        .logo-text { color: var(--white); }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
          flex: 1;
        }
        .nav-links a {
          padding: 8px 14px;
          border-radius: var(--radius-sm);
          font-size: 14px;
          font-weight: 500;
          color: var(--muted);
          transition: var(--transition);
        }
        .nav-links a:hover { color: var(--white); background: var(--border); }
        .nav-actions { display: flex; align-items: center; gap: 12px; }
        .cart-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: var(--radius-sm);
          color: var(--muted);
          transition: var(--transition);
          background: transparent;
          border: none;
        }
        .cart-btn:hover { color: var(--white); background: var(--border); }
        .cart-badge {
          position: absolute;
          top: 4px; right: 4px;
          background: var(--violet);
          color: white;
          font-size: 10px;
          font-weight: 700;
          min-width: 16px;
          height: 16px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
        }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          padding: 6px;
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--white);
          border-radius: 2px;
          transition: var(--transition);
        }
        @media (max-width: 768px) {
          .hamburger { display: flex; }
          .nav-links {
            position: fixed;
            top: 68px; left: 0; right: 0;
            background: var(--void-soft);
            flex-direction: column;
            align-items: flex-start;
            padding: 16px 24px;
            gap: 4px;
            border-bottom: 1px solid var(--border);
            transform: translateY(-100%);
            opacity: 0;
            pointer-events: none;
            transition: var(--transition);
          }
          .nav-links.open {
            transform: translateY(0);
            opacity: 1;
            pointer-events: all;
          }
          .nav-links a { width: 100%; padding: 12px 14px; }
        }
      `}</style>
    </>
  );
}
