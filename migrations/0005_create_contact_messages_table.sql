-- Create contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK(status IN ('new', 'read', 'resolved')),
    ip_address TEXT,
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);

-- Create trigger to auto-update updated_at timestamp
CREATE TRIGGER IF NOT EXISTS update_contact_messages_updated_at
AFTER UPDATE ON contact_messages
BEGIN
    UPDATE contact_messages SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;
