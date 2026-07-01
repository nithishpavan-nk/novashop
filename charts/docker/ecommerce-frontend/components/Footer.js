import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="logo-icon">⬡</span>
          <span>NovaShop</span>
          <p>Premium products, delivered fast.</p>
        </div>
        <div className="footer-links">
          <div>
            <h4>Shop</h4>
            <Link href="/products?category=Electronics">Electronics</Link>
            <Link href="/products?category=Fashion">Fashion</Link>
            <Link href="/products?category=Home">Home & Living</Link>
            <Link href="/products?category=Sports">Sports</Link>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
            <a href="#">Blog</a>
          </div>
          <div>
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Shipping</a>
            <a href="#">Returns</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} NovaShop. All rights reserved.</p>
        <div className="footer-badges">
          <span>🔒 Secure Checkout</span>
          <span>🚀 Fast Delivery</span>
          <span>↩️ Easy Returns</span>
        </div>
      </div>

      <style jsx>{`
        .footer {
          margin-top: 80px;
          border-top: 1px solid var(--border);
          background: var(--void-soft);
        }
        .footer-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 56px 24px 40px;
          display: grid;
          grid-template-columns: 1.5fr 2fr;
          gap: 48px;
        }
        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-brand > span:first-child {
          font-size: 28px;
          color: var(--violet);
        }
        .footer-brand > span:nth-child(2) {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 700;
        }
        .footer-brand p {
          color: var(--muted);
          font-size: 14px;
          margin-top: 4px;
        }
        .footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .footer-links h4 {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: var(--muted);
          margin-bottom: 14px;
        }
        .footer-links a {
          display: block;
          color: var(--off-white);
          font-size: 14px;
          padding: 4px 0;
          opacity: 0.75;
          transition: var(--transition);
        }
        .footer-links a:hover { opacity: 1; color: var(--violet); }
        .footer-bottom {
          max-width: 1280px;
          margin: 0 auto;
          padding: 20px 24px;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .footer-bottom p { color: var(--muted); font-size: 13px; }
        .footer-badges {
          display: flex;
          gap: 20px;
          font-size: 13px;
          color: var(--muted);
        }
        @media (max-width: 768px) {
          .footer-inner { grid-template-columns: 1fr; }
          .footer-links { grid-template-columns: repeat(2, 1fr); }
          .footer-bottom { flex-direction: column; text-align: center; }
        }
      `}</style>
    </footer>
  );
}
