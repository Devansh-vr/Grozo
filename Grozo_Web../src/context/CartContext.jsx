import { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        i => i.productId === action.payload.productId && i.variantId === action.payload.variantId
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.productId === action.payload.productId && i.variantId === action.payload.variantId
              ? { ...i, qty: i.qty + 1 }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => !(i.productId === action.payload.productId && i.variantId === action.payload.variantId)) };
    case 'UPDATE_QTY':
      if (action.payload.qty <= 0) {
        return { ...state, items: state.items.filter(i => !(i.productId === action.payload.productId && i.variantId === action.payload.variantId)) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.productId === action.payload.productId && i.variantId === action.payload.variantId
            ? { ...i, qty: action.payload.qty }
            : i
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'SET_COUPON':
      return { ...state, coupon: action.payload };
    case 'REMOVE_COUPON':
      return { ...state, coupon: null };
    default:
      return state;
  }
};

const initialState = {
  items: JSON.parse(localStorage.getItem('grozo_cart') || '[]'),
  coupon: null,
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('grozo_cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product, variant) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        productId: product.id,
        variantId: variant.id,
        name: product.name,
        image: product.images[0],
        variantLabel: variant.label,
        price: variant.price,
        originalPrice: variant.originalPrice,
        stock: variant.stock,
      },
    });
    toast.success(`${product.name} added to cart!`, { icon: '🛒' });
  };

  const removeFromCart = (productId, variantId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, variantId } });
    toast('Item removed from cart', { icon: '🗑️' });
  };

  const updateQty = (productId, variantId, qty) => {
    dispatch({ type: 'UPDATE_QTY', payload: { productId, variantId, qty } });
  };

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const applyCoupon = (coupon) => dispatch({ type: 'SET_COUPON', payload: coupon });
  const removeCoupon = () => dispatch({ type: 'REMOVE_COUPON' });

  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const itemCount = state.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeFromCart, updateQty, clearCart, applyCoupon, removeCoupon, subtotal, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
