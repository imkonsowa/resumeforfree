-- Add role column to users table
ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user' CHECK(role IN ('user', 'admin'));

-- Create index on role for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
