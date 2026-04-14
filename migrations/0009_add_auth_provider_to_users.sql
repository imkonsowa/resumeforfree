ALTER TABLE users ADD COLUMN auth_provider TEXT DEFAULT 'email' CHECK(auth_provider IN ('email', 'google'));
CREATE INDEX idx_users_auth_provider ON users(auth_provider);
