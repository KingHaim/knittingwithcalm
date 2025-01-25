// Temporarily disable Supabase client
export const supabase = {
  auth: {
    signUp: async () => ({ data: { user: { id: '1' } }, error: null }),
    signInWithPassword: async () => ({ data: { user: { id: '1' } }, error: null }),
    signOut: async () => ({ error: null })
  }
};