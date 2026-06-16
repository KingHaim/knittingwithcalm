import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export function useAuth() {
  const { user, setUser } = useAuthStore();

  const signUp = async (email, _password) => {
    // Temporary mock authentication
    const mockUser = { id: '1', email };
    setUser(mockUser);
    return { user: mockUser };
  };

  const signIn = async (email, _password) => {
    // Temporary mock authentication
    const mockUser = { id: '1', email };
    setUser(mockUser);
    return { user: mockUser };
  };

  const signOut = async () => {
    setUser(null);
  };

  return {
    user,
    signUp,
    signIn,
    signOut,
  };
}