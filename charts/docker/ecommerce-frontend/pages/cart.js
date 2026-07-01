import Link from 'next/link';
import { useCart } from '../context/CartContext';

const CATEGORY_EMOJIS = {
  Electronics:'💻', Fashion:'👗', Home:'🏠', Sports:'⚽',
  Books:'📚', Beauty:'✨', Toys:'🎮', Default:'📦',
};

export default function Cart() {
  const { items, subtotal, itemCount, incrementItem, decrementItem, removeItem, clearCart } = useCart();

  if (items.length === 0) return (
    <main className="cart-page">
      <div className="empty-cart">
        <span>🛒</span>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven&apos;t added anything yet.</p>
        <Link href="/products" className="btn-primary">Start Shopping</Link>
      </div>
      <style jsx>{`
        .cart-page { min-height: 70vh; display: flex; align-items: center; justify-content: center; }
        .empty-cart { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 14px; }
        .empty-cart span { font-size: 64px; }
        .empty-cart h2   { font-size: 28px; }
        .empty-cart p    { color: var(--muted); }
        .btn-primary {
          display: inline-flex; align-items: center;
          background: var(--violet); color: white;
          font-weight: 600; font-size: 15px;
          padding: 14px 28px; border-radius: var(--radius-sm);
          transition: var(--transition); text-decoration: none;
        }
        .btn-primary:hover { background: var(--violet-dark); }
      `}</style>
    </main>
  );

  return (
    <main className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Your Cart <span className="count">({itemCount} item{itemCount !== 1 ? 's' : ''})</span></h1>
          <button className="clear-btn" onClick={clearCart}>Clear all</button>
        </div>

        <div className="cart-layout">
          {/* ITEMS */}
          <div className="cart-items">
            {items.map(item => {
              const emoji = CATEGORY_EMOJIS[item.category] || CATEGORY_EMOJIS.Default;
              return (
                <div key={item.id} className="cart-row">
                  <div className="row-image">
                    <span>{emoji}</span>
                  </div>
                  <div className="row-details">
                    <Link href={`/product/${item.id}`} className="row-name">{item.name}</Link>
                    <span className="row-cat">{item.category}</span>
                    <span className="row-unit">₹{Number(item.price).toLocaleString('en-IN')} each</span>
                  </div>
                  <div className="row-qty">
                    <button onClick={() => decrementItem(item.id)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => incrementItem(item.id)}>+</button>
                  </div>
                  <div className="row-subtotal">
                    ₹{(Number(item.price) * item.quantity).toLocaleString('en-IN')}
                  </div>
                  <button className="row-remove" onClick={() => removeItem(item.id)} aria-label="Remove item">
                    ✕
                  </button>
                </div>
              );
            })}
          </div>

          {/* SUMMARY */}
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-rows">
              {items.map(item => (
                <div key={item.id} className="sum-row">
                  <span>{item.quantity}× {item.name}</span>
                  <span>₹{(Number(item.price) * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
            <div className="summary-divider" />
            <div className="sum-total">
              <span>Total</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="sum-note">Taxes and delivery calculated at checkout</div>
            <button className="checkout-btn">Proceed to Checkout</button>
            <Link href="/products" className="continue-link">← Continue shopping</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cart-page { padding: 48px 0 80px; min-height: 70vh; }
        .container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
        .cart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 36px;
        }
        .cart-header h1 { font-size: 34px; font-weight: 700; }
        .count { color: var(--muted); font-size: 22px; font-weight: 400; }
        .clear-btn {
          background: none;
          border: 1px solid var(--border);
          color: var(--muted);
          font-size: 13px;
          padding: 8px 16px;
          border-radius: var(--radius-sm);
          transition: var(--transition);
        }
        .clear-btn:hover { border-color: var(--sale-red); color: var(--sale-red); }
        .cart-layout {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 32px;
          align-items: start;
        }
        .cart-items { display: flex; flex-direction: column; gap: 14px; }
        .cart-row {
          display: grid;
          grid-template-columns: 72px 1fr auto auto auto;
          align-items: center;
          gap: 18px;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 16px 20px;
          transition: var(--transition);
        }
        .cart-row:hover { border-color: rgba(108,99,255,0.3); }
        .row-image {
          width: 72px; height: 72px;
          background: linear-gradient(135deg, #12122A, #1E1E3A);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
        }
        .row-name {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 600;
          color: var(--white);
          display: block;
          margin-bottom: 4px;
          transition: var(--transition);
        }
        .row-name:hover { color: var(--violet); }
        .row-cat, .row-unit {
          display: block;
          font-size: 12px;
          color: var(--muted);
        }
        .row-qty {
          display: flex;
          align-items: center;
          gap: 0;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          overflow: hidden;
        }
        .row-qty button {
          width: 32px; height: 36px;
          background: none;
          border: none;
          color: var(--white);
          font-size: 16px;
          transition: var(--transition);
        }
        .row-qty button:hover { background: var(--border); }
        .row-qty span {
          min-width: 32px;
          text-align: center;
          font-weight: 600;
          font-size: 14px;
          border-left: 1px solid var(--border);
          border-right: 1px solid var(--border);
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .row-subtotal {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 16px;
          color: var(--violet);
          white-space: nowrap;
          min-width: 100px;
          text-align: right;
        }
        .row-remove {
          background: none;
          border: none;
          color: var(--muted);
          font-size: 13px;
          padding: 6px;
          transition: var(--transition);
          border-radius: 4px;
        }
        .row-remove:hover { color: var(--sale-red); background: rgba(255,79,94,0.1); }
        /* SUMMARY */
        .cart-summary {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 28px;
          position: sticky;
          top: 88px;
        }
        .cart-summary h2 { font-size: 18px; font-weight: 700; margin-bottom: 20px; }
        .summary-rows { display: flex; flex-direction: column; gap: 10px; }
        .sum-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: var(--muted);
        }
        .sum-row span:first-child { flex: 1; margin-right: 8px; }
        .summary-divider {
          height: 1px;
          background: var(--border);
          margin: 18px 0;
        }
        .sum-total {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .sum-note { font-size: 12px; color: var(--muted); margin-bottom: 20px; }
        .checkout-btn {
          width: 100%;
          height: 52px;
          background: var(--violet);
          color: white;
          border: none;
          border-radius: var(--radius-sm);
          font-size: 15px;
          font-weight: 600;
          font-family: var(--font-body);
          transition: var(--transition);
          margin-bottom: 14px;
        }
        .checkout-btn:hover { background: var(--violet-dark); transform: translateY(-2px); box-shadow: var(--shadow-glow); }
        .continue-link {
          display: block;
          text-align: center;
          font-size: 13px;
          color: var(--muted);
          text-decoration: underline;
          transition: var(--transition);
        }
        .continue-link:hover { color: var(--violet); }
        @media (max-width: 900px) {
          .cart-layout { grid-template-columns: 1fr; }
          .cart-summary { position: static; }
        }
        @media (max-width: 640px) {
          .cart-row { grid-template-columns: 56px 1fr; grid-template-areas: "img details" "qty subtotal" "remove ."; }
          .row-image   { grid-area: img; width: 56px; height: 56px; }
          .row-details { grid-area: details; }
          .row-qty     { grid-area: qty; }
          .row-subtotal{ grid-area: subtotal; justify-self: end; }
          .row-remove  { grid-area: remove; }
        }
      `}</style>
    </main>
  );
}
