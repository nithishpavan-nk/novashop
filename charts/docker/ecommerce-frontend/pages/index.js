import Link from 'next/link';

const CATEGORIES = [
  { name: 'Electronics', icon: '💻', desc: 'Laptops, phones, gadgets' },
  { name: 'Fashion',     icon: '👗', desc: 'Clothing & accessories' },
  { name: 'Home',        icon: '🏠', desc: 'Furniture & décor' },
  { name: 'Sports',      icon: '⚽', desc: 'Gear & equipment' },
  { name: 'Books',       icon: '📚', desc: 'Fiction & non-fiction' },
  { name: 'Beauty',      icon: '✨', desc: 'Skincare & cosmetics' },
];

const FEATURES = [
  { icon: '🚀', title: 'Fast Delivery', desc: 'Get your order within 24–48 hours, guaranteed.' },
  { icon: '🔒', title: 'Secure Payments', desc: 'End-to-end encrypted checkout every time.' },
  { icon: '↩️', title: 'Easy Returns', desc: '30-day no-questions-asked return policy.' },
  { icon: '🎧', title: '24/7 Support', desc: 'Real humans, available around the clock.' },
];

export default function Home() {
  return (
    <main className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-eyebrow">New arrivals dropping weekly</span>
          <h1 className="hero-title">
            Shop the future,<br />
            <span className="hero-accent">delivered today</span>
          </h1>
          <p className="hero-sub">
            Premium electronics, fashion, and lifestyle products — curated for people who know what they want.
          </p>
          <div className="hero-ctas">
            <Link href="/products" className="btn-primary">Shop All Products</Link>
            <Link href="/products?category=Electronics" className="btn-ghost">Browse Electronics</Link>
          </div>
          <div className="hero-stats">
            <div><strong>50,000+</strong><span>Products</span></div>
            <div className="divider" />
            <div><strong>1.2M+</strong><span>Happy Customers</span></div>
            <div className="divider" />
            <div><strong>4.9★</strong><span>Average Rating</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="glow-orb" />
          <div className="hero-card">
            <span style={{fontSize:'80px'}}>💻</span>
            <div className="hero-card-info">
              <span className="hc-tag">Trending</span>
              <span className="hc-name">Pro Laptop X1</span>
              <span className="hc-price">₹89,999</span>
            </div>
          </div>
        </div>
        <div className="hero-bg-grid" />
      </section>

      {/* CATEGORIES */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <Link href="/products" className="see-all">See all →</Link>
          </div>
          <div className="categories-grid">
            {CATEGORIES.map(cat => (
              <Link key={cat.name} href={`/products?category=${cat.name}`} className="cat-card">
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-name">{cat.name}</span>
                <span className="cat-desc">{cat.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section features-section">
        <div className="container">
          <div className="features-grid">
            {FEATURES.map(f => (
              <div key={f.title} className="feature-card">
                <span className="feature-icon">{f.icon}</span>
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="container">
        <div className="promo-banner">
          <div>
            <span className="promo-tag">Limited Time</span>
            <h2>Up to 40% off Electronics</h2>
            <p>Grab the best deals before they&apos;re gone.</p>
            <Link href="/products?category=Electronics" className="btn-primary">Shop the sale</Link>
          </div>
          <div className="promo-visual">
            <span>🎮</span><span>📱</span><span>🎧</span>
          </div>
        </div>
      </section>

      <style jsx>{`
        .home { min-height: 80vh; }

        /* HERO */
        .hero {
          position: relative;
          min-height: 88vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 48px;
          max-width: 1280px;
          margin: 0 auto;
          padding: 80px 24px;
          overflow: hidden;
        }
        .hero-bg-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(108,99,255,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(108,99,255,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }
        .hero-content { position: relative; z-index: 2; }
        .hero-eyebrow {
          display: inline-block;
          background: rgba(108,99,255,0.15);
          border: 1px solid rgba(108,99,255,0.3);
          color: var(--violet);
          font-size: 13px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 999px;
          letter-spacing: 0.5px;
          margin-bottom: 24px;
        }
        .hero-title {
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 700;
          line-height: 1.1;
          color: var(--white);
          margin-bottom: 20px;
        }
        .hero-accent {
          background: linear-gradient(135deg, var(--violet), #A78BFA);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-sub {
          font-size: 17px;
          color: var(--muted);
          max-width: 480px;
          margin-bottom: 36px;
          line-height: 1.65;
        }
        .hero-ctas {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 44px;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          background: var(--violet);
          color: white;
          font-weight: 600;
          font-size: 15px;
          padding: 14px 28px;
          border-radius: var(--radius-sm);
          transition: var(--transition);
          border: none;
          text-decoration: none;
        }
        .btn-primary:hover {
          background: var(--violet-dark);
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow);
        }
        .btn-ghost {
          display: inline-flex;
          align-items: center;
          background: transparent;
          color: var(--white);
          font-weight: 600;
          font-size: 15px;
          padding: 13px 28px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          transition: var(--transition);
          text-decoration: none;
        }
        .btn-ghost:hover { border-color: var(--violet); color: var(--violet); }
        .hero-stats {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .hero-stats > div { display: flex; flex-direction: column; gap: 2px; }
        .hero-stats strong { font-family: var(--font-display); font-size: 22px; color: var(--white); }
        .hero-stats span   { font-size: 12px; color: var(--muted); }
        .divider { width: 1px; height: 36px; background: var(--border); }

        .hero-visual {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .glow-orb {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(108,99,255,0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          width: 280px;
          box-shadow: var(--shadow-card);
          animation: float 4s ease-in-out infinite;
        }
        .hero-card-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          text-align: center;
        }
        .hc-tag {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: var(--violet);
          background: rgba(108,99,255,0.12);
          padding: 3px 10px;
          border-radius: 6px;
        }
        .hc-name { font-family: var(--font-display); font-size: 18px; font-weight: 600; }
        .hc-price { font-size: 24px; font-weight: 700; color: var(--violet); }

        /* SECTIONS */
        .section { padding: 72px 0; }
        .container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
        }
        .section-header h2 {
          font-size: 28px;
          font-weight: 700;
        }
        .see-all {
          color: var(--violet);
          font-size: 14px;
          font-weight: 600;
          transition: var(--transition);
        }
        .see-all:hover { opacity: 0.75; }

        /* CATEGORIES */
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
        }
        .cat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 24px 16px;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          text-align: center;
          transition: var(--transition);
          text-decoration: none;
        }
        .cat-card:hover {
          border-color: var(--violet);
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(108,99,255,0.15);
        }
        .cat-icon { font-size: 32px; }
        .cat-name {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 600;
          color: var(--white);
        }
        .cat-desc { font-size: 11px; color: var(--muted); }

        /* FEATURES */
        .features-section { background: var(--void-soft); }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .feature-card {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          padding: 24px;
          border-radius: var(--radius-md);
          background: rgba(108,99,255,0.05);
          border: 1px solid rgba(108,99,255,0.1);
        }
        .feature-icon { font-size: 28px; flex-shrink: 0; }
        .feature-card h4 {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 4px;
          color: var(--white);
        }
        .feature-card p { font-size: 13px; color: var(--muted); }

        /* PROMO */
        .promo-banner {
          margin: 0 0 72px;
          background: linear-gradient(135deg, rgba(108,99,255,0.2) 0%, rgba(108,99,255,0.05) 100%);
          border: 1px solid rgba(108,99,255,0.25);
          border-radius: var(--radius-lg);
          padding: 56px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          overflow: hidden;
          position: relative;
        }
        .promo-tag {
          display: inline-block;
          background: var(--violet);
          color: white;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          padding: 4px 10px;
          border-radius: 6px;
          margin-bottom: 14px;
        }
        .promo-banner h2 { font-size: 32px; font-weight: 700; margin-bottom: 10px; }
        .promo-banner p  { color: var(--muted); margin-bottom: 24px; }
        .promo-visual {
          display: flex;
          gap: 8px;
          font-size: 64px;
          flex-shrink: 0;
        }
        .promo-visual span { animation: float 3s ease-in-out infinite; }
        .promo-visual span:nth-child(2) { animation-delay: 0.4s; }
        .promo-visual span:nth-child(3) { animation-delay: 0.8s; }

        @media (max-width: 1024px) {
          .categories-grid { grid-template-columns: repeat(3, 1fr); }
          .features-grid   { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .hero {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 60px 24px;
          }
          .hero-visual { display: none; }
          .hero-ctas   { justify-content: center; }
          .hero-stats  { justify-content: center; }
          .categories-grid { grid-template-columns: repeat(2, 1fr); }
          .features-grid   { grid-template-columns: 1fr; }
          .promo-banner    { flex-direction: column; padding: 36px 24px; }
        }
      `}</style>
    </main>
  );
}
