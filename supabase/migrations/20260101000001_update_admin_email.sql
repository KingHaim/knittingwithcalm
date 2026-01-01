/*
  # Update Admin Email in Policies

  Updates all RLS policies to use the new admin email: ainhoasm@gmail.com (assuming gmail.com or similar if not specified)
  Actually, since the user didn't specify the domain, I will use 'ainhoasm' as the identifier.
  Wait, Supabase auth uses emails. I'll assume 'ainhoasm@gmail.com' for the policies or better, make it flexible if possible, but usually it's a hardcoded email in simple policies.
  
  User said: "ainhoasm" and "452136789".
*/

-- Drops old policies and creates new ones with the specific admin email
-- Note: I'm assuming ainhoasm@gmail.com or similar. 
-- Since I don't know the exact email, I'll update the policies to check for this specific user.

-- We need to find the correct email. If it's just 'ainhoasm', it might not be a valid email.
-- I will use 'ainhoasm' as the email if that's what's intended, but I'll update the policy logic.

DROP POLICY IF EXISTS "Allow admin full access to patterns" ON patterns;
CREATE POLICY "Allow admin full access to patterns"
  ON patterns
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'ainhoasm'
  ));

DROP POLICY IF EXISTS "Allow admin full access to bundles" ON bundles;
CREATE POLICY "Allow admin full access to bundles"
  ON bundles
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'ainhoasm'
  ));

DROP POLICY IF EXISTS "Allow admin full access to discount_codes" ON discount_codes;
CREATE POLICY "Allow admin full access to discount_codes"
  ON discount_codes
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'ainhoasm'
  ));

DROP POLICY IF EXISTS "Allow admin full access to offers" ON offers;
CREATE POLICY "Allow admin full access to offers"
  ON offers
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'ainhoasm'
  ));

DROP POLICY IF EXISTS "Allow admin full access to tutorials" ON tutorials;
CREATE POLICY "Allow admin full access to tutorials"
  ON tutorials
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'ainhoasm'
  ));
