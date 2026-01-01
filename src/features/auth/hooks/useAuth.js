import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export function useAuth() {
  const { user, setUser } = useAuthStore();

  return {
    user,
    signUp: async (email, password) => {
      // Temporary mock authentication
      const mockUser = { id: '1', email };
      setUser(mockUser);
      return { user: mockUser };
    },
    signIn: async (email, password) => {
      // Admin credentials check
      if (email === 'ainhoasm' && password === '452136789') {
        const adminUser = { id: 'admin-id', email: 'ainhoasm', role: 'admin' };
        setUser(adminUser);
        return { user: adminUser };
      }

      // Temporary mock authentication for others
      const mockUser = { id: '1', email };
      setUser(mockUser);
      return { user: mockUser };
    },
    signOut: async () => {
      setUser(null);
    }
  };
}