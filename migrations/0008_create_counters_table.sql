-- Create counters table for simple named counters (no PII, no IP tracking)
CREATE TABLE IF NOT EXISTS counters (
    name TEXT PRIMARY KEY,
    count INTEGER NOT NULL DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed the download counter
INSERT OR IGNORE INTO counters (name, count) VALUES ('downloads', 0);
