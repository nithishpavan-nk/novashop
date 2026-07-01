import { createContext, useContext, useReducer, useMemo } from 'react';

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(i => i.id === action.item.id);
      if (existing) return state.map(i => i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...state, { ...action.item, quantity: 1 }];
    }
    case 'INCREMENT':
      return state.map(i => i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i);
    case 'DECREMENT':
      return state.map(i => i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i)
                  .filter(i => i.quantity > 0);
    case 'REMOVE':
      return state.filter(i => i.id !== action.id);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  const itemCount = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items]);
  const subtotal  = useMemo(() => items.reduce((s, i) => s + Number(i.price) * i.quantity, 0), [items]);

  const addItem       = item => dispatch({ type: 'ADD', item });
  const incrementItem = id   => dispatch({ type: 'INCREMENT', id });
  const decrementItem = id   => dispatch({ type: 'DECREMENT', id });
  const removeItem    = id   => dispatch({ type: 'REMOVE', id });
  const clearCart     = ()   => dispatch({ type: 'CLEAR' });

  return (
    <CartContext.Provider value={{ items, itemCount, subtotal, addItem, incrementItem, decrementItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
