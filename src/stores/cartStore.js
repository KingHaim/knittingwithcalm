import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCart = create(
  persist(
    (set) => ({
      items: [],
      addItem: (pattern) => set((state) => ({
        items: [...state.items, pattern]
      })),
      removeItem: (patternId) => set((state) => ({
        items: state.items.filter(item => item.id !== patternId)
      })),
      clearCart: () => set({ items: [] })
    }),
    {
      name: 'cart-storage'
    }
  )
);