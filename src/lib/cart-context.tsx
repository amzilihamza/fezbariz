"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/types/product";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product, name: string, size: string, color: string, quantity?: number) => void;
  removeItem: (slug: string, size: string, color: string) => void;
  updateQuantity: (slug: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "fezbariz-cart";

function itemKey(slug: string, size: string, color: string) {
  return `${slug}__${size}__${color}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        // One-time hydration from localStorage on mount; cart can't be read server-side.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(JSON.parse(stored));
      }
    } catch {
      // ignore invalid stored cart
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback(
    (product: Product, name: string, size: string, color: string, quantity = 1) => {
      setItems((prev) => {
        const key = itemKey(product.slug, size, color);
        const existing = prev.find((i) => itemKey(i.slug, i.size, i.color) === key);
        if (existing) {
          return prev.map((i) =>
            itemKey(i.slug, i.size, i.color) === key
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [
          ...prev,
          {
            slug: product.slug,
            name,
            price: product.price,
            currency: product.currency,
            image: product.images[0],
            size,
            color,
            quantity,
          },
        ];
      });
      setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback((slug: string, size: string, color: string) => {
    setItems((prev) => prev.filter((i) => itemKey(i.slug, i.size, i.color) !== itemKey(slug, size, color)));
  }, []);

  const updateQuantity = useCallback((slug: string, size: string, color: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          itemKey(i.slug, i.size, i.color) === itemKey(slug, size, color)
            ? { ...i, quantity }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    itemCount,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
