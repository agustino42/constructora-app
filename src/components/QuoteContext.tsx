'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type ProductInfo = { 
  id: string; 
  name: string; 
  price: number; 
  imageUrl: string | null; 
};

export type QuoteItem = ProductInfo & { quantity: number };

interface QuoteContextType {
  items: QuoteItem[];
  addItem: (product: ProductInfo) => void;
  removeItem: (id: string) => void;
  total: number;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('coinbaca-quote');
    if (saved) {
      try { setItems(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('coinbaca-quote', JSON.stringify(items));
    }
  }, [items, isMounted]);

  const addItem = (product: ProductInfo) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <QuoteContext.Provider value={{ items, addItem, removeItem, total }}>
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) throw new Error('useQuote must be used within a QuoteProvider');
  return context;
}
