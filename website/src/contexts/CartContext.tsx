"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { trackAddToCart } from "@/utils/analytics";
import type { CartItem } from "@/services/types";

// ── State ────────────────────────────────────────────────────────────
interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
}

const STORAGE_KEY = "xteink-cart";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // quota exceeded — silently ignore
  }
}

// ── Actions ──────────────────────────────────────────────────────────
type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "OPEN_DRAWER" }
  | { type: "CLOSE_DRAWER" }
  | { type: "TOGGLE_DRAWER" }
  | { type: "HYDRATE"; payload: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        const items = state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
        saveCart(items);
        return { ...state, items };
      }
      const items = [...state.items, { ...action.payload, quantity: 1 }];
      saveCart(items);
      return { ...state, items };
    }
    case "REMOVE_ITEM": {
      const items = state.items.filter((i) => i.id !== action.payload.id);
      saveCart(items);
      return { ...state, items };
    }
    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        const items = state.items.filter((i) => i.id !== action.payload.id);
        saveCart(items);
        return { ...state, items };
      }
      const items = state.items.map((i) =>
        i.id === action.payload.id
          ? { ...i, quantity: action.payload.quantity }
          : i
      );
      saveCart(items);
      return { ...state, items };
    }
    case "CLEAR_CART": {
      saveCart([]);
      return { ...state, items: [] };
    }
    case "OPEN_DRAWER":
      return { ...state, isDrawerOpen: true };
    case "CLOSE_DRAWER":
      return { ...state, isDrawerOpen: false };
    case "TOGGLE_DRAWER":
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    case "HYDRATE":
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

// ── Context ──────────────────────────────────────────────────────────
interface CartContextValue {
  items: CartItem[];
  isDrawerOpen: boolean;
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

// ── Provider ─────────────────────────────────────────────────────────
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isDrawerOpen: false,
  });

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    const stored = loadCart();
    if (stored.length > 0) {
      dispatch({ type: "HYDRATE", payload: stored });
    }
  }, []);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">) => {
      dispatch({ type: "ADD_ITEM", payload: item });
      trackAddToCart(item.name, item.price);
    },
    []
  );
  const removeItem = useCallback(
    (id: string) => dispatch({ type: "REMOVE_ITEM", payload: { id } }),
    []
  );
  const updateQuantity = useCallback(
    (id: string, quantity: number) =>
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } }),
    []
  );
  const clearCart = useCallback(
    () => dispatch({ type: "CLEAR_CART" }),
    []
  );
  const openDrawer = useCallback(
    () => dispatch({ type: "OPEN_DRAWER" }),
    []
  );
  const closeDrawer = useCallback(
    () => dispatch({ type: "CLOSE_DRAWER" }),
    []
  );
  const toggleDrawer = useCallback(
    () => dispatch({ type: "TOGGLE_DRAWER" }),
    []
  );

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isDrawerOpen: state.isDrawerOpen,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openDrawer,
        closeDrawer,
        toggleDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────────────
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
