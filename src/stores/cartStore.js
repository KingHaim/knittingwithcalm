import { create } from 'zustand';

export const useCart = create((set) => ({
  items: [],
  addItem: (pattern) => set((state) => ({
    items: [...state.items, pattern]
  })),
  removeItem: (patternId) => set((state) => ({
    items: state.items.filter(item => item.id !== patternId)
  })),
  clearCart: () => set({ items: [] })
}));